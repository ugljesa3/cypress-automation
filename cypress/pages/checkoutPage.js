class CheckoutPage {

    cartBtn = ".shopping_cart_link";
    quantity = ".shopping_cart_badge";
    cancelBtn = "#cancel";
    finishBtn = "#finish";
    allProducts = "[data-test='cart-list']";
    productsTitle = "[data-test='inventory-item-name']";
    productsPrice = "[data-test='inventory-item-price']";
    totalPriceBeforeTax = "[data-test='subtotal-label']";
    cartList = ".cart_list";
    taxElement = "[data-test='tax-label']";
    successfulMessage = "[data-test='complete-header']";

    goToCartPage(){
        cy.get(this.cartBtn).click();
    }

    clickCancel(){
        cy.get(this.cancelBtn).click();
    }

    clickFinish(){
        cy.get(this.finishBtn).click();
    }

    getAllProducts(){
        return cy.get(this.allProducts);
    }

    getProductsTitleByIndex(index){
        return cy.get(this.productsTitle).eq(index);
    }

    getProductsPriceByIndex(index){
        return cy.get(this.productsPrice).eq(index);
    }

    getTotalPriceBeforeTax(){
        return cy.get(this.totalPriceBeforeTax);
    }

    getQuantity(){
        return cy.get(this.quantity);
    }

}

export default CheckoutPage;
