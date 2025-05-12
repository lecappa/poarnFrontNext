import classesInfos from "public/classesInfos.json";
import allSkills from "public/skills.json";
import {ref} from "vue";
import {getMasteryBonus, useUnityCharacteristicsModifiers} from "~/composables/useModifiers.js";

const user = useStrapiUser();
const {findOne} = useStrapi();
export const useCharacterData = () => {
    return useState('characterData', () => [])
}


export const getClassSkills = () => {
    const data = useCharacterData();
    return data.value.class.forEach((element) => {
        const infos = getFullInfosCLass(element.class_name);
        element.deVie = infos[0].deVie
        element.maitrises = infos[0].maitrises
        element.jetsDeSauvegarde = infos[0].jetsDeSauvegarde
    });
}

export const getClassSkillsMastery = () => {
    const data = useCharacterData();
    const skills = [];
    const allSkills = data.value.class.forEach((element, i) => {
        skills.push(element.maitrises);
    })
    return new Set(skills.flat());
}
export const callCharacterData = async () => {
    const response = await findOne('characters', user.value.character_id, {
        populate: '*'
    });
    const data = useCharacterData();
    return data.value = response.data;
}

const getFullInfosCLass = (className) => {
    return (classesInfos.filter((i) => i.nom === className));
}


export const getCharacterDataSkills = () => {
    const data = useCharacterData();
    let skills = [];

    allSkills.forEach((element) => {
        const test = data.value.skills.filter((i) => i.name === element.name);
        let isExpertise = false;
        if (test.length > 0) {
            isExpertise = test[0].expertise;
        }
        const checkMasterySkill = obj => obj.name === element.name;
        skills.push({
            name: element.name,
            ability: element.ability,
            mastery: data.value.skills.some(checkMasterySkill),
            expertise: isExpertise
        });
    })
    return skills;
}

export const useCharacterCA = () => {
    const data = useCharacterData();
    const character_class = ref(data.value.class);
    const character_armors = ref(data.value.armors);
    const isMonk = character_class.value.filter((i) => i.class_name === 'Moine');
    const initialValue = 0;
    const sumWithInitial = character_armors.value.reduce(
        (accumulator, currentValue) => accumulator + parseInt(currentValue.indice), initialValue,
    );

    let CA_result = {};

    if (isMonk.length > 0) {
        CA_result = {
            score: useUnityCharacteristicsModifiers('dex') + 10 + useUnityCharacteristicsModifiers('sag'),
            note: '10 + Sag (' + useUnityCharacteristicsModifiers('sag')+ ') + Dex(' + useUnityCharacteristicsModifiers('dex') + ')',
            type: 'Moine :',
        }
    } else if (character_armors.value.length === 0) {
        CA_result = {
            score: useUnityCharacteristicsModifiers('dex') + 10,
            note: '10 + Dex(' + useUnityCharacteristicsModifiers('dex') + ')',
            type: 'Sans armure :',
        }
    } else {
        CA_result = {
            score: sumWithInitial + useUnityCharacteristicsModifiers('dex'),
            note: 'Armures ('+sumWithInitial + ') + Dex(' + useUnityCharacteristicsModifiers('dex') + ')',
            type: 'Total CA :',
        }
    }
    return CA_result;
}