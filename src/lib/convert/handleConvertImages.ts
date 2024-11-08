import { ImagesConvertOptions } from '@/types/convertOptions/images';
import { showNotification } from '@mantine/notifications';

export const handleConvertImages = async (
  setIsLoading: (isLoading: boolean) => void,
  files: File[],
  options: ImagesConvertOptions
) => {
  try {
    // type validation
    if (files.length === 0) {
      showNotification({
        title: 'Error',
        message: 'No files selected',
        color: 'red',
      });
      return;
    }

    // 파일이 5개를 초과하면 에러 띄우기
    if (files.length > 5) {
      showNotification({
        title: 'Error',
        message: 'Maximum 5 files',
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

    // options 객체의 각 필드를 formData에 추가
    for (const [key, value] of Object.entries(options)) {
      formData.append(key, String(value));
    }

    // 파일들을 formData에 추가
    files.forEach((file, index) => {
      const fileKey = `file${index + 1}`;
      formData.append(fileKey, file);
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
      throw new Error('Failed to convert images');
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
  } catch (error) {
    console.log(error);
    showNotification({
      title: 'Error',
      message:
        error instanceof Error ? error.message : 'Unexpected Error Occurred',
      color: 'red',
    });
    setIsLoading(false);
  }
};
