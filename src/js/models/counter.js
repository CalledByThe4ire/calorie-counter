export default class Counter {
  constructor() {
    this._counter = {};
  }

  getSex() {
    const { sex } = this._counter;

    return sex;
  }

  setSex(sex) {
    this._counter = { ...this._counter, sex };
  }

  getWeight() {
    const { weight } = this._counter;

    return weight;
  }

  setWeight(weight) {
    this._counter = { ...this._counter, weight };
  }

  getHeight() {
    const { height } = this._counter;

    return height;
  }

  setHeight(height) {
    this._counter = { ...this._counter, height };
  }

  getAge() {
    const { age } = this._counter;

    return age;
  }

  setAge(age) {
    this._counter = { ...this._counter, age };
  }

  getPhysicalActivity(physicalActivity) {
    const { physicalActivity } = this._counter;

    return physicalActivity;
  }

  setPhysicalActivity(physicalActivity) {
    this._counter = { ...this._counter, physicalActivity };
  }
}
