<template>
  <section class="square-section">
    <div class="square-section__header">
      <h4>Notes</h4>
      <button class="btn btn-small" @click="updateNotes()">Valider</button>
    </div>
    <div>
      <div v-if="editor">
        <div class="editor-nav">
          <button
              @click="editor.chain().focus().toggleBold().run()"
              :disabled="!editor.can().chain().focus().toggleBold().run()"
              :class="{ 'is-active': editor.isActive('bold') }"
          >
            <b>B</b>
          </button>
          <button
              @click="editor.chain().focus().toggleItalic().run()"
              :disabled="!editor.can().chain().focus().toggleItalic().run()"
              :class="{ 'is-active': editor.isActive('italic') }"
          >
            <i>I</i>
          </button>
          <button
              @click="editor.chain().focus().toggleStrike().run()"
              :disabled="!editor.can().chain().focus().toggleStrike().run()"
              :class="{ 'is-active': editor.isActive('strike') }"
          >
            <strike>U</strike>
          </button>
          <button
              @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
              :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }"
          >
            h1
          </button>
          <button
              @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
              :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }"
          >
            h2
          </button>
          <button
              @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
              :class="{ 'is-active': editor.isActive('heading', { level: 3 }) }"
          >
            h3
          </button>
          <button
              @click="editor.chain().focus().toggleHeading({ level: 4 }).run()"
              :class="{ 'is-active': editor.isActive('heading', { level: 4 }) }"
          >
            h4
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
        <TiptapEditorContent :editor="editor"/>
      </div>
    </div>

  </section>
</template>
<script lang="js" setup>
const {update} = useStrapi();
definePageMeta({
  middleware: 'auth',
  layout: 'connected'
})
const data = useCharacterData();
const notes = ref(data.value.notes);
const editor = useEditor({
  content: notes.value,
  extensions: [TiptapStarterKit],
  onUpdate: ({editor}) => {
    notes.value = editor.getHTML();
  }
})

const updateNotes = () => {
  updateData();
}

const updateData = async () => {
  await update('characters', data.value.documentId, {
    notes: notes.value
  });
}
</script>