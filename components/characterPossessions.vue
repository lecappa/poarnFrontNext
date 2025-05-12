<template>
  <section class="square-section" v-if="data">
    <div class="square-section__header">
      <h4>Objets</h4>
    </div>
    <ul class="listing">
      <li v-for="(item, key) in possessions" :key="key" class="listing-item">
        {{ item.name }}
        <template v-if="item.quantity > 1"> x {{ item.quantity }}</template>
        <span>
          <button class="btn btn-small" @click="editItem(item)">&hellip;</button>
          <button class="btn btn-small" @click="deleteItem(item.id)">×</button>
        </span>
      </li>
    </ul>
    <br>
    <p class="text-right">
      <button class="btn" @click="[openClassDialog=true,addItem=[] ]">Ajouter</button>
    </p>
  </section>

  <div class="dialog-box" v-if="openClassDialog">
    <dialog open class="dialog">
      <header>
        <button @click="[openClassDialog = false, isEdit = false]">×</button>
      </header>
      <div class="body">
        <div class="form-control">
          <label for="capacityName" class="small-label">Nom</label>
          <input type="text" class="input" id="capacityName" v-model="addItem.name">
        </div>
        <div class="form-control">
          <label for="capacityLevel" class="small-label">Quantité</label>
          <input type="number" class="input" id="capacityLevel" v-model="addItem.quantity">
        </div>
        <div class="form-control">
          <label for="capacityDescription" class="small-label">Description</label>
          <textarea class="input textarea" id="capacityDescription" v-model="addItem.description"></textarea>
        </div>
      </div>
      <footer>
        <form method="dialog" class="text-right">
          <button class="btn btn-text" @click="[openClassDialog = false, isEdit = false]">Annuler</button>
          <template v-if="isEdit">
            <button class="btn" @click="updateItems()">Modifier</button>
          </template>
          <template v-else>
            <button class="btn" @click="addNewItem()">Ajouter</button>
          </template>
        </form>
      </footer>
    </dialog>
  </div>

</template>

<script lang="js" setup>
const {update} = useStrapi();
const data = useCharacterData();
const possessions = ref(data.value.possessions);
const openClassDialog = ref(false);
const isEdit = ref(false);

let addItem = ref({
  name: "",
  quantity: 1,
  description: "",
})

const addNewItem = async () => {
  possessions.value.push(addItem.value);
  await updateData();
  openClassDialog.value = false
  addItem.value = [];
};

const editItem = (i) => {
  isEdit.value = true;
  addItem.value = i;
  openClassDialog.value = true;
}

const updateItems = async () => {
  await updateData();
  isEdit.value = false;
  openClassDialog.value = false;
};

const deleteItem = (id) => {
  possessions.value = possessions.value.filter((i) => i.id !== id);
  updateData();
};

const updateData = async () => {
  await update('characters', data.value.documentId, {
    possessions: possessions.value.map(({name, quantity, description}) => ({name, quantity, description}))
  });
  isEdit.value = false;
}
</script>