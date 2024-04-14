import React from "react";

interface ClientDashboardProps extends React.HTMLAttributes<HTMLDivElement> {}

const ClientDashboard: React.FC<ClientDashboardProps> = (props) => {
  const { ...rest } = props;

  return <div {...rest}>ClientDashboard page</div>;
};

export default ClientDashboard;
