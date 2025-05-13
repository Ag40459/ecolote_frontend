import styles from './Innovation.module.css'; 
import bolt from '../../assets/bolt.svg'; 
import brain from '../../assets/brain.svg'; 
import network_wired from '../../assets/network_wired.svg'; 

const InnovationSection = () => {
  const innovations = [
    {
      icon: brain, 
      title: 'Inteligência Artificial na Gestão',
      description: 'Com algoritmos de IA, otimizamos a geração e distribuição de energia, prevemos demandas e garantimos o melhor desempenho dos seus lotes solares com máxima eficiência.'
    },
    {
      icon: bolt, 
      title: 'kWh Gerados e Armazenados com Segurança',
      description: 'Toda energia produzida pelo seu EcoLote (em kWh) é registrada pela concessionária e armazenada em um sistema oficial. Esse saldo de kWh fica disponível por até 5 anos para abater ou reduzir sua conta de luz a uma taxa mínima — com total rastreabilidade e segurança.'
    },
    {
      icon: network_wired, 
      title: 'Smart Grids: Energia com Tecnologia',
      description: 'Estamos na vanguarda da integração de redes elétricas inteligentes, conectando fontes renováveis com tecnologias avançadas para otimizar a distribuição de energia. Essa inovação garante uma gestão mais eficiente, segura e sustentável, proporcionando mais controle e economia para os consumidores.'
    }
  ];

  return (
    <section id="innovation" className={`${styles.innovationSection} content-section alt-bg`}>
      <div className={`${styles.container} container`}>
        <h2 className={styles.sectionTitle}>Inovação no DNA Ecolote</h2>
        <p className={styles.sectionSubtitle}>
          O EcoLote une tecnologia de ponta a um modelo de negócio inovador, tornando o acesso à energia solar mais inteligente, acessível e sustentável.
        </p>
        <div className={styles.innovationsGrid}>
          {innovations.map((innovation, index) => (
            <div key={index} className={styles.innovationCard}>
              <div className={styles.innovationIconContainer}>
                <img src={innovation.icon} alt={innovation.title} className={styles.innovationIcon} />
              </div>
              <h3 className={styles.innovationTitle}>{innovation.title}</h3>
              <p className={styles.innovationDescription}>{innovation.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InnovationSection;
