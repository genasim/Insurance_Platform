import React from "react";

interface ClaimsPaymentProps extends React.HTMLAttributes<HTMLDivElement> {}

const ClaimsPayment: React.FC<ClaimsPaymentProps> = (props) => {
  const { ...rest } = props;
  
  return <div {...rest}>ClaimsPayment page</div>;
};

export default ClaimsPayment;
