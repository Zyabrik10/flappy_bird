const canvas = document.querySelector('canvas'),
    ctx = canvas.getContext('2d');

function startGame() {
    const flappyBird = new Image();
    const ground = new Image();
    const ground2 = new Image();
    const pipeBottom = new Image();
    const pipeTop = new Image();
    const background = new Image();
    const background2 = new Image();

    flappyBird.src = "img/flap.png";
    ground.src = "img/ground.png";
    ground2.src = "img/ground.png";
    pipeTop.src = "img/tubeTop.png";
    pipeBottom.src = "img/tubeBottom.png";
    background.src = "img/background.png";
    background2.src = "img/background.png";

    const gap = 200;

    const pipeTopNumberRealHeight = 190;

    var sec = 0;
    var score = 0;

    ctx.font = "25px Arial";

    var hasAScore = true;

    var pipeTopHeight = Math.floor(Math.random() * pipeTopNumberRealHeight * -1);
    var pipeBottomHeight = canvas.height - ((pipeTopHeight * -1) + gap);

    var xBird = 10;
    var yBird = 150;

    var xPipe = canvas.width;

    var xGround1 = 0;
    var xGround2 = canvas.width;

    var xBackground1 = 0;
    var xBackground2 = canvas.width;

    function sound(sound) {
        var audio = new Audio();
        audio.src = sound;
        audio.autoplay = true;
    }

    function draw() {
        ctx.drawImage(background, xBackground1, 0);
        ctx.drawImage(background2, xBackground2, 0);
        ctx.drawImage(flappyBird, xBird, yBird);
        ctx.drawImage(pipeTop, xPipe, pipeTopHeight);
        ctx.drawImage(pipeBottom, xPipe, pipeBottomHeight);
        ctx.drawImage(ground, xGround1, canvas.height - ground.height);
        ctx.drawImage(ground2, xGround2, canvas.height - ground.height);
        ctx.strokeText(`score: ${score}`, 10, 50);
    }

    background.onload = () => {
        draw();
        $(document).on("keydown", flyUp);

        function speed(num) {
            return num * 10;
        }

        function flyUp() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            yBird -= speed(4);
            draw();
            sound("sounds/sfx_wing.wav");
        }
        var game = setInterval(() => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            if (yBird + flappyBird.height >= canvas.height - ground.height || yBird < 0 || yBird - flappyBird.height <= pipeTopHeight + pipeTopNumberRealHeight && xBird + flappyBird.width >= xPipe || yBird + flappyBird.height >= pipeBottomHeight && xBird + flappyBird.width >= xPipe) {
                $(document).off("keydown", flyUp);
                sound("sounds/sfx_hit.wav");
                clearInterval(game);
                setTimeout(() => { startGame(); alert("lose"); }, 500);
            }
            if (xGround1 + ground.width < 0) {
                xGround1 = canvas.width;
            }
            if (xGround2 + ground.width < 0) {
                xGround2 = canvas.width;
            }
            if (xBackground1 + background.width < 0) {
                xBackground1 = canvas.width;
            }
            if (xBackground2 + background.width < 0) {
                xBackground2 = canvas.width;
            }
            if (xPipe < 0 - pipeTop.width) {
                xPipe = canvas.width;
                pipeTopHeight = Math.floor(Math.random() * 242 * -1);
                pipeBottomHeight = canvas.height - ((pipeTopHeight * -1) + gap);
            }
            if (xBird > xPipe + pipeTop.width) {
                sec++;
            }
            if (xBird > xPipe + pipeTop.width && sec == 10) {
                sec = 0;
                score += 1;
                sound("sounds/sfx_point.wav");

            }
            draw();
            yBird++;
            xPipe--;
            xGround1--;
            xGround2--;
            xBackground1 -= 0.2;
            xBackground2 -= 0.2;
        }, 10);

    }

}

startGame();