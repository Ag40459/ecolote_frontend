function parseToNumber(value) {
  if (value === undefined || value === null || value === '') return 0;

  if (typeof value === 'number') return value;

  const cleanValue = value
    .toString()
    .replace(/[^0-9,.-]+/g, '')
    .trim();

  if (cleanValue.includes(',')) {
    return parseFloat(cleanValue.replace(/\./g, '').replace(',', '.'));
  }
  return parseFloat(cleanValue) || 0;
}

export function formatCurrency(value, context = 'display') {
  // Se o valor for uma string vazia, retorna uma string vazia para o input
  if (value === '' && context === 'input') return '';
  
  const number = parseToNumber(value);

  if (context === 'input') {
    // Retorna sem símbolo e sem milhar para facilitar edição
    return number.toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  }

  // Formato para exibição com símbolo de moeda
  return number.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
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

  // Ajuste 1: força o mínimo de 260 em vez de 272
  let consumptionKwh = Math.ceil(monthlyBill / energyRate);
  if (consumptionKwh < 260) consumptionKwh = 260;

  // Cálculo base sem adicionais (como foi solicitado)
  const requiredKwp = consumptionKwh / (solarIrradiance * daysPerMonth * performanceRatio);
  const modules = Math.ceil(requiredKwp / modulePowerKw);
  const finalPowerKwp = Math.ceil(modules * modulePowerKw * 10) / 10;
  const realGenerationKwh = Math.ceil(finalPowerKwp * solarIrradiance * daysPerMonth * performanceRatio);
  const energySurplus = realGenerationKwh - consumptionKwh;

  const totalAreaRequired = modules * moduleArea;
  const excessArea = totalAreaRequired > baseAreaLimit ? totalAreaRequired - baseAreaLimit : 0;
  const areaAdditionalCost = Math.ceil(excessArea) * valorMetroQuadrado;
  const areaUsedInLots = Number((totalAreaRequired / baseAreaLimit).toFixed(2));

  // Cálculo base do sistema sem adicionais (usado para entender valor por kWp)
  const estimatedPrice = finalPowerKwp * 2686;

  // Ajuste 2: custo final com adicionais, sem alterar nome da variável final
  const estimatedPriceAdditionalCost = estimatedPrice + 6000 + areaAdditionalCost;

  // Modelo do inversor com base no finalPowerKwp
  let inverterModel = "";
  if (finalPowerKwp <= 5) inverterModel = "WEG SIW300H M030 Híbrido";
  else if (finalPowerKwp <= 6) inverterModel = "WEG SIW200G M050";
  else if (finalPowerKwp <= 8) inverterModel = "WEG SIW200G M060";
  else if (finalPowerKwp <= 10) inverterModel = "WEG SIW200G M090";
  else if (finalPowerKwp <= 50) inverterModel = "WEG SIW400G K030 - 220V";
  else inverterModel = "WEG SIW400G T075";

  const inverterBrand = "GROWATT";
  const inverterQuantity = 1;

  // Cálculo de financiamento
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

  // Retorno com todos os campos preservados
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
