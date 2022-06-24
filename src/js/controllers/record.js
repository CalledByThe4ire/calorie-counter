import ParameterComponent from '@/js/components/parameter.js';
import GenderComponent from '@/js/components/gender.js';
import ActivityComponent from '@/js/components/activity.js';
import { replace, render, RenderPosition } from '@/js/utils/render';
import { isNumber } from '@/js/utils/common';
import { defaultState } from '../models/model';

const getComponentByRecord = (record) => {
  const [key] = Object.keys(record);

  switch (key) {
    case 'gender':
      return new GenderComponent(record);
    case 'age':
    case 'height':
    case 'weight':
      return new ParameterComponent(record);
    case 'activity':
      return new ActivityComponent(record);
    default:
      throw new Error(`Unknown key: ${key}`);
  }
};

export default class Record {
  constructor(container, record, onDataChange) {
    const [key] = Object.keys(record);

    this._record = record;
    this._container = container;
    this._onDataChange = onDataChange;
    this[`_${key}Component`] = null;
  }
  render() {
    const [key] = Object.keys(this._record);
    const oldRecordComponent = this[`_${key}Component`];
    this[`_${key}Component`] = getComponentByRecord(this._record);

    this[`_${key}Component`].setChangeHandler((evt) => {
      if (evt.target.dataset.name === 'parameter') {
        if (isNumber(evt.target.value)) {
          evt.target.value = defaultState[evt.target.name];
        }
      }
      const formElement = this._container.closest('form[name="counter"]');
      const data = this._parseData(formElement);
      this._onDataChange(data);
    });

    if (oldRecordComponent) {
      replace(this[`_${key}Component`], oldRecordComponent);
    } else {
      let container = null;

      switch (key) {
        case 'gender':
          container = this._container;
          render(
            container,
            this[`_${key}Component`],
            RenderPosition.PREPEND
          );
          break;
        case 'activity':
          container = this._container;
          render(container, this[`_${key}Component`]);
          break;
        case 'weight':
        case 'height':
        case 'age':
          container = this._container.querySelector(
            '[data-section="parameters"] .inputs-group'
          );
          render(container, this[`_${key}Component`]);
          break;
        default:
          throw new Error(`Unknown key: ${key}`);
      }
    }
  }
  update(record) {
    this._record = record;
  }
  _parseData(formElement) {
    const data = Object.fromEntries(new FormData(formElement));
    const mappedData = Object.keys(data).reduce((acc, key) => {
      const value = isNumber(acc[key]) ? acc[key] : parseInt(acc[key]);
      return { ...acc, [key]: value };
    }, data);

    return mappedData;
  }
}
