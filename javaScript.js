// Mode

let mode = document.querySelector(".mode");
let body = document.querySelector("body");

let currMode = "light";

const change = () => {

    if(currMode === "light"){

        currMode = "dark";
        body.classList.add("dark");
        body.classList.remove("light");
    }
    else{
        currMode = "light";
        body.classList.add("light");
        body.classList.remove("dark");
    }
}

mode.addEventListener("click", change);

// logic 

let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let winnerName = document.querySelector(".result-msg");
let player = document.querySelector(".info");
let againPlay = document.querySelector(".newGame");   
player.classList.remove("hide");


const winPattern = [

    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];



let turnO = true; //player X and Y
let count = 0;

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        

        if(turnO){
            //Player O
            box.innerText = "O";
            turnO = false;
            player.innerText = "turn for X"
        }
        else{
            //player X
            box.innerText = "X";
            turnO = true;
            player.innerText = "turn for O"
        }


        box.disabled = true; // Disable the box after being clicked
        // box.classList.add("show");

        count++;
        // console.log(count);
        if(count === 9){
            drawGame();
        }
        checkWinner();
    });
});

const drawGame = () => {

    winnerName.classList.remove("hide");
    player.classList.add("hide");
    againPlay.classList.remove("hide");
    winnerName.innerText = `Game Draw`;
    winnerName.style.backgroundColor = "#081b30";
    disableBoxes();
    count = 0;
}

const disableBoxes = () => {

    for (let box of boxes){
        box.disabled = true;
    }
};


const enableBox = () => {

    for(let box of boxes){
        box.disabled = false;
        box.innerText = "";
    }
}

const reset = () => {
    turnO = true;
    enableBox();
    player.innerText = "turn for O";
    winnerName.classList.add("hide");
    againPlay.classList.add("hide");
    player.classList.remove("hide");//if he win and select reset instead of new game this is will come in play
}


againPlay.addEventListener("click", () => {

    turnO = true;
    enableBox();
    againPlay.classList.add("hide");
    winnerName.classList.add("hide");
    player.innerText = "turn for O";
    player.classList.remove("hide");
})

const winner = (val1) => {
    
    winnerName.classList.remove("hide");
    player.classList.add("hide");
    againPlay.classList.remove("hide");
    winnerName.style.backgroundColor = "green";
    winnerName.innerText = `congratulation ${val1}  Won`; 
    disableBoxes();
    count = 0;
}


resetBtn.addEventListener("click", reset);


const checkWinner = () => {
    for(let pattern of winPattern){
        // console.log(pattern[0],pattern[1],pattern[2])
        // let val1 = boxes[pattern[0]].innerText;
        // console.log(val1);

        let val1 = boxes[pattern[0]].innerText;
        let val2 = boxes[pattern[1]].innerText;
        let val3 = boxes[pattern[2]].innerText;


        if(val1 != "" && val2 != "" && val3 != ""){
            if(val1 === val2 && val2 == val3){
                winner(val1);
            }
        }
    }
}