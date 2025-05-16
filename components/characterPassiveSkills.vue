<template>
  <section v-if="passiveScores" class="square-section">
    <div class="square-section__header">
      <h4>Scores passives</h4>
    </div>

    <ul class="listing">
      <li v-for="(i, key) in passiveScores" :key="key">
        <div class="listing-item">
          {{ i.name }}
          <b class="add-line">{{ i.score }}</b>
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
import { computed } from 'vue';
const { getSkillByName } = useSkills();

const passiveScores = computed(() => [
  {
    name: "Perception passive",
    score: getSkillByName('Perception').value.score,
    description: "Utilisée pour repérer automatiquement des créatures, pièges ou anomalies sans faire de jet actif."
  },
  {
    name: "Investigation passive",
    score: getSkillByName('Investigation').value.score,
    description: "Permet de remarquer des détails ou résoudre des indices cachés sans analyse active."
  },
  {
    name: "Perspicacité passive",
    score: getSkillByName('Perspicacité').value.score,
    description: "Utilisée pour percevoir les émotions ou intentions d'une personne sans avoir à poser de questions."
  },
  {
    name: "Discrétion passive",
    score: getSkillByName('Discrétion').value.score,
    description: "Utilisée (surtout par le MJ) pour déterminer à quel point un PNJ ou monstre est furtif sans jet actif."
  }
])

</script>