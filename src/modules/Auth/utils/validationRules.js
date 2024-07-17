import { required, minLength, helpers } from '@vuelidate/validators';

const registrationRules = {
  name: { required: helpers.withMessage('Обязательное поле', required) },
  surname: { required: helpers.withMessage('Обязательное поле', required) },
  login: {
    required: helpers.withMessage('Обязательное поле', required),
    minLength: helpers.withMessage('Логин должен содержать минимум 6 символов', minLength(6)),
  },
  password: { required, minLength: helpers.withMessage('Пароль должен содержать минимум 6 символов', minLength(6)) },
  city: { required: helpers.withMessage('Обязательное поле', required) },
};

const loginRules = {
  login: { required: helpers.withMessage('Обязательное поле', required) },
  password: { required: helpers.withMessage('Обязательное поле', required) },
};

export { registrationRules, loginRules };
