const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1024 
canvas.height = 576 

const backgroundImageWidth = 1024;  
const backgroundImageHeight = 576; 

let parsedCollisions
let collisionBlocks
let background
let doors
let computers
let fires
let fireSpeed = 2; 


const player = new Player({
  imageSrc: './img/cat/catRight.png',
  frameRate: 12,
  animations: {
    idleRight: {
      frameRate: 12,
      frameBuffer: 1,
      loop: false,
      imageSrc: './img/cat/catRight.png',
    },
  
    idleLeft: {
      frameRate: 12,
      frameBuffer: 1,
      loop: false,
      imageSrc: './img/cat/catLeft.png',
    },
    runRight: {
      frameRate: 12,
      frameBuffer: 1,
      loop: true,
      imageSrc: './img/cat/catRight.png',
    },
    runLeft: {
      frameRate: 12,
      frameBuffer: 1,
      loop: true,
      imageSrc: './img/cat/catLeft.png',
    },
    enterDoor: {
      frameRate: 6,
      frameBuffer: 6,
      loop: true,
      imageSrc: './img/cat/enterDoor1.png',
      position: {
        x: 176.0, // Ajuste conforme necessário
        y: 410,   // Ajuste conforme necessário
      },
      onComplete: () => {
        gsap.to(overlay, {
          opacity: 1,
          onComplete: () => {
            level++;
            if (level === 18) level = 1;
            levels[level].init();
            player.switchSprite('idleRight');
            player.preventInput = false;
            gsap.to(overlay, { opacity: 0 });
          },
        });
      },
    },
  },
})

let level = 17

