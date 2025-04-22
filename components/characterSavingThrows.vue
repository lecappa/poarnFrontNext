<template>

  <section v-if="characteristics" class="square-section">
    <h4>Jets de sauvegarde</h4>
    <ul class="listing">
      <li v-for="(carac, key) in characteristics" :key="key">
        <div class="listing-item">
          {{ carac.characteristics_name }}
          <b class="add-line">+ {{ isSavingMastered(carac) }}</b>
        </div>
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
      result = getMasteryBonus() + useCharacteristicsModifiers(carac.characteristics_value);
    }
  })
  return result
}


</script>