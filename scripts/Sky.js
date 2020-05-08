const skyDom = document.querySelector('.sky');
const skyStyles = getComputedStyle(skyDom);
const skyWidth = parseFloat(skyStyles.width);
const skyHeihgt = parseFloat(skyStyles.height);

class Sky extends Rectangle {
    constructor() {
        super(skyWidth, skyHeihgt, 0, 0, -50, 0, skyDom);
    }

    onMove() {
        if (this.left <= -skyWidth / 2)  {
            this.left = 0;
        }
    }
}