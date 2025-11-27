// Validação de email
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Validação de campo obrigatório
export const validateRequired = (value) => {
  return value && value.toString().trim().length > 0;
};

// Validação de preço
export const validatePrice = (price) => {
  const numPrice = parseFloat(price);
  return !isNaN(numPrice) && numPrice > 0;
};

// Validação de telefone
export const validatePhone = (phone) => {
  const cleaned = phone.replace(/\D/g, '');
  return cleaned.length >= 10 && cleaned.length <= 11;
};

// Validação de senha
export const validatePassword = (password) => {
  return password && password.length >= 6;
};

// Validação de produto
export const validateProduct = (product) => {
  const errors = {};
  
  if (!validateRequired(product.nome)) {
    errors.nome = 'Nome é obrigatório';
  }
  
  if (!validatePrice(product.preco)) {
    errors.preco = 'Preço deve ser um valor positivo';
  }
  
  if (!validateRequired(product.categoria)) {
    errors.categoria = 'Categoria é obrigatória';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

// Validação de cliente
export const validateClient = (client) => {
  const errors = {};
  
  if (!validateRequired(client.nome)) {
    errors.nome = 'Nome é obrigatório';
  }
  
  if (client.email && !validateEmail(client.email)) {
    errors.email = 'Email inválido';
  }
  
  if (client.telefone && !validatePhone(client.telefone)) {
    errors.telefone = 'Telefone inválido';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};