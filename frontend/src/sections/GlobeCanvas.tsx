import { useRef, useEffect } from 'react';

/* ─── Service Nodes ──────────────────────────────────────────── */
const NODES = [
  { label: 'Colombo',   lat:  6.9, lng:  79.8 },
  { label: 'Singapore', lat:  1.3, lng: 103.8 },
  { label: 'Tokyo',     lat: 35.7, lng: 139.7 },
  { label: 'Frankfurt', lat: 50.1, lng:   8.7 },
  { label: 'Dublin',    lat: 53.3, lng:  -6.3 },
];

/* ─── Simplified world landmass polygons [lng, lat] ─────────── */
type Pt = [number, number];
const LAND: Pt[][] = [
  /* North America */
  [ [-168,64],[-166,68],[-162,70],[-150,72],[-140,72],
    [-130,70],[-120,70],[-110,74],[-100,76],[-88,74],
    [-80,72],[-76,68],[-70,64],[-66,60],[-60,47],
    [-66,44],[-70,43],[-74,40],[-77,34],[-80,32],
    [-82,30],[-88,30],[-90,29],[-94,30],[-97,26],
    [-100,23],[-105,19],[-110,22],[-115,25],[-117,30],
    [-120,34],[-122,37],[-124,40],[-124,48],[-123,50],
    [-130,54],[-135,57],[-140,59],[-148,60],[-152,59],
    [-155,60],[-158,60],[-162,60],[-165,62],[-168,64] ],
  /* South America */
  [ [-80,8],[-78,4],[-76,0],[-78,-4],[-82,-8],
    [-80,-12],[-77,-14],[-72,-18],[-70,-22],[-70,-30],
    [-72,-36],[-72,-40],[-65,-42],[-65,-46],[-68,-50],
    [-69,-52],[-68,-56],[-64,-55],[-64,-52],[-58,-46],
    [-52,-34],[-48,-28],[-46,-24],[-44,-20],[-40,-14],
    [-38,-8],[-35,-4],[-34,0],[-36,4],[-44,6],
    [-52,4],[-54,4],[-58,2],[-62,0],[-64,2],
    [-68,4],[-72,6],[-76,8],[-80,8] ],
  /* Greenland */
  [ [-44,60],[-46,64],[-50,68],[-52,70],[-54,72],
    [-50,74],[-46,76],[-42,78],[-36,80],[-30,82],
    [-24,82],[-20,80],[-18,78],[-20,76],[-22,74],
    [-26,72],[-28,70],[-32,68],[-38,66],[-42,64],[-44,60] ],
  /* Europe (W) */
  [ [-10,36],[-8,38],[-9,40],[-8,44],[-2,44],[0,46],
    [8,48],[14,48],[16,44],[18,40],[22,38],[28,38],
    [30,40],[32,44],[28,46],[24,48],[24,52],[28,54],
    [26,58],[22,60],[24,64],[20,68],[16,70],[14,72],
    [10,72],[8,70],[4,68],[0,64],[-4,60],[-8,56],
    [-6,52],[-4,50],[-4,48],[-2,46],[-4,44],
    [-6,42],[-8,40],[-10,38],[-10,36] ],
  /* Scandinavia */
  [ [4,58],[6,60],[4,62],[6,64],[8,66],[12,68],
    [16,70],[20,70],[26,70],[28,72],[28,68],[26,66],
    [28,64],[30,62],[28,60],[26,58],[24,56],[20,56],
    [18,58],[14,58],[10,58],[6,58],[4,58] ],
  /* UK / Ireland */
  [ [-6,50],[-4,52],[-4,54],[-2,56],[-4,58],
    [-2,58],[0,58],[2,56],[2,52],[0,50],
    [-2,50],[-4,50],[-6,50] ],
  /* Africa */
  [ [-16,16],[-14,12],[-16,8],[-14,4],[-8,4],
    [-4,4],[0,4],[2,6],[4,8],[6,8],
    [8,4],[10,2],[12,-4],[14,-8],[12,-14],
    [16,-20],[20,-26],[24,-30],[28,-34],[34,-34],
    [36,-30],[38,-24],[40,-18],[40,-10],[42,-4],
    [44,0],[44,4],[42,8],[44,12],[42,16],
    [40,20],[38,22],[36,22],[36,26],[34,30],
    [32,32],[28,32],[24,30],[20,26],[16,22],
    [10,16],[0,14],[-8,14],[-12,16],[-16,16] ],
  /* Asia bulk */
  [ [26,42],[30,42],[34,42],[38,44],[42,44],[46,42],
    [50,44],[54,44],[58,46],[62,48],[66,44],[70,40],
    [72,40],[74,36],[76,32],[78,30],[80,26],[82,24],
    [86,22],[88,22],[90,20],[92,18],[96,16],[100,12],
    [104,8],[106,4],[108,2],[110,4],[110,8],
    [112,4],[116,6],[120,4],[120,8],[118,12],
    [116,16],[114,20],[112,24],[118,26],[120,28],
    [122,30],[122,34],[124,38],[124,40],[120,42],
    [116,44],[112,48],[108,50],[104,48],[102,50],
    [98,52],[96,50],[92,50],[88,52],[84,54],
    [80,50],[76,54],[72,56],[68,54],[64,50],
    [60,48],[56,50],[52,44],[48,44],[44,44],
    [40,44],[38,46],[36,44],[34,44],[32,42],[26,42] ],
  /* Indian subcontinent */
  [ [68,24],[70,22],[72,22],[74,22],[76,20],
    [78,18],[80,14],[78,10],[76,8],[78,8],
    [80,12],[82,14],[80,18],[82,18],[84,20],
    [86,22],[88,22],[90,22],[90,26],[88,26],
    [86,26],[84,26],[82,26],[80,26],[76,24],
    [74,22],[72,22],[68,24] ],
  /* SE Asia peninsula */
  [ [98,20],[100,14],[102,10],[104,6],[102,4],
    [104,2],[106,2],[108,4],[110,6],[108,4],
    [104,6],[102,8],[100,12],[98,16],[98,20] ],
  /* Australia */
  [ [114,-22],[118,-20],[122,-18],[126,-16],[130,-14],
    [134,-12],[136,-14],[138,-16],[140,-18],[144,-16],
    [148,-18],[152,-20],[154,-22],[154,-26],[152,-28],
    [150,-30],[152,-34],[150,-36],[148,-38],[146,-38],
    [144,-38],[140,-36],[138,-36],[136,-34],[132,-32],
    [128,-34],[126,-34],[124,-32],[122,-32],[120,-30],
    [116,-26],[114,-24],[114,-22] ],
  /* New Zealand (N+S island hint) */
  [ [172,-34],[174,-36],[174,-38],[172,-40],[170,-42],
    [168,-44],[166,-46],[168,-46],[170,-44],[172,-40],
    [174,-38],[172,-34] ],
  /* Japan (Honshu simplified) */
  [ [130,32],[132,34],[134,36],[136,36],[138,38],
    [140,38],[142,40],[144,44],[143,42],[141,40],
    [139,40],[138,42],[136,40],[134,36],[132,34],[130,32] ],
];

