<template>
  <section v-if="data" class="square-section">
    <h4>Informations</h4>
    <ul class="listing">

      <li class="listing-item">
        Joueur  <input type="text" class="invisible_input" v-model="information.player">
      </li>
      <li class="listing-item">
        Nom  <input type="text" class="invisible_input" v-model="information.name">
      </li>
      <li class="listing-item">
        Race <input type="text" class="invisible_input" v-model="information.race">
      </li>
      <li class="listing-item">
        Niveau global <input type="number" min="1" max="23" class="invisible_input" v-model="information.main_level">
      </li>
    </ul>
  </section>
</template>
<script setup lang="js">
const data = useCharacterData();
const information = ref(data.value.informations);
</script>