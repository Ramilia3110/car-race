import React, { useState } from "react";
import Button from "../button/Button";
import { FaCarSide } from "react-icons/fa";
import { CarModel } from "../../models/car.model";

const Car: React.FC<
  CarModel & { setSelectCar: (value: CarModel | null) => void }
> = ({ id, color, name, setSelectCar }) => {
  const [clicked, setClicked] = useState(false);

  const handleSelect = () => {
    setClicked(true);
    setSelectCar({ id, color, name });
  };

  return (
    <div className="car">
      <div className="box1">
        <Button
          color="blue"
          title="select"
          onClick={handleSelect}
          disabled={clicked}
        />
        <Button color="purple" title="delete" disabled />
      </div>
      <div className="box2">
        <Button color="blue" title="A" disabled />
        <Button color="purple" title="B" disabled />
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
