function dropElements(elements, predicate) {
  const remainingElements = [];
  for (const el of elements) {
    if (predicate(el)) {
      remainingElements.push(el);
    }
  }
  return remainingElements;
}

export { dropElements };
