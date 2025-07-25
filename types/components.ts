import type { JournalEntry } from './index'

// Props pour les composants
export interface AddNoteProps {
  note?: JournalEntry | null
}

export interface AddNoteEmits {
  close: [refreshData?: boolean]
}

// Types pour les événements de composants
export interface ComponentEmits {
  close: () => void
  update: () => void
  delete: (id: number) => void
}

// Types pour les formulaires
export interface FormData {
  [key: string]: any
}

// Types pour les dialogues
export interface DialogState {
  isOpen: boolean
  isEdit: boolean
  data: any
}

// Types pour les filtres
export interface FilterOptions {
  search: string
  category: string
  level?: number
}

// Types pour les listes
export interface ListItem {
  id: number
  name: string
  [key: string]: any
}

// Types pour les actions de liste
export interface ListActions {
  add: (item: any) => void
  edit: (item: any) => void
  delete: (id: number) => void
  update: () => Promise<void>
}