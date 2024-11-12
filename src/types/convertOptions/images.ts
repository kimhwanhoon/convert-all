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
  { value: 'raw', label: 'RAW' },
  { value: 'heic', label: 'HEIC' },
  { value: 'ico', label: 'ICO' },
  { value: 'svg', label: 'SVG' },
];

export const normalRatios = [
  { value: '1', label: '1:1 (Square)' },
  { value: '1.33333', label: '4:3' },
  { value: '1.77778', label: '16:9' },
  { value: '0.66667', label: '2:3' },
  { value: '0.8', label: '4:5 (Instagram Portrait)' },
  {
    value: '1.91',
    label: '1.91:1 (Instagram Landscape)',
  },
];

export const icoSizes = [
  { value: '16', label: '16x16' },
  { value: '24', label: '24x24' },
  { value: '32', label: '32x32' },
  { value: '48', label: '48x48' },
  { value: '64', label: '64x64' },
  { value: '128', label: '128x128' },
  { value: '256', label: '256x256' },
];
