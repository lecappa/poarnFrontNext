<template>
  <nav class="main-nav">
    <ul role="menu">
      <li>
        <nuxt-link to="informations">Général</nuxt-link>
      </li>
      <li>
        <nuxt-link to="fiche">Fiche</nuxt-link>
      </li>
      <li>
        <nuxt-link to="competences">Compétences</nuxt-link>
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


</script>
