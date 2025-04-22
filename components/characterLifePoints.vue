<template>
  <section v-if="data" class="square-section">
    <h4>Points de vie</h4>
    <ul class="listing row">
      <li class="col-lg-6">
        <div class="listing-item">
          <p>
            Points de vie actuel</p> <input type="number" min="0" class="invisible_input" v-model="life_points.current">
        </div>
      </li>
      <li class="col-lg-6">
        <div class="listing-item">
          <p>Points de vie max</p> <input type="number" min="0" class="invisible_input" v-model="life_points.max">
        </div>
      </li>
    </ul>
  </section>
</template>
<script setup lang="js">
const data = useCharacterData();
const life_points = ref(data.value.life_points);
</script>