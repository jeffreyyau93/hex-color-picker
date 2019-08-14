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

    /* functions */
    function rand() { //generate a random number ranging from 0 to 255
        return Math.floor(Math.random() * 256);
    }
    function setColor() { //assign new color values to the main rectangle
        rectangle.style.backgroundColor = `rgb(${rValue}, ${gValue}, ${bValue})`;
    }
    function setUniColor(R, G, B) { //decide which value of rgb to change
        if (R === "newValue") {
            R = prompt(`輸入0~255`, `${rValue}`); //assign user input value to RGB
            if (!isNaN(R) && 255 >= R && R >= 0) { //limit user input value to integers between 0 and 255
                rValue = R;
            } else {
                alert(`您未輸入0~255間的整數`);
                return;
            }
        } else if (G === "newValue") {
            G = prompt(`輸入0~255`, `${gValue}`);
            if (!isNaN(G) && 255 >= G && G >= 0) {
                gValue = G;
            } else {
                alert(`您未輸入0~255間的整數`);
                return;
            }
        } else {
            B = prompt(`輸入0~255`, `${bValue}`);
            if (!isNaN(B) && 255 >= B && B >= 0) {
                bValue = B;
            } else {
                alert(`您未輸入0~255間的整數`);
                return;
            }
        }
        setColor(); //assign new rgb values to the rectangle's background-color
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

    setColor(); //generate random color on page reload
});
