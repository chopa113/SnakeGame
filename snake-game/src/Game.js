class Game {
        constructor(fieldWidth, fieldHeight) {
            this.fieldWidth = fieldWidth;
            this.fieldHeight = fieldHeight;
            this.field = this.createField();
        }
    
        createField() {
            const field = [];
            for (let i = 0; i < this.fieldHeight; i++) {
                const row = [];
                for (let j = 0; j < this.fieldWidth; j++) {
                    const cell = { x: j, y: i, snake: false, color: 'white' };
                    if (i === 0 && j === 0) {
                        cell.snake = true;
                        cell.color = 'red';
                    }
                    row.push(cell);
                }
                field.push(row);
            }
            return field;
        }
    
        moveSnake(direction) {
            const head = this.field.find(row => row.find(cell => cell.snake)).find(cell => cell.snake);
    
            let newHead;
            switch (direction) {
                case 'up':
                    newHead = this.field[head.y - 1]?.[head.x];
                    if (head.y === 0) {
                        newHead = this.field[this.fieldHeight - 1][head.x];
                    }
                    break;
                case 'down':
                    newHead = this.field[head.y + 1]?.[head.x];
                    if (head.y === this.fieldHeight - 1) {
                        newHead = this.field[0][head.x];
                    }
                    break;
                case 'left':
                    newHead = this.field[head.y]?.[head.x - 1];
                    if (head.x === 0) {
                        newHead = this.field[head.y][this.fieldWidth - 1];
                    }
                    break;
                case 'right':
                    newHead = this.field[head.y]?.[head.x + 1];
                    if (head.x === this.fieldWidth - 1) {
                        newHead = this.field[head.y][0];
                    }
                    break;
            }
    
            if (newHead && !newHead.snake) {
                newHead.snake = true;
                newHead.color = 'red';
                head.snake = false;
                head.color = 'white';
            }

        }
    
        getField() {
            return this.field;
        }
    }
    
    export default Game;
