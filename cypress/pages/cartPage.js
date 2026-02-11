class CartPage {

    continueShoppingBtn = "#continue-shopping";
    checkoutBtn = "#checkout";
    allProducts = "[data-test='inventory-item']";
    removeBtn = "[data-test='remove-sauce-labs-bolt-t-shirt']";
    productTitle = "[data-test='inventory-item-name']";
    productPrice = "[data-test='inventory-item-price']";
    quantity = "[data-test='shopping-cart-badge']";
    cartPageTitle = ".title";

    goToHomePage(){
        cy.get(this.continueShoppingBtn).click()
    }

    goToCheckoutPage(){
        cy.get(this.checkoutBtn).click();
    }

    getProductTitleByIndex(index){
        return cy.get(this.productTitle).eq(index);
    }

    getProductPriceByIndex(index){
        return cy.get(this.productPrice).eq(index);
    }

    getAllProducts(){
        return cy.get(this.allProducts);
    }

    removeProductByIndex(index){
        cy.get(this.allProducts).eq(index).find("button").click();
    }

    getQuantity(){
        return cy.get(this.quantity);
    }

}

export default CartPage;
