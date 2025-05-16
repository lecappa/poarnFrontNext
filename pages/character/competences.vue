<template>
  <div class="row d-flex align-items-stretch">
    <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 align-items-stretch">
      <character-other-skills-mastery></character-other-skills-mastery>
    </div>
    <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 align-items-stretch">
      <character-skills-mastery></character-skills-mastery>
    </div>
  </div>

</template>

<script lang="js" setup>

definePageMeta({
  middleware: 'auth',
  layout: 'connected'
})
const {callCharacterData} = useCharacter();
await callCharacterData();
</script>