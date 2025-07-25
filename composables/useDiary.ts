import { useStrapi } from "#imports"
import type { JournalEntry } from '~/types'
import type { UseDiaryReturn } from '~/types/composables'

const { find } = useStrapi()

export const useDiary = (): UseDiaryReturn => {
    const diaryData = (): Ref<JournalEntry[]> => useState('diaryData', () => [])
    
    const callDiaryData = async (): Promise<void> => {
        const response = await find('journals')
        diaryData().value = response.data
    }

    return [
        callDiaryData,
        diaryData
    ]
}