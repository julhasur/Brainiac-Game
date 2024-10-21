// Variables
let grid = document.getElementById("grid");
let player1Score = 0;
let player2Score = 0;
let playerTurn = 1;
let firstChoice = null;
let secondChoice = null;
let timer;
let timeLeft = 5;
let allCardsShown = false;
let isFlashing = false;

// Create a grid of 7x5 cells with random pictures
let pictures = ["🍎", "🍌", "🍒", "🍇", "🍉", "🍋", "🍓", "🍍", "🥭", "🍑", "🥝"];
pictures = [...pictures, ...pictures]; // Duplicate for matching
pictures.sort(() => 0.5 - Math.random()); // Shuffle the pictures

// Create grid items
// Create grid items
for (let i = 0; i < 35; i++) {
  let div = document.createElement("div");
  div.classList.add("grid-item");
  div.dataset.id = i;
  div.dataset.picture = pictures[i % pictures.length];
  div.innerHTML = `
    <div class="flip-card">
      <div class="front">?</div>  <!-- Front face (hidden face) -->
      <div class="back">${div.dataset.picture}</div>  <!-- Back face (picture side) -->
    </div>
  `;
  div.addEventListener("click", handleClick);
  grid.appendChild(div);
}

// for (let i = 0; i < 35; i++) {
//   let div = document.createElement("div");
//   div.classList.add("grid-item");

//   let flipCard = document.createElement("div");
//   flipCard.classList.add("flip-card");

//   let frontFace = document.createElement("div");
//   frontFace.classList.add("front");
//   frontFace.textContent = "?"; // Question mark

//   let backFace = document.createElement("div");
//   backFace.classList.add("back");
//   backFace.textContent = pictures[i]; // Set the picture on the back

//   flipCard.appendChild(frontFace);
//   flipCard.appendChild(backFace);
//   div.appendChild(flipCard);

//   div.addEventListener("click", handleClick);
//   grid.appendChild(div);
// }

// Function to show all cards for 5 seconds at the beginning
function showAllCards() {
  let gridItems = document.querySelectorAll(".grid-item .flip-card");

  // Show all cards (flip them to reveal pictures)
  gridItems.forEach(item => {
    item.classList.add("flipped");
  });

  // Hide all cards after 5 seconds
  setTimeout(() => {
    gridItems.forEach(item => {
      item.classList.remove("flipped");
    });
    allCardsShown = true; // Allow the game to start
    updatePlayerTurnDisplay(); // Show initial player's turn
    startTimer(); // Start game timer after showing all cards
  }, 5000); // 5 seconds delay
}

// Handle click events
function handleClick(e) {
  if (!allCardsShown || isFlashing || !timeLeft) return;  // Disable clicks before game starts or during flash or when time is out

  let clickedBox = e.target.closest(".grid-item");
  let flipCard = clickedBox.querySelector(".flip-card");

  // If already flipped, ignore
  if (flipCard.classList.contains("flipped")) return;

  // Flip the card to show the back
  flipCard.classList.add("flipped");

  if (!firstChoice) {
    firstChoice = clickedBox;
  } else if (!secondChoice) {
    secondChoice = clickedBox;

    let firstPicture = firstChoice.querySelector(".back").textContent;
    let secondPicture = secondChoice.querySelector(".back").textContent;

    if (firstPicture === secondPicture) {
      // Match found
      if (playerTurn === 1) {
        player1Score++;
        document.getElementById("player1-score").textContent = `Player 1 Score: ${player1Score}`;
      } else {
        player2Score++;
        document.getElementById("player2-score").textContent = `Player 2 Score: ${player2Score}`;
      }

      // Reset the timer for the current player
      resetTimer();

      // Clear selections for next turn
      firstChoice = secondChoice = null;
    } else {
      // No match, flip both cards back after a short delay
      setTimeout(() => {
        firstChoice.querySelector(".flip-card").classList.remove("flipped");
        secondChoice.querySelector(".flip-card").classList.remove("flipped");
        firstChoice = secondChoice = null;

        // Switch player turns
        playerTurn = playerTurn === 1 ? 2 : 1;
        updatePlayerTurnDisplay();
        resetTimer();
      }, 1000);
    }
  }
}

// Timer function
function startTimer() {
  timeLeft = 5;
  timer = setInterval(() => {
    document.getElementById("timer").textContent = `Time Left: ${timeLeft}s`;
    timeLeft--;

    if (timeLeft < 0) {
      clearInterval(timer);
      alert(`Player ${playerTurn} ran out of time!`);
      playerTurn = playerTurn === 1 ? 2 : 1;
      updatePlayerTurnDisplay();
      resetTimer();
    }
  }, 1000);
}

// Reset the timer
function resetTimer() {
  clearInterval(timer);
  startTimer();
}

// Function to update the UI with the current player's turn
function updatePlayerTurnDisplay() {
  document.getElementById("current-player").textContent = `Player ${playerTurn}'s Turn`;
}

// Show all cards at the start of the game
showAllCards();
