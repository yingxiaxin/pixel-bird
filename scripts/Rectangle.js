/**
 * 矩形类，可以移动
 * 属性：宽度、高度、横坐标、纵坐标、横向速度、纵向速度、对应的dom对象
 * xSpeed: 横向速度，单位(像素/秒)，正数是向右，负数向左
 * ySpeed: 横向速度，单位(像素/秒)，正数是向下，负数向上
 */
class Rectangle {
    constructor(width, height, left, top, xSpeed, ySpeed, dom) {
        this.width = width;
        this.height = height;
        this.left = left;
        this.top = top;
        this.xSpeed = xSpeed;
        this.ySpeed = ySpeed;
        this.dom = dom;
        this.render();
    }

    render() {
        this.dom.style.width = this.width + 'px';
        this.dom.style.height = this.height + 'px';
        this.dom.style.left = this.left + 'px';
        this.dom.style.top = this.top + 'px';
    }

    /**
     * 按照矩形的速度，和指定的时间，移动矩形
     * @param {*} duration 时间，单位秒
     */
    move(duration) {
        const xDis = this.xSpeed * duration;
        const yDis = this.ySpeed * duration;
        this.left = this.left + xDis;
        this.top = this.top + yDis;

        if (this.onMove) {
            // 可能存在onMove，也可能不存在
            this.onMove();
        }

        this.render();
    }
}