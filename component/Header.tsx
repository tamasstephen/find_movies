interface Props {
  firstLine: string;
  secondLine: string;
  colourText: string;
}

const Header = ({ firstLine, secondLine, colourText }: Props) => {
  return (
    <h1>
      {firstLine}
      <br />
      {secondLine}
      <span className="gradientText"> {colourText}</span>
    </h1>
  );
};

export default Header;
