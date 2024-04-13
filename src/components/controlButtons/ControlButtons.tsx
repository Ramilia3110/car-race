import { useState } from "react";
import Button from "../../components/button/Button";
import {
  useGenerateCarsMutation,
  useGetCarQuery,
  useUpdateCarMutation,
} from "../../services/carsApi";
import { GrCaretNext } from "react-icons/gr";
import { RxReset } from "react-icons/rx";
import {
  generateRandomCarName,
  generateRandomColor,
} from "../../utils/helpers";

const ControlButtons: React.FC<{
  selectCar: boolean;
  setSelectCar: (value: boolean) => void;
}> = ({ selectCar, setSelectCar }) => {
  const { data } = useGetCarQuery();
  const [generateCars, { isLoading: generateCarsLoading }] =
    useGenerateCarsMutation();
  const [updateCar, { isLoading: updateCarLoading }] = useUpdateCarMutation();

  const [color, setColor] = useState("");
  const [name, setName] = useState("");

  const handleGenerateCars = () => {
    for (let i = 0; i < 100; i++) {
      const car = {
        id: `${generateRandomCarName()}${i + 1}`,
        name: generateRandomCarName(),
        color: generateRandomColor(),
      };
      generateCars(car);
    }
  };

  const handleUpdate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (selectCar) {
      const updatedCarData = {
        id: selectCar.id,
        name: name ?? selectCar.name ?? "",
        color: color ?? selectCar.color ?? "",
      };
      updateCar(updatedCarData);
    }
  };

  return (
    <div>
      <div className="buttons-line">
        <Button title="Race" color="red" icon={<GrCaretNext />} />
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
        <Button title="Reset" color="orange" icon={<RxReset />} />
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
