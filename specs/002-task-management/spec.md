# Especificação de Funcionalidade: Gerenciamento de Tarefas

**Branch de Funcionalidade**: `002-task-management`  
**Criado em**: 2026-05-10  
**Status**: Rascunho  
**Entrada**: Descrição do usuário: "O TODO LIST deve permitir cadastrar tarefas, remover tarefas e ter lembretes."

## Cenários de Usuário & Testes *(obrigatório)*

### História do Usuário 1 - Remover Tarefas (Prioridade: P1)

Um usuário precisa remover tarefas da lista quando elas foram concluídas, não são mais relevantes ou foram criadas por erro. Esta é funcionalidade crítica para manter a lista limpa e organizada.

**Por que esta prioridade**: Remove tarefas é operação essencial após criar tarefas. Sem poder deletar, a lista fica desorganizada. P1 porque é necessário para experiência do usuário aceitável.

**Teste Independente**: Pode ser testado por: usuário tem lista com tarefas → clica em deletar em uma tarefa → tarefa é removida da lista → lista é persistida. Entrega capacidade de limpeza da lista.

**Cenários de Aceitação**:

1. **Dado** que usuário está visualizando a lista de tarefas, **Quando** clica no botão "Deletar" de uma tarefa, **Então** a tarefa é removida imediatamente da lista
2. **Dado** que uma tarefa foi deletada, **Quando** a página é atualizada, **Então** a tarefa permanece deletada (mudança persistida)
3. **Dado** que usuário deletou uma tarefa por erro, **Quando** busca a tarefa, **Então** a tarefa não existe mais no sistema
4. **Dado** que há múltiplas tarefas na lista, **Quando** deleta uma, **Então** outras tarefas não são afetadas
5. **Dado** que tarefa será deletada, **Quando** clica em deletar, **Então** uma confirmação é pedida antes de remover

---

### História do Usuário 2 - Definir Lembretes em Tarefas (Prioridade: P2)

Um usuário precisa receber notificações/lembretes para tarefas importantes em horários específicos. Lembretes ajudam a manter o usuário alinhado com compromissos e deadlines.

**Por que esta prioridade**: Enquanto lembretes aprimoram significativamente a funcionalidade, a tarefa pode ser usada sem eles. P2 porque é melhoria importante mas não bloqueia o uso básico.

**Teste Independente**: Pode ser testado por: usuário define data/hora de lembrete em uma tarefa → aguarda tempo do lembrete → recebe notificação. Entrega capacidade de rastreamento com lembretes.

**Cenários de Aceitação**:

1. **Dado** que usuário está visualizando detalhes de uma tarefa, **Quando** define uma data e hora de lembrete, **Então** o lembrete é armazenado com a tarefa
2. **Dado** que um lembrete foi definido, **Quando** chega a data/hora especificada, **Então** uma notificação é exibida ao usuário
3. **Dado** que tarefa tem lembrete ativo, **Quando** usuário edita a tarefa, **Então** consegue modificar ou remover o lembrete
4. **Dado** que usuário define múltiplos lembretes, **Quando** tempo chega, **Então** cada lembrete é disposto na hora correta
5. **Dado** que lembrete está próximo, **Quando** visualiza lista de tarefas, **Então** vê indicador visual que tarefa tem lembrete

---

### História do Usuário 3 - Gerenciar Ciclo Completo de Tarefas (Prioridade: P1)

Um usuário precisa de um fluxo completo: criar tarefa → definir lembrete → quando lembrete chega, completar tarefa → deletar tarefa concluída. Este é o fluxo de uso diário.

**Por que esta prioridade**: Integra P1 (remover) e P2 (lembretes) em um fluxo real. Este é o cenário de uso mais comum. P1 porque valida que o sistema funciona integradamente.

**Teste Independente**: Pode ser testado por: criar tarefa → definir lembrete → receber notificação → marcar completo → deletar. Entrega fluxo de trabalho completo e viável.

**Cenários de Aceitação**:

1. **Dado** que usuário criou uma tarefa e definiu lembrete, **Quando** lembrete é disparado, **Então** notificação aparece e pode ser clicada
2. **Dado** que notificação de lembrete apareceu, **Quando** usuário clica nela, **Então** é levado para detalhes da tarefa
3. **Dado** que visualiza detalhes da tarefa, **Quando** marca como concluída, **Então** tarefa é marcada com status completo
4. **Dado** que tarefa está concluída, **Quando** clica em deletar, **Então** tarefa é removida permanentemente

---

### Casos Extremos

