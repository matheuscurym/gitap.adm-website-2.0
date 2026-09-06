# Gitap.adm Website 2.0

**Em desenvolvimento · Projeto de portfólio da Núcleo FourTech**

Site institucional da Gitap.adm, microempresa dedicada à coleta de lixo eletrônico e ao reaproveitamento de materiais. O projeto conecta responsabilidade ambiental e facilidade de atendimento: o visitante consulta os materiais aceitos e prepara uma solicitação de coleta em sua casa ou empresa.

A proposta visual preserva a identidade da marca e apresenta o impacto do descarte correto com navegação responsiva, conteúdo organizado e caminhos claros para o agendamento.

## Recursos

- Catálogo pesquisável com 48 materiais, filtros por categoria e exclusões visíveis.
- Seleção de materiais integrada ao formulário de coleta.
- Solicitação pelo WhatsApp, alternativa por e-mail e opção de copiar a mensagem.
- Apresentação dos serviços, processo de coleta, propósito e fundador.
- Animações em canvas, digitação do título, contadores e entradas ao rolar.
- Carrossel com controles, pausa e reprodução automática.
- Janelas de detalhes com navegação por teclado, menu móvel e retorno ao topo.
- Preferência por movimento reduzido e aprimoramento progressivo.
- Logo PNG e símbolo vetorial do WhatsApp.

## Tecnologias e organização

HTML5, CSS3 e JavaScript puro. Sem framework, jQuery, instalação de dependências ou etapa de compilação. A fonte Poppins é carregada pelo Google Fonts; o símbolo do WhatsApp foi incorporado individualmente, sem carregar a biblioteca Bootstrap.

```text
gitap.html              Conteúdo e estrutura da página
gitap.css               Identidade visual, layout e responsividade
gitap.js                Interações, animações e formulário
index.html              Entrada que direciona para gitap.html
assets/                 Imagens do projeto
THIRD_PARTY_NOTICES.md   Créditos e licença do ícone utilizado
```

Abra `gitap.html` no navegador ou sirva esta pasta com qualquer servidor estático. O arquivo `index.html` mantém uma entrada compatível com hospedagens estáticas e preserva os atalhos de seção quando o JavaScript está ativo.

## Agendamento e privacidade

O formulário prepara uma mensagem para revisão e envio pelo visitante. Não há backend, banco de dados ou confirmação automática de coleta. A disponibilidade, o endereço e a data são combinados diretamente com a equipe da Gitap.adm. O site não salva os campos em armazenamento local.

## Conteúdo e fontes

- [Site anterior da Gitap.adm](https://matheuscurym.github.io/gitapadm-website/)
- [Repositório do site anterior](https://github.com/matheuscurym/gitapadm-website)
- [Facebook da empresa](https://www.facebook.com/Gitap.adm/)
- [Global E-waste Monitor 2024 — UNITAR / UIT](https://unitar.org/about/news-stories/press/global-e-waste-monitor-2024-electronic-waste-rising-five-times-faster-documented-e-waste-recycling)

A relação de materiais e os serviços foram extraídos das fontes da empresa. As métricas históricas são identificadas como autodeclaradas no site anterior, sem extrapolações para resultados não publicados. A apresentação do fundador e a coleta domiciliar também seguem o briefing fornecido pelo cliente.

## Status e próximos passos

**Este projeto ainda está em desenvolvimento e não representa uma versão institucional final aprovada.**

- Substituir os espaços de fotografia por imagens autorizadas do fundador e da operação.
- Substituir os depoimentos demonstrativos, claramente identificados como fictícios, por relatos reais autorizados.
- Confirmar métricas históricas, cobertura, condições de coleta e endereço institucional.
- Validar e inserir documentos antes de apresentar certificações ou parcerias como vigentes.
- Revisar a versão restaurada da logo com o cliente e, se disponível, substituir pelo arquivo vetorial oficial.

Desenvolvido pela **Núcleo FourTech**, com foco em presença digital para pequenos negócios. A identidade e os conteúdos institucionais da Gitap.adm pertencem aos seus respectivos titulares. A disponibilidade pública deste repositório não concede licença sobre a marca ou os materiais do cliente.
