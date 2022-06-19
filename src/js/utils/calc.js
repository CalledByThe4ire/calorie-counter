import { getPercentage } from '@/js/utils/common';
import {
  WeightMaintenanceParamsCoefficient,
  WeightMaintenanceSexCoefficient,
} from '@/js/const';

export const calcWeightMaintenance = (params) => {
  const { sex, weight, height, age, coefficient } = params;
  const formula =
    WeightMaintenanceParamsCoefficient.WEIGHT * weight +
    WeightMaintenanceParamsCoefficient.HEIGHT * height -
    WeightMaintenanceParamsCoefficient.AGE * age;

  switch (sex) {
    case 'man':
      return (formula + WeightMaintenanceSexCoefficient.MAN) * coefficient;
    case 'woman':
      return (formula - WeightMaintenanceSexCoefficient.WOMAN) * coefficient;
    default:
      throw new Error(`Unknown sex: ${sex}`);
  }
};

export const calcWeightChange = (type, weightMaintenance) => {
  const percentage = getPercentage(15, weightMaintenance);

  switch (type) {
    case 'loss':
      return weightMaintenance - percentage;
    case 'gain':
      return weightMaintenance + percentage;
    default:
      throw new Error(`Unknown type: ${type}`);
  }
};
