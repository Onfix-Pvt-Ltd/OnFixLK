import React, { useEffect } from 'react';

interface SEOHelperProps {
  title: string;
  description?: string;
}

export const SEOHelper: React.FC<SEOHelperProps> = ({ title, description }) => {
  useEffect(() => {
    document.title = `${title} | Onfix Pvt Ltd`;
    
    if (description) {
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', description);
      } else {
        const meta = document.createElement('meta');
        meta.name = 'description';
        meta.content = description;
        document.head.appendChild(meta);
      }
    }
  }, [title, description]);

  return null;
};