/* ─── Orthographic projection ────────────────────────────────── */
function project(lng: number, lat: number, rot: number, cx: number, cy: number, R: number) {
  const phi = (lat * Math.PI) / 180;
  const lam = ((lng + rot) * Math.PI) / 180;
  const cosLat = Math.cos(phi);
  const x = cosLat * Math.sin(lam);
  const y = -Math.sin(phi);
  const z = cosLat * Math.cos(lam);
  return { x: cx + R * x, y: cy + R * y, z, visible: z > -0.04 };
}

/* ─── Manual rounded rect helper ────────────────────────────── */
function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, rad: number) {
  ctx.beginPath();
  ctx.moveTo(x + rad, y);
  ctx.lineTo(x + w - rad, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + rad);
  ctx.lineTo(x + w, y + h - rad);
  ctx.quadraticCurveTo(x + w, y + h, x + w - rad, y + h);
  ctx.lineTo(x + rad, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - rad);
  ctx.lineTo(x, y + rad);
  ctx.quadraticCurveTo(x, y, x + rad, y);
  ctx.closePath();
}

/* ─── Main component ─────────────────────────────────────────── */
const BASE = 400; // logical size

export function GlobeCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef   = useRef<number>(0);
  const rotRef    = useRef<number>(30); // initial rotation so Europe/Asia start visible

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rawCtx = canvas.getContext('2d');
    if (!rawCtx) return;
    // Cast to non-nullable so TypeScript doesn't complain inside the rAF closure
    const ctx: CanvasRenderingContext2D = rawCtx;

    /* HiDPI */
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width  = BASE * dpr;
    canvas.height = BASE * dpr;
    canvas.style.width  = `${BASE}px`;
    canvas.style.height = `${BASE}px`;
    ctx.scale(dpr, dpr);

    const W = BASE, H = BASE;
    const cx = W / 2, cy = H / 2;
    const R  = W * 0.42;

    let last = 0;

    function frame(t: number) {
      const dt  = Math.min(t - last, 50); // cap dt to avoid big jumps on tab refocus
      last = t;
      rotRef.current -= dt * 0.014;       // ~14°/sec

      const rot   = rotRef.current;
      const pulse = (Math.sin(t / 450) + 1) / 2; // 0→1 for pulsing rings

      ctx.clearRect(0, 0, W, H);

      /* ── Ocean sphere ─────────────────────────────────── */
      const ocean = ctx.createRadialGradient(cx - R * 0.28, cy - R * 0.28, R * 0.04, cx, cy, R);
      ocean.addColorStop(0,   '#eaf0ff');
      ocean.addColorStop(0.5, '#dae5f8');
      ocean.addColorStop(1,   '#c5d6ef');
      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.fillStyle = ocean;
      ctx.fill();
      ctx.restore();

      /* ── Clip all interior drawing to the sphere ──────── */
      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.clip();

      /* Grid lines */
      ctx.lineWidth = 0.55;
      ctx.strokeStyle = 'rgba(80,130,200,0.10)';
      for (let lat = -75; lat <= 75; lat += 30) {
        ctx.beginPath();
        let first = true;
        for (let lng = -180; lng <= 180; lng += 3) {
          const p = project(lng, lat, rot, cx, cy, R);
          if (p.visible) { first ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y); first = false; }
          else first = true;
        }
        ctx.stroke();
      }
      for (let lng = -180; lng < 180; lng += 30) {
        ctx.beginPath();
        let first = true;
        for (let lat = -90; lat <= 90; lat += 3) {
          const p = project(lng, lat, rot, cx, cy, R);
          if (p.visible) { first ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y); first = false; }
          else first = true;
        }
        ctx.stroke();
      }

      /* Land polygons */
      LAND.forEach(poly => {
        ctx.beginPath();
        let drawing = false, prevVis = false;
        poly.forEach(([lng, lat]) => {
          const p = project(lng, lat, rot, cx, cy, R);
          if (p.visible) {
            (!drawing || !prevVis) ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y);
            drawing = true;
          }
          prevVis = p.visible;
        });
        ctx.closePath();
        ctx.fillStyle   = 'rgba(95,140,215,0.28)';
        ctx.strokeStyle = 'rgba(60,110,200,0.55)';
        ctx.lineWidth   = 0.85;
        ctx.fill();
        ctx.stroke();
      });

      ctx.restore(); /* end sphere clip */

      /* ── Specular highlight ───────────────────────────── */
      const sheen = ctx.createRadialGradient(cx - R * 0.38, cy - R * 0.38, 0, cx - R * 0.38, cy - R * 0.38, R * 0.78);
      sheen.addColorStop(0,   'rgba(255,255,255,0.52)');
      sheen.addColorStop(0.4, 'rgba(255,255,255,0.12)');
      sheen.addColorStop(1,   'rgba(255,255,255,0)');
      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.fillStyle = sheen;
      ctx.fill();
      ctx.restore();

      /* ── Edge shadow (limb darkening) ─────────────────── */
      const limb = ctx.createRadialGradient(cx, cy, R * 0.7, cx, cy, R);
      limb.addColorStop(0, 'rgba(0,20,70,0)');
      limb.addColorStop(1, 'rgba(0,20,70,0.22)');
      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.fillStyle = limb;
      ctx.fill();
      ctx.restore();

      /* ── Sphere border ────────────────────────────────── */
      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(140,180,235,0.50)';
      ctx.lineWidth = 1.5;
      ctx.stroke();
      ctx.restore();

      /* ── Service node dots ───────────────────────────── */
      NODES.forEach(node => {
        const p = project(node.lng, node.lat, rot, cx, cy, R);
        if (!p.visible || p.z < 0.04) return;
        const alpha  = Math.min(1, (p.z - 0.04) / 0.18 + 0.60);

        /* pulsing outer ring */
        const outerR = 6 + pulse * 8;
        ctx.beginPath();
        ctx.arc(p.x, p.y, outerR, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255,94,0,${alpha * (1 - pulse) * 0.75})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        /* second ring (static) */
        ctx.beginPath();
        ctx.arc(p.x, p.y, 7, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255,94,0,${alpha * 0.35})`;
        ctx.lineWidth = 1;
        ctx.stroke();

        /* soft glow */
        const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, 16);
        glow.addColorStop(0, `rgba(255,94,0,${alpha * 0.38})`);
        glow.addColorStop(1, 'rgba(255,94,0,0)');
        ctx.beginPath();
        ctx.arc(p.x, p.y, 16, 0, Math.PI * 2);
        ctx.fillStyle = glow;
        ctx.fill();

        /* core dot */
        ctx.beginPath();
        ctx.arc(p.x, p.y, 4.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,94,0,${alpha})`;
        ctx.fill();

        /* white centre */
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${alpha * 0.92})`;
        ctx.fill();

        /* city label (only when near front hemisphere) */
        if (p.z > 0.22) {
          const textX = p.x + 9;
          const textY = p.y + 4;
          ctx.font = 'bold 10px Inter, system-ui, sans-serif';
          const tw = ctx.measureText(node.label).width;
          const pad = 4, lh = 13;
          const bx = textX - pad, by = textY - lh + 2;
          roundRect(ctx, bx, by, tw + pad * 2, lh + 2, 4);
          ctx.fillStyle = `rgba(255,255,255,${alpha * 0.88})`;
          ctx.fill();
          ctx.fillStyle = `rgba(20,20,20,${alpha})`;
          ctx.fillText(node.label, textX, textY);
        }
      });

      animRef.current = requestAnimationFrame(frame);
    }

    animRef.current = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(animRef.current);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-label="Spinning globe showing Onfix global service nodes"
      style={{ display: 'block', width: `${BASE}px`, height: `${BASE}px` }}
    />
  );
}
