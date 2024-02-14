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

    // Displays round winner message to the console
    displayRoundWinner(outcome, playerChoice, computerChoice);

    updateScore(outcome);

    return outcome;
}

function displayRoundWinner(outcome, playerChoice, computerChoice) {
    let winnerDisplay = document.querySelector(".winner-display");

    if (winnerDisplay === null) {
        winnerDisplay = document.createElement("p");
        winnerDisplay.classList.add("winner-display");
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
    if (outcome === "win") {
        let scoreDisplay = document.querySelector("#player-score");
        scoreDisplay.textContent = "You: " + ++playerScore;
    }
    else if (outcome === "lose") {
        let scoreDisplay = document.querySelector("#computer-score");
        scoreDisplay.textContent = "Computer: " + ++computerScore;
    }
}

function playGame() {
    let roundOutcome;

    // Game is best of 5, so must win 3 rounds to win game
    while (playerWins < 3 && computerWins < 3) {
        // Returns "win" if player wins or "lose" if player loses
        roundOutcome = playRound(getPlayerChoice(), getComputerChoice());

        if (roundOutcome === "win") {
            playerWins++;
        }
        else if (roundOutcome === "lose") {
            computerWins++;
        }
    }

    // Displays game winner message to the console
    displayGameWinner(playerWins, computerWins);
}

function displayGameWinner(playerWins, computerWins) {
    if (playerWins > computerWins) {
        message = `You win! ${playerWins} rounds to ${computerWins}`;
    }
    else {
        message = `Computer wins! ${computerWins} rounds to ${playerWins}`;
    }

    console.log(message);
}