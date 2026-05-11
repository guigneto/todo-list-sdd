# 🌐 Deployment no GitHub Pages

Guia passo-a-passo para fazer deploy da aplicação no GitHub Pages.

## 📋 Pré-requisitos

- Repositório GitHub criado
- Git instalado e configurado
- Node.js 18+
- Acesso ao repositório com permissão de push

## 🚀 Setup Inicial

### 1. Configure o repositório remoto

```bash
git remote add origin https://github.com/seu-usuario/todo-list-sdd.git
git branch -M main
git push -u origin main
```

### 2. Configure GitHub Pages

1. Acesse seu repositório no GitHub
2. Vá para **Settings** → **Pages**
3. Em "Build and deployment":
   - **Source:** Deploy from a branch
   - **Branch:** `main`
   - **Folder:** `/ (root)`
4. Clique em **Save**

## 📦 Build para Produção

### Gerar build otimizado

```bash
npm run build
```

Isso cria a pasta `dist/` com a aplicação pronta para deploy.

## 📤 Deploy Manual

### Opção 1: Deploy direto da pasta dist

```bash
# 1. Build
npm run build

# 2. Commit dos arquivos
git add dist/
git commit -m "Deploy: Versão production"

# 3. Push para GitHub
git push origin main
```

### Opção 2: Deploy com Git Subtree (recomendado)

```bash
# 1. Build
npm run build

# 2. Deploy subtree
git subtree push --prefix dist origin gh-pages
```

Depois configure GitHub Pages para usar a branch `gh-pages`.

## 🤖 Deploy Automático com GitHub Actions

Já existe um workflow configurado em `.github/workflows/deploy.yml` que:

- ✅ Roda testes automaticamente
- ✅ Faz build da aplicação
- ✅ Deploy automático ao fazer push para `main`

### Arquivo de workflow

```yaml
name: Deploy

on:
  push:
    branches:
      - main

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run test
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

## ✅ Verificar o Deploy

Após fazer push, sua aplicação estará disponível em:

```
https://seu-usuario.github.io/todo-list-sdd/
```

### Verificar status do deploy

1. Acesse seu repositório no GitHub
2. Clique em **Actions**
3. Veja o workflow rodando
4. Status verde ✓ = Deploy bem-sucedido

## 🔧 Configuração Avançada

### Domínio Customizado

1. Crie um arquivo `CNAME` na raiz com seu domínio:

```bash
echo "seu-dominio.com" > CNAME
git add CNAME
git commit -m "Add custom domain"
git push
```

2. Configure DNS apontando para GitHub Pages:

```
seu-dominio.com → seu-usuario.github.io
```

### 404 para SPA

Como é uma SPA, crie `docs/404.md`:

```markdown
---
permalink: /404.html
---

<!DOCTYPE html>
<html>
<head>
    <script>
        sessionStorage.redirect = location.href;
    </script>
    <meta http-equiv="refresh" content="0;URL='/todo-list-sdd'"></meta>
</head>
<body>
</body>
</html>
```

## 📊 Monitoramento

### Verificar tamanho do build

```bash
npm run build

# Saída esperada
# dist/index.html                   0.61 kB
# dist/assets/index-*.css           8.53 kB │ gzip:  2.46 kB
# dist/assets/index-*.js          158.44 kB │ gzip: 50.52 kB
```

### GitHub Actions Insights

1. Acesse **Actions** no repositório
2. Verifique logs de deployment
3. Veja tempo de execução

## 🔄 Rollback

Se algo deu errado, volte para um commit anterior:

```bash
git revert HEAD
git push origin main
```

## ❌ Troubleshooting

### Site não aparece

**Problema:** GitHub Pages page não aparece após deploy

**Solução:**
1. Verifique se branch `main` está selecionada em Settings → Pages
2. Aguarde 2-3 minutos para build concluir
3. Limpe cache (Ctrl+Shift+Delete)
4. Verifique se `dist/` foi commitado

### Build falha

**Problema:** Workflow falha em GitHub Actions

**Solução:**
1. Clique em Actions
2. Veja o log do workflow
3. Execute `npm run build` localmente e compare erros
4. Comite e empurre correção

### Arquivo 404

**Problema:** Ao clicar em links, dá 404

**Solução:**
- Vite gera arquivo `dist/index.html`
- Configure redirect 404 → index.html
- GitHub Pages faz isso automaticamente

## 📚 Recursos Adicionais

- [GitHub Pages Docs](https://docs.github.com/en/pages)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)
- [GitHub Actions Docs](https://docs.github.com/en/actions)

---

**Deploy concluído! Sua aplicação está ao vivo! 🎉**
