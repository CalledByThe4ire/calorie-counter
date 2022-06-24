import { getPercentage } from '@/js/utils/common';
import {
  WeightMaintenanceParamsCoefficient,
  WeightMaintenanceGenderCoefficient,
} from '@/js/const';

export const WeightManipulation = {
  MAINTENANCE: (params) => {
    const { gender, weight, height, age, coefficient } = params;
    const formula =
      WeightMaintenanceParamsCoefficient.WEIGHT * weight +
      WeightMaintenanceParamsCoefficient.HEIGHT * height -
      WeightMaintenanceParamsCoefficient.AGE * age;

    switch (gender) {
      case 'male':
        return (formula + WeightMaintenanceGenderCoefficient.MAN) * coefficient;
      case 'female':
        return (formula - WeightMaintenanceGenderCoefficient.WOMAN) * coefficient;
      default:
        throw new Error(`Unknown gender: ${gender}`);
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
