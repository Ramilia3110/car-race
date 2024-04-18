import React, { useState, useEffect } from "react";
import Button from "../button/Button";
import { FaCarSide } from "react-icons/fa";
import { CarModel } from "../../models/car.model";
import {
  useStartStopEngineMutation,
  useStartDriveModeMutation,
} from "../../services/carsApi";
import "./Car.scss";

const Car: React.FC<
  CarModel & {
    isRaceStarted: boolean;
  }
> = ({ id, color, name, isRaceStarted }) => {
  const [isDriving, setIsDriving] = useState(false);
  const [startStopEngine] = useStartStopEngineMutation();
  const [startDriveMode] = useStartDriveModeMutation();

  useEffect(() => {
    setIsDriving(isRaceStarted);
  }, [isRaceStarted]);

  useEffect(() => {
    let animationInterval;

    if (isDriving) {
      animationInterval = setInterval(() => {
        // Update the car's position or animation state based on its velocity
      }, 1000); // Adjust the interval based on your requirements
    } else {
      clearInterval(animationInterval);
    }

    return () => clearInterval(animationInterval);
  }, [isDriving]);

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

  return (
    <div className="car">
      <div className="box2">
        <Button
          color="blue"
          title="Start"
          onClick={handleStartEngine}
          disabled={isDriving}
        />
        <Button
          color="purple"
          title="Stop"
          onClick={handleStopEngine}
          disabled={!isDriving}
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
