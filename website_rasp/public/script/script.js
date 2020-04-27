import * as overlay from './overlay.js';

//Create websocket
//LET OP OP DE RASPBERRY MOET SOCKET NAAR EIGEN IP VERWIJZEN IPV LOCALHOST
var ws = new WebSocket('ws://localhost:40510');
ws.onopen = function () {
    console.log('websocket is connected ...')
};

ws.onmessage = function (ev) {
    console.log(ev);
};

function websocketSend(element) {
    let item = JSON.stringify(element);
    ws.send(item);
};


//Handle Click events
let interval;

const panels = document.getElementsByClassName("grid-item");

Array.from(panels).forEach(panel => panel.addEventListener('mousedown', changePanel));
Array.from(panels).forEach(panel => panel.addEventListener('mouseup', stopChangePanel));

function changePanel(e) {
    const panel = this;
    let panelState;

    for(let i = 0; i < overlay.panelID.length; i++){
        if (overlay.panelID[i].name === this.id) {
            panelState = overlay.panelID[i];
            
            if (overlay.panelID[i].clicked == 0) {
                overlay.panelID[i].clicked = 1;
                
                interval = setInterval(() => {
                    panelState.colorState = panelState.colorState + 0.2;
                    panel.style.backgroundColor = `rgba(0,0,0,${panelState.colorState})`;
                    
                    if (panelState.colorState >= 1) {
                        panelState.colorState = 1;
                        clearInterval(interval);
                    };
                    websocketSend(panelState); //send object to server
                }, 200);

            } else if(overlay.panelID[i].clicked == 1) {
                overlay.panelID[i].clicked = 0;

                interval = setInterval(() => {
                    panelState.colorState = panelState.colorState - 0.2;
                    panel.style.backgroundColor = `rgba(0,0,0,${panelState.colorState})`;
                    
                    
                    if (panelState.colorState <= 0.01) {
                        panelState.colorState = 0;
                        clearInterval(interval);
                    };
                    websocketSend(panelState); //send object to server
                }, 200);
            }
            overlay.panelID[i] = panelState;
        };
    };
};

function stopChangePanel() {
    clearInterval(interval);
};


// ANIMATION FUNCTIONS
function animationGrid(colNumber, rowNumber, times) {
    setTimeout(() => { 
        overlay.panelID.forEach(element => {
            if (element.column == colNumber && element.row == rowNumber) {
                if (element.colorState == 0) {
                    element.item.style.backgroundColor = `rgba(0,0,0,.5)`;
                    element.colorState = 1;
                    websocketSend(element); 
                } else if (element.colorState == 1) {
                    element.item.style.backgroundColor = `rgba(0,0,0,.0)`;
                    element.colorState = 0;
                    websocketSend(element); 
                };
            };
        })
    }, times * 600);
};

function randomShuffleAnimationGrid (times) {
    let counter = overlay.panelID.length;
    if (counter == overlay.panelID.length) {
        counter = 0;
        overlay.panelID.forEach((element, times) => {
            counter ++;
            let randomNumber = Math.random();
            randomNumber = randomNumber.toFixed(1);
            setTimeout((times) => { 

                element.item.style.backgroundColor=`rgba(0,0,0,${randomNumber})`;
                element.colorState = randomNumber;
                websocketSend(element);;
            }, (randomNumber * 10) * 1000);
        });
    };
};

//setInterval(randomShuffleAnimationGrid, 1500);

//randomShuffleAnimationGrid();

function loopVerticalGrid() {
    for (let k=0; k<=overlay.rows; k++) {
        let i = k;
        let j = 0;
        while (j < overlay.rows) {            
            animationGrid(i,j,k);
            j++;
        };
    };
};

function loopHorizontalGrid() {
    for (let k=0; k<=overlay.cols; k++) {
        let i = k;
        let j = 0;
        while (j < overlay.cols) {
            console.log(i,j);
            animationGrid(j, i, k);  //inverted j & i to assign overlay.rows instead of overlay.cols
            j++;
        };
    };
};

function loopDiagonalGrid() {
    for (let k =0; k<= overlay.rows-1; k++) {
        let i = k;
        let j = 0;
        while (i>=0) { 
            animationGrid(i,j,k);
            i = i-1;
            j = j+1;
        };
    };
    for (let k = 1; k<= overlay.rows-1; k++){
        let i = overlay.rows - 1;
        let j = k;
        while (j <= overlay.rows-1) {
            animationGrid(i,j,k+overlay.rows-1);
            i = i-1;
            j = j+1;
        };
    };
};



//setInterval(loopDiagonalGrid, 3000);
//setInterval(loopVerticalGrid, 2000);
//setInterval(loopHorizontalGrid, 2000);