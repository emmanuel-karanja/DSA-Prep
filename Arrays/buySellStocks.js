
//for buy once

//Basically, the left pointer only moves if price[i]<minPrice, maxProfit is only updated if
//local profit i.e. (prices[i]-minPrice) > maxProfit
function maxProfit(prices) {
    let minPrice = Infinity;
    let maxProfit = 0;

    for (let price of prices) {
        if (price < minPrice) {
            minPrice = price; // track lowest buy price
        }

        const profit = price - minPrice;

        if (profit > maxProfit) {
            maxProfit = profit; // update max profit if selling today gives more
        }
    }

    return maxProfit;
}

const prices = [3, 2, 7, 5, 8, 3,1];
console.log(maxProfit(prices)); // Output: 5

