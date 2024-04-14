import React from "react";

interface AuthProps extends React.HTMLAttributes<HTMLDivElement> {}

const Auth: React.FC<AuthProps> = (props) => {
  const { ...rest } = props;

  return <div {...rest}>Auth page</div>;
};

export default Auth;
