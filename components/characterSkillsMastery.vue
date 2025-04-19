<template>
  <section v-if="data">
    <h3>Compétences maitrisées</h3>
    <ul style="margin: 0">
      <li v-for="(info, key) in classSkillsMastery" :key="key">
        {{ info }}
      </li>
    </ul>
    <ul style="margin: 0">
    <li v-for="(info, key) in otherClassSkillsMastery" :key="key">
        {{ info.name }}
      </li>
    </ul>

  </section>
</template>
<script setup lang="js">

import {getClassSkillsMastery} from "~/composables/useCharacterData.js";

const data = useCharacterData();
const otherClassSkillsMastery = ref(data.value.mastery);
const classSkillsMastery  = getClassSkillsMastery();
</script>