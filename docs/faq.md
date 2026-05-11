# ❓ FAQ - Dúvidas Frequentes

## 🤔 Geral

### O que é TODO List?

TODO List é uma aplicação web moderna de gerenciamento de tarefas. Permite criar, listar, marcar como concluída e deletar tarefas com uma interface intuitiva em 100% português brasileiro.

### Preciso pagar algo?

Não! TODO List é completamente **grátis** e **open source**. Deploy também é grátis (GitHub Pages ou Vercel).

### Meus dados são sincronizados entre dispositivos?

Não na versão atual. Dados são armazenados localmente no navegador (localStorage). Versões futuras terão sincronização na nuvem.

### Posso usar offline?

Sim! Após carregar pela primeira vez, a aplicação funciona completamente offline.

---

## 🚀 Deployment

### Qual é a melhor forma de fazer deploy?

Ambas são boas:

- **GitHub Pages:** Simples, integrado com GitHub
- **Vercel:** Mais rápido (CDN global), analytics melhorado

Recomendação: Use **Vercel** se quer melhor performance.

### Quanto custa fazer deploy?

**Grátis** em ambos os casos! 

- GitHub Pages: Ilimitado
- Vercel Free: 100 GB bandwidth/mês (mais que suficiente)

### Como ativar notificações push?

1. Abra a aplicação
2. Navegador pedirá permissão
3. Clique em "Permitir"
4. Pronto! Receberá notificações

### O site não carrega após deploy

Verificar:

1. Verifique se branch está correta (Settings → Pages)
2. Aguarde 2-3 minutos
3. Limpe cache (Ctrl+Shift+Delete)
4. Abra DevTools (F12) e veja console
5. Abra issue no GitHub

---

## 💻 Desenvolvimento

### Como contribuir?

1. Fork o repositório
2. Crie branch: `git checkout -b feature/sua-feature`
3. Faça commit: `git commit -m "feat: sua feature"`
4. Push: `git push origin feature/sua-feature`
5. Abra Pull Request

### Como rodar testes?

```bash
npm run test        # Testes unitários
npm run test:e2e   # Testes de integração
```

### TypeScript é obrigatório?

Sim, mas é fácil! Começar pequeno e aprender enquanto codifica.

### Posso remover TypeScript?

Tecnicamente sim, mas não recomendado. TypeScript previne bugs!

### Como adicionar novos campos em Tarefa?

1. Edite `src/types/Task.ts` (interface)
2. Edite `src/models/Task.ts` (validação)
3. Edite `src/services/TaskService.ts` (persistência)
4. Edite componentes que exibem (TaskItem, TaskForm)

---

## 📱 Features

### Quando vem o sistema de Lembretes?

Fase 4 do roadmap. Data estimada: próximas sprints.

### Posso adicionar categorias de tarefas?

Sim! Será feature em versão futura. Contribuições bem-vindas!

### Suporta subtarefas?

Não na versão atual. Versão 2.0 terá suporte.

### Pode sincroniazr com Google Calendar?

Será feature em versão futura.

---

## 🐛 Problemas

### Tarefas desapareceram!

Provavelmente localStorage foi limpo. Causas possíveis:

- Limpou cache do navegador
- Modo privado/anônimo
- Limite de armazenamento excedido
- Reset de navegador

### A aplicação está lenta

Tente:

1. Limpar cache (Ctrl+Shift+Delete)
2. Fechar outras abas
3. Atualizar página (Ctrl+R)
4. Tentar outro navegador

### Interface está estranha/desalinhada

Provavelmente versão antiga em cache:

```bash
# Forçar recarga sem cache
Ctrl+Shift+R (Windows/Linux)
Cmd+Shift+R (macOS)
```

### As notificações não aparecem

1. Verifique se permitiu notificações
2. Verifique se navegador suporta
3. Abra Settings → Site → Notificações
4. Clique em "Permitir"

---

## 🔒 Segurança

### Meus dados são privados?

Sim! Dados ficam **apenas no seu navegador** (localStorage). Nunca enviados para servidor.

### Posso usar para informações sensíveis?

Não recomendado. localStorage não é criptografado.

Versão com autenticação virá em V2.

### É seguro fazer deploy público?

Sim! Código é open source no GitHub.

---

## 📊 Performance

### Por que o bundle é 50 KB?

Porque:
- React (42 KB)
- React DOM (9 KB)
- Demais dependências (pequenas)
- Assets (CSS, etc)

Totalmente normal! Otimizado com:
- Tree shaking
- Code splitting
- Minificação
- Gzip compression

### Como reduzir tamanho?

1. Remover bibliotecas não usadas
2. Usar dynamic imports
3. Lazy load componentes

Mas 50 KB é já muito pequeno!

---

## 🌍 Internacionalização

### Já tem em outro idioma?

Não. 100% português brasileiro.

Implementar outros idiomas é simples:

1. Copie `src/constants/messages.ts`
2. Traduza strings
3. Adicione seletor de idioma

Contribuições de tradução bem-vindas!

---

## 📚 Documentação

### Onde aprender mais sobre React?

- [React Docs](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Vite Guide](https://vitejs.dev/guide)

### Posso usar este projeto como template?

Sim! Clique em **Use this template** no GitHub.

---

## 🆘 Preciso de Ajuda

### Onde reportar bugs?

Abra issue no [GitHub Issues](https://github.com/seu-usuario/todo-list-sdd/issues)

Descreva:
- O que esperava
- O que aconteceu
- Steps para reproduzir
- Browser/SO

### Posso fazer sugestões de features?

Sim! Abra [Discussion](https://github.com/seu-usuario/todo-list-sdd/discussions) no GitHub.

### Como entro em contato?

- GitHub Issues: bugs e features
- GitHub Discussions: dúvidas e ideias
- Email: (se configurado no perfil)

---

## 📈 Roadmap

### Quando vem V2?

Planejado para próximas sprints com:

- ✅ Backend com sincronização
- ✅ Lembretes com notificações
- ✅ Categorias/Tags
- ✅ Busca avançada
- ✅ App mobile (PWA)
- ✅ Colaboração em tempo real

### Como acompanhar progresso?

- Veja [GitHub Projects](https://github.com/seu-usuario/todo-list-sdd/projects)
- Siga [Issues](https://github.com/seu-usuario/todo-list-sdd/issues)
- Watch repositório para updates

---

**Não encontrou sua dúvida? Abra uma issue! 📬**
