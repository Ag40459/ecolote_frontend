import React from 'react';
import styles from './Comparison.module.css'; // Assuming CSS module for styling

const ComparisonSection = () => {
  // Dados de exemplo para a tabela de comparação
  // Estes dados devem ser extraídos do e-book ou da estrutura fornecida
  const comparisonData = [
    {
      feature: 'Custo Inicial',
      ecolote: 'Baixo (Aquisição de lotes)',
      tradicional: 'Alto (Instalação de painéis)',
      destaqueEcolote: true,
    },
    {
      feature: 'Manutenção',
      ecolote: 'Nenhuma (Gerenciada pela usina)',
      tradicional: 'Necessária (Limpeza, reparos)',
      destaqueEcolote: true,
    },
    {
      feature: 'Burocracia',
      ecolote: 'Mínima (Plataforma online)',
      tradicional: 'Moderada (Projetos, aprovações)',
      destaqueEcolote: false,
    },
    {
      feature: 'Flexibilidade',
      ecolote: 'Alta (Planos ajustáveis, sem fidelidade longa)',
      tradicional: 'Baixa (Sistema fixo na propriedade)',
      destaqueEcolote: true,
    },
    {
      feature: 'Mobilidade',
      ecolote: 'Total (Créditos te acompanham)',
      tradicional: 'Nenhuma (Fixo à propriedade)',
      destaqueEcolote: true,
    },
    {
      feature: 'Impacto Ambiental',
      ecolote: 'Positivo (Energia 100% limpa)',
      tradicional: 'Positivo (Energia limpa, mas com pegada de fabricação dos painéis)',
      destaqueEcolote: false, // Ambos são positivos, mas Ecolote foca na geração em larga escala
    },
    {
      feature: 'Tempo para Economia',
      ecolote: 'Imediato (Após compensação dos créditos)',
      tradicional: 'Médio Prazo (Payback do investimento inicial)',
      destaqueEcolote: true,
    },
  ];

  return (
    <section id="comparison" className={`${styles.comparisonSection} content-section alt-bg`}>
      <div className={`${styles.container} container`}>
        <h2 className={styles.sectionTitle}>Ecolote vs. Energia Solar Tradicional</h2>
        <p className={styles.sectionSubtitle}>
          Veja como o Ecolote se destaca ao oferecer uma alternativa mais acessível, flexível e prática para você aproveitar os benefícios da energia solar.
        </p>
        <div className={styles.comparisonTableContainer}>
          <table className={styles.comparisonTable}>
            <thead>
              <tr>
                <th>Característica</th>
                <th>Ecolote</th>
                <th>Solar Tradicional (Residencial)</th>
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
          <strong>Nota:</strong> A energia solar tradicional em telhados é uma excelente opção, mas o Ecolote oferece uma alternativa para quem busca mais flexibilidade, menor custo inicial e zero preocupação com manutenção.
        </p>
      </div>
    </section>
  );
};

export default ComparisonSection;

