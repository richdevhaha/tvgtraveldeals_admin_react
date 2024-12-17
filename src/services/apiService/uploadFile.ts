import { axiosClientForm } from "./axiosClient";

export const uploadFiles = async ({ url, files, folder = "" }: any) => {
  const formData = new FormData();

  files.map((one: any) => formData.append(`files`, one));
  folder && formData.append("folder", folder);

  const { data } = await axiosClientForm.post(url, formData);
  return data;
};

export const uploadOneFile = async ({ url, file, folder = "", id = "" }: any) => {
  const formData = new FormData();

  formData.append(`file`, file);
  folder && formData.append("folder", folder);
  id && formData.append("id", id);

  const { data } = await axiosClientForm.post(url, formData);
  return data;
};