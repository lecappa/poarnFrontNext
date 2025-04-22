<template>
  <section v-if="data" class="square-section">
    <h4>Points de vie</h4>
    <ul class="listing">
      <li>
        <div class="listing-item">
          <p>
            Actuel</p> <b class="add-line">{{ life_points.current }}</b>
        </div>
      </li>
      <li>
        <div class="listing-item">
          <p>Max</p> <b class="add-line">{{ life_points.max }}</b>
        </div>
      </li>
    </ul>
  </section>
</template>
<script setup lang="js">
const data = useCharacterData();
const life_points = ref(data.value.life_points);
</script>