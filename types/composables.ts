import type { 
  Character, 
  JournalEntry, 
  SpellData, 
  WeaponData, 
  ArmorData, 
  FeatData, 
  ManifestationData,
  ClassData,
  SkillData,
  SpellSlots,
  ClassAbilities,
  CACalculation,
  Skill
} from './index'

// Types pour les composables
export interface UseCharacterReturn {
  useCharacterData: () => Ref<Character>
  getFullInfosClass: (className: string) => ClassData
  callCharacterData: () => Promise<void>
  getCA: () => CACalculation
}

export interface UseSpellsReturn {
  getAllSpells: () => SpellData[]
  getSpellsSlot: () => SpellSlots
  spellsSlots: () => Record<string, Record<string, SpellSlots>>
  allSpells: () => SpellData[]
  getSpellsByClass: (className?: string) => SpellData[]
  getAllClasses: () => string[]
  canUseMagic: () => [boolean, string | null, string?]
}

export interface UseSkillsReturn {
  ifHaveClass: (nameClass: string) => boolean
  getClassSkills: () => any[]
  getClassSkillsMastery: () => string[]
  getSkills: () => Skill[]
  getSkillByName: (name: string) => ComputedRef<{
    name: string
    slug: string
    description: string
    score: number
    master: boolean
    expert: boolean
  } | null>
}

export interface UseClassAbilitiesReturn {
  getCLassAbilities: (job: string) => ClassAbilities
}

export interface UseFeatsReturn {
  featsList: () => FeatData[]
}

export interface UseManifestationsReturn {
  manisfestationsList: () => ManifestationData[]
}

export interface UseEquipementsReturn {
  weapons: WeaponData[]
  armors: ArmorData[]
}

export interface UseDiaryReturn {
  0: () => Promise<void>
  1: () => Ref<JournalEntry[]>
}

// Types pour les modificateurs
export interface ModifiersReturn {
  useCharacteristicsModifiers: (score: number) => number
  getMasteryBonus: () => number
  useUnityCharacteristicsModifiers: (slug: string) => ComputedRef<number>
  truncate: (text: string, maxLength?: number) => string
  getCharacteristics: (c: string) => any
}