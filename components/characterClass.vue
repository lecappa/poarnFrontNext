<template>
  <section>
    <h3>Classe</h3>
    <ul>
      <li v-for="(classInfos, key) in character_class" :key="key">
        Classe : {{ classInfos.class_name }} - Niveau : {{ classInfos.class_level }}<br>
        Dés de vie : {{ classInfos.deVie }} - maitrises : {{ classInfos.maitrises }} - jets de sauvegarde : {{classInfos.jetsDeSauvegarde}}
      </li>
    </ul>
  </section>
</template>
<script setup lang="js">
const data = useCharacterData();
const character_class = ref(data.value.class);
</script>