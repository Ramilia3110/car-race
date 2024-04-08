import { ReactNode } from "react";

interface Button {
  title: string;
  color: string;
  icon?: ReactNode;
}

const Button: React.FC<Button> = ({ color, title, icon }) => {
  return (
    <button style={{ color: color, border: `1px solid ${color}` }}>
      {title}
      {icon && icon}
    </button>
  );
};

export default Button;
