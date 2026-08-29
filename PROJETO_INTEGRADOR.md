# Projeto Integrador – App Vendi

**Instituição:** Gran Faculdade
**Curso:** Bacharelado em Ciência da Computação
**Semestre:** 3º semestre (em transição para o 4º semestre de 8)
**Etapa:** Projeto Integrador – Fase 3
**Documento:** Relatório Final de Projeto Integrador
**Data:** Junho de 2026
**Autor:** Wesley Santos

---

## Sumário

1. [Introdução](#1-introdução)
2. [Problema Social Identificado](#2-problema-social-identificado)
3. [Objetivos do Projeto](#3-objetivos-do-projeto)
4. [Público-Alvo](#4-público-alvo)
5. [Descrição da Solução](#5-descrição-da-solução)
6. [Tecnologias Utilizadas](#6-tecnologias-utilizadas)
7. [Desenvolvimento Técnico](#7-desenvolvimento-técnico)
8. [Competências Técnicas e Comportamentais Aplicadas](#8-competências-técnicas-e-comportamentais-aplicadas)
9. [Impacto Social Esperado](#9-impacto-social-esperado)
10. [Processo de Desenvolvimento](#10-processo-de-desenvolvimento)
11. [Repositório GitHub](#11-repositório-github)
12. [Divulgação no LinkedIn](#12-divulgação-no-linkedin)
13. [Conclusão](#13-conclusão)
14. [Referências](#14-referências)

---

## 1. Introdução

O **App Vendi** é uma aplicação móvel desenvolvida para auxiliar pessoas que estão iniciando sua trajetória no mercado de vendas, especialmente microempreendedores, autônomos e vendedores informais que ainda não dispõem de ferramentas adequadas para organizar sua atividade comercial. O aplicativo oferece funcionalidades que vão desde o cadastro de produtos e registro de vendas até o controle de gastos e a visualização de relatórios financeiros, consolidando em uma única plataforma os recursos essenciais para a gestão básica de um negócio de vendas.

O projeto nasceu da percepção de que grande parte dos novos empreendedores utiliza métodos manuais e informais para controlar suas operações, como cadernos, planilhas improvisadas ou até mesmo a memória. Essa realidade gera erros, perdas financeiras e dificulta a tomada de decisão, comprometendo as chances de sucesso do negócio.

Desenvolvido com tecnologias modernas de desenvolvimento mobile — React Native com TypeScript —, o Vendi se propõe a ser uma solução acessível, simples e eficaz, capaz de ser utilizada por qualquer pessoa com um smartphone, independentemente de seu grau de escolaridade ou experiência com tecnologia.

---

## 2. Problema Social Identificado

### 2.1 Contexto

O empreendedorismo informal e de pequeno porte representa uma fatia expressiva da economia brasileira. Segundo dados do IBGE e do Sebrae, o Brasil conta com mais de 15 milhões de microempreendedores individuais (MEIs) e um número ainda maior de trabalhadores autônomos que vivem da venda de produtos ou serviços. Muitos desses profissionais iniciam suas atividades sem qualquer formação em gestão, administração ou finanças, o que os torna vulneráveis a erros de precificação, descontrole de estoque, ausência de registro de clientes e falta de visão clara sobre a lucratividade do negócio.

### 2.2 O Problema

A ausência de ferramentas de gestão acessíveis e adaptadas à realidade do pequeno vendedor gera um ciclo de dificuldades que pode ser descrito em quatro dimensões principais:

**1. Descontrole financeiro:** Sem registro adequado de vendas e gastos, o empreendedor não sabe ao certo se está tendo lucro ou prejuízo. Misturar dinheiro pessoal com o do negócio é uma prática comum que leva muitos a abandono precoce da atividade.

**2. Falta de organização do estoque:** O controle manual de produtos leva a situações como: vender itens que não estão disponíveis, perder oportunidades por falta de produtos ou manter estoque excessivo que compromete o capital de giro.

**3. Ausência de dados para decisão:** Sem relatórios e históricos de vendas, o empreendedor toma decisões no "achismo", sem embasamento em dados reais sobre quais produtos vendem mais, em quais períodos do mês o faturamento é maior, e quais gastos comprometem mais a margem de lucro.

**4. Dificuldade de fidelização de clientes:** Não registrar informações sobre os clientes — como nome, contato e histórico de compras — impede a criação de relacionamentos duradouros que são fundamentais para a sustentabilidade de qualquer negócio de vendas.

### 2.3 Dimensão Social do Problema

O problema vai além da dimensão econômica individual. O encerramento prematuro de pequenos negócios por falta de gestão impacta diretamente a geração de renda, o emprego informal e a autonomia financeira de famílias inteiras. Quando um vendedor fracassa não por falta de talento ou produto, mas por falta de organização e ferramentas adequadas, há uma perda social relevante que poderia ser evitada com acesso a soluções simples e acessíveis de gestão.

---

## 3. Objetivos do Projeto

### Objetivo Geral

Desenvolver uma aplicação móvel multiplataforma que forneça ao iniciante no mercado de vendas as ferramentas básicas de gestão comercial necessárias para organizar suas operações, controlar suas finanças e tomar decisões mais informadas, aumentando suas chances de sustentabilidade e crescimento no negócio.

### Objetivos Específicos

- **Digitalizar o registro de vendas:** Substituir cadernos e planilhas por um sistema digital ágil e confiável para registrar cada venda realizada, com detalhamento de cliente, produtos e valores.

- **Centralizar o controle de produtos:** Permitir o cadastro, edição, consulta e exclusão de produtos com controle de preço e estoque em um único lugar de fácil acesso.

- **Rastrear os gastos do negócio:** Oferecer uma funcionalidade dedicada ao registro de despesas operacionais e de mercadoria, permitindo categorização e vinculação de gastos a produtos específicos.

- **Visualizar resultados financeiros:** Prover um painel de resumo (dashboard) que apresente os totais de vendas do dia, da semana e do mês, e relatórios com gráficos comparando vendas e gastos para cálculo do lucro.

- **Facilitar a gestão do perfil do empreendedor:** Permitir que o usuário gerencie suas informações pessoais e tenha uma visão consolidada das estatísticas do seu negócio.

- **Garantir segurança e privacidade:** Implementar autenticação com credenciais pessoais para que cada usuário acesse apenas seus próprios dados.

---

## 4. Público-Alvo

O App Vendi é direcionado a um público amplo e socialmente relevante, que pode ser descrito nos seguintes perfis:

### 4.1 Perfis Primários

**Vendedores iniciantes:** Pessoas que estão começando a vender produtos — seja online, em feiras, porta a porta ou em pontos físicos simples — e que ainda não possuem sistemas de gestão. Para esse perfil, o Vendi representa a primeira experiência com uma ferramenta organizada de controle comercial.

**Microempreendedores individuais (MEIs):** Empreendedores que formalizaram seu negócio mas não têm acesso ou recursos para sistemas de gestão pagos (ERPs, CRMs). O Vendi oferece funcionalidades essenciais de forma gratuita e acessível.

**Revendedores de catálogo:** Pessoas que revendem produtos de marcas como cosméticos, suplementos alimentares ou artigos de decoração e precisam controlar seus pedidos, estoque e comissões de forma simples.

### 4.2 Perfis Secundários

**Jovens empreendedores:** Estudantes e jovens adultos que estão testando seus primeiros negócios e precisam de uma ferramenta simples que caiba na rotina, sem complexidade desnecessária.

**Trabalhadores autônomos de baixa renda:** Profissionais que vendem produtos como artesanato, alimentos ou serviços e precisam de controle financeiro básico para garantir a viabilidade de sua renda.

### 4.3 Como o Projeto os Ajuda

O Vendi reduz a barreira de entrada para a gestão profissional ao oferecer uma interface intuitiva e funcionalidades adaptadas à realidade do pequeno vendedor. O usuário não precisa de conhecimento técnico em administração para usar o aplicativo — ele simplesmente registra o que vende, o que gasta e consulta os resultados em tempo real.

---

## 5. Descrição da Solução

O App Vendi é um aplicativo móvel completo que cobre o ciclo básico de gestão de um negócio de vendas em seis módulos integrados:

### 5.1 Autenticação e Segurança

O usuário inicia criando uma conta com nome, e-mail e senha. O sistema valida os dados e, após autenticação bem-sucedida, armazena um token de acesso que é utilizado em todas as requisições subsequentes à API. Cada usuário acessa exclusivamente seus próprios dados, garantindo privacidade e segurança das informações.

### 5.2 Dashboard (Tela Home)

A tela principal apresenta um painel de controle com informações em tempo real:

- **Saudação personalizada** com o nome do usuário e a data atual.
- **Três cartões de resumo financeiro:** totais de vendas do dia, da semana e do mês corrente.
- **Banner de total geral** de vendas realizadas.
- **Ações rápidas** de navegação para as principais funcionalidades: Nova Venda, Gastos, Relatórios e Vendas.
- **Lista das quatro vendas mais recentes** com nome do cliente, horário e valor.
- Funcionalidade de **pull-to-refresh** para atualizar os dados em tempo real.

### 5.3 Gestão de Produtos

O módulo de produtos permite ao vendedor manter um catálogo digital com:

- **Cadastro de produtos** com nome, preço de venda e quantidade em estoque.
- **Edição** de qualquer informação do produto a qualquer momento.
- **Desativação de produto** (remoção lógica) com confirmação por modal de segurança.
- **Listagem completa** com contador de produtos cadastrados.
- **Estado vazio** orientativo para novos usuários que ainda não têm produtos cadastrados.

Os produtos cadastrados são automaticamente exibidos na tela de nova venda, facilitando a seleção durante o atendimento ao cliente.

### 5.4 Registro e Histórico de Vendas

O módulo de vendas é o coração do aplicativo:

**Adicionar Nova Venda:**
- Registro do nome do cliente.
- Registro do telefone do cliente com formatação automática.
- Seleção de produtos por chips interativos, mostrando nome e estoque disponível.
- Visualização do resumo do pedido com produtos selecionados, quantidades e valor total.
- Salvamento da venda com todos os dados enviados ao servidor.

**Histórico de Vendas:**
- Listagem completa de todas as vendas realizadas.
- Busca por nome de cliente.
- Cada item exibe: nome do cliente, data, quantidade de itens e valor total.
- Pull-to-refresh para atualização.

**Detalhes da Venda:**
- Visualização completa de uma venda específica.
- Dados do cliente (nome, telefone, data).
- Detalhamento por produto com quantidade e subtotal por item.
- Valor total da venda.

### 5.5 Controle de Gastos

O módulo de despesas permite registrar os custos do negócio:

- **Dois tipos de gasto:** Mercadoria (aquisição de produtos para revenda) e Operacional (custos como embalagem, transporte, plataformas).
- **Campos do registro:** descrição, valor, data, quantidade (para mercadorias) e produto vinculado (opcional).
- **Listagem de gastos** com total mensal destacado em cartão vermelho.
- **Busca por descrição** para localizar gastos específicos.
- **Modal de detalhes** ao tocar em um item da lista.

### 5.6 Relatórios e Análise Financeira

A tela de relatórios oferece visibilidade sobre a saúde financeira do negócio:

- **Três períodos de análise:** Dia, Semana e Mês.
- **Gráfico de barras** comparando vendas (azul) e gastos (vermelho) no período selecionado.
- **Cartões de resultado:** total de gastos, total de vendas e lucro calculado (vendas menos gastos).
- Visualização clara que permite ao vendedor identificar rapidamente se o negócio está gerando resultado positivo.

### 5.7 Perfil do Usuário

A tela de perfil consolida a identidade do empreendedor no aplicativo:

- **Avatar** com iniciais do nome do usuário.
- **Estatísticas** do negócio: total de vendas, produtos cadastrados e clientes atendidos.
- **Edição de dados pessoais** (nome e e-mail) via modal.
- **Suporte** com acesso a canal de ajuda via WhatsApp.
- **Logout** seguro para encerrar a sessão.

---

## 6. Tecnologias Utilizadas

### 6.1 Frontend Mobile

| Tecnologia | Versão | Papel no Projeto |
|---|---|---|
| **React Native** | 0.83.1 | Framework principal para desenvolvimento mobile multiplataforma (Android e iOS) |
| **React** | 19.2.0 | Biblioteca base para construção de interfaces de usuário |
| **TypeScript** | 5.8.3 | Superset do JavaScript com tipagem estática, utilizado em todos os arquivos do projeto |

### 6.2 Navegação

| Tecnologia | Versão | Papel no Projeto |
|---|---|---|
| **React Navigation** | 7.x | Biblioteca de navegação principal do aplicativo |
| **@react-navigation/bottom-tabs** | 7.12.0 | Navegação por abas inferiores (Home, Vendas, Produtos, Gastos, Perfil) |
| **@react-navigation/native-stack** | 7.12.0 | Navegação em pilha para telas de detalhe e fluxos de adição |

### 6.3 Comunicação com API

| Tecnologia | Versão | Papel no Projeto |
|---|---|---|
| **Axios** | 1.13.6 | Cliente HTTP para realização de todas as chamadas à API REST do backend, com suporte a interceptors e autenticação via Bearer token |

### 6.4 Interface e Design

| Tecnologia | Versão | Papel no Projeto |
|---|---|---|
| **Lucide React Native** | 0.563.0 | Biblioteca de ícones vetoriais utilizada em toda a interface |
| **React Native Linear Gradient** | 2.8.3 | Criação de fundos e elementos com gradientes de cores |
| **React Native SVG** | 15.15.3 | Suporte a renderização de gráficos e elementos SVG |
| **React Native Vector Icons** | 10.3.0 | Ícones vetoriais complementares |
| **React Native Safe Area Context** | 5.6.2 | Tratamento das áreas seguras do dispositivo (notch, barra de status) |
| **React Native Screens** | 4.23.0 | Otimização de desempenho com telas nativas |

### 6.5 Visualização de Dados

| Tecnologia | Versão | Papel no Projeto |
|---|---|---|
| **React Native Gifted Charts** | 1.4.76 | Gráficos de barras interativos na tela de relatórios financeiros |

### 6.6 Armazenamento e Recursos Nativos

| Tecnologia | Versão | Papel no Projeto |
|---|---|---|
| **Async Storage** | 2.2.0 | Armazenamento local no dispositivo (persistência do token de autenticação) |
| **React Native Image Picker** | 8.2.1 | Acesso à câmera e galeria de fotos do dispositivo para seleção de imagem de perfil |

### 6.7 Ferramentas de Desenvolvimento

| Tecnologia | Versão | Papel no Projeto |
|---|---|---|
| **Babel** | 7.25.x | Transpilação de código JavaScript/TypeScript moderno |
| **Metro** | 0.83.1 | Bundler nativo do React Native para empacotamento da aplicação |
| **ESLint** | 8.19.0 | Análise estática de código para garantia de qualidade e padrões |
| **Prettier** | 2.8.8 | Formatação automática e padronizada do código-fonte |
| **Jest** | 29.6.3 | Framework de testes automatizados |

### 6.8 Plataformas de Build

| Tecnologia | Papel no Projeto |
|---|---|
| **Gradle** | Sistema de build para a versão Android do aplicativo |
| **Xcode / CocoaPods** | Sistema de build e gerenciamento de dependências para a versão iOS |

### 6.9 Backend (Integração via API REST)

O projeto frontend integra-se com uma API REST externa. Com base nos endpoints observados no código-fonte, infere-se que o backend expõe as seguintes rotas:

| Endpoint | Método | Funcionalidade |
|---|---|---|
| `/auth/login` | POST | Autenticação de usuário |
| `/auth/register` | POST | Cadastro de novo usuário |
| `/products` | GET/POST | Listagem e criação de produtos |
| `/products/:id` | PUT | Atualização de produto |
| `/products/:id/disable` | PATCH | Desativação de produto |
| `/sales` | GET/POST | Listagem e criação de vendas |
| `/expenses` | GET/POST | Listagem e criação de gastos |
| `/dashboard/summary` | GET | Resumo financeiro (dia, semana, mês) |
| `/reports/daily` | GET | Dados para o relatório de desempenho |
| `/users/me` | GET | Dados do perfil do usuário autenticado |

---

## 7. Desenvolvimento Técnico

### 7.1 Arquitetura Geral

O App Vendi adota uma arquitetura de camadas bem definida no frontend, seguindo boas práticas de desenvolvimento React Native:

```
src/
├── screens/        → Telas completas da aplicação (View Layer)
├── components/     → Componentes reutilizáveis de UI
├── contexts/       → Estado global com React Context API (State Layer)
├── services/       → Comunicação com a API REST (Service Layer)
├── navigations/    → Configuração de rotas e tipagem da navegação
├── types/          → Interfaces e tipos TypeScript globais
└── utils/          → Funções auxiliares reutilizáveis
```

Essa separação garante que cada camada tenha responsabilidade única, facilitando a manutenção, o teste e a evolução do código.

### 7.2 Gerenciamento de Estado

O projeto utiliza a **Context API** do React para gerenciar estados globais que precisam ser compartilhados entre múltiplas telas:

- **AuthContext:** Gerencia o token JWT do usuário autenticado, a função de login/logout e a persistência da sessão via AsyncStorage.
- **ProductContext:** Centraliza a lista de produtos e expõe funções de criação, edição e exclusão para todas as telas que precisam desses dados.
- **ExpenseContext:** Gerencia a lista de gastos e o total mensal, garantindo consistência entre a listagem e o dashboard.

Além dos contextos, o projeto utiliza **custom hooks** (`useSaleManager`, `useProductManager`) para encapsular lógicas complexas de telas específicas, mantendo os componentes de tela enxutos e focados na apresentação.

### 7.3 Camada de Serviços (API Integration)

Todas as chamadas HTTP são abstraídas em arquivos de serviço dedicados, utilizando o Axios como cliente:

```typescript
// Configuração central da API (src/services/api.ts)
const api = axios.create({
  baseURL: 'http://192.168.1.12:3000',
});

export const setAuthToken = (token: string) => {
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};
```

Essa abordagem centraliza a configuração da URL base e do token de autenticação, evitando duplicação de código e facilitando a troca de ambiente (desenvolvimento/produção).

### 7.4 Telas e Componentes Principais

#### Sistema de Navegação

O aplicativo utiliza uma estrutura de navegação em dois níveis:

- **Stack Navigator (Auth):** Gerencia o fluxo de autenticação (Login → Register).
- **Bottom Tab Navigator (App):** Após autenticado, o usuário acessa as cinco abas principais: Home, Vendas, Produtos, Gastos e Perfil.
- **Stack Navigator (interno a cada aba):** Permite navegação para telas de detalhe e de adição dentro de cada módulo.

#### Componentes Reutilizáveis

O projeto implementa uma biblioteca interna de componentes com design consistente:

- **SummaryCard:** Cartão de resumo numérico com label, valor e cor configuráveis.
- **QuickAction:** Botão de ação rápida com ícone, label e cores customizáveis para o dashboard.
- **RecentSale:** Componente de item de venda recente para listagem.
- **ProductChip:** Chip interativo e selecionável para escolha de produtos na tela de nova venda.
- **OrderSummary:** Resumo interativo do pedido em construção com cálculo dinâmico de total.

### 7.5 Design System

O projeto adota um sistema de cores coerente e semanticamente significativo:

| Cor | Hex | Uso |
|---|---|---|
| Azul Primário | `#4963E4` | Botões de ação principal, gráfico de vendas |
| Verde Sucesso | `#21C45D` | Valores positivos, lucro |
| Vermelho Perigo | `#EF4444` | Gastos, ações destrutivas, alertas |
| Cinza Fundo | `#F8F9FA` | Background das telas |
| Azul Escuro | `#051D3B` | Texto principal |
| Cinza Texto | `#828489` | Texto secundário |

### 7.6 Funcionalidades de UX Notáveis

- **Formatação automática de telefone:** A tela de nova venda formata o número do cliente em tempo real enquanto o usuário digita, aplicando a máscara `(XX) XXXXX-XXXX`.
- **Pull-to-refresh:** Implementado nas telas de histórico de vendas e no dashboard, permitindo atualização manual dos dados.
- **Modais de confirmação:** Ações destrutivas (como exclusão de produto) são protegidas por modais de confirmação para evitar perdas acidentais.
- **Estados vazios:** Telas sem conteúdo exibem mensagens orientativas para guiar o usuário no primeiro uso.
- **Busca em tempo real:** Listas de vendas e gastos possuem campo de busca com filtragem instantânea.

### 7.7 Autenticação e Segurança

O sistema de autenticação segue o fluxo padrão JWT (JSON Web Token):

1. O usuário insere e-mail e senha na tela de login.
2. As credenciais são enviadas ao endpoint `/auth/login`.
3. O servidor retorna um token JWT que é armazenado no AsyncStorage do dispositivo.
4. O token é injetado no cabeçalho de todas as requisições subsequentes via `Authorization: Bearer <token>`.
5. No logout, o token é removido do AsyncStorage e o usuário é redirecionado para a tela de login.

### 7.8 Compatibilidade Multiplataforma

Por ser desenvolvido em React Native, o aplicativo compila para **Android** (via Gradle e SDK Android) e **iOS** (via Xcode e CocoaPods), utilizando um único código-fonte em TypeScript. Isso representa uma eficiência significativa de desenvolvimento, pois permite manter e evoluir apenas uma base de código para duas plataformas.

---

## 8. Competências Técnicas e Comportamentais Aplicadas

### 8.1 Competências Técnicas

**Desenvolvimento Mobile:** Aplicação prática de React Native para criação de interfaces móveis responsivas e fluídas, com manipulação de componentes nativos, estilos, gestos e navegação complexa entre telas.

**Programação em TypeScript:** Uso extensivo de tipagem estática com interfaces, tipos genéricos e inferência de tipos, garantindo maior segurança e legibilidade no código.

**Consumo de APIs REST:** Implementação completa de integração com backend via HTTP, incluindo gerenciamento de tokens, tratamento de erros e organização da camada de serviços.

**Gerenciamento de Estado:** Uso da Context API e de hooks customizados para separar lógica de negócio da camada de apresentação.

**Controle de Versão com Git:** Organização do projeto com histórico de commits semânticos e descritivos, separando features, fixes e refatorações.

**Componentização e Reusabilidade:** Criação de uma biblioteca interna de componentes reutilizáveis com interface bem definida por props tipadas.

**UX/UI em aplicações móveis:** Aplicação de princípios de experiência do usuário como feedback visual, estados de carregamento, validação de formulários e design consistente com sistema de cores.

### 8.2 Competências Comportamentais

**Autonomia e Autodidatismo:** O projeto foi desenvolvido de forma independente, exigindo pesquisa constante de documentação técnica, resolução autônoma de problemas e aprendizado contínuo de novas bibliotecas e padrões.

**Capacidade de Identificar Problemas Reais:** A escolha do tema demonstra sensibilidade para identificar uma dor real de um grupo socialmente relevante e transformá-la em uma solução tecnológica concreta.

**Resiliência e Iteração:** O histórico de commits evidencia um processo iterativo saudável: implementação de features seguida de identificação e correção de bugs, sem abandono diante dos obstáculos.

**Organização e Planejamento:** A estrutura do código demonstra planejamento arquitetural, com separação clara de responsabilidades e organização modular que facilita a manutenção e escalabilidade.

**Foco no Usuário:** As decisões de design (formatação automática de campos, estados vazios orientativos, confirmação antes de exclusão) evidenciam uma postura centrada na experiência real do usuário final.

---

## 9. Impacto Social Esperado

### 9.1 Democratização do Acesso à Gestão

Ferramentas de gestão comercial de qualidade historicamente estiveram restritas a empresas com recursos para investir em sistemas pagos como ERPs, CRMs e PDVs. O App Vendi propõe romper essa barreira ao oferecer funcionalidades essenciais de forma acessível e gratuita diretamente no smartphone do vendedor, um dispositivo que a grande maioria dos brasileiros já possui.

### 9.2 Redução do Fracasso Empresarial Precoce

Estudos do Sebrae indicam que boa parte dos pequenos negócios encerra as atividades nos primeiros anos, sendo a falta de planejamento e controle financeiro uma das principais causas. Ao fornecer ao empreendedor iniciante uma ferramenta que o ajuda a entender se seu negócio está dando lucro, quais produtos vendem mais e onde estão seus principais custos, o Vendi contribui diretamente para a redução dessa taxa de mortalidade empresarial.

### 9.3 Geração de Renda e Autonomia Financeira

Ao aumentar as chances de sucesso do pequeno vendedor, o aplicativo contribui indiretamente para a geração e manutenção de renda de famílias que dependem da atividade comercial autônoma. A sustentabilidade de um pequeno negócio significa independência financeira, dignidade e qualidade de vida para seu proprietário.

### 9.4 Inclusão Digital na Gestão Empresarial

O aplicativo serve como um ponto de entrada para a cultura de gestão baseada em dados. Ao começar a usar uma ferramenta digital para registrar vendas e gastos, o empreendedor desenvolve o hábito de monitorar seus resultados e passa a tomar decisões com base em informações concretas, elevando seu nível de maturidade empresarial.

### 9.5 Potencial de Escala

Por ser uma aplicação móvel multiplataforma, o Vendi tem potencial de impactar milhares de vendedores iniciantes em todo o território nacional, sem que isso implique aumento proporcional de custo de distribuição — uma característica única da solução digital que amplifica seu impacto social.

---

## 10. Processo de Desenvolvimento

### 10.1 Fase 1 – Concepção e Planejamento

O projeto teve início com a identificação do problema social a ser resolvido: a dificuldade de iniciantes no mercado de vendas em organizar e controlar seu negócio. A partir dessa definição, foram mapeadas as funcionalidades essenciais para o produto mínimo viável (MVP): autenticação, gestão de produtos, registro de vendas, controle de gastos e visualização de resultados.

A escolha do React Native como tecnologia principal foi orientada pela necessidade de atingir tanto usuários Android quanto iOS com um único projeto, reduzindo o esforço de desenvolvimento.

### 10.2 Fase 2 – Construção do Frontend (Interface)

O desenvolvimento das telas seguiu uma ordem lógica partindo das mais fundamentais:

**Etapa 1 – Autenticação:** Criação das telas de login e cadastro com validação de campos e navegação entre telas.

**Etapa 2 – Produtos:** Implementação da listagem, criação, edição e exclusão de produtos — módulo necessário para que o registro de vendas funcionasse corretamente.

**Etapa 3 – Vendas:** Construção da tela de nova venda com seleção de produtos por chips, resumo do pedido e salvamento. Em seguida, criação do histórico e da tela de detalhes.

**Etapa 4 – Gastos:** Desenvolvimento do fluxo de registro de despesas com categorização por tipo e possibilidade de vinculação a produtos.

**Etapa 5 – Relatórios:** Implementação da tela de análise financeira com gráficos de barras e cálculo de lucro por período.

**Etapa 6 – Perfil e Dashboard:** Finalização da tela de perfil com estatísticas e do dashboard com resumo em tempo real.

### 10.3 Fase 3 – Integração com o Backend

Após a construção das interfaces, cada módulo foi progressivamente integrado à API REST do backend. Essa integração foi realizada módulo a módulo, começando pela autenticação e seguindo pela ordem de dependência funcional: produtos → vendas → gastos → dashboard e relatórios → perfil.

O histórico de commits demonstra esse padrão de integração incremental com mensagens como:
- *"Integrando back end de produtos ao front end"*
- *"Integrando a tela de Adicionar uma nova venda ao back"*
- *"Conectei as funcinalidades da tela home ao back end"*
- *"Criando conexão da tela de perfil com o back"*

### 10.4 Fase 4 – Correção de Bugs e Refinamento

Após cada integração, foram identificados e corrigidos bugs de comportamento, problemas de formatação de dados (como datas) e inconsistências entre o que o frontend esperava e o que o backend retornava. Essa fase iterativa de correção foi fundamental para estabilizar o aplicativo e melhorar a experiência do usuário.

O histórico de commits registra múltiplos ciclos de fix:
- *"Corrigi bastante erro no front end, em vários arquivos, erros de UI/UX"*
- *"Corrigindo o front para se encaixar adequadamente com o back"*

### 10.5 Fase 5 – Estado Atual e Próximos Passos

O projeto encontra-se em estado funcional com todos os módulos principais integrados ao backend. Melhorias identificadas para versões futuras incluem:

- Refinamento da vinculação de gastos a produtos específicos.
- Correção do tratamento de fuso horário nas datas de gastos.
- Melhorias visuais na tela de relatórios.
- Possível adição de exportação de dados em PDF ou planilha.
- Funcionalidade de envio de orçamento ou recibo ao cliente via WhatsApp.

### 10.6 Desafios Técnicos Enfrentados

Durante o desenvolvimento, alguns desafios técnicos notáveis puderam ser identificados:

**Sincronização de estado entre telas:** Garantir que, após adicionar ou editar um produto, a lista de produtos e a tela de nova venda refletissem imediatamente a mudança exigiu o uso consistente de contextos e callbacks de atualização.

**Formatação de datas e valores monetários:** A serialização de datas entre o frontend e a API gerou inconsistências que precisaram ser tratadas com funções de conversão dedicadas.

**Tipagem de navegação:** Com TypeScript, a tipagem completa dos parâmetros passados entre telas via React Navigation exigiu definição cuidadosa de tipos no arquivo de navegação.

**Integração multiplataforma:** Garantir que bibliotecas nativas (como react-native-linear-gradient e react-native-image-picker) funcionassem corretamente tanto no Android quanto no iOS exigiu atenção especial à configuração de dependências nativas.

---

## 11. Repositório GitHub

> **Link do Repositório:**
>
> *(Cole aqui o link do repositório GitHub do projeto)*
>
> Exemplo: `https://github.com/Wesley2117/vendi`

---

## 12. Divulgação no LinkedIn

> *A publicação abaixo está pronta para ser postada no LinkedIn. Substitua os campos indicados entre colchetes antes de publicar.*

---

**[PUBLICAÇÃO LINKEDIN]**

---

Orgulho em compartilhar o **App Vendi** — meu projeto integrador! 📱

Durante minha formação em Bacharelado em Ciência da Computação na Gran Faculdade, desenvolvi um aplicativo mobile completo voltado a **ajudar pessoas que estão iniciando no mercado de vendas** a organizar e crescer no negócio.

**O problema que me motivou:**
Milhões de vendedores autônomos e microempreendedores no Brasil controlam suas vendas em cadernos ou na memória. Isso leva a descontrole financeiro, perda de informações e dificuldade para entender se o negócio está dando lucro.

**A solução — App Vendi:**
✅ Cadastro e controle de produtos com estoque
✅ Registro detalhado de vendas com dados do cliente
✅ Controle de gastos operacionais e de mercadoria
✅ Dashboard com totais do dia, semana e mês
✅ Relatórios com gráficos comparando vendas x gastos
✅ Cálculo automático de lucro por período
✅ Perfil do empreendedor com estatísticas do negócio

**Tecnologias utilizadas:**
⚙️ React Native + TypeScript
⚙️ React Navigation
⚙️ Axios (integração com API REST)
⚙️ Context API para gerenciamento de estado
⚙️ React Native Gifted Charts (visualização de dados)
⚙️ JWT Authentication

**O impacto que busco:**
Democratizar o acesso à gestão comercial básica para quem mais precisa: o vendedor iniciante que tem talento e vontade, mas falta de ferramentas. Se um aplicativo pode ajudar alguém a não desistir do seu negócio, já valeu cada linha de código.

Agradeço à Gran Faculdade e a todos que me apoiaram nessa jornada.

**Feedback é muito bem-vindo!** 🙌

🔗 GitHub: *(link do repositório)*

#DesenvolvimentoDeSistemas #ReactNative #TypeScript #ProjetoIntegrador #Mobile #Empreendedorismo #ImpactoSocial #ProgramacaoMobile #AppDevelopment

---

## 13. Conclusão

O App Vendi representa muito mais do que a conclusão técnica de um projeto integrador — é a materialização de uma convicção de que a tecnologia, quando bem aplicada, tem o poder de transformar realidades e ampliar oportunidades.

Ao longo do desenvolvimento, foi possível aplicar na prática um conjunto abrangente de conhecimentos técnicos: desenvolvimento mobile multiplataforma com React Native, tipagem estática com TypeScript, comunicação com APIs REST, gerenciamento de estado, componentização, segurança com autenticação JWT e visualização de dados. Cada desafio técnico encontrado gerou aprendizado concreto e aprofundamento das competências profissionais.

Mais do que isso, o projeto demonstrou que é possível, mesmo em fase de formação, construir soluções com impacto social real. O problema do descontrole financeiro entre pequenos vendedores e empreendedores iniciantes é urgente e concreto, e o Vendi oferece uma resposta funcional, acessível e tecnicamente sólida para esse problema.

O processo iterativo de desenvolvimento — construir, integrar, testar, corrigir e melhorar — reflete a realidade do trabalho profissional em tecnologia e evidencia maturidade no ciclo de desenvolvimento de software. O histórico de 27 commits documenta uma jornada de comprometimento, persistência e evolução constante.

O App Vendi está pronto para evoluir. Com a base técnica estabelecida, versões futuras poderão incorporar novas funcionalidades como exportação de relatórios, envio de orçamentos aos clientes, integração com meios de pagamento digital e até um sistema de aprendizado sobre vendas e gestão. O potencial de impacto é proporcional à necessidade que o motivou: enorme.

Este projeto reafirma a crença de que desenvolvedores de software têm responsabilidade e capacidade de contribuir ativamente para uma sociedade mais justa e com oportunidades mais igualitárias. Cada linha de código comprometida com um propósito real é um passo nessa direção.

---

## 14. Referências

### Frameworks e Bibliotecas

- **React Native** (v0.83.1) — Framework para desenvolvimento de aplicativos móveis multiplataforma. Meta Platforms. Disponível em: https://reactnative.dev
- **React** (v19.2.0) — Biblioteca JavaScript para construção de interfaces de usuário. Meta Platforms. Disponível em: https://react.dev
- **TypeScript** (v5.8.3) — Superset tipado de JavaScript. Microsoft. Disponível em: https://www.typescriptlang.org
- **React Navigation** (v7.x) — Biblioteca de roteamento e navegação para React Native. Disponível em: https://reactnavigation.org
- **Axios** (v1.13.6) — Cliente HTTP baseado em Promises para JavaScript. Disponível em: https://axios-http.com
- **React Native Gifted Charts** (v1.4.76) — Biblioteca de gráficos para React Native. Disponível em: https://github.com/Abhinandan-Kushwaha/react-native-gifted-charts
- **Lucide React Native** (v0.563.0) — Biblioteca de ícones vetoriais. Disponível em: https://lucide.dev
- **React Native Linear Gradient** (v2.8.3) — Gradientes para React Native. Disponível em: https://github.com/react-native-linear-gradient/react-native-linear-gradient
- **React Native Async Storage** (v2.2.0) — Armazenamento assíncrono para React Native. Disponível em: https://react-native-async-storage.github.io/async-storage/
- **React Native Image Picker** (v8.2.1) — Seletor de imagens nativo. Disponível em: https://github.com/react-native-image-picker/react-native-image-picker

### Ferramentas de Desenvolvimento

- **Babel** (v7.25.x) — Compilador JavaScript. Disponível em: https://babeljs.io
- **ESLint** (v8.19.0) — Ferramenta de análise estática de código. Disponível em: https://eslint.org
- **Prettier** (v2.8.8) — Formatador de código opinado. Disponível em: https://prettier.io
- **Jest** (v29.6.3) — Framework de testes JavaScript. Disponível em: https://jestjs.io
- **Metro** (v0.83.1) — JavaScript Bundler para React Native. Disponível em: https://metrobundler.dev

### Conceitos e Padrões

- **REST API (Representational State Transfer)** — Padrão arquitetural para APIs web. FIELDING, Roy Thomas. Architectural Styles and the Design of Network-based Software Architectures. University of California, Irvine, 2000.
- **JWT (JSON Web Token)** — Padrão RFC 7519 para transmissão segura de informações entre partes. Disponível em: https://jwt.io
- **Context API** — Mecanismo de gerenciamento de estado global nativo do React. Documentação oficial: https://react.dev/reference/react/createContext
- **React Hooks** — API de hooks do React (useState, useEffect, useCallback, useMemo). Documentação oficial: https://react.dev/reference/react/hooks

### Dados e Contexto Social

- **IBGE – Instituto Brasileiro de Geografia e Estatística.** Pesquisa Nacional por Amostra de Domicílios (PNAD). Disponível em: https://www.ibge.gov.br
- **Sebrae – Serviço Brasileiro de Apoio às Micro e Pequenas Empresas.** Sobrevivência das Empresas no Brasil. Disponível em: https://www.sebrae.com.br

---

*Documento gerado em junho de 2026. Todos os dados técnicos são baseados na análise do código-fonte real do projeto Vendi disponível no repositório GitHub do autor.*
