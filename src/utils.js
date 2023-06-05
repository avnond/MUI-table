export const getRandomDate = () => {
    const date = Math.floor(Math.random() * Date.now());
    return new Date(date);
};
  
export const getRowClass = (rowId) => {
    return rowId % 2 === 0 ? 'Even' : 'Odd';
};
  