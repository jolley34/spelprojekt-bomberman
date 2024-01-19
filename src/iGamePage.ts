interface IGamePage {
  changePage(page: string, board?: number): void;
  draw(): void;
  update(): void;
}
