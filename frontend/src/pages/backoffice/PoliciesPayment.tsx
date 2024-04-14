import React from "react";

interface PoliciesPaymentProps extends React.HTMLAttributes<HTMLDivElement> {}

const PoliciesPayment: React.FC<PoliciesPaymentProps> = (props) => {
  const { ...rest } = props;

  return <div {...rest}>PoliciesPayment page</div>;
};

export default PoliciesPayment;