let levels = {
  1: {
    init: () => {
      parsedCollisions = collisionsLevel1.parse2D()
      collisionBlocks = parsedCollisions.createObjectsFrom2D()
      //Teste

      player.collisionBlocks = collisionBlocks
      player.position.x = 96
      player.position.y = 140
      if (player.currentAnimation) player.currentAnimation.isActive = false

      background = new Sprite({
        position: {
          x: (canvas.width - backgroundImageWidth) / 2,  
          y: (canvas.height - backgroundImageHeight) / 2,  
 
        },
        imageSrc: './img/pagina/1.png',
      })

      doors = [
        new Sprite({
          position: {
            x: 870,
            y: 438,
          },
          imageSrc: './img/doors/doorTest1.png',
          frameRate: 6,
          frameBuffer: 6,
          loop: false,
          autoplay: false,
        }),
      ]

      computers = [
        new Sprite({
          position: {
            x: 100,
            y: 445,
          },
          imageSrc: './img/pagina/computer1.png',
          frameRate: 1,
          frameBuffer: 1,
          loop: false,
          autoplay: false,
        }),
      ]

      energies = [
        
      ]

      fires = [
       
        new Sprite({
          position: {
            x: 450,
            y: 420,
          },
          imageSrc: './img/pagina/fire3.png',
          frameRate: 8,
          frameBuffer: 9,
          loop: true,
          autoplay: true,
          move: false,
          opacity: 1
        }),

      ]

      apagador = [
     
      ]

      lightnings = [

      ]

      movableBlocks = []
    },
  },
  2: {
    init: () => {
      parsedCollisions = collisionsLevel2.parse2D()
      collisionBlocks = parsedCollisions.createObjectsFrom2D()
      player.collisionBlocks = collisionBlocks
      player.position.x = 96
      player.position.y = 140

      if (player.currentAnimation) player.currentAnimation.isActive = false

      background = new Sprite({
        position: {
          x: (canvas.width - backgroundImageWidth) / 2,  
          y: (canvas.height - backgroundImageHeight) / 2,  
 
        },
        imageSrc: './img/pagina/2.png',
      })

      doors = [
        new Sprite({
          position: {
            x: 60.0,
            y: 430,
          },
          imageSrc: './img/doors/doorTest2.png',
          frameRate: 6,
          frameBuffer: 6,
          loop: false,
          autoplay: false,
        }),
      ]

      computers = [
        new Sprite({
          position: {
            x: 870,
            y: 65,
          },
          imageSrc: './img/pagina/computer.png',
          frameRate: 1,
          frameBuffer: 1,
          loop: false,
          autoplay: false,
        }),
      ]

      energies = [
        new Sprite({
          position: {
            x: 600,
            y: 240,
          },
          imageSrc: './img/pagina/fire4.png',
          frameRate: 6,
          frameBuffer: 8,
          loop: true,
          autoplay: true,
          move: true,
          limit_left: 100,
          limit_right: 300,
          direction: 1
        }),

        new Sprite({
          position: {
            x: 300,
            y: 120,
          },
          imageSrc: './img/pagina/fire5.png',
          frameRate: 7,
          frameBuffer: 8,
          loop: true,
          autoplay: true,
          move: true,
          limit_left: 100,
          limit_right: 700,
          direction: 1
        }),

        new Sprite({
          position: {
            x: 700,
            y: 420,
          },
          imageSrc: './img/pagina/fire3.png',
          frameRate: 8,
          frameBuffer: 9,
          loop: true,
          autoplay: true,
          move: false
        })
      ]

      apagador = []

      fires = []

      lightnings = []
    },
  },
  3: {
    init: () => {
      parsedCollisions = collisionsLevel3.parse2D()
      collisionBlocks = parsedCollisions.createObjectsFrom2D()
      player.collisionBlocks = collisionBlocks
      player.position.x = 750
      player.position.y = 230
      if (player.currentAnimation) player.currentAnimation.isActive = false

      background = new Sprite({
        position: {
          x: (canvas.width - backgroundImageWidth) / 2,  
          y: (canvas.height - backgroundImageHeight) / 2,  
 
        },
        imageSrc: './img/pagina/3.png',
      })

      doors = [
        new Sprite({
          position: {
            x: 60,
            y: 440,
          },
          imageSrc: 'img/doors/doorTest2.png',
          frameRate: 6,
          frameBuffer: 6,
          loop: false,
          autoplay: false,
        }),
      ]

      computers = [
        new Sprite({
          position: {
            x: 100,
            y: 185,
          },
          imageSrc: './img/pagina/computer1.png',
          frameRate: 1,
          frameBuffer: 1,
          loop: false,
          autoplay: false,
        }),
      ]

      energies = [

        new Sprite({
          position: {
            x: 580,
            y: 220,
          },
          imageSrc: './img/pagina/fire4.png',
          frameRate: 6,
          frameBuffer: 6,
          loop: true,
          autoplay: true,
          move: true,
          limit_left: 550,
          limit_right: 900,
          direction: 1,
           eixo: "x"
        }),
      ]

    
      apagador = [
        new Sprite({
          position: {
            x: 850,
            y: 425,
          },
          imageSrc: './img/pagina/apagador.png',
          frameRate: 1,
          frameBuffer: 1,
          loop: false,
          autoplay: false,
         
        }),
      ]
      fires = [
        new Sprite({
          position: {
            x: 250,
            y: 162,
          },
          imageSrc: './img/pagina/fire3.png',
          frameRate: 8,
          frameBuffer: 9,
          loop: true,
          autoplay: true,
          move: false,
          opacity: 1
        }),
      ]

      lightnings = []


    },
  },
  4: {
    init: () => {
      parsedCollisions = collisionsLevel4.parse2D()
      collisionBlocks = parsedCollisions.createObjectsFrom2D()
      player.collisionBlocks = collisionBlocks
      player.position.x = 80
      player.position.y = 80
      if (player.currentAnimation) player.currentAnimation.isActive = false

      background = new Sprite({
        position: {
          x: (canvas.width - backgroundImageWidth) / 2,  
          y: (canvas.height - backgroundImageHeight) / 2,  
 
        },
        imageSrc: './img/pagina/4.png',
      })

      doors = [
        new Sprite({
          position: {
            x: 860,
            y: 180,
          },
          imageSrc: 'img/doors/doorTest2.png',
          frameRate: 6,
          frameBuffer: 6,
          loop: false,
          autoplay: false,
        }),
      ]
      computers = [
        new Sprite({
          position: {
            x: 50,
            y: 445,
          },
          imageSrc: './img/pagina/computer1.png',
          frameRate: 1,
          frameBuffer: 1,
          loop: false,
          autoplay: false,
        }),
      ]

      energies = [

        new Sprite({
          position: {
            x: 50,
            y: 220,
          },
          imageSrc: './img/pagina/fire4.png',
          frameRate: 6,
          frameBuffer: 6,
          loop: true,
          autoplay: true,
          move: true,
          limit_left: 100,
          limit_right: 450,
          direction: 1,
           eixo: "x"
        }),
      ]

    
      apagador = [
        
      ]
      fires = [
        new Sprite({
          position: {
            x: 620,
            y: 420,
          },
          imageSrc: './img/pagina/fire3.png',
          frameRate: 8,
          frameBuffer: 9,
          loop: true,
          autoplay: true,
          move: false,
          opacity: 1
        }),

        new Sprite({
          position: {
            x: 320,
            y: 420,
          },
          imageSrc: './img/pagina/fire3.png',
          frameRate: 8,
          frameBuffer: 9,
          loop: true,
          autoplay: true,
          move: false,
          opacity: 1
        }),
      ]

      lightnings = []

    },
  },
  5: {
    init: () => {
      parsedCollisions = collisionsLevel5.parse2D()
      collisionBlocks = parsedCollisions.createObjectsFrom2D()
      player.collisionBlocks = collisionBlocks
      player.position.x = 80
      player.position.y = 430
      if (player.currentAnimation) player.currentAnimation.isActive = false

      background = new Sprite({
        position: {
          x: (canvas.width - backgroundImageWidth) / 2,  
          y: (canvas.height - backgroundImageHeight) / 2,  
 
        },
        imageSrc: './img/pagina/5.png',
      })

      doors = [
        new Sprite({
          position: {
            x: 470,
            y: 115,
          },
          imageSrc: 'img/doors/doorTest2.png',
          frameRate: 6,
          frameBuffer: 6,
          loop: false,
          autoplay: false,
        }),
      ]
      computers = [
        new Sprite({
          position: {
            x: 890,
            y: 445,
          },
          imageSrc: './img/pagina/computer.png',
          frameRate: 1,
          frameBuffer: 1,
          loop: false,
          autoplay: false,
        }),
      ]

      energies = [

        new Sprite({
          position: {
            x: 250,
            y: 80,
          },
          imageSrc: './img/pagina/fire4.png',
          frameRate: 6,
          frameBuffer: 6,
          loop: true,
          autoplay: true,
          move: false,
          limit_left: 100,
          limit_right: 450,
          direction: 1,
           eixo: "x"
        }),

        new Sprite({
          position: {
            x: 150,
            y: 180,
          },
          imageSrc: './img/pagina/fire5.png',
          frameRate: 7,
          frameBuffer: 7,
          loop: true,
          autoplay: true,
          move: false,
          limit_left: 100,
          limit_right: 450,
          direction: 1,
           eixo: "x"
        }),
      ]

    
      apagador = [
        new Sprite({
          position: {
            x: 880,
            y: 228,
          },
          imageSrc: './img/pagina/apagador.png',
          frameRate: 1,
          frameBuffer: 1,
          loop: false,
          autoplay: false,
         
        }),
      ]
      fires = [
        new Sprite({
          position: {
            x: 700,
            y: 420,
          },
          imageSrc: './img/pagina/fire3.png',
          frameRate: 8,
          frameBuffer: 9,
          loop: true,
          autoplay: true,
          move: false,
          opacity: 1
        }),

        new Sprite({
          position: {
            x: 520,
            y: 100,
          },
          imageSrc: './img/pagina/fire3.png',
          frameRate: 8,
          frameBuffer: 9,
          loop: true,
          autoplay: true,
          move: false,
          opacity: 1
        }),
      ]

      lightnings = []



    },
  },
  6: {
    init: () => {
      parsedCollisions = collisionsLevel6.parse2D()
      collisionBlocks = parsedCollisions.createObjectsFrom2D()
      player.collisionBlocks = collisionBlocks
      player.position.x = 80
      player.position.y = 80
      if (player.currentAnimation) player.currentAnimation.isActive = false

      background = new Sprite({
        position: {
          x: (canvas.width - backgroundImageWidth) / 2,  
          y: (canvas.height - backgroundImageHeight) / 2,  
 
        },
        imageSrc: './img/pagina/6.png',
      })

      doors = [
        new Sprite({
          position: {
            x: 870,
            y: 435,
          },
          imageSrc: 'img/doors/doorTest2.png',
          frameRate: 6,
          frameBuffer: 6,
          loop: false,
          autoplay: false,
        }),
      ]
      computers = [
        new Sprite({
          position: {
            x: 100,
            y: 185,
          },
          imageSrc: './img/pagina/computer1.png',
          frameRate: 1,
          frameBuffer: 1,
          loop: false,
          autoplay: false,
        }),
      ]

      fires = [
        new Sprite({
          position: {
            x: 100,
            y: 290,
          },
          imageSrc: './img/pagina/fire3.png',
          frameRate: 8,
          frameBuffer: 9,
          loop: true,
          autoplay: true,
          move: false
        }),

          new Sprite({
            position: {
              x: 880,
              y: 160,
            },
            imageSrc: './img/pagina/fire3.png',
            frameRate: 8,
            frameBuffer: 9,
            loop: true,
            autoplay: true,
            move: false
          }),

          new Sprite({
            position: {
              x: 180,
              y: 160,
            },
            imageSrc: './img/pagina/fire3.png',
            frameRate: 8,
            frameBuffer: 9,
            loop: true,
            autoplay: true,
            move: false
          }),

      ]
      lightnings = []

      energies = [

        new Sprite({
          position: {
            x: 300,
            y: 80,
          },
          imageSrc: './img/pagina/fire4.png',
          frameRate: 6,
          frameBuffer: 6,
          loop: true,
          autoplay: true,
          move: true,
          limit_left: 300,
          limit_right: 650,
          direction: 1,
           eixo: "x"
        }),

        new Sprite({
          position: {
            x: 650,
            y: 180,
          },
          imageSrc: './img/pagina/fire5.png',
          frameRate: 7,
          frameBuffer: 7,
          loop: true,
          autoplay: true,
          move: true,
          limit_left: 300,
          limit_right: 650,
          direction: 1,
           eixo: "x"
        }),

        new Sprite({
          position: {
            x: 300,
            y: 280,
          },
          imageSrc: './img/pagina/fire6.png',
          frameRate: 7,
          frameBuffer: 7,
          loop: true,
          autoplay: true,
          move: true,
          limit_left: 300,
          limit_right: 650,
          direction: 1,
           eixo: "x"
        }),

        
      ]

      apagador = [
        new Sprite({
          position: {
            x: 50,
            y: 420,
          },
          imageSrc: './img/pagina/apagador.png',
          frameRate: 1,
          frameBuffer: 1,
          loop: false,
          autoplay: false,
         
        }),
      ]



    },
  },
  7: {
    init: () => {
      parsedCollisions = collisionsLevel7.parse2D()
      collisionBlocks = parsedCollisions.createObjectsFrom2D()
      player.collisionBlocks = collisionBlocks
      player.position.x = 80
      player.position.y = 80
      if (player.currentAnimation) player.currentAnimation.isActive = false

      background = new Sprite({
        position: {
          x: (canvas.width - backgroundImageWidth) / 2,  
          y: (canvas.height - backgroundImageHeight) / 2,  
 
        },
        imageSrc: './img/pagina/7.png',
      })

      doors = [
        new Sprite({
          position: {
            x: 380,
            y: 430,
          },
          imageSrc: 'img/doors/doorTest2.png',
          frameRate: 6,
          frameBuffer: 6,
          loop: false,
          autoplay: false,
        }),
      ]
      computers = [
        new Sprite({
          position: {
            x: 500,
            y: 440,
          },
          imageSrc: './img/pagina/computer1.png',
          frameRate: 1,
          frameBuffer: 1,
          loop: false,
          autoplay: false,
        }),
      ]

      fires = [
        new Sprite({
          position: {
            x: 770,
            y: 420,
          },
          imageSrc: './img/pagina/fire3.png',
          frameRate: 8,
          frameBuffer: 9,
          loop: true,
          autoplay: true,
          move: false
        }),

        new Sprite({
          position: {
            x: 80,
            y: 420,
          },
          imageSrc: './img/pagina/fire3.png',
          frameRate: 8,
          frameBuffer: 9,
          loop: true,
          autoplay: true,
          move: false
        }),

        new Sprite({
          position: {
            x: 100,
            y: 420,
          },
          imageSrc: './img/pagina/fire3.png',
          frameRate: 8,
          frameBuffer: 9,
          loop: true,
          autoplay: true,
          move: false
        }),

        new Sprite({
          position: {
            x: 120,
            y: 420,
          },
          imageSrc: './img/pagina/fire3.png',
          frameRate: 8,
          frameBuffer: 9,
          loop: true,
          autoplay: true,
          move: false
        }),
        new Sprite({
          position: {
            x: 140,
            y: 420,
          },
          imageSrc: './img/pagina/fire3.png',
          frameRate: 8,
          frameBuffer: 9,
          loop: true,
          autoplay: true,
          move: false
        }),
        new Sprite({
          position: {
            x: 160,
            y: 420,
          },
          imageSrc: './img/pagina/fire3.png',
          frameRate: 8,
          frameBuffer: 9,
          loop: true,
          autoplay: true,
          move: false
        }),

       
      ]

      energies = [
        new Sprite({
          position: {
            x: 50,
            y: 230,
          },
          imageSrc: './img/pagina/fire6.png',
          frameRate: 7,
          frameBuffer: 8,
          loop: true,
          autoplay: true,
          move: true,
          limit_left: 50,
          limit_right: 260,
          direction: 1
        }),

        new Sprite({
          position: {
            x: 50,
            y: 330,
          },
          imageSrc: './img/pagina/fire6.png',
          frameRate: 7,
          frameBuffer: 8,
          loop: true,
          autoplay: true,
          move: true,
          limit_left: 50,
          limit_right: 260,
          direction: 1
        }),

      ]
      apagador = [
        new Sprite({
          position: {
            x: 50,
            y: 420,
          },
          imageSrc: './img/pagina/apagador.png',
          frameRate: 1,
          frameBuffer: 1,
          loop: false,
          autoplay: false,
         
        }),
      ]

      lightnings = []


    },
  },
  8: {
    init: () => {
      parsedCollisions = collisionsLevel8.parse2D()
      collisionBlocks = parsedCollisions.createObjectsFrom2D()
      player.collisionBlocks = collisionBlocks
      player.position.x = 880
      player.position.y = 440
      if (player.currentAnimation) player.currentAnimation.isActive = false

      background = new Sprite({
        position: {
          x: (canvas.width - backgroundImageWidth) / 2,  
          y: (canvas.height - backgroundImageHeight) / 2,  
 
        },
        imageSrc: './img/pagina/8.png',
      })

      doors = [
        new Sprite({
          position: {
            x: 55,
            y: 440,
          },
          imageSrc: 'img/doors/doorTest2.png',
          frameRate: 6,
          frameBuffer: 6,
          loop: false,
          autoplay: false,
        }),
      ]
      computers = [
        new Sprite({
          position: {
            x: 630,
            y: 440,
          },
          imageSrc: './img/pagina/computer.png',
          frameRate: 1,
          frameBuffer: 1,
          loop: false,
          autoplay: false,
        }),
      ]

      energies = [
        new Sprite({
          position: {
            x: 80,
            y: 50,
          },
          imageSrc: './img/pagina/fire4.png',
          frameRate: 6,
          frameBuffer: 8,
          loop: true,
          autoplay: true,
          move: true,
          limit_left: 80,
          limit_right: 350,
          direction: 1
        }),

        new Sprite({
          position: {
            x: 80,
            y: 115,
          },
          imageSrc: './img/pagina/fire5.png',
          frameRate: 7,
          frameBuffer: 8,
          loop: true,
          autoplay: true,
          move: true,
          limit_left: 80,
          limit_right: 350,
          direction: 1
        }),

        new Sprite({
          position: {
            x: 80,
            y: 180,
          },
          imageSrc: './img/pagina/fire4.png',
          frameRate: 6,
          frameBuffer: 8,
          loop: true,
          autoplay: true,
          move: true,
          limit_left: 80,
          limit_right: 350,
          direction: 1
        }),

        //---------------------

        new Sprite({
          position: {
            x: 80,
            y: 50,
          },
          imageSrc: './img/pagina/fire4.png',
          frameRate: 6,
          frameBuffer: 8,
          loop: true,
          autoplay: true,
          move: true,
          limit_left: 500,
          limit_right: 850,
          direction: 1
        }),

        new Sprite({
          position: {
            x: 80,
            y: 115,
          },
          imageSrc: './img/pagina/fire5.png',
          frameRate: 7,
          frameBuffer: 8,
          loop: true,
          autoplay: true,
          move: true,
          limit_left: 500,
          limit_right: 850,
          direction: 1
        }),

        new Sprite({
          position: {
            x: 80,
            y: 180,
          },
          imageSrc: './img/pagina/fire4.png',
          frameRate: 6,
          frameBuffer: 8,
          loop: true,
          autoplay: true,
          move: true,
          limit_left: 500,
          limit_right: 850,
          direction: 1
        }),

        
      ]

      fires = [
        new Sprite({
          position: {
            x: 750,
            y: 420,
          },
          imageSrc: './img/pagina/fire3.png',
          frameRate: 8,
          frameBuffer: 9,
          loop: true,
          autoplay: true,
          move: false
        }),

        new Sprite({
          position: {
            x: 200,
            y: 420,
          },
          imageSrc: './img/pagina/fire3.png',
          frameRate: 8,
          frameBuffer: 9,
          loop: true,
          autoplay: true,
          move: false
        }),

        new Sprite({
          position: {
            x: 100,
            y: 420,
          },
          imageSrc: './img/pagina/fire3.png',
          frameRate: 8,
          frameBuffer: 9,
          loop: true,
          autoplay: true,
          move: false
        }),

      ]

      apagador = [
        new Sprite({
          position: {
            x: 400,
            y: 420,
          },
          imageSrc: './img/pagina/apagador.png',
          frameRate: 1,
          frameBuffer: 1,
          loop: false,
          autoplay: false,
         
        }),
      ]

      lightnings = []


    },
  },
  9: {
    init: () => {
      parsedCollisions = collisionsLevel9.parse2D()
      collisionBlocks = parsedCollisions.createObjectsFrom2D()
      player.collisionBlocks = collisionBlocks
      player.position.x = 80
      player.position.y = 530
      if (player.currentAnimation) player.currentAnimation.isActive = false

      background = new Sprite({
        position: {
          x: (canvas.width - backgroundImageWidth) / 2,  
          y: (canvas.height - backgroundImageHeight) / 2,  
 
        },
        imageSrc: './img/pagina/9.png',
      })

      doors = [
        new Sprite({
          position: {
            x: 480,
            y: 175,
          },
          imageSrc: 'img/doors/doorTest2.png',
          frameRate: 6,
          frameBuffer: 6,
          loop: false,
          autoplay: false,
        }),
      ]
      computers = [
        new Sprite({
          position: {
            x: 880,
            y: 445,
          },
          imageSrc: './img/pagina/computer.png',
          frameRate: 1,
          frameBuffer: 1,
          loop: false,
          autoplay: false,
        }),
      ]

      fires = [
        new Sprite({
          position: {
            x: 700,
            y: 420,
          },
          imageSrc: './img/pagina/fire3.png',
          frameRate: 8,
          frameBuffer: 9,
          loop: true,
          autoplay: true,
          move: false
        }),
        new Sprite({
          position: {
            x: 80,
            y: 320,
          },
          imageSrc: './img/pagina/fire10.png',
          frameRate: 8,
          frameBuffer: 9,
          loop: true,
          autoplay: true,
          move: false
        }),

        new Sprite({
          position: {
            x: 80,
            y: 320,
          },
          imageSrc: './img/pagina/fire10.png',
          frameRate: 8,
          frameBuffer: 9,
          loop: true,
          autoplay: true,
          move: false
        }),

        new Sprite({
          position: {
            x: 420,
            y: 195,
          },
          imageSrc: './img/pagina/fire10.png',
          frameRate: 8,
          frameBuffer: 9,
          loop: true,
          autoplay: true,
          move: false
        }),

        new Sprite({
          position: {
            x: 530,
            y: 195,
          },
          imageSrc: './img/pagina/fire10.png',
          frameRate: 8,
          frameBuffer: 9,
          loop: true,
          autoplay: true,
          move: false
        }),

       
      ]

      energies = [

        new Sprite({
          position: {
            x: 80,
            y: 80,
          },
          imageSrc: './img/pagina/fire6.png',
          frameRate: 7,
          frameBuffer: 8,
          loop: true,
          autoplay: true,
          move: true,
          limit_left: 80,
          limit_right: 800,
          direction: 1
        }),
      ]

      apagador = [
        new Sprite({
          position: {
            x: 900,
            y: 110,
          },
          imageSrc: './img/pagina/apagador.png',
          frameRate: 1,
          frameBuffer: 1,
          loop: false,
          autoplay: false,
         
        }),
      ]

      lightnings = []
    },
  },
  10: {
    init: () => {
      parsedCollisions = collisionsLevel10.parse2D()
      collisionBlocks = parsedCollisions.createObjectsFrom2D()
      player.collisionBlocks = collisionBlocks
      player.position.x = 850
      player.position.y = 530
      if (player.currentAnimation) player.currentAnimation.isActive = false

      background = new Sprite({
        position: {
          x: (canvas.width - backgroundImageWidth) / 2,  
          y: (canvas.height - backgroundImageHeight) / 2,  
 
        },
        imageSrc: './img/pagina/10.png',
      })

      doors = [
        new Sprite({
          position: {
            x: 60,
            y: 430,
          },
          imageSrc: 'img/doors/doorTest2.png',
          frameRate: 6,
          frameBuffer: 6,
          loop: false,
          autoplay: false,
        }),
      ]
      computers = [
        new Sprite({
          position: {
            x: 50,
            y: 50,
          },
          imageSrc: './img/pagina/computer1.png',
          frameRate: 1,
          frameBuffer: 1,
          loop: false,
          autoplay: false,
        }),
      ]

      fires = [
        new Sprite({
          position: {
            x: 200,
            y: 420,
          },
          imageSrc: './img/pagina/fire3.png',
          frameRate: 8,
          frameBuffer: 9,
          loop: true,
          autoplay: true,
          move: false
        }),

        new Sprite({
          position: {
            x: 880,
            y: 290,
          },
          imageSrc: './img/pagina/fire3.png',
          frameRate: 8,
          frameBuffer: 9,
          loop: true,
          autoplay: true,
          move: false
        }),
        new Sprite({
          position: {
            x: 780,
            y: 290,
          },
          imageSrc: './img/pagina/fire3.png',
          frameRate: 8,
          frameBuffer: 9,
          loop: true,
          autoplay: true,
          move: false
        }),


        new Sprite({
          position: {
            x: 80,
            y: 290,
          },
          imageSrc: './img/pagina/fire3.png',
          frameRate: 8,
          frameBuffer: 9,
          loop: true,
          autoplay: true,
          move: false
        }),

        new Sprite({
          position: {
            x: 180,
            y: 290,
          },
          imageSrc: './img/pagina/fire3.png',
          frameRate: 8,
          frameBuffer: 9,
          loop: true,
          autoplay: true,
          move: false
        }),
      ]

      
      energies = [

        new Sprite({
          position: {
            x: 300,
            y: 120,
          },
          imageSrc: './img/pagina/fire6.png',
          frameRate: 7,
          frameBuffer: 8,
          loop: true,
          autoplay: true,
          move: true,
          limit_left: 300,
          limit_right: 800,
          direction: 1
        }),

        new Sprite({
          position: {
            x: 120,
            y: 50,
          },
          imageSrc: './img/pagina/fire5.png',
          frameRate: 7,
          frameBuffer: 8,
          loop: true,
          autoplay: true,
          move: true,
          limit_left: 120,
          limit_right: 800,
          direction: 1
        }),

        new Sprite({
          position: {
            x: 430,
            y: 290,
          },
          imageSrc: './img/pagina/fire9.png',
          frameRate: 4,
          frameBuffer: 4,
          loop: true,
          autoplay: true,
          move: false
        }),
      ]

      apagador = [
        new Sprite({
          position: {
            x: 900,
            y: 95,
          },
          imageSrc: './img/pagina/apagador.png',
          frameRate: 1,
          frameBuffer: 1,
          loop: false,
          autoplay: false,
         
        }),
      ]

      lightnings = []


    },
  },

  11: {
    init: () => {
      parsedCollisions = collisionsLevel11.parse2D()
      collisionBlocks = parsedCollisions.createObjectsFrom2D()
      player.collisionBlocks = collisionBlocks

      player.position.x = 200
      player.position.y = 200
      if (player.currentAnimation) player.currentAnimation.isActive = false

      background = new Sprite({
        position: {
          x: (canvas.width - backgroundImageWidth) / 2,  
          y: (canvas.height - backgroundImageHeight) / 2,  
 
        },
        imageSrc: './img/pagina/11.png',
      })

      doors = [
        new Sprite({
          position: {
            x: 60,
            y: 430,
          },
          imageSrc: 'img/doors/doorTest2.png',
          frameRate: 6,
          frameBuffer: 6,
          loop: false,
          autoplay: false,
        }),
      ]
      computers = [
        new Sprite({
          position: {
            x: 350,
            y: 305,
          },
          imageSrc: './img/pagina/computer1.png',
          frameRate: 1,
          frameBuffer: 1,
          loop: false,
          autoplay: false,
        }),
      ]

      energies = [
        

        new Sprite({
          position: {
            x: 580,
            y: 220,
          },
          imageSrc: './img/pagina/fire6.png',
          frameRate: 7,
          frameBuffer: 8,
          loop: true,
          autoplay: true,
          move: true,
          limit_left: 50,
          limit_right: 380,
          direction: 1,
           eixo: "y"
        }),

        new Sprite({
          position: {
            x: 580,
            y: 220,
          },
          imageSrc: './img/pagina/fire6.png',
          frameRate: 7,
          frameBuffer: 8,
          loop: true,
          autoplay: true,
          move: true,
          limit_left: 400,
          limit_right: 900,
          direction: 1,
           eixo: "x"
        }),
      ]

      fires = [
       
        new Sprite({
          position: {
            x: 170,
            y: 420,
          },
          imageSrc: './img/pagina/fire3.png',
          frameRate: 8,
          frameBuffer: 9,
          loop: true,
          autoplay: true,
          move: false,
          opacity: 1
        }),

        new Sprite({
          position: {
            x: 470,
            y: 280,
          },
          imageSrc: './img/pagina/fire3.png',
          frameRate: 8,
          frameBuffer: 9,
          loop: true,
          autoplay: true,
          move: false,
          opacity: 1
        }),
        new Sprite({
          position: {
            x: 370,
            y: 420,
          },
          imageSrc: './img/pagina/fire3.png',
          frameRate: 8,
          frameBuffer: 9,
          loop: true,
          autoplay: true,
          move: false,
          opacity: 1
        }),

        new Sprite({
          position: {
            x: 270,
            y: 420,
          },
          imageSrc: './img/pagina/fire3.png',
          frameRate: 8,
          frameBuffer: 9,
          loop: true,
          autoplay: true,
          move: false,
          opacity: 1
        }),

        new Sprite({
          position: {
            x: 470,
            y: 420,
          },
          imageSrc: './img/pagina/fire3.png',
          frameRate: 8,
          frameBuffer: 9,
          loop: true,
          autoplay: true,
          move: false,
          opacity: 1
        }),
        new Sprite({
          position: {
            x: 570,
            y: 420,
          },
          imageSrc: './img/pagina/fire3.png',
          frameRate: 8,
          frameBuffer: 9,
          loop: true,
          autoplay: true,
          move: false,
          opacity: 1
        }),
      ]

      apagador = [
        new Sprite({
          position: {
            x: 850,
            y: 425,
          },
          imageSrc: './img/pagina/apagador.png',
          frameRate: 1,
          frameBuffer: 1,
          loop: false,
          autoplay: false,
         
        }),
      ]

      lightnings = []


    },
  },
  12: {
    init: () => {
      parsedCollisions = collisionsLevel12.parse2D()
      collisionBlocks = parsedCollisions.createObjectsFrom2D()
      player.collisionBlocks = collisionBlocks
      player.position.x = 850
      player.position.y = 530
      if (player.currentAnimation) player.currentAnimation.isActive = false

      background = new Sprite({
        position: {
          x: (canvas.width - backgroundImageWidth) / 2,  
          y: (canvas.height - backgroundImageHeight) / 2,  
 
        },
        imageSrc: './img/pagina/12.png',
      })

      doors = [
        new Sprite({
          position: {
            x: 60,
            y: 430,
          },
          imageSrc: 'img/doors/doorTest2.png',
          frameRate: 6,
          frameBuffer: 6,
          loop: false,
          autoplay: false,
        }),
      ]
      computers = [
        new Sprite({
          position: {
            x: 880,
            y: 60,
          },
          imageSrc: './img/pagina/computer.png',
          frameRate: 1,
          frameBuffer: 1,
          loop: false,
          autoplay: false,
        }),
      ]

      energies = [
        new Sprite({
          position: {
            x: 580,
            y: 220,
          },
          imageSrc: './img/pagina/fire9.png',
          frameRate: 4,
          frameBuffer: 6,
          loop: true,
          autoplay: true,
          move: false,
          limit_left: 50,
          limit_right: 400,
          direction: 1,
           eixo: "y"
        }),

        new Sprite({
          position: {
            x: 50,
            y: 50,
          },
          imageSrc: './img/pagina/fire10.png',
          frameRate: 8,
          frameBuffer: 9,
          loop: true,
          autoplay: true,
          move: false,
          opacity: 1
        }),
      ]

      fires = [
       
        new Sprite({
          position: {
            x: 100,
            y: 420,
          },
          imageSrc: './img/pagina/fire3.png',
          frameRate: 8,
          frameBuffer: 9,
          loop: true,
          autoplay: true,
          move: false,
          opacity: 1
        }),

        new Sprite({
          position: {
            x: 200,
            y: 160,
          },
          imageSrc: './img/pagina/fire3.png',
          frameRate: 8,
          frameBuffer: 9,
          loop: true,
          autoplay: true,
          move: false,
          opacity: 1
        }),

        
      ]

      apagador = [
        new Sprite({
          position: {
            x: 500,
            y: 285,
          },
          imageSrc: './img/pagina/apagador.png',
          frameRate: 1,
          frameBuffer: 1,
          loop: false,
          autoplay: false,
         
        }),
      ]

      lightnings = [
        
      ]



    },
  },

  13: {
    init: () => {
      parsedCollisions = collisionsLevel13.parse2D()
      collisionBlocks = parsedCollisions.createObjectsFrom2D()
      player.collisionBlocks = collisionBlocks
      player.position.x = 850
      player.position.y = 530
      if (player.currentAnimation) player.currentAnimation.isActive = false

      background = new Sprite({
        position: {
          x: (canvas.width - backgroundImageWidth) / 2,  
          y: (canvas.height - backgroundImageHeight) / 2,  
 
        },
        imageSrc: './img/pagina/13.png',
      })

      doors = [
        new Sprite({
          position: {
            x: 480,
            y: 300,
          },
          imageSrc: 'img/doors/doorTest2.png',
          frameRate: 6,
          frameBuffer: 6,
          loop: false,
          autoplay: false,
        }),
      ]
      computers = [
        new Sprite({
          position: {
            x: 450,
            y: 45,
          },
          imageSrc: './img/pagina/computer1.png',
          frameRate: 1,
          frameBuffer: 1,
          loop: false,
          autoplay: false,
        }),
      ]

      energies = [
        new Sprite({
          position: {
            x: 580,
            y: 200,
          },
          imageSrc: './img/pagina/fire5.png',
          frameRate: 7,
          frameBuffer: 8,
          loop: true,
          autoplay: true,
          move: true,
          limit_left: 300,
          limit_right: 800,
          direction: 1,
           eixo: "x"
        }),

        new Sprite({
          position: {
            x: 50,
            y: 300,
          },
          imageSrc: './img/pagina/fire9.png',
          frameRate: 4,
          frameBuffer: 8,
          loop: true,
          autoplay: true,
          move: false,
          limit_left: 50,
          limit_right: 400,
          direction: 1,
           eixo: "y"
        }),
      ]

      fires = [
       
        new Sprite({
          position: {
            x: 350,
            y: 280,
          },
          imageSrc: './img/pagina/fire3.png',
          frameRate: 8,
          frameBuffer: 9,
          loop: true,
          autoplay: true,
          move: false,
          opacity: 1
        }),

        new Sprite({
          position: {
            x: 570,
            y: 280,
          },
          imageSrc: './img/pagina/fire3.png',
          frameRate: 8,
          frameBuffer: 9,
          loop: true,
          autoplay: true,
          move: false,
          opacity: 1
        }),
      ]

      apagador = [
        new Sprite({
          position: {
            x: 50,
            y: 165,
          },
          imageSrc: './img/pagina/apagador.png',
          frameRate: 1,
          frameBuffer: 1,
          loop: false,
          autoplay: false,
         
        }),
      ]

      lightnings = [

      ]

    },
  },
  14: {
    init: () => {
      parsedCollisions = collisionsLevel14.parse2D()
      collisionBlocks = parsedCollisions.createObjectsFrom2D()
      player.collisionBlocks = collisionBlocks
      player.position.x = 100
      player.position.y = 430
      if (player.currentAnimation) player.currentAnimation.isActive = false

      background = new Sprite({
        position: {
          x: (canvas.width - backgroundImageWidth) / 2,  
          y: (canvas.height - backgroundImageHeight) / 2,  
 
        },
        imageSrc: './img/pagina/14.png',
      })

      doors = [
        new Sprite({
          position: {
            x: 910,
            y: 50,
          },
          imageSrc: 'img/doors/doorTest2.png',
          frameRate: 6,
          frameBuffer: 6,
          loop: false,
          autoplay: false,
        }),
      ]
      computers = [
        new Sprite({
          position: {
            x: 50,
            y: 250,
          },
          imageSrc: './img/pagina/computer1.png',
          frameRate: 1,
          frameBuffer: 1,
          loop: false,
          autoplay: false,
        }),
      ]

      energies = [

        new Sprite({
          position: {
            x: 100,
            y: 50,
          },
          imageSrc: './img/pagina/fire6.png',
          frameRate: 7,
          frameBuffer: 8,
          loop: true,
          autoplay: true,
          move: true,
          limit_left: 100,
          limit_right: 500,
          direction: 1,
           eixo: "x"
        }),

        new Sprite({
          position: {
            x: 580,
            y: 230,
          },
          imageSrc: './img/pagina/fire6.png',
          frameRate: 7,
          frameBuffer: 8,
          loop: true,
          autoplay: true,
          move: true,
          limit_left: 300,
          limit_right: 800,
          direction: 1,
           eixo: "x"
        }), 
      ]

      fires = [

        new Sprite({
          position: {
            x: 100,
            y: 350,
          },
          imageSrc: './img/pagina/fire10.png',
          frameRate: 8,
          frameBuffer: 9,
          loop: true,
          autoplay: true,
          move: false,
          opacity: 1
        }),

        new Sprite({
          position: {
            x: 150,
            y: 350,
          },
          imageSrc: './img/pagina/fire10.png',
          frameRate: 8,
          frameBuffer: 9,
          loop: true,
          autoplay: true,
          move: false,
          opacity: 1
        }),

        new Sprite({
          position: {
            x: 200,
            y: 350,
          },
          imageSrc: './img/pagina/fire10.png',
          frameRate: 8,
          frameBuffer: 9,
          loop: true,
          autoplay: true,
          move: false,
          opacity: 1
        }),

        new Sprite({
          position: {
            x: 250,
            y: 350,
          },
          imageSrc: './img/pagina/fire10.png',
          frameRate: 8,
          frameBuffer: 9,
          loop: true,
          autoplay: true,
          move: false,
          opacity: 1
        }),

        new Sprite({
          position: {
            x: 300,
            y: 350,
          },
          imageSrc: './img/pagina/fire10.png',
          frameRate: 8,
          frameBuffer: 9,
          loop: true,
          autoplay: true,
          move: false,
          opacity: 1
        }),

        new Sprite({
          position: {
            x: 350,
            y: 350,
          },
          imageSrc: './img/pagina/fire10.png',
          frameRate: 8,
          frameBuffer: 9,
          loop: true,
          autoplay: true,
          move: false,
          opacity: 1
        }),
       
        new Sprite({
          position: {
            x: 750,
            y: 420,
          },
          imageSrc: './img/pagina/fire3.png',
          frameRate: 8,
          frameBuffer: 9,
          loop: true,
          autoplay: true,
          move: false,
          opacity: 1
        }),

        new Sprite({
          position: {
            x: 800,
            y: 420,
          },
          imageSrc: './img/pagina/fire3.png',
          frameRate: 8,
          frameBuffer: 9,
          loop: true,
          autoplay: true,
          move: false,
          opacity: 1
        }),
      ]

      apagador = [
        new Sprite({
          position: {
            x: 900,
            y: 425,
          },
          imageSrc: './img/pagina/apagador.png',
          frameRate: 1,
          frameBuffer: 1,
          loop: false,
          autoplay: false,
         
        }),
      ]

      lightnings = [

      ]
     
      


    },
  },
  15: {
    init: () => {
      parsedCollisions = collisionsLevel15.parse2D();
      collisionBlocks = parsedCollisions.createObjectsFrom2D();
      player.collisionBlocks = collisionBlocks;
      player.position.x = 100;
      player.position.y = 100;
      if (player.currentAnimation) player.currentAnimation.isActive = false;
  
      background = new Sprite({
        position: {
          x: (canvas.width - backgroundImageWidth) / 2,  
          y: (canvas.height - backgroundImageHeight) / 2,  
        },
        imageSrc: './img/pagina/15.png',
      });
  
      doors = [
        new Sprite({
          position: {
            x: 60,
            y: 430,
          },
          imageSrc: 'img/doors/doorTest2.png',
          frameRate: 6,
          frameBuffer: 6,
          loop: false,
          autoplay: false,
        }),
      ];
  
      computers = [
        new Sprite({
          position: {
            x: 880,
            y: 188,
          },
          imageSrc: './img/pagina/computer.png',
          frameRate: 1,
          frameBuffer: 1,
          loop: false,
          autoplay: false,
        }),
      ];
  
      energies = [
        // new Sprite({
        //   position: {
        //     x: 800,
        //     y: 220,
        //   },
        //   imageSrc: './img/pagina/fire6.png',
        //   frameRate: 7,
        //   frameBuffer: 8,
        //   loop: true,
        //   autoplay: true,
        //   move: false,
        //   limit_left: 620,
        //   limit_right: 320,
        //   direction: 1
        // }),
  
        // new Sprite({
        //   position: {
        //     x: 580,
        //     y: 220,
        //   },
        //   imageSrc: './img/pagina/fire6.png',
        //   frameRate: 7,
        //   frameBuffer: 8,
        //   loop: true,
        //   autoplay: true,
        //   move: true,
        //   limit_left: 50,
        //   limit_right: 400,
        //   direction: 1,
        //   eixo: "y"
        // }),
      ];
  
      fires = [
        new Sprite({
          position: {
            x: 200,
            y: 420,
          },
          imageSrc: './img/pagina/fire3.png',
          frameRate: 8,
          frameBuffer: 9,
          loop: true,
          autoplay: true,
          move: false,
          opacity: 1
        }),

        new Sprite({
          position: {
            x: 250,
            y: 420,
          },
          imageSrc: './img/pagina/fire3.png',
          frameRate: 8,
          frameBuffer: 9,
          loop: true,
          autoplay: true,
          move: false,
          opacity: 1
        }),

        new Sprite({
          position: {
            x: 300,
            y: 420,
          },
          imageSrc: './img/pagina/fire3.png',
          frameRate: 8,
          frameBuffer: 9,
          loop: true,
          autoplay: true,
          move: false,
          opacity: 1
        }),

        new Sprite({
          position: {
            x: 350,
            y: 420,
          },
          imageSrc: './img/pagina/fire3.png',
          frameRate: 8,
          frameBuffer: 9,
          loop: true,
          autoplay: true,
          move: false,
          opacity: 1
        }),

        new Sprite({
          position: {
            x: 400,
            y: 420,
          },
          imageSrc: './img/pagina/fire3.png',
          frameRate: 8,
          frameBuffer: 9,
          loop: true,
          autoplay: true,
          move: false,
          opacity: 1
        }),

        new Sprite({
          position: {
            x: 450,
            y: 420,
          },
          imageSrc: './img/pagina/fire3.png',
          frameRate: 8,
          frameBuffer: 9,
          loop: true,
          autoplay: true,
          move: false,
          opacity: 1
        }),

        new Sprite({
          position: {
            x: 500,
            y: 420,
          },
          imageSrc: './img/pagina/fire3.png',
          frameRate: 8,
          frameBuffer: 9,
          loop: true,
          autoplay: true,
          move: false,
          opacity: 1
        }),

        new Sprite({
          position: {
            x: 550,
            y: 420,
          },
          imageSrc: './img/pagina/fire3.png',
          frameRate: 8,
          frameBuffer: 9,
          loop: true,
          autoplay: true,
          move: false,
          opacity: 1
        }),

        new Sprite({
          position: {
            x: 600,
            y: 420,
          },
          imageSrc: './img/pagina/fire3.png',
          frameRate: 8,
          frameBuffer: 9,
          loop: true,
          autoplay: true,
          move: false,
          opacity: 1
        }),

        new Sprite({
          position: {
            x: 650,
            y: 420,
          },
          imageSrc: './img/pagina/fire3.png',
          frameRate: 8,
          frameBuffer: 9,
          loop: true,
          autoplay: true,
          move: false,
          opacity: 1
        }),

        new Sprite({
          position: {
            x: 700,
            y: 420,
          },
          imageSrc: './img/pagina/fire3.png',
          frameRate: 8,
          frameBuffer: 9,
          loop: true,
          autoplay: true,
          move: false,
          opacity: 1
        }),

        new Sprite({
          position: {
            x: 750,
            y: 420,
          },
          imageSrc: './img/pagina/fire3.png',
          frameRate: 8,
          frameBuffer: 9,
          loop: true,
          autoplay: true,
          move: false,
          opacity: 1
        }),

        new Sprite({
          position: {
            x: 800,
            y: 420,
          },
          imageSrc: './img/pagina/fire3.png',
          frameRate: 8,
          frameBuffer: 9,
          loop: true,
          autoplay: true,
          move: false,
          opacity: 1
        }),

        new Sprite({
          position: {
            x: 850,
            y: 420,
          },
          imageSrc: './img/pagina/fire3.png',
          frameRate: 8,
          frameBuffer: 9,
          loop: true,
          autoplay: true,
          move: false,
          opacity: 1
        }),

        new Sprite({
          position: {
            x: 900,
            y: 420,
          },
          imageSrc: './img/pagina/fire3.png',
          frameRate: 8,
          frameBuffer: 9,
          loop: true,
          autoplay: true,
          move: false,
          opacity: 1
        }),
  
      ];
  
      apagador = [
        new Sprite({
          position: {
            x: 850,
            y: 425,
          },
          imageSrc: './img/pagina/apagador.png',
          frameRate: 1,
          frameBuffer: 1,
          loop: false,
          autoplay: false,
        }),
      ],

      lightnings =[]
  
     
    
    },
  },
  
  16: {
    init: () => {
      parsedCollisions = collisionsLevel16.parse2D()
      collisionBlocks = parsedCollisions.createObjectsFrom2D()
      player.collisionBlocks = collisionBlocks
      player.position.x = 850
      player.position.y = 530
      if (player.currentAnimation) player.currentAnimation.isActive = false

      background = new Sprite({
        position: {
          x: (canvas.width - backgroundImageWidth) / 2,  
          y: (canvas.height - backgroundImageHeight) / 2,  
 
        },
        imageSrc: './img/pagina/16.png',
      })

      doors = [
        new Sprite({
          position: {
            x: 50,
            y: 50,
          },
          imageSrc: 'img/doors/doorTest2.png',
          frameRate: 6,
          frameBuffer: 6,
          loop: false,
          autoplay: false,
        }),
      ]
      computers = [
        new Sprite({
          position: {
            x: 50,
            y: 450,
          },
          imageSrc: './img/pagina/computer1.png',
          frameRate: 1,
          frameBuffer: 1,
          loop: false,
          autoplay: false,
        }),
      ]

      energies = [
      

        new Sprite({
          position: {
            x: 50,
            y: 220,
          },
          imageSrc: './img/pagina/fire9.png',
          frameRate: 4,
          frameBuffer: 4,
          loop: true,
          autoplay: true,
          move: false,
          limit_left: 50,
          limit_right: 400,
          direction: 1,
           eixo: "y"
        }),

        new Sprite({
          position: {
            x: 700,
            y: 220,
          },
          imageSrc: './img/pagina/fire4.png',
          frameRate: 6,
          frameBuffer: 6,
          loop: true,
          autoplay: true,
          move: false,
          limit_left: 50,
          limit_right: 400,
          direction: 1,
           eixo: "y"
        }),

        new Sprite({
          position: {
            x: 800,
            y: 320,
          },
          imageSrc: './img/pagina/fire4.png',
          frameRate: 6,
          frameBuffer: 6,
          loop: true,
          autoplay: true,
          move: false,
          limit_left: 50,
          limit_right: 400,
          direction: 1,
           eixo: "y"
        }),

        new Sprite({
          position: {
            x: 850,
            y: 180,
          },
          imageSrc: './img/pagina/fire4.png',
          frameRate: 6,
          frameBuffer: 6,
          loop: true,
          autoplay: true,
          move: false,
          limit_left: 50,
          limit_right: 400,
          direction: 1,
           eixo: "y"
        }),
      ]

      fires = [
       
        new Sprite({
          position: {
            x: 800,
            y: 50,
          },
          imageSrc: './img/pagina/fire10.png',
          frameRate: 8,
          frameBuffer: 9,
          loop: true,
          autoplay: true,
          move: false,
          opacity: 1
        }),

        new Sprite({
          position: {
            x: 900,
            y: 100,
          },
          imageSrc: './img/pagina/fire10.png',
          frameRate: 8,
          frameBuffer: 9,
          loop: true,
          autoplay: true,
          move: false,
          opacity: 1
        }),

        new Sprite({
          position: {
            x: 750,
            y: 100,
          },
          imageSrc: './img/pagina/fire10.png',
          frameRate: 8,
          frameBuffer: 9,
          loop: true,
          autoplay: true,
          move: false,
          opacity: 1
        }),

        new Sprite({
          position: {
            x: 750,
            y: 300,
          },
          imageSrc: './img/pagina/fire10.png',
          frameRate: 8,
          frameBuffer: 9,
          loop: true,
          autoplay: true,
          move: false,
          opacity: 1
        }),

        new Sprite({
          position: {
            x: 800,
            y: 200,
          },
          imageSrc: './img/pagina/fire10.png',
          frameRate: 8,
          frameBuffer: 9,
          loop: true,
          autoplay: true,
          move: false,
          opacity: 1
        }),

        new Sprite({
          position: {
            x: 900,
            y: 300,
          },
          imageSrc: './img/pagina/fire10.png',
          frameRate: 8,
          frameBuffer: 9,
          loop: true,
          autoplay: true,
          move: false,
          opacity: 1
        }),

        
      ]

      apagador = [
       
      ]

      lightnings =[]


    },
  },
  17: {
    init: () => {
      parsedCollisions = collisionsLevel17.parse2D()
      collisionBlocks = parsedCollisions.createObjectsFrom2D()
      player.collisionBlocks = collisionBlocks
      player.position.x = 100
      player.position.y = 100
      if (player.currentAnimation) player.currentAnimation.isActive = false

      background = new Sprite({
        position: {
          x: (canvas.width - backgroundImageWidth) / 2,  
          y: (canvas.height - backgroundImageHeight) / 2,  
 
        },
        imageSrc: './img/pagina/17.png',
      })

      doors = [
        new Sprite({
          position: {
            x: 900,
            y: 435,
          },
          imageSrc: 'img/doors/doorTest2.png',
          frameRate: 6,
          frameBuffer: 6,
          loop: false,
          autoplay: false,
        }),
      ]
      computers = [
        new Sprite({
          position: {
            x: 50,
            y: 445,
          },
          imageSrc: './img/pagina/computer1.png',
          frameRate: 1,
          frameBuffer: 1,
          loop: false,
          autoplay: false,
        }),
      ]

      energies = [
        new Sprite({
          position: {
            x: 900,
            y: 50,
          },
          imageSrc: './img/pagina/fire6.png',
          frameRate: 7,
          frameBuffer: 8,
          loop: true,
          autoplay: true,
          move: false,
          limit_left: 620,
          limit_right: 320,
          direction: 1
        }),

        new Sprite({
          position: {
            x: 50,
            y: 280,
          },
          imageSrc: './img/pagina/fire6.png',
          frameRate: 7,
          frameBuffer: 8,
          loop: true,
          autoplay: true,
          move: true,
          limit_left: 50,
          limit_right: 900,
          direction: 1,
           eixo: "x"
        }),

        new Sprite({
          position: {
            x: 0,
            y: 280,
          },
          imageSrc: './img/pagina/fire6.png',
          frameRate: 7,
          frameBuffer: 8,
          loop: true,
          autoplay: true,
          move: true,
          limit_left: 50,
          limit_right: 900,
          direction: 1,
           eixo: "x"
        }),

        new Sprite({
          position: {
            x: 80,
            y: 280,
          },
          imageSrc: './img/pagina/fire6.png',
          frameRate: 7,
          frameBuffer: 8,
          loop: true,
          autoplay: true,
          move: true,
          limit_left: 50,
          limit_right: 900,
          direction: 1,
           eixo: "x"
        }),
      ]

      fires = [
       
        new Sprite({
          position: {
            x: 200,
            y: 155,
          },
          imageSrc: './img/pagina/fire3.png',
          frameRate: 8,
          frameBuffer: 9,
          loop: true,
          autoplay: true,
          move: false,
          opacity: 1
        }),

        new Sprite({
          position: {
            x: 250,
            y: 155,
          },
          imageSrc: './img/pagina/fire3.png',
          frameRate: 8,
          frameBuffer: 9,
          loop: true,
          autoplay: true,
          move: false,
          opacity: 1
        }),

        new Sprite({
          position: {
            x: 300,
            y: 155,
          },
          imageSrc: './img/pagina/fire3.png',
          frameRate: 8,
          frameBuffer: 9,
          loop: true,
          autoplay: true,
          move: false,
          opacity: 1
        }),

        new Sprite({
          position: {
            x: 350,
            y: 155,
          },
          imageSrc: './img/pagina/fire3.png',
          frameRate: 8,
          frameBuffer: 9,
          loop: true,
          autoplay: true,
          move: false,
          opacity: 1
        }),

        
        
      ]

      apagador = [
        new Sprite({
          position: {
            x: 450,
            y: 160,
          },
          imageSrc: './img/pagina/apagador.png',
          frameRate: 1,
          frameBuffer: 1,
          loop: false,
          autoplay: false,
         
        }),
      ]

      lightnings = []


    },
  },
}

