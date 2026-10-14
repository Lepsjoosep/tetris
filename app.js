var canvas = document.getElementById('game');
var context = canvas.getContext('2d');

var grid = 10;
var count = 0;
var paused = false;
var lost = false;

var snake = {
    x: 100,
    y: 100,
    dx: grid,
    dy: 0,
    cells: [],
    maxCells: 4
};

var apple = {
    x: 320,
    y: 320
};

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function loop() {
    requestAnimationFrame(loop);

    if (paused) {                          
        context.fillStyle = 'white';
        context.font = '20px sans-serif';
        context.fillText('Paused', canvas.width / 2 - 30, canvas.height / 2);
        return;
    }

    if (lost) {
        context.fillStyle = 'white';
        context.font = '20px sans-serif';
        context.fillText('You Lost :(', canvas.width / 2 -30, canvas.height/ 2);
        return;
    }
    if (++count < 4) {
        return;
    }

    count = 0;
    context.clearRect(0, 0, canvas.width, canvas.height);

    snake.x += snake.dx;
    snake.y += snake.dy;

    if (snake.x < 0) {
        snake.x = canvas.width - grid;
    } else if (snake.x >= canvas.width) {
        snake.x = 0;
    }

    if (snake.y < 0) {
        snake.y = canvas.height - grid;
    } else if (snake.y >= canvas.height) {
        snake.y = 0;
    }

    snake.cells.unshift({x: snake.x, y: snake.y});

    if (snake.cells.length > snake.maxCells) {
        snake.cells.pop();
    }

    context.fillStyle = 'red';
    context.fillRect(apple.x, apple.y, grid - 1, grid - 1);

    context.fillStyle = 'green';
    snake.cells.forEach(function(cell, index) {

        context.fillRect(cell.x, cell.y, grid - 1, grid - 1);

        if (cell.x === apple.x && cell.y === apple.y) {
            snake.maxCells++;

            apple.x = getRandomInt(0, 10) * grid;
            apple.y = getRandomInt(0, 10) * grid;
        }

        for (var i = index + 1; i < snake.cells.length; i++) {
            if (cell.x === snake.cells[i].x && cell.y === snake.cells[i].y) {
                snake.x = 100;
                snake.y = 100;
                snake.cells = [];
                snake.maxCells = 4;
                snake.dx = grid;
                snake.dy = 0;

                apple.x = getRandomInt(0, 10) * grid;
                apple.y = getRandomInt(0, 10) * grid;
            }
        }
    });
}

document.addEventListener('keydown', function(e) {
    if (e.which === 32) {
        e.preventDefault();
        paused = !paused;
        return;
    }
    if (paused) return;
    if (e.which === 37 && snake.dx === 0) {
        snake.dx = -grid;
        snake.dy = 0;
    } else if (e.which === 38 && snake.dy === 0) {
        snake.dy = -grid;
        snake.dx = 0;
    } else if (e.which === 39 && snake.dx === 0) {
        snake.dx = grid;
        snake.dy = 0;
    } else if (e.which === 40 && snake.dy === 0) {
        snake.dy = grid;
        snake.dx = 0;
    }
});


requestAnimationFrame(loop);