import axios, { InternalAxiosRequestConfig } from "axios";
import { DeviceUUID } from "device-uuid";

import { getAuthToken } from "../../config";
import packageJson from "../../../package.json";

const API_ENDPOINT = process.env.REACT_APP_API_URL;

const Client = (contentType: string = "application/json") => {
  const axiosInstance = axios.create({
    baseURL: API_ENDPOINT,
    headers: { "Content-Type": contentType, Accept: contentType },
  });

  axiosInstance.interceptors.request.use(
    async (request: InternalAxiosRequestConfig) => {
      const token = getAuthToken();
      let Authorization = "";
      if (token) {
        Authorization = `Bearer ${token}`;
      }

      const deviceUUID = new DeviceUUID().get();
      const session = new Date().getTime();
      const { name, version } = packageJson;
      const platform = new DeviceUUID().parse().platform.replace(/\s/g, "_").toLowerCase();
      const appID = `${name}/${platform}/${version}`;

      request.headers.set({
        ...request.headers,
        Authorization: Authorization,
        device: deviceUUID,
        session: session.toString(),
        appID,
      });

      return request;
    },

    (error) => Promise.reject(error)
  );

  return axiosInstance;
};

export const axiosClient = Client();
export const axiosClientForm = Client("multipart/form-data");