- O que acontece quando usuário tenta deletar tarefa que não existe mais?
- Como sistema comporta lembretes para tarefas deletadas (se lembrete foi definido antes)?
- O que acontece se múltiplos lembretes chegam ao mesmo tempo?
- Como sistema trata lembretes para datas no passado?
- O que acontece se usuário desligar aplicação antes do lembrete chegar?

## Requisitos *(obrigatório)*

### Requisitos Funcionais

- **RF-001**: Sistema DEVE permitir usuários autenticados deletarem tarefas existentes via botão de ação
- **RF-002**: Sistema DEVE remover tarefa permanentemente do armazenamento quando delete é confirmado
- **RF-003**: Sistema DEVE solicitar confirmação do usuário antes de deletar uma tarefa (prevenção de erros)
- **RF-004**: Sistema DEVE atualizar lista de tarefas imediatamente após deleção (sem recarregar página)
- **RF-005**: Sistema DEVE permitir definir uma data e hora de lembrete (data futura) em cada tarefa
- **RF-006**: Sistema DEVE persistir configurações de lembrete com a tarefa
- **RF-007**: Sistema DEVE disparar notificação quando hora do lembrete chega
- **RF-008**: Sistema DEVE incluir informações de tarefa na notificação de lembrete
- **RF-009**: Sistema DEVE permitir editar ou remover lembrete existente
- **RF-010**: Sistema DEVE exibir indicador visual em tarefas que têm lembretes ativos
- **RF-011**: Sistema DEVE validar que data/hora do lembrete é futura (não passada)
- **RF-012**: Sistema DEVE manter lembretes mesmo que aplicação seja fechada (persistência)
- **RF-013**: Sistema DEVE disparar lembrete quando aplicação é reaberta se hora passou
- **RF-014**: Sistema DEVE permitir marcar tarefa como concluída
- **RF-015**: Sistema DEVE persistir status de conclusão de tarefa

### Entidades-Chave

- **Tarefa**: Representa um item de TODO
  - `id` (identificador único, auto-gerado)
  - `titulo` (obrigatório, string, máx 255 caracteres)
  - `descricao` (opcional, string, máx 2000 caracteres)
  - `criada_em` (timestamp, auto-gerado)
  - `concluida_em` (timestamp, nulo até conclusão)
  - `status` (enum: pendente, concluída; padrão: pendente)
  - `lembrete` (objeto contendo data/hora e status - opcional)

- **Lembrete**: Configuração de notificação para uma tarefa
  - `id` (identificador único, auto-gerado)
  - `tarefa_id` (referência para tarefa)
  - `data_hora` (datetime, deve ser futuro)
  - `foi_disparado` (boolean, padrão: false)
  - `criado_em` (timestamp, auto-gerado)

## Critérios de Sucesso *(obrigatório)*

### Resultados Mensuráveis

- **CS-001**: Usuário consegue deletar uma tarefa em menos de 5 segundos (clique + confirmação)
- **CS-002**: Sistema deleta 100% das tarefas solicitadas sem perda de dados adjacentes
- **CS-003**: Tarefa deletada permanece deletada após atualização de página ou reinício da aplicação
- **CS-004**: Usuário consegue definir lembrete em menos de 30 segundos
- **CS-005**: Notificações de lembrete são disparadas dentro de 2 segundos da hora agendada
- **CS-006**: 99% dos lembretes são disparados com precisão (sem falhas)
- **CS-007**: Lembretes persistem mesmo após fechamento e reabertura da aplicação
- **CS-008**: Interface mostra feedback claro quando operação de deleção é confirmada
- **CS-009**: Usuário consegue editar/remover lembrete em menos de 20 segundos
- **CS-010**: Fluxo completo (criar → lembrete → completar → deletar) leva menos de 2 minutos
- **CS-011**: Sistema suporta até 100 lembretes simultâneos sem degradação

## Pressupostos

- Usuários estão autenticados e têm permissão para deletar suas próprias tarefas
- Lembretes funcionam enquanto aplicação está em execução (notificações browser/sistema)
- Deleção é operação permanente (não há "lixeira" ou recuperação)
- Tarefas deletadas não podem ser recuperadas
- Confirmação de deleção é obrigatória para prevenção de acidentes
- Sistema de lembrete usa horário local do dispositivo do usuário
- Lembretes podem ser notificações de browser, toast ou modal (a definir em implementação)
- Dados de tarefas e lembretes são específicos por usuário (não compartilhados)
- Cada usuário vê apenas suas próprias tarefas e lembretes
- Conclusão de tarefa é operação separada de deleção (tarefa pode ser concluída mas não deletada)