const keys = {
  w: {
    pressed: false,
  },
  a: {
    pressed: false,
  },
  d: {
    pressed: false,
  },
}

const overlay = {
  opacity: 0,
}


 popupShown = false;


function animate() {
  window.requestAnimationFrame(animate);
  background.draw();
  doors.forEach((door) => {
    door.draw();
  });

  player.update(); 
  player.updateHitbox()

  isNearComputer = false;
  computers.forEach((computer) => {
    computer.draw();

    if (isColliding(player, computer)) {
      isNearComputer = true;
      
    }
  });

  if (!isNearComputer) {
    popupShown = false;
  }

  isNearApagador = false;
  apagador.forEach((apagador) => {
    apagador.draw();
    if (isColliding(player, apagador)) {
      isNearApagador = true; 
    }
  });

  
 
  if (ativadorFire) { 
    fires.forEach((fire) => {
      fire.draw();
    });
  }

  if (isNearApagador) {
    fires.forEach((fire) => {
      // fire.startExtinguishing(); // Inicia a extinção quando o jogador está perto
    });
  }

  energies.forEach((energy) =>{
    if (energy.eixo == "y" && energy.move === true) {
      energy.position.y += fireSpeed * energy.direction;
      if (energy.position.y > energy.limit_right) {
        energy.direction = -1;  
      } else if (energy.position.y < energy.limit_left) {
        energy.direction = 1;  
      }
    }
    if (energy.eixo == "x" && energy.move === true) {
      energy.position.x += fireSpeed * energy.direction;
      if (energy.position.x > energy.limit_right) {
        energy.direction = -1;  
      } else if (energy.position.x < energy.limit_left) {
        energy.direction = 1;  
      }
    }
    energy.draw();
  })

  lightnings.forEach((lightning) =>{
    lightning.draw()
  })
  
  collisionBlocks.forEach(block => block.update());

  
  checkPlayerFireCollision();
  checkPlayerEnergyCollision();


  player.handleInput(keys);
  player.draw();

  c.save();
  c.globalAlpha = overlay.opacity;
  c.fillRect(0, 0, canvas.width, canvas.height);
  c.restore();
}



levels[level].init()
animate()

