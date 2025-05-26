<template>
  <section v-if="data" class="square-section">
    <div class="square-section__header">
      <h4>Points de vie</h4>
      <button class="btn btn-small" v-if="changeObject" @click="updateData()">Valider</button>
    </div>
    <ul class="listing row">
      <li class="col" v-if="isMonk">
        <div class="listing-item">
          <div>
            <p>Points de KI</p>
          </div>
          <div style="text-align: right">
            <input type="number" min="0" :max="monkLevel" class="invisible_input" v-model="currentKiPoints" @input="changeObject=true"> / 5
          </div>
        </div>
      </li>
      <li class="col">
        <div class="listing-item">
          <p>
            Points de vie actuel</p> <input type="number" min="0" class="invisible_input" v-model="life_points.current" @input="changeObject=true">
        </div>
      </li>
      <li class="col">
        <div class="listing-item">
          <p>Points de vie max</p> <input type="number" min="0" class="invisible_input" v-model="life_points.max" @input="changeObject=true">
        </div>
      </li>
    </ul>
  </section>
</template>
<script setup lang="js">
const {useCharacterData} = useCharacter();
const data = useCharacterData();
const life_points = ref(data.value.life_points);
const characterClass = ref( data.value.class);
const currentKiPoints = ref( data.value.informations.ki_points);

const {update} = useStrapi();
const changeObject = ref(false);
const updateData = async () => {
  const { id, ...cleanData } = life_points.value;
  await update('characters', data.value.documentId, {
    life_points: cleanData,
    informations: {
      ki_points : currentKiPoints.value,
    }
  });
  changeObject.value = false;
}


//MONK
const isMonk = characterClass.value.find(c => c.class_name === 'Moine');
const monkLevel = ref(0);
if (isMonk) {
  monkLevel.value = isMonk.class_level;
}
</script>