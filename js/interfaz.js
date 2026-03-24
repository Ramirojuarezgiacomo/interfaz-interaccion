function stopIframesInSection(section) {
  if (!section) return;

  section.querySelectorAll('iframe').forEach(iframe => {

    /* 🚫 NO reiniciar Canva */
    if (iframe.src.includes("canva.com")) return;

    const src = iframe.getAttribute('src');
    iframe.setAttribute('src', '');
    iframe.setAttribute('src', src);
  });
}

function openTab(tabId) {

  const contents = document.querySelectorAll('.tab-content');
  const buttons = document.querySelectorAll('.tab-btn');

  const activeSection = document.querySelector('.tab-content.active');
  stopIframesInSection(activeSection);

  contents.forEach(c => c.classList.remove('active'));
  buttons.forEach(b => b.classList.remove('active'));

  const section = document.getElementById(tabId);
  if (!section) return;

section.classList.add('active');

/* =========================
   CONTROL SWIPER POR TAB
========================= */

if (tabId === "tp0") {
  setTimeout(() => {
    initMortalisSliders();
  }, 100);
} else {
  destroyMortalisSliders();
}

  const button = document.querySelector(`[onclick="openTab('${tabId}')"]`);
  if (button) button.classList.add('active');

  /* 🔥 cambiar fondo del body */
  document.body.className = '';
  document.body.classList.add(`bg-${tabId}`);

  /* 🤖 MOSTRAR ROBOT SOLO EN TP3 */
  const robot = document.getElementById("robot");

  if (robot) {
    if (tabId === "tp4") {
      robot.style.display = "block";
    } else {
      robot.style.display = "none";
    }
  }

  window.location.hash = tabId;
}

/* cargar tab inicial */
document.addEventListener('DOMContentLoaded', () => {
  const hash = window.location.hash.replace('#', '');

  if (hash && document.getElementById(hash)) {
    openTab(hash);
  } else {
    openTab('tp0');
  }
});




/* =========================
   ANIMACIÓN SALUDO
========================= */

const saludo = document.getElementById("saludo");

const frames = [
  "../img/robot/manitosaluda00.png",
  "../img/robot/manitosaluda01.png"
];

let frame = 0;

let robotAnimation = setInterval(() => {
  frame = (frame + 1) % frames.length;
  saludo.src = frames[frame];
}, 300);


/* =========================
   INTERACCIÓN ROBOT
========================= */

const robotEl = document.getElementById("robot");
const handFront = document.getElementById("handFront");

const robotHappy = document.getElementById("robotHappy");
const handUp = document.getElementById("handUp");
const handUpLeft = document.getElementById("handUpLeft");
const message = document.getElementById("robotMessage");

let robotActivated = false;
let messageVisible = false;

robotEl.addEventListener("click", () => {

  /* ========= PRIMER CLICK ========= */
  if (!robotActivated) {

    robotActivated = true;

    clearInterval(robotAnimation);

    /* ocultar saludo */
    saludo.style.display = "none";
    handFront.style.display = "none";

    /* mostrar robot feliz */
    robotHappy.style.display = "block";
    handUp.style.display = "block";
    handUpLeft.style.display = "block";

    /* mostrar texto */
    message.style.display = "block";
    messageVisible = true;

    return;
  }

  /* ========= SIGUIENTES CLICKS ========= */
  messageVisible = !messageVisible;

  message.style.display =
    messageVisible ? "block" : "none";

});


/* =========================
   SWIPER MORTALIS
========================= */

let swiperCristal = null;
let swiperLanding = null;

function initMortalisSliders() {

  if (swiperCristal || swiperLanding) return;

  swiperCristal = new Swiper(".slider-cristal", {
    loop: true,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false
    },
    pagination: {
      el: ".slider-cristal .swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".slider-cristal .swiper-button-next",
      prevEl: ".slider-cristal .swiper-button-prev",
    },
  });

  swiperLanding = new Swiper(".slider-landing", {
    loop: true,
    autoplay: {
      delay: 4500,
      disableOnInteraction: false
    },
    pagination: {
      el: ".slider-landing .swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".slider-landing .swiper-button-next",
      prevEl: ".slider-landing .swiper-button-prev",
    },
  });

  console.log("✅ Swipers inicializados en TP0");
}

function destroyMortalisSliders() {
  if (swiperCristal) {
    swiperCristal.destroy(true, true);
    swiperCristal = null;
  }

  if (swiperLanding) {
    swiperLanding.destroy(true, true);
    swiperLanding = null;
  }
}


/* =========================
   ABRE IMAGENES
========================= */


document.addEventListener("click", (e) => { 
  const img = e.target.closest("img"); 
  if (!img) return;

  // ignorar imágenes dentro del robot
  if (img.closest("#robot")) return;


    // ignorar imágenes dentro del robot
  if (img.closest("#regresar")) return;

  window.open(img.src, "_blank"); 
});