import SmartComponent from '@/js/components/smart-component.js';
import { defaultState } from '@/js/models/model.js';

const Label = {
  AGE: ['Возраст', 'лет'],
  HEIGHT: ['Рост', 'см'],
  WEIGHT: ['Вес', 'кг'],
};

const createParameterMarkup = (record) => {
  const [key] = Object.keys(record);
  const [value] = Object.values(record);
  const [caption, detail] = Label[`${key.toUpperCase()}`];

  return (
    `<div class="input">
      <div class="input__heading">
        <label class="heading" for="${key}">
          ${caption}
        </label>
        <span class="input__heading-unit">
          ${detail}
        </span>
      </div>
      <div class="input__wrapper">
        <input
          type="text"
          id="${key}"
          name="${key}"
          data-name="parameter"
          placeholder="${defaultState[key]}"
          value="${value || defaultState[key]}"
          inputmode="decimal"
          maxlength="3"
          required
        >
      </div>
    </div>`
  );
};

export default class Parameter extends SmartComponent {
  constructor(parameter) {
    super();
    this._parameter = parameter;
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
    return createParameterMarkup(this._parameter);
  }
}
