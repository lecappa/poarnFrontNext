import featsJson from "@/public/manifestations.json"
import type { ManifestationData } from '~/types'
import type { UseManifestationsReturn } from '~/types/composables'

export const useManisfestations = (): UseManifestationsReturn => {
    const manisfestationsList = (): ManifestationData[] => {
        return featsJson as ManifestationData[]
    }

    return {
        manisfestationsList,
    }
}