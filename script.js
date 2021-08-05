let canvas = document.querySelector('#snake');
let context = canvas.getContext('2d'); //renderiza o desenho do canvas
let box = 32;
let snake = []
snake[0] = {
    x: 8 * box,
    y: 8 * box
}
let direction ='rigth';
let food = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}

 // o retangulo onde acontece o jogo tem 32 pixels e 16 quadrados de altura e largura

function criarBG() {
    context.fillStyle = 'lightgreen';
    context.fillRect(0, 0, 16 * box, 16 * box);
}

function criaCobrinha() {
    for(i = 0; i <snake.length; i++) {
        context.fillStyle = 'green';
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}

//cria a comida
function drawFood() {
    context.fillStyle = 'red';
    context.fillRect(food.x, food.y, box, box);
}

//captura o evento para movimentar a cobrinha
document.addEventListener('keydown', update);

function update(event) {
    if (event.keyCode == 37 && direction != 'right') direction = 'left';
    if (event.keyCode == 38 && direction != 'down') direction = 'up';
    if (event.keyCode == 39 && direction != 'left') direction = 'right';
    if (event.keyCode == 40 && direction != 'up') direction = 'down';
}

//atualiza o jogo em intervalos e para o processo
function iniciarJogo() {
    if (snake[0].x > 15 * box && direction == 'right') snake[0].x = 0;
    if (snake[0].x < 0 && direction == 'left') snake[0].x = 16 * box;
    if (snake[0].y > 15 * box && direction == 'down') snake[0].y = 0;
    if (snake[0].y < 0 && direction == 'up') snake[0].y = 16 * box;
    
    //interrompe o jogo quando a cabeça choca com o corpo
    for (i = 1; i < snake.length ; i++) {
        if (snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
            clearInterval(jogo);
            alert('FIM DE JOGO... Reinicie a página e jogue novamente! ');
        }
    }

    //chama as funções
    criarBG();
    criaCobrinha();
    drawFood();

    //posição e ponto de partida
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    //coordenadas
    if(direction == 'right') snakeX += box;
    if(direction == 'left') snakeX -= box;
    if(direction == 'up') snakeY -= box;
    if(direction == 'down') snakeY += box;
    
    //cobrinha cresce e comida surge em outro lugar
    if (snakeX != food.x || snakeY != food.y) {
         snake.pop();
    }
    else {
       food.x = Math.floor(Math.random() * 15 + 1) * box;
       food.y = Math.floor(Math.random() * 15 + 1) * box;
    }
   
    let newHead = {
        x: snakeX,
        y: snakeY
    }

    snake.unshift(newHead);
}

let jogo = setInterval(iniciarJogo, 100);