import jsonSpells from '@/public/sorts.json'
import jsonSpellsSlots from '@/public/spells-slots.json'
import { ref } from 'vue'
import type { SpellData, SpellSlots, CharacterClass } from '~/types'
import type { UseSpellsReturn } from '~/types/composables'

export const useSpells = (): UseSpellsReturn => {
    const { useCharacterData } = useCharacter()
    
    const allSpellsData = ref((jsonSpells as any).Spells as SpellData[])

    const allSpells = (): SpellData[] => {
        return allSpellsData.value
    }

    const spellsSlots = (): Record<string, Record<string, SpellSlots>> => {
        return jsonSpellsSlots as Record<string, Record<string, SpellSlots>>
    }

    const getSpellsSlot = (): SpellSlots => {
        const data = useCharacterData()
        const characterClass = data.value.class
        const magicClass = canUseMagic()[1]
        if (!magicClass) return {}
        
        const characterClassLevel = characterClass.find((i: CharacterClass) => i.class_name === magicClass)?.class_level
        if (!characterClassLevel) return {}
        
        const result = (jsonSpellsSlots as any)[magicClass]
        return result[characterClassLevel] || {}
    }

    const getSpellsByClass = (className?: string): SpellData[] => {
        if (className) {
            return allSpellsData.value.filter(spell =>
                spell.Classes.some(cls => cls.Value === className)
            )
        } else {
            return allSpellsData.value
        }
    }

    const getAllSpells = (): SpellData[] => {
        return allSpellsData.value
    }

    const getAllClasses = (): string[] => {
        const classSet = new Set<string>()
        allSpellsData.value.forEach(spell => {
            spell.Classes.forEach(cls => classSet.add(cls.Value))
        })
        return Array.from(classSet).sort()
    }

    const canUseMagic = (): [boolean, string | null, string?] => {
        const data = useCharacterData()
        const characterClass = data.value.class
        const magicClass: Record<string, string> = {
            barde: 'cha',
            clerc: 'sag',
            druide: 'sag',
            ensorceleur: 'cha',
            magicien: 'int',
            occultiste: 'cha',
            paladin: 'cha',
            rôdeur: 'sag',
            artificier: 'int'
        }
        
        for (const classe of characterClass) {
            const className = classe.class_name?.toLowerCase()
            if (magicClass[className]) {
                const caracteristique = magicClass[className]
                return [true, classe.class_name, caracteristique]
            }
        }
        return [false, null]
    }

    return {
        getAllSpells,
        getSpellsSlot,
        spellsSlots,
        allSpells,
        getSpellsByClass,
        getAllClasses,
        canUseMagic
    }
}