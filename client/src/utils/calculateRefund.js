export function calculateVolumeRefund(volumeL) {
  const value = Number(volumeL);

  if (!value || value <= 0) return 0;

  if (value <= 1) {
    return 0.1;
  }

  return 0.25;
}

export function calculateWeightRefund(weightLb) {
  const value = Number(weightLb);

  if (!value || value <= 0) return 0;

  return value / 11;
}