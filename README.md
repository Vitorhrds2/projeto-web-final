# Inteli - Instituto de Tecnologia e Liderança 

<p align="center">
<a href= "https://www.inteli.edu.br/"><img src="https://capitaldigital.com.br/wp-content/uploads/2021/04/logo-inteli-300x134-1.png" alt="Inteli - Instituto de Tecnologia e Liderança" border="0"></a>
</p>

# Conexão MRV

## Growth

## Integrantes: 
- <a href="https://www.linkedin.com/in/arthur-nisa-de-paula-932746252/">Arthur Nisa</a>
- <a href="https://www.linkedin.com/in/enya-oliveira-636566240/">Enya Oliveira</a>
- <a href="https://www.linkedin.com/in/victorbarq/">Marcelo Maia</a> 
- <a href="https://www.linkedin.com/in/rafael-techio/">Rafael Techio</a> 
- <a href="https://www.linkedin.com/in/samuel-lucas-de-almeida-241a77210/">Samuel Lucas</a>
- <a href="https://www.linkedin.com/in/vitor-santos-851408196/">Vitor Rodrigues</a> 

## 📝 Descrição
O projeto tem como objetivo conectar a MRV com empreiteiros a partir de oportunidades em obras locais.

## 📁 Estrutura de pastas
|--> documentos<br>
  &emsp;| --> outros <br>
  &emsp;| T(NUMERO_DA_TURMA)_G(NUMERO_DO_GRUPO)_V(VERSÃO)_Web_application_document.pdf<br>
  &emsp;| T(NUMERO_DA_TURMA)_G(NUMERO_DO_GRUPO)_V(VERSÃO)_Web_application_document.docx<br>
|--> imagens<br>
|--> src<br>
  &emsp;|--> Backend<br>
  &emsp;|--> Frontend<br>
    &emsp;&emsp;|--> DashBoardADM<br>
      &emsp;&emsp;&emsp;|--> Componentes<br>
      &emsp;&emsp;&emsp;|--> Home<br>
      &emsp;&emsp;&emsp;|--> Obra<br>
      &emsp;&emsp;&emsp;|--> Obras<br>
      &emsp;&emsp;&emsp;|--> Usuario<br>
      &emsp;&emsp;&emsp;|--> Usuarios<br>
    &emsp;&emsp;|--> Main<br>
      &emsp;&emsp;&emsp;|--> Busca<br>
      &emsp;&emsp;&emsp;|--> Cadastro<br>
      &emsp;&emsp;&emsp;|--> Componentes<br>
      &emsp;&emsp;&emsp;|--> EdicaoUsuario<br>
      &emsp;&emsp;&emsp;|--> Home<br>
      &emsp;&emsp;&emsp;|--> Institucional<br>
      &emsp;&emsp;&emsp;|--> Login<br>
| readme.md<br>
| license.txt

Dentre os arquivos presentes na raiz do projeto, definem-se:

- <b>readme.md</b>: arquivo que serve como guia e explicação geral sobre o projeto (o mesmo que você está lendo agora).

- <b>documentos</b>: aqui estarão todos os documentos do projeto. Há também uma pasta denominada <b>outros</b> onde estão presentes aqueles documentos complementares ao <b>web application document</b>.

- <b>imagens</b>: imagens relacionadas ao projeto como um todo (por exemplo imagens do sistema, do grupo, logotipos e afins).

- <b>src</b>: nesta pasta encontra-se todo o código fonte do sistema (existem duas subpastas <b>backend</b> e <b>frontend</b> que contêm, respectivamente, o código do servidor e o código da página web).

## 💻 Configuração para desenvolvimento

Aqui encontram-se todas as instruções necessárias para a instalação de todos os programas, bibliotecas e ferramentas imprescindíveis para a configuração do ambiente de desenvolvimento.

1.  Baixar e instalar o node.js:  [https://nodejs.org/pt-br/](https://nodejs.org/pt-br/) (versão 16.15.1 LTS)
2. Clone o repositório em questão.
3.  No modo administrador, abra o "prompt de comando" ou o "terminal" e, após,  abra a pasta "src/backend" no diretório raiz do repositório clonado e digite o segundo comando:

```sh
npm install
```

Isso instalará todas as dependências definidas no arquivo <b>package.json</b> que são necessárias para rodar o projeto. Agora o projeto já está pronto para ser modificado. Caso ainda deseje iniciar a aplicação, digite o comando abaixo no terminal:

```sh
npm start
```
5. Agora você pode acessar a aplicação através do link http://localhost:1234/
6. O servidor está online.


```
Alunos inteli (remover essa observação do readme.md após leitura e execução):

1. Certifique-se que há um arquivo "package.json" na pasta backend do projeto.

2. Dentro deste arquivo, encontre a propriedade "scripts", e adicione um atributo de nome "start"
com o valor "node <CAMINHO_DO_ARQUIVO_DO_SERVIDOR>." Atenção: "<CAMINHO_DO_ARQUIVO_DO_SERVIDOR>" 
deve ser substituído pelo caminho para o arquivo principal da aplicação, utilizado para subir o
servidor. Por exemplo, se o arquivo utilizado para subir o servidor é "app.js", o atributo start
deve possuir o valor "node app.js".

3. No arquivo utilizado para subir a aplicação, defina a porta padrão de execução para "1234".
````

## 🗃 Histórico de lançamentos

* 0.0.1 - 04/11/2022
    * Primeira versão do backend
* 0.0.2 - 18/11/2022
    * Primeira versão do frontend

## 📋 Licença/License

<img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/cc.svg?ref=chooser-v1"><img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/by.svg?ref=chooser-v1"><p xmlns:cc="http://creativecommons.org/ns#" xmlns:dct="http://purl.org/dc/terms/"><a property="dct:title" rel="cc:attributionURL" href="https://github.com/Spidus/Teste_Final_1">MODELO GIT INTELI</a> by <a rel="cc:attributionURL dct:creator" property="cc:attributionName" href="https://www.yggbrasil.com.br/vr">Inteli, <a href="https://www.linkedin.com/in/arthur-nisa-de-paula-932746252/">Arthur Nisa</a>, <a href="https://www.linkedin.com/in/enya-oliveira-636566240/">Enya Oliveira</a>, <a href="https://www.linkedin.com/in/victorbarq/">Marcelo Maia</a>, <a href="https://www.linkedin.com/in/rafael-techio/">Rafael Techio</a>, <a href="https://www.linkedin.com/in/samuel-lucas-de-almeida-241a77210/">Samuel Lucas</a>, <a href="https://www.linkedin.com/in/vitor-santos-851408196/">Vitor Rodrigues</a>, </a> is licensed under <a href="http://creativecommons.org/licenses/by/4.0/?ref=chooser-v1" target="_blank" rel="license noopener noreferrer" style="display:inline-block;">Attribution 4.0 International</a>.</p>

## 🎓 Referências

Aqui estão as referências usadas no projeto:

1. <https://creativecommons.org/share-your-work/>
