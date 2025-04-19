<template>
  <h3>Skills</h3>
  <section v-if="data">
    <ul>
      <li v-for="(skill, key) in skills" :key="key">
        {{ skill.name }} ({{ skill.ability }}) - +{{ skillModifier(skill) }}
      </li>
    </ul>
  </section>
</template>
<script lang="js" setup>
import allSkills from "../public/skills.json";

const skills = ref(allSkills);
const data = useCharacterData();
const character_skills = reactive(data.value.skills);
const character_characteristics = ref(data.value.characteristics);

const skillModifier = (skill) => {
  const result = character_characteristics.value.filter((i) => i.characteristics_slug === skill.ability);
  let mastered = character_skills.find((element) => element.name === skill.name);

  if (character_skills.find((element) => element.name === skill.name)) {
    if (mastered.expertise) {
      return useCharacteristicsModifiers(result[0].characteristics_value) + (getMasteryBonus() * 2);
    }
    return useCharacteristicsModifiers(result[0].characteristics_value) + getMasteryBonus();
  }
  return useCharacteristicsModifiers(result[0].characteristics_value);
}

</script>