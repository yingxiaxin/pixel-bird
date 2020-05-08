class Game {
    constructor() {
        this.sky = new Sky();
        this.land = new Land(-100);
        this.bird = new Bird();
        this.pipeProducer = new PipePairProducer(-100);
        this.timer = null;
        this.tick = 16;
        this.gameOver = false;
    }

    start() {
        if (this.timer) {
            return;
        }
        if (this.gameOver) {
            window.location.reload();
        }
        this.pipeProducer.startProduce();
        this.bird.startSwing();
        this.timer = setInterval(() => {
            const duration = this.tick / 1000;
            this.sky.move(duration);
            this.land.move(duration);
            this.bird.move(duration);
            this.pipeProducer.pairs.forEach(pair => {
                pair.move(duration);
            });
            if (this.isGameOver()) {
                this.stop();
                this.gameOver = true;
            }
        }, this.tick);
    }

    /**
     * 判断两个矩形是否碰撞
     * @param {*} rect1 
     * @param {*} rect2 
     */
    isHit(rect1, rect2) {
        // 横向：两个矩形的中心点的横向距离，是否小于矩形宽度之和的一半
        // 纵向：两个矩形的中心点的纵向距离，是否小于矩形高度之和的一半
        let centerX1 = rect1.left + rect1.width / 2;
        let centerY1 = rect1.top + rect1.height / 2;
        let centerX2 = rect2.left + rect2.width / 2;
        let centerY2 = rect2.top + rect2.height / 2;
        let disX = Math.abs(centerX1 - centerX2);
        let disY = Math.abs(centerY1 - centerY2);
        if (disX < (rect1.width + rect2.width) / 2 &&
        disY < (rect1.height + rect2.height) / 2) {
            return true;
        }
        return false;
    }

    isGameOver() {
        // 鸟碰到地
        if (this.bird.top === this.bird.maxY) {
            return true;
        }
        // 鸟碰到柱子
        for (let i = 0; i < this.pipeProducer.pairs.length; i++) {
            const pair = this.pipeProducer.pairs[i];
            if (this.isHit(this.bird, pair.upPipe) || this.isHit(this.bird, pair.downPipe)) {
                return true;
            }
        }
        return false;
    }

    stop() {
        clearInterval(this.timer);
        this.timer = null;
        this.bird.stopSwing();
        this.pipeProducer.stopProduce();
    }

    regEvent() {
        window.onkeydown = (e) => {
            if (e.key === 'Enter') {
                if (this.timer) {
                    this.stop();
                } else {
                    this.start();
                }
            } else if (e.key === ' ') {
                this.bird.jump();
            }
        }
    }
}

var g = new Game();
g.regEvent();