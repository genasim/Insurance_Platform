/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserForm from "./UserForm";
import { UserDto } from "../../models/User";
import registerUserClient from "../../shared/services/register-user-client";
import { AuthStorageKeys } from "../../shared/enums/AuthStorageKeys";

const Register: React.FC = () => {
  const [error, setError] = useState<Error>();
  const navigate = useNavigate();

  const handleUserRegister = (user: UserDto) => {
    registerUserClient(user.email, user.password, user.fullName)
      .then((token) => {
        sessionStorage.setItem(AuthStorageKeys.TOKEN, token);
        navigate("/");
      })
      .catch((error) => {
        console.error(error);
        setError(error);
      });
  };

  return (
    <div className="container-md align-content-center my-5">
      <div className="row justify-content-center">
        <div className="col-md-4 bg-light-subtle rounded border border-2">
          <h4 className="h4 text-center my-4">Register an account with us!</h4>
          <UserForm onSubmit={handleUserRegister} />
          {error && <p className="text-danger">{error.message}</p>}
        </div>
      </div>
    </div>
  );
};

export default Register;
