// export interface ErrorJSON {
//   message?: string;
//   status?: number;
//   errorCode?: string;
// }

export const AppError = (error: any) => {
  if (error.response && error.response.data) {
    return {
      ...error.response.data,
      message: error.response.data.message || error.response.data.error,
      errorCode: error?.response?.data?.errorCode,
    };
  }
  if (error.message) {
    return { message: error.message, status: 0 };
  }
  return { message: "Unknown Error.", status: 0 };
};
