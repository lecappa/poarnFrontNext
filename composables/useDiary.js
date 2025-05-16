import {useStrapi} from "#imports";
const { find } = useStrapi()

export const useDiary = () => {

    const diaryData = () => useState('diaryData', () => ([]));
    const callDiaryData = async () => {
        const response = await find('journals')
        diaryData().value = response.data
    }

    return [
        callDiaryData,
        diaryData
    ]
}

