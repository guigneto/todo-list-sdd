# 🚀 Deployment - TODO List SDD

## Vercel Deployment (Recomendado - Free Tier)

### Pré-requisitos
- Conta GitHub com repositório `todo-list-sdd` 
- Conta Vercel (gratuita em https://vercel.com)

### Passos para Deploy

1. **Push para GitHub**:
```bash
git push origin 002-task-management
```

2. **Conectar ao Vercel**:
   - Acesse https://vercel.com/new
   - Clique em "Import Git Repository"
   - Selecione `todo-list-sdd` 
   - Configure:
     - **Framework Preset**: Vite
     - **Build Command**: `npm run build`
     - **Output Directory**: `dist`
     - **Environment Variables**: Adicione conforme `.env.example`

3. **Deploy**:
   - Clique em "Deploy"
   - Vercel vai automaticamente:
     - Fazer build do projeto
     - Gerar HTTPS automático
     - Configurar CI/CD automático
     - Deploy em production

4. **Domínio Customizado** (Opcional):
   - Em Vercel Dashboard → Settings → Domains
   - Adicione seu domínio customizado

### Configuração de Ambiente no Vercel

Adicione as variáveis em `Settings → Environment Variables`:

```
VITE_APP_ENV=production
VITE_NOTIFICATION_ENABLED=true
VITE_STORAGE_PREFIX=todo-list
VITE_MAX_TASKS=100
VITE_MAX_REMINDERS=100
```

### Deploy Automático

Todo push para `main` ou `002-task-management` vai automaticamente:
1. Rodar testes (via GitHub Actions)
2. Build o projeto
3. Deploy em staging/production

---

## GitHub Pages Deployment (Alternativa Gratuita)

### Se preferir GitHub Pages em vez de Vercel

1. **Configurar repository settings**:
   - Settings → Pages
   - Branch: `main` ou `gh-pages`
   - Folder: `/` (raiz)

2. **Adicionar workflow GitHub Actions**:
Já está configurado em `.github/workflows/deploy.yml`

3. **Deploy manual**:
```bash
npm run build
# Depois fazer push
git push origin
```

---

## Desenvolvimento Local

### Iniciar servidor de desenvolvimento
```bash
npm run dev
```
- Acessa automaticamente http://localhost:3000

### Build local
```bash
npm run build
```
- Gera pasta `dist/` com arquivos prontos para produção

### Preview de produção
```bash
npm run preview
```
- Simula como ficará em produção

---

## Troubleshooting Vercel

| Erro | Solução |
|------|---------|
| Build falha | Verificar `npm run build` local primeiro |
| Variáveis não funcionam | Adicionar `VITE_` prefix em `.env` |
| CSS não carrega | Verificar `dist/` tem arquivos CSS |
| 404 em refresh | SPA issue - Vercel já configurado para redirecionar |

---

## Performance

### Tamanho de Bundle
- **JavaScript**: 46KB gzipped (143KB descompactado)
- **CSS**: 0.63KB gzipped (1.42KB descompactado)
- **HTML**: 0.37KB gzipped (0.61KB descompactado)
- **Total**: ~47KB gzipped ✨

### Core Web Vitals
- Alvo: Lighthouse score >90
- Vercel Analytics monitora automaticamente

---

## Rollback em Produção

Se algo der errado:
1. No Vercel Dashboard, clique no deployment anterior
2. Clique em "Promote to Production"
3. Tudo volta ao estado anterior em segundos

---

## Próximas Fases

**Phase 3-8**: Após completar implementação:
1. Rodar testes completos: `npm run test`
2. Verificar cobertura: `npm run test:coverage`
3. Fazer deploy para validar
4. Executar testes E2E em produção: `npm run test:e2e`

---

**Status**: ✅ Pronto para Deploy  
**Última atualização**: 2026-05-10
