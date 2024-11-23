describe('My First Test', () => {
    beforeEach(()=>{
        cy.visit('login')
    })
    it('primer testing - inicio sesion estudiante',()=>{
        cy.visit('login')
        cy.get('input[name="usuario"]').should('be.visible')
        cy.get('input[name="usuario"]').type('dani.@gmail.com')
        cy.get('input[name="password"]').should('be.visible')
        cy.get('input[name="password"]').type('1234')
        cy.get('ion-select').click();
        cy.get('ion-select-option[value="estudiante"]', { timeout: 10000 })
        cy.get('ion-select-option[value="estudiante"]')
        .click({ force: true });  
        cy.get('ion-button[name="log"]').click();
        cy.wait(4000);
    })
    it('segundo testing - inicio sesion profesor',()=>{
        cy.visit('login')
        cy.get('input[name="usuario"]').should('be.visible')
        cy.get('input[name="usuario"]').type('profesor@duoc.cl')
        cy.get('input[name="password"]').should('be.visible')
        cy.get('input[name="password"]').type('1234')
        cy.get('ion-select').click();
        cy.get('ion-select-option[value="profesor"]', { timeout: 10000 })
        cy.get('ion-select-option[value="profesor"]')
        .click({ force: true });  
        cy.get('ion-button[name="log"]').click();
        cy.wait(4000);
    })
    it('tercer testing - registro estudiante',()=>{
        cy.visit('agregar')
        cy.get('input[name="name"]').should('be.visible')
        cy.get('input[name="name"]').type('aa')
        cy.get('input[name="apellido"]').should('be.visible')
        cy.get('input[name="apellido"]').type('aaaa')
        cy.get('input[name="correo"]').should('be.visible')
        cy.get('input[name="correo"]').type('correo.lalala@gmail.com')
        cy.get('input[name="clave"]').should('be.visible')
        cy.get('input[name="clave"]').type('1234') 
        cy.get('ion-select').click();
        cy.get('ion-select-option[value="estudiante"]', { timeout: 10000 })
        cy.get('ion-select-option[value="estudiante"]')
        .click({ force: true });  
        cy.get('ion-button[name="log"]').click();
        cy.wait(4000);
    })
    it('cuarto testing - registro profesor',()=>{
        cy.visit('agregar')
        cy.get('input[name="name"]').should('be.visible')
        cy.get('input[name="name"]').type('aaaa')
        cy.get('input[name="apellido"]').should('be.visible')
        cy.get('input[name="apellido"]').type('aaaapro')
        cy.get('input[name="correo"]').should('be.visible')
        cy.get('input[name="correo"]').type('correo.profesor@gmail.com')
        cy.get('input[name="clave"]').should('be.visible')
        cy.get('input[name="clave"]').type('1234') 
        cy.get('ion-select').click();
        cy.get('ion-select-option[value="estudiante"]', { timeout: 10000 })
        cy.get('ion-select-option[value="estudiante"]')
        .click({ force: true }); 
        cy.get('ion-button[name="log"]').click();
        cy.wait(4000);
    })

    it('quinto testing - home profesor',()=>{
    cy.visit('home')
    cy.get('ion-item[name="listar"]').should('be.visible');
    cy.get('ion-item').contains('Mis Clases').should('be.visible');
    cy.get('ion-item').contains('Cerrar Sesión').should('be.visible');
    cy.wait(4000);
  });

  it('Verifica la navegación a la página de Asistencias - profesor', () => {
    cy.visit('home')
    cy.get('ion-item[name="listar"]').click();
    cy.url().should('include', '/listar'); 
    cy.wait(4000);
});

  it('Verifica la navegación a Mis Clases - profesor', () => {
    cy.visit('home')
    cy.get('ion-item').contains('Mis Clases').click();
    cy.url().should('include', '/misclases-p'); 
    cy.wait(4000);
    });

  it('Verifica la navegación al Login al hacer clic en "Cerrar Sesión" - profesor', () => {
    cy.visit('home')
    cy.get('ion-item').contains('Cerrar Sesión').click();
    cy.url().should('include', '/login'); 
    cy.wait(4000);
});

  })