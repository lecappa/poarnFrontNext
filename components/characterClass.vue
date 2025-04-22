<template>
  <section class="square-section">
    <h4>Classe</h4>

    <section v-for="(classInfos, key) in character_class" :key="key" class="square-section">
      <h5>{{ classInfos.class_name }}</h5>
      <ul class="listing">
        <li class="listing-item">
          Classe <b class="">{{ classInfos.class_name }}</b>
        </li>
        <li class="listing-item">
          Dés de vie <b class="">{{ classInfos.deVie }}</b>
        </li>
        <li class="listing-item">
          Sauvegarde <span><b v-for="item in classInfos.jetsDeSauvegarde">{{item}}, </b></span>
        </li>
        <li class="listing-item">
          Niveau
          <input type="number" v-model="classInfos.class_level" class="invisible_input">
        </li>
        <li class="listing-item">
          Sous classe <input type="text" class="invisible_input" v-model="classInfos.class_sub" placeholder="|">
        </li>
      </ul>
    </section>
    <p class="text-right">
      <button class="btn"  @click="openClassDialog = true">Ajouter une classe</button>
    </p>
  </section>

  <div class="dialog-box" v-if="openClassDialog">
    <dialog open class="dialog">
      <header>
          <button  @click="openClassDialog = false">×</button>
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
const data = useCharacterData();
const character_class = ref(data.value.class);
const openClassDialog = ref(false);

const addClass = reactive({
  class_name: ""
})

const addClassItem = () => {

  const classSelected = classesInfos.filter( (i) => i.nom === addClass.class_name)
  addClass.class_name = classSelected[0].nom
  addClass.deVie = classSelected[0].deVie
  addClass.class_level = 1
  addClass.jetsDeSauvegarde = classSelected[0].jetsDeSauvegarde
  character_class.value.push(addClass);
  openClassDialog.value = false;
}



</script>