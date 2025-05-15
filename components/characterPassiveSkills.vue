<template>

  <section v-if="characteristics" class="square-section">
    <div class="square-section__header">
      <h4>Scores passives</h4>
    </div>

    <ul class="listing">
      <li v-for="(carac, key) in characteristics" :key="key">
        <div class="listing-item">
          {{ carac.characteristics_name }} passive
          <b class="add-line">{{ isSavingMastered(carac) }}</b>
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
      result = 10 + (getMasteryBonus() + useCharacteristicsModifiers(carac.characteristics_value));
    }
    else {
      result = 10 + useCharacteristicsModifiers(carac.characteristics_value);
    }
  })
  return result
}


</script>