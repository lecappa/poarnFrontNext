<template>
  <div class="container">
    <div class='dons-list'>
      <div class='bloc' v-for="(item, key) in allFeats" :key="key">
        <h1>{{item.name}}</h1>
        <template v-if="item.prerequisites">
          <div class="prerequis">Prérequis : {{item.prerequisites}}</div>
        </template>
        <div class="description pre-formatted">{{item.description}}
          <br></div>
      </div>
  </div>
  </div>
</template>
<script setup lang="js">

definePageMeta({
  middleware: 'auth',
  layout: 'connected'
})

const {featsList} = useFeats();
const allFeats = ref(featsList());
</script>

<style lang="scss" scoped>
.dons-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(45%, 1fr));
  gap: 2rem;

  @media (max-width: 810px) {
    display: block;
    margin-bottom: 2rem;
  }

  .bloc {
    background-color: #263238;
    padding: 6rem 3rem 3rem;
    position: relative;
    width: 100%;
    margin-bottom: 2rem;
    font-size: 1.4rem;

    @media (max-width: 810px) {
      margin-bottom: 2rem;
    }

    h1 {
      font-size: 2.5rem;
      color:#169588;
      font-weight: 600;
      margin-bottom: 2rem;
    }

    .prerequis {
      margin-bottom: 1rem;
      position: relative;
      border: 1px solid rgba(255, 255, 255, 0.1);
      background-color: rgba(0, 0, 0, 0.1);
      padding: 1rem;
      font-size: 1.4rem;
    }

    .description {
      margin-bottom: 1rem;
    }

    .source {
      display: none;
    }

    ul {
      margin-top: 1rem;
      padding: 0;

      li {
        list-style: inside;
        margin-bottom: 1rem;
      }
    }
  }
}
</style>