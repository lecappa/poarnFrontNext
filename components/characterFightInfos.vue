<template>
  <section class="square-section">
    <div class="square-section__header">
      <h4>INDICES</h4>
      <button class="btn btn-small" v-if="changeObject" @click="updateData()">Valider</button>
    </div>
    <ul class="characteristics-grid spell-infos">
      <li>
        <span>Initiative</span>
        <b>d20 + {{useUnityCharacteristicsModifiers('dex')}}</b>
      </li>
      <li>
        <span>Jet d'attaque (For)</span>
        <b>d20 + {{ getMasteryBonus() }} + {{useUnityCharacteristicsModifiers('for')}}</b>
      </li>
      <li>
        <span>Jet d'attaque (Dex)</span>
        <b>d20 + {{ getMasteryBonus() }} + {{useUnityCharacteristicsModifiers('dex')}}</b>
      </li>
      <template v-if="magicClass[0]">
        <li>
          <span>Jet d'attaque (Magie)</span>
          <b>d20 + {{spellAttackMod()}}</b>
        </li>
      </template>
      <li>
        <span>Classe d'armure</span>
        <b>{{ useCharacterCA()['score']}}</b>
      </li>
    </ul>
  </section>
</template>
<script lang="js" setup>
import {canUseMagic} from '@/composables/useSpells.js';
const magicClass = useState('magicClass', () => canUseMagic());
const spellAttackMod = () => {
  if (magicClass.value[0]) {
    return getMasteryBonus() + useUnityCharacteristicsModifiers(magicClass.value[2]);
  }
}
</script>