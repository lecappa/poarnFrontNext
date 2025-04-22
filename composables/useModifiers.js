import {useCharacterData} from "~/composables/useCharacterData.js";

export const useCharacteristicsModifiers =  (score) => {
    let scoreInt = ref(parseInt(score));
    if (scoreInt < 1) {
        return 0;
    }
    if (scoreInt.value === 1) {
        return -5;
    }
    if (scoreInt.value === 2 || scoreInt.value === 3) {
        return -4;
    }
    if (scoreInt.value === 4 || scoreInt.value === 5) {
        return -3;
    }
    if (scoreInt.value === 6 || scoreInt.value === 7) {
        return -2;
    }
    if (scoreInt.value === 8 || scoreInt.value === 9) {
        return -1;
    }
    if (scoreInt.value === 10 || scoreInt.value === 11) {
        return 0;
    }
    if (scoreInt.value === 12 || scoreInt.value === 13) {
        return 1;
    }
    if (scoreInt.value === 14 || scoreInt.value === 15) {
        return 2;
    }
    if (scoreInt.value === 16 || scoreInt.value === 17) {
        return 3;
    }
    if (scoreInt.value === 18 || scoreInt.value === 19) {
        return 4;
    }
    if (scoreInt.value === 20 || scoreInt.value === 21) {
        return 5;
    }
    if (scoreInt.value > 21) {
        return 6;
    }
}

export const getMasteryBonus = () => {
    const data = useCharacterData();
    const level  = ref(data.value.informations.main_level);

    if (level.value >= 1 && level.value<= 4) {
        return 2;
    }
    if (level.value>= 5 && level.value <= 8) {
        return 3;
    }
    if (level.value >= 9 && level.value <= 12) {
        return 4;
    }
    if (level.value >= 13 && level.value <= 16) {
        return 5;
    }
    if (level.value >= 17 && level.value <= 20) {
        return 6;
    }
    if (level.value > 20) {
        return 7;
    }
}
