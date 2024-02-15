const CHOICES = ["rock", "paper", "scissors"];

const buttons = document.querySelectorAll("button");
buttons.forEach(button => button.addEventListener("click", playRound));

let playerScore = 0;
let computerScore = 0;

function getComputerChoice() {
    // Generates random number from 0 to 2
    let random = Math.floor(Math.random() * 3);
    // Selects rock, paper or scissors from the CHOICES array using the random number
    let computerChoice = CHOICES[random];
    return computerChoice;
}

function playRound(event) {
    let outcome;

    // This works because an Event object is passed to the callback function in an event listener
    let playerChoice = event.target.id;
    let computerChoice = getComputerChoice();
    
    // Don't have to check for a tie in any else-if/else block
    if (playerChoice === computerChoice) {
        outcome = "tie";
    }
    else if (playerChoice === "rock") {
        // If computerChoice is paper, player loses
        // If computerChoice is not paper (scissors), player wins
        outcome = (computerChoice === "paper") ? "lose" : "win";
    }
    else if (playerChoice === "paper") {
        // If computerChoice is rock, player wins
        // If computerChoice is not rock (scissors), play loses
        outcome = (computerChoice === "rock") ? "win" : "lose";
    }
    // playerChoice must be scissors
    else {
        // If computerChoice is rock, player loses
        // If computerChoice is not rock (paper), player wins
        outcome = (computerChoice === "rock") ? "lose" : "win";
    }

    displayRoundWinner(outcome, playerChoice, computerChoice);

    updateScore(outcome);
}

function displayRoundWinner(outcome, playerChoice, computerChoice) {
    let winnerDisplay = document.querySelector(".round-winner");

    if (winnerDisplay === null) {
        winnerDisplay = document.createElement("p");
        winnerDisplay.classList.add("round-winner");
    }

    if (outcome === "tie") {
        // Capitalise first word in new sentence
        playerChoiceCapitalised = playerChoice[0].toUpperCase() + playerChoice.slice(1);
        winnerDisplay.textContent = `It's a tie! ${playerChoiceCapitalised} versus ${computerChoice}`;
    }
    else if (outcome === "win") {
        // Capitalise first word in new sentence
        playerChoiceCapitalised = playerChoice[0].toUpperCase() + playerChoice.slice(1);
        winnerDisplay.textContent = `You win! ${playerChoiceCapitalised} beats ${computerChoice}`;
    }
    else {
        // Capitalise first word in new sentence
        computerChoiceCapitalised = computerChoice[0].toUpperCase() + computerChoice.slice(1);
        winnerDisplay.textContent = `You lose! ${computerChoiceCapitalised} beats ${playerChoice}`;
    }

    const container = document.querySelector("#container");
    container.appendChild(winnerDisplay);
}

function updateScore(outcome) {
    let playerScoreDisplay = document.querySelector("#player-score");
    let computerScoreDisplay = document.querySelector("#computer-score");

    if (outcome === "win") {
        playerScoreDisplay.textContent = "You: " + ++playerScore;
    }
    else if (outcome === "lose") {
        computerScoreDisplay.textContent = "Computer: " + ++computerScore;
    }
    else if (outcome === "reset") {
        playerScoreDisplay.textContent = "You: " + playerScore;
        computerScoreDisplay.textContent = "Computer: " + computerScore;
    }

    if (playerScore === 5 || computerScore === 5) endGame();
}

function endGame() {
    displayGameWinner();

    buttons.forEach(button => button.disabled = true);

    let playAgainButton = document.createElement("button");
    playAgainButton.textContent = "Play again";
    playAgainButton.addEventListener("click", resetGame);

    let container = document.querySelector("#container");
    container.appendChild(playAgainButton);
}

function displayGameWinner() {
    let container = document.querySelector("#container");

    let winnerDisplay = document.createElement("p");
    winnerDisplay.classList.add("game-winner");
    winnerDisplay.textContent = (playerScore > computerScore) ? "Five rounds won. You win the game!" : "Five rounds won. Computer wins the game!";

    container.appendChild(winnerDisplay);
}

function resetGame(event) {
    playerScore = 0;
    computerScore = 0;
    updateScore("reset");

    let roundWinnerDisplay = document.querySelector(".round-winner");
    roundWinnerDisplay.remove();

    let gameWinnerDisplay = document.querySelector(".game-winner");
    gameWinnerDisplay.remove();

    buttons.forEach(button => button.disabled = false);
    event.target.remove();
}