import { useRef, useEffect } from 'react';
import * as THREE from 'three';

/* ─── CDN textures ─────────────────────────────────────────── */
const EARTH_MAP   = 'https://unpkg.com/three-globe@2.31.2/example/img/earth-blue-marble.jpg';
const EARTH_BUMP  = 'https://unpkg.com/three-globe@2.31.2/example/img/earth-topology.png';
const EARTH_CLOUD = 'https://unpkg.com/three-globe@2.31.2/example/img/earth-clouds.png';

/* ─── Service nodes ─────────────────────────────────────────────── */
const NODES = [
  { label: 'Sri Lanka',  lat:  7.0, lng:  80.0 },
  { label: 'Australia',  lat: -25.3, lng: 133.8 },
  { label: 'Russia',     lat: 55.8, lng:  37.6 },
  { label: 'France',     lat: 48.9, lng:   2.3 },
];

/* ─── Convert lat/lng → 3D position on unit sphere ─────────────── */
function latLngToVec3(lat: number, lng: number, r = 1): THREE.Vector3 {
  const phi   = (90 - lat)  * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -r * Math.sin(phi) * Math.cos(theta),
     r * Math.cos(phi),
     r * Math.sin(phi) * Math.sin(theta),
  );
}

/* ─── Atmosphere vertex/fragment shaders (rim glow) ─────────────── */
const atmVert = /* glsl */`
  varying vec3 vNormal;
  void main() {
    vNormal = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;
const atmFrag = /* glsl */`
  varying vec3 vNormal;
  void main() {
    float rim = 1.0 - max(dot(vNormal, vec3(0.0, 0.0, 1.0)), 0.0);
    float intensity = pow(rim, 2.8) * 0.9;
    gl_FragColor = vec4(0.38, 0.62, 1.0, intensity);
  }
