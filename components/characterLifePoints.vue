<template>
  <section v-if="data">
    <h3>Points de vie</h3>
    <ul>
      <li v-for="(info, key) in data.life_points" :key="key">
        {{ key }} : {{ info }}
      </li>
    </ul>
  </section>
</template>
<script setup lang="js">
const data = useCharacterData();
const character_class = ref(data.value.class);
</script>