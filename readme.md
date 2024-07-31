Div-Just Backend
Bem-vindo ao repositório backend do projeto Div-Just! Esta aplicação foi desenvolvida usando Node.js, Express e MongoDB com Mongoose para fornecer uma API robusta e escalável para gerenciar empréstimos e microcréditos.

Índice
Sobre o Projeto
Tecnologias Utilizadas
Configuração do Ambiente
Instruções de Uso
Estrutura do Projeto
Conexão com o MongoDB
Testes
Contribuição
Licença
Sobre o Projeto
O Div-Just backend fornece a API necessária para suportar a aplicação de front-end. Ele gerencia dados relacionados a empréstimos, credores, devedores e transações, garantindo uma comunicação eficaz entre o cliente e o banco de dados.

Tecnologias Utilizadas
Node.js: Ambiente de execução JavaScript no servidor.
Express: Framework para construir a API RESTful.
MongoDB: Banco de dados NoSQL para armazenamento de dados.
Mongoose: Biblioteca para modelagem de dados MongoDB.
dotenv: Para gerenciamento de variáveis de ambiente.
Configuração do Ambiente
Para começar a trabalhar com o projeto, você precisará ter o Node.js e o npm instalados em sua máquina.

1. Clone o Repositório
bash
Copiar código
https://github.com/yuran-nhassengo/backend-projecto-final-bytes.git
cd backend
2. Instale as Dependências
Se estiver usando npm:

bash
Copiar código
npm install
Se estiver usando Yarn:

bash
Copiar código
yarn install
3. Configuração do Ambiente
Crie um arquivo .env na raiz do projeto e adicione as variáveis de ambiente necessárias. Exemplo de .env:

env
Copiar código
PORT=3000
MONGO_URI=mongodb://localhost:27017/div-just
