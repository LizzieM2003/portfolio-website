'use strict';

var EASY = 3;
var HARD = 6;
var EXPERT = 12;

var levelSelected = EASY;
var colorSelected = void 0;

var gamePlaying = false;

var liArray = Array.from(document.querySelectorAll('.level-item'));

var colorsArr = [];

var initialiseGameDiv = function initialiseGameDiv() {
	// delete child divs i.e. color boxes if they exist
	var gameDiv = document.querySelector('.game');
	while (gameDiv.firstChild) {
		gameDiv.removeChild(gameDiv.firstChild);
	}
};

var randomRGBColor = function randomRGBColor() {
	var redValue = Math.floor(Math.random() * 256);
	var greenValue = Math.floor(Math.random() * 256);
	var blueValue = Math.floor(Math.random() * 256);
	return 'rgb(' + redValue + ', ' + greenValue + ', ' + blueValue + ')';
};

var generateRandomColors = function generateRandomColors(num) {
	for (var i = 0; i < num; i++) {
		colorsArr.push(randomRGBColor());
	}
	console.log(colorsArr);
};

var createColorBox = function createColorBox(color) {
	// Create new color box div
	var newColorBox = document.createElement('div');
	//	newColorBox.id = `color-${i}`;
	newColorBox.className = 'color-box';

	// assign color box randomly generated color
	newColorBox.style.backgroundColor = color;

	return newColorBox;
};

var generateColorBoxes = function generateColorBoxes() {
	var _iteratorNormalCompletion = true;
	var _didIteratorError = false;
	var _iteratorError = undefined;

	try {
		for (var _iterator = colorsArr[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
			var color = _step.value;

			var colorBox = createColorBox(color);
			document.querySelector('.game').appendChild(colorBox);
		}
	} catch (err) {
		_didIteratorError = true;
		_iteratorError = err;
	} finally {
		try {
			if (!_iteratorNormalCompletion && _iterator.return) {
				_iterator.return();
			}
		} finally {
			if (_didIteratorError) {
				throw _iteratorError;
			}
		}
	}
};

var correctColor = function correctColor(color) {
	// check if color matches randomly chosen color
	var correct = false;

	if (color === colorSelected) {
		correct = true;
	}
	return correct;
};

var selectRandomColor = function selectRandomColor(num) {
	var randomNum = Math.floor(Math.random() * num);
	document.getElementById('color').innerHTML = colorsArr[randomNum];
	return colorsArr[randomNum];
};

var onClickBox = function onClickBox(e) {
	if (e.target.getAttribute('class') === 'color-box' && gamePlaying) {
		if (correctColor(e.target.style.backgroundColor)) {
			//change reset menu item to play again
			gamePlaying = false;
			document.getElementById('game-play').innerHTML = 'Play Again';
			// change colours of all color boxes to that of color 
			Array.from(document.querySelectorAll('.color-box')).forEach(function (box) {
				box.style.opacity = 1;
				box.style.backgroundColor = colorSelected;
			});
		} else {
			e.target.style.opacity = .1;
		}
	}
};

var init = function init() {
	// create appropriate number of boxes and random colours
	gamePlaying = true;
	document.getElementById('game-play').innerHTML = 'Reset';
	initialiseGameDiv();
	colorsArr = [];
	generateRandomColors(levelSelected);
	generateColorBoxes();
	colorSelected = selectRandomColor(levelSelected);
};

var selectedLevel = function selectedLevel(level) {
	// Toggle active class for menu items 
	liArray.forEach(function (el) {
		el.classList.remove('active');

		if (el.id === level) {
			el.classList.add('active');
		}
	});

	// assign level selected
	switch (level) {
		case "easy":
			levelSelected = EASY;
			break;
		case "hard":
			levelSelected = HARD;
			break;
		case "expert":
			levelSelected = EXPERT;
			break;
	}
};

var setLevelAndInit = function setLevelAndInit(event) {
	selectedLevel(event.target.id);
	init();
};

var setupClickListeners = function setupClickListeners() {
	// add click listener to reset/play again item
	document.getElementById('reset').addEventListener('click', init);

	// add click listeners to level items

	liArray.forEach(function (el) {
		el.addEventListener("click", setLevelAndInit);
	});

	// add click listener to game div as using event delegation
	document.querySelector('.game').addEventListener('click', onClickBox);
};

init();
setupClickListeners();
