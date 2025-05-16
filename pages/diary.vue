<template>
  <section class="page-texte">
    <div class="d-flex align-items-center mb-5">
      <div class="w-100">
        <fieldset class="search-input little">
          <input
              type="search"
              placeholder="Rechercher"
              class="w-100"
              v-model="contentSearch"
          >
        </fieldset>
      </div>
      <div class="ms-5 flex-shrink-1">
        <button class="btn btn-primary btn-sm text-white" @click="newJournal">Ajouter</button>
      </div>
    </div>

    <div v-for="item in filteredJournals" :key="item.id" class="notes mb-3">
      <div class="notes__header">
        <h4>Le {{ formatDate(item.note_date) }}</h4>
        <small>Par {{ item.note_auteur }}</small>
        <div class="notes__actions">
          <button type="button" class="btn" title="Modifier" @click="editJournal(item)">…</button>
          <button type="button" class="btn" title="Supprimer" @click="deleteJournal(item.documentId)">×️</button>
        </div>
      </div>
      <div class="notes__body">
        <div v-html="item.note_content"></div>
      </div>
    </div>
  </section>

  <AddNote
      v-if="showAddJournal"
      :note="currentJournal"
      @close="hideModal"
  />
</template>
<script setup lang="js">
import { ref, computed } from 'vue';
import dayjs from 'dayjs';
import 'dayjs/locale/fr';

definePageMeta({
  middleware: 'auth',
  layout: 'connected'
});

// Configuration Day.js
dayjs.locale('fr');

// Strapi
const { find, update, delete: _delete } = useStrapi();

// Refs
const journal = ref([]);
const showAddJournal = ref(false);
const currentJournal = ref(null);
const contentSearch = ref('');

// Récupération des données
const fetchJournals = async () => {
  const response = await find('journals', {
    sort: ['note_date:desc'],
  });
  journal.value = response.data;
};

// Initial load
await fetchJournals();

// Formatage de la date
const formatDate = (date) => dayjs(date).format('dddd D MMMM YYYY');

// Recherche
const filteredJournals = computed(() => {
  return journal.value.filter((item) =>
      item.note_content.toLowerCase().includes(contentSearch.value.toLowerCase())
  );
});

// Édition
const editJournal = (note) => {
  currentJournal.value = note;
  showAddJournal.value = true;
};

// Nouveau journal
const newJournal = () => {
  currentJournal.value = null;
  showAddJournal.value = true;
};

// Fermeture du modal
const hideModal = async () => {
  currentJournal.value = null;
  showAddJournal.value = false;
  await fetchJournals();
};

// Suppression
const deleteJournal = async (id) => {
  if (confirm('Voulez-vous vraiment supprimer cette note ?')) {
    await _delete('journals', id);
    await fetchJournals();
  }
};
</script>