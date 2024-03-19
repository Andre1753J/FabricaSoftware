<img src='/img/logo.png' alt='logo da empresa' width='50px' heidth='50px'/>

# *Sistema de Adoção de animais*

# PROJETO DE SOFTWARE

## *Stakeholders*
|NOME|CARGO|E-MAIL|
|:---|:---|:---|
|André Orocondo Lopes Aguirre|Gerente de Projeto|andreorocondo7801@gmail.com|
|Júlia Eduarda Monteiro de Oliveira|Gerente de design|dudamonteirinho011@gmail.com|
|Julio Otávio da Silva|Gerente de Projeto|otaviojulio131@gmail.com|
|Ikarus Barros Duarte|Gerente de Projeto|cleberraxixe@gmail.com|
|Keila Rodrigues Silva|Gerente de Projeto|rodrigueskeila570@gmail.com|
|Brenda Vitória Gomes de Matos|Gerente de Projeto|wagner.ferreira@ifro.edu.br|
|Erik Gabriel Anicio de Fatima|Gerente de Projeto|gabriel.fatima16@gmail.com|

# Sumário

* [RESUMO DO PROJETO](#resumo-do-projeto)
* [INTRODUÇÃO](#introdução)
  * [PROPÓSITO DESTE DOCUMENTO](#propósito-deste-documento)
* [DESCRIÇÃO GERAL](#descrição-geral)
  * [USUÁRIOS DO SISTEMA](#usuários-do-sistema)
  * [ABRANGÊNCIA E SISTEMAS SIMILARES](#abrangência-e-sistemas-similares)
  * [SUPOSIÇÕES E DEPENDÊNCIAS](#suposições-e-dependências)
* [METODOLOGIA ADOTADA NO DESENVOLVIMENTO](#metodologia-adotada-no-desenvolvimento)
* [REQUISITOS DO SOFTWARE](#requisitos-do-software)
  * [REQUISITOS FUNCIONAIS](#requisitos-funcionais)
  * [REQUISITOS NÃO FUNCIONAIS](#requisitos-não-funcionais)
* [PROTOTIPAGEM](#prototipagem)
* [DIAGRAMA DE CASOS DE USO](#diagrama-de-casos-de-uso)
* [DIAGRAMA DE CLASSES](#diagrama-de-classes)
* [REFERÊNCIAS](#referências)


# RESUMO DO PROJETO
| ITEM | DESCRIÇÃO|
|:---|:---|
| NOME DO PROJETO | Fibonacci Management System |
| GERENTE DO PROJETO | Wagner Ferreira |
| PRINCIPAL OBJETIVO | Auxiliar o sistema de ensino através de ferramentas síncronas e assíncronas que serão usadas por funcionários e alunos da instituição de ensino. |
| BENEFÍCIOS ESPERADOS |* Melhor acompanhamento pedagógico;<br/>* Redução da evasão escolar;<br/>* Aumento do número de matrículas;<br/>* Redução da inadimplência escolar;<br/>* Automatização dos processos financeiross|
| INÍCIO E TÉRMINO PREVISTOS | 14/03/2023 - 07/12/2023 |

[ [INÍCIO](#fibonacci-management-system) ]

# INTRODUÇÃO

## PROPÓSITO DESTE DOCUMENTO

Este documento destina-se aos clientes, engenheiros, gerentes e demais stakeholders deste projeto. O propósito deste documento é apresentar a descrição dos serviços e funções que o sistema **_Fibonacci Management System_** deve prover, bem como as suas restrições de operação e propriedades gerais, a fim de ilustrar uma descrição detalhada do sistema para um auxílio durante as etapas de análise, projeto e testes. O documento especifica todos os requisitos funcionais e não funcionais do sistema e contém a prototipagem, além de diagramas UML que foram construídos levando-se em conta as funcionalidades identificadas durante a fase de concepção do sistema.

[ [INÍCIO](#fibonacci-management-system) ]

# DESCRIÇÃO GERAL

## Usuários do sistema
|USUÁRIO|DESCRIÇÃO|
|:---|:---|
|**Usuário Padrão:**|Realizam as tarefas comuns a todos os usuários, tal como: logar e enviar mensagens. Todos demais usuários estendem as funcionalidades do UsuárioPadrão|
|**Administrador:**|Responsáveis pelo gerenciamento das entidades pertinentes à instituição e pela alocação de outros administradores|
|**Coordenador:**|Responsáveis pela aprovação de disciplinas, turmas e matrículas realizadas pela secretaria do curso, além de ser responsável pela alocação da secretaria|
|**Secretaria:**|Responsáveis pelo cadastramento de disciplinas e turmas, pela alocação de professores e monitores de um curso e matrículas dos alunos|
|**Professor:**|Responsáveis pela criação do programa da disciplina através de ferramentas de planejamento e criação de atividades|
|**Aluno:**|Seguem o programa da disciplina criada pelo professor, tendo como apoio ferramentas de comunicação, tal como: chat e fórum|


[ [INÍCIO](#fibonacci-management-system) ]

# Metodologia Adotada no Desenvolvimento


[ [INÍCIO](#fibonacci-management-system) ]

# Requisitos do Software

A especificação dos requisitos deste documento deve seguir as recomendações da norma IEEE Std-830-1998, levando em conta as recomentações do documento de [características dos requisitos](caracteristicas_requisitos.md).

## Requisitos Funcionais

A tabela a seguir contém a relação dos Requisitos Funcionais elicitados, com as colunas: identificador, nome, descrição e prioridade:

| IDENTIFICADOR | NOME | DESCRIÇÃO |
:---|:---|:---|
<<<<<<< HEAD
|RF-001 | Mostrar lista de animais | local onde as pessoas pode ver a descrição dos animais |
|RF-002 | Registro de usuario | Sistema de registros de usuários |
|RF-003 | Registro de animais | Registra as informações dos animais |
|RF-004 |  |  |
=======
|RF-001 | Exibir lista de animais | Local onde desmonstra os animais |
|RF-002 | Registro de animais | Registro dos animais |
|RF-003 | Registro de cliente | Registro dos clientes |
|RF-004 | Registro de vacinação | Registro das vacinas dos animais |
|RF-005 | Registro de funcionario | Sistema para registrar os funcionarios |
|RF-006 | Registro de raças | Sistema para registro das raças de animais |
|RF-007 | Checar capacitação | Local onde será verificado a capacitação do cliente |
|RF-008 | Armazenar animais | Local onde veremos se há espaço suficiente para os animais |
|RF-009 | Acompanhar adoção | O sistema deve permitir que os usuários acompanhem o status de sua adoção |
|RF-010 | Comentar satisfação | O sistema deve permitir que os usuários façam comentários e avaliações sobre os animais de estimação que adotaram |
|RF-011 | Registro de doadores | Regristo das pessoas que doam animais com maior frequência |
|RF-012 | Interagir com outros donos | O sistema deve permitir que os usuários se comuniquem com outros usuários sobre seus animais de estimação |
|RF-013 | Encontrar abrigo | O sistema deve permitir que os usuários encontrem abrigos para animais de estimação |
|RF-014 | Editar usuário | Permite que o usuário mude informações de seu perfil |
|RF-015 | Excluir registro | Permite que animais ja adotados não apareçam |
|RF-016 | Registro de entrega | Mostra os animais já entregues |
|RF-017 | Registro de medicação | Mostra quais medicamentos o animal precisa, caso necessário |
|RF-018 | Registro de adoção | Registra animais já adotados |
|RF-019 | Confirmar adoção | Confirma com o cliente se realmente irá adotar |
|RF-020 | Cancelar adoção | Cancela com o cliente a adoção |
>>>>>>> cd69a4e60466b1940182c4b0c95fd90416741b2a
    


## Requisitos Não Funcionais
A tabela a seguir contém a relação com os Requisitos Não Funcionais identificados, contendo identificador, nome, descrição e prioridade:

| IDENTIFICADOR | NOME | DESCRIÇÃO |
|:---|:---|:---|
|RNF-001 |Nome do Requisito |Descreva aqui as informações sobre o requisito |
|RNF-002 |Nome do Requisito |Descreva aqui as informações sobre o segundo requisito |


[ [INÍCIO](#fibonacci-management-system) ]


# Prototipagem

[Protótipo criado no FIGMA em 2022 por estudantes](https://www.figma.com/file/iNC7wyX9zP7Kmn3BhiCFGf/Fals6Hood-(Prot%C3%B3tipo-criado-por-estudantes-em-2022)?node-id=0%3A1&t=B16hgeZP3MSURCCa-1)

![Imagem do Protótipo](/img/home.png)

[ [INÍCIO](#fibonacci-management-system) ]


# Diagrama de Casos de Uso


![Diagrama de Casos de Uso](/img/use_case_placas.png)

[ [INÍCIO](#fibonacci-management-system) ]

# Diagrama de Classes

[ [INÍCIO](#fibonacci-management-system) ]


# REFERÊNCIAS

Esta subseção apresenta as referências aos documentos que utilizamos no auxílio à construção deste documento.
* [UML](https://www.omg.org/spec/UML/2.5/About-UML/)
* [Práticas para Especificação de Requisitos IEEE-830](https://ieeexplore.ieee.org/document/720574)
