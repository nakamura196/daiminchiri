import itaiji from '../assets/json/itaiji.json'

const createItaijiMap = () => {
  const itaijiMap = {};
  for (const key in itaiji) {
    const value = itaiji[key];

    if (!itaijiMap[key]) {
      itaijiMap[key] = [key];
    }
    itaijiMap[key].push(value);

    if (!itaijiMap[value]) {
      itaijiMap[value] = [value];
    }
    itaijiMap[value].push(key);
  }
  return itaijiMap;
};

export { createItaijiMap };
