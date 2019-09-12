describe("Login Test", function() {
	it("Visits my site and login", function() {
        
        // visit site
        cy.visit("http://localhost:3000/");
        
        // type email 
		cy.get("#email")
			.type("mccaugheyciaran@gmail.com")
			.should("have.value", "mccaugheyciaran@gmail.com");

		// click login
		cy.get("#login-button").click();
	});
});
