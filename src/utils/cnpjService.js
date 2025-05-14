// utils/cnpjService.js
export const fetchCnpjData = async (cnpj) => {
  const cleanCnpj = cnpj.replace(/\D/g, '');
  if (cleanCnpj.length !== 14) return null;

  try {
    const response = await fetch(`https://brasilapi.com.br/api/cnpj/v1/${cleanCnpj}`);
    if (!response.ok) throw new Error('Erro ao buscar CNPJ');
    return await response.json();
  } catch (error) {
    console.error('Erro ao buscar dados do CNPJ:', error);
    return null;
  }
};