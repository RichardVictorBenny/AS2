var upPressed = false;
var downPressed = false;
var leftPressed = false;
var rightPressed = false;
var lastPressed = false;

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

		solidCheckUpDown(player.offsetLeft, newTop + 46,newTop);
		animation('character walk down');
	}
	if (upPressed) {
		var newTop = positionTop - 1;

		solidCheckUpDown(player.offsetLeft,newTop,newTop);
		animation('character walk up');
	}
	if (leftPressed) {
		var newLeft = positionLeft - 1;
		player.className = 'character walk left';

		solidCheckLeftRight(newLeft,player.offsetTop,newLeft);
	}
	if (rightPressed) {
		var newLeft = positionLeft + 1;
		player.className = 'character walk right';

		solidCheckLeftRight(newLeft + 32, player.offsetTop,newLeft);
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

function solidCheckUpDown(x, y,newTop) {
	let elementL = document.elementFromPoint(x, y);
	let elementR = document.elementFromPoint(x + 32, y);

	if ((elementL.classList.contains('solid') == false) && (elementR.classList.contains('solid') == false)) {
		player.style.top = newTop  + 'px';
	}
}

function solidCheckLeftRight(x, y,newLeft) {
	let elementL = document.elementFromPoint(x, y);
	let elementR = document.elementFromPoint(x, y + 46);

	if ((elementL.classList.contains('solid') == false) && (elementR.classList.contains('solid') == false)) {
		player.style.left = newLeft + 'px';
	}
}



function startGame() {
	var start = document.getElementsByClassName('start')[0];
	start.style.display = 'none';

	timeout = setInterval(move, 10);
	document.addEventListener('keydown', keydown);
	document.addEventListener('keyup', keyup);
}

function myLoadFunction() {


	var start = document.getElementsByClassName('start')[0];
	start.addEventListener('click', startGame);
}


document.addEventListener('DOMContentLoaded', myLoadFunction);