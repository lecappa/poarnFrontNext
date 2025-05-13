<template>
  <div class="row">
    <div class="col-xs-12 col-lg-6">
      <character-informations></character-informations>
    </div>
    <div class="col-xs-12 col-lg-6">
      <character-class></character-class>
    </div>
  </div>
</template>

<script lang="js" setup>

definePageMeta({
  middleware: 'auth',
  layout: 'connected'
})
</script>