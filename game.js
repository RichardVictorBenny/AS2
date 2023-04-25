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
		let elementL = document.elementFromPoint(player.offsetLeft,newTop+46);
		let elementR = document.elementFromPoint(player.offsetLeft+32,newTop+46);


		if ((elementL.classList.contains('solid') == false) && (elementR.classList.contains('solid')==false)) {
			player.style.top = newTop + 'px';
		}

		animation('character walk down')
	}
	if (upPressed) {
		var newTop = positionTop - 1;
		let elementL = document.elementFromPoint(player.offsetLeft,newTop);
		let elementR = document.elementFromPoint(player.offsetLeft+32,newTop);

		if ((elementL.classList.contains('solid') == false) && (elementR.classList.contains('solid')==false)) {
			player.style.top = newTop + 'px';
		}

		animation('character walk up')
		
	}
	if (leftPressed) {
		var newLeft = positionLeft - 1;
		player.className = 'character walk left';
		let elementL = document.elementFromPoint(newLeft,player.offsetTop);
		let elementR = document.elementFromPoint(newLeft,player.offsetTop+46);

		if ((elementL.classList.contains('solid') == false) && (elementR.classList.contains('solid')==false)) {
			player.style.left = newLeft + 'px';
		}
	}
	if (rightPressed) {
		var newLeft = positionLeft + 1;
		player.className = 'character walk right';
		let elementL = document.elementFromPoint(newLeft+32,player.offsetTop);
		let elementR = document.elementFromPoint(newLeft+32,player.offsetTop+46);


		if ((elementL.classList.contains('solid') == false) && (elementR.classList.contains('solid')==false)) {
			player.style.left = newLeft + 'px';
		}

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


function  animation(que){
	if (leftPressed == false) {
		if (rightPressed == false) {
			player.className = que;
		}
	}

}

function myLoadFunction() {
	

	var start = document.getElementsByClassName('start')[0];
	start.addEventListener('click',startGame);
}

function startGame() {
	var start = document.getElementsByClassName('start')[0];
	start.style.display = 'none';

	timeout = setInterval(move, 10);
	document.addEventListener('keydown', keydown);
	document.addEventListener('keyup', keyup);
}


document.addEventListener('DOMContentLoaded', myLoadFunction);