class Timer {
  private startTime: number;
  private elapsedTime: number;
  private timerInterval: number | null;

  constructor() {
    this.startTime = 0;
    this.elapsedTime = 0;
    this.timerInterval = null;
  }

  start() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
    this.startTime = Date.now() - this.elapsedTime;
    this.timerInterval = setInterval(() => {
      this.elapsedTime = Date.now() - this.startTime;
    }, 1000);
  }

  stop() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
      this.elapsedTime = Date.now() - this.startTime;
    }
  }

  reset() {
    this.stop();
    this.elapsedTime = 0;
  }

  getTime() {
    let totalSeconds = Math.floor(this.elapsedTime / 1000);
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = totalSeconds % 60;
    return `${minutes.toString()}:${seconds.toString()}`;
  }

  public drawTimer() {
    const rectPositionX = width / 2;
    const rectPositionY = 80;
    const rectWidth = 200;
    const rectHeight = 70;

    const padding = 2;
    const textX = rectPositionX;
    const textY = rectPositionY + padding;

    push();
    fill(0);
    strokeWeight(4);
    stroke("#B3D917");
    rectMode(CENTER);
    rect(rectPositionX, rectPositionY, rectWidth, rectHeight, 10);
    pop();

    fill("#B3D917");
    textSize(20);
    textAlign(CENTER, CENTER);
    //textFont("Minecraft");
    text(this.getTime(), textX, textY);
  }
}
