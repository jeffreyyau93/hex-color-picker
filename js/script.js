/* global variables */
let hexagon = document.getElementById("hexagon");
let css = document.getElementById("css");
// let c = css.offsetHeight;
// c.insertRule("#hexagon#hexagon::before{background-color: black;}", 0);
// let hexagonTop = window.getComputedStyle(hexagon, "::before");
let rBtn = document.getElementById("btn-r");
let gBtn = document.getElementById("btn-g");
let bBtn = document.getElementById("btn-b");
let rSlider = document.getElementById("rSlider");
let gSlider = document.getElementById("gSlider");
let bSlider = document.getElementById("bSlider");
let pBtn = document.getElementById("btn-p");
let mBtn = document.getElementById("btn-m");
let qBtn = document.getElementById("btn-q");
let cBtn = document.getElementById("btn-c");
let plusInterval;
let minusInterval;
let randInterval;
let rValue = rand();
let gValue = rand();
let bValue = rand();

/* functions */
let UID = {
  _current: 0,
  getNew: function() {
    this._current++;
    return this._current;
  }
};
HTMLElement.prototype.pseudoStyle = function(element, prop, value) {
  // hexagon.classList = "";
  let _this = this;
  let _sheetId = "pseudoStyles";
  let _head = document.head || document.getElementsByTagName("head")[0];
  let _sheet =
    document.getElementById(_sheetId) || document.createElement("style");
  _sheet.id = _sheetId;
  let className = `pseudoStyle${UID.getNew()}`;
  _this.className += ` ${className}`;
  _sheet.innerHTML += ` .${className}:${element}{${prop}:${value}}`;
  _head.appendChild(_sheet);
  return this;
};

function rand() {
  //generate a random number ranging from 0 to 255
  return Math.floor(Math.random() * 256);
}
function decimalToHex(num) {
  //convert a decimal number to hexadecimal one
  let hex = Number(num).toString(16);
  if (hex.length < 2) {
    hex = "0" + hex;
  }
  return hex;
}
function rgbCodeToHex(R, G, B) {
  //covert rgb code to hexadecimal color code
  let red = decimalToHex(R);
  let green = decimalToHex(G);
  let blue = decimalToHex(B);
  return red + green + blue;
}
function setColor() {
  //assign new color values to the colored hexagon and the displayed color code
  let hexValue = rgbCodeToHex(rValue, gValue, bValue);
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
  hexagon.textContent = `#${hexValue.toUpperCase()}`; //show an uppercased hexadecimal color code
  hexagon.style.color = `rgb(${255 - rValue}, ${255 - gValue}, ${255 -
    bValue})`; //give displayed color code a contrast color of the hexagon's background
  rSlider.value = rValue; //sliders' appearances reflect current background-color of the hexagon
  gSlider.value = gValue;
  bSlider.value = bValue;
}
function setUniColor(R, G, B) {
  //decide which value of rgb to change
  if (R === "newValue") {
    R = prompt(`輸入0~255`, `${rValue}`); //assign user input value to RGB
    if (!isNaN(R) && 255 >= R && R >= 0 && R % 1 == 0) {
      //limit user input value to integers between 0 and 255
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
  setColor(); //assign new rgb values to the hexagon's background-color
}
function initSlider() {
  //r, g, b sliders' values to affect hexagon's background-color
  rValue = rSlider.value;
  gValue = gSlider.value;
  bValue = bSlider.value;
  setColor();
}
function initPlusBtn() {
  //start incrementing
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
    if (rValue == 255 && gValue == 255 && bValue == 255) {
      clearInterval(plusInterval);
    }
  }, 30);
}
function clrPlusBtn() {
  //stop incrementing
  clearInterval(plusInterval);
}
function initMinusBtn() {
  //start decrementing
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
  //stop decrementing
  clearInterval(minusInterval);
}
function initRandBtn() {
  //start random color change
  randInterval = setInterval(() => {
    rValue = rand();
    gValue = rand();
    bValue = rand();
    setColor();
  }, 30);
}
function clrRandBtn() {
  //stop random color change
  clearInterval(randInterval);
}
function copyColor() {
  //copy color code on the hexagon to clipboard
  let temp = document.createElement("input");
  temp.type = "text";
  temp.value = hexagon.textContent;
  document.body.appendChild(temp);
  temp.select();
  document.execCommand("copy");
  temp.remove();
}

/* events */
rBtn.addEventListener("click", () => {
  //newValue act as a key to let function identify which button is clicked
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

setColor(); //generate random color on page reload
