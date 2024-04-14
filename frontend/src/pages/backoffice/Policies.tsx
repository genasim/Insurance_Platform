import React from "react";

interface PoliciesProps extends React.HTMLAttributes<HTMLDivElement> {}

const Policies: React.FC<PoliciesProps> = (props) => {
  const { ...rest } = props;

  return <div {...rest}>Policies page</div>;
};

export default Policies;
