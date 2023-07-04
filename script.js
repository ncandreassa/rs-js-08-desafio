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
const forestSound = new Audio("assets/sounds/Floresta.wav");
const rainSound = new Audio("assets/sounds/Chuva.wav");
const coffeeShopSound = new Audio("assets/sounds/Cafeteria.wav");
const fireplaceSound = new Audio("assets/sounds/Lareira.wav");
const buttonLightMode = document.querySelector(".light-mode");
const buttonDarkMode = document.querySelector(".dark-mode");
const body = document.querySelector("body");
const forestVolumeSlider = document.querySelector("#forest-volume");
const rainVolumeSlider = document.querySelector("#rain-volume");
const coffeeShopVolumeSlider = document.querySelector("#coffee-volume");
const fireplaceVolumeSlider = document.querySelector("#fireplace-volume");

// Control Variables

let focusTimeOut;
let isCounting = false;
let isChangingVolume = false;

// State of each sound button

const sounds = {
  forest: {
    button: buttonForest,
    sound: forestSound,
    playing: false,
    volume: forestVolumeSlider,
  },
  rain: {
    button: buttonRain,
    sound: rainSound,
    playing: false,
    volume: rainVolumeSlider,
  },
  coffee: {
    button: buttonCoffeeShop,
    sound: coffeeShopSound,
    playing: false,
    volume: coffeeShopVolumeSlider,
  },
  fireplace: {
    button: buttonFireplace,
    sound: fireplaceSound,
    playing: false,
    volume: fireplaceVolumeSlider,
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

// Change sound volume

function handleVolume(name, value) {
  isChangingVolume = true;
  sounds[name].sound.volume = value / 100;
}

// Play/stop sounds

function toggleSound(name) {
  if (isChangingVolume) {
    isChangingVolume = false;
    return;
  }

  // Check if others are selected and stop playing
  // Stop music from playing at the same time

  for (const key in sounds) {
    if (sounds[key].playing && key != name) {
      sounds[key].sound.pause();
      sounds[key].button.classList.remove("selected");
      sounds[key].playing = false;
    }
  }

  // Check if the one clicked is playing before toggle

  if (sounds[name].playing) {
    sounds[name].sound.pause();
    sounds[name].button.classList.remove("selected");
    sounds[name].playing = false;
  } else {
    sounds[name].sound.play();
    sounds[name].button.classList.add("selected");
    sounds[name].playing = true;
    sounds[name].sound.volume = 0.5;
    sounds[name].volume.value = 50;
  }
}

// Add play/stop sounds event listeners to buttons

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

// Add toggle between light and dark mode event listeners to buttons

buttonLightMode.addEventListener("click", function () {
  body.classList.add("dark");
  buttonLightMode.classList.add("hide");
  buttonDarkMode.classList.remove("hide");
});

buttonDarkMode.addEventListener("click", function () {
  body.classList.remove("dark");
  buttonLightMode.classList.remove("hide");
  buttonDarkMode.classList.add("hide");
});

// Add volume change handlres to buttons

forestVolumeSlider.addEventListener("change", function (event) {
  handleVolume("forest", event.currentTarget.value);
});

rainVolumeSlider.addEventListener("change", function (event) {
  handleVolume("rain", event.currentTarget.value);
});

coffeeShopVolumeSlider.addEventListener("change", function (event) {
  handleVolume("coffee", event.currentTarget.value);
});

fireplaceVolumeSlider.addEventListener("change", function (event) {
  handleVolume("fireplace", event.currentTarget.value);
});
