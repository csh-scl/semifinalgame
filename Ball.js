var img ;
 var bgm = new Audio("img/rohendel.mp3");
img = 'url("img/trip.jpg")'
var totalScore = 0;
var gameclear=[0,0,0];
var cursorstate = 1;
var mousecursorurl;  
var coin=100000; //특수 공 튕기면 코인 갱신
var viscoin=0;

$(document).ready(function () {
  $("#logo").on("click", function() {//let's go logo 클릭시 브금 재생
 
  bgm.play();
  bgm.loop = true;
});
  mousecheck();
  $("#startButton").on("click", intro);

  $('#startButton').hover(function () {
    $("#main-menu").fadeTo('slow', 0.1, function () {
      $("#main-menu").css('background-image', img);
    }).fadeTo('slow', 1);
    
  },
    function () {
      $("#main-menu").css('background-image', img);
    },
  )
  function mousecheck(){
    if (cursorstate == 1) {
        mousecursorurl = 'url("img/cursor1.png"),pointer'
      }
      else if (cursorstate == 2) {
        mousecursorurl = 'url("img/cursor2.png"),pointer'
      }
      else if (cursorstate == 3) {
        mousecursorurl = 'url("img/cursor3.png"),pointer'
      }
      $("body").css('cursor', mousecursorurl);
      $("button").mouseenter(function() {
      $(this).css("cursor", mousecursorurl);
      });

  }

//환경설정 - 배경화면 변경
  $("#next").click(function () {
    if ($("#bgi").attr("src") == "img/cursor1.png") {
      ($("#bgi").attr("src", "img/cursor2.png"));
      cursorstate=2;
     
    }
    else if ($("#bgi").attr("src") == "img/cursor2.png") {
      ($("#bgi").attr("src", "img/cursor3.png"));
      cursorstate=3;
      
    }
    else if ($("#bgi").attr("src") == "img/cursor3.png") {
      ($("#bgi").attr("src", "img/cursor1.png"));
      cursorstate=1;
      
    }
  });
  $("#previous").click(function () {
    if ($("#bgi").attr("src") == "img/cursor1.png") {
      ($("#bgi").attr("src", "img/cursor3.png"));
      cursorstate=3;
     
    }
    else if ($("#bgi").attr("src") == "img/cursor2.png") {
      ($("#bgi").attr("src", "img/cursor1.png"));
      cursorstate=1;
     
    }
    else if ($("#bgi").attr("src") == "img/cursor3.png") {
      ($("#bgi").attr("src", "img/cursor2.png"));
      cursorstate=2;
      
    }
  });

  //배경음악 설정

  $("#select").on("click", bgmPlay);
  $("#select2").on("click", bgmStop);




  //환경설정 창 닫기
  $("#okButton").click(function () {
    $("#setting").fadeOut("slow");
    mousecheck();
  });

  $("#intro p:nth-child(2)").on("click", gameMenu);
  $("#game1Button").on("click", game1);
  $("#game2Button").on("click", game2);
  $("#game3Button").on("click", game3);

  $("#menu1").on("click", game1);
  $("#menu2").on("click", game2);
  $("#menu3").on("click", game3);

  $("#settingIcon").on("click", showSetting);

});

function bgmPlay() {
  bgm.play();
}
function bgmStop(){
  bgm.pause();
}


//환경설정
function showSetting() {
  $("#setting").fadeIn("slow");
  $("#setting").addClass("popup");
  change_position($(".popup"));
  $("#setting").css("display", "block");
}
//환경설정 팝업 위치설정
function change_position(obj) {
  var l = ($(window).width() - obj.width()) / 2;
  var t = ($(window).height() - obj.height()) / 2;
  obj.css({ top: t, left: l });
}

function intro() {
  $("#main-menu").css("display", "none");
  $("#intro").fadeIn(2000);
}
function gameMenu() {
  $("#intro").css("display", "none");
  $("#game-menu").fadeIn(2000);
}
function game1() {
  $("#game-menu").css("display", "none");
  $("#game1").css("display", "block");
  for_game1();
}
function game2() {
  $("#game-menu").css("display", "none");
  $("#game2").css("display", "block");
  for_game2();
}
function game3(){
  $("#game-menu").css("display", "none");
  $("#game3").css("display", "block");
  for_game3();
}


/*=================================================== GAME 1 ==================================================*/
/*=================================================== GAME 1 ==================================================*/
/*=================================================== GAME 1 ==================================================*/
/*=================================================== GAME 1 ==================================================*/
/*=================================================== GAME 1 ==================================================*/

