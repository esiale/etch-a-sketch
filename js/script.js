let size = 16;
let currentPenColor = "#000";

const gridContainer = document.querySelector(".grid-container");
createGrid(size);

function createGrid(number) {
    for (i = 0; i < number * number; i++) {
    const gridCell = document.createElement("div");
    gridContainer.appendChild(gridCell);
    gridCell.classList.add("grid-cell");
    gridCell.addEventListener("click", activateSketch);
    }
}

let sketchActivated = "off";

function activateSketch() {
    if (sketchActivated === "off") {
        const gridCells = document.querySelectorAll(".grid-container > div");
        for (i = 0; i < gridCells.length; i++) {
            gridCells[i].addEventListener("mouseenter", sketchOn);
            gridCells[i].addEventListener("mouseleave", sketchOn);
        }
        sketchActivated = "on";
    } else {
        const gridCells = document.querySelectorAll(".grid-container > div");
        for (i = 0; i < gridCells.length; i++) {
            gridCells[i].removeEventListener("mouseenter", sketchOn);
            gridCells[i].removeEventListener("mouseleave", sketchOn);
        }
        sketchActivated = "off";
    }
}

const resetButton = document.getElementById("reset-button");
    resetButton.addEventListener("click", resetGrid)

function resetGrid() {
    sketchActivated = "off";
    const gridCells = document.querySelectorAll(".grid-container > div");
    for (i = 0; i < gridCells.length; i++) {
        gridCells[i].remove();
    }
    createGrid(size);
}

const sizeButton = document.getElementById("size-button");
    sizeButton.addEventListener("click", askGridSize);

function askGridSize() {
    size = prompt("How many squares per side would you like your grid to have? Choose number between 1-100.");
        if (size == "" || size == null) {
            alert("Enter a number.");
        } else if (size > 100) {
            alert("The number you entered is too big.");
        } else if (isNaN(size)) {
            alert("Choose a NUMBER you doofus.");
        } else if (size < 0) {
            alert("The number you entered is too small.");
        } else {
            setGridSize(size);
        }
}

function setGridSize(size) {
     resetGrid();
     createGrid(size);
     gridContainer.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
     gridContainer.style.gridTemplateRows = `repeat(${size}, 1fr)`;
}

const randomColor = document.getElementById("random-color");
const blackColor = document.getElementById("black-color");
const ownColor = document.getElementById("own-color");
const colorPicker = document.getElementById("color-picker");
const penColor = document.querySelectorAll('input[name="pen-color"]');
for (i = 0; i < penColor.length; i++) {
    penColor[i].addEventListener("change", sketchOn);
}

function sketchOn(e) {
    e.target.style.transition = "background-color 1s";
    e.target.style.backgroundColor = currentPenColor;
    if (randomColor.checked == 1) {
        setRandomPen();
    } else if (blackColor.checked == 1) {
        currentPenColor = "#000";
    } else if (ownColor.checked == 1) {
        currentPenColor = colorPicker.value;
    }
}

function setRandomPen() {
    currentPenColor = "#" + Math.floor(Math.random()*16777215).toString(16);
}

