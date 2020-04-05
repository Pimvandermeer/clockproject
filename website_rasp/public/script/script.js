let panelID = [];

const container = document.querySelector(".container");

function makeRows(rows, cols) {
  container.style.setProperty('--grid-rows', rows);
  container.style.setProperty('--grid-cols', cols);

  for (c = 0; c < (rows * cols); c++) {
    let cell = document.createElement("div");
    cell.innerText = (c + 1);
    container.appendChild(cell).className = `grid-item ${c + 1}`;
    panelID[c] = {
        panelID: `grid-item ${c + 1}`,
        colorState: 0
    };
  };
};

makeRows(5, 4);


//Handle Click events
let interval;

const panels = document.querySelectorAll('.grid-item');

panels.forEach(panel => panel.addEventListener('mousedown', logStartTime));
panels.forEach(panel => panel.addEventListener('mouseup', logEndTime));

function logStartTime(e) {
    const panel = this;
    let color = 0;

    interval = setInterval(function (){
        color = color + 0.1;
        console.log(color);
        panel.style.backgroundColor = `rgba(0,0,0,${color})`;
    }, 200);

}

function logEndTime() {
    clearInterval(interval);
};


