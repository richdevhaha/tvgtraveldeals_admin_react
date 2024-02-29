import { toast } from "react-toastify";
import { StringUtil } from "../utils";

export const showSuccessMessage = (message: string) => {
  toast.success(StringUtil.capitalizeFLetter(message), {
    position: "top-center",
    theme: "light",
    hideProgressBar: true,
    autoClose: 3000,
  });
};

export const showInfoMessage = (message: string) => {
  toast.info(StringUtil.capitalizeFLetter(message), {
    position: "top-center",
    hideProgressBar: true,
    theme: "light",
    autoClose: 3000,
  });
};

export const showErrorMessage = (message: string) => {
  toast.error(StringUtil.capitalizeFLetter(message), {
    position: "top-center",
    hideProgressBar: true,
    theme: "light",
    autoClose: 4000,
  });
};
