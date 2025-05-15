<template>
  <div class="square-section tiny">
    <div class="row listing">
      <div class="col-lg-6">
        <div class="listing-item">
          Jet de sauvegarde des sorts : <b>{{spellSaveDC()}}</b>
        </div>
      </div>
      <div class="col-lg-6">
        <div class="listing-item">
          Attaques avec un sort : <b>d20 + {{spellAttackMod()}}</b>
        </div>
      </div>
    </div>
  </div>
  <div class="spells-navigation square-section" id="search">
    <div class="square-section__header"><h4>Filtres</h4><!--v-if--></div>
    <div class="spells-navigation__search">
      <label>
        <input type="checkbox" v-model="showOnlyCharacterSpells" class="form-check-input"/>
        Uniquement mes sorts
      </label>
      <div class="d-flex">
        <div style="width: 100%; margin-right: 1rem">
          <input
              type="text"
              v-model="searchSpellName"
              ref="searchInput"
              placeholder="Rechercher un sort..."
              class="input"
          />
          <button
              v-if="searchSpellName"
              @click="clearSearch"
              class="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black"
              aria-label="Effacer la recherche"
          >
            ×
          </button>
        </div>
        <select id="class-select" v-model="selectedClass" class="input select">
          <option disabled value="">-- Sélectionnez une classe --</option>
          <option v-for="cls in allClasses" :key="cls" :value="cls">
            {{ cls }}
          </option>
        </select>
      </div>
    </div>
  </div>
  <div ref="spellListContainer">
    <div v-if="Object.keys(groupedSpells).length">
      <div v-for="(spells, level) in groupedSpells" :key="level">
        <h4 class="lv-title" :id="'lv-'+level">Niveau {{ level }}</h4>
        <div class="row">
          <div class="col-xs-12 col-sm-12 col-md-6 col-lg-4" v-for="spell in spells" :key="spell.Id">
            <div class="spell-item" :class="isSpellInList(spell.Id) ? 'in-list' : ''">
              <header><b>{{ spell.Name }}</b></header>
              <template v-if="spell.Ritual">
                <p><b>Rituel</b></p>
              </template>
              <template v-else>
                <p>Portée : {{ spell.Range.Value }}</p>
                <p>École : {{ spell.School.Value }}</p>
              </template>
              <footer>
                <template v-if="isSpellInList(spell.Id)">
                  <button class="btn btn-small" @click="removeSpellFromList(spell.Id)">Supprimer de la liste</button>
                </template>
                <template v-else>
                  <button class="btn btn-small" @click="addSpellToList(spell.Id)">+ Ajouter à la liste</button>
                </template>
                <button class="btn btn-small" @click="showSpell(spell)">Détail du sort</button>
              </footer>
            </div>
          </div>
        </div>

      </div>
    </div>
    <p v-else-if="selectedClass">Aucun sort trouvé pour {{ selectedClass }}.</p>
  </div>
  <div class="dialog-box" v-if="openClassDialog">
    <dialog open class="dialog large">
      <header>
        <button @click="openClassDialog = false">×</button>
      </header>
      <div class="spell-description">
        <p>Nom : <b>{{ selectedSpell.Name }}</b></p>
        <p v-if="selectedSpell.Range.Value">Portée : <b class="text-capitalize">{{ selectedSpell.Range.Value }}</b></p>
        <p v-if="selectedSpell.School.Value">École de magie : <b class="text-capitalize">{{
            selectedSpell.School.Value
          }}</b>
        </p>
        <p v-if="selectedSpell.Duration.Value">Durée : <b>{{ selectedSpell.Duration.Value }}</b></p>
        <p v-if="selectedSpell.Components">Composants : <b>{{ selectedSpell.Components }}</b></p>
        <p v-if="selectedSpell.CastingTime.Value">Temps d'incantation : <b>{{ selectedSpell.CastingTime.Value }}</b></p>
        <p class="mb-5">Classes :
          <template v-for="(classe, key) in selectedSpell.Classes" :key="key">
            <b>{{ classe.Value }}</b>
            <span v-if="key < selectedSpell.Classes.length - 1">, </span>
          </template>
        </p>
        <br>
        <p class="pre-formatted">{{ selectedSpell.Description }}</p>
      </div>
      <footer>
        <form method="dialog" class="text-right">
          <button class="btn" @click="openClassDialog = false">Fermer</button>
        </form>
      </footer>
    </dialog>
  </div>
  <div class="lv-nav">
    <nav class="lv-nav-content"><a href="#search">
      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12"><title>zoom</title>
        <g fill="#ffffff">
          <path
              d="M11.707,10.293l-2.54-2.54A5.015,5.015,0,1,0,7.753,9.167l2.54,2.54a1,1,0,0,0,1.414-1.414ZM2,5A3,3,0,1,1,5,8,3,3,0,0,1,2,5Z"
              fill="#ffffff"></path>
        </g>
      </svg>
    </a><a href="#lv-0">0</a><a href="#lv-1">1</a><a href="#lv-2">2</a><a href="#lv-3">3</a><a href="#lv-4">4</a><a
        href="#lv-5">5</a><a href="#lv-6">6</a><a href="#lv-7">7</a><a href="#lv-8">8</a><a href="#lv-9">9</a>
    </nav>
  </div>
