class Game {
    constructor(fieldWidth, fieldHeight) {
        this.fieldWidth = fieldWidth;
        this.fieldHeight = fieldHeight;
        this.field = this.createField();
        this.appleExists = false;
        this.applePosition = { x: null, y: null };
        this.snake = [{ x: 0, y: 0 }];
        this.snakeDirection = 'right';
    }
    
    createField() {
        const field = [];
        for (let i = 0; i < this.fieldHeight; i++) {
            const row = [];
            for (let j = 0; j < this.fieldWidth; j++) {
                const cell = { x: j, y: i, snake: false, color: 'white' };
                row.push(cell);
            }
            field.push(row);
        }
        return field;
    }

    apple() {
        if (this.appleExists === false) {
            let x = Math.floor(Math.random() * this.fieldWidth);
            let y = Math.floor(Math.random() * this.fieldHeight);

            while (this.snake.some(segment => segment.x === x && segment.y === y)) {
                x = Math.floor(Math.random() * this.fieldWidth);
                y = Math.floor(Math.random() * this.fieldHeight);
            }

            this.applePosition = { x, y };
            this.field[y][x].color = 'green';
            this.appleExists = true;
        }
    }

    handleAppleEaten() {
        this.growSnake();
        this.apple();
    }

    checkIfAppleEaten() {
        const head = this.snake[0];

        if (head.x === this.applePosition.x && head.y === this.applePosition.y) {
            this.appleExists = false;
            this.handleAppleEaten();
        }
    }

    growSnake() {
        const tail = this.snake[this.snake.length - 1];
        this.snake.push({ x: tail.x, y: tail.y });
    }

    checkSelfCollision() {
        const head = this.snake[0];

        for (let i = 1; i < this.snake.length; i++) {
            if (this.snake[i].x === head.x && this.snake[i].y === head.y) {
                return true;
            }
        }

        return false;
    }

    moveSnake(direction) {
        let newHead = { ...this.snake[0] };

        switch (direction) {
            case 'up':
                newHead.y = (newHead.y - 1 + this.fieldHeight) % this.fieldHeight;
                break;
            case 'down':
                newHead.y = (newHead.y + 1) % this.fieldHeight;
                break;
            case 'left':
                newHead.x = (newHead.x - 1 + this.fieldWidth) % this.fieldWidth;
                break;
            case 'right':
                newHead.x = (newHead.x + 1) % this.fieldWidth;
                break;
        }

        this.snake.unshift(newHead);
        this.snake.pop();

        if (this.checkSelfCollision()) {
            alert("Game Over! You ate yourself!");
            window.location.reload();
        }

        this.updateField();
    }

    updateField() {
        this.field.forEach(row => row.forEach(cell => {
            cell.snake = false;
            cell.color = 'white';
        }));

        this.snake.forEach(segment => {
            this.field[segment.y][segment.x].snake = true;
            this.field[segment.y][segment.x].color = 'red';
        });

        if (this.appleExists) {
            const apple = this.field[this.applePosition.y][this.applePosition.x];
            apple.color = 'green';
        }
    }

    getField() {
        return this.field;
    }
}

export default Game;
