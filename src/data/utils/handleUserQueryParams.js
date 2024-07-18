export function handleUserQueryParams(user, query) {
  const queryEntries = Object.entries(query);
  let proccessedQueryCount = 0;

  for (const [queryKey, queryValue] of queryEntries) {
    const userValue = user[queryKey];

    switch (queryKey) {
      case 'name' && !query['surname']:
        if (userValue === queryValue || user['surname'] === queryValue) {
          proccessedQueryCount++;
        }

        break;
      case 'onlyOnline':
        if (!queryValue || (queryValue && user.status === 'online')) {
          proccessedQueryCount++;
        }

        break;
      default:
        if (userValue === queryValue) {
          proccessedQueryCount++;
        }
    }
  }

  if (proccessedQueryCount === queryEntries.length) {
    return {
      id: user.id,
      name: user.name,
      surname: user.surname,
      city: user.city,
      status: user.status,
    };
  }
}
