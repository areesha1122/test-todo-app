export const todoCardStyles = {
    container: {
      minHeight: '86vh',
      position: 'relative',
    },
    taskList: {
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
      overflowY: 'auto',
      height: '68vh',
    },
    taskCard: {
      color: '#9395D3',
      border: '1px solid #9395D3',
      flexShrink: 0,
      borderRadius: '16px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '18px',
      flexWrap: { xs: 'wrap', md: 'nowrap' },
    },
    title: {
      margin: 0,
    },
    actions: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
    },
    addButton: {
      background: '#9395D3',
      '&:hover': { background: '#9395D3' },
      position: 'absolute',
      right: 0,
      bottom: 0,
      borderRadius: '50%',
      width: '70px',
      height: '70px',
      color: "#fff",
      fontSize: '32px',
    },
    noTasksMessage: {
      color: '#fff',
      textAlign: 'center',
    },
  }