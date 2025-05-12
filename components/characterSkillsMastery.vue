<template>
  <section v-if="data" class="square-section">
    <div class="square-section__header">
      <h4>Compétences maitrisées</h4>
    </div>
    <ul class="listing">
      <li v-for="(info, key) in classSkillsMastery" :key="key" class="listing-item">
        {{ info }}
      </li>
      <li v-for="(info, key) in otherClassSkillsMastery" :key="key" class="listing-item">
        {{ info.name }}
        <span>
          <button class="btn btn-small" @click="classSkillsMasteryDelete(info.id)">×</button>
        </span>
      </li>
    </ul>
    <p class="listing-item">
      <input v-model="addMastery.name" class="input input-invisible" placeholder="Nouvelle maitrise">
      <span>
          <button class="btn btn-small" @click="classSkillsMasteryAdd">Ajouter</button>
        </span>
    </p>
  </section>
</template>
<script setup lang="js">
const data = useCharacterData();
const otherClassSkillsMastery = ref(data.value.mastery);
const classSkillsMastery = getClassSkillsMastery();
const {update} = useStrapi();

let addMastery = reactive({
  name: ""
})

const classSkillsMasteryAdd = () => {
  if (addMastery.name.length > 0) {
    otherClassSkillsMastery.value.push(addMastery);
    updateData();
    addMastery = {
      name: ""
    }
  }
}

const classSkillsMasteryDelete = (id) => {
  otherClassSkillsMastery.value = otherClassSkillsMastery.value.filter((maitrise) => maitrise.id !== id);
  updateData();
};


const updateData = async () => {
  await update('characters', data.value.documentId, {
    mastery: otherClassSkillsMastery.value.map(({name}) => ({name}))
  });
}

</script>