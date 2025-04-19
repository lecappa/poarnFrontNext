<template>
  <h1>HOME</h1>
  <character-informations></character-informations>
  <character-class></character-class>
  <character-characteristics></character-characteristics>
  <character-skills></character-skills>
  <character-saving-throws></character-saving-throws>
  <character-life-points></character-life-points>
  <character-skills-mastery></character-skills-mastery>
</template>

<script lang="js" setup>

definePageMeta({
  middleware: 'auth',
  layout: 'connected'
})
await callCharacterData();
getClassSkills();
</script>