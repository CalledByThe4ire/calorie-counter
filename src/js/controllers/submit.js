import omit from 'lodash/omit';
import SubmitComponent from '@/js/components/submit.js';
import { render, replace, remove } from '@/js/utils/render';

const predicate = (model, methodName) => {
  const parameters = omit(model, ['gender', 'activity']);
  return !Object.keys(parameters)[methodName](
    (key) => parameters[key] > 0
  );
};

export default class SubmitController {
  constructor(container, model) {
    this._container = container;
    this._model = model;
    this._submitComponent = null;
  }

  render() {
    const oldSubmitComponent = this._submitComponent;
    this._submitComponent = new SubmitComponent(
      predicate(this._model.getCounter(), 'every'),
      predicate(this._model.getCounter(), 'some')
    );

    this._submitComponent.setSubmitHandler((evt) => {
      evt.preventDefault();
      // do smth
    });
    this._submitComponent.setResetHandler((evt) => {
      evt.preventDefault();
      // do smth
    });

    if (oldSubmitComponent) {
      replace(this._submitComponent, oldSubmitComponent);
    } else {
      render(this._container, this._submitComponent);
    }
  }

  update(model) {
    this._model = model;
    this.render();
  }

  destroy() {
    remove(this._submitComponent);
  }
}
