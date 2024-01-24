class Timer {
  private startTime: number;
  private elapsedTime: number;
  private timerInterval: number | null;

  constructor() {
    this.startTime = 0;
    this.elapsedTime = 0;
    this.timerInterval = null;
  }

  public start() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
    this.startTime = Date.now() - this.elapsedTime;
    this.timerInterval = setInterval(() => {
      this.elapsedTime = Date.now() - this.startTime;
    }, 1000);
  }

  public stop() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
      this.elapsedTime = Date.now() - this.startTime;
    }
  }

  public reset() {
    this.stop();
    this.elapsedTime = 0;
  }

  public getTime() {
    let totalSeconds = Math.floor(this.elapsedTime / 1000);
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = totalSeconds % 60;
    return `${minutes.toString()}:${seconds.toString()}`;
  }

  public drawTimer() {
    const rectPositionX = width / 2;
    const rectPositionY = 65;
    const rectWidth = 200;
    const rectHeight = 70;

    const padding = 3;
    const textX = rectPositionX;
    const textY = rectPositionY - padding;

    push();
    fill("#5A7885");
    drawingContext.shadowOffsetX = 5;
    drawingContext.shadowOffsetY = 10;
    drawingContext.shadowBlur = 10;
    drawingContext.shadowColor = "black";
    rectMode(CENTER);
    rect(rectPositionX, rectPositionY, rectWidth, rectHeight, 10);
    pop();

    fill("white");
    textSize(40);
    textAlign(CENTER, CENTER);
    text(this.getTime(), textX, textY);
  }
}
