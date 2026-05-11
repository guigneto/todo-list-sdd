# 🔍 Troubleshooting

Soluções para problemas comuns.

## 🚀 Deployment

### "Site não carrega"

**Problema:** Página fica em branco ou erro 404

**Soluções:**

1. **Verifique branch** (GitHub Pages)
   - Settings → Pages
   - Certifique-se que `main` ou `gh-pages` está selecionada

2. **Aguarde build**
   - Deploy pode levar 2-3 minutos
   - Verifique Actions para status

3. **Limpe cache**
   ```bash
   Ctrl+Shift+Delete  # Windows/Linux
   Cmd+Shift+Delete   # macOS
   ```

4. **Verifique logs**
   - GitHub Actions → Deployments
   - Procure por erro no build

### "Build falha no GitHub Actions"

**Problema:** Workflow falha durante build

**Soluções:**

1. **Veja logs completos**
   - Actions → workflow que falhou
   - Expanda "Run npm run build"

2. **Reproduza localmente**
   ```bash
   npm run build
   ```

3. **Compare erros**
   - Se local passa, pode ser versão do Node
   - Atualize em `node-version: 18` no workflow

4. **Common fixes**
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   npm run build
   ```

### "Erro 404 ao clicar em links"

**Problema:** Página 404 ao navegar para URLs específicas

**Causa:** SPA não redireciona rotas corretamente

**Solução (GitHub Pages):**
- GitHub Pages detecta automaticamente SPAs
- Se não funcionar, crie `docs/404.html` com redirect

## 💻 Desenvolvimento

### "Port 3000 em uso"

**Problema:** "Port 3000 is already in use"

**Soluções:**

```bash
# Opção 1: Usar porta diferente
npm run dev -- --port 3002

# Opção 2: Encontrar e matar processo
lsof -i :3000  # macOS/Linux
netstat -ano | findstr :3000  # Windows
kill -9 <PID>  # macOS/Linux
taskkill /PID <PID> /F  # Windows
```

### "Módulo não encontrado"

**Problema:** "Cannot find module..."

**Soluções:**

1. **Reinstale dependências**
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

2. **Verifique import correto**
   ```typescript
   // ❌ Errado
   import { Task } from '../models/task'

   // ✅ Certo
   import { Task } from '../models/Task'
   ```

3. **Verifique alias de paths**
   ```typescript
   // Se usou @/ no import, certifique-se que está em vite.config.ts
   ```

### "TypeScript errors"

**Problema:** "Type ... is not assignable to..."

**Soluções:**

1. **Verifique tipos**
   ```bash
   npm run build  # Compila e mostra erros
   ```

2. **Adicione tipos faltantes**
   ```typescript
   const task: Task = ...  // Adicione tipo explícito
   ```

3. **Instale types de dependências**
   ```bash
   npm install --save-dev @types/seu-pacote
   ```

### "ESLint errors"

**Problema:** "Parsing error" ou regras violadas

**Soluções:**

1. **Execute formatter**
   ```bash
   npm run format  # Prettier fixa maioria de erros
   ```

2. **Veja erros específicos**
   ```bash
   npm run lint  # Lista todos os erros
   ```

3. **Corrija manualmente** se necessário

### "Testes falhando"

**Problema:** `npm run test` falha

**Soluções:**

```bash
# Veja erros detalhados
npm run test -- --reporter=verbose

# Re-rode com debug
npm run test -- --reporter=verbose --inspect-brk

# Limpe cache de testes
npm run test -- --clearCache
```

## 🌐 Navegador

### "Tarefas desapareceram"

**Problema:** localStorage foi limpo

**Causas:**
- Limpou cache (Ctrl+Shift+Delete)
- Modo privado/incógnito
- Limite de storage excedido
- Reset de navegador

**Solução:**
- Dados em localStorage não podem ser recuperados
- Faça backup exportando dados (feature futura)

### "Aplicação lenta"

**Soluções:**

1. **Limpe cache**
   ```
   Ctrl+Shift+Delete → Clear everything
   ```

2. **Feche abas extras**

3. **Atualize página**
   ```
   Ctrl+R
   ```

4. **Tente outro navegador**

5. **Limpe localStorage**
   ```javascript
   // DevTools → Console
   localStorage.clear()
   location.reload()
   ```

### "Notificações não aparecem"

**Problema:** Browser notifications não funcionam

**Soluções:**

1. **Conceda permissão**
   - Click no ícone 🔔 na barra do navegador
   - Click em "Permitir"

2. **Verifique se habilitadas**
   - Settings → Site → Notifications
   - Certifique-se que "Permitido"

3. **Navegador suporta?**
   - Chrome, Firefox, Edge, Safari: ✓ Sim
   - IE: ✗ Não suporta

4. **DevTools Debug**
   ```javascript
   // Teste notificação manualmente
   Notification.requestPermission().then(permission => {
     if (permission === 'granted') {
       new Notification('Teste', {body: 'Funciona!'})
     }
   })
   ```

## 📱 Mobile

### "Layout quebrado no celular"

**Soluções:**

1. **Verifique viewport meta tag**
   - Em `index.html`, certifique-se de ter:
   ```html
   <meta name="viewport" content="width=device-width, initial-scale=1">
   ```

2. **Zoom do navegador**
   - Celular: Aperte 2x com dedos para resetar zoom
   - Desktop: Ctrl+0 para resetar zoom

3. **Limpe cache mobile**
   - Safari: Settings → Clear History/Cache
   - Chrome: Menu → Settings → Storage → Clear

## 🔧 Git & GitHub

### "Merge conflicts"

**Problema:** Conflitos ao fazer merge

**Solução:**

```bash
# Edite arquivo com conflitos
# Procure por:
# <<<<<<< HEAD
# seu código
# =======
# código do branch
# >>>>>>> branch-name

# Escolha qual código manter, remova marcadores

git add arquivo-corrigido
git commit -m "Resolve merge conflict"
```

### "Push rejeitado"

**Problema:** "Permission denied" ao fazer push

**Soluções:**

1. **Configure SSH**
   ```bash
   ssh-keygen -t ed25519 -C "seu-email@example.com"
   # Adicione a chave em GitHub Settings → SSH Keys
   ```

2. **Configure token (HTTPS)**
   ```bash
   git config credential.helper store
   git push  # Pedirá token, salva para próxima vez
   ```

3. **Verifique permissões**
   - Certifique-se que tem acesso ao repositório

## 🆘 Última Recurso

Se nada funciona:

1. **Crie issue no GitHub**
   - Descreva problema
   - Inclua erro exato
   - Mencione SO e browser
   - Anexe screenshot

2. **Stack Overflow**
   - Procure por erro específico
   - Abra pergunta se não encontrar

3. **Comunidade React**
   - [React Discord](https://discord.gg/react)
   - [TypeScript Discord](https://discord.gg/typescript)

---

**Não encontrou sua solução? Abra issue! 🙋**
