// Nyan Cat In the Dark на JavaScript
var cvs = document.getElementById("canvas"); // Холст
var ctx = cvs.getContext("2d"); // Контекст рисования на холсте

var cat = new Image(); // Объект котика
var bg = new Image(); // Объект фон
var fg = new Image(); // Объект земля
var pipeUp = new Image(); // Объект труба сверху
var pipeBottom = new Image(); // Объект труба снизу

cat.src = "img/nyan cat.png"; // Изображение котика
bg.src = "img/bg2.png"; // Изображение фон
fg.src = "img/fg.png"; // Изображение земля
pipeUp.src = "img/pipeUp.png"; // Изображение труба сверху
pipeBottom.src = "img/pipeBottom.png"; // Изображение труба снизу

var gap = 90; // Просвет между трубами

document.addEventListener("keydown", moveUp); // Вызов функции moveUp при нажатии клавиши

function moveUp() {
    yPos -= 30; // Подняться вверх на 30 пунктов
}

// Массив труб
var pipe = [];
pipe[0] = {
    x : cvs.width, // Позиционируем трубу по координате X
    y : 0 // // Позиционируем трубу по координате Y
}

var score = 0; // Счёт
var xPos = 100; // Позиция котика по X
var yPos = 150; // Позиция котика по Y
var grav = 0.8; // Гравитация

// Функция отрисовки
function draw() { 
    ctx.drawImage(bg, 0, 0); // Отрисовка фона
    for (var i = 0; i < pipe.length; i++) { // Цикл отрисовки труб
        // ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y); // Отрисовка верхней трубы
        let num = 10
        ctx.drawImage(pipeBottom, pipe[i].x, pipe[i].y + pipeUp.height + gap); // Отрисовка нижней трубы
        pipe[i].x -= num; // Движение труб на котика и скорость движения
        
        if (pipe[i].x == 5) { // Добавление новых труб при выполнении условия
            pipe.push({
                x : cvs.width,
                y : Math.floor(Math.random() * pipeUp.height) - pipeUp.height
            });
        }

        // Отслеживание прикосновений к трубам
        if (xPos + cat.width >= pipe[i].x && xPos <= pipe[i].x + pipeUp.width
            &&
            (yPos + cat.height >= pipe[i].y + pipeUp.height + gap)
            || yPos + cat.height >= cvs.height - fg.height || yPos <= 0) {
                location.reload(); // Перезагрузка страницы при прикосновении
            }
    
            if (pipe[i].x == 5) { // Добавляем 1 к счёту при пролёте трубы
                score++;
            }
        }

    ctx.drawImage(fg, 0, cvs.height - fg.height); // Отрисовка земли
    ctx.drawImage(cat, xPos, yPos); // Отрисовка птички
    
    yPos += grav; // Под воздействием гравитации птичка падает вниз

    ctx.fillStyle = "#000"; // Цвет текста
    ctx.font = "24px Verdana"; // Шрифт текста
    ctx.fillText("Счет: " + score, 10, cvs.height - 20); // Счёт (позиционирование)

    requestAnimationFrame(draw); // Запрашиваем кадр анимации
}


pipeBottom.onload = draw; // Вызываем функцию draw после отрисовки нижней трубы