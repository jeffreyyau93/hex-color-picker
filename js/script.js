/* Global Variables */
const hexagon = document.getElementById("hexagon");
// const css = document.getElementById("css");
// let c = css.offsetHeight;
// c.insertRule("#hexagon#hexagon::before{background-color: black;}", 0);
// let hexagonTop = window.getComputedStyle(hexagon, "::before");
const rBtn = document.getElementById("btn-r");
const gBtn = document.getElementById("btn-g");
const bBtn = document.getElementById("btn-b");
const rSlider = document.getElementById("rSlider");
const gSlider = document.getElementById("gSlider");
const bSlider = document.getElementById("bSlider");
const pBtn = document.getElementById("btn-p");
const mBtn = document.getElementById("btn-m");
const qBtn = document.getElementById("btn-q");
const cBtn = document.getElementById("btn-c");
let plusInterval;
let minusInterval;
let randInterval;
let rValue = rand();
let gValue = rand();
let bValue = rand();

/* functions */
const UID = {
  _current: 0,
  getNew: function() {
    this._current++;
    return this._current;
  }
};
HTMLElement.prototype.pseudoStyle = function(element, prop, value) {
  // hexagon.classList = "";
  const _this = this;
  const _sheetId = "pseudoStyles";
  const _head = document.head || document.getElementsByTagName("head")[0];
  const _sheet =
    document.getElementById(_sheetId) || document.createElement("style");
  _sheet.id = _sheetId;
  const className = `pseudoStyle${UID.getNew()}`;
  _this.className += ` ${className}`;
  _sheet.innerHTML += ` .${className}:${element}{${prop}:${value}}`;
  _head.appendChild(_sheet);
  return this;
};

function rand() {
  // Generate a random number ranging from 0 to 255
  return Math.floor(Math.random() * 256);
}
function decimalToHex(num) {
  // Convert a decimal number to hexadecimal one
  let hex = Number(num).toString(16);
  if (hex.length < 2) {
    hex = "0" + hex;
  }
  return hex;
}
function rgbCodeToHex(R, G, B) {
  // Covert rgb code to hexadecimal color code
  const red = decimalToHex(R);
  const green = decimalToHex(G);
  const blue = decimalToHex(B);
  return red + green + blue;
}
function setColor() {
  // Assign new color values to the colored hexagon and the displayed color code
  const hexValue = rgbCodeToHex(rValue, gValue, bValue);
  hexagon.style.backgroundColor = `rgb(${rValue}, ${gValue}, ${bValue})`;
  hexagon.pseudoStyle(
    "before",
    "border-bottom",
    `86.6px solid #${hexValue} !important`
  );
  hexagon.pseudoStyle(
    "after",
    "border-top",
    `86.6px solid #${hexValue} !important`
  );
  hexagon.textContent = `#${hexValue.toUpperCase()}`; // Show an uppercased hexadecimal color code
  hexagon.style.color = `rgb(${255 - rValue}, ${255 - gValue}, ${255 -
    bValue})`; // Give displayed color code a contrast color of the hexagon's background
  rSlider.value = rValue; // Sliders' appearances reflect current background-color of the hexagon
  gSlider.value = gValue;
  bSlider.value = bValue;
}
function setUniColor(R, G, B) {
  // Decide which value of rgb to change
  if (R === "newValue") {
    R = prompt(`輸入0~255`, `${rValue}`); // Assign user input value to RGB
    if (!isNaN(R) && 255 >= R && R >= 0 && R % 1 == 0) {
      // Limit user input value to integers between 0 and 255
      rValue = R;
    } else {
      alert(`您未輸入0~255間的整數`);
      return;
    }
  } else if (G === "newValue") {
    G = prompt(`輸入0~255`, `${gValue}`);
    if (!isNaN(G) && 255 >= G && G >= 0 && G % 1 == 0) {
      gValue = G;
    } else {
      alert(`您未輸入0~255間的整數`);
      return;
    }
  } else {
    B = prompt(`輸入0~255`, `${bValue}`);
    if (!isNaN(B) && 255 >= B && B >= 0 && B % 1 == 0) {
      bValue = B;
    } else {
      alert(`您未輸入0~255間的整數`);
      return;
    }
  }
  setColor(); // Assign new rgb values to the hexagon's background-color
}
function initSlider() {
  // r, g, b sliders' values to affect hexagon's background-color
  rValue = rSlider.value;
  gValue = gSlider.value;
  bValue = bSlider.value;
  setColor();
}
function initPlusBtn() {
  // Start incrementing
  plusInterval = setInterval(() => {
    if (rValue < 255) {
      rValue++;
    }
    if (gValue < 255) {
      gValue++;
    }
    if (bValue < 255) {
      bValue++;
    }
    setColor();
    if (rValue === 255 && gValue === 255 && bValue === 255) {
      clearInterval(plusInterval);
    }
  }, 30);
}
function clrPlusBtn() {
  // Stop incrementing
  clearInterval(plusInterval);
}
function initMinusBtn() {
  // Start decrementing
  minusInterval = setInterval(() => {
    if (rValue > 0) {
      rValue--;
    }
    if (gValue > 0) {
      gValue--;
    }
    if (bValue > 0) {
      bValue--;
    }
    setColor();
    if (rValue == 0 && gValue == 0 && bValue == 0) {
      clearInterval(plusInterval);
    }
  }, 30);
}
function clrMinusBtn() {
  // Stop decrementing
  clearInterval(minusInterval);
}
function initRandBtn() {
  // Start random color change
  randInterval = setInterval(() => {
    rValue = rand();
    gValue = rand();
    bValue = rand();
    setColor();
  }, 30);
}
function clrRandBtn() {
  // Stop random color change
  clearInterval(randInterval);
}
function copyColor() {
  // Copy color code on the hexagon to clipboard
  const temp = document.createElement("input");
  temp.type = "text";
  temp.value = hexagon.textContent;
  document.body.appendChild(temp);
  temp.select();
  document.execCommand("copy");
  temp.remove();
}

/* events */
rBtn.addEventListener("click", () => {
  // NewValue act as a key to let function identify which button is clicked
  setUniColor("newValue", null, null);
});
gBtn.addEventListener("click", () => {
  setUniColor(null, "newValue", null);
});
bBtn.addEventListener("click", () => {
  setUniColor(null, null, "newValue");
});
rSlider.addEventListener("input", initSlider);
gSlider.addEventListener("input", initSlider);
bSlider.addEventListener("input", initSlider);
pBtn.addEventListener("mousedown", initPlusBtn);
pBtn.addEventListener("mouseup", clrPlusBtn);
pBtn.addEventListener("mouseout", clrPlusBtn);
mBtn.addEventListener("mousedown", initMinusBtn);
mBtn.addEventListener("mouseup", clrMinusBtn);
mBtn.addEventListener("mouseout", clrMinusBtn);
qBtn.addEventListener("mousedown", initRandBtn);
qBtn.addEventListener("mouseup", clrRandBtn);
qBtn.addEventListener("mouseout", clrRandBtn);
cBtn.addEventListener("click", copyColor);

setColor(); // Generate random color on page reload
