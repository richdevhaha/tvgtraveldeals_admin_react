import { STATUS } from "./status.enum";

export type Blog = {
    id: string;
    title: string;
    banner: string;
    content: string;
    status: STATUS;
};

export const initBlog = {
    id: "new",
    title: "",
    banner: "",
    content: "",
    status: STATUS.ACTIVE,
};