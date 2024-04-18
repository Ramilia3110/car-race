import React, { useState, useEffect } from "react";
import Button from "../button/Button";
import { FaCarSide } from "react-icons/fa";
import { CarModel } from "../../models/car.model";
import {
  useDeleteCarMutation,
  useStartStopEngineMutation,
  useStartDriveModeMutation,
} from "../../services/carsApi";
import "./Car.scss";

const Car: React.FC<
  CarModel & {
    setSelectCar: (value: CarModel | null) => void;
    isRaceStarted: boolean;
  }
> = ({ id, color, name, setSelectCar, isRaceStarted }) => {
  const [clicked, setClicked] = useState(false);
  const [deleteCar] = useDeleteCarMutation();
  const [isDriving, setIsDriving] = useState(false);

  const [startStopEngine, { isLoading }] = useStartStopEngineMutation();
  const [startDriveMode] = useStartDriveModeMutation();

  useEffect(() => {
    setIsDriving(isRaceStarted); // Set isDriving based on isRaceStarted prop
  }, [isRaceStarted]);

  const handleStartEngine = async () => {
    const response = await startStopEngine({ id, status: "started" });
    if (!response.error) {
      setIsDriving(true);
      const drive = await startDriveMode({ id, status: "drive" });
    } else {
      console.error("Error starting engine:", response.error);
    }
  };

  const handleStopEngine = async () => {
    const response = await startStopEngine({ id, status: "stopped" });
    if (!response.error) {
      setIsDriving(false);
    } else {
      console.error("Error stopping engine:", response.error);
    }
  };

  // Select Car
  const handleSelect = () => {
    setClicked(true);
    const selectedCar = { id, color, name };
    console.log("Selected Car:", selectedCar);
    setSelectCar(selectedCar);
  };

  const handleDelete = async () => {
    console.log("Car ID:", id);
    await deleteCar(id);
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
        <Button
          color="purple"
          title="delete"
          onClick={handleDelete}
          disabled={!id}
        />
      </div>
      <div className="box2">
        <Button
          color="blue"
          title="Start"
          onClick={handleStartEngine}
          disabled={isLoading}
        />
        <Button
          color="purple"
          title="Stop"
          onClick={handleStopEngine}
          disabled={isLoading}
        />
      </div>
      <div className="race-line">
        <div className={`car-image ${isDriving ? "driving" : ""}`}>
          <FaCarSide className="car-model" style={{ color: color }} />
        </div>
        <div className="car-name">
          <h3>{name}</h3>
        </div>
      </div>
    </div>
  );
};

export default Car;
