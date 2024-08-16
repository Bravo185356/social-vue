const chatData = [
  {
    id: 1,
    users: [
      { id: 2, name: 'Тестовый', surname: 'друг 2' },
      { id: 1, name: 'Имя', surname: 'Фамилия' },
    ],
    messages: [
      {
        id: 1,
        author: { id: 2, name: 'Тестовый', surname: 'друг 2' },
        text: '1111111111111111111111 1111111111111111111111111',
        created: new Date(),
      },
    ],
  },
  {
    id: 2,
    users: [
      { id: 3, name: 'Тестовый', surname: 'друг 3' },
      { id: 1, name: 'Тестовый', surname: 'друг 3' },
    ],
    messages: [
      { id: 3, author: { id: 3, name: 'Тестовый', surname: 'друг 3' }, text: 'Я юзер 3', created: new Date() },
      { id: 4, author: { id: 3, name: 'Тестовый', surname: 'друг 3' }, text: 'Я юзер 3', created: new Date() },
      { id: 5, author: { id: 1, name: 'Имя', surname: 'Фамилия' }, text: 'Я юзер 1', created: new Date() },
    ],
  },
]

export { chatData }
