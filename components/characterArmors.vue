<template>
  <section class="square-section">
    <div class="square-section__header">
      <h4>Armures</h4>
    </div>
    <div class="table-responsive">
      <table class="table-ui">
        <thead v-if="character_armors.length> 0">
        <tr>
          <th scope="col">Nom</th>
          <th scope="col">Bonus</th>
          <th scope="col">Max&nbsp;Dex</th>
          <th scope="col">Note</th>
          <th scope="col"></th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(armor, index) in character_armors" :key="index">
          <td><b>{{ armor.name }}</b></td>
          <td style="width: 100px">+{{ armor.indice }}</td>
          <td style="width: 100px">
            <template v-if="armor.max_dex > 0">
              {{ armor.max_dex }}
            </template>
          </td>
          <td style="width:50%">
            <template v-if="armor.discretion">
               {{ armor.discretion }}
            </template>
            <template v-if="armor.weight">
              - {{ armor.weight }}
            </template>
            <template v-if="armor.note">
              - {{truncate(armor.note , 40)}}
            </template>
          </td>
          <td style="width: 3rem;">
            <button class="btn btn-small btn-transparent" @click="editArmor(armor)">→</button>
            <button type="button" class="btn btn-small btn-transparent" @click="deleteArmor(armor.id)">×</button>
          </td>
        </tr>
        <tr class="total">
          <td>Total CA : <big>{{ getCA()['score']}} </big></td>
          <td><small>{{ getCA()['note']}}</small></td>
        </tr>
        </tbody>
      </table>
    </div>
    <br>
    <p class="text-right">
      <button class="btn" @click="openClassDialog = true">Ajouter une armure</button>
    </p>
  </section>
  <div class="dialog-box" v-if="openClassDialog">
    <dialog open class="dialog">
      <header>
        <button @click="openClassDialog = false">×</button>
      </header>
      <div class="body with-search">
        <section class="dialog__search">
            <div class="input-auto">
              <div class="icn">
                <i class="fa fa-search" aria-hidden="true"></i>
              </div>
              <input type="text" placeholder="Entrer une armure" class="input search" v-model="searchArmor">
              <ul class="input-auto__list" v-if="filterArmor.length > 0">
                <li v-for="a in filterArmor" @click="newArmor(a)">{{ a.name }}</li>
              </ul>
            </div>
        </section>
        <div class="row">
          <div class="col-lg-12">
            <div class="form-control">
              <label class="small-label">Nom de l'armure</label>
              <input class="input" type="text" v-model="addArmor.name">
            </div>
          </div>
          <div class="col-lg-6">
            <div class="form-control">
              <label class="small-label">Type</label>
              <select class="input select" v-model="addArmor.type">
                <option value="" disabled>Type</option>
                <option v-for="option in armorType" :value="option.value">
                  {{ option.text }}
                </option>
              </select>
            </div>
          </div>
          <div class="col-lg-6">
            <div class="form-control">
              <label class="small-label">Class d'amure</label>
              <input class="input" type="number" v-model="addArmor.indice" placeholder="Que le chiffre">
            </div>
          </div>
          <div class="col-lg-6">
            <div class="form-control">
              <label class="small-label">Max bonus DEX</label>
              <input class="input" type="number" v-model="addArmor.max_dex" placeholder="Que le chiffre">
            </div>
          </div>
          <div class="col-lg-6">
            <div class="form-control">
              <label class="small-label">Poids</label>
              <input class="input" type="text" v-model="addArmor.weight">
            </div>
          </div>
          <div class="col-lg-6">
            <div class="form-control">
              <label class="small-label">Discretion</label>
              <input class="input" type="text" v-model="addArmor.discretion">
            </div>
          </div>
          <div class="col-lg-12">
            <div class="form-control">
              <label class="small-label">Note</label>
              <textarea class="input textarea" v-model="addArmor.note"></textarea>
            </div>
          </div>
        </div>
      </div>
      <footer>
        <form method="dialog" class="text-right">
          <button class="btn btn-text" @click="openClassDialog = false">Annuler</button>
          <template v-if="isEdit">
            <button class="btn" @click="updateArmor()">Modifier l'armure</button>
          </template>
          <template v-else>
            <button class="btn" @click="addNewArmor()">Ajouter l'armure</button>
          </template>
        </form>
      </footer>
    </dialog>
  </div>
</template>
<script lang="js" setup>
import {armors} from "~/composables/useEquipements.js";
const {useCharacterData, getCA, callCharacterData} = useCharacter();
const {update} = useStrapi();
const allArmors = ref(armors);
const data = useCharacterData();
const character_armors = ref(data.value.armors);
const openClassDialog = ref(false);
const searchArmor = ref('');
const isEdit = ref(false);
const addArmor = ref({
  name: "",
  type: "",
  indice: "",
  max_dex: "",
  discretion: "",
  weight: "",
  note: ""
})

const armorType = ref([
  {text: 'Armures légères', value: 'Armures légères'},
  {text: 'Armures intermédiaires', value: 'Armures intermédiaires'},
  {text: 'Armures lourdes', value: 'Armures lourdes'},
  {text: 'Boucliers', value: 'Boucliers'},
  {text: 'Autre', value: 'Autre'},
])

const filterArmor = computed(() => {
  if (searchArmor.value === '') {
    return []
  }
  let matches = 0;
  return allArmors.value.filter(c => {
    if (
        c.name.toLowerCase().includes(searchArmor.value.toLowerCase())
        && matches < 5
    ) {
      matches++
      return c
    }
  })
});


const newArmor = (i) => {
  addArmor.value = {
    name: i.name,
    type: i.category,
    indice: i.armorClass,
    max_dex: i.max_bonus_dex,
    discretion: i.stealth,
    weight: i.weight,
    note: i.note
  };
  searchArmor.value = '';
}

const deleteArmor= (id) => {
  character_armors.value = character_armors.value.filter((i) => i.id !== id);
  updateData();
};

const addNewArmor = () => {
  character_armors.value.push(addArmor.value);
  updateData();
  openClassDialog.value = false
  addArmor.value = [];
}

const editArmor = (c) => {
  isEdit.value = true;
  addArmor.value = c;
  openClassDialog.value = true;
}

const updateArmor = async () => {
  await updateData();
  isEdit.value = false;
  openClassDialog.value = false;
};

const updateData = async () => {
  await update('characters', data.value.documentId, {
    armors: character_armors.value.map(({name, type, indice, max_dex, discretion, weight, note }) => ({name, type, indice, max_dex, discretion, weight, note}))
  });
  await callCharacterData();
}
</script>