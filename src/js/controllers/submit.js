import omit from 'lodash/omit';
import SubmitComponent from '@/js/components/submit.js';
import Result from '@/js/components/result';
import { calcWeightManipulations } from '@/js/utils/calc';
import { PhysicalActivityCoefficient } from '@/js/const';
import { render, RenderPosition, replace, remove } from '@/js/utils/render';

const predicate = (model, methodName) => {
  const parameters = omit(model, ['gender', 'activity']);
  return !Object.keys(parameters)[methodName]((key) => parameters[key] > 0);
};

export default class SubmitController {
  constructor(container, model, onDataChange) {
    this._container = container;
    this._model = model;
    this._onDataChange = onDataChange;
    this._submitComponent = null;
    this._resultComponent = null;
  }

  render() {
    const oldSubmitComponent = this._submitComponent;
    this._submitComponent = new SubmitComponent(this._container, {
      isSubmitDisabled: predicate(this._model.getCounter(), 'every'),
      isResetDisabled: predicate(this._model.getCounter(), 'some'),
    });

    this._submitComponent.setSubmitHandler((evt) => {
      evt.preventDefault();

      if (this._resultComponent) {
        this._destroy();
      }

      const { gender, weight, height, age, activity } =
        this._model.getCounter();
      const coefficient = PhysicalActivityCoefficient[activity.toUpperCase()];
      this._resultComponent = new Result(
        calcWeightManipulations({ gender, weight, height, age, coefficient })
      );
      render(this._container, this._resultComponent, RenderPosition.AFTER);
    });
    this._submitComponent.setResetHandler((evt) => {
      evt.preventDefault();
      if (this._resultComponent) {
        this._destroy();
      }
      this._model.resetCounter();
      this._onDataChange();
    });

    if (oldSubmitComponent) {
      replace(this._submitComponent, oldSubmitComponent);
    } else {
      render(this._container, this._submitComponent);
    }
  }

  _update(model) {
    this._model = model;
    this.render();
  }

  _destroy() {
    remove(this._resultComponent);
  }
}
