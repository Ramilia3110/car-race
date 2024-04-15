import { ButtonProps } from "../../models/button.model";
import "./Button.scss";

const Button: React.FC<ButtonProps> = ({
  color,
  title,
  icon,
  onClick,
  disabled,
  style,
}) => {
  return (
    <button
      className="button"
      style={{ color: color, border: `1px solid ${color}` }}
      onClick={onClick}
      disabled={disabled}
    >
      {title}
      {icon && icon}
    </button>
  );
};

export default Button;
