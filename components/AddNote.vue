<template>
  <div class="add-note dialog">
    <div class="container">
      <button class="close" @click="$emit('close')">×</button>

      <button
          type="button"
          class="add btn btn-primary text-white btn-sm"
          @click="isEditing ? onUpdate() : onSubmit()"
      >
        {{ isEditing ? 'Modifier' : 'Ajouter' }}
      </button>

      <div class="row">
        <div class="col-6 mb-5">
          <input type="date" class="input" v-model="noteData.note_date" />
        </div>
        <div class="col-6 mb-5">
          <input type="text" class="input" v-model="noteData.note_auteur" disabled />
        </div>

        <div class="col-12">
          <div v-if="editor">
            <div class="editor-nav">
              <button
                  @click="editor.chain().focus().toggleBold().run()"
                  :class="{ 'is-active': editor.isActive('bold') }"
              >
                <b>B</b>
              </button>
              <button
                  @click="editor.chain().focus().toggleItalic().run()"
                  :class="{ 'is-active': editor.isActive('italic') }"
              >
                <i>I</i>
              </button>
              <button
                  @click="editor.chain().focus().toggleStrike().run()"
                  :class="{ 'is-active': editor.isActive('strike') }"
              >
                <s>S</s>
              </button>
              <button
                  @click="editor.chain().focus().toggleBulletList().run()"
                  :class="{ 'is-active': editor.isActive('bulletList') }"
              >
                Liste
              </button>
            </div>
          </div>

          <div class="editor-content">
            <EditorContent :editor="editor" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed, onBeforeUnmount } from 'vue';
import { useEditor, EditorContent } from '@tiptap/vue-3';
import StarterKit from '@tiptap/starter-kit';
const { create, update } = useStrapi();
const emit = defineEmits(['close']);
const strapiUser = useStrapiUser();
const user = strapiUser.value;
const props = defineProps({
  note: Object,
});

const noteData = ref({
  note_date: new Date().toISOString().slice(0, 10),
  note_auteur: user.username,
  note_content: '',
  note_id: '',
  note_documentId:''
});

// Réactif : met à jour noteData quand une prop note est fournie
watch(
    () => props.note,
    (newNote) => {
      if (newNote) {
        noteData.value = {
          note_date: newNote.note_date,
          note_auteur: newNote.note_auteur,
          note_content: newNote.note_content,
          note_id: newNote.id,
          note_documentId: newNote.documentId
        };
      }
    },
    { immediate: true }
);

// Initialisation de l'éditeur
const editor = useEditor({
  content: noteData.value.note_content,
  extensions: [StarterKit],
  onUpdate: ({ editor }) => {
    noteData.value.note_content = editor.getHTML();
  }
});

// Nettoyage
onBeforeUnmount(() => {
  if (editor.value?.destroy) {
    editor.value.destroy();
  }
});

const isEditing = computed(() => !!noteData.value.note_id);


const onSubmit = async () => {
  try {
    await create('journals', {
      note_date: noteData.value.note_date,
      note_auteur: noteData.value.note_auteur,
      note_content: noteData.value.note_content,
    });
    emit('close', true);
  } catch (error) {
    console.error('Erreur lors de la création :', error);
  }
};


const onUpdate = async () => {
  try {
    await update('journals', noteData.value.note_documentId, {
      note_date: noteData.value.note_date,
      note_auteur: noteData.value.note_auteur,
      note_content: noteData.value.note_content
    });
    emit('close', true);
  } catch (error) {
    console.error('Erreur lors de la mise à jour :', error);
  }
};
</script>