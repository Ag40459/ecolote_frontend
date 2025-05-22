import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FaChevronDown, FaChevronUp, FaSearch, FaHome, FaMoneyBillWave, FaSolarPanel, FaUsers } from 'react-icons/fa';
import styles from './FAQ.module.css';

const faqData = [
  {
    id: 1,
    category: 'concept',
    question: 'O que é exatamente o Ecolote e como funciona?',
    answer: 'O Ecolote é um lote de 30m² com painéis solares instalados em uma região de alta incidência solar, registrado como sua propriedade individual. Os painéis geram energia que é convertida em créditos na sua conta de luz, eliminando ou reduzindo drasticamente sua fatura mensal, sem necessidade de instalação em sua residência.'
  },
  {
    id: 2,
    category: 'concept',
    question: 'Como funciona a propriedade do Ecolote?',
    answer: 'Você é o proprietário legal do seu Ecolote, com escritura registrada em seu nome. A propriedade é permanente e pode ser vendida, transferida ou herdada como qualquer outro bem imóvel. Você mantém 100% dos créditos de energia gerados pelo seu lote.'
  },
  {
    id: 3,
    category: 'advantages',
    question: 'Quais as vantagens do Ecolote em comparação com painéis solares convencionais?',
    answer: 'O Ecolote elimina a necessidade de espaço físico próprio, obras, manutenção direta e investimento inicial alto. É ideal para quem mora em apartamentos, imóveis alugados ou sem condições estruturais para instalação. Além disso, a localização em região de alta incidência solar garante geração otimizada durante todo o ano.'
  },
  {
    id: 4,
    category: 'advantages',
    question: 'Posso ter um Ecolote mesmo morando em apartamento ou imóvel alugado?',
    answer: 'Sim! Esta é uma das principais vantagens do Ecolote. Como sua usina é remota, você não precisa de telhado próprio ou autorização de proprietários. Os créditos são aplicados diretamente na sua conta de energia, independentemente de onde você more ou se mudar no futuro.'
  },
  {
    id: 5,
    category: 'financial',
    question: 'Qual o retorno financeiro esperado com o Ecolote?',
    answer: 'O investimento no Ecolote geralmente se paga entre 4 e 6 anos, dependendo do seu consumo e da tarifa local de energia. Após esse período, você economiza 100% da sua conta de luz (exceto taxa mínima) por mais de 25 anos. Considerando o aumento constante das tarifas de energia, o retorno tende a ser ainda mais rápido ao longo do tempo.'
  },
  {
    id: 6,
    category: 'financial',
    question: 'O que acontece com a taxa de administração após o período inicial?',
    answer: 'Seu investimento inclui a cobertura da taxa de administração por 6 anos (para pagamentos à vista) ou durante todo o financiamento. Após esse período, a taxa mensal será proporcional ao tamanho da sua usina, representando aproximadamente 15% da economia gerada, garantindo a manutenção e gestão contínua do sistema.'
  },
  {
    id: 7,
    category: 'technical',
    question: 'Como a energia gerada pelo meu Ecolote chega até minha casa?',
    answer: 'A energia gerada é injetada na rede da concessionária e convertida em créditos através do sistema de compensação de energia. Esses créditos são automaticamente descontados da sua fatura mensal. Não há transmissão física direta - o sistema funciona como um banco de energia, onde você deposita a geração e retira quando precisa.'
  },
  {
    id: 8,
    category: 'technical',
    question: 'Como é feita a manutenção e monitoramento do meu Ecolote?',
    answer: 'Toda a manutenção é realizada por nossa equipe técnica especializada, sem custo adicional durante o período de garantia dos equipamentos (25 anos). O monitoramento é feito 24/7 por nosso sistema inteligente que detecta qualquer variação de desempenho. Você acompanha a geração em tempo real através do aplicativo Ecolote.'
  },
  {
    id: 9,
    category: 'advantages',
    question: 'O que acontece se eu me mudar para outro endereço?',
    answer: 'Seus créditos de energia podem ser transferidos para qualquer nova unidade consumidora em seu nome, dentro da mesma área de concessão. Se você se mudar para outra região, pode transferir a propriedade do Ecolote ou mantê-la e destinar os créditos para familiares ou para venda.'
  },
  {
    id: 10,
    category: 'technical',
    question: 'Qual a garantia de que meu Ecolote continuará gerando energia no futuro?',
    answer: 'Os equipamentos têm garantia de fábrica de 25 anos, com vida útil estimada superior a 30 anos. A associação de proprietários garante a manutenção contínua e eventual substituição de componentes. Além disso, o contrato prevê seguro contra eventos climáticos e outros imprevistos.'
  }
];

