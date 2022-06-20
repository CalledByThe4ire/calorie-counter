import upperFirst from 'lodash/upperFirst';
import isEmpty from 'lodash/isEmpty';
import { getDiff } from '@/js/utils/common.js';
import RecordController from '@/js/controllers/record.js';

export default class CalorieCounter {
  constructor(container, model) {
    this._container = container;
    this._model = model;
    this._controllers = null;
    this._onDataChange = this._onDataChange.bind(this);
  }
  render() {
    const counter = this._model.getCounter();

    this._controllers = this._reduce({}, Object.entries(counter));

    Object.values(this._controllers).forEach((controller) => {
      controller.render();
    });
  }
  _update(record) {
    const [key] = Object.keys(record);

    this._controllers[key]._recordKey = key;
    this._controllers[key]._record = record;
    this._controllers[key].render();
  }
  _onDataChange(eventType, newData = {}) {
    const oldData = this._model.getCounter();
    const render = (modelSlice) => {
      Object.keys(modelSlice).forEach((key) => {
        this._model[`set${upperFirst(key)}`](modelSlice[key]);
        this._update(modelSlice);
      });
    };
    const diff = getDiff(oldData, newData);

    if (!isEmpty(diff)) {
      render(diff);
    }
  }
  _rerender() {
    this.render();
  }
  _reduce(acc, items) {
    return items.reduce((acc, item) => {
      const [key, value] = item;

      if (value instanceof Object) {
        return this._reduce(acc, Object.entries(value));
      } else {
        const record = { [key]: value };
        const controller = new RecordController(
          this._container,
          record,
          this._onDataChange
        );

        return {
          ...acc,
          [key]: controller,
        };
      }
    }, acc);
  }
}
