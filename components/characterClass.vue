<template>
  <section class="square-section">
    <div class="square-section__header">
      <h4>Classe</h4>
      <button class="btn btn-small" @click="updateData()" v-if="changeObject">Valider</button>
    </div>

    <section v-for="(classInfos, key) in character_class" :key="key" class="square-section simple">
      <div class="square-section__header">
        <h5>{{ classInfos.class_name }}</h5>
        <button class="btn btn-small" @click="deleteClass(classInfos.id)">×</button>
      </div>
      <ul class="listing">
        <li class="listing-item">
          Classe <b class="">{{ classInfos.class_name }}</b>
        </li>
        <li class="listing-item">
          Dés de vie <b class="">{{ classInfos.deVie }}</b>
        </li>
        <li class="listing-item">
          Sauvegarde <span><b v-for="item in classInfos.jetsDeSauvegarde">{{ item }}, </b></span>
        </li>
        <li class="listing-item">
          Niveau
          <input type="number" v-model="classInfos.class_level" class="invisible_input" @input="changeObject=true">
        </li>
        <li class="listing-item">
          Sous classe <input type="text" class="invisible_input" v-model="classInfos.class_sub" placeholder="|" @input="changeObject=true">
        </li>
      </ul>
    </section>
    <p class="text-right">
      <button class="btn" @click="openClassDialog = true">Ajouter une classe</button>
    </p>
  </section>

  <div class="dialog-box" v-if="openClassDialog">
    <dialog open class="dialog">
      <header>
        <button @click="openClassDialog = false">×</button>
      </header>
      <div class="body">
        <label for="className" class="small-label">Nom de la classe</label>
        <select v-model="addClass.class_name" class="input select" id="className">
          <option disabled selected value="">Selectionner une classe</option>
          <option v-for="item in classesInfos">
            {{ item.nom }}
          </option>
        </select>
      </div>
      <footer>
        <form method="dialog" class="text-right">
          <button class="btn btn-text" @click="openClassDialog = false">Annuler</button>
          <button class="btn" @click="addClassItem">Ajouter la classe</button>
        </form>
      </footer>
    </dialog>
  </div>
</template>
<script setup lang="js">
import classesInfos from "../public/classesInfos.json";
const {update} = useStrapi();
const {useCharacterData} = useCharacter();
const data = useCharacterData();
const character_class = ref(useCharacterData().value.class);
const openClassDialog = ref(false);
const changeObject = ref(false);
const addClass = reactive({
  class_name: ""
})

const addClassItem = () => {
  const classSelected = classesInfos.filter((i) => i.nom === addClass.class_name)
  addClass.class_name = classSelected[0].nom
  addClass.deVie = classSelected[0].deVie
  addClass.class_level = 1
  addClass.jetsDeSauvegarde = classSelected[0].jetsDeSauvegarde
  character_class.value.push(addClass);
  updateData();
  openClassDialog.value = false;
}

const deleteClass = (id) => {
  character_class.value = character_class.value.filter((i) => i.id !== id);
  updateData();
}


const updateData = async () => {
  await update('characters', data.value.documentId, {
    class: character_class.value.map(({class_name, class_level, class_sub}) => ({class_name, class_level, class_sub}))
  });
}


</script>