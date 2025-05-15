<template>
  <section v-if="data" class="square-section">
    <div class="square-section__header">
      <h4>Compétences</h4>
      <button class="btn btn-small" v-if="changeObject" @click="updateData()">Valider</button>
    </div>
    <ul class="row listing">
      <li v-for="(skill, key) in data_skills" :key="key" class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
        <div class="listing-item">
          <label :for="key + '-0'">
            <input class="form-check-input" type="checkbox" :id="key + '-0'" v-model="skill.mastery"
                   @change="changeObject=true">
            <template v-if="hasExpertCapacity(skill)">
              <input class="form-check-input" type="checkbox" :id="key + '-0'" v-model="skill.expertise"
                     v-if="skill.mastery" @change="changeObject=true">
            </template>
            {{ skill.name }} ({{ skill.ability }})
          </label>
          <b class="add-line">+{{ skillModifier(skill) }}</b>
          <button class="bubble-information"
                  v-tooltip="{
                    content: skill.description,
                    placement : 'left',
                    triggers: ['click', 'hover'],
                  }">
            ?
          </button>
        </div>
      </li>
    </ul>
  </section>

  <template v-if="displayBubble">
    <div class="bubble-box">
      <div class="bubble-box__content">
        <button @click="closeBubble()">×</button>
        <h4>{{ bubbleText.name }}</h4>
        <p>{{ bubbleText.description }}</p>
      </div>
    </div>
  </template>

</template>
<script lang="js" setup>
const data = useCharacterData();
const data_skills = ref(getCharacterDataSkills());
const characteristics = ref(data.value.characteristics);
const capacities = ref(data.value.capacities);
const changeObject = ref(false);
const {update} = useStrapi();
const displayBubble = ref(false);
const bubbleText = ref();
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

const hasExpertCapacity = (skill) => {
  const isExpert = capacities.value.some(c => c.name.toLowerCase() === 'expertise')
  if (isExpert && skill.mastery) {
    return true;
  }
};

const updateData = async () => {
  const result = data_skills.value.filter((i) => i.mastery === true);
  await update('characters', data.value.documentId, {
    skills: result.map(({name, expertise}) => ({name, expertise}))
  });
  changeObject.value = false;
}

const openBubble = (i) => {
  displayBubble.value = true;
  bubbleText.value = i;
}

const closeBubble = () => {
  displayBubble.value = false;
  bubbleText.value = null;
}
</script>