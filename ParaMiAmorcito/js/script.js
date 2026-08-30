const carta = document.querySelector('.carta');
if (carta) {
  const observador = new IntersectionObserver((entradas) => {
    entradas.forEach((entrada) => {
      if (entrada.isIntersecting) {
        carta.classList.add('visible');
        observador.unobserve(carta);
      }
    });
  }, { threshold: 0.2 });
  observador.observe(carta);
}

const audio = document.getElementById('audio');
const botonAudio = document.getElementById('boton-audio');
const reproductor = document.getElementById('reproductor');

if (audio && botonAudio) {
  botonAudio.addEventListener('click', () => {
    if (audio.paused) {
      audio.play().catch(() => {});
      reproductor.classList.add('sonando');
      botonAudio.setAttribute('aria-label', 'Pausar música');
    } else {
      audio.pause();
      reproductor.classList.remove('sonando');
      botonAudio.setAttribute('aria-label', 'Reproducir música');
    }
  });
}

const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');

document.querySelectorAll('.foto img, .carta img').forEach((img) => {
  img.addEventListener('click', () => {
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightbox.classList.add('abierto');
  });
});

if (lightbox) {
  lightbox.addEventListener('click', () => {
    lightbox.classList.remove('abierto');
    lightboxImg.src = '';
  });
}

if (audio) {
  audio.play()
    .then(() => {
      reproductor.classList.add('sonando');
      botonAudio.setAttribute('aria-label', 'Pausar música');
    })
    .catch(() => {
      const iniciarConPrimerToque = () => {
        audio.play().catch(() => {});
        reproductor.classList.add('sonando');
        botonAudio.setAttribute('aria-label', 'Pausar música');
        document.removeEventListener('click', iniciarConPrimerToque);
        document.removeEventListener('touchstart', iniciarConPrimerToque);
      };
      document.addEventListener('click', iniciarConPrimerToque);
      document.addEventListener('touchstart', iniciarConPrimerToque);
    });
}