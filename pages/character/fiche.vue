<template>
  <div class="row d-flex align-items-stretch">
    <div class="col-xs-12 col-lg-12">
      <character-characteristics></character-characteristics>
    </div>
    <div class="col-xs-12 col-lg-12">
      <character-life-points></character-life-points>
    </div>
    <div class="col-xs-12 col-lg-12 d-flex align-items-stretch">
      <character-skills></character-skills>
    </div>
    <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 align-items-stretch">
      <character-saving-throws></character-saving-throws>
    </div>
  </div>

</template>

<script lang="js" setup>

definePageMeta({
  middleware: 'auth',
  layout: 'connected'
})

await callCharacterData();
getClassSkills();
</script>