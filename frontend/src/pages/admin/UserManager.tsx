import React from "react";

interface UserManagerProps extends React.HTMLAttributes<HTMLDivElement> {}

const UserManager: React.FC<UserManagerProps> = (props) => {
  const { ...rest } = props;

  return <div {...rest}>UserManager page</div>;
};

export default UserManager;
