// Formatação de moeda
export const formatCurrency = (value) => {
  if (value === null || value === undefined || isNaN(value)) return 'R$ 0,00';
  
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value);
};

// Formatação de data
export const formatDate = (date) => {
  if (!date) return '';
  
  const d = new Date(date);
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }).format(d);
};

// Formatação de data e hora
export const formatDateTime = (date) => {
  if (!date) return '';
  
  const d = new Date(date);
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(d);
};

// Formatação de telefone
export const formatPhone = (phone) => {
  if (!phone) return '';
  
  const cleaned = phone.replace(/\D/g, '');
  const match = cleaned.match(/^(\d{2})(\d{4,5})(\d{4})$/);
  
  if (match) {
    return `(${match[1]}) ${match[2]}-${match[3]}`;
  }
  
  return phone;
};

// Capitalizar primeira letra
export const capitalize = (str) => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

// Formatação de status de pedido
export const formatOrderStatus = (status) => {
  const statusMap = {
    'pendente': 'Pendente',
    'preparando': 'Preparando',
    'pronto': 'Pronto',
    'entregue': 'Entregue',
    'cancelado': 'Cancelado'
  };
  
  return statusMap[status] || status;
};

// Cores para status
export const getStatusColor = (status) => {
  const colorMap = {
    'pendente': 'bg-yellow-100 text-yellow-800',
    'preparando': 'bg-blue-100 text-blue-800',
    'pronto': 'bg-green-100 text-green-800',
    'entregue': 'bg-gray-100 text-gray-800',
    'cancelado': 'bg-red-100 text-red-800'
  };
  
  return colorMap[status] || 'bg-gray-100 text-gray-800';
};