import type { WeaponData, ArmorData } from '~/types'

export const weapons: WeaponData[] = [
    {
        name: 'Bâton',
        category: 'Armes courantes de corps à corps',
        cost: '2 pa',
        damage: '1d6',
        damageType: 'contondant',
        weight: '1,8 kg',
        properties: ['polyvalent (1d8)'],
        characteristic: 'dex'
    },
    {
        name: 'Dague',
        category: 'Armes courantes de corps à corps',
        cost: '2 po',
        damage: '1d4',
        damageType: 'perforant',
        weight: '0,5 kg',
        properties: ['finesse', 'légère', 'lancer (6/18)'],
        characteristic: 'dex'
    },
    {
        name: 'Gourdin',
        category: 'Armes courantes de corps à corps',
        cost: '1 pa',
        damage: '1d4',
        damageType: 'contondant',
        weight: '1 kg',
        properties: ['légère'],
        characteristic: 'for'
    },
    {
        name: 'Hachette',
        category: 'Armes courantes de corps à corps',
        cost: '5 po',
        damage: '1d6',
        damageType: 'tranchant',
        weight: '1 kg',
        properties: ['légère', 'lancer (6/18)'],
        characteristic: 'for'
    },
    {
        name: 'Javeline',
        category: 'Armes courantes de corps à corps',
        cost: '5 pa',
        damage: '1d6',
        damageType: 'perforant',
        weight: '1 kg',
        properties: ['lancer (9/36)'],
        characteristic: 'dex'
    },
    {
        name: 'Lance',
        category: 'Armes courantes de corps à corps',
        cost: '1 po',
        damage: '1d6',
        damageType: 'perforant',
        weight: '1,5 kg',
        properties: ['lancer (6/18)', 'polyvalent (1d8)'],
        characteristic: 'dex',
    },
    {
        name: 'Marteau léger',
        category: 'Armes courantes de corps à corps',
        cost: '2 po',
        damage: '1d4',
        damageType: 'contondant',
        weight: '1 kg',
        properties: ['légère', 'lancer (6/18)'],
        characteristic: 'for'
    },
    {
        name: 'Massue',
        category: 'Armes courantes de corps à corps',
        cost: '1 po',
        damage: '1d8',
        damageType: 'contondant',
        weight: '5 kg',
        properties: [],
        characteristic: 'for'
    },

    // Armes courantes à distance
    {
        name: 'Arbalète légère',
        category: 'Armes courantes à distance',
        cost: '25 po',
        damage: '1d8',
        damageType: 'perforant',
        weight: '2,5 kg',
        properties: ['munition (24/96)', 'chargement', 'deux mains'],
        characteristic: 'dex'
    },
    {
        name: 'Arc court',
        category: 'Armes courantes à distance',
        cost: '25 po',
        damage: '1d6',
        damageType: 'perforant',
        weight: '1 kg',
        properties: ['munition (24/96)', 'deux mains'],
        characteristic: 'dex'
    },
    {
        name: 'Fléchette',
        category: 'Armes courantes à distance',
        cost: '5 pc',
        damage: '1d4',
        damageType: 'perforant',
        weight: '0,1 kg',
        properties: ['finesse', 'lancer (6/18)'],
        characteristic: 'dex'
    },
    {
        name: 'Fronde',
        category: 'Armes courantes à distance',
        cost: '1 pa',
        damage: '1d4',
        damageType: 'contondant',
        weight: '0 kg',
        properties: ['munition (9/36)'],
        characteristic: 'dex'
    },

    // Armes de guerre de corps à corps
    {
        name: 'Cimeterre',
        category: 'Armes de guerre de corps à corps',
        cost: '25 po',
        damage: '1d6',
        damageType: 'tranchant',
        weight: '1,5 kg',
        properties: ['finesse', 'légère'],
        characteristic: 'dex'
    },
    {
        name: 'Épée à deux mains',
        category: 'Armes de guerre de corps à corps',
        cost: '50 po',
        damage: '2d6',
        damageType: 'tranchant',
        weight: '3 kg',
        properties: ['lourde', 'deux mains'],
        characteristic: 'for'
    },
    {
        name: 'Épée courte',
        category: 'Armes de guerre de corps à corps',
        cost: '10 po',
        damage: '1d6',
        damageType: 'perforant',
        weight: '1 kg',
        properties: ['finesse', 'légère'],
        characteristic: 'dex'
    },
    {
        name: 'Épée longue',
        category: 'Armes de guerre de corps à corps',
        cost: '15 po',
        damage: '1d8',
        damageType: 'tranchant',
        weight: '1,5 kg',
        properties: ['polyvalent (1d10)'],
        characteristic: 'for'
    },
    {
        name: 'Fléau',
        category: 'Armes de guerre de corps à corps',
        cost: '10 po',
        damage: '1d8',
        damageType: 'contondant',
        weight: '1 kg',
        properties: [],
        characteristic: 'for'

    },
    {
        name: 'Hache d\'armes',
        category: 'Armes de guerre de corps à corps',
        cost: '10 po',
        damage: '1d8',
        damageType: 'tranchant',
        weight: '2 kg',
        properties: ['polyvalent (1d10)'],
        characteristic: 'for'
    },
    {
        name: 'Hallebarde',
        category: 'Armes de guerre de corps à corps',
        cost: '20 po',
        damage: '1d10',
        damageType: 'tranchant',
        weight: '3 kg',
        properties: ['lourde', 'allonge', 'deux mains'],
        characteristic: 'for'
    },
    {
        name: 'Lance d\'arçon',
        category: 'Armes de guerre de corps à corps',
        cost: '10 po',
        damage: '1d12',
        damageType: 'perforant',
        weight: '3 kg',
        properties: ['allonge', 'spéciale'],
        characteristic: 'for'
    },
    {
        name: 'Marteau de guerre',
        category: 'Armes de guerre de corps à corps',
        cost: '15 po',
        damage: '1d8',
        damageType: 'contondant',
        weight: '1 kg',
        properties: ['polyvalent (1d10)'],
        characteristic: 'for'
    },
    {
        name: 'Pique',
        category: 'Armes de guerre de corps à corps',
        cost: '5 po',
        damage: '1d10',
        damageType: 'perforant',
        weight: '9 kg',
        properties: ['lourde', 'allonge', 'deux mains'],
        characteristic: 'for'
    },
    {
        name: 'Rapière',
        category: 'Armes de guerre de corps à corps',
        cost: '25 po',
        damage: '1d8',
        damageType: 'perforant',
        weight: '1 kg',
        properties: ['finesse'],
        characteristic: 'dex'
    },
    {
        name: 'Trident',
        category: 'Armes de guerre de corps à corps',
        cost: '5 po',
        damage: '1d6',
        damageType: 'perforant',
        weight: '2 kg',
        properties: ['lancer (6/18)', 'polyvalent (1d8)'],
        characteristic: 'for'
    },

    // Armes de guerre à distance
    {
        name: 'Arbalète de poing',
        category: 'Armes de guerre à distance',
        cost: '75 po',
        damage: '1d6',
        damageType: 'perforant',
        weight: '1,5 kg',
        properties: ['munition (9/36)', 'chargement', 'légère'],
        characteristic: 'dex'
    },
    {
        name: 'Arbalète lourde',
        category: 'Armes de guerre à distance',
        cost: '50 po',
        damage: '1d10',
        damageType: 'perforant',
        weight: '9 kg',
        properties: ['munition (30/120)', 'chargement', 'lourde', 'deux mains'],
        characteristic: 'dex'
    },
    {
        name: 'Arc long',
        category: 'Armes de guerre à distance',
        cost: '50 po',
        damage: '1d8',
        damageType: 'perforant',
        weight: '1 kg',
        properties: ['munition (45/180)', 'lourde', 'deux mains'],
        characteristic: 'dex'
    },
    {
        name: 'Filet',
        category: 'Armes de guerre à distance',
        cost: '1 po',
        damage: '0',
        damageType: '-',
        weight: '1,5 kg',
        properties: ['spéciale', 'lancer (1,5/4,5)'],
        characteristic: 'dex'
    }
]

