    const COUNTRY_ADDRESS_POSTALS = [
    {
        abbrev: 'es',
        name: 'Spain',
        postal: '^[0-9]{5}$',
        message:'Needs 5 numbers from 0 to 9'
    },
    {
        abbrev: 'fr',
        name: 'France',
        postal: '^[0-9]{5}$',
        message:'Needs 5 numbers from 0 to 9'
    },
    {
        abbrev: 'it',
        name: 'Italy',
        postal: '^[0-9]{5}$',
        message:'Needs 5 numbers from 0 to 9'
    },
    {
        abbrev: 'at',
        name: 'Austria',
        postal: '^[0-9]{4}$',
        message:'Needs 4 numbers from 0 to 9'
    },
    {
        abbrev: 'ar',
        name: 'Argentina',
        postal: '^[A-Z]{1}[0-9]{4}[A-Z]{3}$',
        message:'You need 1 capital letter followed by 4 numbers from 0 to 9 followed by three capital letters'
    },
    {
        abbrev: 'fo',
        name: 'Faroe Islands',
        postal: '^[0-9]{3}$',
        message:'Needs 3 numbers from 0 to 9'
    },
    ]

    export default COUNTRY_ADDRESS_POSTALS;
