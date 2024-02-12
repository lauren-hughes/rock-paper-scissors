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