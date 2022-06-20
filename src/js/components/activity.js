import SmartComponent from '@/js/components/smart-component.js';

const activities = [
    {
      type: 'min',
      label: 'Минимальная',
      description: 'Сидячая работа и нет физических нагрузок',
    },
    {
      type: 'low',
      label: 'Низкая',
      description: 'Редкие, нерегулярные тренировки, активность в быту',
    },
    {
      type: 'medium',
      label: 'Средняя',
      description: 'Тренировки 3-5 раз в неделю',
    },
    {
      type: 'high',
      label: 'Высокая',
      description: 'Тренировки 6-7 раз в неделю',
    },
    {
      type: 'max',
      label: 'Очень высокая',
      description: 'Больше 6 тренировок в неделю и физическая работа',
    },
  ];

  const createHeadingMarkup = (heading) => {
  return (
    `<legend class="heading">
      ${heading}
    </legend>`
  );
};

const createActivityMarkup = (activity) => {
  const createActivityItemMarkup = (item, activityType) => {
    const { type, label, description } = item;
    const isChecked = type === activityType;

    return (
      `<div class="radio__wrapper">
      <input
        id="activity-${type}"
        name="activity"
        value="${type}"
        type="radio"
        ${isChecked ? 'checked' : ''}
        required>
      <label for="activity-${type}">
        ${label}
      </label>
      </div>
      <p class="radio__description">
        ${description}
      </p>`
    );
  };

  return (
    `<ul class="radios-group">
      ${activities
        .map((item) => {
          const activityItem = createActivityItemMarkup(
            item,
            activity
          );

          return `<li class="radio">${activityItem}</li>`;
        })
        .join('\n')}
    </ul>`
  );
};

const createActivityTemplate = (activity) => {
  return (
    `<div class="form__item form__activity data-section="activity">
        ${createHeadingMarkup('Физическая активность')}
        ${createActivityMarkup(activity)}
    </div>`
  );
};

export default class Activity extends SmartComponent {
    constructor(record) {
      const [value] = Object.values(record);

      super();
      this.activity = value;
      this._changeHandler = null;
    }
    setChangeHandler(handler) {
      this.getElement().addEventListener('change', handler);
      this._changeHandler = handler;
    }
    recoveryListeners() {
      this.setChangeHandler(this._changeHandler);
    }
    getTemplate() {
      return createActivityTemplate(this.activity);
    }
  }
