import { CarModel } from "../../models/car.model";
import Button from "../button/Button";
import { FaCarSide } from "react-icons/fa";

const Car: React.FC<CarModel> = ({ color, title }) => {
  return (
    <div>
      <Button color="blue" title="select" />
      <Button color="purple" title="delete" />
      <FaCarSide style={{ color: color }} />
      <p>{title}</p>
    </div>
  );
};

export default Car;
