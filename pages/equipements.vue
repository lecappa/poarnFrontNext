<template>
  <main class="container page-texte">
    <nav class="personnage-nav">
      <button type="button" class="btn btn-primary" @click="selectedCategory = 'weapons'"
              :class="{ active: selectedCategory === 'weapons' }">Armes
      </button>
      <button type="button" class="btn btn-primary" @click="selectedCategory = 'armors'"
              :class="{ active: selectedCategory === 'armors' }">Armures
      </button>
    </nav>

    <div v-if="selectedCategory === 'weapons'" class="weapons-section">
      <div class="items-grid">
        <div v-for="weapon in filteredWeapons" :key="weapon.name" class="item-card">
          <h3>{{ weapon.name }}</h3>
          <div class="item-details">
            <p><strong>Coût : </strong> {{ weapon.cost }}</p>
            <p><strong>Dégâts : </strong> {{ weapon.damage }} {{ weapon.damageType }}</p>
            <p><strong>Poids : </strong> {{ weapon.weight }}</p>
            <p><a href="#deuxMains" class="text-white"><strong><u>Propriétés : </u></strong></a></p>
            <ul>
              <li v-for="prop in weapon.properties" :key="prop">{{ prop }}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="armors-section">
      <div class="items-grid">
        <div v-for="armor in filteredArmors" :key="armor.name" class="item-card">
          <h3>{{ armor.name }}</h3>
          <div class="item-details">
            <p><strong>Catégorie : </strong> {{ armor.category }}</p>
            <p><strong>Coût : </strong> {{ armor.cost }}</p>
            <p><strong>Classe d'armure : </strong> {{ armor.armorClass }}</p>
            <p v-if="armor.strength"><strong>Force requise : </strong> {{ armor.strength }}</p>
            <p><strong>Discrétion : </strong> {{ armor.stealth }}</p>
            <p><strong>Poids : </strong> {{ armor.weight }}</p>
          </div>
        </div>
      </div>
    </div>


    <section class="square-section infos" v-if="selectedCategory === 'weapons'">
      <div class="square-section__header"><h4>Propriétés des armes</h4></div>
      <p id="deuxMains"><b class="text-primary">À deux mains</b> : Cette arme nécessite les deux mains lorsque vous
        attaquez avec.</p>
      <p id="allonge"><b class="text-primary">Allonge</b> : Ce type d'arme ajoute 1,50 mètre à votre allonge lorsque
        vous attaquez avec, ou pour déterminer votre allonge lorsque vous effectuez une attaque d'opportunité avec (voir
        Combat).</p>
      <p id="chargement"><b class="text-primary">Chargement</b> : En raison du temps nécessaire pour charger cette arme,
        vous ne pouvez tirer qu'une seule munition par action, action bonus ou réaction, quel que soit le nombre
        d'attaques que vous possédez.</p>
      <p id="finesse"><b class="text-primary">Finesse</b> : Lorsque vous effectuez une attaque avec une arme de finesse,
        vous pouvez au choix appliquer votre modificateur de Force ou celui de Dextérité à vos jets d'attaque et de
        dégâts. Le même modificateur s'applique aux deux jets.</p>
      <p id="lancer"><b class="text-primary">Lancer</b> : Une arme qui possède la propriété lancer peut être lancée pour
        réaliser une attaque à distance. Si l'arme est une arme de corps à corps, vous utilisez la même caractéristique
        pour le jet d'attaque et de dégâts que vous auriez utilisée au corps à corps. Par exemple, si vous lancez une
        hachette, vous utilisez la Force, mais si vous lancez une dague, vous pouvez utiliser la Force ou la Dextérité,
        car la dague possède la propriété finesse.</p>
      <p id="legere"><b class="text-primary">Légère</b> : Une arme légère est petite et facile à manier, ce qui la rend
        idéale pour les combats à deux armes. Voir les règles du combat à deux armes.</p>
      <p id="lourde"><b class="text-primary">Lourde</b> : Les créatures de taille P ou TP ont un désavantage aux jets
        d'attaque avec une arme lourde. La taille et le poids d'une arme lourde sont en effet trop importants pour
        qu'une créature de taille P ou TP puisse l'utiliser efficacement.</p>
      <p id="munitions"><b class="text-primary">Munitions</b> : Vous ne pouvez utiliser une arme qui possède la
        propriété munitions pour une attaque à distance que si vous avez des munitions pour celle-ci. Pour chaque
        attaque réalisée avec cette arme, une munition est consommée. Prendre la munition d'un carquois ou autre
        contenant similaire fait partie de l'attaque (vous avez besoin d'une main libre pour recharger une arme à une
        main). À la fin du combat, vous pouvez récupérer la moitié des munitions utilisées en passant une minute pour la
        recherche. Si vous utilisez ce type d'arme pour une attaque au corps à corps, l'arme est considérée comme une
        arme improvisée (voir les règles correspondantes). Une fronde doit être chargée pour infliger des dégâts de
        cette manière.</p>
      <p id="Polyvalent"><b class="text-primary">Polyvalente</b> : Cette arme peut être tenue à une ou deux mains. Le
        chiffre indiqué entre parenthèses correspond aux dégâts si l'arme est tenue à deux mains lors d'une attaque au
        corps à corps.</p>
      <p id="portee"><b class="text-primary">Portée</b> : Une arme qui peut être utilisée pour effectuer une attaque à
        distance a une portée indiquée entre parenthèses après les propriétés munitions ou lancer. La portée spécifie
        deux nombres. Le premier indique la portée nominale en mètres, le deuxième la portée maximale. Au-delà de la
        portée nominale, vous avez un désavantage aux jets d’attaque. Vous ne pouvez attaquer une créature au-delà de la
        portée maximale.</p>
      <p id="speciale"><b class="text-primary">Spéciale</b> : Une arme avec la propriété spéciale possède des règles
        spécifiques qui sont définies dans la description de l'arme (voir Armes spéciales ci-dessous).</p>
    </section>
  </main>
