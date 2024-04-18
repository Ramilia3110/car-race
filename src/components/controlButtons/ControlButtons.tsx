import React, { useState } from "react";
import Button from "../../components/button/Button";
import {
  useGenerateCarsMutation,
  useUpdateCarMutation,
  useStartStopEngineMutation,
  useStartDriveModeMutation,
  useCreateWinnerMutation,
} from "../../services/carsApi";
import { GrCaretNext } from "react-icons/gr";
import { RxReset } from "react-icons/rx";
import {
  generateRandomCarName,
  generateRandomColor,
} from "../../utils/helpers";
import { CarModel } from "../../models/car.model";

const ControlButtons: React.FC<{
  selectCar?: CarModel | null;
  setIsRaceStarted: React.Dispatch<React.SetStateAction<boolean>>;
  carsOnPage: CarModel[]; // Add prop to receive cars displayed on the current page
}> = ({ selectCar, carsOnPage, setIsRaceStarted }) => {
  const [generateCars, { isLoading: generateCarsLoading }] =
    useGenerateCarsMutation();
  const [updateCar, { isLoading: updateCarLoading }] = useUpdateCarMutation();

  const [startStopEngine] = useStartStopEngineMutation();
  const [startDriveMode] = useStartDriveModeMutation();
  const [createWinner] = useCreateWinnerMutation();

  const [color, setColor] = useState("");
  const [name, setName] = useState("");
  const [createColor, setCreateColor] = useState("");
  const [createName, setCreateName] = useState("");

  const [winner, setWinner] = useState({});
  // Define isRaceStarted state

  const handleGenerateCars = () => {
    let generatedCount = 0;

    while (generatedCount < 101) {
      const car = {
        id: Math.floor(Math.random() * 1000),
        name: generateRandomCarName(),
        color: generateRandomColor(),
      };
      generateCars(car);
      generatedCount++;
    }
  };

  const handleCreateCar = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (createName && createColor) {
      const car = {
        id: Math.floor(Math.random() * 1000),
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
      updateCar(updatedCarData);
    }
  };

  const handleRace = async () => {
    let raceStarted = false; // Track if the race has started
    if (carsOnPage && carsOnPage.length > 0) {
      await Promise.all(
        carsOnPage.map(async (car) => {
          try {
            const response = await startStopEngine({
              id: car.id,
              status: "started",
            });
            if (!response.error) {
              console.log(`Engine started for car ${car.id}`);
              const drive = await startDriveMode({
                id: car.id,
                status: "drive",
              });
              raceStarted = true; // Set raceStarted to true if at least one car starts driving
              console.log(`Drive mode started for car ${car.id}`);
            } else {
              console.error(
                `Error starting engine for car ${car.id}:`,
                response.error
              );
            }
          } catch (error) {
            console.error(
              `Error starting drive mode for car ${car.id}:`,
              error
            );
          }
        })
      );
      // Set the race started state after the loop completes
      if (raceStarted) {
        setIsRaceStarted(true);
      } else {
        setIsRaceStarted(false);
      }
    }
  };

  const handleReset = async () => {
    setIsRaceStarted(false);
    for (const car of carsOnPage) {
      try {
        // Stop the engine for the selected car
        await startStopEngine({ id: car.id, status: "stopped" });
        console.log(`Engine stopped for car ${car.id}`);

        // Stop driving mode for the selected car
        await startDriveMode({ id: car.id, status: "stop" });
        console.log(`Drive mode stopped for car ${car.id}`);

        // Reset the car's position to its initial position
        const initialPosition = { x: 0, y: 0 }; // Assuming the initial position is (0, 0)
        // Update the car's position in the backend (use appropriate mutation)
        await updateCarPosition(car.id, initialPosition); // Update car position
      } catch (error) {
        console.error(`Error resetting car ${car.id}:`, error);
      }
    }
  };

  return (
    <div>
      <div className="buttons-line">
        <Button
          title="Race"
          color="red"
          icon={<GrCaretNext />}
          onClick={handleRace}
        />

        <Button
          title="Reset"
          color="orange"
          icon={<RxReset />}
          onClick={handleReset}
        />
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
