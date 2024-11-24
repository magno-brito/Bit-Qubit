class Sprite {
  constructor({
    position,
    imageSrc,
    frameRate = 1,
    animations,
    frameBuffer = 2,
    loop = true,
    autoplay = true,
    move = true,
    limit_left = 0,
    limit_right = 0,
    eixo = 'x',
    direction = 1,
    opacity = 1,
    extinguir = false,
    extinctionRate = 0.01 
  }) {
    this.position = position;
    this.image = new Image();
    this.image.onload = () => {
      this.loaded = true;
      this.width = this.image.width / this.frameRate;
      this.height = this.image.height;
    };
    this.image.src = imageSrc;
    this.loaded = false;
    this.frameRate = frameRate;
    this.currentFrame = 0;
    this.elapsedFrames = 0;
    this.frameBuffer = frameBuffer;
    this.animations = animations;
    this.loop = loop;
    this.autoplay = autoplay;
    this.move = move;
    this.limit_left = limit_left;
    this.limit_right = limit_right;
    this.direction = 1;
    this.eixo = eixo;
    this.opacity = opacity;
    this.extinguir = extinguir;
    this.extinctionRate = extinctionRate;

    if (this.animations) {
      for (let key in this.animations) {
        const image = new Image();
        image.src = this.animations[key].imageSrc;
        this.animations[key].image = image;
      }
    }
  }

  startExtinguishing() {
    this.extinguir = true;
    
  }

  draw() {
    if (!this.loaded) return;

    // Ajusta a opacidade para a extinção gradual
    c.save();
    c.globalAlpha = this.opacity;

    const cropbox = {
        position: { x: this.width * this.currentFrame, y: 0 },
        width: this.width,
        height: this.height,
    };

    c.drawImage(
        this.image,
        cropbox.position.x,
        cropbox.position.y,
        cropbox.width,
        cropbox.height,
        this.position.x,
        this.position.y,
        this.width,
        this.height
    );

    c.restore();

    this.updateFrames();

    if (this.extinguir) {
        this.opacity -= this.extinctionRate; // Reduz a opacidade
        if (this.opacity <= 0) {
            this.opacity = 0; // Impede que a opacidade fique negativa
            this.extinguir = false; // Para a extinção se a opacidade for zero
        }
    }
}


  play() {
    this.autoplay = true;
  }

  updateFrames() {
    if (!this.autoplay) return;

    this.elapsedFrames++;

    if (this.elapsedFrames % this.frameBuffer === 0) {
      if (this.currentFrame < this.frameRate - 1) this.currentFrame++;
      else if (this.loop) this.currentFrame = 0;
    }

    if (this.currentAnimation?.onComplete) {
      if (
        this.currentFrame === this.frameRate - 1 &&
        !this.currentAnimation.isActive
      ) {
        this.currentAnimation.onComplete();
        this.currentAnimation.isActive = true;
      }
    }
  }
}
