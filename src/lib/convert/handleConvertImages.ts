import { ImagesConvertOptions } from '@/types/convertOptions/images';
import { showNotification } from '@mantine/notifications';

export const handleConvertImages = async (
  setIsLoading: (isLoading: boolean) => void,
  files: File[],
  options: ImagesConvertOptions
) => {
  // type validation
  if (files.length === 0) {
    showNotification({
      title: 'Error',
      message: 'No files selected',
      color: 'red',
    });
    return;
  }

  if (!options.format) {
    showNotification({
      title: 'Error',
      message: 'Format is required',
      color: 'red',
    });
    return;
  }

  // if quality is 0
  if (options.quality === 0) {
    showNotification({
      title: 'Error',
      message: 'Quality must be greater than 0',
      color: 'red',
    });
    return;
  }

  setIsLoading(true);
  const formData = new FormData();

  Object.entries(options).forEach(([key, value]) => {
    formData.append(key, value);
  });

  files.forEach((file, index) => {
    formData.append(`file${index + 1}`, file);
  });

  formData.append('apiKey', process.env.NEXT_PUBLIC_API_KEY || '');

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/convert/images`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY || ''}`,
      },
      body: formData,
    }
  );

  if (!response.ok) {
    const error = await response.text();
    showNotification({
      title: 'Error',
      message: error,
      color: 'red',
    });
    setIsLoading(false);
    return;
  }

  const blob = await response.blob();
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'converted_image';
  document.body.appendChild(a);
  a.click();
  a.remove();
  window.URL.revokeObjectURL(url);

  setIsLoading(false);

  return;
};
