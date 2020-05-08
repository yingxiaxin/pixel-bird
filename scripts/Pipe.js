const gameWidth = gameDom.clientWidth;

class Pipe extends Rectangle {
    constructor(height, top, speed, dom) {
        super(52, height, gameWidth, top, speed, 0, dom);
    }

    onMove() {
        if (this.left < -this.width) {
            this.dom.remove();
        }
    }
}

function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

class PipePair {
    constructor(speed) {
        this.spaceHeight = 150;
        this.minHeihgt = 40;
        this.maxHeight = landTop - this.minHeihgt - this.spaceHeight;

        const upHeight = getRandom(this.minHeihgt, this.maxHeight);
        const downHeight = landTop - upHeight - this.spaceHeight;
        const downTop = landTop - downHeight;
        const upDom = document.createElement('div');
        const downDom = document.createElement('div');
        upDom.className = 'pipe up';
        downDom.className = 'pipe down';

        // 上水管
        this.upPipe = new Pipe(upHeight, 0, speed, upDom);
        // 下水管
        this.downPipe = new Pipe(downHeight, downTop, speed, downDom);

        gameDom.appendChild(upDom);
        gameDom.appendChild(downDom);
    }

    // 该柱子对是否已经移出了视野
    get useLess() {
        return this.upPipe.left < -this.upPipe.width;
    }

    move(duration) {
        this.upPipe.move(duration);
        this.downPipe.move(duration);
    }
}

class PipePairProducer {
    constructor(speed) {
        this.pairs = [];
        this.timer = null;
        this.tick = 2500;
        this.speed = speed;
    }

    startProduce() {
        if (this.timer) {
            return;
        }
        this.timer = setInterval(() => {
            this.pairs.push(new PipePair(this.speed));
            // 移除掉用不到的柱子
            for (let i = 0; i < this.pairs.length; i++) {
                const pair = this.pairs[i];
                if (pair.useLess) {
                    this.pairs.splice(i, 1);
                    i--;
                }
            }
        }, this.tick);
    }

    stopProduce() {
        clearInterval(this.timer);
        this.timer = null;
    }
}