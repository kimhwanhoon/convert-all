export interface ImagesConvertOptions {
  format: string | null;
  quality: number;
  width: number;
  height: number;
  ratio: string | null;
}

export const imageFormats = [
  { value: 'png', label: 'PNG' },
  { value: 'jpg', label: 'JPG/JPEG' },
  { value: 'webp', label: 'WebP' },
  { value: 'avif', label: 'AVIF' },
  { value: 'tiff', label: 'TIFF' },
  { value: 'raw', label: 'RAW' },
  { value: 'heic', label: 'HEIC' },
];
