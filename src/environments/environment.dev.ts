export const environment = {
    production: false,
    BASE_URL:'http://localhost:3000/',
    PLANTS_BASE_URL:'http://localhost:3000/plants/',
    MESSAGES_BASE_URL:'http://localhost:3000/messages/',
    PLANTS: {
        GET_ALL_PLANTS:'list',
        GET_A_PLANT:'view/',
        CREATE_PLANT:'add',
        UPDATE_PLANT:'update',
        DELETE_PLANT:'delete/'
    },
    AUTH: {
        LOGIN:'auth/login',
        CREATE:'auth/register',
    },
    MESSAGES: {
        CREATE_MESSAGE:'add',
    }
  };
  