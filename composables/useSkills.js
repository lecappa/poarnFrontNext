import classesInfos from "public/classesInfos.json";
import allSkills from "public/skills.json";
import {getMasteryBonus, useUnityCharacteristicsModifiers} from "~/composables/useModifiers.js";

export const useSkills = () => {
    const getClassSkills = () => {
        const {useCharacterData} = useCharacter();
        const data = useCharacterData().value

        return data.class.map(element => {
            const {getFullInfosClass} = useCharacter();
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
        const {useCharacterData} = useCharacter();
        const data = useCharacterData();
        const nomsDesClasses = data.value.class.map(c => c.class_name)
        console.log(nomsDesClasses)
        const selected = classesInfos.filter(c => nomsDesClasses.includes(c.nom))
        const toutesMaitrises = selected.flatMap(c => c.maitrises || [])
        return [...new Set(toutesMaitrises)]
    }
    const getSkills = () => {
        const {useCharacterData} = useCharacter();
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
        const {useCharacterData} = useCharacter();
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

    return {
        getClassSkills,
        getClassSkillsMastery,
        getSkills,
        getSkillByName
    }
}