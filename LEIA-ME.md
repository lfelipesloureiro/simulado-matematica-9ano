# Simulado de Matemática — 9º ano

Site estático para GitHub Pages com 28 questões extraídas do DOCX enviado, sem alterar enunciados ou alternativas. As tabelas das questões 19 e 28 também foram incluídas.

## 1. Criar planilha e endpoint
1. Crie uma planilha Google vazia, preferencialmente na conta institucional do professor.
2. Em **Extensões → Apps Script**, cole o conteúdo de `Codigo_Apps_Script.gs` e salve.
3. O gabarito do documento enviado já está inserido em `GABARITO`. A correção é feita no Apps Script, sem expor o gabarito no site dos alunos.
4. Clique em **Implantar → Nova implantação → Aplicativo da Web**. Executar como: **você**. Acesso: **Qualquer pessoa** (ou a opção institucional que permita aos alunos acessar; teste a política da escola). Autorize e copie a URL terminada em `/exec`.
5. Cole a URL entre aspas em `config.js` no lugar de `COLE_AQUI_A_URL_DO_APPS_SCRIPT`.
6. Se editar o código do Apps Script depois, atualize a implantação para uma nova versão.

## 2. Publicar no GitHub Pages
1. Crie um repositório no GitHub e envie `index.html`, `app.js`, `config.js` e `questoes.json` na raiz (não é necessário publicar o arquivo `.gs`).
2. Em **Settings → Pages**, selecione **Deploy from a branch**, branch `main`, pasta `/ (root)` e salve.
3. Abra o endereço gerado e faça um envio de teste. Confira se aparece uma linha na aba `Respostas` da planilha.

## Observações importantes
- **Revise com o professor**: na questão 11, as alternativas B (2/5) e D (4/10) são equivalentes. O código aceita ambas como corretas.
- O Google Apps Script deve ser implantado com acesso apropriado. O site usa `fetch` e precisa de resposta CORS permitida pelo endpoint do Apps Script; teste em GitHub Pages com uma submissão real. Se houver bloqueio CORS no navegador, use a alternativa descrita abaixo.
- GitHub Pages é público e **não autentica alunos**. Nome e número são autodeclarados; a mesma pessoa pode enviar novamente. O cronômetro é client-side e não é mecanismo antifraude. Use para simulados formativos, não para provas de alta segurança.
- O site não exibe o gabarito ao aluno. Após envio confirmado, mostra a quantidade de acertos e a nota (0 a 10), calculadas pelo Apps Script, desde que o professor tenha configurado o gabarito oficial. Proteja a planilha e evite expor dados dos estudantes em repositórios públicos.

## Alternativa se houver erro de CORS
Hospede a própria página dentro do Apps Script usando `HtmlService` (em vez do GitHub Pages) ou utilize um endpoint intermediário que suporte CORS. Um endpoint Apps Script padrão pode não responder a solicitações cross-origin feitas com `fetch` em alguns navegadores; teste antes de aplicar em turma.

## Exibição da nota
Após o envio, o aluno vê os acertos (de 28) e a nota (0 a 10, com duas casas decimais). O gabarito permanece somente no Apps Script. O gabarito já está configurado. Teste a conexão do GitHub Pages com o Apps Script antes da aplicação.
