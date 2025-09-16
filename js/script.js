const homePage = document.querySelector('.homePage');
const gamePage = document.querySelector('.gamePage');
const resultPage = document.querySelector('.resultPage');
const playerImg = document.getElementById('playerImage');
const computerImg = document.getElementById('computerImage');
const maxRoundButtons = document.querySelectorAll('.maxRoundsBtn')
const choiceButtons = document.querySelectorAll('.choiceBtn')
const playerScoreBoard = document.getElementById('playerScore')
const computerScoreBoard = document.getElementById('computerScore')
const playerLoad = document.getElementById('playerLoad')
const computerLoad = document.getElementById('computerLoad')
const currentRoundResult = document.getElementById('currentRoundResult');
const showCurrentRound = document.getElementById('showCurrentRound');

let playerScore = 0;
let wins = 0;
let losses = 0;
let ties = 0;
let computerScore = 0;
let currentRound = 1;
let maxRounds = 0;

maxRoundButtons.forEach((maxBtn) => {
    maxBtn.addEventListener('click', () => {
        maxRounds = maxBtn.dataset.maxrounds
        startGame();
        console.log(maxRounds);
         displayCurrentRound();
    }) 
})
choiceButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
        //disable all btns after they make a choice. to prevent selecting more than once
        disableBtn();
        let playerChoice = btn.dataset.choice;
        playGame(playerChoice);
    })
})

//function to start game by going to game page
function startGame(){
    homePage.style.display = 'none';
    gamePage.style.display = 'block'
}

//function to handle the RPS game
function playGame(playerChoice){
    //generate computer choice
    let choices = ['Rock', 'Paper', 'Scissors'];
    let computerChoice = choices[Math.floor(Math.random() *3)]
    //display loading animation b4 displaying img of choice
    setDisplay()
    setTimeout(() => {
        //remove loading animation and show image
        playerLoad.style.display = 'none';
        computerLoad.style.display = 'none'
        showChoiceImg(playerChoice, computerChoice)
        //determine winner of rounds
        determineCurrentRoundWinner(playerChoice, computerChoice);
        //delay a bit b4 checking overall winner
        setTimeout(determineOverallWinner, 1000)
        //set all btns to remove disabled if rounds are over
        if((playerScore < maxRounds / 2) || (computerScore < maxRounds / 2)){
             enableBtn();
        }
    }, 2000)
}
//function to determine current round winner
function determineCurrentRoundWinner(playerChoice, computerChoice){
    if(playerChoice === computerChoice){
        currentRoundResult.textContent = `It's a Tie`;
        ties++;
    }else if(
        (playerChoice === 'Rock') && (computerChoice === 'Scissors') || (playerChoice === 'Paper') && (computerChoice === 'Rock') ||(playerChoice === 'Scissors') && (computerChoice === 'Paper')){ //For when player wins
            wins++;
            playerScore++;
            currentRoundResult.textContent = `You WIN! Computer Loses`;
    }else{
        losses++;
        computerScore++;
        currentRoundResult.textContent = `You LOSE! Computer Wins`;
    }

    updateScoreBoard();
    currentRound++;
    //update the current round only if rounds are not over
    if((playerScore < maxRounds / 2) || (computerScore < maxRounds / 2)){
        displayCurrentRound();
    }
}
//function to disable button
function disableBtn(){
    choiceButtons.forEach((btn) => {btn.disabled = true});
}
//function to  remove disable button
function enableBtn(){
    choiceButtons.forEach((btn) => {btn.disabled = false});
}
//function to display current round
function displayCurrentRound(){
    showCurrentRound.textContent = `Round ${currentRound} of ${maxRounds}`;
}
//function to update score board
function updateScoreBoard(){
    playerScoreBoard.textContent = `Player: ${playerScore}`;
    computerScoreBoard.textContent = `Computer: ${computerScore}`;
}
//function to determine overall winner
function determineOverallWinner(){
    let winCheck = null;
    if(playerScore > maxRounds / 2){//player has won most rounds
        results(winCheck = true)
    }else if(computerScore > maxRounds / 2){//computer has won most rounds
        results(winCheck = false)
    }

}
//function to display results
function results(winCheck){
    gamePage.style.display = 'none';
    resultPage.style.display = 'block';
    let playAgainBtn = document.getElementById('playAgainBtn');

    if(winCheck){
        document.getElementById('result').textContent = `You Win! You were best of ${maxRounds}`
    }else if(winCheck == false){
        document.getElementById('result').textContent = `You Lose! Computer was best of ${maxRounds}`
    }
    document.getElementById('resultDetails').innerHTML = `Wins: ${wins} Losses: ${losses} Ties: ${ties} <br>No of Rounds Played: ${currentRound - 1} of ${maxRounds}`;

    playAgainBtn.addEventListener('click', reset)
}
//function to set required properties display to none or block
function setDisplay(){
    playerLoad.style.display = 'flex';
    computerLoad.style.display = 'flex';
    playerImg.style.display = 'none';
    computerImg.style.display = 'none';;
    currentRoundResult.textContent = ``;
}
//function to set required properties display to none or block when u click play again
function setResetDisplay(){
    playerLoad.style.display = 'none';
    computerLoad.style.display = 'none';
    playerImg.style.display = 'none';
    computerImg.style.display = 'none';;
    currentRoundResult.textContent = ``;
    enableBtn();
}
//function to display image of user's choice
function showChoiceImg(playerChoice, computerChoice){
    //objects for which image to display based on choice
    let images = {
        Rock: '/assets/images/rock2.jpeg',
        Paper: '/assets/images/paper.jpeg',
        Scissors: '/assets/images/scissors2.jpeg'
    }

    //set images src based on their choice
    playerImg.src = images[playerChoice];
    computerImg.src = images[computerChoice];
    //display image
    playerImg.style.display = 'block';
    computerImg.style.display = 'block';
    //flip computer img
    computerImg.style.transform = 'scaleX(-1)'
}
//function to reset
function reset(){
    playerScore = 0;
    wins = 0;
    losses = 0;
    ties = 0;
    computerScore = 0;
    currentRound = 1;
    maxRounds = 0;

    homePage.style.display = 'block';
    gamePage.style.display = 'none';
    resultPage.style.display = 'none';
    
    setResetDisplay();
    updateScoreBoard();
}
