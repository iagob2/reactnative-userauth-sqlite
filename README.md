# React Native - Sistema de Autenticação com SQLite

Aplicativo desenvolvido em React Native com Expo e SQLite para gerenciamento de usuários com sistema de autenticação.

## Funcionalidades

- **Sistema de Login**: Autenticação com email e senha
- **Cadastro de Usuários**: Registro de novos usuários
- **Lista de Usuários**: Visualização de todos os usuários cadastrados
- **Edição de Usuários**: Atualização de dados dos usuários
- **Exclusão de Usuários**: Remoção de usuários
- **Interface Moderna**: Design responsivo e intuitivo

## Tecnologias Utilizadas

- React Native (Expo)
- TypeScript
- SQLite (expo-sqlite)
- Expo Router
- AsyncStorage
- React Navigation

## Estrutura do Projeto

```
appSQLite/
├── app/                    # Páginas da aplicação (Expo Router)
│   ├── login.tsx          # Tela de login
│   ├── index.tsx          # Tela inicial -casdrato
│   └── mostrarUsuario.tsx # Tela de listagem de usuários
├── banco/                 # Configuração e operações do SQLite
│   └── crud.tsx          # Operações CRUD
├── style/                 # Estilos e temas
│   └── theme.ts          # Configuração de estilos globais
├── utils/                 # Utilitários
├── package.json          # Dependências do projeto
└── tsconfig.json         # Configuração do TypeScript
```

## Instalação e Execução

### Pré-requisitos

- Node.js (versão 16 ou superior)
- npm ou yarn
- Expo CLI (`npm install -g @expo/cli`)
- Dispositivo móvel com Expo Go instalado

### Passos para Instalação

1. **Clone o projeto:**
   ```bash
   git clone [URL_DO_REPOSITÓRIO]
   cd appSQLite
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Inicie o projeto:**
   ```bash
   npx expo start
   ```

4. **Execute no dispositivo:**
   - Escaneie o QR code com o aplicativo Expo Go (Android)
   - Escaneie o QR code com a câmera (iOS)

## Como Usar

### 1. Tela de Login
- Digite o email e senha
- Clique em "Entrar" para acessar
- Use "Não tem uma conta? Cadastre-se" para criar nova conta

### 2. Tela de Cadastro
- Preencha nome, email e senha
- Clique em "Cadastrar" para criar a conta

### 3. Tela de Lista de Usuários
- Visualize todos os usuários cadastrados
- Opções para editar e excluir usuários

## Banco de Dados

O aplicativo utiliza SQLite local com a seguinte estrutura:

```sql
CREATE TABLE usuario (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nome TEXT NOT NULL,
  email TEXT NOT NULL,
  senha TEXT NOT NULL
);
```

## Desenvolvimento

### Tecnologias Principais
- **Frontend**: React Native com Expo
- **Banco de Dados**: SQLite
- **Navegação**: Expo Router
- **Armazenamento**: AsyncStorage
- **Linguagem**: TypeScript

### Estrutura de Arquivos
- `/app`: Contém as páginas da aplicação usando Expo Router
- `/banco`: Contém as operações de banco de dados
- `/style`: Contém os estilos e temas da aplicação
- `/utils`: Contém utilitários e funções auxiliares

## Troubleshooting

### Problemas Comuns

1. **Erro de dependências**: 
   ```bash
   npm cache clean --force
   rm -rf node_modules
   npm install
   ```

2. **Erro no SQLite**: 
   - Verifique se o expo-sqlite está instalado
   - Limpe o cache do Expo: `npx expo start -c`

3. **Erro de TypeScript**:
   - Verifique se todas as dependências estão instaladas
   - Execute `npx tsc --noEmit` para verificar erros

## Notas Técnicas

- O banco de dados é criado automaticamente na primeira execução
- Os dados são armazenados localmente no dispositivo
- O aplicativo funciona offline após a instalação
- Utiliza TypeScript para maior segurança e manutenibilidade
