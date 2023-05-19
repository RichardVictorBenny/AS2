//===GLOBAL VARIABLES===
var upPressed = false;
var downPressed = false;
var leftPressed = false;
var rightPressed = false;
var lastPressed = false;
var attack = false;


/* var tanks = 0; */
var playerHit = 0;
var hitCheck = false;
var removedLife = [];
var tankNumber = 3;
var playerName = 0;
var bombCreated = 0;
var levelHandler = 0;
var levelNumber = 1;


function myLoadFunction() {
	highScore()
	var start = document.getElementsByClassName('start')[0];
	start.addEventListener('click', startGame);
	
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
			textBox.value = '';
		}

	}

}

function launchGame() {

	for (let i = 0; i < tankNumber; i++) {
		makeTanks();
	}
	var scoreCard = document.getElementsByClassName('scoreCard')[0];
	var start = document.getElementsByClassName('start')[0];

	scoreCard.style.display = 'none';
	start.style.display = 'none';
	playerHit = 0;

	playerDefPos();

	timeout = setInterval(move, 10);
	document.addEventListener('keydown', keydown);
	document.addEventListener('keyup', keyup);


	positionTime = setInterval(positionTanks, 1000);


}

function playerNameCheck(newPlayerName) {//CHECKS IF THE NAME IS ALREADY IN LOCAL STORAGE

	if (localStorage[newPlayerName] == null) {
		playerName = newPlayerName;
		return true;
	} else {
		alert('name already exists');
		return false;
	}
}


