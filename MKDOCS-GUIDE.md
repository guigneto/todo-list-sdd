# 🚀 GUIA MKDOCS - Documentação Pronta para GitHub Pages

## 📋 O que foi criado

Documentação completa em **MkDocs + Material Theme** com:

✅ **10 arquivos Markdown** de documentação  
✅ **Configuração MkDocs** (`mkdocs.yml`)  
✅ **GitHub Actions workflow** para auto-deploy (`docs.yml`)  
✅ **Scripts npm** para build/serve local  
✅ **Navegação intuitiva** com temas claro/escuro  
✅ **Search engine** integrado  
✅ **Responsive design** para mobile  

## 📁 Arquivos Criados

```
docs/
├── index.md                          # Home
├── quickstart.md                     # Guia rápido
├── changelog.md                      # Histórico
├── faq.md                            # Dúvidas
├── documentation/
│   ├── architecture.md               # Arquitetura
│   ├── api.md                        # Referência de API
│   └── (user-guide.md, configuration.md - template)
├── deployment/
│   ├── github-pages.md              # Deploy GitHub Pages
│   ├── vercel.md                    # Deploy Vercel
│   └── troubleshooting.md           # Troubleshooting
└── development/
    ├── setup.md                     # Setup local
    ├── project-structure.md         # Estrutura do projeto
    ├── testing.md                   # Guia de testes
    └── (contributing.md - template)

mkdocs.yml                           # Configuração MkDocs
.github/workflows/docs.yml           # Deploy automático
```

## 🚀 Como Usar

### 1. Visualizar Documentação Localmente

```bash
# Instalar MkDocs (primeira vez)
pip install mkdocs mkdocs-material

# Ou via npm (se preferir)
npm install -g mkdocs mkdocs-material

# Servir localmente
mkdocs serve

# Abrir em http://localhost:8000
```

### 2. Build da Documentação

```bash
# Gerar site estático em site/
mkdocs build
```

### 3. Deploy Automático (GitHub Pages)

Está configurado para fazer deploy automático quando você:

1. **Fazer push** para branch `main`
2. **Modificar** arquivos em `docs/` ou `mkdocs.yml`

**Workflow automático:**
```
Push para main
    ↓
GitHub Actions acionado
    ↓
mkdocs build
    ↓
Deploy para GitHub Pages
    ↓
Documentação ao vivo em:
https://seu-usuario.github.io/todo-list-sdd
```

### 4. Configurar GitHub Pages

1. Acesse seu repositório no GitHub
2. **Settings** → **Pages**
3. Em "Build and deployment":
   - **Source:** Deploy from a branch
   - **Branch:** `gh-pages`
   - **Folder:** `/ (root)`
4. Clique **Save**

Pronto! MkDocs vai fazer deploy automaticamente para `gh-pages`.

## 📝 Como Editar Documentação

### Adicionar Página Nova

1. Crie arquivo `docs/novo-arquivo.md`
2. Edite `mkdocs.yml` e adicione na seção `nav`:

```yaml
nav:
  - Home: index.md
  - Sua Página: novo-arquivo.md
```

3. Faça push
4. GitHub Actions faz deploy automático

### Exemplo: Adicionar Guia do Usuário

```yaml
# Em mkdocs.yml
nav:
  - Home: index.md
  - Início Rápido: quickstart.md
  - Documentação:
      - Guia do Usuário: documentation/user-guide.md  # ← Adicione
      - Arquitetura: documentation/architecture.md
```

### Estrutura Markdown

```markdown
# Título Principal

## Seção 1

Conteúdo aqui.

### Subseção

Mais conteúdo.

## Seção 2

- Lista item 1
- Lista item 2

### Código

\`\`\`typescript
const task = { titulo: 'Estudar' };
\`\`\`
```

## 🎨 Customizações

### Mudar Cores

Em `mkdocs.yml`:

```yaml
theme:
  palette:
    - scheme: light
      primary: blue        # ← Mudar cor
      accent: indigo
```

**Cores disponíveis:**
- red, pink, purple, deep purple
- indigo, blue, light blue, cyan
- teal, green, light green, lime
- yellow, amber, orange, deep orange
- brown, grey, blue grey

