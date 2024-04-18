import React, { useState, useEffect } from "react";
import "./Garage.scss";
import Car from "../../components/car/Car";
import ControlButtons from "../../components/controlButtons/ControlButtons";
import { useGetCarsQuery } from "../../services/carsApi";

const Garage: React.FC = () => {
  const { data, isSuccess } = useGetCarsQuery();

  const [currentPage, setCurrentPage] = useState(1);
  const [isRaceStarted, setIsRaceStarted] = useState(false);

  const recordPerPage = 7;
  const lastIndex = currentPage * recordPerPage;
  const firstIndex = lastIndex - recordPerPage;
  const records = data?.slice(firstIndex, lastIndex);
  const npage = Math.ceil((data?.length || 0) / recordPerPage);
  const numbers = [...Array(npage).keys()].map((num) => num + 1);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    setIsRaceStarted(false); // Stop the race when changing pages
  };

  return (
    <div>
      <ControlButtons
        setIsRaceStarted={setIsRaceStarted}
        carsOnPage={records || []}
      />
      {isSuccess && (
        <div>
          {records?.map((car) => (
            <Car key={car.id} {...car} isRaceStarted={isRaceStarted} />
          ))}
        </div>
      )}
      <nav>
        <ul className="pagination">
          <li className="page">
            <button onClick={() => handlePageChange(currentPage - 1)}>
              Prev
            </button>
          </li>
          {numbers.map((n) => (
            <li key={n} className="page">
              <button onClick={() => handlePageChange(n)}>{n}</button>
            </li>
          ))}
          <li className="page">
            <button onClick={() => handlePageChange(currentPage + 1)}>
              Next
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Garage;
