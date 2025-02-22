// Animación para resaltar enlaces al hacer clic
const links = document.querySelectorAll('.link');

links.forEach(link => {
  link.addEventListener('click', (event) => {
    event.preventDefault(); // Evita que el enlace se abra antes del confirm()

    let confirmacion = confirm(`Gracias por visitar el enlace de ${link.innerText}`);

    if (confirmacion) {
      alert('¡Gracias por seguir el enlace! 😊');
      window.location.href = link.href; // Ahora sí se redirige al enlace
    } else {
      alert('¿Por qué cancelaste? 😢');
    }
  });
});

// Animación de rebote
document.head.insertAdjacentHTML('beforeend', `
<style>
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
</style>
`);

// Evento en el título
let title = document.getElementById('title');
if (title) {
  title.addEventListener('click', () => {
    alert('¡Has cliqueado el título!');
  });
}
