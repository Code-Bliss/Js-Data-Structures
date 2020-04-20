/**
The rod-cutting problem is the following. Given a rod of length n inches and a

table of prices pi for i D 1; 2; : : : ; n, determine the maximum revenue rn obtain-
able by cutting up the rod and selling the pieces. 
*/


/**
     * Given Input should be in the form dictionary {length:price}=>{1:1,2:5,3:8}
     * length i 1 2 3 4 5 6 7 8 9 10
     * price pi 1 5 8 9 10 17 17 20 24 30
     * Figure 15.1 A sample price table for rods. Each rod of length i inches earns the company pi dollars.
     * determine the maximum revenue rn obtainable by cutting up the rod of length n and selling the pieces.
*/

const findMaxRevenue = (rodLengthWithPrices, n) => {
    const r = new Array(n);
    // solutions array
    const s = new Array(n);
    r[0] = 0;
    for (let j = 1; j <= n; j++) {
        let q = Number.NEGATIVE_INFINITY;
        for (let i = 1; i <= j; i++) {
            const rodLengthPrice = rodLengthWithPrices[i] ? rodLengthWithPrices[i] : 0;
            if (q < rodLengthPrice + r[j - i]) {
                q = rodLengthPrice + r[j - i];
                s[j] = i;
            }
        }
        r[j] = q;
    }
    let result = [];
    while (n > 0) {
        result.push(s[n]);
        n = n - s[n];
    }
    return result;
}
