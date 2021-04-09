export const userMessages = {
  NOT_FOUND: 'Usuário não encontrado.',
  VALIDATION: {
    ID: {
      FORMAT:
        'O identificador do usuário (id) informado não é do tipo UUID (universally unique identifier).',
    },
    EMAIL: {
      FORMAT: 'O e-mail do usuário informado não é válido.',
      REQUIRED: 'O e-mail do usuário não foi informado.',
    },
    NAME: {
      FORMAT: 'O nome do usuário deve ser do tipo alfanumérico.',
      REQUIRED: 'O nome do usuário não foi informado.',
    },
    ROLE: {
      FORMAT: 'O tipo de usuário deve ser do tipo alfanumérico.',
    },
    PASSWORD: {
      FORMAT: 'O senha do usuário deve ser do tipo alfanumérica.',
      REQUIRED: 'O senha de usuário não foi informada.',
    },
  },
};