function keyup(event) {		//==ARROW KEY CONTROL===
	var player = document.getElementById('player');

	if (event.keyCode == 32) {
		attack = false;

	}
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
	if (event.keyCode == 32) {
		attack = true;
	}
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
	var playerWidth = player.offsetWidth;
	var playerHeight = player.offsetHeight;

	let check = collision(positionTop,positionLeft,'ball',playerWidth,playerHeight);
	if (check == false) {
		hitCheck = true;
		if (playerHit == 3) {
			gameOver();
		} else {
			hit();
		}
	}


	if (downPressed) {
		var newTop = positionTop + 3;
		if (newTop>(window.innerHeight-playerHeight-1)) {
			newTop=window.innerHeight-playerHeight-1;
		}
		let check = collision(newTop, positionLeft, 'solid', playerWidth, playerHeight);
		if (check) {
			player.style.top = newTop + 'px';
		}
		animation('character walk down');
	}
	if (upPressed) {
		var newTop = positionTop - 3;
		if (newTop<0) {
			newTop=0;
		}
		let check = collision(newTop, positionLeft, 'solid', playerWidth, playerHeight);
		if (check) {
			player.style.top = newTop + 'px';
		}
		animation('character walk up');
	}
	if (leftPressed) {
		
		var newLeft = positionLeft - 3;
		if (newLeft<0) {
			newLeft =0;
		}
		player.className = 'character walk left';
		let check = collision(positionTop, newLeft, 'solid', playerWidth, playerHeight);
		if (check) {
			player.style.left = newLeft + 'px';
		}
	}
	if (rightPressed) {
		var newLeft = positionLeft + 3;
		if (newLeft>(window.innerWidth-playerWidth-1)) {
			newLeft = window.innerWidth-playerWidth-1;
		}
		player.className = 'character walk right';
		let check = collision(positionTop, newLeft, 'solid', playerWidth, playerHeight);
		if (check) {
			player.style.left = newLeft + 'px';
		}
	}

	if (attack) {
		player.classList.add('fire');
		var arrow = document.createElement('div');
		arrow.className = 'arrow';

		if (leftPressed) {		//===ARROW KEY CONTROL FOR ARROW
			var arrowNewLeft = positionLeft;
			var arrowNewTop = positionTop + 25;
			positionArrows(arrow, arrowNewLeft, arrowNewTop, 'left');
			setInterval(function () {
				arrowNewLeft--;
				if (arrowNewLeft<0) {
					arrowNewLeft =0;
				}
				if (arrowNewLeft > 0 || arrowNewTop > 0) {
					let check = collision(arrowNewTop, arrowNewLeft, 'bomb', arrow.offsetWidth, arrow.offsetHeight);
					if (check) {
						arrow.style.left = arrowNewLeft + 'px';
					} else {
						arrow.remove();
					}
				}
				if (arrowNewLeft == 0) {
					arrow.remove();
				}
			}, 10)

		}
		if (rightPressed) {
			var arrowNewLeft = positionLeft + playerWidth;
			var arrowNewTop = positionTop + 25;
			positionArrows(arrow, arrowNewLeft, arrowNewTop, 'right');
			setInterval(function () {
				arrowNewLeft++;
				if (arrowNewLeft>(window.innerWidth-arrow.offsetWidth-1)){
					arrowNewLeft = window.innerWidth-arrow.offsetWidth-1;
				}
				if (((arrowNewLeft + arrow.offsetWidth) < window.innerWidth) || ((arrowNewTop + arrow.offsetHeight) < window.innerHeight)) {
					let check = collision(arrowNewTop, arrowNewLeft, 'bomb', arrow.offsetWidth, arrow.offsetHeight);
					if (check) {
						arrow.style.left = arrowNewLeft + 'px';
					} else {
						arrow.remove();
					}
				}
				if (arrowNewLeft + arrow.offsetWidth == window.innerWidth-1 || (arrowNewTop + arrow.offsetHeight == window.innerHeight-1)) {
					arrow.remove();
				}
			}, 10)
		}
		if (upPressed) {
			var arrowNewLeft = positionLeft + (playerWidth / 2);
			var arrowNewTop = positionTop;
			positionArrows(arrow, arrowNewLeft, arrowNewTop, 'up');
			setInterval(function () {
				arrowNewTop--;
				if (arrowNewTop<0){
					arrowNewTop = 0;
				}
				if (arrowNewTop > 0 || arrowNewLeft > 0) {
					let check = collision(arrowNewTop, arrowNewLeft, 'bomb', arrow.offsetWidth, arrow.offsetHeight);
					if (check) {
						arrow.style.top = arrowNewTop + 'px';
					} else {
						arrow.remove();
					}

				}
				if (arrowNewTop == 0) {
					arrow.remove();
				}
			}, 10)
		}
		if (downPressed) {
			var arrowNewLeft = positionLeft + (playerWidth / 2);
			var arrowNewTop = positionTop + playerHeight;
			positionArrows(arrow, arrowNewLeft, arrowNewTop, 'down');
			setInterval(function () {
				arrowNewTop++;

				if (arrowNewTop > (window.innerHeight-arrow.offsetHeight-1)){
					arrowNewTop = window.innerHeight-arrow.offsetHeight-1;
				}
				if (arrowNewTop + arrow.offsetHeight < window.innerHeight || ((arrowNewLeft + arrow.offsetWidth) < window.innerWidth)) {
					let check = collision(arrowNewTop, arrowNewLeft, 'bomb', arrow.offsetWidth, arrow.offsetHeight);
					if (check) {
						arrow.style.top = arrowNewTop + 'px';
					} else {
						arrow.remove();
					}
				}
				if (arrowNewTop + arrow.offsetHeight == window.innerHeight-1 || (arrowNewLeft + arrow.offsetWidth == window.innerWidth-1)) {
					arrow.remove();
				}
			}, 10)
		}


		document.body.append(arrow);

		clearInterval(timeout);
		setTimeout(function () {
			timeout = setInterval(move, 10);
		}, 500);
	}
}

