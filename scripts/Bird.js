const birdDom = document.querySelector('.bird');
const birdStyles = getComputedStyle(birdDom);
const birdWidth = parseFloat(birdStyles.width);
const birdHeihgt = parseFloat(birdStyles.height);
const birdTop = parseFloat(birdStyles.top);
const birdLeft = parseFloat(birdStyles.left);
const gameDom = document.querySelector('.game');
const gameHeight = gameDom.clientHeight;

class Bird extends Rectangle {
    constructor() {
        super(birdWidth, birdHeihgt, birdLeft, birdTop, 0, 0, birdDom);
        // 向下的加速度，单位：像素/秒²
        this.g = 1000;
        // 最大的Y坐标
        this.maxY = gameHeight - landHeihgt - this.height;
        // 小鸟的翅膀状态
        this.swingStatus = 1;
        // 翅膀扇动的计时器
        this.timer = null;
        this.render();
    }

    render() {
        super.render();
        this.dom.className = `bird swing${this.swingStatus}`;
    }

    startSwing() {
        if (this.timer) {
            return;
        }
        this.timer = setInterval(() => {
            this.swingStatus = (this.swingStatus + 1) % 3 + 1;
            this.render();
        }, 200);
    }

    stopSwing() {
        clearInterval(this.timer);
        this.timer = null;
    }

    move(duration) {
        super.move(duration);
        // 根据加速度，改变速度
        this.ySpeed = this.g * duration + this.ySpeed;
    }

    onMove() {
        if (this.top < 0) {
            this.top = 0;
        } else if (this.top > this.maxY) {
            this.top = this.maxY;
        }
    }

    // 向上跳，直接给一个向上的速度
    jump() {
        this.ySpeed = -350;
    }
}