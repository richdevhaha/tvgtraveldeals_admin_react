import { axiosClientForm } from "./axiosClient";

export const uploadFiles = async ({ url, files, folder = "" }: any) => {
  const formData = new FormData();

  files.map((one: any) => formData.append(`files`, one));
  folder && formData.append("folder", folder);

  const { data } = await axiosClientForm.post(url, formData);
  return data;
};
