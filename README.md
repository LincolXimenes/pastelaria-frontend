# 🧁 Pastelaria PDV - Frontend

Este é o projeto **frontend** da aplicação **Pastelaria PDV**, desenvolvido com **React + Vite + TailwindCSS**. O sistema será integrado à [API pastelaria-pdv](https://github.com/LincolXimenes/pastelaria-pdv) e tem como objetivo gerenciar de forma simples e eficiente o ponto de venda de uma pastelaria — com planos futuros para versão **mobile** e melhorias na experiência do usuário.

---

## 🎯 Objetivos

- ✅ Criar uma interface moderna, responsiva e intuitiva
- ✅ Integrar com a API pastelaria-pdv
- 🔜 Desenvolver uma versão mobile com React Native ou outro framework
- 🔜 Aplicar autenticação e controle de permissões
- 🔜 Evoluir com gerenciamento global de estado e testes

---

## 🚀 Tecnologias utilizadas

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [TailwindCSS](https://tailwindcss.com/)
- [Heroicons](https://heroicons.com/) – Ícones SVG
- [ESLint](https://eslint.org/) – Linting de código
- [React Router DOM](https://reactrouter.com/en/main) – Rotas
- [Axios](https://axios-http.com/) – Requisições HTTP

---

## 📁 Estrutura de pastas

```bash
src/
├── assets/              # Imagens e ícones estáticos
├── components/          # Componentes reutilizáveis (Button, Input, Modal etc.)
├── hooks/               # Custom hooks (em breve)
├── pages/               # Páginas principais (Login, Dashboard, etc.)
├── routes/              # Configuração de rotas da aplicação
│   └── AppRoutes.jsx
├── services/            # Configuração de API (axios)
│   └── api.js
├── store/               # Gerenciamento de estado (planejado)
├── utils/               # Funções auxiliares/utilitárias
├── App.jsx              # Componente principal
├── App.css              # Estilos globais adicionais
├── main.jsx             # Ponto de entrada
└── index.css            # Estilo base + Tailwind
```

## 🧪 Componentes base prontos

- Button – Estilização com Tailwind e suporte a variações

- Input – Campos de formulário reutilizáveis

- Alert – Mensagens de feedback para o usuário

- Modal – Janelas modais genéricas

- CardProduto / Card – Exibição de itens e conteúdo

- Header / Footer / Container – Layout básico

## ⚙️ Como rodar o projeto localmente

## Clone o repositório
```
git clone https://github.com/LincolXimenes/pastelaria-frontend
cd pastelaria-frontend
```
## Instale as dependências
```
npm install
```

## Rode o servidor de desenvolvimento
```
npm run dev
```
## Acesse no navegador
```
http://localhost:5173
```

## 📌 Próximos passos

 - Criar layout base das páginas

- Integrar Login com API pastelaria-pdv

 - Implementar fluxo de autenticação (token JWT)

 - Estrutura de navegação protegida

 - Estilizar com mais componentes visuais

 - Criar responsividade com Tailwind

 - Estrutura para testes (Vitest ou Jest)

## 📱 Futuro: versão mobile

 - Criar app com React Native ou Expo

 - Compartilhar lógica com o backend existente

 - Aproveitar a API pastelaria-pdv



## 👨‍💻 Autor
Desenvolvido por Lincoln de Mello Ximenes e colaboradores.

Repositório da API (backend): https://github.com/LincolXimenes/pastelaria-pdv

