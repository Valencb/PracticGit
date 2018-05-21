/* asignar un evento a cada elemento del tablero que nos permita dibujar X o Y según el turno de juego.
*/

var hola= Alert("hola Francia!");

function playerName (e){
    e.preventDefault();
    var playerInputs = document.getElementsByTagName("input");
    juego.jugador1 = playerInputs[0].value;
    juego.jugador2 = playerInputs[1].value;
    e.target.parentNode.style.display = "none";
}
function checkBoard (){
    var boardTd = document.getElementsByTagName("td");
    var baseCells = {
        centro:boardTd[4].textContent,
        supIzq:boardTd[0].textContent,
        infDer:boardTd[8].textContent
    }
    var cellsContent = [baseCells["supIzq"],
        boardTd[1].textContent,
        boardTd[2].textContent,
        boardTd[3].textContent,
        baseCells["centro"],
        boardTd[5].textContent,
        boardTd[6].textContent,
        boardTd[7].textContent,
        baseCells["infDer"]
    ]
    var casosGanadores = {
        centro:{
            uno:baseCells["centro"] === cellsContent[1] && baseCells["centro"] === cellsContent[7],
            dos:baseCells["centro"] === cellsContent[3] && baseCells["centro"] === cellsContent[5],
            tres:baseCells["centro"] === cellsContent[0] && baseCells["centro"] === cellsContent[8],
            cuatro:baseCells["centro"] === cellsContent[6] && baseCells["centro"] === cellsContent[2]
        },
        supIzq:{
            uno:baseCells["supIzq"] === cellsContent[1] && baseCells["supIzq"] === cellsContent[2],
            dos:baseCells["supIzq"] === cellsContent[3] && baseCells["supIzq"] === cellsContent[6]
        },
        infDer:{
            uno:baseCells["infDer"] === cellsContent[6] && baseCells["infDer"] === cellsContent[7],
            dos:baseCells["infDer"] === cellsContent[2] && baseCells["infDer"] === cellsContent[5]
        }
    }
    if(baseCells["centro"] !== ""){
        if(casosGanadores["centro"]["uno"] || casosGanadores["centro"]["dos"] || casosGanadores["centro"]["tres"] || casosGanadores["centro"]["cuatro"]){
            return true;
        }
    }
    if(baseCells["supIzq"] !== ""){
        if(casosGanadores["supIzq"]["uno"] || casosGanadores["supIzq"]["dos"]){
            return true;
        }
    }
    if(baseCells["infDer"] !== ""){
        if(casosGanadores["infDer"]["uno"] || casosGanadores["infDer"]["dos"]){
            return true;
        }
    }
}
function gameOver (win){
    if(win){
        alert( "ganaste "+juego.jugadorActual);
    }
    if(juego.movimientos === 8 || win){
        Array.from(boardTd).map(function(td){
            td.removeEventListener("click",play);
        });
        alert("Game over");
    }
}
function play (e){
    var target = e.target
    if(juego.turno === 0){
        target.textContent = "X";
        juego.turno = 1;
        juego.jugadorActual = juego.jugador1;
        var win = checkBoard();
        gameOver(win);
    }else{
        target.textContent = "O";
        juego.turno = 0;
        juego.jugadorActual = juego.jugador2;
        var win = checkBoard();
        gameOver(win);
    }
    juego.movimientos += 1;
    target.removeEventListener("click",play);
    juego.playerText.textContent = juego.jugadorActual;
}

var juego = {
    jugador1:"jugador1",
    jugador2:"jugador2",
    turno:0,
    jugadorActual:"",
    celdas: [],
    movimientos: 0,

}

var boardTd = document.getElementsByTagName("td");
var playerContainer = document.getElementById("jugador-actual");
juego.playerText = playerContainer;
Array.from(boardTd).map(function(td){
    td.addEventListener("click",play);
});
document.getElementById("players").addEventListener("click",playerName);