function for_game1() {
  var game1alam = $("#game1_alam");
  game1alam.fadeIn(2000);

  var game1alamButton = $("#game1_alam button");
  game1alamButton.click(function () {
    game1alam.css("display", "none");
    startGame();                      //알림창 '축구게임' 띄우기                          
  })

  var canvas_Width = screen.availWidth * 7 / 10;
  var canvas_Height = screen.availHeight;
  var canvas;
  var ctx;
  

  var mouseEvent = function (ev) {
    game.paddle.x = ev.offsetX - game.paddle.halfWidth;
    if (game.paddle.x < 0) {
      game.paddle.x = 0;
    } else if (game.paddle.x + game.paddle.width > WIDTH) {
      game.paddle.x = WIDTH - game.paddle.width;
    }
  };

  canvas = document.getElementById("game1_canvas");
  ctx = canvas.getContext('2d');
  canvas.setAttribute('width', canvas_Width);
  canvas.setAttribute('height', canvas_Height);
  var game1_life;
  var timeout = 90;
  var timeoutInterval;
  var game1Score = 0;

  function startGame() {
    game1Score = 0;
    game1_life = 3;
    $("#game1_life").text("남은 기회 : " + game1_life);
    timeout = 90;
    timeoutInterval =
      setInterval(function () {
        timeout--;
        $("#game1_score").text('득점 횟수 : '+game1Score);
        $("#game1_timeout").text('남은 시간: ' + timeout + '초');
      }, 1000);

    game = new Game();
    canvas.focus();
    var image = new Image();
    image.onload = function(){
      ctx.drawImage(image,0,0,canvas_Width,canvas_Height);
    }
    image.src="soccer.jpg"

    canvas.addEventListener("mousemove", mouseEvent);
  }

  var WIDTH = canvas.width;
  var HEIGHT = canvas.height;
  var BALL_RADIUS = 10;
  var PADDLE_WIDTH = 200;
  var PADDLE_HEIGHT = 15;
  var PADDLE_X = (WIDTH - PADDLE_WIDTH) / 2;
  var PADDLE_Y = HEIGHT - PADDLE_HEIGHT - 10;
  var PADDLE_SPEED = 7;
  var COLOR = "white";
 

  class Ball {
    constructor(x, y, radius, speed, angle, color) {
      this.x = x;
      this.y = y;
      this.radius = radius;
      this.speed = speed;
      this.setAngle(angle);
      this.color = color;
    }

    setAngle(angle) {
      var radian = angle / 180 * Math.PI;
      this.mx = this.speed * Math.cos(radian);
      this.my = this.speed * -Math.sin(radian);
    }

    move(k) {
      this.x += this.mx * k;
      this.y += this.my * k;
    }

    get collideX() {
      if (this.mx > 0) return this.x + this.radius;
      else return this.x - this.radius;
    }

    get collideY() {
      if (this.my > 0) return this.y + this.radius;
      else return this.y - this.radius;
    }

    collideWall(left, top, right) {
      if (this.mx < 0 && this.collideX < left) this.mx *= -1;
      if (this.mx > 0 && this.collideX > right) this.mx *= -1;
      if (this.my < 0 && this.collideY < top) this.my *= -1;
    }

    draw(ctx) {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.fill();
      ctx.closePath();
      
    }
  }

  class Paddle {
    constructor(x, y, width, height, speed, color) {
      this.x = x;
      this.y = y;
      this.width = width;
      this.halfWidth = width / 2;
      this.height = height;
      this.speed = speed;
      this.color = color;
    }

    get center() { return this.x + this.halfWidth; }

    collide(ball) {
      var yCheck = () => this.y - ball.radius < ball.y &&
        ball.y < this.y + ball.radius;
      var xCheck = () => this.x < ball.x && ball.x < this.x + this.width;
      if (ball.my > 0 && yCheck() && xCheck()) {
        const hitPos = ball.x - this.center;
        var angle = 80 - (hitPos / this.halfWidth * 60); // 20 ~ 80
        if (hitPos < 0) angle += 20; // 100 ~ 160
        ball.setAngle(angle);
      }
    }

    draw(ctx) {
      ctx.beginPath();
      ctx.fillStyle = this.color;
      ctx.fillRect(this.x, this.y, this.width, this.height);
      ctx.closePath();
    }
  }

  class Bricks {
    constructor(rows, cols, x, y, width, height, color, color_rest,color_defense, bricktype) {
      this.rows = rows;
      this.cols = cols;
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
      this.brickWidth = width / cols;
      this.brickHeight = height / rows;
      this.count;
      this.color = color;
      this.data = [];
      this.bricktype = bricktype;
      this.color_rest = color_rest;
      this.color_defense=color_defense;
      this.img;
      
      

      if (bricktype == 'soccergame') {
        this.data = [
          [0, 0, 0, 0, 2, 2, 2, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [3, 3, 3, 3, 1, 3, 1, 3, 3, 3, 3],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [3, 1, 3, 3, 3, 3, 3, 3, 3, 1, 3],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [3, 3, 3, 1, 3, 3, 3, 1, 3, 3, 3],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [1, 3, 3, 3, 3, 1, 3, 3, 3, 3, 1],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        ];
        this.count = 0;
        for (var i = 0; i < 11; i++) {
          for (var j = 0; j < 11; j++) {
            if (this.data[i][j] == 2)
              this.count++;
          }
        }
      }
    }

    collide(x, y) {
      var row = Math.floor((y - this.y) / this.brickHeight);
      var col = Math.floor((x - this.x) / this.brickWidth);
      if (row < 0 || row >= this.rows) return false;
      if (col < 0 || col >= this.cols) return false;
      if (this.data[row][col] > 0) {
        if (this.data[row][col] == 1) {
          return true;
        }
         if(this.data[row][col]==2){

          game1Score++;
          this.count--;
        }
        this.data[row][col] = 0;
        return true;
      }
      else return false;
    }

    draw(ctx) {
      ctx.strokeStyle = "lightgray";
      for (var r = 0; r < this.rows; r++) {
        for (var c = 0; c < this.cols; c++) {
          if (!this.data[r][c]) continue;
          if (this.data[r][c] == 2) {
            ctx.fillStyle=this.color_rest;
            
          }
          if (this.data[r][c] == 1) {
            var manu = new Image();
            manu.src = "img/manu.jpg"
           
            ctx.drawImage(manu, this.x + (this.brickWidth * c) ,this.y + (this.brickHeight * r), this.brickWidth, this.brickHeight);
             ctx.fillStyle = this.color
          }
           if (this.data[r][c] == 3) {
            var liverpool = new Image();
            liverpool.src = "img/liverpool.jpg"
            ctx.drawImage(liverpool, this.x + (this.brickWidth * c) ,this.y + (this.brickHeight * r), this.brickWidth, this.brickHeight);
            ctx.fillStyle = this.color_defense;
          }
          var x = this.x + (this.brickWidth * c);
          var y = this.y + (this.brickHeight * r);
          ctx.beginPath();
          ctx.fillRect(x, y, this.brickWidth, this.brickHeight);
          ctx.strokeRect(x, y, this.brickWidth, this.brickHeight);
          ctx.closePath();
        }
      }
    }
  }

  class Game {
    constructor() {
      var ballSpeeds = 10;
      var brickSettings = [
        [11, 11, 0, 5, canvas_Width, 660, 'rgba(0,0,0,0.0)', 'gray','rgba(0,0,0,0)', 'soccergame'] //rows, cols, x, y, width, height, color,img
      ];

      this.state = "play";
      this.paddle = new Paddle(PADDLE_X, PADDLE_Y, PADDLE_WIDTH, PADDLE_HEIGHT,
        PADDLE_SPEED, COLOR);
      this.ball = new Ball(this.paddle.center, PADDLE_Y - BALL_RADIUS, BALL_RADIUS,
        ballSpeeds, 90, COLOR);
      this.brick = new Bricks(...brickSettings[0]);
    }

    update() {
      if (this.state != "play") return;

      const DIV = 10;
      for (var i = 0; i < DIV; i++) {
        this.ball.move(1 / DIV);
        this.ball.collideWall(0, 0, WIDTH);
        this.paddle.collide(this.ball);
        if (this.brick.collide(this.ball.collideX, this.ball.y)) {
          this.ball.mx *= -1;
        }
        if (this.brick.collide(this.ball.x, this.ball.collideY)) {
          this.ball.my *= -1;
        }
      }

      if (this.ball.y > HEIGHT + 50) this.state = "fall";
      if (this.brick.count == 0) {
        this.state = "clear";
      }
      if (game1_life == 0) {
        this.state = "fail";
      }
    }

    draw() {
      ctx.clearRect(0, 0, WIDTH, HEIGHT);
      this.brick.draw(ctx);
      this.paddle.draw(ctx);
      this.ball.draw(ctx);
    }
  }

  var game = null;

  document.addEventListener("keydown", keyDownHandler1, false);

  function keyDownHandler1(e) {
    if (e.keyCode == 81) {
      game.state = "clear";
    }
  }

  function maingame() {
    requestAnimationFrame(maingame);

    if (game) {
      game.update();
      game.draw();
      if (game.state == "clear") {        // 클리어
        document.removeEventListener("keydown", keyDownHandler1);
        game = null;
        clearInterval(timeoutInterval);
        $("#game1").css("display", "none");
        $("#game1_clear").fadeIn(1000);
        setTimeout(() => $("#game1_clear").fadeOut(1000), 2000);
        setTimeout(() => game2(), 2000);
      }
      else if (timeout == 0) { //시간을 초과하였을 경우 재시작
        $("#fail").fadeIn(1000)
        setTimeout(() => $("#fail").fadeOut(1000), 3000);
        game.state = "stop";
        game = null;
        setTimeout(() => clearInterval(timeoutInterval), 4000);
        setTimeout(() => startGame(), 3800);  

      }
      else if (game.state == "fall") {    //공을 못받았을 경우
        game1_life--;
        game.ball = new Ball(game.paddle.center, PADDLE_Y - BALL_RADIUS, BALL_RADIUS, 10, 90, COLOR);
        game.state = "play";
        $("#game1_life").text("남은 목숨 : " + game1_life);
      }
      else if (game.state == "fail") {    //목숨이 0일때 재시작
        game = null;
        $("#fail").fadeIn(1000)
        setTimeout(() => $("#fail").fadeOut(1000), 3000);
        setTimeout(() => clearInterval(timeoutInterval), 4000);
        setTimeout(() => startGame(), 3800);

      }
    }
  }

  maingame();
}

/*=================================================== GAME 2 ==================================================*/
/*=================================================== GAME 2 ==================================================*/
/*=================================================== GAME 2 ==================================================*/
/*=================================================== GAME 2 ==================================================*/
/*=================================================== GAME 2 ==================================================*/


function for_game2(){
  var game2alam = $("#game2_alam");
  game2alam.fadeIn(2000);

  var game2alamButton = $("#game2_alam button");
  game2alamButton.click(function () {
    game2alam.css("display", "none");
    draw();                                             
  })
  var canvas = document.getElementById("gameCanvas");
    var context = canvas.getContext("2d");// 캔버스 구현
    var canvas_Width = screen.availWidth * 7/ 10;
    var canvas_Height = screen.availHeight*1.05;
    var gameOver = false; // 게임 오버 여부 변수 추가
    var ballRadius = 20;//반지름
    var x = canvas_Width / 2; //공 위치 x좌표
    var y = canvas_Height - 30;//공 위치 y좌표
    var x2=canvas_Width/2;//추가공위치x
    var y2=canvas_Height-30;//공위치 y좌표
    var dx = 2; //공 x방향 속도
    var dy = -9;//공 y방향 속도
    var dx2=-0;//공 x방향 속도
    var dy2=-13;//공 y방향 속도
    var paddleHeight = 20; //패달 높이
    var paddleWidth = 120;//패달 좌우
    var paddleX = (canvas_Width - paddleWidth) / 2;//패달 x좌표(왼쪽 시작지점)
    var rightPressed = false;//오른누름상태
    var leftPressed = false;//왼누름상태
    var brickRowCount = 6; //벽돌 열
    var brickColumnCount = 7;//벽돌 행
    var brickWidth = 150; //벽돌 밑변
    var brickHeight = 50;// 벽돌 높이
    var brickPadding = 38;//벽돌 간격
    var brickOffsetTop = 30;//벽돌 위 벽과의 거리
    var brickOffsetLeft = 30;//벽돌 왼쪽 벽과의 거리
    var brickCount=brickRowCount*brickColumnCount;
    var twoball=true;//공 2개 확인
    
    
    var balldistance=30;//불꽃공과의 거리
    canvas.setAttribute('width', canvas_Width);
    canvas.setAttribute('height', canvas_Height);
    var img=new Image();
    var img2=new Image();
    var goldimg=new Image();
    var moneyimg=new Image();
    var fireimg=new Image();
    fireimg.src="img/fire.png";
    var backimg=new Image();
    backimg.src="img/배경이미지.jpg";
    var firebackimg=new Image();
    firebackimg.src="img/진짜불타는배경.jpg";
    var backimg2=new Image();
    backimg2.src="img/진짜여행지배경.jpg";
    var padimg=new Image();
    padimg.src="img/pad.png"; 
    moneyimg.src="img/money.png";
    goldimg.src="img/gold.png";
    img.src="img/500ball.jpg";
    img2.src="img/coinimg2.png";

    var bricks = [];
    for (var c = 0; c < brickColumnCount; c++) {//열 초기화
      bricks[c] = [];
      for (var r = 0; r < brickRowCount; r++) {//행 초기화
        bricks[c][r] = { x: 0, y: 0, status: 1 };//벽돌의 x좌표 y좌표 status(2:황금 1:활성화 0: 비활성화)
        if(c==0||c==2||c==4||c==6){
          bricks[c][r]={x:0,y:0,status:2};
          brickCount--;
        }
      }
    }//벽돌 초기화 

    document.addEventListener("keydown", keyDownHandler, false);//이벤트 등록 키누름
    document.addEventListener("keyup", keyUpHandler, false);//이벤트 등록 키올림
    document.addEventListener("mousemove", mouseMoveHandler, false);//이벤트 등록 마우스 움직임


  var sound=new Audio("img/bounce.wav");
   var sound2=new Audio("img/coinsound.wav");


    function playSound() {
  
  try {
    sound.pause(); // 사운드 일시 정지
    sound.currentTime = 0; // 재생 시간을 초기화하여 사운드를 처음부터 재생
    sound.play();
  } catch (error) {
    console.error("사운드 재생 중 오류가 발생했습니다:", error);
  }
 
}
 function playcoinSound() {
  
  try {
    sound2.pause(); // 사운드 일시 정지
    sound2.currentTime = 0; // 재생 시간을 초기화하여 사운드를 처음부터 재생
    sound2.play();
  } catch (error) {
    console.error("사운드 재생 중 오류가 발생했습니다:", error);
  }
 
}


    function keyDownHandler(e) {//키를 눌렀을 때
      if (e.keyCode === 39) {//오른쪽
        rightPressed = true;
      } else if (e.keyCode === 37) {
        leftPressed = true;//왼쪽
      }
    } 

    function keyUpHandler(e) {//키를 땠을 
      if (e.keyCode === 39) {//오른쪽
        rightPressed = false;
      } else if (e.keyCode === 37) {//왼쪽
        leftPressed = false;
      }
    }

    function mouseMoveHandler(e) {
      var relativeX = e.clientX - canvas.offsetLeft; //마우스위치를 설정
      if (relativeX > 0 && relativeX < canvas.width) {
        paddleX = relativeX - paddleWidth / 2; //패달x 좌표를 마우스 위치로 설정(마우스가 패달의 정중앙에 았는 것 처럼)
      }
    }

    function collisionDetection() { //충돌 인식과 변화
      for (var c = 0; c < brickColumnCount; c++) {//열
        for (var r = 0; r < brickRowCount; r++) {//행
          var brick = bricks[c][r]; //블록 변수설정
          if (brick.status === 1||brick.status===3) { //블록 활성화 상태 시 충돌 일식
            if (
              x > brick.x &&
              x < brick.x + brickWidth &&
              y > brick.y &&
              y < brick.y + brickHeight 
            ) {
              playSound();
              if(x > brick.x +1 &&
              x < brick.x + brickWidth -1)
              {
                dy=-dy;//위 아래로 충돌시 -dy
              }
              else
              {
              dx = -dx;//좌우로 충돌시 -dx
            }
            if(brick.status===1){
            coin=coin+1000;
              }
            else{
              coin=coin+500;
               
            }
            brickCount=brickCount-1;
              brick.status = 0; //충돌시 해당 블록 비활성화

            }
            else if(    x > brick.x-balldistance &&
              x < brick.x + brickWidth+balldistance &&
              y > brick.y -balldistance&&
              y < brick.y + brickHeight+balldistance&&
              (dx>7||dx<-7) ){
              brick.status=3;
            }
          }

           if (brick.status === 1||brick.status===3) { //블록 활성화 상태 시 충돌 일식
            if (
              x2 > brick.x &&
              x2< brick.x + brickWidth &&
              y2 > brick.y &&
              y2 < brick.y + brickHeight 
            ) {
              playSound();
              if(x2 > brick.x +1 &&
              x2 < brick.x + brickWidth -1)
              {
                dy2=-dy2;//위 아래로 충돌시 -dy
              }
              else
              {
              dx2 = -dx2;//좌우로 충돌시 -dx
            }
            brickCount=brickCount-1;
              brick.status = 0; //충돌시 해당 블록 비활성화
              coin=coin+1000;
               
              if(brick.status===3)
                {coin=coin-500;
                 }//불타는 블록
            }
          }
          if (brick.status === 2) { //블록 활성화 상태 시 충돌 일식
            if (
              x2 > brick.x &&
              x2< brick.x + brickWidth &&
              y2 > brick.y &&
              y2 < brick.y + brickHeight 
            ) {
              playSound();
              if(x2 > brick.x +1 &&
              x2 < brick.x + brickWidth -1)
              {
                dy2=-dy2;//위 아래로 충돌시 -dy
              }
              else
              {
              dx2 = -dx2;//좌우로 충돌시 -dx
            }
            
              brick.status = 1; //충돌시 해당 블록 비활성화
              coin=coin+10000;
              
              brickCount++;
            }
          }
        }
      }
    }

    function drawBall() {                                   //공그리기
      context.beginPath();
    
      if(dx>7||dx<-7){
        context.arc(x, y, ballRadius, 0, Math.PI * 1.5);
        context.fillStyle="darkred";
           context.drawImage(img2,x-1.94*ballRadius,y-2.0*ballRadius,3.9*ballRadius,3.9*ballRadius);}
      else if(dx>4||dx<-4){
        context.arc(x, y, ballRadius, 0, Math.PI * 2);
        context.fillStyle="red";
     context.drawImage(img,x-1.5*ballRadius,y-1.3*ballRadius,2.5*ballRadius,2.5*ballRadius);
      }else{
      context.arc(x, y, ballRadius, 0, Math.PI * 2);
      context.fillStyle = "silver";
       context.fill();
      context.closePath();
       context.drawImage(img,x-1.5*ballRadius,y-1.3*ballRadius,2.5*ballRadius,2.5*ballRadius);

    }
     
          }
     function drawBall2() {                                   //공그리기 2
      context.beginPath();
      context.arc(x2, y2, ballRadius, 0, Math.PI * 2);
      context.fillStyle = "gold";
      context.fill();
      context.closePath();
    }

    function drawPaddle() {                                 //패달 그리기
      
      context.drawImage(padimg,paddleX,canvas.height -paddleHeight,paddleWidth,paddleHeight);
    }

    function drawBricks() {                           //벽돌그리기
      for (var c = 0; c < brickColumnCount; c++) {
        for (var r = 0; r < brickRowCount; r++) {
          if (bricks[c][r].status === 1) {//활성화시 x좌표 y좌표 부여
            var brickX = c * (brickWidth + brickPadding) + brickOffsetLeft; //벽돌 x좌표
            var brickY = r * (brickHeight + brickPadding) + brickOffsetTop;//벽돌 y좌표
            bricks[c][r].x = brickX; //벽돌 x좌표 저장 
            bricks[c][r].y = brickY;//벽돌 y좌표 저장
            context.beginPath();
            context.rect(brickX, brickY, brickWidth, brickHeight);
            context.fillStyle = "green";
            context.fill();
            context.closePath();
            context.drawImage(moneyimg,brickX,brickY,brickWidth,brickHeight);
          }
           if (bricks[c][r].status === 2) {//활성화시 x좌표 y좌표 부여
            var brickX = c * (brickWidth + brickPadding) + brickOffsetLeft; //벽돌 x좌표
            var brickY = r * (brickHeight + brickPadding) + brickOffsetTop;//벽돌 y좌표
            bricks[c][r].x = brickX; //벽돌 x좌표 저장 
            bricks[c][r].y = brickY;//벽돌 y좌표 저장
            context.beginPath();
            context.rect(brickX, brickY, brickWidth, brickHeight);
            context.fillStyle = "gold";
            context.fill();
            context.closePath();
            context.drawImage(goldimg,brickX,brickY,brickWidth,brickHeight);
          }
           if (bricks[c][r].status === 3) {//활성화시 x좌표 y좌표 부여
            var brickX = c * (brickWidth + brickPadding) + brickOffsetLeft; //벽돌 x좌표
            var brickY = r * (brickHeight + brickPadding) + brickOffsetTop;//벽돌 y좌표
            bricks[c][r].x = brickX; //벽돌 x좌표 저장 
            bricks[c][r].y = brickY;//벽돌 y좌표 저장
           
            context.drawImage(fireimg,brickX,brickY,brickWidth,brickHeight);
          }
        }
      }
    }
    
    function draw() {//전부 그리기
      if(viscoin<coin){
        if (viscoin+10000<coin) {
          viscoin=500+viscoin;
        }
        else {
          viscoin=100+viscoin;
        }
              }
       $(".game2_score").text(viscoin/100+"$"  );
      context.clearRect(0, 0, canvas.width, canvas.height);//캔버스 초기화
      if(twoball==true){
        context.drawImage(backimg,0,0,canvas.width, canvas.height);
      }
      else if(dx>7||dx<-7){
        context.drawImage(firebackimg,0,0,canvas.width, canvas.height);
      }
      else{
        context.drawImage(backimg2,0,0,canvas.width, canvas.height);
      }
      drawBricks();//벽돌 그리기
      drawBall();//공 그리기
      drawPaddle();//패달 그리기
      collisionDetection();//벽돌 충돌인식과 변화
      if(twoball==false&&y + dy > canvas.height - ballRadius&&x > paddleX+paddleWidth/2-10 && x < paddleX + paddleWidth/2+10){
        
       playcoinSound();
        twoball=true;
      }
      if (twoball==true) {drawBall2();
        if (x2 + dx2 > canvas.width - ballRadius || x2 + dx2 < ballRadius) {//좌우에 닿음
        dx2 = -dx2;
      }
      if (y2 + dy2 < ballRadius) {//상단에 닿음
        dy2 = -dy2;
      } else if (y2 + dy2 > canvas.height - ballRadius) {
        if (x2 > paddleX && x2 < paddleX + paddleWidth) {
          playSound();
          dy2 = -dy2;
          dx2=(x2-(paddleX+paddleWidth/2))/(paddleWidth/4)*4;
        }else{
          twoball=false;
          x2=canvas.width/2;//추가공위치x
          y2=canvas.height-30;//공위치 y좌표
          dx2=-0;//공 x방향 속도
          dy2=-7
        }
}}

      if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {//좌우에 닿음
        dx = -dx;
      }
      if (y + dy < ballRadius) {//상단에 닿음
        dy = -dy;
      } else if (y + dy > canvas.height - ballRadius) {
        if (x > paddleX && x < paddleX + paddleWidth) {
           playSound()
          dy = -dy;
          dx=(x-(paddleX+paddleWidth/2))/(paddleWidth/4)*2+dx;
        } else {
            if (!gameOver) {
            dx=0;
          dy=0;
          dx2=0;
          dy2=0;
                gameOver=true;
         game = null;
        
        $("#game2").css("display", "none");
  
        setTimeout(() => game3(), 500);
           gameOver = true; // 게임 오버 상태로 변경
   
    }
          
        }
      }

      if (brickCount==0) {//벽돌 0개시 스테이지 종료
        if (!gameOver) {
          dx=0;
          dy=0;
          dx2=0;
          dy2=0;
                gameOver=true;
         game = null;
        
        $("#game2").css("display", "none");
       

       
        setTimeout(() => game3(), 500);
      }}

      if (rightPressed && paddleX < canvas.width - paddleWidth) {
        paddleX += 7;
      } else if (leftPressed && paddleX > 0) {
        paddleX -= 7;
      }
      if(twoball==true){
      x2+=dx2;
      y2+=dy2;}
      x += dx;
      y += dy;
      requestAnimationFrame(draw);
    }
}
/*=================================================== GAME 3 ==================================================*/
/*=================================================== GAME 3 ==================================================*/
/*=================================================== GAME 3 ==================================================*/
/*=================================================== GAME 3 ==================================================*/
/*=================================================== GAME 3 ==================================================*/


function for_game3() {
  bgm.muted=true;
  var game3alam = $("#game3_alam");
  game3alam.fadeIn(2000);
  var gameset = $("#game3_left");
  gameset.css("display", "none");
  var game3alamButton = $("#game3_alam button");
  game3alamButton.click(function () {
    $("table").css("dpslay", "block");
    gameset.css("display", "block");
    $(game3_alam).css("display","none");
    startGame();   
    myAudio.play();            //알림창 확인 버튼 -> 시작하게                             
  })

  var game3_life;
  var timeout = 150;
  var timeoutInterval;
  var game3Score = 0;
  var myAudio = new Audio(); // Aduio 객체 생성
  myAudio.src = "img/firstbgm.mp3"; // 음원 파일 설정
  myAudio.volume = 0.5;  
  var myAudio2 = new Audio(); // Aduio 객체 생성
  myAudio2.src = "img/garden.mp3"; // 음원 파일 설정
  myAudio2.volume = 0.5;   


    function startGame() {
    game3Score = 0;
    timeout = 150;
    draw();


    timeoutInterval =
      setInterval(function () {
        coin-=1000;
        $("table").css("display", "block");
        $("#game3_right").css("backgroundImage", "url('img/sky.png')");
        $("#game3_timeout").text('남은 골드: ' + coin/1000 + '$');
        $("#game3_timeout").css("display", "block");
      }, 2000)};



    // var canvas = document.getElementById('myCanvas');

    var canvas = document.getElementById('game3_canvas');
    canvas.width = 560; // Set the width of the canvas
    canvas.height = 700; // Set the height of the canvas
    var ctx = canvas.getContext('2d');
    var x = canvas.width/2;
    var y = canvas.height-30;
    var dx = 3 ; //수정
    var dy = -6; //수정
    var ballRadius = 10;
    var paddleHeight = 10;
    var paddleWidth = 200; //수정
    var paddleX = (canvas.width-paddleWidth)/2;
    var rightPressed = false;
    var leftPressed = false;
    var brickRowCount = 9;
    var brickColumnCount = 9;
    var brickPadding = 0;
    var brickWidth = 63;
    var brickHeight = 32;
    var brickOffsetTop = 30;
    var brickOffsetLeft = 0;
    var score = 0;
    var gamestate = false;
    var bricks = [];
    for(var c=0; c<brickColumnCount; c++) {
        bricks[c] = [];
        
        for(var r=0; r<brickRowCount; r++) {
            var value;
            if (c >= 0 && c <= 2) {
              value = 0;
            } else if (c >= 3 && c <= 5) {
              value = 1;
            } else if (c >= 6 && c <= 8) {
              value = 2;
            }
            bricks[c][r] = { x: 0, y: 0, status: 1 , value:value};
        }
    }

    
    document.addEventListener('keydown', keyDownHandler, false);
    document.addEventListener('keyup', keyUpHandler, false);

    document.addEventListener("mousemove", mouseMoveHandler, false);//이벤트 등록 마우스 움직임

     function mouseMoveHandler(e) {
      var relativeX = e.clientX - canvas.offsetLeft; //마우스위치를 설정
      if (relativeX > 0 && relativeX < canvas.width) {
        paddleX = relativeX - paddleWidth / 2; //패달x 좌표를 마우스 위치로 설정(마우스가 패달의 정중앙에 았는 것 처럼)
      }
    }
    function keyDownHandler(e) {
        if(e.keyCode == 39) {
            rightPressed = true;
        }
        else if(e.keyCode == 37) {
            leftPressed = true;
        }
    }

    function keyUpHandler(e) {
        if(e.keyCode == 39) {
            rightPressed = false;
        }
        else if(e.keyCode == 37) {
            leftPressed = false;
        }
    }
var sound=new Audio("img/sound.mp3");
   function playSound() {
  
  try {
    sound.pause(); // 사운드 일시 정지
    sound.currentTime = 0; // 재생 시간을 초기화하여 사운드를 처음부터 재생
    sound.play();
  } catch (error) {
    console.error("사운드 재생 중 오류가 발생했습니다:", error);
  }
 
}


function collisionDetection() {
  for (var c = 0; c < brickColumnCount; c++) {
    for (var r = 0; r < brickRowCount; r++) {
      var b = bricks[c][r];
      if (b.status === 1 && x >= b.x && x <= b.x + brickWidth && y >= b.y && y <= b.y + brickHeight) {
        playSound() ;
        dy = -dy;
        b.status = 0;
        if (b.value === 1) {
          score += 2;
        } else if (b.value === 0 || b.value ===2) {
          score += 1;
        }
        if (score % 2 == 0) {
          bingo();
        }
      }
    }
  }
}
  

var photoArray = [
  "img/1-1.jpg",
  "img/1-2.jpg",
  "img/1-3.jpg",
  "img/1-4.jpg",
  "img/1-5.jpg",
  "img/2-1.jpg",
  "img/2-2.jpg",
  "img/2-3.jpg",
  "img/2-4.jpg",
  "img/2-5.jpg",
  "img/3-1.jpg",
  "img/3-2.jpg",
  "img/3-3.jpg",
  "img/3-4.jpg",
  "img/3-5.jpg",
  "img/4-1.jpg",
  // Add more photo URLs here
];

var tdArray = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "11",
  "12",
  "13",
  "14",
  "15",
  "16",    
];
var bingoCount = 0;

function bingo() {

  var randomIndex = Math.floor(Math.random() * (tdArray.length - 1));
  var tdElement = document.getElementById(tdArray[randomIndex]);
  var number = Math.floor(Math.random() * photoArray.length);
  tdElement.style.backgroundImage = "url(" + photoArray[number] + ")";
  photoArray.splice(number, 1);
  tdArray.splice(randomIndex, 1);
  bingoCount = 0;  
  bingoCheck();
  // if(bingoCount >=1){
  //     var myAudio3 = new Audio(); // 
  //     myAudio3.src = "img/bingosound.mp4"; // 
  //     myAudio3.volume = 1;
  //     myAudio3.play();
  // }
  $("#game3_life").text("현재 빙고 수 : " + bingoCount + " Bingo");
};

var bingoCount = 0;
var bingoCompleted = false;

function bingoCheck() {
  // Check rows
  for (var i = 1; i <= 4; i++) {
    var rowComplete = true;
    for (var j = 1; j <= 4; j++) {
      var tdElement = document.getElementById(j + (i - 1) * 4);
      if (!tdElement.style.backgroundImage) {
        rowComplete = false;
        break;
      }
    }
    if (rowComplete) {
      bingoCount++;
    }
  }

  // Check columns
  for (var i = 1; i <= 4; i++) {
    var colComplete = true;
    for (var j = 1; j <= 4; j++) {
      var tdElement = document.getElementById((j - 1) * 4 + i);
      if (!tdElement.style.backgroundImage) {
        colComplete = false;
        break;
      }
    }
    if (colComplete) {
      bingoCount++;
    }
  }

  // Check diagonals
  var diagonal1Complete = true;
  var diagonal2Complete = true;
  for (var i = 1; i <= 4; i++) {
    var tdElement1 = document.getElementById(i * 4 - (i - 1));
    var tdElement2 = document.getElementById(i * 5 - 4);
    if (!tdElement1.style.backgroundImage) {
      diagonal1Complete = false;
    }
    if (!tdElement2.style.backgroundImage) {
      diagonal2Complete = false;
    }
  }
  if (diagonal1Complete) {
      bingoCount++;    
  }
  if (diagonal2Complete) {
      bingoCount++;    
  }
}

    function drawBall() {
        ctx.beginPath();
        ctx.arc(x, y, ballRadius, 0, Math.PI*2);

        if(score >=20) {
        $("#game3_left").css("backgroundImage", "url(img/background.png)").fadeIn(1000);
        myAudio.muted = true;
        myAudio2.play();
        ctx.fillStyle = '#F08080';}
        else{
          ctx.fillStyle = '#00FFFF';
        }
        ctx.fill();
        ctx.closePath();
    }

    function drawPaddle() {
        ctx.beginPath();
        ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
        ctx.fillStyle = '#E6E6FA';
        ctx.fill();
        ctx.closePath();
    }

function drawBricks() {
  for (var c = 0; c < brickColumnCount; c++) {
    for (var r = 0; r < brickRowCount; r++) {
      if (bricks[c][r].status == 1) {
        var brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft;
        var brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop;
        if (bricks[c][r].value == 0) {
          bricks[c][r].x = brickX;
          bricks[c][r].y = brickY;
          ctx.fillStyle = "blue";
          ctx.fillRect(brickX, brickY, brickWidth, brickHeight);
          ctx.strokeStyle = "white";
          ctx.strokeRect(brickX, brickY, brickWidth, brickHeight);
        }
        if (bricks[c][r].value == 1) {
          bricks[c][r].x = brickX;
          bricks[c][r].y = brickY;
          ctx.fillStyle = "white";
          ctx.fillRect(brickX, brickY, brickWidth, brickHeight);
          ctx.strokeStyle = "white";
          ctx.strokeRect(brickX, brickY, brickWidth, brickHeight);
        }
        if (bricks[c][r].value == 2) {
          bricks[c][r].x = brickX;
          bricks[c][r].y = brickY;
          ctx.fillStyle = "red";
          ctx.fillRect(brickX, brickY, brickWidth, brickHeight);
          ctx.strokeStyle = "white";
          ctx.strokeRect(brickX, brickY, brickWidth, brickHeight);
        }
      }
    }
  }
}


    function drawScore() {
        ctx.font = '16px Arial';
        ctx.fillStyle = 'black';
        ctx.fillText('Score: '+score, 8, 20);
    }

     function draw() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            drawBall();
            drawPaddle();
            drawScore();
            drawBricks();
            collisionDetection();

            if(x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
                dx = -dx;
            }

            if(y + dy < ballRadius) {
                dy = -dy;
            } else if(y + dy > canvas.height-ballRadius) {
                if(x > paddleX-ballRadius && x < paddleX + paddleWidth+ballRadius) {
                    playSound(); 
                    dy = -dy;
                    // dx = (x-(paddleX + paddleWidth/2)) / (paddleWidth/2) * 2 + dx;
                } else {
                    gamestate = true;
                    dy=0;
                    dx=0;
                }
            }

        if(rightPressed && paddleX < canvas.width - paddleWidth) {
            paddleX += 10;
        }
        else if(leftPressed && paddleX > 0) {
            paddleX -= 10;
        }

        x += dx;
        y += dy;
        if(gamestate == true||coin==0){
                    clearInterval(timeoutInterval);
                    $(".container").css("display", "none");
                  // Add the "focus" class to the element

                  // Remove the "focus" class after 2 seconds
                  cancelAnimationFrame(draw);
                  $("#game3_fall").fadeIn(1000);
                  $("#game3_fall img").fadeIn(1000);   
                }

            if(bingoCount >= 3){ 
                  dx=0;
                  dy=0;
                  clearInterval(timeoutInterval);
                  $(".container").css("display", "none");   
                  gamestate = false;
                  // Add the "focus" class to the element
                  // Remove the "focus" class after 2 seconds
                  cancelAnimationFrame(draw);
                  $("#game3_clear").css("display", "block");
                  $("#game3_clear img").fadeIn(1000);
                  myAudio2.volume = 0;  
                  setTimeout(function () {
                    var video = document.getElementById("video");
                    $("#video").css("display", "block");
                    video.play();
                    video.requestFullscreen();
                  }, 1000);
                  video54.play();
                }
                requestAnimationFrame(draw);
            }

    // function reloadgame(){
    //  x = canvas.width/2;
    //  y = canvas.height-30;
    //  dx = 5 ; //수정
    //  dy = -10; //수정
    //  ballRadius = 10;
    //  paddleHeight = 10;
    //  paddleWidth = 200; //수정
    //  paddleX = (canvas.width-paddleWidth)/2;
    //  rightPressed = false;
    //  leftPressed = false;
    //  brickRowCount = 9;
    //  brickColumnCount = 9;
    //  brickPadding = 0;
    //  brickWidth =60;
    //  brickHeight = 32;
    //  brickOffsetTop = 30;
    //  brickOffsetLeft = 24;
    //  score = 0;
    //  bricks = [];
    // for(var c=0; c<brickColumnCount; c++) {
    //     bricks[c] = [];
        
    //     for(var r=0; r<brickRowCount; r++) {
    //         var value;
    //         if (c >= 0 && c <= 2) {
    //           value = 0;
    //         } else if (c >= 3 && c <= 5) {
    //           value = 1;
    //         } else if (c >= 6 && c <= 8) {
    //           value = 2;
    //         }
    //         bricks[c][r] = { x: 0, y: 0, status: 1 , value:value};
    //     }
    // }
    //   setTimeout(() => startGame(), 3800);
    // }
  }