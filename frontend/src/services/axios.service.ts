import axios from "axios";
import { config } from "../config";
import { errorToast } from "./toaster.services";

export const postData = async (url: string, data:any) => {
  try {
    const resp = await axios.post(`${config.SERVER_URL}${url}`, data);
    return resp.data;
  } catch (error: any) {
    errorToast(error.response.data.error);
  }
};