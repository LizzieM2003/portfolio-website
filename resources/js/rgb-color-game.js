const EASY = 3;
const HARD = 6;
const EXPERT = 12;

let levelSelected = EASY;
let colorSelected;

let gamePlaying = false;

const liArray = Array.from(document.querySelectorAll('.level-item'));

let colorsArr = [];


let initialiseGameDiv = () => {
	// delete child divs i.e. color boxes if they exist
	let gameDiv = document.querySelector('.game');
	while (gameDiv.firstChild) {
		gameDiv.removeChild(gameDiv.firstChild);
	}
}

let randomRGBColor = () => {
	let redValue = Math.floor(Math.random() * 256);
	let greenValue = Math.floor(Math.random() * 256);
	let blueValue = Math.floor(Math.random() * 256);
	return `rgb(${redValue}, ${greenValue}, ${blueValue})`;
};

let generateRandomColors = num => {
	for (let i = 0; i < num; i++) {
		colorsArr.push(randomRGBColor());
	}
	console.log(colorsArr);
};

let createColorBox = color => {
	// Create new color box div
	let newColorBox = document.createElement('div');
//	newColorBox.id = `color-${i}`;
	newColorBox.className = 'color-box';
	
	// assign color box randomly generated color
	newColorBox.style.backgroundColor = color;
	
	return newColorBox;
}

let generateColorBoxes = () => {
	for (let color of colorsArr) {
		let colorBox = createColorBox(color);
		document.querySelector('.game').appendChild(colorBox);
	}
}

const correctColor = color => {
	// check if color matches randomly chosen color
	let correct = false;
	
	if (color === colorSelected) {
		correct = true;
	}
	return correct;
};

const selectRandomColor = num => {
	let randomNum = Math.floor(Math.random() * num);
	document.getElementById('color').innerHTML = colorsArr[randomNum];
	return colorsArr[randomNum];
}

let onClickBox = e => {
	if (e.target.getAttribute('class') === 'color-box' && gamePlaying) {
			if (correctColor(e.target.style.backgroundColor)) {
				//change reset menu item to play again
				gamePlaying = false;
				document.getElementById('game-play').innerHTML = 'Play Again';
				// change colours of all color boxes to that of color 
				Array.from(document.querySelectorAll('.color-box')).forEach(box => {
					box.style.opacity = 1;
					box.style.backgroundColor = colorSelected;
				});
			} else {
				e.target.style.opacity = .1;
			}
		}
}

const init = () => {
	// create appropriate number of boxes and random colours
	gamePlaying = true;
	document.getElementById('game-play').innerHTML = 'Reset';
	initialiseGameDiv();
	colorsArr = [];
	generateRandomColors(levelSelected);
	generateColorBoxes();
	colorSelected = selectRandomColor(levelSelected);	
};


let selectedLevel = level => {
	// Toggle active class for menu items 
	liArray.forEach(el => {
		el.classList.remove('active');
		
		if (el.id === level) {
			el.classList.add('active');
		}
	});
	
	// assign level selected
	switch(level) {
		case "easy" :
			levelSelected = EASY;
			break;
		case "hard" :
			levelSelected = HARD;
			break;
		case "expert" :
			levelSelected = EXPERT;
			break;
	}
};

let setLevelAndInit = (event) => {
	selectedLevel(event.target.id);
	init();
};

let setupClickListeners = () => {
	// add click listener to reset/play again item
	document.getElementById('reset').addEventListener('click', init);

// add click listeners to level items

	liArray.forEach(el => {
		el.addEventListener("click", setLevelAndInit);
	});

// add click listener to game div as using event delegation
	document.querySelector('.game').addEventListener('click', onClickBox);
};

init();
setupClickListeners();