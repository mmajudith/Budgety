'use strict';

// BUDGET CONTROLLER
let budgetController = (function() {

    let Expenses = function(id, description, value){
        this.id = id;
        this.description = description;
        this.value = value;
    };

    let Incomes = function(id, description, value){
        this.id = id;
        this.description = description;
        this.value = value;
    };

    let data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        }

    };

    return {
        addItem: function(type, des, val){
            let newItem, ID;

            //[1 2 3 4 5], next ID = 6
            //[1 2 4 5 6], next ID = 9
            //ID = last  ID + 1

            //Create new ID
            if(data.allItems[type].length > 0){
                ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
            }else{
                ID = 0;
            }

            //Create new ID based on 'inc' and 'exp' type
            if(type === 'exp'){
                newItem = new Expenses(ID, des, val);
            }else if(type === 'inc'){
                newItem = new Incomes(ID, des, val);
            }

            //Push it into our data structure
            data.allItems[type].push(newItem);

            //Return the new element
            return newItem;
        },

        testing: function(){
            console.log(data);
        }
    };

})();


//UI CONTROLLER
let UIController = (function() {

    let DOMStrings = {
        
            inputType: '.add__type',
            inputDescription: '.add__description',
            inputValue: '.add__value',
            inputBtn: '.add__btn'
    };

    return {
        getInput: function(){

            return{

             type: document.querySelector(DOMStrings.inputType).value,
             description: document.querySelector(DOMStrings.inputDescription).value,
             value: document.querySelector(DOMStrings.inputValue).value

            };
        },

        getDOMstrings: function(){
            return DOMStrings;
        }
    };

})();


//GLOBAL APP CONTROLLER
let controller = (function(budgetCtrl, UICtrl) {

    let setupEventListener = function(){

        let DOM = UICtrl.getDOMstrings();

        document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);
    

    document.addEventListener('keypress', function(event){

        if(event.keyCode === 13 || event.which === 13 ){
            ctrlAddItem();
        }
        
    });

    };

    let ctrlAddItem = function(){

        let input, newItem;

        //1. Get the field input data
         input = UICtrl.getInput();
        
        //2. Add the items to the budget controller
        newItem = budgetCtrl.addItem(input.type, input.description, input.value);

        //3. Add the item to UI

        //4. Calculate the budget

        //5. Display the budget on the UI

        
    }

        return{
            init: function(){
                console.log('the project is awesome!');
                setupEventListener();
            }
        }
    

})(budgetController, UIController);

controller.init();