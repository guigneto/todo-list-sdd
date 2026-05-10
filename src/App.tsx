import './App.css';

/**
 * Componente raiz da aplicação
 * TODO: Integrar componentes de gerenciamento de tarefas
 */
function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>Gerenciador de Tarefas</h1>
        <p>Organize suas tarefas e configure lembretes</p>
      </header>
      
      <main className="app-main">
        <p>Aplicação em desenvolvimento...</p>
        {/* TaskListPage vai ser integrada aqui */}
      </main>

      <footer className="app-footer">
        <p>© 2026 TODO List - Especificação de Design de Software</p>
      </footer>
    </div>
  );
}

export default App;
