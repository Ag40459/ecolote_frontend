import styles from '../SimulationModal/SimulationModal.module.css';
import { formatCurrency } from '../../utils/calc';
import EnergyPulseAnimation from '../UI/EnergyPulseAnimation';

const SimulationResults = ({ results, onPreRegister, onClose }) => {
  return (
    <>
      <div className={styles.modalHeader}>
        <button 
          className={styles.modalCloseButton} 
          onClick={onClose}
          aria-label="Fechar modal"
        >×</button>
        <div className={styles.modalIllustration}>
          <EnergyPulseAnimation />
        </div>
      </div>
      
      <div className={styles.modalContent}>
        <h2 className={`${styles.modalTitle} sectionTitle`}>Sua Economia Personalizada</h2>
        <p className={styles.modalSubtitle}>
          Veja como o Ecolote transforma sua conta de luz em investimento e quanto você pode economizar.
        </p>
        
        <div className={styles.resultsContainer}>
          <div className={styles.comparison}>
            <div className={`${styles.comparisonItem} ${styles.comparisonItemCurrent}`}>
              <div className={styles.comparisonLabel}>Valor Atual da Conta</div>
              <div className={styles.comparisonValue}>{formatCurrency(results.monthlyBill, 'display')}</div>
            </div>
            
            <div className={`${styles.comparisonItem} ${styles.comparisonItemInstallment}`}>
              <div className={styles.comparisonLabel}>Valor da Sua Parcela</div>
              <div className={styles.comparisonValue}>{formatCurrency(results.monthlyInstallment, 'display')}</div>
            </div>
          </div>
          
          <div className={styles.totalValue}>
            <span className={styles.oldValue}>
              Valor do Total do Projeto: {formatCurrency(results.estimatedProjectCost + results.discount, 'display')}
            </span>
            <br />
            <span className={styles.newValue}>
              Ecolote com Desconto: {formatCurrency(results.estimatedProjectCost, 'display')}
            </span>
          </div>
          
          <div className={styles.specificationCard2}>
            <div className={styles.specificationIcon}>💰</div>
            <div className={styles.specificationLabel}>Desconto Pré-Cadastro</div>
            <div className={styles.specificationValue}>{formatCurrency(results.discount, 'display')}</div>
          </div>

          <div className={styles.specificationsGrid}>
            <div className={styles.specificationCard} style={{"--animation-order": 1}}>
              <div className={styles.specificationIcon}>📅</div>
              <div className={styles.specificationLabel}>Necessário Para Conta Informada</div>
              <div className={styles.specificationValue}>{results.consumptionKwh} {'kWh'}</div>
            </div>
            
            <div className={styles.specificationCard} style={{"--animation-order": 2}}>
              <div className={styles.specificationIcon}>⚡</div>
              <div className={styles.specificationLabel}>Geração Média Equipamento</div>
              <div className={styles.specificationValue}>{results.realGenerationKwh} {'kWh'}</div>
            </div>
            
            <div className={styles.specificationCard} style={{"--animation-order": 3}}>
              <div className={styles.specificationIcon}>🔋</div>
              <div className={styles.specificationLabel}>Potência do Sistema</div>
              <div className={styles.specificationValue}>{results.finalPowerKwp} {'kWp'}</div>
            </div>
            
            <div className={styles.specificationCard} style={{"--animation-order": 4}}>
              <div className={styles.specificationIcon}>🌞</div>
              <div className={styles.specificationLabel}>Quantidade de Painéis</div>
              <div className={styles.specificationValue}>{results.modules} {'Unidades'}</div>
            </div>
            
            <div className={styles.specificationCard} style={{"--animation-order": 5}}>
              <div className={styles.specificationIcon}>💹</div>
              <div className={styles.specificationLabel}>Economia em 25 anos</div>
              <div className={styles.specificationValue}>{formatCurrency(results.lifetimeSavings, 'display')}</div>
            </div>
            
            <div className={styles.specificationCard} style={{"--animation-order": 6}}>
              <div className={styles.specificationIcon}>⏱️</div>
              <div className={styles.specificationLabel}>Tempo de Retorno</div>
              <div className={styles.specificationValue}>{results.paybackPeriod} {'anos'}</div>
            </div>
          </div>
          
          <div className={styles.installmentNote}>
            * As parcelas são simuladas com base em financiamento em 60 meses (5 anos). Consulte condições específicas para seu perfil.
          </div>
          
          <button 
            className={styles.preCadastroButton}
            onClick={onPreRegister}
          >
            Quero Garantir Meu Desconto
          </button>
        </div>
      </div>
    </>
  );
};

export default SimulationResults;
