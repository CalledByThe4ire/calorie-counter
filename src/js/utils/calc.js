import { getPercentage } from '@/js/utils/common';
import {
  WeightMaintenanceParamsCoefficient,
  WeightMaintenanceGenderCoefficient,
  WeightManipulation,
} from '@/js/const';

const WeightManipulationCalculation = {
  [WeightManipulation.MAINTENANCE]: (params) => {
    const { gender, weight, height, age, coefficient } = params;
    const formula =
      WeightMaintenanceParamsCoefficient.WEIGHT * weight +
      WeightMaintenanceParamsCoefficient.HEIGHT * height -
      WeightMaintenanceParamsCoefficient.AGE * age;

    switch (gender) {
      case 'male':
        return (
          (formula + WeightMaintenanceGenderCoefficient.MALE) * coefficient
        );
      case 'female':
        return (
          (formula - WeightMaintenanceGenderCoefficient.FEMALE) * coefficient
        );
      default:
        throw new Error(`Unknown gender: ${gender}`);
    }
  },
  [WeightManipulation.LOSS]: (params) => {
    const weightMaintenance =
      WeightManipulationCalculation[WeightManipulation.MAINTENANCE](params);
    const percentage = getPercentage(15, weightMaintenance);

    return weightMaintenance - percentage;
  },
  [WeightManipulation.GAIN]: (params) => {
    console.log(WeightManipulationCalculation[WeightManipulation.MAINTENANCE]);
    const weightMaintenance =
      WeightManipulationCalculation[WeightManipulation.MAINTENANCE](params);
    const percentage = getPercentage(15, weightMaintenance);

    return weightMaintenance + percentage;
  },
};

export const calcWeightManipulations = (params) => {
  return Object.keys(WeightManipulationCalculation).reduce(
    (acc, weightManipulationName) => {
      return {
        ...acc,
        [weightManipulationName]:
          WeightManipulationCalculation[weightManipulationName](params),
      };
    },
    {}
  );
};
