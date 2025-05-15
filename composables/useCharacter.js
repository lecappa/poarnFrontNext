import {useStrapiUser, useStrapi} from '#imports'
import classesInfos from 'public/classesInfos.json'
import allSkills from 'public/skills.json'
import {getMasteryBonus, useUnityCharacteristicsModifiers} from '~/composables/useModifiers'

const user = useStrapiUser()
const {findOne} = useStrapi()


export const useCharacter = () => {
    const useCharacterData = () => useState('characterData', () => ([]));

    const getFullInfosClass = (className) => {
        return classesInfos.find(i => i.nom === className) ?? {}
    }
    const callCharacterData = async () => {
        const response = await findOne('characters', user.value.character_id, {populate: '*'})
        useCharacterData().value = response.data
    }

    const getClassSkills = () => {
        const data = useCharacterData().value

        return data.class.map(element => {
            const infos = getFullInfosClass(element.class_name)
            return {
                ...element,
                deVie: infos.deVie ?? '1d4',
                masters: infos.maitrises ?? false,
                savingThrows: infos.jetsDeSauvegarde ?? [],
            }
        })
    }


    const getClassSkillsMastery = () => {
        const data = useCharacterData();
        const nomsDesClasses = data.value.class.map(c => c.class_name)
        console.log(nomsDesClasses)
        const selected = classesInfos.filter(c => nomsDesClasses.includes(c.nom))
        const toutesMaitrises = selected.flatMap(c => c.maitrises || [])
        return [...new Set(toutesMaitrises)]
    }

    const getSkills = () => {
        const data = useCharacterData().value
        const characterSkills = data.skills ?? []

        return allSkills.map(skill => {
            const matching = characterSkills.find(s => s.name === skill.name)
            const hasMastery = !!matching
            const isExpertise = hasMastery && matching.expertise

            return {
                name: skill.name,
                ability: skill.ability,
                description: skill.description,
                mastery: hasMastery,
                expertise: isExpertise,
            }
        })
    }

    const getSkillByName = (name) => {
        const data = useCharacterData()
        const masteryBonus = getMasteryBonus()

        return computed(() => {
            const skill = allSkills.find(skill => skill.name === name)
            if (!skill) return null

            const masteredSkill = data.value.skills?.find(s => s.name === name)
            const hasMastery = !!masteredSkill
            const hasExpertise = hasMastery && masteredSkill.expertise

            // ✅ baseModifier est un computed, il faut accéder à sa .value
            const baseModifier = useUnityCharacteristicsModifiers(skill.ability).value

            let finalValue = baseModifier
            if (hasExpertise) {
                finalValue += masteryBonus * 2
            } else if (hasMastery) {
                finalValue += masteryBonus
            }

            return {
                name: skill.name,
                slug: skill.ability,
                description: skill.description,
                value: 10 + finalValue,
                master: hasMastery,
                expert: hasExpertise,
            }
        })
    }

    const getCA = () => {
        const data = useCharacterData().value
        const characterClass = data.class
        const characterArmors = data.armors
        const isMonk = characterClass.some(c => c.class_name === 'Moine')
        const armorSum = characterArmors.reduce((acc, armor) => acc + parseInt(armor.indice), 0)
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
            console.log('dd')
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
        callCharacterData,
        getClassSkills,
        getClassSkillsMastery,
        getSkills,
        getSkillByName,
        getCA,
        useCharacterData
    }
}