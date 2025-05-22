import jsonSpells from '../public/sorts.json';
import jsonSpellsSlots from '../public/spells-slots.json';
import {ref} from 'vue';

const {useCharacterData} = useCharacter();


export const useSpells = () => {
    const allSpellsData = ref(jsonSpells.Spells);

    const allSpells = () => {
        return allSpellsData.value;
    }

    const spellsSlots = () => {
        return jsonSpellsSlots;
    }

    const getSpellsSlot = () => {
        const data = useCharacterData();
        const characterClass = data.value.class;
        const magicCLass = canUseMagic()[1];
        const characterClassLevel = characterClass.find((i) => i.class_name === magicCLass).class_level
        const result = jsonSpellsSlots[magicCLass];
        return result[characterClassLevel];
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

    const canUseMagic = () => {
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

    return {
        getSpellsSlot,
        spellsSlots,
        allSpells,
        getSpellsByClass,
        getAllClasses,
        canUseMagic
    }
}