import createElement from '../model/createElement.js';

export default (state) => {
  const resultDiv = createElement('div', ['results']);
  const resultList = createElement('ul', ['results__list']);
  const resultHeader = createElement('h4', ['results__title']);
  resultHeader.textContent = 'Results';

  resultDiv.append(resultHeader, resultList);

  const savedArrayData = localStorage.getItem('results');
  console.log(savedArrayData);
  if (!savedArrayData) {
    return resultDiv;
  }

  const parsedArray = JSON.parse(savedArrayData);
  const reusltArray = parsedArray.length < 10 ? parsedArray : parsedArray.slice(-10);
  state.result = reusltArray;
  reusltArray.forEach(({ result, time }, idx) => {
    const li = createElement('li', []);
    li.textContent = `${idx + 1}.  Result: ${result}, time: ${time} sec`;
    resultList.append(li);
  });

  return resultDiv;
};
