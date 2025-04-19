<template>

  <section v-if="characteristics">
    <h3>Jets de sauvegarde</h3>
    <ul>
      <li v-for="(carac, key) in characteristics" :key="key">
        {{ carac.characteristics_name }} -
        <b>+ {{ isSavingMastered(carac) }}</b>
      </li>
    </ul>
  </section>
</template>
<script setup lang="js">
const data = useCharacterData();
const characteristics = reactive(data.value.characteristics);
const character_class = reactive(data.value.class);


const isSavingMastered = (carac) => {
  let result = useCharacteristicsModifiers(carac.characteristics_value);
  character_class.forEach((element) => {
    if (element.jetsDeSauvegarde.includes(carac.characteristics_name)) {
      result = getMasteryBonus() + useCharacteristicsModifiers(carac.characteristics_value) ;
    }
  })
  return result
}


</script>