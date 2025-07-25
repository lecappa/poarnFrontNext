// Types de base
export interface User {
  id: number
  documentId: string
  username: string
  email: string
  character_id: string
  createdAt: string
  updatedAt: string
}

// Caractéristiques du personnage
export interface Characteristic {
  id?: number
  characteristics_name: string
  characteristics_value: number
  characteristics_slug: 'for' | 'dex' | 'con' | 'int' | 'sag' | 'cha'
}

// Informations du personnage
export interface CharacterInformation {
  id?: number
  player: string
  name: string
  race: string
  alignment: string
  speed: number
  main_level: number
  ki_points?: number
  witchcraft_points?: number
}

// Points de vie
export interface LifePoints {
  id?: number
  current: number
  max: number
}

// Pièces
export interface Coins {
  id?: number
  copper: number
  silver: number
  gold: number
  platinum: number
}

// Classe de personnage
export interface CharacterClass {
  id?: number
  class_name: string
  class_level: number
  class_sub?: string
  deVie?: string
  masters?: string[]
  savingThrows?: string[]
}

// Compétences
export interface Skill {
  id?: number
  name: string
  expertise?: boolean
  ability?: string
  description?: string
  mastery?: boolean
}

// Capacités
export interface Capacity {
  id?: number
  name: string
  level: number
  description: string
}

// Maîtrises
export interface Mastery {
  id?: number
  name: string
}

// Dons
export interface Gift {
  id?: number
  name: string
  prerequisites?: string
  description: string
}

// Armes
export interface Weapon {
  id?: number
  name: string
  bonus: number
  damage: string
  note?: string
  characteristic: 'for' | 'dex'
}

// Armures
export interface Armor {
  id?: number
  name: string
  type: string
  indice: number
  max_dex: number
  discretion?: string
  weight?: string
  note?: string
}

// Possessions
export interface Possession {
  id?: number
  name: string
  quantity: number
  description?: string
}

// Sorts
export interface CharacterSpell {
  id?: number
  spellId: number
}

// Personnage complet
export interface Character {
  id: number
  documentId: string
  characteristics: Characteristic[]
  informations: CharacterInformation
  life_points: LifePoints
  coins: Coins
  class: CharacterClass[]
  skills: Skill[]
  capacities: Capacity[]
  mastery: Mastery[]
  gifts: Gift[]
  weapons: Weapon[]
  armors: Armor[]
  possessions: Possession[]
  spells: CharacterSpell[]
  notes?: string
  createdAt: string
  updatedAt: string
}

// Journal/Notes
export interface JournalEntry {
  id: number
  documentId: string
  note_date: string
  note_auteur: string
  note_content: string
  createdAt: string
  updatedAt: string
}

// Données des sorts (depuis le JSON)
export interface SpellClass {
  Value: string
}

export interface SpellRange {
  Value: string
}

export interface SpellDuration {
  Value: string
}

export interface SpellCastingTime {
  Value: string
}

export interface SpellSchool {
  Value: string
}

export interface SpellData {
  Id: number
  Name: string
  Level: number
  Classes: SpellClass[]
  Range: SpellRange
  Duration: SpellDuration
  CastingTime: SpellCastingTime
  School: SpellSchool
  Components?: string
  Description: string
  Ritual?: boolean
}

// Données des armes (depuis le JSON)
export interface WeaponData {
  name: string
  category: string
  cost: string
  damage: string
  damageType: string
  weight: string
  properties: string[]
  characteristic?: 'for' | 'dex'
  bonus?: number
}

// Données des armures (depuis le JSON)
export interface ArmorData {
  name: string
  category: string
  cost: string
  armorClass: number | string
  max_bonus_dex?: number
  stealth: string
  weight: string
  strength?: string
  note?: string
}

// Données des dons (depuis le JSON)
export interface FeatData {
  name: string
  prerequisites?: string
  description: string
}

// Données des manifestations occultes (depuis le JSON)
export interface ManifestationData {
  titre: string
  prerequis?: string
  description: string
}

// Données des classes (depuis le JSON)
export interface ClassData {
  nom: string
  deVie: string
  maitrises: string[]
  outils: string[]
  jetsDeSauvegarde: string[]
  competences: {
    nombre: number
    liste: string[]
  }
  sort: string
}

// Données des compétences (depuis le JSON)
export interface SkillData {
  name: string
  ability: string
  description: string
}

// Emplacements de sorts
export interface SpellSlots {
  [key: string]: number
}

// Capacités de classe spécifiques
export interface ClassAbilities {
  class_name: string
  [key: string]: any
}

// Types pour les calculs
export interface CACalculation {
  score: number
  note: string
  type: string
}

// Types pour les réponses API Strapi
export interface StrapiResponse<T> {
  data: T
  meta?: {
    pagination?: {
      page: number
      pageSize: number
      pageCount: number
      total: number
    }
  }
}

// Types pour les erreurs
export interface ApiError {
  message: string
  status?: number
}

// Types pour les notifications
export interface NotificationOptions {
  title: string
  position?: string
  timeout?: number
  closeOnClick?: boolean
  showCloseButtonOnHover?: boolean
  hideProgressBar?: boolean
  closeButton?: boolean
  rtl?: boolean
  icon?: boolean
}