export const generateRandomColor = () => {
  return "#" + Math.floor(Math.random() * 16777215).toString(16);
};

// Function to generate a random car name
export const generateRandomCarName = () => {
  const carNames = [
    "Ferrari",
    "Honda",
    "Toyota",
    "BMW",
    "Mercedes",
    "Audi",
    "Ford",
    "Chevrolet",
    "Volkswagen",
    "Tesla",
  ];
  return carNames[Math.floor(Math.random() * carNames.length)];
};

const new100Cars = Array.from({ length: 100 }, (_, index) => ({
  id: `${generateRandomCarName()}${index + 1}`,
  name: generateRandomCarName(),
  color: generateRandomColor(),
}));