### Mudar Logo

1. Coloque logo em `docs/assets/logo.svg`
2. Em `mkdocs.yml`:

```yaml
theme:
  logo: assets/logo.svg
  favicon: assets/favicon.ico
```

### Adicionar Extensões

Em `mkdocs.yml`:

```yaml
markdown_extensions:
  - pymdownx.emoji              # 😊 Emojis
  - pymdownx.highlight          # Syntax highlight
  - pymdownx.superfences        # Code blocks
  - admonition                  # !!! Note, Warning, etc
  - tables                      # Markdown tables
```

## 📊 Estrutura de Navegação

Em `mkdocs.yml`, a estrutura de `nav` define menu:

```yaml
nav:
  - Home: index.md
  - Documentação:
      - Arquitetura: documentation/architecture.md
      - API: documentation/api.md
  - Desenvolvimento:
      - Setup: development/setup.md
      - Testes: development/testing.md
  - Deployment:
      - GitHub Pages: deployment/github-pages.md
      - Vercel: deployment/vercel.md
```

Resulta em menu:
```
Home
Documentação
  ├─ Arquitetura
  └─ API
Desenvolvimento
  ├─ Setup
  └─ Testes
Deployment
  ├─ GitHub Pages
  └─ Vercel
```

## 🔍 Search

MkDocs inclui search integrado:

- Click no ícone 🔍 no header
- Digite para buscar
- Resultados em tempo real

Para desabilitar:

```yaml
plugins:
  - search: null
```

## 🌍 Multi-idioma (Futuro)

MkDocs suporta múltiplos idiomas:

```yaml
plugins:
  - i18n:
      default_language: pt
      languages:
        pt: Português
        en: English
        es: Español
```

## 📱 Mobile

MkDocs Material é fully responsive:

- ✅ Desktop
- ✅ Tablet
- ✅ Mobile (menu hamburguer)

Teste em seu celular!

## 🚀 Deploy Alternativo

### Se não quiser usar GitHub Actions

**Opção 1: Deploy manual**

```bash
mkdocs build
# Isso cria pasta site/
# Upload site/ para GitHub Pages manualmente
```

**Opção 2: Deploy para Netlify**

```bash
# Instalar CLI Netlify
npm install -g netlify-cli

# Deploy
netlify deploy --prod --dir site
```

**Opção 3: Deploy para Vercel**

```bash
# Criar vercel.json na raiz:
{
  "buildCommand": "mkdocs build",
  "outputDirectory": "site"
}

# Deploy
vercel --prod
```

## 🐛 Troubleshooting

### "ModuleNotFoundError: No module named 'mkdocs'"

```bash
pip install mkdocs mkdocs-material
```

### Site não atualiza após push

1. Aguarde 2-3 minutos (GitHub Actions roda)
2. Verifique Actions tab no GitHub
3. Limpe cache do navegador (Ctrl+Shift+Delete)

### Build falha localmente

```bash
# Verifique mkdocs.yml sintaxe
mkdocs build --strict

# Ou reinstale dependências
pip install --upgrade mkdocs mkdocs-material
```

### Documentação não aparece em GitHub Pages

1. Settings → Pages → Branch `gh-pages`
2. Workflow fez deploy? Verifique Actions
3. Espere 2-3 minutos para build concluir

## 📚 Recursos

- [MkDocs Official](https://www.mkdocs.org)
- [Material Theme](https://squidfunk.github.io/mkdocs-material/)
- [Markdown Guide](https://www.markdownguide.org)

## ✨ Próximos Passos

1. **Customize mkdocs.yml** com seu URL, título, etc
2. **Edite documentação** (seus URL GitHub, contato, etc)
3. **Faça push** para trigger deploy automático
4. **Acesse** sua documentação em GitHub Pages!

## 📞 Suporte

Documentação gerada automaticamente com:
- ✅ Material Theme (beautiful design)
- ✅ Search integrado
- ✅ Dark/Light mode
- ✅ Mobile responsive
- ✅ SEO-friendly

---

**Sua documentação está pronta para ir ao ar! 🚀**

Acesse em: `https://seu-usuario.github.io/todo-list-sdd/`

(Após fazer push e workflow completar)
