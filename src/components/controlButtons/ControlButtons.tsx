import React, { useState } from "react";
import Button from "../../components/button/Button";
import {
  useGenerateCarsMutation,
  useUpdateCarMutation,
} from "../../services/carsApi";
import { GrCaretNext } from "react-icons/gr";
import { RxReset } from "react-icons/rx";
import {
  generateRandomCarName,
  generateRandomColor,
} from "../../utils/helpers";
import { CarModel } from "../../models/car.model";

const ControlButtons: React.FC<{
  selectCar: CarModel | null;
}> = ({ selectCar }) => {
  const [generateCars, { isLoading: generateCarsLoading }] =
    useGenerateCarsMutation();
  const [updateCar, { isLoading: updateCarLoading }] = useUpdateCarMutation();

  const [color, setColor] = useState("");
  const [name, setName] = useState("");
  const [createColor, setCreateColor] = useState("");
  const [createName, setCreateName] = useState("");
  const carId = Math.floor(Math.random() * 1000);

  const handleGenerateCars = () => {
    for (let i = 0; i < 100; i++) {
      const car = {
        id: carId,
        name: generateRandomCarName(),
        color: generateRandomColor(),
      };
      generateCars(car);
    }
  };

  const handleCreateCar = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (createName && createColor) {
      const car = {
        id: carId,
        name: createName,
        color: createColor,
      };
      generateCars(car);
    }
  };

  const handleUpdate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (selectCar) {
      const updatedCarData = {
        id: selectCar.id,
        name: name || selectCar.name || "",
        color: color || selectCar.color || "",
      };
      console.log("Updated Car Data:", updatedCarData); // Add console log
      updateCar(updatedCarData);
    }
  };

  console.log("Select Car:", selectCar); // Add console log

  return (
    <div>
      <div className="buttons-line">
        <Button title="Race" color="red" icon={<GrCaretNext />} />
        <Button title="Reset" color="orange" icon={<RxReset />} />
        <form onSubmit={handleCreateCar}>
          <input
            type="text"
            value={createName}
            onChange={(e) => setCreateName(e.target.value)}
          />
          <input
            type="color"
            value={createColor}
            onChange={(e) => setCreateColor(e.target.value)}
          />
          <Button title="Create" type="submit" disabled={generateCarsLoading} />
          {generateCarsLoading && <p>Creating car...</p>}
        </form>
        <form onSubmit={handleUpdate}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
          />
          <Button title="Update" type="submit" disabled={updateCarLoading} />
          {updateCarLoading && <p>Updating car...</p>}
        </form>

        <Button
          title="Generate cars"
          color="pink"
          onClick={handleGenerateCars}
          disabled={generateCarsLoading}
        />
        {generateCarsLoading && <p>Generating cars...</p>}
      </div>
    </div>
  );
};

export default ControlButtons;
