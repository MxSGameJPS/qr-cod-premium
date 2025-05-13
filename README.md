# QR Dev Code

Uma aplicação React que permite aos usuários se cadastrarem e gerarem QR Codes personalizados para seus projetos.

## Funcionalidades

- Formulário de cadastro que coleta nome, WhatsApp, e-mail e profissão
- Envio automático das informações de cadastro por e-mail usando EmailJS
- Geração de QR Codes personalizáveis com cores ajustáveis
- Download do QR Code como arquivo PNG

## Configuração do EmailJS

Para que o formulário funcione corretamente, você precisa configurar o EmailJS:

1. Crie uma conta gratuita em [EmailJS](https://www.emailjs.com/)
2. Crie um serviço de e-mail (por exemplo, usando Gmail ou outro provedor)
3. Crie um template de e-mail com os seguintes parâmetros:
   - `from_name`: Nome do usuário
   - `from_email`: E-mail do usuário
   - `whatsapp`: WhatsApp do usuário
   - `profissao`: Profissão do usuário
   - `message`: Mensagem personalizada
4. Obtenha suas credenciais:
   - Service ID
   - Template ID
   - Public Key
5. Substitua estas credenciais no arquivo `src/components/UserForm.jsx`

## Instalação e Execução

```bash
# Instalar dependências
npm install

# Executar em modo de desenvolvimento
npm run dev

# Construir para produção
npm run build
```

## Tecnologias Utilizadas

- React + Vite
- React Router
- Tailwind CSS
- EmailJS
- QRCode.react

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
