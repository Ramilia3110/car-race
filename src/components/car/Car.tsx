import { CarModel } from "../../models/car.model";
import Button from "../button/Button";
import { FaCarSide } from "react-icons/fa";

const Car: React.FC<CarModel> = ({ color, name }) => {
  return (
    <div className="car">
      <Button color="blue" title="select" />
      <Button color="purple" title="delete" />
      <div className="car-right">
        <FaCarSide style={{ color: color }} />
        <h3>{name}</h3>
      </div>
    </div>
  );
};

export default Car;
