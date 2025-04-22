<template>
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
