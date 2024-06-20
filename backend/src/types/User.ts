import Right from "./Right";

export interface User {
  email: string;
  password: string;
  fullName: string;
  idNumber: number;
  rights: Right[];
}

export default User;
