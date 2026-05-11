# 🚀 Deployment no Vercel

Guia para fazer deploy da aplicação no Vercel (alternativa ao GitHub Pages).

## 📋 Pré-requisitos

- Conta no [Vercel](https://vercel.com) (grátis)
- Repositório GitHub público
- Ter feito push do código para GitHub

## 🌐 Deploy Automático

### 1. Acesse o Vercel

1. Vá para [vercel.com](https://vercel.com)
2. Clique em **Sign Up** ou **Login** (use GitHub)
3. Autorize Vercel acessar seus repositórios

### 2. Importe o Projeto

1. Clique em **New Project**
2. Clique em **Import Git Repository**
3. Procure e selecione `todo-list-sdd`

### 3. Configure o Deploy

A configuração já está pronta em `vercel.json`:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite"
}
```

Vercel detectará automaticamente estas configurações.

### 4. Deploy

1. Clique em **Deploy**
2. Aguarde o build (geralmente 2-3 minutos)
3. Veja sua aplicação ao vivo!

## 🔗 URL Automática

Seu site estará disponível em:

```
https://todo-list-sdd.vercel.app
```

(O nome pode variar, Vercel gera um único)

## 📊 Painel do Vercel

No painel você pode:

- ✅ Ver status dos deploys
- ✅ Configurar domínio customizado
- ✅ Definir variáveis de ambiente
- ✅ Ver logs de build e runtime
- ✅ Gerenciar analytics

## 🔄 Redeploy Automático

Cada push para `main` dispara deploy automático!

```bash
git commit -m "Update feature"
git push origin main

# Vercel já começa deploy automaticamente
```

## 🔐 Variáveis de Ambiente

Para adicionar variáveis:

1. Painel Vercel → **Settings** → **Environment Variables**
2. Adicione variáveis (ex: `VITE_APP_ENV=production`)
3. Clique em **Save**
4. Trigger novo deploy

Arquivo `.env.local` local:

```env
VITE_APP_ENV=development
VITE_NOTIFICATION_ENABLED=true
```

## 🎯 Domínio Customizado

### Conectar domínio próprio

1. **Settings** → **Domains**
2. Clique em **Add**
3. Digite seu domínio (ex: `todo.seunome.com`)
4. Configure DNS apontando para Vercel
5. Aguarde verificação (até 48h)

### Configuração DNS

Adicione record DNS:

```
CNAME record: seu-dominio.com → cname.vercel-dns.com
```

## 📈 Performance

Vercel oferece:

- ✅ CDN global com borda em ~250 cidades
- ✅ Cache automático de assets
- ✅ Compressão Brotli/gzip
- ✅ HTTP/2 push
- ✅ Image optimization

## 🤖 CI/CD Integrado

Vercel com GitHub oferece:

- ✅ Preview para cada Pull Request
- ✅ Checks automáticos
- ✅ Rollback com um clique
- ✅ Deploy history

## 💾 Backups e Rollback

### Ver histórico de deploys

1. Painel Vercel → **Deployments**
2. Veja todos os deploys anteriores
3. Clique em um para promover/ver logs

### Rollback rápido

```bash
# Via CLI Vercel
vercel rollback

# Ou pela web: selecione deploy anterior e click "Promote to Production"
```

## 🌍 Analytics

Vercel fornece analytics:

1. **Analytics** no painel
2. Veja requisições, tempo de resposta, etc.
3. Dados em tempo real

## 📲 App Integração

Instale Vercel no GitHub:

1. GitHub → Settings → Applications
2. Autorize "Vercel"
3. Selecione repositórios
4. Pronto!

Agora cada push dispara build automático.

## ⚡ Dicas de Performance

### Otimizar build

```bash
# Verificar tamanho
npm run build -- --report

# Resultado esperado
# dist/assets/index-*.js     158 kB │ gzip: 50 kB
```

### Usar environment variables

```bash
# .env
VITE_MAX_TASKS=1000

# src/constants/config.ts
const MAX_TASKS = parseInt(import.meta.env.VITE_MAX_TASKS || '100');
```

## ❌ Troubleshooting

### Build falha

1. Veja logs em Vercel → **Deployments** → clique no deployment
2. Execute `npm run build` localmente
3. Corrija erros
4. Commit e push novamente

### Site carrega mas página fica em branco

1. Abra DevTools (F12)
2. Console → procure por erros
3. Verify `dist/index.html` foi gerado

### "Build succeeded but page not found"

1. Verifique `vite.config.ts` tem `outDir: 'dist'`
2. Verifique `vercel.json` tem `"outputDirectory": "dist"`
3. Trigger novo deploy

## 📚 Recursos

- [Vercel Docs](https://vercel.com/docs)
- [Vercel CLI](https://vercel.com/docs/cli)
- [Deployment Guide](https://vercel.com/docs/frameworks/vite)

## 🔗 Comparação: GitHub Pages vs Vercel

| Feature | GitHub Pages | Vercel |
|---------|------|--------|
| Preço | Grátis | Grátis (pro $20/mês) |
| Setup | Simples | Muito simples |
| Domínio | Subdomínio | Subdomínio grátis |
| CDN | Limitado | Global (rápido) |
| Redeploy | Manual ou Actions | Automático |
| Analytics | Não | Sim |
| Logs | Limitados | Detalhados |
| Preview PRs | Não | Sim |

---

**Deploy no Vercel em minutos! 🚀**
