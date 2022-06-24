import Component from '@/js/components/component.js';

const results = [
  {
    type: 'maintenance',
    description: 'поддержание веса',
  },
  {
    type: 'loss',
    description: 'снижение веса',
  },
  {
    type: 'gain',
    description: 'набор веса',
  },
];

const createHeadingMarkup = (heading) => {
  return `<h2 class="heading">${heading}</h2>`;
};

const createResultMarkup = (result) => {
  const createResultsItemMarkup = (item) => {
    const { type, description } = item;

    return (
      `<h3>
        <span data-goal="${type}">${result[type].toLocaleString()}</span> ккал
      </h3>
      <p>${description}</p>`
    );
  };

  return (
    `<ul class="counter__result-list">
      ${results
        .map((item) => {
          const resultItem = createResultsItemMarkup(item);

          return `<li class="counter__result-item">${resultItem}</li>`;
        })
        .join('\n')}
    </ul>`
  );
};

const createResultTemplate = (result) => {
  return (
    `<section class="counter__result counter__result--hidden">
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
  show() {
    this.getElement().classList.remove('counter__result--hidden');
  }
  hide() {
    this.getElement().classList.add('counter__result--hidden');
  }
}
