<template>
  <section v-if="data" class="square-section">
    <div class="square-section__header">
      <h4>Points de vie</h4>
      <button class="btn btn-small" v-if="changeObject" @click="updateData()">Valider</button>
    </div>
    <ul class="listing row">
      <li class="col-lg-12">
        <div class="listing-item">
          <p>
            Points de vie actuel</p> <input type="number" min="0" class="invisible_input" v-model="life_points.current" @input="changeObject=true">
        </div>
      </li>
      <li class="col-lg-12">
        <div class="listing-item">
          <p>Points de vie max</p> <input type="number" min="0" class="invisible_input" v-model="life_points.max" @input="changeObject=true">
        </div>
      </li>
    </ul>
  </section>
</template>
<script setup lang="js">
const data = useCharacterData();
const life_points = ref(data.value.life_points);
const {update} = useStrapi();
const changeObject = ref(false);
const updateData = async () => {
  const { id, ...cleanData } = life_points.value;
  await update('characters', data.value.documentId, {
    life_points: cleanData
  });
  changeObject.value = false;
}
</script>