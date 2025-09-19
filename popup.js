const dvd = document.getElementById("dvd");
const musicToggle = document.getElementById("musicToggle");
const bgMusic = document.getElementById("bgMusic");
const factBar = document.querySelector(".fact-bar");

const beachFacts = [
  "Crabs walk sideways like moonwalkers",
  "Dolphins love playing with bubbles",
  "Starfish can regrow lost arms",
  "Seagulls sometimes steal your snacks",
  "Hermit crabs swap shells often"
];

const diveFacts = [
  "Clownfish never stop talking bubbles",
  "Seahorses dance while holding tails",
  "Pufferfish inflate like spiky balloons",
  "Baby fish are called fry",
  "Parrotfish sleep in bubble blankets"
];

let isDive = false;
let lastFact = "";

function showRandomFact() {
  const facts = isDive ? diveFacts : beachFacts;
  let randomFact;
  do {
    randomFact = facts[Math.floor(Math.random() * facts.length)];
  } while (randomFact === lastFact && facts.length > 1);
  lastFact = randomFact;
  factBar.textContent = randomFact;
}
showRandomFact();

// Music toggle
musicToggle.addEventListener("click", () => {
  musicToggle.classList.toggle("active");
  if (musicToggle.classList.contains("active")) {
    dvd.classList.add("rotating");
    bgMusic.play();
  } else {
    dvd.classList.remove("rotating");
    bgMusic.pause();
  }
});

// Dive toggle
const diveToggle = document.getElementById("diveToggle");
const beachDiv = document.querySelector(".beach");

diveToggle.addEventListener("click", () => {
  diveToggle.classList.toggle("active");
  isDive = diveToggle.classList.contains("active");

  if (isDive) {
    // Switch to ocean scene
    beachDiv.classList.remove("beach");
    beachDiv.classList.add("dive");
    bgMusic.src = "assets/ocean_music.mp3";

    // Add fish
    spawnFishes(beachDiv);

  } else {
    // Switch back to beach
    beachDiv.classList.remove("dive");
    beachDiv.classList.add("beach");
    bgMusic.src = "assets/ocean_sound.mp3";

    // Remove fish
    document.querySelectorAll(".fish").forEach(f => f.remove());
  }

  if (musicToggle.classList.contains("active")) {
    bgMusic.play();
  }

  showRandomFact();
});

// --- Fish spawning ---
const fishImages = ["assets/fish1.png", "assets/fish4.png", "assets/fish3.png","assets/starfish.png"];
let activeFishes = 0;       // number fishes currently in scene
const maxFishes = 3;

function spawnFish(container) {
  if (activeFishes >= maxFishes) return; // don't exceed limit

  const fish = document.createElement("img");
  fish.src = fishImages[Math.floor(Math.random() * fishImages.length)];
  fish.classList.add("fish");

  // Random vertical position (within ocean height)
  fish.style.top = `${Math.random() * 300}px`;

  // Random direction
  const reverse = Math.random() > 0.5;
  if (reverse) fish.classList.add("reverse");

  // Slower speed: 10–20s
  const duration = 10 + Math.random() * 10;
  fish.style.animationDuration = `${duration}s`;

  activeFishes++;

  // When animation ends → remove + respawn new one
  fish.addEventListener("animationend", () => {
    fish.remove();
    activeFishes--;
    spawnFish(container);
  });

  container.appendChild(fish);
}

function spawnFishes(container) {
  for (let i = 0; i < maxFishes; i++) {
    spawnFish(container);
  }
}

