<template>
  <section class="square-section">
    <div class="square-section__header">
      <h4>Armes</h4>
      <button class="btn btn-small" v-if="changeObject">Valider</button>
    </div>
    <div class="table-responsive">
      <table class="table-ui">
        <thead>
        <tr>
          <th scope="col">Nom</th>
          <th scope="col">Bonus</th>
          <th scope="col">Dégats</th>
          <th scope="col">Note</th>
          <th scope="col"></th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(weapon, key) in character_weapons" :key="key">
          <td>{{ weapon.name }}</td>
          <td style="width: 2rem;">
            <template v-if="!weapon.bonus">-</template>
            <template v-else>{{ weapon.bonus }}</template>
          </td>
          <td>{{ weapon.damage }}</td>
          <td>{{ weapon.note }}</td>
          <td style="width: 3rem;">
            <button class="btn btn-small btn-transparent" @click="weaponEdit(weapon)">&hellip;</button>
            <button class="btn btn-small btn-transparent" @click="weaponDelete(weapon.id)">×</button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <br>
    <p class="text-right">
      <button class="btn" @click="openClassDialog = true">Ajouter une arme</button>
    </p>
  </section>
  <div class="dialog-box" v-if="openClassDialog">
    <dialog open class="dialog">
      <header>
        <button @click="openClassDialog = false">×</button>
      </header>
      <div class="body with-search">
        <section class="dialog__search">
          <div class="">
            <div class="input-auto">
              <div class="icn">
                <i class="fa fa-search" aria-hidden="true"></i>
              </div>
              <input type="text" placeholder="Rechercher une arme" class="input search" v-model="searchWeapon">
              <ul class="input-auto__list" v-if="filterWeapon.length > 0">
                <li v-for="arme in filterWeapon" @click="newWeapon(arme)">{{ arme.name }}</li>
              </ul>
            </div>
          </div>
        </section>
        <div class="row">
          <div class="col-lg-12">
            <div class="form-control">
              <label class="small-label">Nom de l'arme</label>
              <input class="input" type="text" v-model="addWeapon.name">
            </div>
          </div>
          <div class="col-lg-6">
            <div class="form-control">
              <label class="small-label">Dégat</label>
              <input class="input" type="text" v-model="addWeapon.damage">
            </div>
          </div>
          <div class="col-lg-6">
            <div class="form-control">
              <label class="small-label">Bonus (Mettre zéro si vide)</label>
              <input class="input" type="number" v-model="addWeapon.bonus">
            </div>
          </div>
          <div class="col-lg-12">
            <div class="form-control">
              <label class="small-label">Nom de l'arme</label>
              <textarea class="input textarea" v-model="addWeapon.note"></textarea>
            </div>
          </div>
        </div>
      </div>
      <footer>
        <form method="dialog" class="text-right">
          <button class="btn btn-text" @click="openClassDialog = false">Annuler</button>
          <template v-if="isEdit">
            <button class="btn" @click="updateWeapon()">Modifier l'arme</button>
          </template>
          <template v-else>
            <button class="btn" @click="addNewWeapon()">Ajouter l'arme</button>
          </template>
        </form>
      </footer>
    </dialog>
  </div>
</template>
<script lang="js" setup>
import {weapons, armors} from '~/composables/useEquipements.js';

const data = useCharacterData();
const character_weapons = ref(data.value.weapons);
const allWeapons = ref(weapons);
const {update} = useStrapi();
const changeObject = ref(false);
const openClassDialog = ref(false);
const searchWeapon = ref('');
const isEdit = ref(false);
const addWeapon = ref({
  name: "",
  damage: "",
  note: "",
  bonus: 0,
});

const filterWeapon = computed(() => {
  if (searchWeapon.value === '') {
    return []
  }
  let matches = 0;
  return allWeapons.value.filter(c => {
    if (
        c.name.toLowerCase().includes(searchWeapon.value.toLowerCase())
        && matches < 5
    ) {
      matches++
      return c
    }
  })
});

const newWeapon = (i) => {
  if (!i.bonus) {
    i.bonus = 0;
  }
  addWeapon.value = {
    name: i.name,
    bonus: i.bonus,
    damage: i.damage,
    note: i.properties + ', ' + i.category
  };
  searchWeapon.value = '';
}


const addNewWeapon = () => {
  character_weapons.value.push(addWeapon.value);
  updateData();
  openClassDialog.value = false
  addWeapon.value = [];
}

const weaponDelete = (id) => {
  character_weapons.value = character_weapons.value.filter((i) => i.id !== id);
  updateData();
};

const weaponEdit = (c) => {
  isEdit.value = true;
  addWeapon.value = c;
  openClassDialog.value = true;
}

const updateWeapon = async () => {
  await updateData();
  isEdit.value = false;
  openClassDialog.value = false;
};

const updateData = async () => {
  await update('characters', data.value.documentId, {
    weapons: character_weapons.value.map(({name, bonus, damage, note}) => ({name, bonus, damage, note}))
  });
}
</script>