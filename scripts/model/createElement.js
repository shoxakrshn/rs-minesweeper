const createElement = (tagName, styles = []) => {
  const element = document.createElement(tagName);

  if (!styles.length) {
    return element;
  }

  if (styles.length === 1) {
    element.classList.add(styles[0]);
    return element;
  }

  styles.forEach((item) => element.classList.add(item));
  return element;
};

export default createElement;
