const state = {
    funds: 10000,
    stocks: []
};

const mutations = {
    // To change state (central store) for sync task after committed
    'BUY_STOCK'(state, {stockId, quantity, stockPrice}) { // an object to pass
        // Find any stocks of record you still hold
        const record = state.stocks.find(element => element.id == stockId);
        if (record) {                           // If old record is set (You hold stocks)
            record.quantity += quantity;        // old order plus new order
        } else {                                // If no record (You don't hold stock)
            state.stocks.push({                 // Add new record
                id: stockId,
                quantity: quantity
            });
        }
        state.funds -= stockPrice * quantity;   // Total capital after buy
    },
    'SELL_STOCK' (state, {stockId, quantity, stockPrice}) {
        // Find any stocks of record you still hold
        const record = state.stocks.find(element => element.id == stockId);
        if (record.quantity > quantity) {       // If you sold out part of stocks
            record.quantity -= quantity;        // the stock you hold plus the stock you sell
        } else {
            // If you sell out all stocks, then remove the stock record
            state.stocks.splice(state.stocks.indexOf(record), 1);
        }
        state.funds += stockPrice * quantity;   // Total capital after sell
    },
    'SET_PORTFOLIO' (state, portfolio) {
        // Passing portfolio to getters
        state.funds = portfolio.funds;          // show current total capital
        state.stocks = portfolio.stockPortfolio ? portfolio.stockPortfolio : [];
    }
};

const actions = {
    // passing order object to commit mutation "SELL_STOCK"
    sellStock({commit}, order) {
        commit('SELL_STOCK', order);
    }
};

const getters = {
    // get the state (central store), then access to the child component
    stockPortfolio (state, getters) {
        // To transform each element in array by map method
        return state.stocks.map(stock => {
            // Find any stocks of record you still hold
            const record = getters.stocks.find(element => element.id == stock.id);
            // Fetch an object for portfolio
            return {
                id: stock.id,
                quantity: stock.quantity,
                name: record.name,
                price: record.price
            }
        });
    },
    funds (state) {
        // Fetch Total Capital
        return state.funds;
    }
};

export default {
    state,
    mutations,
    actions,
    getters
}