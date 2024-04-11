import React from "react";

import Car from "../../components/car/Car";
import { useGetCarsQuery } from "../../services/carsApi";
import ControlButtons from "../../components/controlButtons/ControlButtons";

const Garage: React.FC = () => {
  const {
    data,
    error,
    isLoading: getCarsLoading,
    isSuccess,
  } = useGetCarsQuery();

  return (
    <div>
      <ControlButtons />
      {getCarsLoading && <h2>Loading...</h2>}
      {isSuccess && (
        <div>
          {data?.map((car) => (
            <Car key={car.id} name={car.name} color={car.color} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Garage;
