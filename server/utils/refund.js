/**
 * Edmonton / Alberta refund rules (MVP).
 * Structure allows adding more regions later.
 */
const REFUND_PER_BOTTLE_1L_OR_LESS = 0.1;
const REFUND_PER_BOTTLE_OVER_1L = 0.25;
const LB_PER_DOLLAR = 11; // 11 lb = $1.00

function estimateFromVolume(volumeL, quantity = 1) {
  const vol = Number(volumeL);
  const qty = Math.max(1, Math.floor(Number(quantity)) || 1);
  if (!vol || vol <= 0) return 0;
  const perUnit = vol <= 1 ? REFUND_PER_BOTTLE_1L_OR_LESS : REFUND_PER_BOTTLE_OVER_1L;
  return perUnit * qty;
}

function estimateFromWeight(weightLb) {
  const w = Number(weightLb);
  if (!w || w <= 0) return 0;
  return w / LB_PER_DOLLAR;
}

module.exports = {
  estimateFromVolume,
  estimateFromWeight,
  REFUND_PER_BOTTLE_1L_OR_LESS,
  REFUND_PER_BOTTLE_OVER_1L,
  LB_PER_DOLLAR,
};
