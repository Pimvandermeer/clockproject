const container = document.querySelector(".container");

function makeRows(rows, cols) {
  container.style.setProperty('--grid-rows', rows);
  container.style.setProperty('--grid-cols', cols);

  for (c = 0; c < (rows * cols); c++) {
    let cell = document.createElement("div");
    cell.innerText = (c + 1);
    container.appendChild(cell).className = `grid-item ${c + 1}`;
  };
};

makeRows(5, 4);

const griditem = document.querySelector(".grid-item");

griditem.addEventListener('click', () => {
    event.preventDefault();
    console.log(this);
});