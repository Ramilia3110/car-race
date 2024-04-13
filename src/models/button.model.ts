export interface ButtonProps {
  title: string;
  color: string;
  icon?: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  setSelectCar?: Dispatch<SetStateAction<boolean>>;
  style?: React.CSSProperties;
}
