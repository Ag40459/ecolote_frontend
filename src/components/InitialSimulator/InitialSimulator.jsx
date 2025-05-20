import { useState, useEffect, useRef } from 'react';
import styles from './InitialSimulator.module.css';
import { formatCurrency, DROPDOWN_OPTIONS,  } from '../../utils/calc';

const InitialSimulator = ({ onSimulate }) => {
  const [billValue, setBillValue] = useState(200);
  const [showDropdown, setShowDropdown] = useState(false);
  const [sliderValue, setSliderValue] = useState(0); // Valor inicial do slider (0-100)
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState(0);
  const [isUserInteracting, setIsUserInteracting] = useState(false); // Flag para controlar interação do usuário
  const [inputValue, setInputValue] = useState('200,00');
  const [inputSource, setInputSource] = useState('initial'); // 'slider', 'dropdown', 'manual', 'initial'
  const inputRef = useRef(null);
  const dropdownRef = useRef(null);
  const sliderRef = useRef(null);
  const arrowRef = useRef(null);

  // Mapeia o valor do slider para o valor da conta (200-100000)
  useEffect(() => {
    if (isUserInteracting && inputSource === 'slider') {
      const mappedValue = 200 + (sliderValue / 100) * 1800;
      setBillValue(Math.round(mappedValue));
    }
  }, [sliderValue, isUserInteracting, inputSource]);

  // Atualiza o valor formatado quando o billValue muda
  useEffect(() => {
    // Formata o valor para o padrão brasileiro
    const formatted = new Intl.NumberFormat('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(billValue);
    
    setInputValue(formatted);
  }, [billValue]);

  // Mapeia o valor da conta para o valor do slider (0-100)
  useEffect(() => {
    if (!sliderRef.current || isUserInteracting) return;
    
    const mappedSlider = ((billValue - 200) / 1800) * 100;
    const clampedValue = Math.min(Math.max(mappedSlider, 0), 100);
    
    setSliderValue(clampedValue);
  }, [billValue]);

  // Fecha o dropdown ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target) &&
          inputRef.current && !inputRef.current.contains(event.target) &&
          arrowRef.current && !arrowRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSliderChange = (e) => {
    setIsUserInteracting(true);
    setInputSource('slider');
    setSliderValue(Number(e.target.value));
    updateTooltipPosition(e);
    
    // Resetar a flag após um curto período
    setTimeout(() => setIsUserInteracting(false), 100);
  };

  const handleSliderMouseDown = () => {
    setIsUserInteracting(true);
    setInputSource('slider');
    setTooltipVisible(true);
  };

  const handleSliderMouseUp = () => {
    setTooltipVisible(false);
    // Resetar a flag após um curto período
    setTimeout(() => setIsUserInteracting(false), 100);
  };

  const handleSliderMouseMove = (e) => {
    if (tooltipVisible) {
      updateTooltipPosition(e);
    }
  };

  const updateTooltipPosition = (e) => {
    if (!sliderRef.current) return;
    
    const sliderRect = sliderRef.current.getBoundingClientRect();
    const thumbPosition = ((sliderValue / 100) * sliderRect.width);
    setTooltipPosition(thumbPosition);
  };

  const handleInputChange = (e) => {
    setIsUserInteracting(true);
    setInputSource('manual');
    
    // Obtém apenas os dígitos do valor digitado
    const inputText = e.target.value.replace(/\D/g, '');
    
    if (inputText === '') {
      setBillValue(0);
      setInputValue('0,00');
    } else {
      // Converte para número (considerando que os dois últimos dígitos são centavos)
      const numericValue = parseInt(inputText, 10);
      
      // Se o valor for menor que 100, consideramos como centavos
      const valueInReais = inputText.length <= 2 
        ? numericValue / 100 
        : numericValue / Math.pow(10, 2);
      
      // Limita o valor máximo
      const limitedValue = Math.min(valueInReais, 100000);
      
      setBillValue(limitedValue);
    }
    
    // Resetar a flag após um curto período
    setTimeout(() => setIsUserInteracting(false), 100);
  };

  const handleInputFocus = () => {
    setShowDropdown(true);
  };

  const handleDropdownItemClick = (value) => {
    setIsUserInteracting(true);
    setInputSource('dropdown');
    setBillValue(value);
    setShowDropdown(false);
    
    // Resetar a flag após um curto período
    setTimeout(() => setIsUserInteracting(false), 100);
  };

  const handleArrowClick = (e) => {
    e.stopPropagation();
    setShowDropdown(!showDropdown);
  };

  const handleSimulateClick = () => {
    if (onSimulate) {
      onSimulate(billValue);
    }
  };

  // Calcula a porcentagem do slider para colorir a trilha
  const sliderTrackStyle = {
    background: `linear-gradient(to right, #00a651 0%, #00a651 ${sliderValue}%, #e0e0e0 ${sliderValue}%, #e0e0e0 100%)`
  };

  return (
    <section className={styles.simulatorContainer}>
      <div className={styles.simulatorContent}>
        <h2 className={styles.simulatorTitle}>
          Faça Sua Simulação
        </h2>
        
        <p className={styles.simulatorSubtitle}>
          Preencha o formulário abaixo e receba um orçamento da unidade mais próxima:
        </p>
        
        <div className={styles.simulatorCard}>
          <div className={styles.simulatorForm}>
            <label className={styles.formLabel}>Média mensal de gasto com energia:</label>
            
            <div className={styles.sliderContainer}>
              <div className={styles.sliderWrapper}>
                <div className={styles.sliderTrack} style={sliderTrackStyle}></div>
                <input
                  ref={sliderRef}
                  type="range"
                  min="0"
                  max="100"
                  value={sliderValue}
                  onChange={handleSliderChange}
                  onMouseDown={handleSliderMouseDown}
                  onMouseUp={handleSliderMouseUp}
                  onMouseMove={handleSliderMouseMove}
                  onTouchStart={handleSliderMouseDown}
                  onTouchEnd={handleSliderMouseUp}
                  onTouchMove={handleSliderMouseMove}
                  className={styles.slider}
                  aria-label="Selecione o valor da conta de energia"
                  aria-valuemin="200"
                  aria-valuemax="100000"
                  aria-valuenow={billValue}
                />
                {tooltipVisible && (
                  <div 
                    className={styles.sliderTooltip} 
                    style={{ left: `${tooltipPosition}px` }}
                  >
                    {formatCurrency(billValue)}
                  </div>
                )}
              </div>
            </div>
            
            <div className={styles.formRow}>
              <div className={styles.valueContainer}>
                <div className={styles.valueInputWrapper}>
                  <span className={styles.valuePrefix}>R$</span>
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                    className={styles.valueInput}
                    aria-label="Valor da conta de energia"
                  />
                  <span 
                    ref={arrowRef}
                    className={`${styles.dropdownArrow} ${showDropdown ? styles.dropdownArrowOpen : ''}`}
                    onClick={handleArrowClick}
                  >
                    ▼
                  </span>
                </div>
                
                {showDropdown && (
                  <div className={styles.valueDropdown} ref={dropdownRef}>
                    {DROPDOWN_OPTIONS.map((option, index) => (
                      <div
                        key={index}
                        className={styles.dropdownItem}
                        onClick={() => handleDropdownItemClick(option.value)}
                      >
                        {option.text}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              <button 
                className={styles.simulateButton} 
                onClick={handleSimulateClick}
                aria-label="Simular economia de energia"
              >
                Simular Economia
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InitialSimulator;
