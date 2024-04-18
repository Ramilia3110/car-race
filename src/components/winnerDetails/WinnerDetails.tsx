import { useGetWinnerByIdQuery } from "../../services/carsApi";

const WinnerDetails = () => {
  const {
    data: winner,
    error: winnerError,
    isLoading: winnerLoading,
  } = useGetWinnerByIdQuery();

  if (winnerLoading) return <div>Loading winner details...</div>;
  if (winnerError) return <div>Error: {winnerError.message}</div>;

  return (
    <div>
      <h2>Winner Details</h2>
      <p>ID: {winner.id}</p>
      <p>Wins: {winner.wins}</p>
      <p>Time: {winner.time}</p>
    </div>
  );
};

export default WinnerDetails;
