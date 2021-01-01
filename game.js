var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");

var he = new Image();
var bg = new Image();
var fg = new Image();
var holeUp = new Image();
var holeBottom = new Image();

he.src = "img/he.png";
bg.src = "img/bg.png";
fg.src = "img/fg.png";
holeUp.src = "img/holeUp.png";
holeBottom.src = "img/holeBottom.png";

var gap = 100;

//Управление he
document.addEventListener("keydown", moveUp);

function moveUp() {
	yPos -= 20;
	fly.play();
	}

// Создание блоков
var pipe =[];

pipe[0] = {
	x : cvs.width,
	y : 0
	}

var score = 0;
// Позиция he
var xPos = 150;
var yPos = 150;
var grav = 1.5;

function draw() {
	ctx.drawImage(bg, 0, 0);
	
	for(var i = 0; i < pipe.length; i++) {
	ctx.drawImage(holeUp, pipe[i].x, pipe[i].y);
	ctx.drawImage(holeBottom, pipe[i].x, pipe[i].y + holeUp.height + gap);
	
//Генерация объектов
	
	pipe[i].x--;
	
	
	if(pipe[i].x == 100) {
		pipe.push({
			x : cvs.width,
			y : Math.floor(Math.random() * holeUp.height) - holeUp.height
		});	
	  }
	
//Касания с объектами
	
	if(xPos + he.width >= pipe[i].x
	  && xPos <= pipe[i].x + holeUp.width
	  && (yPos <= pipe[i].y + holeUp.height
	   || yPos + he.height >= pipe[i].y + holeUp.height +gap) || yPos + he.height >= cvs.height - fg.height) { 
	    location.reload(); //Перезагрузка страницы
	   } 
	   
	   if(pipe[i].x ==5) {
		   score++;
		   }
	}

	
	ctx.drawImage(fg, 0, cvs.height - fg.height);
	ctx.drawImage(he, xPos, yPos);
	
	yPos += grav;
	
	ctx.fillStyle = "#fff";
	ctx.font = "24px Roboto";
	ctx.fillText("Счёт: " + score, 10, cvs.height - 20);
	
	requestAnimationFrame(draw);
	}
	holeBottom.onload = draw;