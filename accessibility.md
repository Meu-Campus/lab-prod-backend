# Análise de Requisitos para a Avaliação NAP 02

Este documento detalha como os requisitos de usabilidade, acessibilidade e técnicas de teste foram implementados nos projetos `meu-campus-frontend` e `lab-prod-backend` para atender aos critérios da avaliação NAP 02.

---

## 1. Usabilidade e Acessibilidade (Frontend)

Os seguintes conceitos foram implementados no projeto `meu-campus-frontend`.

### 1.1. Conceitos de Usabilidade

**a) Feedback de Carregamento (Visibilidade do Status do Sistema)**

- **Descrição:** O sistema informa ao usuário que uma ação está em progresso, evitando cliques duplicados e incerteza.
- **Implementação:** Na tela de login (`app/auth/login/page.tsx`), o botão "Login" utiliza o estado `isPending` retornado pelo hook `useLoginUser`. Quando a requisição de login está em andamento, a propriedade `loading` do botão é ativada, desabilitando-o e exibindo um ícone de carregamento.
- **Evidência:** Componente `<Button type="submit" className="w-full" loading={isPending}>`.

**b) Validação e Correção de Erros (Prevenção de Erros)**

- **Descrição:** O sistema valida as entradas do usuário em tempo real e fornece feedback claro e contextual sobre como corrigir erros.
- **Implementação:** O formulário de login utiliza a biblioteca `react-hook-form` em conjunto com o `zodResolver` para validação de schema. Se um campo como "E-mail" é preenchido incorretamente, uma mensagem de erro (ex: "E-mail inválido") é exibida imediatamente abaixo do campo correspondente.
- **Evidência:** Bloco de código `{errors.email && <p role="alert">{errors.email.message}</p>}` no arquivo `app/auth/login/page.tsx`.

### 1.2. Conceitos de Acessibilidade

**a) Configuração de Idioma para Leitores de Tela**

- **Descrição:** Garante que softwares de leitura de tela utilizem a pronúncia e o sotaque corretos para o conteúdo, tornando a experiência de navegação compreensível para usuários com deficiência visual.
- **Implementação:** No arquivo de layout principal da aplicação (`app/layout.tsx`), a tag `<html>` possui o atributo `lang="pt-BR"`.
- **Evidência:** Linha de código `<html lang="pt-BR" ...>`.

**b) Navegação e Semântica de Formulários**

- **Descrição:** Permite que usuários que dependem de navegação por teclado e leitores de tela interajam com formulários de maneira eficiente e autônoma.
- **Implementação:** No formulário de login, cada `<input>` possui um `<label>` associado através dos atributos `htmlFor` e `id`. Isso cria uma conexão semântica que permite aos leitores de tela anunciar qual campo está em foco (ex: "E-mail, caixa de edição").
- **Evidência:** Uso de `<label htmlFor="email">` pareado com `<Input id="email" ...>`.

---

## 2. Técnicas de Teste (Backend)

Os testes foram implementados no arquivo `src/module/user-module/user-module.test.ts` e cobrem o endpoint de criação de usuário (`POST /user`).

### 2.1. Testes de Caixa Preta

**a) Particionamento em Classes de Equivalência**

- **Descrição:** Testa o sistema com um conjunto de dados representativo da "classe de equivalência válida", onde se espera que todos os dados sejam processados com sucesso.
- **Implementação:** O teste `"should create a user successfully with valid data (Equivalence Partitioning)"` envia um payload com nome, e-mail e senha que atendem a todas as regras de negócio.
- **Resultado Esperado:** O teste verifica se a API retorna status `200` e uma mensagem de sucesso.

**b) Análise do Valor Limite**

- **Descrição:** Foca em testar os limites das regras de validação de dados.
- **Implementação:** O teste `"should return 400 if password is too short (Boundary Value Analysis)"` verifica o limite inferior para o comprimento da senha. Sendo a regra um mínimo de 6 caracteres, o teste envia uma senha com 5 caracteres.
- **Resultado Esperado:** O teste espera que a API rejeite a requisição com status `400` e retorne um erro específico para o campo `password`.

### 2.2. Testes de Caixa Branca

**a) Análise de Caminhos (Path Analysis)**

- **Descrição:** Garante que diferentes fluxos lógicos dentro do código sejam executados e validados.
- **Implementação:**
    1.  **Caminho de Erro (Usuário já existe):** O teste `"should return an error if email already exists (Logical Path Analysis)"` força a execução do caminho condicional onde um usuário com o e-mail fornecido já está cadastrado. Ele primeiro insere um usuário no banco e depois tenta criá-lo novamente via API.
        - **Resultado Esperado:** A API deve retornar status `400` com a mensagem "Já existe um usuário com esse email".

    2.  **Caminho de Sucesso (Novo usuário e Hashing de Senha):** O teste `"should correctly hash password and save user (Logical Path Analysis)"` valida o fluxo principal de sucesso. Além de verificar a criação do usuário (status `200`), ele acessa o banco de dados para confirmar que a senha foi salva de forma "hasheada" (diferente da original), cobrindo uma etapa interna e crítica do processo.
        - **Resultado Esperado:** O usuário é criado e a senha no banco de dados não é igual à senha enviada na requisição.
