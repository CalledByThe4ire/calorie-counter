import SmartComponent from '@/js/components/smart-component.js';

const switchers = [
  {
    name: 'gender',
    type: 'male',
    label: 'Мужчина',
  },
  {
    name: 'gender',
    type: 'female',
    label: 'Женщина',
  },
];

const createHeadingMarkup = (heading) => {
  return (
    `<h2 class="heading">
       ${heading}
     </h2>`
  );
};

const createSwitcherMarkup = (gender) => {
  const createSwitcherItemMarkup = (item, gender) => {
    const { name, type, label } = item;
    const isChecked = type === gender;

    return (
      `<input
        id="${name}-${type}"
        name="${name}"
        value="${type}"
        type="radio"
        ${isChecked ? 'checked' : ''}
        required>
          <label for="${name}-${type}">
              ${label}
          </label>
      </input>`
    );
  };

  return (
    `<ul class="switcher">
      ${switchers
        .map((switcher) => {
          const switcherItem = createSwitcherItemMarkup(
            switcher,
            gender
          );

          return `<li class="switcher__item">${switcherItem}</li>`;
        })
        .join('\n')}
    </ul>`
  );
};

const createGenderTemplate = (gender) => {
  return (
    `<div class="form__item form__gender data-section="gender">
        ${createHeadingMarkup('Пол')}
        ${createSwitcherMarkup(gender)}
    </div>`
  );
};

export default class Gender extends SmartComponent {
  constructor(record) {
    const [value] = Object.values(record);

    super();
    this._gender = value;
    this._changeHandler = null;
  }
  setChangeHandler(handler) {
    this.getElement().addEventListener('change', handler);
    this._changeHandler = handler;
  }
  recoveryListeners() {
    this.setChangeHandler(this._changeHandler);
  }
  getTemplate() {
    return createGenderTemplate(this._gender);
  }
}
