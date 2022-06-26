import '@/styles/index.scss';
import { render } from '@/js/utils/render';
import Main from '@/js/components/main';
import Container from '@/js/components/container';
import CalorieCounter from '@/js/components/calorie-counter';
import MainHeading from '@/js/components/main-heading';
import CalorieCounterForm from '@/js/components/calorie-counter-form';
import CalorieCounterModel from '@/js/models/model.js';
import CalorieCounterController from '@/js/controllers/calorie-counter';

const rootElement = document.getElementById('root');
const mainComponent = new Main();
const containerComponent = new Container();
const calorieCounterComponent = new CalorieCounter();
const calorieCounterFormComponent = new CalorieCounterForm();
const mainHeadingComponent = new MainHeading();
const calorieCounterModel = new CalorieCounterModel();
const calorieCounterController = new CalorieCounterController(
  calorieCounterFormComponent.getElement(),
  calorieCounterModel
);

render(rootElement, mainComponent);
render(mainComponent.getElement(), containerComponent);
render(containerComponent.getElement(), calorieCounterComponent);
render(calorieCounterComponent.getElement(), mainHeadingComponent);
render(calorieCounterComponent.getElement(), calorieCounterFormComponent);
calorieCounterController.render();
