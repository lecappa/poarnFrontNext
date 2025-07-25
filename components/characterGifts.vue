<template>
  <section class="square-section">
    <div class="square-section__header">
      <h4>Dons</h4>
    </div>
    <ul class="listing">
      <li v-for="(g, key) in characterFeats" :key="key" class="listing-item">
        <span class="full" role="button" @click="editFeat(g)">{{ g.name }}</span>
        <span>
          <button class="btn btn-small btn-transparent" @click="editFeat(g)">→</button>
          <button class="btn btn-small btn-transparent" @click="deleteFeat(g.id)">×</button>
        </span>
      </li>
    </ul>
    <br>
    <p class="text-right">
      <button class="btn" @click="[openClassDialog = true, addFeat={}]">Ajouter un don</button>
    </p>
  </section>

  <div class="dialog-box" v-if="openClassDialog">
    <dialog open class="dialog">
      <header>
        <button @click="[openClassDialog = false, isEdit = false]">×</button>
      </header>
      <div class="body" :class="!isEdit ? 'with-search' : ''">

        <section class="dialog__search" v-if="!isEdit">
          <div class="">
            <div class="input-auto">
              <div class="icn"><i class="fa fa-search" aria-hidden="true"></i></div>
              <input type="text" placeholder="Rechercher un don" class="input search" v-model="searchFeat">
              <ul class="input-auto__list" v-if="filterFeats.length > 0">
                <li v-for="a in filterFeats" @click="newFeat(a)">{{ a.name }}</li>
              </ul>
            </div>
          </div>
        </section>

        <div class="form-control">
          <label for="capacityName" class="small-label">Nom du don</label>
          <input type="text" class="input" id="capacityName" v-model="addFeat.name">
        </div>
        <div class="form-control">
          <label for="capacityDescription" class="small-label">Description du don</label>
          <textarea class="input textarea" id="capacityDescription" v-model="addFeat.description"></textarea>
        </div>
      </div>
      <footer>
        <form method="dialog" class="text-right">
          <button class="btn btn-text" @click="[openClassDialog = false, isEdit = false, addFeat={}]">Annuler</button>
          <template v-if="isEdit">
            <button class="btn" @click="updateFeat()">Modifier le don</button>
          </template>
          <template v-else>
            <button class="btn" @click="addNewFeat()">Ajouter le don</button>
          </template>
        </form>
      </footer>
    </dialog>
  </div>

</template>
<script lang="js" setup>
const {useCharacterData, callCharacterData} = useCharacter();
const data = useCharacterData();
const characterFeats = ref(data.value.gifts);

const {update} = useStrapi();

const {featsList} = useFeats();
const allFeats = ref(featsList());

const isEdit = ref(false);
const openClassDialog = ref(false);

const searchFeat = ref('');

const addFeat = ref({
  name: "",
  prerequisites: "",
  description: ""
})

const deleteFeat = (id) => {
  characterFeats.value = characterFeats.value.filter((i) => i.id !== id);
  updateData();
};

const newFeat = (i) => {
  addFeat.value = {
    name: i.name,
    prerequisites: i.prerequisites,
    description: i.description,
  };
  searchFeat.value = '';
}

const editFeat = (i) => {
  isEdit.value = true;
  addFeat.value = i;
  openClassDialog.value = true;
}

const addNewFeat = () => {
  characterFeats.value.push(addFeat.value);
  updateData();
  openClassDialog.value = false
  newFeat.value = [];
}

const filterFeats = computed(() => {
  if (searchFeat.value === '') {
    return []
  }
  let matches = 0;
  return allFeats.value.filter(c => {
    if (
        c.name.toLowerCase().includes(searchFeat.value.toLowerCase())
        && matches < 5
    ) {
      matches++
      return c
    }
  })
})

const updateFeat = async () => {
  await updateData();
  isEdit.value = false;
  openClassDialog.value = false;
};

const updateData = async () => {
  await update('characters', data.value.documentId, {
    gifts: characterFeats.value.map(({name, prerequisites, description}) => ({name, prerequisites, description}))
  });
  await callCharacterData();
}

</script>