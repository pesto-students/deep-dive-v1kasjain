const animalSort = animals => {
  return animals.sort((firstAnimal, secondAnimal) => {
    const legCountDifference =
      firstAnimal.numberOfLegs - secondAnimal.numberOfLegs;
    if (legCountDifference === 0) {
      if (firstAnimal.name > secondAnimal.name) {
        return 1;
      } else if (firstAnimal.name < secondAnimal.name) {
        return -1;
      } else {
        return 0;
      }
    } else {
      return legCountDifference;
    }
  });
};

export { animalSort };
