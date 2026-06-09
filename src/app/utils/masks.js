// Máscara de CEP: formata "12345678" como "12345-678"
export const CEP_MASK = [
  /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/,
];

// Máscara de telefone: formata "11912345678" como "(11) 91234-5678"
export const PHONE_MASK = [
  '(', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/,
];

// Remove tudo que não é dígito
export const onlyDigits = (value) => (value || '').replace(/\D/g, '');

// Validação básica de e-mail
export const isValidEmail = (email) => {
  if (!email) return false;            
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email.trim()); 
};

// Validação de CEP
export const isValidCEP = (cep) => onlyDigits(cep).length === 8;

// Validação de Telefone
export const isValidPhone = (phone) => {
  const d = onlyDigits(phone).length;
  return d === 10 || d === 11;
};


// MÁSCARAS E VALIDAÇÕES EXCLUSIVAS DO LOOPI

// Máscara de Horário: formata "0740" como "07:40"
export const maskTime = (text) => {
    let formatted = (text || '').replace(/\D/g, ""); // Só aceita números
    if (formatted.length > 2) {
        formatted = formatted.replace(/^(\d{2})(\d)/, "$1:$2"); // Coloca o : no meio
    }
    return formatted;
};

// Valida se o horário existe (ex: 25:99 é inválido, 14:30 é válido)
export const isValidTime = (time) => {
    if (!time || time.length !== 5) return false;
    
    const [hours, minutes] = time.split(':');
    const h = parseInt(hours, 10);
    const m = parseInt(minutes, 10);

    return h >= 0 && h <= 23 && m >= 0 && m <= 59;
};