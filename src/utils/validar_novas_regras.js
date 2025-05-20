// Script para validar a calculadora atualizada com as novas regras

// Importar a função getSystemSpecifications do calculator.js
const calculator = require('./ecolote_project/src/utils/calculator.js');
const { getSystemSpecifications, formatCurrency } = calculator;

// Função para testar a calculadora com diferentes valores de entrada
function testarCalculadora() {
  console.log("=== VALIDAÇÃO DA CALCULADORA COM NOVAS REGRAS ===\n");
  
  // Array de valores de conta para testar
  const valoresTeste = [200, 300, 500, 800, 1000, 1500, 3000];
  
  valoresTeste.forEach(valor => {
    console.log(`\n=== TESTE PARA CONTA DE R$ ${valor} ===`);
    
    // Obter resultados da calculadora
    const resultado = getSystemSpecifications(valor);
    
    // Exibir resultados
    console.log(`Valor da Conta: R$ ${resultado.billValue}`);
    
    console.log(`\n--- VALORES REAIS (baseados na conta) ---`);
    console.log(`Geração Real: ${resultado.realGeneration} kWh/mês`);
    console.log(`Potência Real: ${resultado.realPowerKWp} kWp`);
    console.log(`Módulos Reais: ${resultado.realModules}`);
    
    console.log(`\n--- VALORES EFETIVOS (baseados no equipamento) ---`);
    console.log(`Geração Efetiva: ${resultado.averageGeneration} kWh/mês`);
    console.log(`Potência Efetiva: ${resultado.powerKWp} kWp`);
    console.log(`Módulos Efetivos: ${resultado.modules}`);
    
    console.log(`\n--- INFORMAÇÕES DO SISTEMA ---`);
    console.log(`Inversor: ${resultado.inverters}`);
    console.log(`Tamanho do Lote: ${resultado.lotSize}`);
    
    console.log(`\n--- VALORES FINANCEIROS ---`);
    console.log(`Valor Total: ${typeof resultado.totalValue === 'number' ? formatCurrency(resultado.totalValue) : resultado.totalValue}`);
    console.log(`Desconto: ${typeof resultado.discount === 'number' ? formatCurrency(resultado.discount) : resultado.discount}`);
    console.log(`Valor da Parcela: ${typeof resultado.installmentValue === 'number' ? formatCurrency(resultado.installmentValue) : resultado.installmentValue}`);
    console.log(`Prazo: ${resultado.term}`);
    
    // Validações específicas
    console.log(`\n--- VALIDAÇÕES ---`);
    
    // Verificar se o valor mínimo do projeto é respeitado
    console.log(`Valor mínimo do projeto (13.990): ${resultado.totalValue >= 13990 ? "✓" : "✗"}`);
    
    // Verificar se a geração mínima é respeitada
    console.log(`Geração mínima (430 kWh): ${resultado.averageGeneration >= 430 ? "✓" : "✗"}`);
    
    // Verificar se a parcela é menor ou igual ao valor da conta
    console.log(`Parcela <= Valor da Conta: ${resultado.installmentValue <= resultado.billValue ? "✓" : "✗"}`);
    
    // Verificar a mensagem de carência correta
    const prazoNumerico = parseInt(resultado.term.split('x')[0]);
    const mensagemEsperada = prazoNumerico <= 60 ? "primeira parcela em até 120 dias" : "primeira parcela em até 90 dias";
    const mensagemCorreta = resultado.term.includes(mensagemEsperada);
    console.log(`Mensagem de carência correta: ${mensagemCorreta ? "✓" : "✗"}`);
    
    console.log("\n" + "=".repeat(50));
  });
}

// Executar os testes
testarCalculadora();
