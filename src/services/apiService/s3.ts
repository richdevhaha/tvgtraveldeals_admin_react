import axios from "axios";

export const uploadFileOnS3 = async ({ url, fields, file, type }: any) => {
  const formData = new FormData();
  formData.append("key", fields.key);
  formData.append("Content-Type", type);
  formData.append("acl", "public-read");
  Object.entries(fields).forEach(([key, value]: [any, any]) => {
    if (key !== "key") {
      formData.append(key, value);
    }
  });
  formData.append("file", file);
  await axios({
    headers: {
      Accept: "*/*",
      "Content-Type": "multipart/form-data",
    },
    method: "POST",
    url: url,
    data: formData,
    onUploadProgress: (progressEvent) => {
      // TODO: show upload progress view
      // const percentCompleted = Math.floor((progressEvent.loaded * 100) / progressEvent.total);
      // setUploadProgress(percentCompleted);
    },
  });
  return `${url}/${fields.key}`;
};
