import React from "react";

interface ClaimSubmissionProps extends React.HTMLAttributes<HTMLDivElement> {}

const ClaimSubmission: React.FC<ClaimSubmissionProps> = (props) => {
  const { ...rest } = props;

  return <div {...rest}>ClaimSubmission page</div>;
};

export default ClaimSubmission;
