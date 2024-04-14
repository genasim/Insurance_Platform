import React from "react";

interface ClaimsProps extends React.HTMLAttributes<HTMLDivElement> {}

const Claims: React.FC<ClaimsProps> = (props) => {
  const { ...rest } = props;
  
  return <div {...rest}>Claims page</div>;
};

export default Claims;
