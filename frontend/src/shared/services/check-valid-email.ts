import { handleRequest } from "../handle-request";

const checkValidEmail = async (email: string): Promise<boolean> => {
  try {
    // const resp = await handleRequest("POST", "auth/valid-email", { email });
    // if (resp.status === 200) {
    //   return true;
    // }
    return false;
  } catch (error) {
    return false;
  }
};

export default checkValidEmail;
