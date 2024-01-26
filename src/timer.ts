class Timer {
  private startTime: number;
  private elapsedTime: number;
  private timerInterval: number | null;

  constructor() {
    this.startTime = 0;
    // todo: set the time back to 5 min (30000) after testing
    this.elapsedTime = 30000; // sätter tiden till 5 min
    this.timerInterval = null;
  }

  public start() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }

    this.startTime = Date.now();
    this.timerInterval = setInterval(() => {
      const currentTime = Date.now();
      const elapsedMilliseconds = currentTime - this.startTime;
      // todo: set the time back to 5 min (30000) after testing
      this.elapsedTime = Math.max(30000 - elapsedMilliseconds, 0);

      // stannar tiden efter 5 min
      // lägg till logik som visar endgame med resultat efter tiden tar slut
      if (this.elapsedTime === 0) {
        this.stop();
      }
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
    // todo: set the time back to 5 min
    this.elapsedTime = 30000;
  }

  public getTime() {
    let totalSeconds = Math.floor(this.elapsedTime / 1000);
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = totalSeconds % 60;
    const padZero = (num: number) => (num < 10 ? `0${num}` : `${num}`);

    return `${padZero(minutes)}:${padZero(seconds)}`;
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
