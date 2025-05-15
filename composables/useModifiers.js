export const useCharacteristicsModifiers = (score) => {
    const parsed = parseInt(score, 10)
    if (isNaN(parsed) || parsed < 1) return 0
    return Math.floor((parsed - 10) / 2)
}

export const getMasteryBonus = () => {
    const {useCharacterData} = useCharacter();
    const character = useCharacterData()
    const level = character.value?.informations?.main_level ?? 1

    if (level > 20) return 7
    if (level >= 17) return 6
    if (level >= 13) return 5
    if (level >= 9) return 4
    if (level >= 5) return 3
    return 2
}

export const useUnityCharacteristicsModifiers = (slug) => {
    const {useCharacterData} = useCharacter();
    const data = useCharacterData()

    return computed(() => {
        const all = data.value.characteristics
        const target = all.find((i) => i.characteristics_slug === slug)
        const score = parseInt(target?.characteristics_value ?? 10, 10)

        if (isNaN(score) || score < 1) return 0
        return Math.floor((score - 10) / 2)
    })
}