</template>

<script lang="js" setup>
const {useCharacterData, callCharacterData} = useCharacter();
await callCharacterData();
import {useSpells} from '@/composables/useSpells.js';
const {canUseMagic} = useSpells();
const magicClass = useState('magicClass', () => canUseMagic());
const data = useCharacterData();
const character_spells = ref(data.value.spells);
const {update} = useStrapi();
const {getSpellsByClass, getAllClasses} = useSpells();
const selectedClass = ref(magicClass.value[1]);
const allClasses = getAllClasses();
const openClassDialog = ref(false);
const selectedSpell = ref([]);
const showOnlyCharacterSpells = ref(false);
const searchSpellName = ref('');
const spellListContainer = ref(null);
const searchInput = ref(null);

definePageMeta({
  middleware: 'auth',
  layout: 'connected'
})

const showSpell = (i) => {
  selectedSpell.value = i;
  openClassDialog.value = true;
}

const groupedSpells = computed(() => {
  if (!selectedClass.value) return {}

  const spellIds = character_spells.value.map(s => s.spellId)
  let spells = getSpellsByClass(selectedClass.value)

  if (showOnlyCharacterSpells.value) {
    spells = spells.filter(spell => spellIds.includes(spell.Id))
  }

  if (searchSpellName.value.trim()) {
    const term = searchSpellName.value.trim().toLowerCase()
    spells = spells.filter(spell =>
        spell.Name.toLowerCase().includes(term)
    )
  }

  spells = spells.sort((a, b) => a.Level - b.Level)

  const groups = {}
  for (const spell of spells) {
    const level = spell.Level
    if (!groups[level]) {
      groups[level] = []
    }
    groups[level].push(spell)
  }

  return groups
})


const clearSearch = () => {
  searchSpellName.value = ''
  nextTick(() => {
    searchInput.value?.focus()
  })
}

const isSpellInList = (id) => {
  return character_spells.value.some(spell => spell.spellId === id);
}

const addSpellToList = async (id) => {
  const spell_id = parseInt(id);
  const alreadyExists = character_spells.value.some(spell => spell.spellId === spell_id);

  if (!alreadyExists) {
    character_spells.value.push({spellId: spell_id});
    await updateData();
  }
}

const removeSpellFromList = async (id) => {
  const spell_id = parseInt(id);
  character_spells.value = character_spells.value.filter(spell => spell.spellId !== spell_id);
  await updateData();
}

const updateData = async () => {
  await update('characters', data.value.documentId, {
    spells: character_spells.value.map(({spellId}) => ({spellId}))
  });
}



const spellSaveDC = () => {
  return 8 + getMasteryBonus() + useUnityCharacteristicsModifiers(magicClass.value[2]).value;
}
const spellAttackMod = () => {
  return getMasteryBonus() + useUnityCharacteristicsModifiers(magicClass.value[2]).value;
}
</script>