const CHOICES = ["rock", "paper", "scissors"];

function getPlayerChoice() {
    let playerChoice;
    // Keep going while playerChoice is not in the CHOICES array (i.e., is not a valid response)
    while (!(CHOICES.includes(playerChoice))) {
        // Prompt the player to enter rock, paper or scissors (they can enter anything though)
        playerChoice = prompt("Best of five! Rock, paper or scissors?");

        // This prevents the program from trying to convert null to lower case (if the player clicks cancel)
        if (playerChoice) {
            // Convert choice to lower case for comparison purposes
            playerChoice = playerChoice.toLowerCase();
        }
    }
    // When a valid choice has been made, return it
    return playerChoice;
}

function getComputerChoice() {
    // Generates random number from 0 to 2
    let random = Math.floor(Math.random() * 3);
    // Selects rock, paper or scissors from the CHOICES array using the random number
    let computerChoice = CHOICES[random];
    return computerChoice;
}

function playRound(playerChoice, computerChoice) {
    let outcome;

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
    return outcome;
}

function displayRoundWinner(outcome, playerChoice, computerChoice) {
    if (outcome === "tie") {
        // Capitalise first word in new sentence
        playerChoiceCapitalised = playerChoice[0].toUpperCase() + playerChoice.slice(1);
        console.log(`It's a tie! ${playerChoiceCapitalised} versus ${computerChoice}`);
    }
    else if (outcome === "win") {
        // Capitalise first word in new sentence
        playerChoiceCapitalised = playerChoice[0].toUpperCase() + playerChoice.slice(1);
        console.log(`You win! ${playerChoiceCapitalised} beats ${computerChoice}`);
    }
    else {
        // Capitalise first word in new sentence
        computerChoiceCapitalised = computerChoice[0].toUpperCase() + computerChoice.slice(1);
        console.log(`You lose! ${computerChoiceCapitalised} beats ${playerChoice}`);
    }
}

function playGame() {
    let playerWins = 0;
    let computerWins = 0;
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

playGame();