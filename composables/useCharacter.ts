import { useStrapiUser, useStrapi } from '#imports'
import classesInfos from '@/public/classesInfos.json'
import { useUnityCharacteristicsModifiers } from '~/composables/useModifiers'
import type { Character, ClassData, CACalculation } from '~/types'
import type { UseCharacterReturn } from '~/types/composables'

const user = useStrapiUser()
const { findOne } = useStrapi()

export const useCharacter = (): UseCharacterReturn => {
    const useCharacterData = (): Ref<Character> => useState('characterData', () => ({} as Character))

    const getFullInfosClass = (className: string): ClassData => {
        return classesInfos.find(i => i.nom === className) ?? {} as ClassData
    }

    const callCharacterData = async (): Promise<void> => {
        const response = await findOne('characters', user.value.character_id, { populate: '*' })
        useCharacterData().value = response.data
    }

    const getCA = (): CACalculation => {
        const data = useCharacterData().value
        const characterClass = data.class
        const characterArmors = data.armors
        const isMonk = characterClass.some(c => c.class_name === 'Moine')
        const armorSum = characterArmors.reduce((acc, armor) => acc + parseInt(armor.indice.toString()), 0)
        const sag = useUnityCharacteristicsModifiers('sag')
        const dex = useUnityCharacteristicsModifiers('dex')

        if (isMonk) {
            return {
                score: 10 + sag.value + dex.value,
                note: `10 + Sag(${sag.value}) + Dex(${dex.value})`,
                type: 'Moine :',
            }
        }

        if (characterArmors.length === 0) {
            return {
                score: 10 + dex.value,
                note: `10 + Dex(${dex.value})`,
                type: 'Sans armure :',
            }
        }
        return {
            score: armorSum + dex.value,
            note: `Armures (${armorSum}) + Dex(${dex.value})`,
            type: 'Total CA :',
        }
    }

    return {
        getFullInfosClass,
        callCharacterData,
        getCA,
        useCharacterData
    }
}