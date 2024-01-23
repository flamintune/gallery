// InfiniteScrollingBackground.ts
export class InfiniteScrollingBackground {
    private readonly canvas: HTMLCanvasElement;
    private readonly ctx: CanvasRenderingContext2D;
    private readonly image: HTMLImageElement;
    private imageWidth: number;
    private imageHeight: number;
    private speed: number = 0.5; // 控制滚动速度，可根据需要调整
  
    constructor(canvasId: string, imagePath: string) {
      this.canvas = document.getElementById(canvasId) as HTMLCanvasElement;
      this.ctx = this.canvas.getContext('2d')!;
      this.image = new Image();
      this.image.src = imagePath;
  
      this.image.onload = () => {
        this.imageWidth = this.image.width;
        this.imageHeight = this.image.height;
        this.updateCanvasSize();
        this.updateScroll();
      };
  
      // 更新画布大小
      window.addEventListener('resize', this.updateCanvasSize.bind(this));
      window.addEventListener('scroll', this.updateScroll.bind(this));
    }
  
    private updateCanvasSize() {
      // 设置画布大小与视窗相匹配
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
    }
  
    private updateScroll() {
      // 计算基于滚动的水平位置
      const scrolledPixels = window.scrollX * this.speed;
      const imageX = scrolledPixels % this.imageWidth;
      this.draw(imageX);
    }
  
    private draw(imageX: number) {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  
      // 计算需要绘制的图片数量
      const imagesToFit = Math.ceil(this.canvas.width / this.imageWidth) + 1;
  
      // 绘制图片，确保它们水平连续
      for (let i = -1; i < imagesToFit; i++) {
        this.ctx.drawImage(
          this.image,
          i * this.imageWidth - imageX,
          (this.canvas.height - this.imageHeight) / 2, // 垂直居中
          this.imageWidth,
          this.imageHeight
        );
      }
    }
  }