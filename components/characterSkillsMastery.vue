<template>
  <section v-if="data" class="square-section">
    <h4>Compétences maitrisées</h4>
    <ul class="listing">
      <li v-for="(info, key) in classSkillsMastery" :key="key" class="listing-item">
        {{ info }}
      </li>
      <li v-for="(info, key) in otherClassSkillsMastery" :key="key" class="listing-item">
        {{ info.name }}
      </li>
    </ul>

  </section>
</template>
<script setup lang="js">

import {getClassSkillsMastery} from "~/composables/useCharacterData.js";

const data = useCharacterData();
const otherClassSkillsMastery = ref(data.value.mastery);
const classSkillsMastery = getClassSkillsMastery();
</script>