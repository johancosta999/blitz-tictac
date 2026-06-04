const Cell = ({ value, row, col, onClick }) => {

  const getSymbol = () => {
    // accept numeric or string values from the server
    if (value == 0) return 'X';
    if (value == 1) return 'O';
    return '';
  };

  const symbol = getSymbol();
  console.log(`Cell render ${row}-${col}: value=`, value, 'symbol=', symbol);
  const classes = ["cell"];
  if (symbol === "X") classes.push("cell-x");
  if (symbol === "O") classes.push("cell-o");

  return (
    <div
      className={classes.join(" ")}
      onClick={() => onClick(row, col)}
      role="button"
      tabIndex={0}
      aria-label={`board-cell-${row}-${col}`}
    >
      {symbol || (value !== null ? String(value) : "")}
    </div>
  );
};

export default Cell;