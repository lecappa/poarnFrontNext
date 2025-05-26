<template>
  <section v-if="data" class="square-section">
    <div class="square-section__header">
      <h4>Points de vie & indices</h4>
      <button class="btn btn-small" v-if="changeObject" @click="updateData()">Valider</button>
    </div>
    <ul class="listing row">

      <template v-if="classAbilities && classAbilities.class_name === 'Moine'">
        <li class="col">
          <div class="listing-item">
            <div>
              <p>Points de KI</p>
            </div>
            <div style="text-align: right">
              <input type="number" min="0" class="invisible_input" v-model="information.ki_points"
                     @input="changeObject=true"> / {{ classAbilities.Ki_points }}
            </div>
          </div>
        </li>
      </template>

      <template v-if="classAbilities && classAbilities.class_name === 'Ensorceleur'">
        <li class="col">
          <div class="listing-item">
            <div>
              <p>Points de sorcellerie</p>
            </div>
            <div style="text-align: right">
              <input type="number" min="0" class="invisible_input" v-model="information.witchcraft_points"
                     @input="changeObject=true"> / {{ classAbilities.witchcraft_points }}
            </div>
          </div>
        </li>
      </template>

      <template v-if="classAbilities && classAbilities.class_name === 'Occultiste'">
        <li class="col">
          <div class="listing-item">
            Manifestations occultes <p>{{ classAbilities.manifestations }}</p>
          </div>
        </li>
      </template>

      <template v-if="classAbilities && classAbilities.class_name === 'Barde'">
        <li class="col-lg-6">
          <div class="listing-item">
            Inspiration <p>{{ classAbilities.inspiration_dice }}</p>
          </div>
        </li>
        <li class="col-lg-6">
          <div class="listing-item">
            Inspiration par jour <p>{{ classAbilities.inspiration_max }}</p>
          </div>
        </li>
      </template>
      <li class="col">
        <div class="listing-item">
          <p>
            Points de vie actuel</p> <input type="number" min="0" class="invisible_input" v-model="life_points.current"
                                            @input="changeObject=true">
        </div>
      </li>
      <li class="col">
        <div class="listing-item">
          <p>Points de vie max</p> <input type="number" min="0" class="invisible_input" v-model="life_points.max"
                                          @input="changeObject=true">
        </div>
      </li>
    </ul>
  </section>
</template>
<script setup lang="js">
const {useCharacterData} = useCharacter();
const data = useCharacterData();
const characterClass = ref(data.value.class);
const {getCLassAbilities} = useClassAbilities();
const life_points = ref(data.value.life_points);
const information = ref(useCharacterData().value.informations);
const classAbilities = ref({});

if (characterClass.value.find(c => c.class_name === 'Barde')) {
  classAbilities.value = getCLassAbilities('Barde');
}

if (characterClass.value.find(c => c.class_name === 'Moine')) {
  classAbilities.value = getCLassAbilities('Moine');
}

if (characterClass.value.find(c => c.class_name === 'Ensorceleur')) {
  classAbilities.value = getCLassAbilities('Ensorceleur');
}

if (characterClass.value.find(c => c.class_name === 'Occultiste')) {
  classAbilities.value = getCLassAbilities('Occultiste');
}


const {update} = useStrapi();
const changeObject = ref(false);
const updateData = async () => {
  const {id: lifeId, ...cleanData} = life_points.value;
  const {id: infoId, ...cleanInformation} = information.value;
  await update('characters', data.value.documentId, {
    life_points: cleanData,
    informations: cleanInformation
  });
  changeObject.value = false;
}
</script>