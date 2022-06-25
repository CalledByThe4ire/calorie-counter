import Component from '@/js/components/component.js';
import { WeightManipulation } from '@/js/const';

const results = [
  {
    type: WeightManipulation.MAINTENANCE,
    description: 'поддержание веса',
  },
  {
    type: WeightManipulation.LOSS,
    description: 'снижение веса',
  },
  {
    type: WeightManipulation.GAIN,
    description: 'набор веса',
  },
];

const createHeadingMarkup = (heading) => {
  return (
    `<h2 class="heading">${heading}</h2>`
  );
};

const createResultMarkup = (result) => {
  const createResultsItemMarkup = (item) => {
    const { type, description } = item;

    return (
      `<h3>
        <span>${Math.trunc(result[type]).toLocaleString('ru-RU')}</span> ккал
      </h3>
      <p>${description}</p>`
    );
  };

  return (
    `<ul class="counter__result-list">
      ${results
        .map((item) => {
          const resultItem = createResultsItemMarkup(item);

          return (
            `<li class="counter__result-item">${resultItem}</li>`
          );
        })
        .join('\n')}
    </ul>`
  );
};

const createResultTemplate = (result) => {
  return (
    `<section class="counter__result">
      ${createHeadingMarkup('Ваша норма калорий')}
      ${createResultMarkup(result)}
    </section>;`
  );
};

export default class Result extends Component {
  constructor(result) {
    super();
    this._result = result;
  }
  getTemplate() {
    return createResultTemplate(this._result);
  }
}
