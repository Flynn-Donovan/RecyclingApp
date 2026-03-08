import { volumeRules, weightRules } from "../data/refundRules";

export function calculateVolumeRefund(volumeMl) {
  const match = volumeRules.find((rule) => rule.volumeMl === Number(volumeMl));
  return match ? match.refund : 0;
}

export function calculateWeightRefund(weightG) {
  const match = weightRules.find((rule) => rule.weightG === Number(weightG));
  return match ? match.refund : 0;
}