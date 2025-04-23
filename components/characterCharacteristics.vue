<template>

  <section v-if="data" class="square-section">
    <div class="square-section__header">
      <h4>Caractéristiques</h4>
      <button class="btn btn-small" v-if="changeObject" @click="updateData()">Valider</button>
    </div>
      <ul class="characteristics-grid">
        <li v-for="(carac, key) in characteristics" :key="key">
          <span> {{ carac.characteristics_name }}  <input type="number" min="0" max="23" v-model="carac.characteristics_value" class="characteristics_input"  @input="changeObject=true"></span>
          <b>+ {{ useCharacteristicsModifiers(carac.characteristics_value) }}</b>
        </li>
        <li class="bg-color">
          <span>Bonus de maîtrise</span>
          <b>+{{ getMasteryBonus() }}</b>
        </li>
        <li class="bg-color">
          <span>Classe d'armure</span>
          <b>13</b>
        </li>
      </ul>
  </section>
</template>
<script setup lang="js">
const data = useCharacterData();
const characteristics = ref(data.value.characteristics);
const {update} = useStrapi();
const changeObject = ref(false);


const updateData = async () => {
  await update('characters', data.value.documentId, {
    characteristics: characteristics.value.map(({ characteristics_name, characteristics_value,characteristics_slug }) => ({ characteristics_name, characteristics_value,characteristics_slug}))
  });
  changeObject.value = false;
}
</script>