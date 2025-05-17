import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import styles from './FAQ.module.css';

const faqs = [
  {
    question: 'O que é o Ecolote?',
    answer: `O Ecolote é sua própria mini usina solar remota, com propriedade individual registrada em seu nome.
    Você adquire um lote de 30m² em uma região com alta incidência solar, onde instalamos painéis solares que geram energia para eliminar sua conta de luz, 
    sem precisar instalar nada em sua casa ou apartamento.`
  },
  {
    question: 'Como funciona a associação de proprietários?',
    answer: `Para otimizar custos e eficiência, seu Ecolote faz parte de um grupo gerenciado por uma associação dedicada.
    Esta associação cuida da gestão da conexão do seu grupo à rede elétrica e da administração dos aspectos comuns, 
    enquanto você mantém 100% da propriedade e dos créditos da sua usina, pagando apenas uma taxa de administração proporcional e justa.`
  },
  {
    question: 'Posso ter um Ecolote mesmo morando em apartamento ou imóvel alugado?',
    answer: `Sim! Esta é justamente uma das maiores vantagens do Ecolote. Como sua usina é remota, você não precisa 
    ter espaço físico ou telhado próprio para instalar painéis solares. É ideal para quem mora em apartamentos, 
    imóveis alugados ou tem negócios sem espaço adequado para instalação de painéis.`
  },
  {
    question: 'Quanto tempo dura o investimento no Ecolote?',
    answer: `O Ecolote é seu patrimônio permanente. Os equipamentos têm garantia de 25 anos, e a vida útil estimada 
    é de mais de 30 anos. Você é o proprietário da sua usina e pode usufruir dos benefícios por décadas ou até mesmo revendê-la no futuro.`
  },
  {
    question: 'Como é feita a manutenção da minha usina?',
    answer: `A manutenção individual da sua usina é garantida. Os custos de manutenção da infraestrutura comum do grupo 
    são cobertos pela taxa de administração da associação. Tudo é monitorado remotamente para garantir o máximo 
    desempenho e durabilidade dos equipamentos.`
  },
  {
    question: 'O que acontece com a taxa de administração após o período inicial?',
    answer: `Seu investimento inclui a cobertura da taxa de administração da associação por 6 anos (para pagamentos à vista) 
    ou durante o financiamento, garantindo tranquilidade total no início da sua jornada solar. Após esse período, 
    a taxa de administração é proporcional ao tamanho da sua usina e muito inferior à economia gerada.`
  },
];

const FAQ = () => {
  const [expandedIndexes, setExpandedIndexes] = useState([]);

  const toggleExpand = (index) => {
    if (expandedIndexes.includes(index)) {
      setExpandedIndexes(expandedIndexes.filter((i) => i !== index));
    } else {
      setExpandedIndexes([...expandedIndexes, index]);
    }
  };

  return (
    <section id="faq" className={styles.faqSection}>
      <div className={`${styles.container} container`}>
        <h2 className={styles.sectionTitle}>Perguntas Frequentes</h2>
        <p className={styles.sectionSubtitle}>
          Tire suas dúvidas sobre o Ecolote e descubra como nossa solução pode transformar sua relação com a energia solar.
        </p>
<br></br>
        <div className={styles.faqContainer}>
          {faqs.map((faq, index) => (
            <div key={index} className={`${styles.faqItem} ${expandedIndexes.includes(index) ? styles.active : ''}`}>
              <div className={styles.faqQuestion} onClick={() => toggleExpand(index)}>
                {faq.question}
              </div>
              <div
                className={`${styles.faqAnswer} ${expandedIndexes.includes(index) ? styles.expanded : ''}`}
                style={{ maxHeight: expandedIndexes.includes(index) ? '300px' : '0' }}
              >
                <p>{faq.answer}</p>
              </div>
              <div className={styles.faqToggle} onClick={() => toggleExpand(index)}>
                {expandedIndexes.includes(index) ? <FaChevronUp /> : <FaChevronDown />}
              </div>
            </div>
          ))}
        </div>

        {/* Botão Voltar */}
        <div className={styles.backButtonContainer}>
          <Link to="/" className={styles.backButton}>← Voltar</Link>
        </div>
      </div>
    </section>
  );
};

export default FAQ;