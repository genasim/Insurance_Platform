import Right from "./Right";

export interface User {
  email: string;
  password: string;
  fullName: string;
  idNumber: string;
  rights: Right[];
}

export default User;
