# React Native - Gerenciador de Usuários

Aplicativo desenvolvido em React Native com Expo e SQLite para gerenciamento de usuários com sistema de login e cadastro.

## Funcionalidades

- **Sistema de Login**: Autenticação com email e senha
- **Cadastro de Usuários**: Registro de novos usuários com validações
- **Criptografia de Senhas**: Senhas são criptografadas usando SHA-256
- **Lista de Usuários**: Visualização de todos os usuários cadastrados
- **Edição de Usuários**: Atualização de dados dos usuários
- **Exclusão de Usuários**: Remoção de usuários com confirmação
- **Interface Moderna**: Design responsivo e intuitivo

## Tecnologias Utilizadas

- React Native (Expo)
- SQLite (expo-sqlite)
- React Navigation
- Expo Crypto (para criptografia)
- JavaScript ES6+

## Estrutura do Projeto

```
├── App.js                      # Componente principal com navegação
├── src/
│   ├── telas/
│   │   ├── Login.js      # Tela de login
│   │   ├── Cadastro.js   # Tela de cadastro
│   │   └── Index.js      # Tela de lista de usuários
│   ├── database/
│   │   └── Database.js         # Configuração e operações do SQLite
│   └── utils/
│       └── Crypto.js           # Utilitários de criptografia
├── package.json
├── babel.config.js
└── app.json
```

## Instalação e Execução

### Pré-requisitos

- Node.js (versão 16 ou superior)
- npm ou yarn
- Expo CLI (`npm install -g @expo/cli`)
- Emulador Android/iOS ou dispositivo físico com Expo Go

### Passos para Instalação

1. **Clone o projeto ou extraia os arquivos**

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Inicie o projeto:**
   ```bash
   npx expo start
   ```

4. **Execute no dispositivo:**
   - **Android**: Pressione 'a' no terminal ou escaneie o QR code com o Expo Go
   - **iOS**: Pressione 'i' no terminal ou escaneie o QR code com a câmera
   - **Web**: Pressione 'w' no terminal

## Como Usar

### 1. Tela de Login
- Digite o email e senha de um usuário já cadastrado
- Clique em "Entrar" para acessar a lista de usuários
- Use o link "Cadastre-se aqui" para criar uma nova conta

### 2. Tela de Cadastro
- Preencha todos os campos obrigatórios (nome, email, senha)
- A senha deve ter pelo menos 6 caracteres
- Confirme a senha corretamente
- Clique em "Cadastrar" para criar a conta

### 3. Tela de Lista de Usuários
- Visualize todos os usuários cadastrados
- Use "Editar" para modificar os dados de um usuário
- Use "Excluir" para remover um usuário (com confirmação)
- Puxe para baixo para atualizar a lista

## Recursos de Segurança

- **Criptografia SHA-256**: Todas as senhas são criptografadas antes de serem salvas
- **Validação de Email**: Verificação de formato válido de email
- **Validação de Senha**: Senha mínima de 6 caracteres
- **Confirmação de Exclusão**: Popup de confirmação antes de excluir usuários

## Banco de Dados

O aplicativo utiliza SQLite local com a seguinte estrutura de tabela:

```sql
CREATE TABLE usuarios (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nome TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  senha TEXT NOT NULL,
  telefone TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

## Desenvolvido por

**[Nome da Dupla]**
- Desenvolvedor 1: [Nome]
- Desenvolvedor 2: [Nome]

---

## Notas Técnicas

- O banco de dados é criado automaticamente na primeira execução
- Os dados ficam armazenados localmente no dispositivo
- Para resetar os dados, desinstale e reinstale o aplicativo
- O aplicativo funciona offline após a instalação

## Troubleshooting

### Problemas Comuns

1. **Erro de dependências**: Execute `npm install` novamente
2. **Erro no SQLite**: Verifique se o expo-sqlite está instalado corretamente
3. **Erro de navegação**: Certifique-se de que react-navigation está configurado
4. **Problemas de build**: Limpe o cache do Expo com `npx expo start -c`

### Logs Úteis

O aplicativo gera logs no console para depuração:
- Operações de banco de dados
- Erros de login/cadastro
- Navegação entre telas