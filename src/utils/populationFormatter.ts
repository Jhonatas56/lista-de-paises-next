export function populationFormatter(population: number) {
  const values = ["", "K", "M", "B", "T"];
  const numDivider = 3;

  const index = Math.floor((`${population}`.length - 1) / numDivider);

  let formatted = parseFloat(
    (index !== 0 ? population / Math.pow(1000, index) : population).toPrecision(
      3
    )
  );
  if (formatted % 1 !== 0) {
    formatted = parseFloat(formatted.toFixed(1));
  }
  return formatted + values[index < 0 ? 0 : index];
}
