let grid =document.getAnimations("grid");
let player1Score = 0;
let player2Score = 0;
let playerTurn = 1; // Track current player

//firstChoice and secondChoice will temporarily hold the two cards the player clicks on during their turn. They are set to null initially since no cards are selected at the start.
let firstChoice = null;
let secondChoice = null;

let timer;
let timeLeft=6;

//setting up 30 seconds for all cards to show
let allCardsShown=false;
//isFlashing is a flag to prevent the player from interacting with the game while the cards are "flashing" (i.e., briefly visible).
let isFlashing = false; // Prevent clicks during flashing

 // Create a grid of 7x5 cells with random pictures
let pictures = ["🍎", "🍌", "🍒", "🍇", "🍉", "🍋", "🍓", "🍍", "🥭", "🍑", "🥝"];
pictures = [...pictures, ...pictures]; // Duplicate for matching >? 
pictures.sort(() => 0.5 - Math.random()); // Shuffle the pictures
 //creating grid
 for(let i=0;i<35;i++){
    let div=document.createElement("div");
    div.classList.add("grid-item");
    div.dataset.id=i;//assigns each card an id assigns each card a unique id (0 to 34).
    div.dataset.picture = pictures[i % pictures.length];
    div.addEventListener("click", handleClick);
  grid.appendChild(div);

 }
 // Function to show all cards for 30 seconds at the beginning
function showAllCards() {
    let gridItems = document.querySelectorAll(".grid-item");
    gridItems.forEach(item => {
      item.textContent = item.dataset.picture;
      item.classList.add("revealed");
    });
  
    // Hide all cards after 30 seconds
    setTimeout(() => {
      gridItems.forEach(item => {
        item.textContent = "";
        item.classList.remove("revealed");
      });
      allCardsShown = true; // Allow clicking after all cards have been shown
      updatePlayerTurnDisplay(); // Show initial player's turn
      startTimer(); // Start game timer after initial show
    }, 30000); // 30 seconds delay
  }
  // Handle click events
function handleClick(e) {
    if (!allCardsShown || isFlashing || !timeLeft) return; // Disable clicking during flash or no time left
  