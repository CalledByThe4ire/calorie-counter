import Component from '@/js/components/component.js';

const createCalorieCounterFormTemplate = () => {
  return (
    `<form class="counter__form form" name="counter" action="#" method="post"></form>`
  );
};

export default class CalorieCounterForm extends Component {
  getTemplate() {
    return createCalorieCounterFormTemplate();
  }
}
