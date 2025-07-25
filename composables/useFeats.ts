import featsJson from "@/public/feats.json"
import type { FeatData } from '~/types'
import type { UseFeatsReturn } from '~/types/composables'

export const useFeats = (): UseFeatsReturn => {
    const featsList = (): FeatData[] => {
        return featsJson as FeatData[]
    }

    return {
        featsList,
    }
}