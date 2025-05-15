<template>
  <character-fight-infos></character-fight-infos>
  <character-life-points></character-life-points>
  <character-weapons></character-weapons>
  <character-armors></character-armors>
</template>

<script lang="js" setup>
definePageMeta({
  middleware: 'auth',
  layout: 'connected'
})

</script>