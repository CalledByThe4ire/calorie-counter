import Component from '@/js/components/component.js';

const createMainHeadingTemplate = (heading) => {
  return (
	`<h1 class="counter__heading heading-main">
		${heading}
	 </h1>`
	);
};

export default class MainHeading extends Component {
  getTemplate() {
    return createMainHeadingTemplate('Счётчик калорий');
  }
}
