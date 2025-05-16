<template>
  <section v-if="data" class="square-section">
    <div class="square-section__header">
      <h4>Capacités et traits</h4>
    </div>
    <ul class="listing">
      <li v-for="(info, key) in capacities" :key="key" class="listing-item">
        {{ info.name }}
        <span>
          <button class="btn btn-small btn-transparent" @click="editCapacity(info)">&hellip;</button>
          <button class="btn btn-small btn-transparent" @click="deleteCapacity(info.id)">×</button>
        </span>
      </li>
    </ul>
    <br>
    <p class="text-right">
      <button class="btn" @click="openClassDialog=true">Ajouter une capacité</button>
    </p>
  </section>

  <div class="dialog-box" v-if="openClassDialog">
    <dialog open class="dialog">
      <header>
        <button @click="[openClassDialog = false, isEdit = false]">×</button>
      </header>
      <div class="body">
        <div class="form-control">
          <label for="capacityName" class="small-label">Nom de la capacité</label>
          <input type="text" class="input" id="capacityName" v-model="addCapacity.name">
        </div>
        <div class="form-control">
          <label for="capacityLevel" class="small-label">Niveau de la capacité</label>
          <input type="number" class="input" id="capacityLevel" v-model="addCapacity.level">
        </div>
        <div class="form-control">
          <label for="capacityDescription" class="small-label">Description de la capacité</label>
          <textarea class="input textarea" id="capacityDescription" v-model="addCapacity.description"></textarea>
        </div>
      </div>
      <footer>
        <form method="dialog" class="text-right">
          <button class="btn btn-text" @click="[openClassDialog = false, isEdit = false]">Annuler</button>
          <template v-if="isEdit">
            <button class="btn" @click="updateCapacity()">Modifier la capacité</button>
          </template>
          <template v-else>
            <button class="btn" @click="addNewCapacity()">Ajouter la capacité</button>
          </template>
        </form>
      </footer>
    </dialog>
  </div>

</template>
<script setup lang="js">
const {update} = useStrapi();
const {useCharacterData} = useCharacter();
const data = useCharacterData();
const capacities = ref(data.value.capacities);
const isEdit = ref(false);
const openClassDialog = ref(false);
let addCapacity = ref({
  name: "",
  level: 0,
  description: "",
})

const addNewCapacity = () => {
  capacities.value.push(addCapacity.value);
  updateData();
  openClassDialog.value = false
  addCapacity.value = [];
}

const editCapacity = (c) => {
  isEdit.value = true;
  addCapacity.value = c;
  openClassDialog.value = true;
}

const updateCapacity = async () => {
  await updateData();
  isEdit.value = false;
  openClassDialog.value = false;
};
const deleteCapacity = (id) => {
  capacities.value = capacities.value.filter((i) => i.id !== id);
  updateData();
};

const updateData = async () => {
  await update('characters', data.value.documentId, {
    capacities: capacities.value.map(({name, level, description}) => ({name, level, description}))
  });
  isEdit.value = false;
}
</script>