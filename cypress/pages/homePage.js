class HomePage {

    dropdownMenu = "#react-burger-menu-btn";
    dropdownMenuElements = ".bm-item-list";
    allItemsBtn = "#inventory_sidebar_link";
    aboutBtn = "#about_sidebar_link";
    logOutBtn = "#logout_sidebar_link";
    resetAppStateBtn = "#reset_sidebar_link";
    closeDropdownBtn = "#react-burger-cross-btn";
    
    dropdownSort = ".product_sort_container";
    cartBtn = ".shopping_cart_link";
    products = "[data-test='inventory-item-name']";
    productCard = ".inventory_item";
    productsTitle = ".inventory_item_name ";
    productsPrice = ".inventory_item_price";
    addToCartBtn = ".btn.btn_primary.btn_small.btn_inventory";
    appLogo = ".app_logo";
    backToProductsBtn = "#back-to-products";

    visitHomePage(){
    cy.visit("/inventory.html");
    }

    openCart(){
        cy.get(this.cartBtn).click();
    }

    selectSort(option){
        cy.get(this.dropdownSort).select(option);
    }

    selectDropdownMenu(option){
        cy.get(this.dropdownMenu).click();
        cy.contains(option).click();
    }

    getAllProducts(){
        return cy.get(this.productCard);
    }

    addProductToCartByIndex(index){
        cy.get(this.productCard).eq(index).within(() => {
            cy.get(this.addToCartBtn).click();
        });
    }

    getProductsTitleByIndex(index){
        return cy.get(this.productCard).eq(index).find(this.productsTitle);
    }

    getProductsPriceByIndex(index){
        return cy.get(this.productCard).eq(index).find(this.productsPrice);
    }

    getAppLogo(){
        return cy.get(this.appLogo);
    }

    logOut(){
        cy.get(this.dropdownMenu).click();
        cy.get(this.logOutBtn).click();
    }

    clickAllItems(){
        cy.get(this.dropdownMenu).click();
        cy.get(this.allItemsBtn).click();
    }

    clickAbout(){
        cy.get(this.dropdownMenu).click();
        cy.get(this.aboutBtn).click();
    }

    clickResetAppState(){
        cy.get(this.dropdownMenu).click();
        cy.get(this.resetAppStateBtn).click();
    }

    clickCloseDropdown(){
        cy.get(this.closeDropdownBtn).click();
    }

    

}

export default HomePage;
