var upPressed = false;
var downPressed = false;
var leftPressed = false;
var rightPressed = false;
var lastPressed = false;

/* var tanks = 0; */
var playerHit = 0;
var hitCheck = false;
var removedLife = [];
var tankNumber = 5;
var playerName = 0;
var bombCreated = 0;

function myLoadFunction() {
	highScore()
	var start = document.getElementsByClassName('start')[0];
	start.addEventListener('click', startGame);
	for (let i = 0; i < tankNumber; i++) {
		makeTanks();
	}



}


document.addEventListener('DOMContentLoaded', myLoadFunction);

function startGame() {
	var textBox = document.getElementById('newPlayerName');
	var newPlayerName = textBox.value;

	if (newPlayerName == null || newPlayerName == '') {
		alert('enter a name');
	} else {
		if (playerNameCheck(newPlayerName)) {
			launchGame();
		} else {
			var textBox = document.getElementById('newPlayerName');
			textBox.value = '';
		}

	}

}

function launchGame() {
	var scoreCard = document.getElementsByClassName('scoreCard')[0];
	var start = document.getElementsByClassName('start')[0];

	scoreCard.style.display = 'none';
	start.style.display = 'none';

	/* do {
		//alert('enter name to play!');
		
		//var newPlayerName = window.prompt('Enter  username: ', 'player');
	} while (newPlayerName == null || newPlayerName == '');
 */
	playerNameCheck(newPlayerName);

	playerHit = 0;

	playerDefPos();

	timeout = setInterval(move, 10);
	document.addEventListener('keydown', keydown);
	document.addEventListener('keyup', keyup);


	positionTime = setInterval(positionTanks, 1000);

}

function playerNameCheck(newPlayerName) {

	if (localStorage[newPlayerName] == null) {

		playerName = newPlayerName;
		return true;

	} else {
		alert('name already exists');
		return false;


		/* do {
			var newPlayerName = window.prompt('Enter different username: ', 'player');
		} while (newPlayerName == null || newPlayerName == ''); */
		//playerNameCheck(newPlayerName);
	}
}


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
	var positionLeft = player.offsetLeft;
	var positionTop = player.offsetTop;
	var playerW = player.offsetWidth;
	var playerH = player.offsetHeight;

	let check = collision(player.offsetTop, player.offsetLeft, 'explosion', player.offsetWidth, player.offsetHeight);

	if (check == false) {
		hitCheck = true;

		if (playerHit == 3) {
			gameOver();
		} else {
			hit();
		}
	}


	if (downPressed) {
		var newTop = positionTop + 3;// for testing purpose

		let check = collision(newTop, positionLeft, 'solid', playerW, playerH);
		if (check) {
			player.style.top = newTop + 'px';
		}

		animation('character walk down');
	}
	if (upPressed) {
		var newTop = positionTop - 3;// for testing purpose

		let check = collision(newTop, positionLeft, 'solid', playerW, playerH);
		if (check) {
			player.style.top = newTop + 'px';
		}

		animation('character walk up');
	}
	if (leftPressed) {
		var newLeft = positionLeft - 3;// for testing purpose
		player.className = 'character walk left';

		let check = collision(positionTop, newLeft, 'solid', playerW, playerH);
		if (check) {
			player.style.left = newLeft + 'px';

		}


	}
	if (rightPressed) {
		var newLeft = positionLeft + 3;// for testing purpose
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
		bombCreated++;

		moveBomb(bomb);

	}
}

function moveBomb(bomb) {
	var left = bomb.offsetLeft;
	var speed = Math.ceil(Math.random() * 10)
	var fuseLength = Math.ceil(Math.random() * left)
	setInterval(function () {
		//left--;
		left -= 2; // for testing purpose
		if (left > fuseLength) {
			bomb.style.left = left + 'px';
		} else {
			bomb.className = 'explosion';
			setTimeout(function () {
				bomb.remove();
			}, 2000);
		}
	}, speed);

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

	} else {
		return false;
	}
}

function noMovement() {
	downPressed = false;
	upPressed = false;
	rightPressed = false;
	leftPressed = false;
}

function hit() {
	clearInterval(timeout);
	clearInterval(positionTime);
	if (hitCheck) {
		playerHit++;
	}

	//animating character hit
	if (leftPressed) {
		player.className = 'character hit left';
		//console.log('hit left');
	} else if (rightPressed) {
		player.className = 'character hit right';
		//console.log('hit right');
	} else if (upPressed) {
		player.className = 'character hit up';
		//console.log('hit up');
	} else if (downPressed) {
		player.className = 'character hit down';
		//console.log('hit down');
	}

	noMovement();


	setTimeout(function () {
		let life = document.getElementsByTagName('li')[0];
		removedLife.push(life.parentNode.removeChild(life));
		playerDefPos();
		timeout = setInterval(move, 10);
		positionTime = setInterval(positionTanks, 3000);
	}, 500)

}




function gameOver() {
	clearInterval(timeout);
	clearInterval(positionTime);

	noMovement();

	localStorage.setItem(playerName, bombCreated);
	bombCreated = 0;

	highScore();

	document.removeEventListener('keydown', keydown);
	document.removeEventListener('keyup', keyup);

	player.className = 'character dead';

	alert('YOU\'RE DEAD');
	let life = document.getElementsByClassName('health')[0];
	for (var i = 0; i < removedLife.length; i++) {
		life.appendChild(removedLife[i]);
	}

	var scoreCard = document.getElementsByClassName('scoreCard')[0];
	var bttn = document.getElementsByClassName('start')[0];
	scoreCard.style.display = 'block';
	bttn.style.display = 'block';
	bttn.firstChild.nodeValue = 'Play Again?';

}

function playerDefPos() {
	player.style.top = '88vh';
	player.style.left = '200px';
	player.className = 'character stand down';
}

function highScore() {
	var maxScore = 0;
	var maxPlayer = '';
	for (var key in localStorage) {
		let newVal = Number(localStorage.getItem(key));
		if (newVal > maxScore) {
			maxScore = newVal;
			maxPlayer = key;
		}
	}

	let score = document.getElementsByClassName('score')[0];
	let nodes = score.getElementsByTagName('p');
	nodes[0].innerText = maxPlayer;
	nodes[1].innerText = maxScore;
}