import { useState } from 'react';
import styles from './Comparison.module.css';
import { FaHome, FaUsers, FaDollarSign, FaLeaf, FaShieldAlt, FaCheckCircle } from 'react-icons/fa';

const benefits = [
  { icon: <FaHome />, title: 'Propriedade Real', description: 'Você é o dono de uma usina solar remota com documentação em seu nome, um ativo que valoriza com o tempo e pode ser vendido ou transmitido como herança.' },
  { icon: <FaUsers />, title: 'Gestão Associativa', description: 'Modelo único com propriedade individual e gestão coletiva eficiente, otimizando custos e benefícios.' },
  { icon: <FaDollarSign />, title: 'Economia Comprovada', description: 'Reduza sua conta, acumule créditos e proteja-se contra tarifas.' },
  { icon: <FaLeaf />, title: 'Impacto Ambiental Positivo', description: 'Energia 100% renovável e reserva ambiental preservada.' },
  { icon: <FaShieldAlt />, title: 'Segurança Completa', description: 'Seguro, garantia e monitoramento constante da sua usina.' },
  { icon: <FaCheckCircle />, title: 'Simplicidade e Conveniência', description: 'Sem obras, sem manutenção, adesão rápida e gerenciamento online.' }
];

const comparisonData = [
  { feature: 'Propriedade', ecolote: 'Você é dono de uma usina solar remota em seu nome', tradicional: 'Você aluga uma cota de energia gerada por terceiros', destaqueEcolote: true },
  { feature: 'Custo Inicial', ecolote: 'Acessível e com parcelas que cabem no lugar da conta de luz', tradicional: 'Sem custo inicial pois se trata de desconto na conta de luz', destaqueEcolote: true },
  { feature: 'Manutenção', ecolote: 'Inclusa (gerenciada pela usina do projeto Ecolote)', tradicional: 'Não visível ao cliente, mas embutida no custo mensal', destaqueEcolote: true },
  { feature: 'Burocracia', ecolote: 'Quase nenhuma — já vem homologado e em seu nome', tradicional: 'Pode envolver análise de crédito, fidelidade e contratos complexos', destaqueEcolote: false },
  { feature: 'Flexibilidade', ecolote: 'Alta — créditos acumulam no seu CPF', tradicional: 'Baixa — depende do contrato, região e prestador', destaqueEcolote: true },
  { feature: 'Segurança', ecolote: 'Possui seguro contra furto/roubo e garantia da empresa de seguro', tradicional: 'Equipamento não é seu porém a taxa de seguro já está imbutida no contrato', destaqueEcolote: true },
  { feature: 'Impacto Ambiental', ecolote: 'Altamente positivo, com reserva ambiental no bairro solar rural', tradicional: 'Positivo, mas sem controle sobre o ambiente da usina compartilhada', destaqueEcolote: false },
  { feature: 'Valorização', ecolote: 'É um ativo real que pode ser valorizado e revendido', tradicional: 'Sem valor de revenda — apenas uso temporário', destaqueEcolote: true },
  { feature: 'Liberdade de Uso', ecolote: 'Usina integralmente sua, sem vínculo com terceiros', tradicional: 'Uso limitado e vinculado ao prestador', destaqueEcolote: true },
  { feature: 'Duração dos Benefícios', ecolote: 'Permanente (25+ anos de vida útil dos equipamentos)', tradicional: 'Limitada ao contrato (geralmente 5-10 anos)', destaqueEcolote: true },
];

const Comparison = () => {
  const [activeTab, setActiveTab] = useState('benefits');

  return (
    <section id="comparison" className={styles.Comparison}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>Por Que Escolher o Ecolote?</h2>
        <p className={styles.sectionIntro}>
          Descubra como o Ecolote revoluciona o acesso à energia solar através de um modelo único de propriedade individual com gestão associativa.
        </p>

        <div className={styles.viewTabs}>
          <button className={`${styles.tabBtn} ${activeTab === 'benefits' ? styles.active : ''}`} onClick={() => setActiveTab('benefits')}>Benefícios Exclusivos</button>
          <button className={`${styles.tabBtn} ${activeTab === 'comparison' ? styles.active : ''}`} onClick={() => setActiveTab('comparison')}>Comparativo Detalhado</button>
        </div>

        {activeTab === 'benefits' && (
          <div className={styles.benefitsGrid}>
            {benefits.map((item, i) => (
              <div className={styles.benefitCard} key={i}>
                <div className={styles.icon}>{item.icon}</div>
                <h4>{item.title}</h4>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'comparison' && (
          <div className={styles.comparisonTableWrapper}>
            <table className={styles.comparisonTable}>
              <thead>
                <tr>
                  <th>Característica</th>
                  <th>Ecolote</th>
                  <th>Energia Solar Compartilhada</th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((item, idx) => (
                  <tr key={idx} className={item.destaqueEcolote ? styles.highlightEcolote : ''}>
                    <td>{item.feature}</td>
                    <td>{item.ecolote}</td>
                    <td>{item.tradicional}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className={styles.highlightNote}>
          <strong>Importante:</strong> O Ecolote não é um serviço temporário: é sua própria mini usina solar remota, com segurança jurídica, liberdade total e potencial de valorização.
        </div>

        <div className={styles.ctaContainer}>
          <h3>Pronto para Investir no Seu Futuro Energético?</h3>
          <p>Dê o primeiro passo para a independência energética com propriedade real.</p>
          <a href="#contact" className={styles.ctaButton}>Solicitar Simulação Personalizada</a>
        </div>
      </div>
    </section>
  );
};

export default Comparison;
