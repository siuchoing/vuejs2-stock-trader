import Vue from 'vue';

export const loadData = ({commit}) => {
   Vue.http.get('data.json')
       .then(response => response.json())
       .then(data => {
           if (data) {
               const stocks = data.stocks;
               const funds = data.funds;
               const stockPortfolio = data.stockPortfolio;

               // To commit mutation to change the state in stocks.js
               const portfolio = {
                   stockPortfolio,  // stocks
                   funds            // funds
               };
               commit('SET_STOCKS', stocks);            // commit mutation in stock.js
               commit('SET_PORTFOLIO', portfolio);      // commit mutation in portfolio.js
           }
       });
};