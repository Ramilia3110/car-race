import React, { useState } from "react";

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

  const [currentPage, setCurrentPage] = useState(1);
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
      <ControlButtons />
      {getCarsLoading && <h2>Loading...</h2>}
      {isSuccess && (
        <div>
          {records?.map((car) => (
            <Car key={car.id} name={car.name} color={car.color} />
          ))}
        </div>
      )}
      <nav>
        <ul className="pagination">
          <li>
            <a href="#" onClick={prePage}>
              Prev
            </a>
          </li>
          {numbers.map((n) => (
            <li key={n}>
              <a href="#" onClick={() => changeCurrentPage(n)}>
                {n}
              </a>
            </li>
          ))}
          <li>
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
