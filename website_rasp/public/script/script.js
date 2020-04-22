//import * as from './overlay.js';
//import animationGrid,{panelID} from './overlay.js';

//Create websocket
//LET OP OP DE RASPBERRY MOET SOCKET NAAR EIGEN IP VERWIJZEN IPV LOCALHOST

var ws = new WebSocket('ws://localhost:40510');
ws.onopen = function () {
    console.log('websocket is connected ...')
 // sending a send event to websocket server

 //ws.send('connected')
}

ws.onmessage = function (ev) {
    console.log(ev);
}


//create Panels
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
            colorState: 0,
            clicked: 0,
            column: c%cols,
            row: Math.floor(c/cols),
            item: cell
        };
    };
};

makeRows(rows, cols);


//Handle Click events
let interval;

const panels = document.getElementsByClassName("grid-item");

Array.from(panels).forEach(panel => panel.addEventListener('mousedown', changePanel));
Array.from(panels).forEach(panel => panel.addEventListener('mouseup', stopChangePanel));

function changePanel(e) {
    const panel = this;
    let panelState;

    for(let i = 0; i < panelID.length; i++){
        if (panelID[i].name === this.id) {
            panelState = panelID[i];
            
            if (panelID[i].clicked == 0) {
                panelID[i].clicked = 1;
                
                interval = setInterval(() => {
                    panelState.colorState = panelState.colorState + 0.2;
                    panel.style.backgroundColor = `rgba(0,0,0,${panelState.colorState})`;
                    
                    if (panelState.colorState >= 1) {
                        panelState.colorState = 1;
                        clearInterval(interval);
                    };
                    ws.send(JSON.stringify(panelState)); //send object to server
                }, 200);

            } else if(panelID[i].clicked == 1) {
                panelID[i].clicked = 0;

                interval = setInterval(() => {
                    panelState.colorState = panelState.colorState - 0.2;
                    panel.style.backgroundColor = `rgba(0,0,0,${panelState.colorState})`;
                    
                    
                    if (panelState.colorState <= 0.01) {
                        panelState.colorState = 0;
                        clearInterval(interval);
                    };
                    ws.send(JSON.stringify(panelState)); //send object to server
                }, 200);
            }
            panelID[i] = panelState;
        }
    }
}

function stopChangePanel() {
    clearInterval(interval);
};


// ANIMATION FUNCTIONS
function animationGrid(colNumber, rowNumber, times) {
    setTimeout(() => { 
        panelID.forEach(element => {
            if (element.column == colNumber && element.row == rowNumber) {
                if (element.colorState == 0) {
                    element.item.style.backgroundColor = `rgba(0,0,0,.5)`;
                    element.colorState = 1;
                    ws.send(JSON.stringify(element)) //SEND OBJECT to server
                } else if (element.colorState == 1) {
                    element.item.style.backgroundColor = `rgba(0,0,0,.0)`;
                    element.colorState = 0;
                    ws.send(JSON.stringify(element)) //SEND OBJECT to server
                };
            };
        })
    }, times * 300);
};

function loopVerticalGrid() {
    for (let k=0; k<=rows; k++) {
        let i = k;
        let j = 0;
        while (j < rows) {            
            animationGrid(i,j,k);
            j++;
        }
    }
}

function loopHorizontalGrid() {
    for (let k=0; k<=cols; k++) {
        let i = k;
        let j = 0;
        while (j < cols) {
            console.log(i,j);
            animationGrid(j, i, k);  //inverted j & i to assign rows instead of cols
            j++;
        }
    }
}

function loopDiagonalGrid() {
    for (let k =0; k<= rows-1; k++) {
        let i = k;
        let j = 0;
        while (i>=0) { 
            animationGrid(i,j,k);
            i = i-1;
            j = j+1;
        };
    };
    for (let k = 1; k<= rows-1; k++){
        let i = rows - 1;
        let j = k;
        while (j <= rows-1) {
            animationGrid(i,j,k+rows-1);
            i = i-1;
            j = j+1;
        };
    };
};



//setInterval(loopDiagonalGrid, 2000);
//setInterval(loopVerticalGrid, 2000);

//setInterval(loopHorizontalGrid, 2000);
