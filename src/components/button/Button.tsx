import { ButtonProps } from "../../models/button.model";

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
