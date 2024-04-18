import {
  useGetWinnersQuery,
  useCreateWinnerMutation,
} from "../../services/carsApi";

const Winners = () => {
  const {
    data: winners,
    error: winnersError,
    isLoading: winnersLoading,
  } = useGetWinnersQuery();

  const [createWinner] = useCreateWinnerMutation();

  const handleCreateWinner = async (winnerData) => {
    try {
      await createWinner(winnerData);
    } catch (error) {
      console.error("Error creating winner:", error);
    }
  };

  if (winnersLoading) return <div>Loading winners...</div>;
  if (winnersError) return <div>Error: {winnersError.message}</div>;

  return (
    <div>
      <h2>Winners</h2>
      {winners &&
        winners.map((winner) => (
          <div key={winner.id}>
            <p>ID: {winner.id}</p>
            <p>Wins: {winner.wins}</p>
            <p>Time: {winner.time}</p>
            <p>{winner.name}</p>
          </div>
        ))}
      <button onClick={() => handleCreateWinner({ id: 1, wins: 1, time: 10 })}>
        Create Winner
      </button>
    </div>
  );
};

export default Winners;
