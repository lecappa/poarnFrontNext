<template>

  <section v-if="data" class="square-section">
    <h4>Caractéristiques</h4>
    <ul class="characteristics-grid">
      <li v-for="(carac, key) in characteristics" :key="key">
        <span> {{ carac.characteristics_name }}  <input type="number" min="0" max="23" v-model="carac.characteristics_value" class="characteristics_input"></span>
        <b>+ {{ useCharacteristicsModifiers(carac.characteristics_value) }}</b>
      </li>
      <li class="bg-color">
        <span>Bonus de maîtrise</span>
        <b>+{{ getMasteryBonus() }}</b>
      </li>
    </ul>
  </section>
</template>
<script setup lang="js">
const data = useCharacterData();
const characteristics = ref(data.value.characteristics);
</script>