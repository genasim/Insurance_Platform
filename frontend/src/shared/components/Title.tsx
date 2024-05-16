import { FC } from "react";

interface TitleProps {
  title?: string;
  meta?: string;
}

const Title: FC<TitleProps> = ({ title, meta }) => {
  return (
    <div className="mt-3 mb-5 text-center">
      <h1 className="title mt-5 mb-2">{title?.toUpperCase()}</h1>
      <p className="fs-4">{meta}</p>
    </div>
  );
};

export default Title;
