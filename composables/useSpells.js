import jsonSpells from '../public/sorts.json';
import { ref } from 'vue';

export function useSpells() {
    const allSpellsData = ref(jsonSpells.Spells);

    const allSpells = () => {
        return allSpellsData.value;
    }

    const getSpellsByClass = (className) => {
        return allSpellsData.value.filter(spell =>
            spell.Classes.some(cls => cls.Value === className)
        )
    }

    const getAllClasses = () => {
        const classSet = new Set()
        allSpellsData.value.forEach(spell => {
            spell.Classes.forEach(cls => classSet.add(cls.Value))
        })
        return Array.from(classSet).sort()
    }

    return {
        allSpells,
        getSpellsByClass,
        getAllClasses
    }
}