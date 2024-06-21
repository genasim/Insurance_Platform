import { jwtDecode } from "jwt-decode";
import { useState } from "react";
import { Right } from "../../models/Rights";

interface JwtPayload {
  _id: string;
  email: string;
  rights: Right[];
}

const useJwt = () => {
  const [payload, setPayload] = useState<JwtPayload>({
    _id: "",
    email: "",
    rights: [],
  });

  const token = sessionStorage.getItem("jwtToken");

  if (token) {
    const decodedToken = jwtDecode<JwtPayload>(token);
    setPayload({
      _id: decodedToken._id,
      email: decodedToken.email,
      rights: decodedToken.rights,
    });
  }
  return payload;
};

export default useJwt;
