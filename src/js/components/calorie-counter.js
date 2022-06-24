import Component from '@/js/components/component.js';

const createCalorieCounterTemplate = () => {
  return (
    `<article class="counter"></article>`
  );
};

export default class CalorieCounter extends Component {
  getTemplate() {
    return createCalorieCounterTemplate();
  }
}
