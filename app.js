document.addEventListener("DOMContentLoaded", function () {
  const heart = document.createElement('div');
  heart.classList.add('heart');
  heart.innerText = '❤';

  const heartsContainer = document.querySelector('.hearts-container');
  if (heartsContainer) heartsContainer.appendChild(heart);

  heart.addEventListener('click', function () {
    console.log("Haz hecho clic en el corazón!");
  });

  console.log("Elemento .heart creado y eventListener agregado.");
});

// Partículas de explosión
function explodeHeart(x, y) {
  const shapes = ['❤', '✨', '⭐', '❣', '🌸', '💖', '🌟'];
  for (let i = 0; i < 15; i++) {
    const particle = document.createElement("div");
    particle.classList.add("particle");
    particle.textContent = shapes[Math.floor(Math.random() * shapes.length)];
    particle.style.left = `${x}px`;
    particle.style.top = `${y}px`;
    particle.style.position = 'fixed';
    particle.style.zIndex = 9999;
    particle.style.pointerEvents = 'none';
    particle.style.color = heartColors[Math.floor(Math.random() * heartColors.length)];
    particle.style.fontSize = (Math.random() * 20 + 20) + 'px';

    document.body.appendChild(particle);

    const angle = Math.random() * 2 * Math.PI;
    const distance = 80 + Math.random() * 60;
    const dx = Math.cos(angle) * distance;
    const dy = Math.sin(angle) * distance;

    particle.animate([
      { transform: "translate(0, 0)", opacity: 1 },
      { transform: `translate(${dx}px, ${dy}px) scale(0.5)`, opacity: 0 }
    ], {
      duration: 1000 + Math.random() * 300,
      easing: "ease-out"
    });

    setTimeout(() => particle.remove(), 1300);
  }
}

// Estilos para la animación de click
document.head.insertAdjacentHTML('beforeend', `
  <style>
    @keyframes pop {
      0% { transform: scale(1); opacity: 1; }
      50% { transform: scale(2); opacity: 0.8; }
      100% { transform: scale(0); opacity: 0; }
    }
    .clicked {
      animation: pop 0.3s ease forwards;
    }
    @keyframes bounce {
      0%, 20%, 50%, 80%, 100% {
        transform: translateY(0);
      }
      40% {
        transform: translateY(-10px);
      }
      60% {
        transform: translateY(-5px);
      }
    }
    .bounce {
      animation: bounce 0.6s;
    }
  </style>
`);

// Sonido pop
const popSound = new Audio('audio/sonido.mp3');
popSound.volume = 0.5;

// Enlaces con animación y confirmación
const links = document.querySelectorAll('.link');
links.forEach(link => {
  link.addEventListener('click', (event) => {
    event.preventDefault();

    let confirmacion = confirm(`Gracias por visitar el enlace de ${link.innerText}`);

    link.classList.add('bounce');
    setTimeout(() => link.classList.remove('bounce'), 600);


    const confirmacion = confirm(`Gracias por visitar el enlace de ${link.innerText}`);
    if (confirmacion) {
      alert('¡Gracias por seguir el enlace! 😊');
      window.location.href = link.href;
    } else {
      alert('¿Por qué cancelaste? 😢');
    }
  });
});

// Evento en el título
let title = document.getElementById('title');
const title = document.getElementById('title');
if (title) {
  title.addEventListener('click', () => {
    alert('¡Has cliqueado el título!');
  });
}

// Corazones infinitos flotando
const heartColors = ['#ff4d4d', '#ff66cc', '#ffcc00', 'blue', '#66ff66', '#ff9966', '#8a2be2'];
const heartShapes = ['❤', '🌸', '⭐', '✨', '💖', '🌟', '❣'];
const heartsContainer = document.querySelector('.hearts-container');

function createHeart() {
  const heart = document.createElement('div');
  heart.className = 'heart';
  heart.innerText = heartShapes[Math.floor(Math.random() * heartShapes.length)];
  heart.style.left = Math.random() * 100 + 'vw';
  heart.style.animationDuration = (Math.random() * 3 + 3) + 's';
  heart.style.fontSize = (Math.random() * 30 + 40) + 'px';
  heart.style.color = heartColors[Math.floor(Math.random() * heartColors.length)];

  heart.addEventListener('click', () => {
    popSound.currentTime = 0;
    popSound.play();
    const rect = heart.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    explodeHeart(x, y);
    heart.classList.add('clicked');
    setTimeout(() => heart.remove(), 300);
  });

  if (heartsContainer) heartsContainer.appendChild(heart);

  setTimeout(() => {
    if (!heart.classList.contains('clicked')) heart.remove();
  }, 5000);
}

setInterval(createHeart, 300);

// Crear corazón en la posición del clic
document.addEventListener('click', (e) => {
  const heart = document.createElement('div');
  heart.className = 'heart';
  heart.innerText = heartShapes[Math.floor(Math.random() * heartShapes.length)];
  heart.style.left = `${e.clientX}px`;
  heart.style.top = `${e.clientY}px`;
  heart.style.position = 'absolute';
  heart.style.animation = 'pop 0.6s ease forwards';
  heart.style.color = heartColors[Math.floor(Math.random() * heartColors.length)];
  heart.style.fontSize = (Math.random() * 20 + 20) + 'px';
  heart.style.zIndex = 1000;
  heart.style.pointerEvents = 'none';

  popSound.currentTime = 0;
  popSound.play();

  document.body.appendChild(heart);
  setTimeout(() => heart.remove(), 600);
});
//mensaje 
setInterval(() => {
  const parrafo = document.getElementById("mensaje")
  parrafo.style.display =(parrafo.style.display ==='none')?
  'block' : 'none';

},5000)

