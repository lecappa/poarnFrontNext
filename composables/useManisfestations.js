import featsJson from "@/public/manifestations.json";

export const useManisfestations = () => {
    const manisfestationsList = () => {
        return featsJson;
    };

    return {
        manisfestationsList,
    };
}