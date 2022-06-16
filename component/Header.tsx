import React from "react";

interface Props {
  text: string;
}

const Header = ({ text }: Props) => {
  return <div>{text}</div>;
};

export default Header;
