const music = document.getElementById("backgroundSong");
const musicToggle = document.getElementById("musicToggle");
const musicLabel = document.getElementById("musicLabel");
const letterCard = document.getElementById("letterCard");
const letterContent = document.getElementById("letterContent");
const cakeButton = document.getElementById("cakeButton");
const cakeInstruction = document.getElementById("cakeInstruction");
const wishMessage = document.getElementById("wishMessage");
const confettiLayer = document.getElementById("confettiLayer");

musicToggle.addEventListener("click", async () => {
  if (music.paused) {
    try {
      await music.play();
      musicToggle.classList.add("playing");
      musicLabel.textContent = "Pause our song";
      musicToggle.setAttribute("aria-label", "Pause background music");
    } catch (error) {
      musicLabel.textContent = "Add your song first";
      alert("Add your song as assets/music/birthday-song.mp3, then try again.");
    }
  } else {
    music.pause();
    musicToggle.classList.remove("playing");
    musicLabel.textContent = "Play our song";
    musicToggle.setAttribute("aria-label", "Play background music");
  }
});

letterCard.addEventListener("click", () => {
  const opening = letterContent.hidden;
  letterContent.hidden = !opening;
  letterCard.setAttribute("aria-expanded", String(opening));
  letterCard.querySelector(".envelope-hint").textContent = opening ? "tap to close" : "tap to open";
  if (opening) letterContent.scrollIntoView({ behavior: "smooth", block: "center" });
});

document.getElementById("openSurprise").addEventListener("click", () => {
  document.getElementById("letter").scrollIntoView({ behavior: "smooth" });
  if (letterContent.hidden) {
    letterContent.hidden = false;
    letterCard.setAttribute("aria-expanded", "true");
    letterCard.querySelector(".envelope-hint").textContent = "tap to close";
  }
});

function celebrate() {
  confettiLayer.innerHTML = "";
  const pieces = ["♡", "✦", "✿", "♥", "✧", "🎉"];
  for (let i = 0; i < 48; i++) {
    const piece = document.createElement("span");
    piece.className = "confetti-piece";
    piece.textContent = pieces[Math.floor(Math.random() * pieces.length)];
    piece.style.left = `${Math.random() * 100}%`;
    piece.style.setProperty("--drift", `${Math.round(Math.random() * 180 - 90)}px`);
    piece.style.animationDelay = `${Math.random() * 0.6}s`;
    piece.style.color = ["#d65c91", "#f1a0c0", "#b8a1e8", "#e8b85b"][i % 4];
    confettiLayer.appendChild(piece);
  }
  setTimeout(() => { confettiLayer.innerHTML = ""; }, 3300);
}

cakeButton.addEventListener("click", () => {
  if (cakeButton.classList.contains("cut")) {
    celebrate();
    return;
  }
  cakeButton.classList.add("cut");
  cakeInstruction.textContent = "you did it! make a wish, Swara ♡";
  wishMessage.hidden = false;
  celebrate();
  wishMessage.scrollIntoView({ behavior: "smooth", block: "nearest" });
});

document.getElementById("confettiAgain").addEventListener("click", celebrate);
