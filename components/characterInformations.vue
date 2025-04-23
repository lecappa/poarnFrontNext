<template>
  <section v-if="data" class="square-section">
    <div class="square-section__header">
      <h4>Informations</h4>
      <button class="btn btn-small" @click="updateData()" v-if="changeObject">Valider</button>
    </div>

    <ul class="listing">
      <li class="listing-item">
        Joueur  <input type="text" class="invisible_input" v-model="information.player" @change="changeObject=true">
      </li>
      <li class="listing-item">
        Nom  <input type="text" class="invisible_input" v-model="information.name" @change="changeObject=true">
      </li>
      <li class="listing-item">
        Race <input type="text" class="invisible_input" v-model="information.race" @change="changeObject=true">
      </li>
      <li class="listing-item">
        Niveau global <input type="number" min="1" max="23" class="invisible_input" v-model="information.main_level" @change="changeObject=true">
      </li>
    </ul>
  </section>
</template>
<script setup lang="js">
const data = useCharacterData();
const information = ref(data.value.informations);
const {update} = useStrapi();
const changeObject = ref(false);

const updateData = async () => {
  const { id, ...cleanInformation } = information.value;
  await update('characters', data.value.documentId, {
    informations: cleanInformation
  });
  changeObject.value = false;
}

</script>