import jsonSpells from '../public/sorts.json';
import {ref} from 'vue';
import {useCharacterData} from "~/composables/useCharacterData.js";

export const useSpells = () => {
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

export const canUseMagic = () => {
    const data = useCharacterData();
    const characterClass = data.value.class;
    const magicClass = {
        barde: 'cha',
        clerc: 'sag',
        druide: 'sag',
        ensorceleur: 'cha',
        magicien: 'int',
        occultiste: 'cha',
        paladin: 'cha',
        rôdeur: 'sag',
        artificier: 'int'
    };
    for (const classe of characterClass) {
        const className = classe.class_name?.toLowerCase();
        if (magicClass[className]) {
            const caracteristique = magicClass[className];
            return [true, classe.class_name, caracteristique];
        }
    }
    return [false, null]
}