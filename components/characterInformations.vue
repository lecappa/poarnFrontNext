<template>
  <section v-if="data">
    <h3>Informations</h3>
    <ul>
      <li v-for="(info, key) in data.informations" :key="key">
        {{ key }} : {{ info }}
      </li>
    </ul>

    <b>Bonus de maitrise : +{{getMasteryBonus()}}</b>
  </section>
</template>
<script setup lang="js">
const data = useCharacterData();
</script>