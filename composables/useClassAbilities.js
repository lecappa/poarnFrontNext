import {ref} from 'vue';
import {useUnityCharacteristicsModifiers} from "~/composables/useModifiers.js";

export const useClassAbilities = () => {
    const getCLassAbilities = (job) => {
        const {useCharacterData} = useCharacter();
        const characterClass = ref(useCharacterData().value.class);

        const getAbilities = characterClass.value.find(c => c.class_name === job);
        let result = null;

        if (getAbilities.class_name === "Barde") {
            result = bardeAbilities(getAbilities);
        }
        if (getAbilities.class_name === "Moine") {
            result = monkAbilities(getAbilities);
        }
        return result;
    }

    return {
        getCLassAbilities,
    }
}


const bardeAbilities = (i) => {

    const deInspiration = () => {
        const n = i.class_level;
        if (n >= 15) return '1d12';
        if (n >= 10) return '1d10';
        if (n >= 5) return '1d8';
        if (n >= 1) return '1d6';
        return 'Niveau invalide';
    };

    return {
        'class_name': 'Barde',
        'inspiration_dice': deInspiration(),
        'inspiration_max': useUnityCharacteristicsModifiers('cha').value,
    };
}

const monkAbilities = (i) => {
    return {
        'class_name': 'Moine',
        'Ki_points': i.class_level
    };
}