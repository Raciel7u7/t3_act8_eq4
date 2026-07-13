import { useState } from 'react';
import { ImageOff } from 'lucide-react';

export function ImagenConRespaldo({
  src,
  alt,
  className = '',
  IconoRespaldo = ImageOff,
  claseIconoRespaldo = '',
}) {
  const [fallo, setFallo] = useState(false);

  if (fallo || !src) {
    return (
      <div
        className={`flex items-center justify-center bg-salvia/40 text-texto-suave ${className}`}
        role="img"
        aria-label={alt}
      >
        <IconoRespaldo className={claseIconoRespaldo || 'h-1/2 w-1/2'} />
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={() => setFallo(true)}
    />
  );
}
