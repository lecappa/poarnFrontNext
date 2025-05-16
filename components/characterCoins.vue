<template>
  <section class="square-section">
    <div class="square-section__header">
      <h4>Pièces</h4>
      <button class="btn btn-small" v-if="changeObject" @click="updateData()">Valider</button>
    </div>
    <ul class="listing">
      <li class="listing-item">
        Cuivre
        <input type="text" class="invisible_input" v-model="coins.copper" @input="changeObject=true">
      </li>
      <li class="listing-item">
        Argent
        <input type="text" class="invisible_input" v-model="coins.silver" @input="changeObject=true">
      </li>
      <li class="listing-item">
        Or
        <input type="text" class="invisible_input" v-model="coins.gold" @input="changeObject=true">
      </li>
      <li class="listing-item">
        Platine
        <input type="text" class="invisible_input" v-model="coins.platinum" @input="changeObject=true">
      </li>
    </ul>
  </section>
</template>
<script lang="js" setup>
const {useCharacterData} = useCharacter();
const data = useCharacterData();
const coins = ref(data.value.coins);
const {update} = useStrapi();
const changeObject = ref(false);

const updateData = async () => {
  const { id, ...cleanData } = coins.value;
  await update('characters', data.value.documentId, {
    coins: cleanData
  });
  changeObject.value = false;
}
</script>