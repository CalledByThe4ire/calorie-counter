import Component from '@/js/components/component.js';

const createContainerTemplate = () => {
  return (
    `<div class="container"></div>`
  );
};

export default class Container extends Component {
  getTemplate() {
    return createContainerTemplate();
  }
}
