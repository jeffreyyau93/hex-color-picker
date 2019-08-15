document.addEventListener("DOMContentLoaded", () => {
    /* global variables */
    let rectangle = document.getElementById("rect");
    let rBtn = document.getElementById("btn-r");
    let gBtn = document.getElementById("btn-g");
    let bBtn = document.getElementById("btn-b");
    let pBtn = document.getElementById("btn-p");
    let mBtn = document.getElementById("btn-m");
    let qBtn = document.getElementById("btn-q");
    let rValue = rand();
    let gValue = rand();
    let bValue = rand();
    let randInterval;

    /* functions */
    function rand() { //generate a random number ranging from 0 to 255
        return Math.floor(Math.random() * 256);
    }
    function decimalToHex(num) { //convert a decimal number to hexadecimal one
        let hex = Number(num).toString(16);
        if (hex.length < 2) {
            hex = "0" + hex;
        }
        return hex;
    }
    function rgbCodeToHex(R, G, B) { //covert rgb code to hexadecimal color code
        let red = decimalToHex(R);
        let green = decimalToHex(G);
        let blue = decimalToHex(B);
        return red + green + blue;
    }
    function setColor() { //assign new color values to the colored rectangle and the displayed color code
        let hexValue = rgbCodeToHex(rValue, gValue, bValue);
        rectangle.style.backgroundColor = `rgb(${rValue}, ${gValue}, ${bValue})`;
        rectangle.textContent = `#${hexValue.toUpperCase()}`; //show an uppercased hexadecimal color code
        rectangle.style.color = `rgb(${255 - rValue}, ${255 - gValue}, ${255 - bValue})`; //give displayed color code a contrast color of the rectangle's background
    }
    function setUniColor(R, G, B) { //decide which value of rgb to change
        if (R === "newValue") {
            R = prompt(`輸入0~255`, `${rValue}`); //assign user input value to RGB
            if (!isNaN(R) && 255 >= R && R >= 0 && R % 1 == 0) { //limit user input value to integers between 0 and 255
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
        setColor(); //assign new rgb values to the rectangle's background-color
    }
    function initRandBtn() { //start random color change
        randInterval = setInterval(() => {
            rValue = rand();
            gValue = rand();
            bValue = rand();
            setColor();
        }, 30);
    }
    function clrRandBtn() { //stop random color change
        clearInterval(randInterval);
    }

    /* events */
    rBtn.addEventListener("click", () => { //newValue act as a key to let function identify which button is clicked
        setUniColor("newValue", null, null);
    });
    gBtn.addEventListener("click", () => {
        setUniColor(null, "newValue", null);
    });
    bBtn.addEventListener("click", () => {
        setUniColor(null, null, "newValue");
    });
    qBtn.addEventListener("mousedown", initRandBtn);
    qBtn.addEventListener("mouseup", clrRandBtn);
    qBtn.addEventListener("mouseout", clrRandBtn);

    setColor(); //generate random color on page reload
});
