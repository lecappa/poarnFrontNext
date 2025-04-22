<template>
  <section v-if="data" class="square-section">
    <h4>Skills</h4>
    <ul class="row listing">
      <li v-for="(skill, key) in character_data_skills" :key="key" class="col-xs-12 col-sm-12 col-md-6 col-lg-6">
        <div class="listing-item">
          <label :for="key + '-0'">
            <input class="form-check-input" type="checkbox" :id="key + '-0'" v-model="skill.mastery">
            <input class="form-check-input" type="checkbox" :id="key + '-0'" v-model="skill.expertise"
                   v-if="skill.mastery">
            {{ skill.name }} ({{ skill.ability }})
          </label> <b class="add-line">+ {{ skillModifier(skill) }}</b>
        </div>
      </li>
    </ul>
  </section>
</template>
<script lang="js" setup>
const data = useCharacterData();
const character_data_skills = ref(getCharacterDataSkills());
const characteristics = ref(data.value.characteristics);

const skillModifier = (skill) => {
  const carac = characteristics.value.filter((i) => i.characteristics_slug === skill.ability);
  if (skill.mastery && skill.expertise) {
    return useCharacteristicsModifiers(carac[0].characteristics_value) + (getMasteryBonus() * 2);
  }

  if (skill.mastery) {
    return useCharacteristicsModifiers(carac[0].characteristics_value) + getMasteryBonus();
  } else {
    return useCharacteristicsModifiers(carac[0].characteristics_value);
  }
}

</script>