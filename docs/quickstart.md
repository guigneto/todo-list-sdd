# 🚀 Início Rápido

Comece a usar o TODO List em menos de 5 minutos!

## 📋 Pré-requisitos

- Node.js 18+ instalado
- Git instalado
- Um navegador moderno (Chrome, Firefox, Edge, Safari)

## ⚡ Instalação Rápida

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/todo-list-sdd.git
cd todo-list-sdd
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Inicie o servidor

```bash
npm run dev
```

### 4. Acesse a aplicação

Abra seu navegador e acesse:
```
http://localhost:3001
```

## 🎯 Primeiro Uso

### Criar uma Tarefa

1. Digite o **título** da tarefa no campo "O que você precisa fazer?"
2. Opcionalmente, adicione uma **descrição**
3. Clique em **"+ Nova Tarefa"**
4. Veja sua tarefa aparecer na lista!

### Marcar como Concluída

- Clique na **checkbox** ao lado da tarefa
- A tarefa ficará marcada como concluída (com strikethrough)

### Deletar uma Tarefa

1. Clique no ícone **🗑️** (lixeira) da tarefa
2. Confirme a ação clicando em **"Deletar"**
3. A tarefa será removida imediatamente

### Filtrar Tarefas

Use os botões de filtro:
- **Todas** - Mostra todas as tarefas
- **Pendentes** - Mostra apenas tarefas não concluídas
- **Concluídas** - Mostra apenas tarefas concluídas

## 💾 Persistência de Dados

Todos os seus dados são automaticamente salvos no **localStorage** do seu navegador. Isso significa:

✅ Seus dados persistem entre sessões  
✅ Funciona totalmente offline após o carregamento  
❌ Limpar cookies/cache do navegador apaga os dados  
❌ Dados não sincronizam entre dispositivos  

## 🐛 Troubleshooting

### "Port 3000 já está em uso"

Se você receber este erro, a porta 3000 já está ocupada. O Vite tentará automaticamente a porta 3001.

Para usar uma porta específica:

```bash
npm run dev -- --port 3002
```

### "Tarefas não aparecem"

1. Abra o Developer Tools (F12)
2. Vá para a aba **Application** → **Local Storage**
3. Procure por `todo-list-tasks`
4. Se estiver vazio, suas tarefas foram perdidas (limpe cache?)

### Interface está lenta

Limpe o cache do navegador e recarregue (Ctrl+Shift+Delete).

## 📚 Próximos Passos

- Leia a [📖 Documentação Completa](documentation/architecture.md)
- Configure [🚀 Deployment no GitHub Pages](deployment/github-pages.md)
- Explore o [🔧 Setup de Desenvolvimento](development/setup.md)
- Contribua consultando o [🔧 Setup de Desenvolvimento](development/setup.md)

## ❓ Dúvidas?

Consulte a seção [FAQ](faq.md) ou abra uma issue no [GitHub](https://github.com/seu-usuario/todo-list-sdd/issues).

---

**Bem-vindo ao TODO List! Organize suas tarefas agora! 🎉**