</template>
<script setup lang="js">
import {ref} from 'vue';
import {weapons, armors} from '@/composables/equipements';

definePageMeta({
  middleware: 'auth',
  layout: 'connected'
})


const selectedCategory = ref('weapons');
const selectedWeaponCategory = ref('all');
const selectedArmorCategory = ref('all');

const filteredWeapons = computed(() => {
  if (selectedWeaponCategory.value === 'all') {
    return weapons;
  }
  return weapons.filter(weapon => weapon.category === selectedWeaponCategory.value);
});

const filteredArmors = computed(() => {
  if (selectedArmorCategory.value === 'all') {
    return armors;
  }
  return armors.filter(armor => armor.category === selectedArmorCategory.value);
});

</script>

<style scoped lang="scss">
.items-grid {
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(auto-fill, minmax(45%, 1fr));

  @media (max-width: 810px) {
    display: block;
  }
}

.item-card {
  background-color: #263238;
  padding: 3rem;
  position: relative;
  width: 100%;

  @media (max-width: 810px) {
    margin-bottom: 2rem;
  }
}

.item-card h3 {
  font-size: 2.5rem;
  color: #169588;
  font-weight: 600;
  margin-bottom: 1rem;
}

.item-details p {
  margin: 0.5rem 0;
  font-size: 1.6rem;
}

.item-details ul {
  position: relative;
  background-color: rgba(0, 0, 0, 0.1019607843);
  border: 1px solid #37474f;
  padding: 1rem;
  font-size: 1.4rem;
  margin-top: 1rem;

  li {
    list-style: none;
    display: block;
    margin-bottom: .5rem;
  }
}

.infos {
  margin-top: 10rem;
  font-size: 1.4rem;
  p {
    margin-bottom: 1.6rem;
  }
}
</style>