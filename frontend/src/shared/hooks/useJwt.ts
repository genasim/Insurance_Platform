import { jwtDecode } from "jwt-decode";
import { Right } from "../../models/Rights";
import { AuthStorageKeys } from "../enums/AuthStorageKeys";
import { useMemo } from "react";

interface JwtPayload {
  _id: string;
  email: string;
  rights: Right[];
}

const useJwt = () => {
  const token = sessionStorage.getItem(AuthStorageKeys.TOKEN);
  const decodedToken = useMemo(() => {
    if (token !== null) {
      return jwtDecode<JwtPayload>(token);
    }
    return undefined;
  }, [token]);

  return decodedToken;
};

export default useJwt;
