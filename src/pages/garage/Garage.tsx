import React, { useEffect, useState } from "react";
import "./Garage.scss";
import Car from "../../components/car/Car";
import { useGetCarsQuery } from "../../services/carsApi";
import ControlButtons from "../../components/controlButtons/ControlButtons";

const Garage: React.FC = () => {
  const {
    data,
    error,
    isLoading: getCarsLoading,
    isSuccess,
    refetch: refetchCars,
  } = useGetCarsQuery();

  useEffect(() => {
    refetchCars();
  }, [data, refetchCars]);

  const [currentPage, setCurrentPage] = useState(1);
  const [selectCar, setSelectCar] = useState<CarModel | null>(null);

  const recordPerPage = 7;
  const lastIndex = currentPage * recordPerPage;
  const firstIndex = lastIndex - recordPerPage;
  const records = data?.slice(firstIndex, lastIndex);
  const npage = Math.ceil((data?.length || 0) / recordPerPage); // Corrected calculation
  const numbers = [...Array(npage).keys()].map((num) => num + 1);

  function prePage() {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  function changeCurrentPage(id) {
    setCurrentPage(id);
  }

  function nextPage() {
    if (currentPage !== npage) {
      setCurrentPage(currentPage + 1);
    }
  }

  return (
    <div>
      <ControlButtons selectCar={selectCar} setSelectCar={setSelectCar} />
      {getCarsLoading && <h2>Loading...</h2>}
      {isSuccess && (
        <div>
          {records?.map((car) => (
            <div key={car.id}>
              <Car
                id={car.id}
                name={car.name}
                color={car.color}
                setSelectCar={setSelectCar}
              />
            </div>
          ))}
        </div>
      )}
      <nav>
        <ul className="pagination">
          <li className="page">
            <a href="#" onClick={prePage}>
              Prev
            </a>
          </li>
          {numbers.map((n) => (
            <li key={n} className="page">
              <a href="#" onClick={() => changeCurrentPage(n)}>
                {n}
              </a>
            </li>
          ))}
          <li className="page">
            <a href="#" onClick={nextPage}>
              Next
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Garage;
