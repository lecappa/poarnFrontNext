import type { Character, Characteristic } from '~/types'
import type { ModifiersReturn } from '~/types/composables'

export const useCharacteristicsModifiers = (score: number): number => {
    const parsed = parseInt(score.toString(), 10)
    if (isNaN(parsed) || parsed < 1) return 0
    return Math.floor((parsed - 10) / 2)
}

export const getMasteryBonus = (): number => {
    const { useCharacterData } = useCharacter()
    const character = useCharacterData()
    const level = character.value?.informations?.main_level ?? 1

    if (level > 20) return 7
    if (level >= 17) return 6
    if (level >= 13) return 5
    if (level >= 9) return 4
    if (level >= 5) return 3
    return 2
}

export const useUnityCharacteristicsModifiers = (slug: string): ComputedRef<number> => {
    const { useCharacterData } = useCharacter()
    const data = useCharacterData()

    return computed(() => {
        const all = data.value.characteristics
        const target = all.find((i: Characteristic) => i.characteristics_slug === slug)
        const score = parseInt(target?.characteristics_value?.toString() ?? '10', 10)

        if (isNaN(score) || score < 1) return 0
        return Math.floor((score - 10) / 2)
    })
}

export const truncate = (text: string, maxLength: number = 100): string => {
    if (!text || typeof text !== 'string') return ''
    return text.length <= maxLength
        ? text
        : text.substring(0, maxLength).trim() + '...'
}

export const getCharacteristics = (c: string): Characteristic | undefined => {
    const { useCharacterData } = useCharacter()
    const all = useCharacterData().value.characteristics
    return all.find((i: Characteristic) => i.characteristics_slug === c)
}