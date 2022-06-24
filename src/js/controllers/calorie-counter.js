import upperFirst from 'lodash/upperFirst';
import isEmpty from 'lodash/isEmpty';
import { getDiff } from '@/js/utils/common';
import { WeightManipulation } from '@/js/utils/calc';
import { PhysicalActivityCoefficient } from '@/js/const';
import { replace, render, RenderPosition } from '@/js/utils/render';
import RecordController from '@/js/controllers/record';
import SubmitController from '@/js/controllers/submit';
import Result from '@/js/components/result';

export default class CalorieCounter {
  constructor(container, model) {
    this._container = container;
    this._model = model;
    this._parametricControllers = null;
    this._submitController = null;
    this._resultComponent = null;
    this._onDataChange = this._onDataChange.bind(this);
  }
  render() {
    const counter = this._model.getCounter();

    this._parametricControllers = this._reduce({}, Object.entries(counter));
    Object.values(this._parametricControllers).forEach((controller) => {
      controller.render();
    });

    this._submitController = new SubmitController(this._container, this._model);
    this._submitController.render();

    this._resultComponent = new Result(this._model.getCounter());
    render(this._container, this._resultComponent, RenderPosition.AFTER);
  }
  update(record) {
    const [key] = Object.keys(record);

    this._parametricControllers[key].update(record);
    this._parametricControllers[key].render();
  }
  _onDataChange(newData = {}) {
    const oldData = this._model.getCounter();
    const render = (modelSlice) => {
      Object.keys(modelSlice).forEach((key) => {
        this._model[`set${upperFirst(key)}`](modelSlice[key]);
        this.update(modelSlice);
      });
    };
    const diff = getDiff(oldData, newData);

    if (!isEmpty(diff)) {
      render(diff);
      this._submitController.update(this._model);
    }
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
