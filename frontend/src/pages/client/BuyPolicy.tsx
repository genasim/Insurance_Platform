import React from "react";

interface BuyPolicyProps extends React.HTMLAttributes<HTMLDivElement> {}

const BuyPolicy: React.FC<BuyPolicyProps> = (props) => {
  const { ...rest } = props;

  return <div {...rest}>BuyPolicy page</div>;
};

export default BuyPolicy;
