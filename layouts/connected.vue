<template>
  <nav class="main-nav">
    <ul role="menu">
      <li>
        <nuxt-link to="/character/informations">Général</nuxt-link>
      </li>
      <li>
        <nuxt-link to="/character/fiche">Fiche</nuxt-link>
      </li>
      <li>
        <nuxt-link to="/character/competences">Compétences</nuxt-link>
      </li>
      <li>
        <nuxt-link to="/character/combats">Combats</nuxt-link>
      </li>
      <li>
        <nuxt-link to="/character/possessions">Possessions</nuxt-link>
      </li>
      <li v-if="magicClass[0]">
        <nuxt-link to="/character/spells">Sorts</nuxt-link>
      </li>
      <li>
        <nuxt-link to="/character/notes">Notes</nuxt-link>
      </li>
    </ul>
  </nav>
  <div class="container">
    <slot/>
  </div>
</template>
<script setup lang="js">
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

await callCharacterData();
getClassSkills();
const magicClass = useState('magicClass', () => canUseMagic());
</script>
