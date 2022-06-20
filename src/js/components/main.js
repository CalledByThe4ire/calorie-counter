import Component from '@/js/components/component.js';

const createMainTemplate = () => {
  return (
    `<main class="main"></main>`
  );
};

export default class Main extends Component {
  getTemplate() {
    return createMainTemplate();
  }
}
