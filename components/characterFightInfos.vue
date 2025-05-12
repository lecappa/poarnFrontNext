<template>
  <section class="square-section">
    <div class="square-section__header">
      <h4>INDICES</h4>
      <button class="btn btn-small" v-if="changeObject" @click="updateData()">Valider</button>
    </div>
    <ul class="characteristics-grid">
      <li>
        <span>Initiative</span>
        <b>D20 + {{useUnityCharacteristicsModifiers('dex')}}</b>
      </li>
      <li>
        <span>Jet d'attaque (For)</span>
        <b>D20 + {{ getMasteryBonus() }} + {{useUnityCharacteristicsModifiers('for')}}</b>
      </li>
      <li>
        <span>Jet d'attaque (Dex)</span>
        <b>D20 + {{ getMasteryBonus() }} + {{useUnityCharacteristicsModifiers('dex')}}</b>
      </li>

      <li>
        <span>Classe d'armure</span>
        <b>{{ useCharacterCA()['score']}}</b>
      </li>
    </ul>
  </section>
</template>
<script lang="js" setup>
</script>