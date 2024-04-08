import React from "react";
import Button from "../../components/button/Button";
import { GrCaretNext } from "react-icons/gr";
import { RxReset } from "react-icons/rx";
import Car from "../../components/car/Car";
import { useGetCarsQuery } from "../../services/carsApi";

const Garage: React.FC = () => {
  const { data, error, isLoading, isSuccess } = useGetCarsQuery();

  return (
    <div>
      <div className="buttons-line">
        <Button title="Race" color="red" icon={<GrCaretNext />} />
        <Button title="Reset" color="orange" icon={<RxReset />} />
        <Button title="Generate cars" color="pink" />
      </div>
      {isLoading && <h2>Loading...</h2>}
      {isSuccess && (
        <div>
          {data?.map((car, index) => (
            <Car key={index} title={car.title} color={car.color} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Garage;
