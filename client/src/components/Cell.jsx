const Cell = ({ value, row, col, onClick }) => {

  const getSymbol = () => {
    if (value === 0) return 'X';
    if (value === 1) return 'O';
    return '';
  };

  return (
    <div onClick={() => onClick(row, col)}>
      {getSymbol()}
    </div>
  );
};

export default Cell;