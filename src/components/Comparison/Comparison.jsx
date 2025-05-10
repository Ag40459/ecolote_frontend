import React from 'react';
import styles from './Comparison.module.css'; // Assuming CSS module for styling

const ComparisonSection = () => {
  // Dados de exemplo para a tabela de comparação
  // Estes dados devem ser extraídos do e-book ou da estrutura fornecida
  const comparisonData = [
    {
      feature: 'Propriedade',
      ecolote: 'Você é dono de uma usina solar remota em seu nome',
      tradicional: 'Você aluga uma cota de energia gerada por uma usina de terceiros',
      destaqueEcolote: true,
    },
    {
      feature: 'Custo Inicial',
      ecolote: 'Acessível e com parcelas que cabem no lugar da conta de luz',
      tradicional: 'Sem custo inicial pois se trata de desconto na conta de luz',
      destaqueEcolote: true,
    },
    {
      feature: 'Manutenção',
      ecolote: 'Inclusa (gerenciada pela usina do projeto Ecolote)',
      tradicional: 'Não visível ao cliente, mas embutida no custo mensal',
      destaqueEcolote: true,
    },
    {
      feature: 'Burocracia',
      ecolote: 'Quase nenhuma — já vem homologado e em seu nome',
      tradicional: 'Pode envolver análise de crédito, fidelidade e contratos complexos',
      destaqueEcolote: false,
    },
    {
      feature: 'Flexibilidade',
      ecolote: 'Alta — créditos acumulam no seu CPF ',
      tradicional: 'Baixa — depende do contrato, região e prestador',
      destaqueEcolote: true,
    },
    {
      feature: 'Segurança',
      ecolote: 'Possui seguro contra furto/roubo e garantia da empresa de seguro',
      tradicional: 'Equipamento não é seu porém a taxa de seguro já esta imbutida no contrato',
      destaqueEcolote: true,
    },
    {
      feature: 'Impacto Ambiental',
      ecolote: 'Altamente positivo, com reserva ambiental no bairro solar rural',
      tradicional: 'Positivo, mas sem controle sobre o ambiente da usina compartilhada',
      destaqueEcolote: false,
    },
    {
      feature: 'Valorização',
      ecolote: 'É um ativo real que pode ser valorizado e revendido',
      tradicional: 'Sem valor de revenda — apenas uso temporário',
      destaqueEcolote: true,
    },
     {
      feature: 'Liberdade de Uso',
      ecolote: 'Usina integralmente sua, sem vínculo com terceiros',
      tradicional: 'Uso limitado e vinculado ao prestador',
      destaqueEcolote: true,
    },
  ];

  return (
    <section id="comparison" className={`${styles.comparisonSection} content-section alt-bg`}>
      <div className={`${styles.container} container`}>
        <h2 className={styles.sectionTitle}>Ecolote vs. Energia Solar Compartilhada</h2>
        <p className={styles.sectionSubtitle}>
          Veja como o Ecolote se destaca ao oferecer uma alternativa mais acessível, flexível e prática para você aproveitar os benefícios da energia solar.
        </p>
        <div className={styles.comparisonTableContainer}>
          <table className={styles.comparisonTable}>
            <thead>
              <tr>
                <th>Característica</th>
                <th>Ecolote</th>
                <th>Energia Solar Compartilhada</th>
              </tr>
            </thead>
            <tbody>
              {comparisonData.map((item, index) => (
                <tr key={index} className={item.destaqueEcolote ? styles.highlightEcolote : ''}>
                  <td>{item.feature}</td>
                  <td>{item.ecolote}</td>
                  <td>{item.tradicional}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className={styles.comparisonNote}>
          <strong>Nota:</strong> O Ecolote não é um serviço temporário: é sua própria mini usina solar remota, com segurança jurídica, liberdade total e potencial de valorização.<br></br><br></br>
Já o modelo compartilhado é uma alternativa temporária de uso, sem vínculo real com o bem.
        </p>
      </div>
    </section>
  );
};

export default ComparisonSection;

