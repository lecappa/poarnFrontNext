<template>
  <div class="row">
    <div class="col-lg-8">
     <character-possessions></character-possessions>
  </div>
  </div>
</template>

<script lang="js" setup>
await callCharacterData();
const openClassDialog = ref(false);
const data = useCharacterData();
const possessions = ref(data.value.possessions);
definePageMeta({
  middleware: 'auth',
  layout: 'connected'
})

</script>