import upperFirst from 'lodash/upperFirst';
import isEmpty from 'lodash/isEmpty';
import { getDiff } from '@/js/utils/common';
import RecordController from '@/js/controllers/record';
import SubmitController from '@/js/controllers/submit';

export default class CalorieCounter {
  constructor(container, model) {
    this._container = container;
    this._model = model;
    this._parametricControllers = null;
    this._submitController = null;
    this._onDataChange = this._onDataChange.bind(this);
  }
  render() {
    const counter = this._model.getCounter();

    this._parametricControllers = this._createParametricControllers(
      {},
      Object.entries(counter)
    );
    Object.values(this._parametricControllers).forEach((controller) => {
      controller.render();
    });

    this._submitController = new SubmitController(
      this._container,
      this._model,
      this._onDataChange
    );
    this._submitController.render();
  }
  _update() {
    const data = this._model.getCounter();
    Object.entries(data).forEach((entry) => {
      const [key, value] = entry;
      this._updateParametricController({ [key]: value });
    });
    this._submitController._update(this._model);
  }
  _createParametricControllers(acc, parameters) {
    return parameters.reduce((acc, item) => {
      const [key, value] = item;

      if (value instanceof Object) {
        return this._createParametricControllers(acc, Object.entries(value));
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
  _updateParametricController(record) {
    const [key] = Object.keys(record);

    this._parametricControllers[key]._update(record);
    this._parametricControllers[key].render();
  }
  _onDataChange(newData) {
    if (newData) {
      const oldData = this._model.getCounter();
      const render = (modelSlice) => {
        Object.keys(modelSlice).forEach((key) => {
          this._model[`set${upperFirst(key)}`](modelSlice[key]);
          this._updateParametricController(modelSlice);
        });
      };
      const diff = getDiff(oldData, newData);

      if (!isEmpty(diff)) {
        render(diff);
        this._update();
      }
    } else {
      this._update();
    }
  }
}