function positionArrows(arrow, arrowNewLeft, arrowNewTop, dir) {
	arrow.classList.add(dir)
	arrow.style.top = arrowNewTop + 'px';
	arrow.style.left = arrowNewLeft + 'px';
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
	var playerScore = document.getElementsByClassName('playerScore')[0];
	var levels = document.getElementsByClassName('levels')[0];

	for (var i = 0; i < tanks.length; i++) {
		var random = Math.ceil(Math.random() * 95);
		tanks[i].style.top = random + '%';
		var bomb = document.createElement('div');
		bomb.className = 'bomb ball';
		bomb.style.left = tanks[i].offsetLeft + 'px';
		bomb.style.top = tanks[i].offsetTop + 10 + 'px';
		document.body.appendChild(bomb);
		bombCreated++;
		levelHandler++;
		playerScore.innerText = bombCreated;

		moveBomb(bomb);
	}

	if (levelHandler >= 100) {

		levelHandler = 0;
		levelNumber++;
		levels.innerHTML = 'Level ' + levelNumber;
		makeTanks();
	}
}

function moveBomb(bomb) {
	var left = bomb.offsetLeft;
	var top = bomb.offsetTop;
	var speed = Math.ceil(Math.random() * 10)
	var fuseLength = Math.ceil(Math.random() * left)
	var randomTwo = Math.ceil(Math.random() * 2);
	var angle = Math.random();

	movingbombs = setInterval(function () {
		left--;
		
		if (randomTwo == 1) {
			top -= angle;
		} else {
			top += angle;
		}
		if (left > fuseLength) {
			bomb.style.left = left + 'px';
			bomb.style.top = top + 'px';
		} else {
			bomb.className = 'explosion ball';
			setTimeout(function () {
				bomb.remove();
			}, 2000);
		}
	}, speed);

}


function collision(top,left,cls,width,height) {
	var topLeft = document.elementFromPoint(left, top);
	var topRight = document.elementFromPoint(left + width, top);
	var bottomLeft = document.elementFromPoint(left, top + height);
	var bottomRight = document.elementFromPoint(left + width, top + height);
	var midTop = document.elementFromPoint(left + (width / 2), top);
	var midBottom = document.elementFromPoint(left + (width / 2), top + height);
	var midLeft = document.elementFromPoint(left, top + (height / 2));
	var midRight = document.elementFromPoint(left + width, top + (height / 2))

	if ((topLeft.classList.contains(cls) == false) &&
		(topRight.classList.contains(cls) == false) &&
		(bottomLeft.classList.contains(cls) == false) &&
		(bottomRight.classList.contains(cls) == false) &&
		(midBottom.classList.contains(cls) == false) &&
		(midTop.classList.contains(cls) == false) &&
		(midLeft.classList.contains(cls) == false) &&
		(midRight.classList.contains(cls) == false)){
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

function hitAnimation(cls) {
	if (leftPressed) {
		player.className = cls + ' left';
	} else if (rightPressed) {
		player.className = cls + ' right';
	} else if (upPressed) {
		player.className = cls + ' up';
	} else if (downPressed) {
		player.className = cls + ' down';
	}
}

function hit() {
	clearInterval(timeout);
	clearInterval(positionTime);
	if (hitCheck) {
		playerHit++;
	}

	hitAnimation('character hit');
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
	levelNumber = 1;
	var levels = document.getElementsByClassName('levels')[0];
	levels.innerHTML = 'Level ' + levelNumber;

	var tank = document.getElementsByClassName('tank');


	for (var i = 0; i < tank.length; i++) {
		document.body.removeChild(tank[i]);
	}

	clearInterval(timeout);
	//clearInterval(movingbombs);
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
	var data = document.getElementsByClassName('data')[0];
	let newNewPlayerName = data.getElementsByTagName('input')[0].value;
	playerName = newNewPlayerName;
	scoreCard.style.display = 'block';
	bttn.style.display = 'block';
	bttn.firstChild.nodeValue = 'Play Again?';

	bttn.addEventListener('click', function () { location.reload(); })
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