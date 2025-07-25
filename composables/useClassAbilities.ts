import { ref } from 'vue'
import { useUnityCharacteristicsModifiers } from "~/composables/useModifiers"
import type { CharacterClass, ClassAbilities } from '~/types'
import type { UseClassAbilitiesReturn } from '~/types/composables'

export const useClassAbilities = (): UseClassAbilitiesReturn => {
    const getCLassAbilities = (job: string): ClassAbilities => {
        const { useCharacterData } = useCharacter()
        const characterClass = ref(useCharacterData().value.class)

        const getAbilities = characterClass.value.find(c => c.class_name === job)
        let result: ClassAbilities = { class_name: job }

        if (!getAbilities) return result

        if (getAbilities.class_name === "Barde") {
            result = bardeAbilities(getAbilities)
        }
        if (getAbilities.class_name === "Moine") {
            result = monkAbilities(getAbilities)
        }
        if (getAbilities.class_name === "Ensorceleur") {
            result = sorcererAbilities(getAbilities)
        }
        if (getAbilities.class_name === "Occultiste") {
            result = warlockAbilities(getAbilities)
        }
        return result
    }

    return {
        getCLassAbilities,
    }
}

const bardeAbilities = (characterClass: CharacterClass): ClassAbilities => {
    const deInspiration = (): string => {
        const n = characterClass.class_level
        if (n >= 15) return '1d12'
        if (n >= 10) return '1d10'
        if (n >= 5) return '1d8'
        if (n >= 1) return '1d6'
        return 'Niveau invalide'
    }

    return {
        'class_name': 'Barde',
        'inspiration_dice': deInspiration(),
        'inspiration_max': useUnityCharacteristicsModifiers('cha').value,
    }
}

const monkAbilities = (characterClass: CharacterClass): ClassAbilities => {
    return {
        'class_name': 'Moine',
        'Ki_points': characterClass.class_level
    }
}

const sorcererAbilities = (characterClass: CharacterClass): ClassAbilities => {
    return {
        'class_name': 'Ensorceleur',
        'witchcraft_points': characterClass.class_level,
    }
}

const warlockAbilities = (characterClass: CharacterClass): ClassAbilities => {
    function getManifestations(l: number): number | string {
        if (l < 2) return 0
        if (l < 7) return 3
        if (l < 9) return 4
        if (l < 12) return 5
        if (l < 15) return 6
        if (l < 18) return 7
        if (l <= 20) return 8
        return "NC"
    }

    return {
        'class_name': 'Occultiste',
        'manifestations': getManifestations(characterClass.class_level),
    }
}