<template>

  <section v-if="data">
    <h3>Caractéristiques</h3>
    <ul>
      <li v-for="(carac, key) in characteristics" :key="key">
        {{ carac.characteristics_name }} - {{ carac.characteristics_value }} (
        <b>+ {{ useCharacteristicsModifiers(carac.characteristics_value) }})</b>
      </li>
    </ul>
  </section>
</template>
<script setup lang="js">
const data = useCharacterData();
const characteristics = ref(data.value.characteristics);
</script>