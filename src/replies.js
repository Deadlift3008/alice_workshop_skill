/**
 * Приветственное сообщение при входе в навык.
 */
exports.welcome = () => {
  const greeting = getRandomElement(['Привет', 'Здравствуйте']);

  return {
    text: `${greeting}, я ваш новый учитель математики. Начинаем урок?`,
    tts: `<speaker audio="alice-sounds-things-car-1.opus">${greeting}, я ваш новый учитель математики. Начинаем урок?`,
    buttons: [
      { title: 'Поехали 😎', hide: true },
    ],
    end_session: false
  };
};

/**
 * Первый вопрос пользователю
 * @param {Number} number1
 * @param {Number} number2.
 */
exports.firstQuestion = ({ number1, number2 }) => {
  return {
    text: `Сколько будет ${number1} + ${number2} = ?`,
    tts: `Сколько будет ${number1} + ${number2}`,
    buttons: [capitulateButton, dontKnowButton],
    end_session: false
  };
};

/**
 * Реакция на неправильный ответ.
 *
 * @param {Number} number1
 * @param {Number} number2
 */
exports.incorrectAnswer = ({ number1, number2 }) => {
  const no = getRandomElement(['Неверно', 'Неправильно', 'Нет']);

  return {
    text: `${no}. Попробуй еще раз: ${number1} + ${number2} = ?`,
    tts: `<speaker audio="alice-sounds-game-loss-1.opus">${no}. Попробуй еще раз: ${number1} + ${number2}`,
    buttons: [capitulateButton, dontKnowButton],
    end_session: false
  };
};

/**
 * Реакция на правильный ответ.
 *
 * @param {Number} number1
 * @param {Number} number2
 */
exports.correctAnswer = ({ number1, number2 }) => {
  const yes = getRandomElement(['Правильно', 'Отлично', 'Да']);

  return {
    text: `${yes}! Следующий вопрос: ${number1} + ${number2} = ?`,
    tts: `<speaker audio="alice-sounds-things-explosion-1.opus">Правильно! Следующий вопрос: ${number1} + ${number2}`,
    buttons: [capitulateButton, dontKnowButton],
    end_session: false
  };
};

/**
 * Реакция на "сдаюсь".
 *
 * @param {Number} answer
 * @param {Number} number1
 * @param {Number} number2
 */
exports.capitulate = (answer, { number1, number2 }) => {
  return {
    text: `Правильный ответ ${answer}. Задам другой пример: ${number1} + ${number2} = ?`,
    tts: `<speaker audio="alice-sounds-game-loss-3.opus">Правильный ответ ${answer}. Задам другой пример: ${number1} + ${number2}`,
    buttons: [capitulateButton, dontKnowButton],
    end_session: false
  };
};

exports.dontKnow  = (answer) => {
  const number1 = Math.ceil(Math.random() * answer);
  const number2 = answer - number1;

  const phrase = getRandomElement(['Ёшки матрешки!', 'Алё, ну ты тупой!', 'Ты с дубу рухнул?']);

  return {
    text: `${phrase} Это же тоже самое что и ${number1} + ${number2}. Сколько будет ${number1} + ${number2}, ну?`,
    tts: `<speaker audio="alice-sounds-game-8-bit-phone-1.opus">${phrase} Это же тоже самое что и ${number1} + ${number2}. Сколько будет ${number1} + ${number2}, ну?`,
    buttons: [capitulateButton, dontKnowButton],
    end_session: false
  };
}

const capitulateButton = {
  title: 'Сдаюсь', hide: true
};

const dontKnowButton = {
  title: 'Не знаю', hide: true
};

function getRandomElement(arr) {
  const index = Math.floor(Math.random() * arr.length);
  return arr[index];
}

