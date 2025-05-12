<template>
  <div class="row">
    <div class="col-lg-8">
      <character-possessions></character-possessions>
    </div>
    <div class="col-lg-4">
      <character-coins></character-coins>
    </div>
  </div>
</template>

<script lang="js" setup>
await callCharacterData();
definePageMeta({
  middleware: 'auth',
  layout: 'connected'
})

</script>