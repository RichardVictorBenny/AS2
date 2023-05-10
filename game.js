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

function move() {
	var player = document.getElementById('player');
	positionLeft = player.offsetLeft;
	positionTop = player.offsetTop;
	playerW = player.offsetWidth;
	playerH = player.offsetHeight;

	if (downPressed) {
		var newTop = positionTop + 1;

		let check = collision(newTop, positionLeft, 'solid', playerW, playerH);
		if (check) {
			player.style.top = newTop + 'px';
		}

		animation('character walk down');
	}
	if (upPressed) {
		var newTop = positionTop - 1;

		let check = collision(newTop, positionLeft, 'solid', playerW, playerH);
		if (check) {
			player.style.top = newTop + 'px';
		}

		animation('character walk up');
	}
	if (leftPressed) {
		var newLeft = positionLeft - 1;
		player.className = 'character walk left';

		let check = collision(positionTop, newLeft, 'solid', playerW, playerH);
		if (check) {
			player.style.left = newLeft + 'px';

		}


	}
	if (rightPressed) {
		var newLeft = positionLeft + 1;
		player.className = 'character walk right';

		let check = collision(positionTop, newLeft, 'solid', playerW, playerH);
		if (check) {
			player.style.left = newLeft + 'px';

		}

	}

}


function animation(que) {
	if (leftPressed == false) {
		if (rightPressed == false) {
			player.className = que;
		}
	}

}



function makeTanks() {
	var tank = document.createElement('div');
	tank.className = 'tank';
	tank.classList.add('solid');
	document.body.appendChild(tank);
	tank.style.top = Math.ceil(Math.random() * 100) + '%';



}

function positionTanks() {
	var tanks = document.getElementsByClassName('tank');

	for (var i = 0; i < tanks.length; i++) {
		var random = Math.ceil(Math.random() * 95);
		tanks[i].style.top = random + '%';

		var bomb = document.createElement('div');
		bomb.className = 'bomb';
		bomb.style.left = tanks[i].offsetLeft + 'px';
		bomb.style.top = tanks[i].offsetTop + 10 + 'px';
		document.body.appendChild(bomb);

		moveBomb(bomb);

	}
}



function moveBomb(bomb) {
	var left = bomb.offsetLeft;
	var speed = Math.ceil(Math.random() * 10)
	var fuseLength = Math.ceil(Math.random() * left)
	setInterval(function () {
		left--;
		if (left > fuseLength) {
			bomb.style.left = left + 'px';
		} else {
			bomb.className = 'explosion';
			setTimeout(function () {
				bomb.remove();
			}, 2000);
		}

		var player = document.getElementById('player');
		var check = collision(player.offsetLeft, player.offsetTop, 'explosion',player.offsetWidth,player.offsetHeight);

		if (check) {
			//gameOver();
			gameOverTest();

		}
	}, speed);

}

function removeBomb(bomb) {
	if (bomb.className == 'explosion') {

	}
}


function collide(left, top, cls) {
	var element = document.elementFromPoint(left, top);

	if (element.classList.contains(cls)) {
		return true;
	}

}

function collision(top, left, cls, width, height) {
	var topLeft = document.elementFromPoint(left, top);
	var topRight = document.elementFromPoint(left + width, top);
	var bottomLeft = document.elementFromPoint(left, top + height);
	var bottomRight = document.elementFromPoint(left + width, top + height);

	if ((topLeft.classList.contains(cls) == false) &&
		(topRight.classList.contains(cls) == false) &&
		(bottomLeft.classList.contains(cls) == false) &&
		(bottomRight.classList.contains(cls) == false)) {

		return true;

	}




}


function gameOverTest() {
	console.log('game over');
}

function gameOver() {
	clearInterval(timeout);
	document.removeEventListener('keydown', keydown);
	document.removeEventListener('keyup', keyup);

	player.classList.add('dead');

	var bttn = document.getElementsByClassName('start')[0];
	bttn.style.display = 'block';
	bttn.firstChild.nodeValue = 'Game Over!!!';

}

function testing() {

}


function startGame() {
	var start = document.getElementsByClassName('start')[0];
	start.style.display = 'none';

	timeout = setInterval(move, 10);
	document.addEventListener('keydown', keydown);
	document.addEventListener('keyup', keyup);


	setInterval(positionTanks, 3000);





}

function myLoadFunction() {


	var start = document.getElementsByClassName('start')[0];
	start.addEventListener('click', startGame);
	for (let i = 0; i < tankNumber; i++) {
		makeTanks();
	}

	testing();

}


document.addEventListener('DOMContentLoaded', myLoadFunction);