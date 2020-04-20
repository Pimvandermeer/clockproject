//import * as from './overlay.js';
//import test,{panelID} from './overlay.js';



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
            clicked: 0
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