`;

const SIZE = 420; // logical canvas size

export function GlobeThree() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    /* ── Renderer ──────────────────────────────────────────── */
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(SIZE, SIZE);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = false;
    // Linear tone mapping preserves the true NASA texture colours
    renderer.toneMapping         = THREE.LinearToneMapping;
    renderer.toneMappingExposure = 1.0;
    renderer.outputColorSpace    = THREE.SRGBColorSpace;
    mount.appendChild(renderer.domElement);

    /* ── Scene / Camera ────────────────────────────────────── */
    const scene  = new THREE.Scene();
    // FOV=38° and z=3.4 ensures the atmosphere sphere (r=1.08) fits inside the frustum
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 1000);
    camera.position.z = 3.4;

    /* ── Lighting — natural, balanced ─────────────────────────── */
    // Enough ambient to see the dark side without washing out the lit side
    scene.add(new THREE.AmbientLight(0xffffff, 0.85));

    // Sun: moderate, warm-white; coming from top-right
    const sun = new THREE.DirectionalLight(0xfff8f0, 1.6);
    sun.position.set(4, 2, 5);
    scene.add(sun);

    // Subtle cool fill from night side
    const fill = new THREE.DirectionalLight(0x7799bb, 0.25);
    fill.position.set(-4, -1, -4);
    scene.add(fill);

    /* ── Earth group (markers rotate with earth) ───────────── */
    const earthGroup = new THREE.Group();
    earthGroup.rotation.y = 0.6; // start with Europe/Asia facing camera
    scene.add(earthGroup);

    /* Earth mesh — plain Phong, no shader overrides */
    const earthGeo = new THREE.SphereGeometry(1, 72, 72);
    const earthMat = new THREE.MeshPhongMaterial({
      shininess: 15,
      specular : new THREE.Color(0x224466),
    });
    const earthMesh = new THREE.Mesh(earthGeo, earthMat);
    earthGroup.add(earthMesh);

    /* Cloud layer */
    const cloudGeo = new THREE.SphereGeometry(1.006, 72, 72);
    const cloudMat = new THREE.MeshPhongMaterial({
      transparent: true,
      opacity    : 0.40,
      depthWrite : false,
    });
    const cloudMesh = new THREE.Mesh(cloudGeo, cloudMat);
    earthGroup.add(cloudMesh);

    /* Load textures asynchronously */
    const loader = new THREE.TextureLoader();
    loader.load(EARTH_MAP, (t) => {
      t.colorSpace     = THREE.SRGBColorSpace;
      t.anisotropy     = renderer.capabilities.getMaxAnisotropy(); // sharper at oblique angles
      earthMat.map     = t;
      earthMat.needsUpdate = true;
    });
    loader.load(EARTH_BUMP, (t) => {
      earthMat.bumpMap   = t;
      earthMat.bumpScale = 0.06;  // slightly stronger terrain relief
      earthMat.needsUpdate = true;
    });
    loader.load(EARTH_CLOUD, (t) => {
      cloudMat.map      = t;
      cloudMat.alphaMap = t;
      cloudMat.needsUpdate = true;
    });

    /* ── Atmosphere glow (shader rim) ──────────────────────── */
    const atmGeo  = new THREE.SphereGeometry(1.08, 64, 64);
    const atmMat  = new THREE.ShaderMaterial({
      vertexShader  : atmVert,
      fragmentShader: atmFrag,
      blending      : THREE.AdditiveBlending,
      side          : THREE.FrontSide,
      transparent   : true,
      depthWrite    : false,
    });
    // atmosphere does NOT rotate with earth
    scene.add(new THREE.Mesh(atmGeo, atmMat));

    /* ── Service node markers ──────────────────────────────── */
    const ringMeshes: THREE.Mesh[] = [];

    NODES.forEach(node => {
      const pos    = latLngToVec3(node.lat, node.lng, 1.013);
      const normal = pos.clone().normalize();
      const quat   = new THREE.Quaternion().setFromUnitVectors(
        new THREE.Vector3(0, 0, 1), normal
      );

      /* Outer pulsing ring */
      const ringGeo = new THREE.RingGeometry(0.022, 0.038, 32);
      const ringMat = new THREE.MeshBasicMaterial({
        color      : 0xff5e00,
        transparent: true,
        opacity    : 0.70,
        side       : THREE.DoubleSide,
        depthWrite : false,
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.position.copy(pos);
      ring.quaternion.copy(quat);
      earthGroup.add(ring);
      ringMeshes.push(ring);

      /* Outer glow halo (larger, more transparent) */
      const haloGeo = new THREE.RingGeometry(0.038, 0.062, 32);
      const haloMat = new THREE.MeshBasicMaterial({
        color      : 0xff5e00,
        transparent: true,
        opacity    : 0.22,
        side       : THREE.DoubleSide,
        depthWrite : false,
      });
      const halo = new THREE.Mesh(haloGeo, haloMat);
      halo.position.copy(pos);
      halo.quaternion.copy(quat);
      earthGroup.add(halo);
      ringMeshes.push(halo); // also pulse the halo

      /* Core solid dot */
      const dotGeo = new THREE.SphereGeometry(0.018, 16, 16);
      const dotMat = new THREE.MeshBasicMaterial({ color: 0xff5e00 });
      const dot    = new THREE.Mesh(dotGeo, dotMat);
      dot.position.copy(pos);
      earthGroup.add(dot);

      /* White bright centre */
      const coreGeo = new THREE.SphereGeometry(0.008, 16, 16);
      const coreMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
      const core    = new THREE.Mesh(coreGeo, coreMat);
      core.position.copy(pos);
      earthGroup.add(core);
    });

    /* ── Drag-to-rotate interaction ──────────────────────── */
    const AUTO_SPEED = 0.0008;      // normal auto-rotate speed (rad/frame)
    const DRAG_FACTOR = 0.005;      // how much a pixel of drag = rotation (rad)
    const INERTIA     = 0.92;       // velocity decay per frame (0=instant stop, 1=no decay)

    let isDragging = false;
    let prevX = 0, prevY = 0;
    let velX  = 0, velY  = 0;       // angular velocity from drag

    const canvas = renderer.domElement;
    canvas.style.cursor = 'grab';

    /* Mouse handlers */
    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      prevX = e.clientX; prevY = e.clientY;
      velX = 0; velY = 0;
      canvas.style.cursor = 'grabbing';
    };
    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const dx = e.clientX - prevX;
      const dy = e.clientY - prevY;
      velX = dx * DRAG_FACTOR;
      velY = dy * DRAG_FACTOR;
      earthGroup.rotation.y += velX;
      earthGroup.rotation.x += velY;
      // Clamp tilt – prevent flipping upside-down
      earthGroup.rotation.x = Math.max(-Math.PI / 2.2, Math.min(Math.PI / 2.2, earthGroup.rotation.x));
      prevX = e.clientX; prevY = e.clientY;
    };
    const onMouseUp = () => {
      isDragging = false;
      canvas.style.cursor = 'grab';
    };

    /* Touch handlers (mobile) */
    const onTouchStart = (e: TouchEvent) => {
      isDragging = true;
      prevX = e.touches[0].clientX; prevY = e.touches[0].clientY;
      velX = 0; velY = 0;
    };
    const onTouchMove = (e: TouchEvent) => {
      if (!isDragging) return;
      e.preventDefault();
      const dx = e.touches[0].clientX - prevX;
      const dy = e.touches[0].clientY - prevY;
      velX = dx * DRAG_FACTOR;
      velY = dy * DRAG_FACTOR;
      earthGroup.rotation.y += velX;
      earthGroup.rotation.x += velY;
      earthGroup.rotation.x = Math.max(-Math.PI / 2.2, Math.min(Math.PI / 2.2, earthGroup.rotation.x));
      prevX = e.touches[0].clientX; prevY = e.touches[0].clientY;
    };
    const onTouchEnd = () => { isDragging = false; };

    canvas.addEventListener('mousedown',  onMouseDown);
    window.addEventListener('mousemove',  onMouseMove);   // window so dragging off-canvas works
    window.addEventListener('mouseup',    onMouseUp);
    canvas.addEventListener('touchstart', onTouchStart, { passive: false });
    canvas.addEventListener('touchmove',  onTouchMove,  { passive: false });
    canvas.addEventListener('touchend',   onTouchEnd);

    /* ── Animation loop ─────────────────────────────────── */
    let animId: number;

    function animate() {
      animId = requestAnimationFrame(animate);

      if (isDragging) {
        // User is actively dragging — earthGroup already updated in event handler
        cloudMesh.rotation.y += 0.00004;
      } else {
        // Apply inertia from last drag, blending back to auto-rotate
        velX *= INERTIA;
        velY *= INERTIA;

        // Once inertia has almost settled, blend in the auto-rotation
        const speed = Math.abs(velX) + Math.abs(velY);
        const autoContrib = speed < 0.0003 ? AUTO_SPEED : 0;
        earthGroup.rotation.y += velX + autoContrib;
        earthGroup.rotation.x += velY;
        // Gently return tilt toward 0 when not dragging
        earthGroup.rotation.x *= 0.97;
        cloudMesh.rotation.y  += 0.00004;
      }

      // Pulse the rings
      const pulse = (Math.sin(Date.now() / 500) + 1) / 2; // 0 → 1
      ringMeshes.forEach((r, i) => {
        const mat = r.material as THREE.MeshBasicMaterial;
        if (i % 2 === 0) {
          mat.opacity = 0.35 + pulse * 0.55;
          r.scale.setScalar(0.9 + pulse * 0.35);
        } else {
          mat.opacity = 0.10 + pulse * 0.18;
          r.scale.setScalar(1 + pulse * 0.20);
        }
      });

      renderer.render(scene, camera);
    }

    animate();

    /* ── Cleanup ─────────────────────────────────────── */
    return () => {
      cancelAnimationFrame(animId);
      canvas.removeEventListener('mousedown',  onMouseDown);
      window.removeEventListener('mousemove',  onMouseMove);
      window.removeEventListener('mouseup',    onMouseUp);
      canvas.removeEventListener('touchstart', onTouchStart);
      canvas.removeEventListener('touchmove',  onTouchMove);
      canvas.removeEventListener('touchend',   onTouchEnd);
      renderer.dispose();
      earthMat.dispose();
      cloudMat.dispose();
      atmMat.dispose();
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        width    : `${SIZE}px`,
        height   : `${SIZE}px`,
        flexShrink: 0,
      }}
      aria-label="3D spinning globe — drag to rotate"
    />
  );
}
