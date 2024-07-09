/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserDto } from "../../models/User";
import { AuthStorageKeys } from "../../shared/enums/AuthStorageKeys";
import useService from "../../shared/hooks/useService";
import { LoggedInContext } from "../../shared/layout/Layout";
import UserForm from "./UserForm";
import Services from "../../shared/enums/Services";

const Register: React.FC = () => {
  const navigate = useNavigate();
  const { setLoggedIn } = useContext(LoggedInContext);
  const registerUser = useService(Services.RegisterUser);

  const handleUserRegister = async (user: UserDto) => {
    try {
      const result = await registerUser(user);
      sessionStorage.setItem(AuthStorageKeys.TOKEN, result.token);
      setLoggedIn(true);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container-md align-content-center my-5">
      <div className="row justify-content-center">
        <div className="col-md-4 bg-light-subtle rounded border border-2">
          <h4 className="h4 text-center my-4">Register an account with us!</h4>
          <UserForm onSubmit={handleUserRegister} />
        </div>
      </div>
    </div>
  );
};

export default Register;