const categories = [
  { id: 'all', name: 'Todas as Perguntas', icon: <FaSearch className={styles.categoryIcon} /> },
  { id: 'concept', name: 'Conceito e Propriedade', icon: <FaHome className={styles.categoryIcon} /> },
  { id: 'advantages', name: 'Vantagens', icon: <FaSolarPanel className={styles.categoryIcon} /> },
  { id: 'financial', name: 'Aspectos Financeiros', icon: <FaMoneyBillWave className={styles.categoryIcon} /> },
  { id: 'technical', name: 'Aspectos Técnicos', icon: <FaUsers className={styles.categoryIcon} /> },
];

const FAQ = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [expandedItems, setExpandedItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredFaqs, setFilteredFaqs] = useState(faqData);
  const [isVisible, setIsVisible] = useState(false);
  
  const sectionRef = useRef(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  useEffect(() => {
    let filtered = faqData;
    
    if (activeCategory !== 'all') {
      filtered = filtered.filter(faq => faq.category === activeCategory);
    }
    
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        faq => 
          faq.question.toLowerCase().includes(term) || 
          faq.answer.toLowerCase().includes(term)
      );
    }
    
    setFilteredFaqs(filtered);
  }, [activeCategory, searchTerm]);

  const toggleExpand = (id) => {
    if (expandedItems.includes(id)) {
      setExpandedItems(expandedItems.filter(item => item !== id));
    } else {
      setExpandedItems([...expandedItems, id]);
    }
  };

  const handleCategoryChange = (categoryId) => {
    setActiveCategory(categoryId);
    setExpandedItems([]);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <section id="faq" className={styles.faqSection} ref={sectionRef}>
      <div className={`${styles.container} container`}>
        <div className={styles.faqHeader}>
          <h2 className={styles.sectionTitle}>
            Tudo o que Você Precisa Saber Sobre o Ecolote
          </h2>
          <p className={styles.sectionSubtitle}>
            Respostas detalhadas para as dúvidas mais comuns sobre propriedade, funcionamento e benefícios do seu lote solar.
          </p>
        </div>
        
        <div className={styles.faqSearch}>
          <FaSearch className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Buscar perguntas ou palavras-chave..."
            className={styles.searchInput}
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        
        <div className={styles.faqCategories}>
          {categories.map(category => (
            <button
              key={category.id}
              className={`${styles.faqCategory} ${activeCategory === category.id ? styles.active : ''}`}
              onClick={() => handleCategoryChange(category.id)}
            >
              {category.icon}
              <span>{category.name}</span>
            </button>
          ))}
        </div>
        
        <div className={styles.faqList}>
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq, index) => (
              <div 
                key={faq.id} 
                className={`${styles.faqItem} ${expandedItems.includes(faq.id) ? styles.active : ''}`}
                style={{"--animation-order": index + 1}}
              >
                <div 
                  className={styles.faqQuestion} 
                  onClick={() => toggleExpand(faq.id)}
                  data-category={faq.category}
                >
                  <span>{faq.question}</span>
                  <div className={styles.faqToggle}>
                    {expandedItems.includes(faq.id) ? <FaChevronUp /> : <FaChevronDown />}
                  </div>
                </div>
                <div className={styles.faqAnswer}>
                  <div className={styles.answerContent}>
                    {faq.answer}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className={styles.noResults}>
              <p>Nenhuma pergunta encontrada para sua busca. Tente outros termos ou entre em contato conosco.</p>
            </div>
          )}
        </div>
        
        <div className={styles.faqMore}>
          <p className={styles.faqMoreText}>
            Não encontrou o que procurava? Entre em contato com nossa equipe.
          </p>
          <a href="#contact" className={styles.faqContactButton}>
            Falar com um Especialista
          </a>
        </div>
        
        <div className={styles.backButtonContainer}>
          <Link to="/" className={styles.backButton}>← Voltar para a Página Inicial</Link>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
