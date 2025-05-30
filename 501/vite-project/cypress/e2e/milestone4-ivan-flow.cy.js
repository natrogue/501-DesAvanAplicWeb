// cypress/e2e/milestone4-ivan-flow.cy.js

describe('Suite de Pruebas para la Aplicación de Gestión', () => {

  beforeEach(() => {
    cy.visit('/');
    cy.window().then((win) => {
      win.localStorage.clear();
    });
    cy.visit('/');
  });

  it('1. Debería cargar la página principal y mostrar el título "Vite + React"', () => {
    cy.url().should('eq', 'http://localhost:5173/');
    cy.contains('h1', 'Vite + React').should('be.visible');
    cy.contains('p', 'Click on the Vite and React logos to learn more').should('be.visible');
    cy.contains('button', 'count is 0').should('be.visible');
  });

  it('2. Debería incrementar el contador al hacer clic en el botón', () => {
    cy.contains('button', 'count is 0').click();
    cy.contains('button', 'count is 1').should('be.visible');
  });

  it('3. Debería navegar a la página de "Navegación" desde la página principal', () => {
    cy.contains('button', 'Natalia Rodríguez, Diego Ortega, Diego Valencia, Enrique Martínez').click();
    cy.contains('h1', 'Navegación').should('be.visible');
    cy.contains('button', 'Volver al Inicio').should('be.visible');
  });

  it('4. Debería navegar al "Login" desde la página de Navegación', () => {
    cy.contains('button', 'Natalia Rodríguez, Diego Ortega, Diego Valencia, Enrique Martínez').click();
    cy.contains('h1', 'Navegación').should('be.visible');


    cy.contains('button', 'Ir a Login').click();
    cy.contains('h1', 'Login').should('be.visible');
    cy.get('input[placeholder="Username (include \'manager\' or \'admin\' for those roles)"]').should('be.visible');
    cy.get('input[placeholder="Password (always use \'password\')"]').should('be.visible');
    cy.contains('button', 'Submit').should('be.visible');
  });

  it('5. Debería navegar al "Travel Request Form" desde la página de Navegación', () => {
    cy.contains('button', 'Natalia Rodríguez, Diego Ortega, Diego Valencia, Enrique Martínez').click();
    cy.contains('h1', 'Navegación').should('be.visible');

    cy.contains('button', 'Ir a Travel Request Form').click();
    cy.contains('h1', 'Travel Request Form').should('be.visible');
    cy.get('input[placeholder="Destination"]').should('be.visible');
    cy.get('textarea[placeholder="Purpose"]').should('be.visible');
    cy.contains('button', 'Submit').should('be.visible');
  });

  it('7. Debería navegar al "Dashboard" desde la página de Navegación', () => {
    cy.contains('button', 'Natalia Rodríguez, Diego Ortega, Diego Valencia, Enrique Martínez').click();
    cy.contains('h1', 'Navegación').should('be.visible');

    cy.contains('button', 'Ir a Dashboard').click();
    cy.contains('h1', 'Dashboard').should('be.visible');
    cy.contains('label', 'Switch Role:').should('be.visible');
  });

  it('8. Debería volver al "Inicio" desde la página de Navegación', () => {
    cy.contains('button', 'Natalia Rodríguez, Diego Ortega, Diego Valencia, Enrique Martínez').click();
    cy.contains('h1', 'Navegación').should('be.visible');

    cy.contains('button', 'Volver al Inicio').click();
    cy.contains('h1', 'Vite + React').should('be.visible');
  });

  it('9. Debería permitir el inicio de sesión como "employee" y redirigir al Dashboard (vista de empleado)', () => {
    cy.contains('button', 'Natalia Rodríguez, Diego Ortega, Diego Valencia, Enrique Martínez').click();
    cy.contains('button', 'Ir a Login').click();

    cy.get('input[placeholder="Username (include \'manager\' or \'admin\' for those roles)"]').type('testemployee');
    cy.get('input[placeholder="Password (always use \'password\')"]').type('password');
    cy.contains('button', 'Submit').click();

    cy.contains('h1', 'Dashboard').should('be.visible');
    cy.contains('h2', 'Employee View').should('be.visible');
    cy.contains('p', 'As an employee, you can submit travel requests and expenses.').should('be.visible');
  });

  it('10. Debería permitir el inicio de sesión como "manager" y redirigir al Dashboard (vista de gerente)', () => {
    cy.contains('button', 'Natalia Rodríguez, Diego Ortega, Diego Valencia, Enrique Martínez').click();
    cy.contains('button', 'Ir a Login').click();

    cy.get('input[placeholder="Username (include \'manager\' or \'admin\' for those roles)"]').type('testmanager');
    cy.get('input[placeholder="Password (always use \'password\')"]').type('password');
    cy.contains('button', 'Submit').click();

    cy.contains('h1', 'Dashboard').should('be.visible');
    cy.contains('h2', 'Manager View').should('be.visible');
    cy.contains('p', 'As a manager, you can approve travel requests and expenses.').should('be.visible');
  });

  it('11. Debería mostrar un mensaje de error con credenciales incorrectas', () => {
    cy.contains('button', 'Natalia Rodríguez, Diego Ortega, Diego Valencia, Enrique Martínez').click();
    cy.contains('button', 'Ir a Login').click();

    cy.get('input[placeholder="Username (include \'manager\' or \'admin\' for those roles)"]').type('anyuser');
    cy.get('input[placeholder="Password (always use \'password\')"]').type('wrongpassword'); 
    cy.contains('button', 'Submit').click();

    cy.contains('p', 'Invalid username or password').should('be.visible');
    cy.contains('h1', 'Dashboard').should('not.exist');
  });

  context('Como Employee en el Dashboard', () => {
    beforeEach(() => {
      cy.visit('/');
      cy.window().then((win) => {
        win.localStorage.clear();
        win.localStorage.setItem('user', JSON.stringify({ role: 'employee', username: 'testemployee' }));
      });
      cy.visit('/');
      cy.contains('button', 'Natalia Rodríguez, Diego Ortega, Diego Valencia, Enrique Martínez').click();
      cy.contains('button', 'Ir a Dashboard').click(); 
      cy.contains('h2', 'Employee View').should('be.visible');
    });
  });

  context('Como Manager en el Dashboard', () => {
    beforeEach(() => {
      cy.visit('/');
      cy.window().then((win) => {
        win.localStorage.clear();
        win.localStorage.setItem('user', JSON.stringify({ role: 'manager', username: 'testmanager' }));
        const mockTravelRequest = {
          id: 'tr-123', destination: 'Berlin', startDate: '2025-08-01', endDate: '2025-08-05',
          purpose: 'Conference', submittedBy: 'employee1', submittedDate: new Date().toISOString(), status: 'pending'
        };
        const mockExpense = {
          id: 'exp-456', amount: '200', category: 'Accommodation', description: 'Hotel stay',
          submittedBy: 'employee2', submittedDate: new Date().toISOString(), status: 'pending'
        };
        win.localStorage.setItem('travelRequests', JSON.stringify([mockTravelRequest]));
        win.localStorage.setItem('expenses', JSON.stringify([mockExpense]));
      });
      cy.visit('/'); // Recargar para que el contexto se actualice
      cy.contains('button', 'Natalia Rodríguez, Diego Ortega, Diego Valencia, Enrique Martínez').click();
      cy.contains('button', 'Ir a Dashboard').click();
      cy.contains('h2', 'Manager View').should('be.visible');
      cy.contains('h3', 'Pending Approvals').should('be.visible');
    });
  });

  context('Como Admin en el Dashboard', () => {
    beforeEach(() => {
      cy.visit('/');
      cy.window().then((win) => {
        win.localStorage.clear();
        win.localStorage.setItem('user', JSON.stringify({ role: 'admin', username: 'testadmin' }));
      });
      cy.visit('/');
      cy.contains('button', 'Natalia Rodríguez, Diego Ortega, Diego Valencia, Enrique Martínez').click();
      cy.contains('button', 'Ir a Dashboard').click();
      cy.contains('h2', 'Admin View').should('be.visible');
    });

    it('16. Debería mostrar la sección de "User Management"', () => {
      cy.contains('h3', 'User Management').should('be.visible');
      cy.contains('th', 'Username').should('be.visible');
      cy.contains('td', 'john.doe').should('be.visible');
      cy.contains('td', 'Manager').should('be.visible');
    });

    it('17. Debería mostrar la sección de "System Settings"', () => {
      cy.contains('h3', 'System Settings').should('be.visible');
      cy.contains('label', 'Approval Workflow').should('be.visible');
      cy.contains('label', 'Email Notifications').should('be.visible');
      cy.contains('label', 'WebSocket Notifications').should('be.visible');
      cy.contains('button', 'Save Settings').should('be.visible');
    });
  });
});