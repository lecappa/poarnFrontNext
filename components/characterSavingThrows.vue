<template>

  <section v-if="characteristics" class="square-section">
    <div class="square-section__header">
      <h4>Jets de sauvegarde</h4>
    </div>
    <ul class="listing">
      <li v-for="(carac, key) in characteristics" :key="key">
        <div class="listing-item">
          {{ carac.characteristics_name }}
          <b class="add-line">+ {{ isSavingMastered(carac) }}</b>
          <button class="bubble-information"
                  v-tooltip="{
                    content: getText(carac),
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
const {useCharacterData, getClassSkills} = useCharacter();
const data = useCharacterData();
const characteristics = reactive(data.value.characteristics);
const character_class = getClassSkills();

const isSavingMastered = (carac) => {
  let result = useCharacteristicsModifiers(carac.characteristics_value);

  character_class.forEach((element) => {
    if (element.savingThrows.includes(carac.characteristics_name)) {
      result = getMasteryBonus() + useCharacteristicsModifiers(carac.characteristics_value);
    }
  })
  return result
}


const savingThrowsText = {
  'for': 'Résister à être repoussé ou désarmé',
  'dex': 'Esquiver un piège ou un sort à zone (ex : boule de feu)',
  'con': 'Résister à un poison, maladie, ou épuisement',
  'int': 'Résister à des illusions ou sorts mentaux',
  'sag': 'Résister à la peur, au charme ou à la confusion',
  'cha': 'Résister à la possession ou à la magie d’envoûtement (ex : Banissement)'
}

const getText = (i) => {
  const slug = i.characteristics_slug;
  return savingThrowsText[slug] || 'Description non trouvée';
}

</script>