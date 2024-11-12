const requestSaveLog = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/health/log`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_ADMIN_ACCESS_TOKEN}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error('Failed to save log');
    }

    const { message } = await response.json();

    return { error: null, message };
  } catch (error) {
    console.log(error);
    return {
      error:
        error instanceof Error ? error.message : 'Unexpected Error Occurred',
      message: null,
    };
  }
};

export { requestSaveLog };
