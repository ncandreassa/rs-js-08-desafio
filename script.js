const buttonPlay = document.querySelector(".play");
const buttonStop = document.querySelector(".stop");
const buttonAdd = document.querySelector(".add-time");
const buttonSub = document.querySelector(".sub-time");
const minutesDisplay = document.querySelector(".minutes");
const secondsDisplay = document.querySelector(".seconds");
const buttonForest = document.querySelector(".forest");
const buttonRain = document.querySelector(".rain");
const buttonCoffeeShop = document.querySelector(".coffee-shop");
const buttonFireplace = document.querySelector(".fireplace");
const forestSound = new Audio("Floresta.wav");
const rainSound = new Audio("Chuva.wav");
const coffeeShopSound = new Audio("Cafeteria.wav");
const fireplaceSound = new Audio("Lareira.wav");

let focusTimeOut;
let isCounting = false;

const sounds = {
  forest: {
    button: buttonForest,
    sound: forestSound,
    playing: false,
  },
  rain: {
    button: buttonRain,
    sound: rainSound,
    playing: false,
  },
  coffee: {
    button: buttonCoffeeShop,
    sound: coffeeShopSound,
    playing: false,
  },
  fireplace: {
    button: buttonFireplace,
    sound: fireplaceSound,
    playing: false,
  },
};

function countdown() {
  focusTimeOut = setTimeout(function () {
    isCounting = true;
    let seconds = Number(secondsDisplay.textContent);
    let minutes = Number(minutesDisplay.textContent);

    if (minutes <= 0 && seconds <= 0) {
      return;
    }

    if (seconds <= 0) {
      seconds = 60;

      minutesDisplay.textContent = String(minutes - 1).padStart(2, "0");
    }

    secondsDisplay.textContent = String(seconds - 1).padStart(2, "0");

    countdown();
  }, 1000);
}

buttonPlay.addEventListener("click", function () {
  if (isCounting) return;
  buttonPlay.classList.add("active");
  buttonStop.classList.remove("active");
  countdown();
});

buttonStop.addEventListener("click", function () {
  buttonStop.classList.add("active");
  buttonPlay.classList.remove("active");
  clearTimeout(focusTimeOut);
  isCounting = false;
});

buttonAdd.addEventListener("click", function () {
  let minutes = Number(minutesDisplay.textContent);

  if (minutes + 5 > 60) {
    return;
  } else {
    minutesDisplay.textContent = String(minutes + 5).padStart(2, "0");
    if (minutesDisplay.textContent == 60) {
      secondsDisplay.textContent = String(0).padStart(2, "0");
    }
  }
});

buttonSub.addEventListener("click", function () {
  let minutes = Number(minutesDisplay.textContent);

  if (minutes - 5 < 0) {
    return;
  } else {
    minutesDisplay.textContent = String(minutes - 5).padStart(2, "0");
  }
});

function toggleSound(name) {
  // Check if others are selected and stop playing
  for (const key in sounds) {
    if (sounds[key].playing && key != name) {
      sounds[key].sound.pause();
      sounds[key].button.classList.remove("selected");
      sounds[key].playing = false;
    }
  }

  // Check if the one clicked is playing before toggle
  if (sounds[name].button.classList.contains("selected")) {
    sounds[name].sound.pause();
    sounds[name].button.classList.remove("selected");
    sounds[name].playing = false;
  } else {
    sounds[name].sound.play();
    sounds[name].button.classList.add("selected");
    sounds[name].playing = true;
  }
}

buttonForest.addEventListener("click", function () {
  toggleSound("forest");
});

buttonRain.addEventListener("click", function () {
  toggleSound("rain");
});

buttonCoffeeShop.addEventListener("click", function () {
  toggleSound("coffee");
});

buttonFireplace.addEventListener("click", function () {
  toggleSound("fireplace");
});
