const animalSort = animals => {
  return animals.sort((firstAnimal, secondAnimal) => {
    if (firstAnimal.numberOfLegs === secondAnimal.numberOfLegs) {
      if (firstAnimal.name > secondAnimal.name) return 1;
      else if (firstAnimal.name < secondAnimal.name) return -1;
      else return 0;
    }
    return firstAnimal.numberOfLegs - secondAnimal.numberOfLegs;
  });
};

export { animalSort };
