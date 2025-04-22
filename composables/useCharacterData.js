import classesInfos from "public/classesInfos.json";
import allSkills from "public/skills.json";

const route = useRoute();
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
    const response = await findOne('characters', route.params.id, {
        populate: [
            'characteristics', 'informations', 'skills', 'class', 'life_points', 'mastery',
        ]
    });
    const data = useCharacterData();
    return data.value = response.data[0];
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
            mastery : data.value.skills.some(checkMasterySkill),
            expertise: isExpertise
        });
    })
    return skills;
}