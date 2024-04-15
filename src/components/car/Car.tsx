import React, { useState } from "react";
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
  CarModel & { setSelectCar: (value: CarModel | null) => void }
> = ({ id, color, name, setSelectCar }) => {
  const [clicked, setClicked] = useState(false);
  const [deleteCar] = useDeleteCarMutation();
  const [isDriving, setIsDriving] = useState(false); // State to track driving mode

  const [startStopEngine, { isLoading }] = useStartStopEngineMutation();
  const [startDriveMode] = useStartDriveModeMutation();

  const handleStartEngine = async () => {
    const response = await startStopEngine({ id, status: "started" });
    if (!response.error) {
      // Start the drive mode after the engine is started successfully
      handleDriveMode();
    } else {
      console.error("Error starting engine:", response.error);
    }
  };

  const handleStopEngine = async () => {
    const response = await startStopEngine({ id, status: "stopped" });
    if (!response.error) {
      // Stop the drive mode after the engine is stopped successfully
      stopDriveMode();
    } else {
      console.error("Error stopping engine:", response.error);
    }
  };

  const handleDriveMode = async () => {
    try {
      const response = await startDriveMode({ id, status: "drive" });
      if (response.error) {
        console.error("Error starting drive mode:", response.error);
        // Stop animation here if needed
      } else {
        setIsDriving(true); // Set driving mode to true
        console.log("Drive mode started");
        // Trigger animation here
      }
    } catch (error) {
      console.error("Error starting drive mode:", error);
      // Stop animation here if needed
    }
  };

  const stopDriveMode = async () => {
    try {
      // Send a request to stop the drive mode
      const response = await startDriveMode({ id, status: "stop" });
      if (response.error) {
        console.error("Error stopping drive mode:", response.error);
        // Stop animation here if needed
      } else {
        setIsDriving(false); // Set driving mode to false
        console.log("Drive mode stopped");
        // Stop animation here if needed
      }
    } catch (error) {
      console.error("Error stopping drive mode:", error);
      // Stop animation here if needed
    }
  };

  //Select Car
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
        <div className={`car ${isDriving ? "driving" : ""}`}>
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
