class CollisionBlock {
  constructor({ position, movable = false, image }) {
    this.position = position;
    this.width = 64;
    this.height = 64;
    this.movable = movable;
    this.direction = 1;  
    this.limit_left = this.position.x - 100;  
    this.limit_right = this.position.x + 100;  
    this.image = image
  }

  update() {
    if (this.movable) {
      this.position.x += this.direction * 2;  
  
      if (this.position.x > this.limit_right + 100 || this.position.x < this.limit_left - 100) {
        this.direction *= -1;  
      }
    }
  }
  
  
}
