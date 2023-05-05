var upPressed = false;
var downPressed = false;
var leftPressed = false;
var rightPressed = false;
var lastPressed = false;
var tanks = 0;
var bomb = 0;
var tankNumber = 3;

function keyup(event) {
	var player = document.getElementById('player');
	if (event.keyCode == 37) {
		leftPressed = false;
		lastPressed = 'left';
	}
	if (event.keyCode == 39) {
		rightPressed = false;
		lastPressed = 'right';
	}
	if (event.keyCode == 38) {
		upPressed = false;
		lastPressed = 'up';
	}
	if (event.keyCode == 40) {
		downPressed = false;
		lastPressed = 'down';
	}

	player.className = 'character stand ' + lastPressed;
}


function move() {
	var player = document.getElementById('player');
	var positionLeft = player.offsetLeft;
	var positionTop = player.offsetTop;
	if (downPressed) {
		var newTop = positionTop + 1;

		solidCheckUpDown(player.offsetLeft, newTop + 46, newTop);
		animation('character walk down');
	}
	if (upPressed) {
		var newTop = positionTop - 1;

		solidCheckUpDown(player.offsetLeft, newTop, newTop);
		animation('character walk up');
	}
	if (leftPressed) {
		var newLeft = positionLeft - 1;
		player.className = 'character walk left';

		solidCheckLeftRight(newLeft, player.offsetTop, newLeft);
	}
	if (rightPressed) {
		var newLeft = positionLeft + 1;
		player.className = 'character walk right';

		solidCheckLeftRight(newLeft + 32, player.offsetTop, newLeft);
	}

}


function keydown(event) {
	if (event.keyCode == 37) {
		leftPressed = true;
	}
	if (event.keyCode == 39) {
		rightPressed = true;
	}
	if (event.keyCode == 38) {
		upPressed = true;
	}
	if (event.keyCode == 40) {
		downPressed = true;
	}
}


function animation(que) {
	if (leftPressed == false) {
		if (rightPressed == false) {
			player.className = que;
		}
	}

}

function solidCheckUpDown(x, y, newTop) {
	let elementL = document.elementFromPoint(x, y);
	let elementR = document.elementFromPoint(x + 32, y);

	if ((elementL.classList.contains('solid') == false) && (elementR.classList.contains('solid') == false)) {
		player.style.top = newTop + 'px';
	}
}

function solidCheckLeftRight(x, y, newLeft) {
	let elementL = document.elementFromPoint(x, y);
	let elementR = document.elementFromPoint(x, y + 46);

	if ((elementL.classList.contains('solid') == false) && (elementR.classList.contains('solid') == false)) {
		player.style.left = newLeft + 'px';
	}
}

function makeTanks() {
	var tank = document.createElement('div');
	tank.className = 'tank';
	tank.classList.add('solid');
	document.body.appendChild(tank);
}

function makeBomb(i, tanks) {

}

function positionTank() {
	var tanks = document.getElementsByClassName('tank');
	for (var i = 0; i < tanks.length; i++) {
		var randomTop = Math.ceil(Math.random() * 9);
		tankLeft = tanks[i].offsetLeft;
		tanks[i].style.top = randomTop + '0vh';
		//tankPositionCheck(i, randomTop,tankLeft);

		setInterval(function (i) {
			var bomb = document.createElement('div');
			bomb.className = 'bomb';

			bomb.style.top = tanks[i].offsetTop + 10 + 'px';
			bomb.style.left = tanks[i].offsetLeft + 'px';
			document.body.appendChild(bomb);
			
		}, 3000);

		moveBomb(bomb);

	}

}

function moveBomb(bomb) {
	var left = bomb.offsetLeft;
	setInterval(function () {
		left--;
		if (bomb.offsetLeft > 0) {
			bomb.style.left = left + 'px';
		} else {
			/* bomb.style.left = '0px'; */
			bomb.className = 'explosion';
			/* bomb.parentNode.removeChild(bomb) */
			/* setInterval(,1000) */
		}
	}, 10);
}

//	--------some errors; under development-----------
function tankPositionCheck(i, randomTop, tankLeft) {

	var newTankPosition = document.elementFromPoint(tankLeft, randomTop);
	if (newTankPosition.classList.contains('tank') == false) {
		tanks[i].style.top = randomTop + '0vh';
	} else {
		var newRandomTop = Math.ceil(Math.random() * 10);
		tankPositionCheck(i, newRandomTop);
	}
}


function startGame() {
	var start = document.getElementsByClassName('start')[0];
	start.style.display = 'none';

	timeout = setInterval(move, 10);
	document.addEventListener('keydown', keydown);
	document.addEventListener('keyup', keyup);

	for (let i = 0; i < tankNumber; i++) {
		makeTanks();
	}
	positionTank();

}

function myLoadFunction() {


	var start = document.getElementsByClassName('start')[0];
	start.addEventListener('click', startGame);
}


document.addEventListener('DOMContentLoaded', myLoadFunction);