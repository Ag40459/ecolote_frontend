export function formatCurrency(value) {
  if (!value) return "R$ 0,00";
  const num = typeof value === 'string' ? parseFloat(value.replace(/[^\d,.-]/g, '').replace(',', '.')) : value;
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(num);
}

export const DROPDOWN_OPTIONS = [
  { value: 200, text: 'Até R$200' },
  { value: 400, text: 'De R$200 até R$400' },
  { value: 600, text: 'De R$400 até R$600' },
  { value: 800, text: 'De R$600 até R$800' },
  { value: 1000, text: 'De R$800 até R$1000' },
  { value: 1500, text: 'De R$1000 até R$1500' },
  { value: 2000, text: 'De R$1500 até R$2000' },
  { value: 3000, text: 'Acima de R$2000' }
];

export function solarCalculator({
  monthlyBill,
  location = "Iguaracy - PE",
  energyRate = 1.03,
  solarIrradiance = 5.3
}) {
  const daysPerMonth = 30;
  const performanceRatio = 0.75;
  const modulePower = 550;
  const modulePowerKw = modulePower / 1000;
  const moduleArea = 2;
  const baseAreaLimit = 35;
  const valorMetroQuadrado = 174;

  let consumptionKwh = Math.ceil(monthlyBill / energyRate);
  if (consumptionKwh < 272) consumptionKwh = 272;

  const requiredKwp = consumptionKwh / (solarIrradiance * daysPerMonth * performanceRatio);
  const modules = Math.ceil(requiredKwp / modulePowerKw);
  const finalPowerKwp = Math.ceil(modules * modulePowerKw * 10) / 10;
  const realGenerationKwh = Math.ceil(finalPowerKwp * solarIrradiance * daysPerMonth * performanceRatio);
  const energySurplus = realGenerationKwh - consumptionKwh;

  const totalAreaRequired = modules * moduleArea;
  const excessArea = totalAreaRequired > baseAreaLimit ? totalAreaRequired - baseAreaLimit : 0;
  const areaAdditionalCost = Math.ceil(excessArea) * valorMetroQuadrado;
  const areaUsedInLots = Number((totalAreaRequired / baseAreaLimit).toFixed(2));

  const estimatedPrice = finalPowerKwp * 2686;
  const estimatedPriceAdditionalCost = (estimatedPrice + 6000) + areaAdditionalCost;

  let inverterModel = "";
  if (finalPowerKwp <= 5) inverterModel = "WEG SIW300H M030 Híbrido";
  else if (finalPowerKwp <= 6) inverterModel = "WEG SIW200G M050";
  else if (finalPowerKwp <= 8) inverterModel = "WEG SIW200G M060";
  else if (finalPowerKwp <= 10) inverterModel = "WEG SIW200G M090";
  else if (finalPowerKwp <= 50) inverterModel = "WEG SIW400G K030 - 220V";
  else inverterModel = "WEG SIW400G T075";

  const inverterBrand = "GROWATT";
  const inverterQuantity = 1;

  const interestRate = 0.0156;
  let totalInstallments = 60;

  function calculateInstallment(value, months) {
    return (value * interestRate * Math.pow(1 + interestRate, months)) /
           (Math.pow(1 + interestRate, months) - 1);
  }

  let monthlyInstallment = calculateInstallment(estimatedPriceAdditionalCost, totalInstallments);

  if (monthlyInstallment > monthlyBill) {
    totalInstallments = 72;
    monthlyInstallment = calculateInstallment(estimatedPriceAdditionalCost, totalInstallments);

    if (monthlyInstallment > monthlyBill) {
      totalInstallments = 84;
      monthlyInstallment = calculateInstallment(estimatedPriceAdditionalCost, totalInstallments);
    }
  }

  return {
    monthlyBill: Number(monthlyBill),
    energyRate: Number(energyRate),
    solarIrradiance,
    consumptionKwh,
    requiredKwp: Number(requiredKwp.toFixed(2)),
    modules,
    moduleName: "WEG 550W",
    modulePower: "WEG 550W",
    finalPowerKwp: Number(finalPowerKwp.toFixed(1)),
    realGenerationKwh,
    energySurplus,
    inverterModel,
    inverterQuantity,
    inverterBrand,
    estimatedProjectCost: Number(estimatedPriceAdditionalCost.toFixed(2)),
    monthlyInstallment: Number(monthlyInstallment.toFixed(2)),
    installmentCount: totalInstallments,
    discount: 2000,
    totalAreaRequired: Number(totalAreaRequired.toFixed(2)),
    excessArea: Number(excessArea.toFixed(2)),
    valorMetroQuadrado,
    areaUsedInLots
  };
}

