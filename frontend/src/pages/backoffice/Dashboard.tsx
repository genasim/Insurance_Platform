import React from "react";

interface ExpertDashboardProps extends React.HTMLAttributes<HTMLDivElement> {}

const ExpertDashboard: React.FC<ExpertDashboardProps> = (props) => {
  const { ...rest } = props;

  return <div {...rest}>ExpertDashboard page</div>;
};

export default ExpertDashboard;
