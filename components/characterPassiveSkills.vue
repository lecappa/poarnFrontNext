<template>

  <section v-if="passiveScores" class="square-section">
    <div class="square-section__header">
      <h4>Scores passives</h4>
    </div>

    <ul class="listing">
      <li v-for="(i, key) in passiveScores" :key="key">
        <div class="listing-item">
          {{ i.name }}
          <b class="add-line">{{ i.value.value }}</b>
          <button class="bubble-information"
                  v-tooltip="{
                    content: i.description,
                    placement : 'left',
                    triggers: ['click', 'hover'],
                  }">
            ?
          </button>
        </div>
      </li>
    </ul>
  </section>
</template>
<script setup lang="js">
const data = useCharacterData();
const characteristics = reactive(data.value.characteristics);
const character_class = reactive(data.value.class);

//TEST
const isSavingMastered = (carac) => {
  let result = useCharacteristicsModifiers(carac.characteristics_value);
  character_class.forEach((element) => {
    if (element.jetsDeSauvegarde.includes(carac.characteristics_name)) {
      result = 10 + (getMasteryBonus() + useCharacteristicsModifiers(carac.characteristics_value));
    } else {
      result = 10 + useCharacteristicsModifiers(carac.characteristics_value);
    }
  })
  return result
}

const passiveScores = ref( [
  {
    name: "Perception passive",
    value: getSkillByName('Perception'),
    description: "Utilisée pour repérer automatiquement des créatures, pièges ou anomalies sans faire de jet actif."
  },
  {
    name: "Investigation passive",
    value: getSkillByName('Investigation'),
    description: "Permet de remarquer des détails ou résoudre des indices cachés sans analyse active."
  },
  {
    name: "Perspicacité passive",
    value: getSkillByName('Perspicacité'),
    description: "Utilisée pour percevoir les émotions ou intentions d'une personne sans avoir à poser de questions."
  },
  {
    name: "Discrétion passive",
    value: getSkillByName('Discrétion'),
    description: "Utilisée (surtout par le MJ) pour déterminer à quel point un PNJ ou monstre est furtif sans jet actif."
  }
]);

</script>