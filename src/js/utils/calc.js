import { getPercentage } from '@/js/utils/common';
import {
  WeightMaintenanceParamsCoefficient,
  WeightMaintenanceSexCoefficient,
} from '@/js/const';

export const WeightManipulation = {
  MAINTENANCE: (params) => {
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
  },
  LOSS: (params) => {
    const weightMaintenance = this.MAINTENANCE(params);
    const percentage = getPercentage(15, weightMaintenance);

    return weightMaintenance - percentage;
  },
  GAIN: (params) => {
    const weightMaintenance = this.MAINTENANCE(params);
    const percentage = getPercentage(15, weightMaintenance);

    return weightMaintenance + percentage;
  },
};
