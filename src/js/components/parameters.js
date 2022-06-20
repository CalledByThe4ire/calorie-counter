import Component from '@/js/components/component.js';

const createHeadingMarkup = (heading) => {
  return `<legend class="visually-hidden">
          ${heading}
      </legend>`;
};

const createParametersTemplate = () => {
  return (
    `<fieldset
      class="form__item form__parameters"
      data-section="parameters"
      name="parameters">
        ${createHeadingMarkup('Физические параметры')}
        <div class="inputs-group">
        </div>
    </fieldset>`
  );
};

export default class Parameters extends Component {
  getTemplate() {
    return createParametersTemplate();
  }
}
