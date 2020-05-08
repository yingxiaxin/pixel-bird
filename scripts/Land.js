const landDom = document.querySelector('.land');
const landStyles = getComputedStyle(landDom);
const landWidth = parseFloat(landStyles.width);
const landHeihgt = parseFloat(landStyles.height);
const landTop = parseFloat(landStyles.top);

class Land extends Rectangle {
    constructor(speed) {
        super(landWidth, landHeihgt, 0, landTop, speed, 0, landDom);
    }

    onMove() {
        if (this.left <= -landWidth / 2)  {
            this.left = 0;
        }
    }
}