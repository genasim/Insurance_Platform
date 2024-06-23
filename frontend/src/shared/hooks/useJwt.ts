import { jwtDecode } from "jwt-decode";
import { Right } from "../../models/Rights";
import { AuthStorageKeys } from "../enums/AuthStorageKeys";

interface JwtPayload {
  _id: string;
  email: string;
  rights: Right[];
}

const useJwt = () => {
  const token = sessionStorage.getItem(AuthStorageKeys.TOKEN);
  let decodedToken = undefined;

  if (token !== null) {
    decodedToken = jwtDecode<JwtPayload>(token);
  }

  return decodedToken;
};

export default useJwt;
