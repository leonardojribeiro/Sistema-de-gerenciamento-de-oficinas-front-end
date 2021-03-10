# Sistema de Gerenciamento de oficinas - Front-end

Tabela de conteúdos
=================
<!--ts-->
   * [Sobre](#Sobre)
   * [Status](#Status)
   * [Requerimentos](#Requerimentos)
   * [Scripts disponíveis](#Scripts-disponíveis)
      * [Executar em modo de desenvolvimento](#yarn-start)
      * [Compilar para o modo de produção](#yarn-build)
   * [Recursos](#recursos)
<!--te-->

## Status

#### :construction:  Em construção  :construction:

## Sobre

Esse projeto está sendo desenvolvido como requisito parcial de avaliação do trabalho de conclusão de curso de Sistemas de Informação da [Universidade Estadual de Goiás - Unidade de Itaberaí](http://www.itaberai.ueg.br/).<br/>
Tendo como principal objetivo auxiliar no cotidiano das oficinas automobilísticas.

Esse projeto foi criado através do [Create React App](https://github.com/facebook/create-react-app).

## Requerimentos
Para executar esse projeto é necessário que você tenha algumas ferramentas instaladas no seu dispositivo.
### Node.js
O download do Node está disponível [aqui](https://nodejs.org/pt-br/download/).
Após o download e instalação do Node.js, abra console do seu dispositivo e verifique se a instalação foi bem sucedida através do comando:
> node -v 

Deve aparecer a versão do Node.js que foi instalada.
### Yarn
Após instalar o Node.js, é necessário instalar o yarn, que é o gerenciador de pacotes do Facebook. Essa instalação é feita através do NPM, que por padrão é instalado junto com o Node.js.
> npm install -g yarn

### Visual Studio Code
O Visual Studio Code é o editor de código recomendável para esse projeto. Você pode fazer o download do Visual Studio Code [aqui](https://code.visualstudio.com/).

## Execução 
### Fazer o Download desse projeto
Você pode utilizar o git no diretório desejado para clonar o projeto através do comando:
>git clone https://github.com/LeonardoJRibeiro/Sistema-de-gerenciamento-de-oficinas-front-end.git

Ou você pode fazer o download do projeto zipado e descompactar no diretório desejado.

### Abrir o projeto no Visual Studio Code
1. Abra o Visual Studio Code
2. Navegue até o menu "File"
3. Clique na opçao "Open Folder"
4. Selecione a pasta "Sistema-de-gerenciamento-de-oficinas-front-end" no diretório onde você clonou ou descompactou o projeto.
5. Abra o terminal integrado do Visual.
### Instalação das dependências
Instale as dependências através do comando 
> yarn install

no terminal integrado do Visual Studio Code. <br/>
### Definição das variáveis de ambiente
O arquivo .env fornece algumas variáveis que são fundamentais para a comunicação com o back-end.
são elas:
>REACT_APP_API_URL

>REACT_APP_IMAGENS_URL

O arquivo .envExample já possui essas variáveis definidas para a utilização do [back-end](https://github.com/LeonardoJRibeiro/Sistema-de-gerenciamento-de-oficinas-back-end), bastando alterar seu nome para ".env".

## Scripts disponíveis

No diretório do projeto, você pode executar:

### `yarn start`

O app será executado em modo de desenvolvimento.<br />
Acesse [http://localhost:3000](http://localhost:3000) para visualizá-lo.
A página irá recarregar em caso de alterações.<br />
Você também poderá utilizar o console do navegador para verificar erros do eslint.

### `yarn build`

Compila o app para o modo de produção para o diretório `build`.<br />
O app estará pronto para o deploy.
Veja a sessão [deployment](https://facebook.github.io/create-react-app/docs/deployment) para mais informações.

## Tecnologias

  * ReatcJS
  * MaterialUI
  * React-Router-Dom
  * React-Dropzone
  * TypeScript
  * MaterailUI Icons

## Recursos 
  - [X] Marcas
    - [x] Cadastro de Marcas
    - [x] Alteração de Marcas
    - [x] Listagem de Marcas
    - [x] Consulta de Marcas
  - [X] Modelos
    - [x] Cadastro de Modelos
    - [x] Alteração de Modelos
    - [x] Listagem de Modelos
    - [x] Consulta de Modelos
  - [X] Peças
    - [x] Cadastro de Peças
    - [x] Alteração de Peças
    - [x] Listagem de Peças
    - [X] Consulta de Peças
  - [X] Clientes
    - [x] Cadastro de Clientes
    - [x] Alteração de Clientes
    - [x] Listagem de Clientes
    - [X] Consulta de Clientes
    - [X] Consulta de veículos de Clientes
  - [X] Veículos
    - [x] Cadastro de Veículos
    - [x] Alteração de Veículos
    - [x] Listagem de Veículos
    - [X] Consulta de Veículos
  - [X] Fornecedores
    - [x] Cadastro de Fornecedores
    - [x] Alteração de Fornecedores
    - [x] Listagem de Fornecedores
    - [X] Consulta de Fornecedores
  - [X] Especialidades
    - [x] Cadastro de Especialidades
    - [x] Alteração de Especialidades
    - [x] Listagem de Especialidades
    - [X] Consulta de Especialidades
  - [X] Funcionários
    - [X] Cadastro de Funcionários
    - [X] Alteração de Funcionários
    - [X] Listagem de Funcionários
    - [X] Consulta de Funcionários
  - [X] Serviços
    - [X] Cadastro de Serviços
    - [X] Alteração de Serviços
    - [X] Listagem de Serviços
    - [X] Consulta de Serviços
  - [X] Ordens de Serviço
    - [X] Cadastro de Ordens de Serviço
    - [X] Alteração de Ordens de Serviço
    - [X] Listagem de Ordens de Serviço
    - [X] Consulta de Ordens de Serviço
