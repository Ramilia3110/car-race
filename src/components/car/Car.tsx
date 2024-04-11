import { CarModel } from "../../models/car.model";
import Button from "../button/Button";
import { FaCarSide } from "react-icons/fa";

const Car: React.FC<CarModel> = ({ color, name }) => {
  return (
    <div className="car">
      <div className="box1">
        <Button color="blue" title="select" />
        <Button color="purple" title="delete" />
      </div>
      <div className="box2">
        <Button color="blue" title="A" />
        <Button color="purple" title="B" />
      </div>
      <div className="box3">
        <FaCarSide style={{ color: color }} />
      </div>
      <div className="race-line">
        <h3>{name}</h3>
      </div>
    </div>
  );
};

export default Car;
