export abstract class Worker {
  /**
   *
   * @param frequency - worker trigger frequency, leave null if listener. Unit:milliseconds
   */
  constructor(private readonly frequency?: number) {}
  private async sleep(time: number) {
    return new Promise(resolve => setTimeout(resolve, time));
  }

  abstract async job();

  async run() {
    if (!this.frequency) {
      this.job();
    } else {
      while (true) {
        await this.job();
        await this.sleep(this.frequency);
      }
    }
  }
}
