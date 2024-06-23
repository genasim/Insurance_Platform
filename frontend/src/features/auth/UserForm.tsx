import { yupResolver } from "@hookform/resolvers/yup";
import { FC, useState } from "react";
import { Form, InputGroup } from "react-bootstrap";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import * as yup from "yup";
import { User, UserDto } from "../../models/User";
import checkValidEmail from "../../shared/services/check-valid-email";

interface UserFormProps {
  user?: User;
  onSubmit: (user: UserDto) => void;
}

interface FormData {
  email: string;
  fullName: string;
  password: string;
  confirmPassword: string;
}

const UserForm: FC<UserFormProps> = ({ onSubmit, user }) => {
  const [previousEmail, setPreviousEmail] = useState<string>(user?.email ?? "");

  const formSchema = yup.object({
    email: yup
      .string()
      .required("Required field")
      .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g, {
        message: "Invalid email signiture",
      })
      .test(
        "check email validity",
        "Email is already in use",
        async (value, context) => {
          if (value === previousEmail) {
            return true;
          }
          setPreviousEmail(value);
          const isValid = await checkValidEmail(value);
          return isValid;
        }
      ),
    fullName: yup.string().required("Required field"),
    password: yup
      .string()
      .required("Required field")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        {
          message:
            "Password must contain one lowercase, one uppercase and one special character",
        }
      ),
    confirmPassword: yup
      .string()
      .required("Required field")
      .oneOf([yup.ref("password")], "Passwords do not match"),
  });

  const { handleSubmit, register, formState } = useForm<FormData>({
    defaultValues: {
      email: user?.email ?? "",
      fullName: user?.fullName ?? "",
      password: "",
      confirmPassword: "",
    },
    mode: "onBlur",
    resolver: yupResolver(formSchema),
  });

  const processFormData: SubmitHandler<FormData> = (formData) => {
    const user: UserDto = {
      email: formData.email,
      fullName: formData.fullName,
      password: formData.password,
    };

    onSubmit(user);
  };

  return (
    <Form onSubmit={handleSubmit(processFormData)}>
      <Form.Group className="mb-4">
        <Form.Label>Your account email</Form.Label>
        <InputGroup>
          <InputGroup.Text>
            <i className="bi bi-envelope"></i>
          </InputGroup.Text>
          <Form.Control
            isInvalid={formState.errors.email !== undefined}
            aria-label="Enter your email"
            placeholder="mario@mail.co"
            {...register("email")}
          />
          <Form.Control.Feedback type="invalid">
            {formState.errors.email?.message}
          </Form.Control.Feedback>
        </InputGroup>
      </Form.Group>
      <Form.Group className="mb-4">
        <Form.Label>Enter password</Form.Label>
        <InputGroup>
          <InputGroup.Text>
            <i className="bi bi-lock"></i>
          </InputGroup.Text>
          <Form.Control
            type="password"
            isInvalid={formState.errors.password !== undefined}
            aria-label="Enter password field"
            placeholder="e.g. Password123!"
            {...register("password")}
          />
          <Form.Control.Feedback type="invalid">
            {formState.errors.password?.message}
          </Form.Control.Feedback>
        </InputGroup>
      </Form.Group>
      <Form.Group className="mb-4">
        <Form.Label>Confirm password</Form.Label>
        <InputGroup>
          <InputGroup.Text>
            <i className="bi bi-lock"></i>
          </InputGroup.Text>
          <Form.Control
            type="password"
            isInvalid={formState.errors.confirmPassword !== undefined}
            aria-label="Confirm password field"
            {...register("confirmPassword")}
          />
          <Form.Control.Feedback type="invalid">
            {formState.errors.confirmPassword?.message}
          </Form.Control.Feedback>
        </InputGroup>
      </Form.Group>
      <Form.Group className="mb-4">
        <Form.Label>Enter full name</Form.Label>
        <InputGroup>
          <InputGroup.Text>
            <i className="bi bi-person"></i>
          </InputGroup.Text>
          <Form.Control
            isInvalid={formState.errors.fullName !== undefined}
            aria-label="Enter full name field"
            placeholder="Marius Kurkinski"
            {...register("fullName")}
          />
          <Form.Control.Feedback type="invalid">
            {formState.errors.fullName?.message}
          </Form.Control.Feedback>
        </InputGroup>
      </Form.Group>
      <Link
        to="/login"
        className="text-center d-block text-decoration-none mb-4"
      >
        Already have an account? Login now!
      </Link>
      <div className="mb-4 text-center">
        <button type="submit" className="btn btn-primary">
          Register
        </button>
      </div>
    </Form>
  );
};

export default UserForm;
