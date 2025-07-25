import classesInfos from "@/public/classesInfos.json"
import allSkills from "@/public/skills.json"
import { getMasteryBonus, useUnityCharacteristicsModifiers } from "~/composables/useModifiers"
import type { CharacterClass, ClassData, SkillData, Skill } from '~/types'
import type { UseSkillsReturn } from '~/types/composables'

export const useSkills = (): UseSkillsReturn => {
    const getClassSkills = (): CharacterClass[] => {
        const { useCharacterData } = useCharacter()
        const data = useCharacterData().value

        return data.class.map(element => {
            const { getFullInfosClass } = useCharacter()
            const infos = getFullInfosClass(element.class_name)
            return {
                ...element,
                deVie: infos.deVie ?? '1d4',
                masters: infos.maitrises ?? [],
                savingThrows: infos.jetsDeSauvegarde ?? [],
            }
        })
    }

    const getClassSkillsMastery = (): string[] => {
        const { useCharacterData } = useCharacter()
        const data = useCharacterData()
        const nomsDesClasses = data.value.class.map(c => c.class_name)
        const selected = (classesInfos as ClassData[]).filter(c => nomsDesClasses.includes(c.nom))
        const toutesMaitrises = selected.flatMap(c => c.maitrises || [])
        return [...new Set(toutesMaitrises)]
    }

    const getSkills = (): Skill[] => {
        const { useCharacterData } = useCharacter()
        const data = useCharacterData().value
        const characterSkills = data.skills ?? []

        return (allSkills as SkillData[]).map(skill => {
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

    const getSkillByName = (name: string): ComputedRef<{
        name: string
        slug: string
        description: string
        score: number
        master: boolean
        expert: boolean
    } | null> => {
        const { useCharacterData } = useCharacter()
        const data = useCharacterData()
        const masteryBonus = getMasteryBonus()

        return computed(() => {
            const skill = (allSkills as SkillData[]).find(skill => skill.name === name)
            if (!skill) return null

            const masteredSkill = data.value.skills?.find(s => s.name === name)
            const hasMastery = !!masteredSkill
            const hasExpertise = hasMastery && masteredSkill.expertise

            let finalValue = useUnityCharacteristicsModifiers(skill.ability).value
            if (hasExpertise) {
                finalValue += masteryBonus * 2
            } else if (hasMastery) {
                finalValue += masteryBonus
            }

            return {
                name: skill.name,
                slug: skill.ability,
                description: skill.description,
                score: 10 + finalValue,
                master: hasMastery,
                expert: hasExpertise,
            }
        })
    }

    const ifHaveClass = (nameClass: string): boolean => {
        const { useCharacterData } = useCharacter()
        const data = useCharacterData()
        const characterClass = data.value.class

        for (const classe of characterClass) {
            if (classe.class_name === nameClass) {
                return true
            }
        }
        return false
    }

    return {
        ifHaveClass,
        getClassSkills,
        getClassSkillsMastery,
        getSkills,
        getSkillByName
    }
}