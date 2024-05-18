const getRandomValue = (set) => {
    const randomIndex = Math.floor(Math.random() * set.length);
    const randomItem = set[randomIndex];
    return randomItem.value;
}

export default getRandomValue