const { response } = require("express");

let logoutButton=new LogoutButton();
logoutButton.action=()=>{
    ApiConnector.logout(logout => {
        if (logout) {
            location.reload();
        } 
    });
};
ApiConnector.current((response)=>{
    if(response.success) {
        ProfileWidget.showProfile(response.data);
    }  
});
let ratesBoard = new RatesBoard();
function updateStocks () {
ApiConnector.getStocks((response) => {
    if (response.success) {
        ratesBoard.clearTable();
        ratesBoard.fillTable(response.data);
    }  
}); 
}
updateStocks();
let moneyManager = new MoneyManager();
moneyManager.addMoneyCallback=(data)=>{
    ApiConnector.addMoney(data, (response) => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(true, "Конвертирование валюты выполнено");

        } else {
            moneyManager.setMessage(false, response.error);
        }


    });
}
moneyManager.conversionMoneyCallback=(data) => {
    ApiConnector.convertMoney(data, (response) => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(true, "Конвертирование валюты выполнено");

        } else {
            moneyManager.setMessage(false, response.error);
        }


    });
}

moneyManager.sendMoneyCallback=(data) => {
    ApiConnector.transferMoney(data, (response) => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(true, "Перевод выполнен");

        } else {
            moneyManager.setMessage(false, response.error);
        }


    });
}
 
let favoritesWidget = new FavoritesWidget();
ApiConnector.getFavorites((response)=>{
    if (response.success) {
        favoritesWidget.clearTable();
        favoritesWidget.fillTable(response.data);
        favoritesWidget.updateUsersList(response.data);

    } 
});
favoritesWidget.addUserCallback = (data) => {
    ApiConnector.addUserToFavorites(data, (response)=> {
        if (response.success) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response.data);
            favoritesWidget.updateUsersList(response.data);
            favoritesWidget.setMessage(true, "Пользователь добавлен");
    
        } else {
            favoritesWidget.setMessage(false, response.error);
        }

    });
}
favoritesWidget.removeUserCallback=(data)=>{
    ApiConnector.removeUserFromFavorites(data, (response)=>{
        if (response.success) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response.data);
            favoritesWidget.updateUsersList(response.data);
            favoritesWidget.setMessage(true, "Пользователь добавлен");
    
        } else {
            favoritesWidget.setMessage(false, response.error);
        }
    });
}

