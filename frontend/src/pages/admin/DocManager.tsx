import React from "react";

interface DocManagerProps extends React.HTMLAttributes<HTMLDivElement> {}

const DocManager: React.FC<DocManagerProps> = (props) => {
  const { ...rest } = props;

  return <div {...rest}>DocManager page</div>;
};

export default DocManager;
