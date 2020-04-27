let panelID = [];

const rows = 5;
const cols = 4;

function addColsClass(cell, c) {
    let column = c%cols;
    cell.classList.add(`column_${column}`)
};

function addRowsClass(cell, c) {
    let row = Math.floor(c / cols);
    cell.classList.add(`row_${row}`);
};

const container = document.querySelector(".container");

function makeRows(rows, cols) {
    container.style.setProperty('--grid-rows', rows);
    container.style.setProperty('--grid-cols', cols);

    for (let c = 0; c < (rows * cols); c++) {
        let cell = document.createElement("div");
        cell.innerText = (c + 1);
        container.appendChild(cell).className = `grid-item ${c + 1}`;
        container.appendChild(cell).setAttribute("id", `grid-item ${c + 1}`);
        addColsClass(cell, c);
        addRowsClass(cell, c);

        panelID[c] = {
            name: `grid-item ${c + 1}`,
            motor: c,
            colorState: 0,
            clicked: 0,
            column: c%cols,
            row: Math.floor(c/cols),
            item: cell
        };
    };
};

makeRows(rows, cols);

export {makeRows, panelID, rows, cols};