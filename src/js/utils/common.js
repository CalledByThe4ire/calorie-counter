import transform from 'lodash/transform';
import isEqual from 'lodash/isEqual';
import isArray from 'lodash/isArray';
import isObject from 'lodash/isObject';

export const getDiff = (origObj, newObj) => {
  const changes = (newObj, origObj) => {
    let arrayIndexCounter = 0
    return transform(newObj, (result, value, key) => {
      if (!isEqual(value, origObj[key])) {
        let resultKey = isArray(origObj) ? arrayIndexCounter++ : key
        result[resultKey] = (isObject(value) && isObject(origObj[key])) ? changes(value, origObj[key]) : value
      }
    })
  };
  return changes(newObj, origObj)
};

export const isNumber = (value) => Number.isNaN(value * 1);

export const getPercentage = (percentToGet, number) =>
  (percentToGet / 100) * number;
