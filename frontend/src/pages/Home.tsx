import React from "react";

interface HomeProps extends React.HTMLAttributes<HTMLDivElement> {}

const Home: React.FC<HomeProps> = (props) => {
  const { ...rest } = props;

  return <div {...rest}>Home page</div>;
};

export default Home;