export const armors: ArmorData[] = [
    {
        name: 'Matelassée',
        category: 'Armures légères',
        cost: '5 po',
        armorClass: 11,
        max_bonus_dex: 0,
        stealth: 'Désavantage',
        weight: '4 kg'
    },
    {
        name: 'Cuir',
        category: 'Armures légères',
        cost: '10 po',
        armorClass: 11,
        max_bonus_dex: 0,
        stealth: 'Normal',
        weight: '5 kg'
    },
    {
        name: 'Cuir clouté',
        category: 'Armures légères',
        cost: '45 po',
        armorClass: 12,
        max_bonus_dex: 0,
        stealth: 'Normal',
        weight: '6,5 kg'
    },

    // Armures intermédiaires
    {
        name: 'Peau',
        category: 'Armures intermédiaires',
        cost: '10 po',
        armorClass: 12,
        max_bonus_dex: 2,
        stealth: 'Normal',
        weight: '6 kg'
    },
    {
        name: 'Chemise de mailles',
        category: 'Armures intermédiaires',
        cost: '50 po',
        armorClass: 13,
        max_bonus_dex: 2,
        stealth: 'Normal',
        weight: '10 kg'
    },
    {
        name: 'Écailles',
        category: 'Armures intermédiaires',
        cost: '50 po',
        armorClass: 14,
        max_bonus_dex: 2,
        stealth: 'Désavantage',
        weight: '22,5 kg'
    },
    {
        name: 'Cuirasse',
        category: 'Armures intermédiaires',
        cost: '400 po',
        armorClass: 14,
        max_bonus_dex: 2,
        stealth: 'Normal',
        weight: '10 kg'
    },
    {
        name: 'Demi-plate',
        category: 'Armures intermédiaires',
        cost: '750 po',
        armorClass: 15,
        max_bonus_dex: 2,
        stealth: 'Désavantage',
        weight: '20 kg'
    },

    // Armures lourdes
    {
        name: 'Broigne',
        category: 'Armures lourdes',
        cost: '30 po',
        armorClass: 14,
        max_bonus_dex: 0,
        strength: 'Force 13',
        stealth: 'Désavantage',
        weight: '20 kg'
    },
    {
        name: 'Cotte de mailles',
        category: 'Armures lourdes',
        cost: '75 po',
        armorClass: 14,
        max_bonus_dex: 0,
        strength: 'Force 13',
        stealth: 'Désavantage',
        weight: '27,5 kg'
    },
    {
        name: 'Clibanion',
        category: 'Armures lourdes',
        cost: '200 po',
        armorClass: 17,
        max_bonus_dex: 0,
        strength: 'Force 15',
        stealth: 'Désavantage',
        weight: '30 kg'
    },
    {
        name: 'Harnois',
        category: 'Armures lourdes',
        cost: '1500 po',
        armorClass: 18,
        max_bonus_dex: 0,
        strength: 'Force 15',
        stealth: 'Désavantage',
        weight: '32,5 kg'
    },

    // Boucliers
    {
        name: 'Bouclier',
        category: 'Boucliers',
        cost: '10 po',
        armorClass: 2,
        max_bonus_dex: 0,
        stealth: 'Normal',
        weight: '3 kg'
    }
]