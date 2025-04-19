import {useCharacterData} from "~/composables/useCharacterData.js";

export const useCharacteristicsModifiers =  (score) => {
    let scoreInt = parseInt(score);
    if (scoreInt < 1) {
        return 0;
    }
    if (scoreInt === 1) {
        return -5;
    }
    if (scoreInt === 2 || scoreInt === 3) {
        return -4;
    }
    if (scoreInt === 4 || scoreInt === 5) {
        return -3;
    }
    if (scoreInt === 6 || scoreInt === 7) {
        return -2;
    }
    if (scoreInt === 8 || scoreInt === 9) {
        return -1;
    }
    if (scoreInt === 10 || scoreInt === 11) {
        return 0;
    }
    if (scoreInt === 12 || scoreInt === 13) {
        return 1;
    }
    if (scoreInt === 14 || scoreInt === 15) {
        return 2;
    }
    if (scoreInt === 16 || scoreInt === 17) {
        return 3;
    }
    if (scoreInt === 18 || scoreInt === 19) {
        return 4;
    }
    if (scoreInt === 20 || scoreInt === 21) {
        return 5;
    }
    if (scoreInt > 21) {
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
