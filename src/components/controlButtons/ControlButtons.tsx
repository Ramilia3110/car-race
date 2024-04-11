import Button from "../../components/button/Button";
import { useGenerateCarsMutation } from "../../services/carsApi";
import { GrCaretNext } from "react-icons/gr";
import { RxReset } from "react-icons/rx";
import {
  generateRandomCarName,
  generateRandomColor,
} from "../../utils/helpers";

const ControlButtons = () => {
  const [generateCars, { isLoading: generateCarsLoading }] =
    useGenerateCarsMutation();

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
  return (
    <div>
      <div className="buttons-line">
        <Button title="Race" color="red" icon={<GrCaretNext />} />
        <Button title="Reset" color="orange" icon={<RxReset />} />
        <Button
          title="Generate cars"
          color="pink"
          onClick={handleGenerateCars}
          disabled={generateCarsLoading}
        />
        {generateCarsLoading && <p>Generating cars...</p>}{" "}
      </div>
    </div>
  );
};

export default ControlButtons;
