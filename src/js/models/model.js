import { Gender, PhysicalActivity } from '@/js/const';

export const defaultState = {
    gender: Gender.MALE,
    age: 0,
    height: 0,
    weight: 0,
    activity: PhysicalActivity.MIN,
};

export default class Model {
  constructor() {
    this._counter = {
      ...defaultState,
    };
  }

  getGender() {
    const { gender } = this._counter;

    return gender;
  }

  setGender(gender) {
    this._counter = { ...this._counter, gender };
  }

  getWeight() {
    const { weight } = this._counter;

    return weight;
  }

  setWeight(weight) {
    this._counter = {
      ...this._counter,
      weight,
    };
  }

  getHeight() {
    const { height } = this._counter;

    return height;
  }

  setHeight(height) {
    this._counter = {
      ...this._counter,
      height,
    };
  }

  getAge() {
    const { age } = this._counter;

    return age;
  }

  setAge(age) {
    this._counter = {
      ...this._counter,
      age,
    };
  }

  getActivity() {
    const { activity } = this._counter;

    return activity;
  }

  setActivity(activity) {
    this._counter = { ...this._counter, activity };
  }

  getCounter() {
    return this._counter;
  }

  setCounter(counter) {
    this._counter = {
      ...counter,
    };
  }
}
