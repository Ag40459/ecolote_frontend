const fetchCepData = async (cep) => {
  const numericCep = cep.replace(/\D/g, '')
  if (numericCep.length !== 8) {
    throw new Error("Formato de CEP inválido. Utilize 8 números.");
  }

  try {
    const response = await fetch(`https://viacep.com.br/ws/${numericCep}/json/`);
    if (!response.ok) {
      // Converte o erro da API para um formato mais amigável ou loga o status
      const errorBody = await response.text(); // Tenta ler o corpo do erro, pode ser útil
      console.error("ViaCEP API response error:", response.status, errorBody);
      throw new Error(`Falha ao buscar CEP. Status: ${response.status}`);
    }
    const data = await response.json();
    if (data.erro) {
      throw new Error("CEP não encontrado na base de dados.");
    }
    return data; // Retorna { cep, logradouro, complemento, bairro, localidade, uf, ... }
  } catch (error) {
    // Captura erros de rede (fetch falhou) ou erros lançados acima
    console.error("Erro detalhado ao buscar CEP:", error);
    // Re-lança o erro para ser tratado pelo componente, ou lança um erro mais genérico
    // Se o erro já for uma instância de Error com uma mensagem útil, pode apenas re-lançá-lo
    if (error instanceof Error && error.message) {
        throw error; 
    }
    throw new Error("Ocorreu um problema ao tentar consultar o CEP. Verifique sua conexão ou tente mais tarde.");
  }
};

export { fetchCepData };

