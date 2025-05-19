import featsJson from "public/feats.json";

export const useFeats = () => {
    const featsList = () => {
        return featsJson;
    };

    return {
        featsList,
    };
}