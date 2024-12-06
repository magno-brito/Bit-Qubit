let isNearComputer = false;
let isNearApagador = false;
let ativadorFire = true;
const MARGIN_DOOR_COLLISION = 10;
let correctAnswer = false;
let popupShown = { computer: false, door: false, lost: false }; 
let fase = 1;

function showPopup(nome, fase, type) {
  console.log(fase);
  const overlay = document.createElement('div');
  overlay.style.position = 'fixed';
  overlay.style.top = '0';
  overlay.style.left = '0';
  overlay.style.width = '100vw';
  overlay.style.height = '100vh';
  overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
  overlay.style.zIndex = '999';
  overlay.style.display = 'flex';
  overlay.style.alignItems = 'center';
  overlay.style.justifyContent = 'center';
  document.body.appendChild(overlay);

  const popupContainer = document.createElement('div');
  popupContainer.classList.add('popup-content');
  overlay.appendChild(popupContainer);

  let arquivo = fase === 0 ? nome : `popups/popup${fase}.html`;

  fetch(arquivo)
    .then(response => {
      if (!response.ok) throw new Error('Arquivo não encontrado');
      return response.text();
    })
    .then(html => {
      popupContainer.innerHTML = html;

      const feedbackElement = popupContainer.querySelector("#feedback");
      if (feedbackElement) {
        const options = popupContainer.querySelectorAll('.option');
        options.forEach(option => {
          option.addEventListener('click', () => {
            if (option.id === "correta") {
              correctAnswer = true;
              feedbackElement.textContent = "Correto! Parabéns!";
              feedbackElement.style.color = "lightgreen";
              showGameFeedback("Correto! Parabéns!", "lightgreen");
            } else {
              correctAnswer = false;
              feedbackElement.textContent = "Incorreto! Tente novamente.";
              feedbackElement.style.color = "red";
              showGameFeedback("Incorreto! Tente novamente.", "red");
            }

            setTimeout(() => {
              closePopup(type); // Fecha o popup com base no tipo
            }, 2000);
          });
        });
      }
    })
    .catch(error => {
      console.error('Erro ao carregar o popup:', error);
      popupContainer.innerHTML = '<p>Erro ao carregar o conteúdo.</p>';
    });
}

function closePopup(type) {
  const overlay = document.querySelector('div[style*="z-index: 999"]');
  if (overlay) overlay.remove();

  if (type === 'door' && correctAnswer) {
    console.log('Abrindo a porta...');
    player.velocity.x = 0;
    player.velocity.y = 0;
    player.preventInput = true;
    player.switchSprite('enterDoor');
    doors[0].play();

    setTimeout(() => {
      player.preventInput = false;
      console.log('Porta aberta!');
    }, 2000);
  } else if (type === 'lost') {
    setTimeout(() => {
      location.reload(); 
      isCollidingEnabled = true; 
    }, 5000); 
  } 
  isCollidingEnabled = true; 
  popupShown[type] = false; 
  
}

function showGameFeedback(message, color) {
  const feedbackElement = document.querySelector("#feedback");
  if (feedbackElement) {
    feedbackElement.textContent = message;
    feedbackElement.style.color = color;
  }
}

// Detecção de colisões e interação com teclas
window.addEventListener('keydown', (event) => {
  if (player.preventInput) return;

  if (event.key === 'Enter' && isNearComputer && !popupShown.computer) {
    popupShown.computer = true;
    showPopup('popup.html', level || 0, 'computer');
  }

  if (event.key === 'Enter' && isNearApagador) {
    fires.forEach(fire => fire.startExtinguishing());
  }

  switch (event.key) {
    case 'w':
      for (let door of doors) {
        if (isColliding(player, door, MARGIN_DOOR_COLLISION) && !popupShown.door) {
          popupShown.door = true;
          showPopup(`questions/question${level}.html`, 0, 'door');
          return;
        }
      }
      if (player.velocity.y === 0) player.velocity.y = -25;
      break;
    case 'a':
      keys.a.pressed = true;
      break;
    case 'd':
      keys.d.pressed = true;
      break;
  }
});

window.addEventListener('keyup', (event) => {
  switch (event.key) {
    case 'a':
      keys.a.pressed = false;
      break;
    case 'd':
      keys.d.pressed = false;
      break;
  }
});

function isColliding(rect1, rect2, margin = 0) {
  return (
    rect1.hitbox.position.x < rect2.position.x + rect2.width - margin &&
    rect1.hitbox.position.x + rect1.hitbox.width > rect2.position.x + margin &&
    rect1.hitbox.position.y < rect2.position.y + rect2.height - margin &&
    rect1.hitbox.position.y + rect1.hitbox.height > rect2.position.y + margin
  );
}


function checkPlayerFireCollision() {
  if (ativadorFire && isCollidingEnabled) {
    fires.forEach((fire) => {
      if (fire.opacity > 0 && isColliding(player, fire, 10) && !popupShown.lost) {
        popupShown.lost = true;
        showPopup('lost.html', 0, 'lost');
        isCollidingEnabled = false; 
      }
    });
  }
}

function checkPlayerEnergyCollision() {
  energies.forEach((energy) => {
    if (isColliding(player, energy, 10) && !popupShown.lost) {
      popupShown.lost = true;
      showPopup('lost.html', 0, 'lost');
    }
  });
}

function closeCard() {
  // Envia um evento para informar ao jogo que o popup deve ser fechado
  if (window.parent && window.parent.closePopup) {
      window.parent.closePopup();
  }
} 
