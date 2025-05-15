<template>
  <nav class="main-nav">
    <ul role="menu">
      <li>
        <nuxt-link to="/character/informations"><span>Général</span> <i class="fa-solid fa-circle-user"></i></nuxt-link>
      </li>
      <li>
        <nuxt-link to="/character/fiche"><span>Fiche</span> <i class="fa-solid fa-file"></i></nuxt-link>
      </li>
      <li>
        <nuxt-link to="/character/competences"><span>Compétences</span> <i class="fa-solid fa-book-skull"></i></nuxt-link>
      </li>
      <li>
        <nuxt-link to="/character/combats"><span>Combats</span> <i class="fa-solid fa-shield"></i></nuxt-link>
      </li>
      <li>
        <nuxt-link to="/character/possessions"><span>Possessions</span> <i class="fa-solid fa-folder-open"></i></nuxt-link>
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
</script>
