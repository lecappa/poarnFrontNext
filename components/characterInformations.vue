<template>
  <section v-if="data" class="square-section">
    <div class="square-section__header">
      <h4>Informations</h4>
      <button class="btn btn-small" @click="updateData()" v-if="changeObject">Valider</button>
    </div>

    <ul class="listing">
      <li class="listing-item">
        Joueur  <input type="text" class="invisible_input" v-model="information.player" @input="changeObject=true">
      </li>
      <li class="listing-item">
        Nom  <input type="text" class="invisible_input" v-model="information.name" @input="changeObject=true">
      </li>
      <li class="listing-item">
        Race <input type="text" class="invisible_input" v-model="information.race" @input="changeObject=true">
      </li>
      <li class="listing-item">
        Alignement <input type="text" class="invisible_input" v-model="information.alignment" @input="changeObject=true">
      </li>
    </ul>
  <br>
    <ul class="listing">
      <li class="listing-item">
        Sagesse passive  <span>{{10 + useUnityCharacteristicsModifiers('sag').value}}</span>
      </li>
      <li class="listing-item">
        Initiative <span>D20 + {{useUnityCharacteristicsModifiers('dex')}}</span>
      </li>
      <li class="listing-item">
        Vitesse <input type="number" min="1" max="23" class="invisible_input" v-model="information.speed" @input="changeObject=true">
      </li>
      <br>
    </ul>
    <ul class="listing">
      <li class="listing-item">
        Niveau global <input type="number" min="1" max="23" class="invisible_input" v-model="information.main_level" @input="changeObject=true">
      </li>
    </ul>
  </section>
</template>
<script setup lang="js">
const {useCharacterData} = useCharacter();
const data = ref(useCharacterData().value);
const information = ref(useCharacterData().value.informations);
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