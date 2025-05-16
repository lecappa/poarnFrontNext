<template>
  <nav class="main-nav">
    <a href="#" class="cd-modal-trigger" type="button">
      <img src="/dd-logo.svg" alt="Logo" height="50">
    </a>
    <ul role="menu">
      <li>
        <nuxt-link to="/character/informations"><span>Général</span> <i class="fa-solid fa-circle-user"></i></nuxt-link>
      </li>
      <li>
        <nuxt-link to="/character/fiche"><span>Fiche</span> <i class="fa-solid fa-file"></i></nuxt-link>
      </li>
      <li>
        <nuxt-link to="/character/competences"><span>Compétences</span> <i class="fa-solid fa-book-skull"></i>
        </nuxt-link>
      </li>
      <li>
        <nuxt-link to="/character/combats"><span>Combats</span> <i class="fa-solid fa-shield"></i></nuxt-link>
      </li>
      <li>
        <nuxt-link to="/character/possessions"><span>Possessions</span> <i class="fa-solid fa-folder-open"></i>
        </nuxt-link>
      </li>
      <li v-if="magicClass[0]">
        <nuxt-link to="/character/spells"><span>Sorts</span> <i class="fa-solid fa-wand-magic-sparkles"></i></nuxt-link>
      </li>
      <li>
        <nuxt-link to="/character/notes"><span>Notes</span> <i class="fa-solid fa-book-open"></i></nuxt-link>
      </li>
    </ul>
  </nav>
  <div class="container">
    <slot/>
  </div>

  <div class="cd-modal">
    <div class="modal-content">
      <h1><img src="/logo.svg" height="120" class="mb-5" alt="">
      </h1>
      <ul class="main-link">
        <li>
          <nuxt-link to="/journal/" class="modal-close-link">Journal de campagne</nuxt-link>
        </li>
        <li>
          <nuxt-link to="/character/fiche" class="modal-close-link">Fiche de personnage</nuxt-link>
        </li>
        <li>
          <nuxt-link to="/equipements/" class="modal-close-link">Armes et armures</nuxt-link>
        </li>
        <li>
          <nuxt-link to="/dons/" class="modal-close-link">Dons</nuxt-link>
        </li>
        <li>
          <nuxt-link to="/histoires" class="modal-close-link">Les terres très anciennes</nuxt-link>
        </li>
        <li>
          <nuxt-link to="#" @click="disconnection">Déconnexion</nuxt-link>
        </li>
      </ul>
    </div>
    <a href="#" class="modal-close">Fermer</a>
  </div>
  <div class="cd-transition-layer">
    <div class="bg-layer"></div>
  </div>
</template>
<script setup lang="js">
import {useSpells} from "~/composables/useSpells.js";

const {logout} = useStrapiAuth();
const router = useRouter();

definePageMeta({
  middleware: 'auth',
  layout: 'connected'
})
const disconnection = () => {
  logout();
  router.push('/')
}
const {callCharacterData} = useCharacter();
const {getSkills} = useSkills();
const {canUseMagic} = useSpells();
await callCharacterData()
getSkills();
const magicClass = useState('magicClass', () => canUseMagic());

onMounted(() => {
  const modalTrigger = document.querySelector(".cd-modal-trigger"),
      transitionLayer = document.querySelector(".cd-transition-layer"),
      transitionBackground = transitionLayer.querySelector(".bg-layer"),
      modalWindow = document.querySelector(".cd-modal");

  function animationEndHandler() {
    const animEnd = () => {
      transitionLayer.classList.contains("closing") && (
          transitionLayer.classList.remove("closing", "opening", "visible")
      )
    };

    transitionBackground.addEventListener("animationend", animEnd),
        transitionBackground.addEventListener("webkitAnimationend", animEnd)
  }

  animationEndHandler()

  modalTrigger.addEventListener("click", e => {
    const delay = document.querySelector(".no-cssanimations") ? 0 : 600;
    e.preventDefault(),
        transitionLayer.classList.add("visible", "opening");
    setTimeout(() => {
      modalWindow.classList.add("visible")
    }, delay)
  })

  modalWindow.querySelector(".modal-close").addEventListener("click", e => {
    e.preventDefault(),
        transitionLayer.classList.add("closing"),
        modalWindow.classList.remove("visible")
  })

  modalWindow.querySelectorAll(".modal-close-link").forEach(el => {
    el.addEventListener('click', function (e) {
      transitionLayer.classList.add("closing"),
          modalWindow.classList.remove("visible")
    });
  });
})
</script>
