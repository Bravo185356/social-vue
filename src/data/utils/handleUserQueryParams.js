export function handleUserQueryParams(user, query) {
  const queryEntries = Object.entries(query);
  let proccessedQueryCount = 0;

  for (const [queryKey, queryValue] of queryEntries) {
    if (queryKey === 'onlyOnline' && (!queryValue || (queryValue && user.status === 'online'))) {
      proccessedQueryCount = proccessedQueryCount + 1;
    } else if (queryKey === 'name' && !query['surname']) {
      if (user[queryKey] === queryValue || user['surname'] === queryValue) {
        proccessedQueryCount = proccessedQueryCount + 1;
      }
    } else if (user[queryKey] === queryValue) {
      proccessedQueryCount = proccessedQueryCount + 1;
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
