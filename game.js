var upPressed = false;
var downPressed = false;
var leftPressed = false;
var rightPressed = false;
var lastPressed = false;
var tanks = 0;
/* var bomb = 0; */
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
		solidCheckUpDown(positionLeft, newTop + 46, newTop);
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

	var randomTop = Math.ceil(Math.random() * 9);
	tank.style.top = randomTop + '0vh';

	/* var bomb = document.createElement('div');
	bomb.className = 'bomb';
	bomb.style.left = tank.offsetLeft + 'px';
	bomb.style.top = tank.offsetTop + 10 + 'px';
	document.body.appendChild(bomb);

	moveBomb(bomb); */





	setInterval(function () {		//making bombs 
		var bomb = document.createElement('div');
		bomb.className = 'bomb';
		bomb.style.left = tank.offsetLeft + 'px';
		bomb.style.top = tank.offsetTop + 10 + 'px';
		document.body.appendChild(bomb);

		moveBomb(bomb);
	}, 4000)





}



function moveBomb(bomb) {
	var left = bomb.offsetLeft;
	setInterval(function () {
		left--;
		if (bomb.offsetLeft > 0) {
			bomb.style.left = left + 'px';
		} else {
			bomb.className = 'explosion';


		}
	}, 10);

}

function removeBomb() {

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

	setInterval(function () {
		var explodedBomb = document.getElementsByClassName('explosion');
		for (var i = 0; i < explodedBomb.length; i++) {
			document.body.removeChild(explodedBomb[i]);
		}
	}, 3000)

}

function myLoadFunction() {


	var start = document.getElementsByClassName('start')[0];
	start.addEventListener('click', startGame);
}


document.addEventListener('DOMContentLoaded', myLoadFunction);