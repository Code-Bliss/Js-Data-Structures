
/**
 * Given Input of matrix-chain mutiplication 
 * should be of form->[10,2,3,32] where A1=10*2,A2=2*3,A3=3*32
 * @param {*} A ->sequence of matrix dimensions
 * @returns the order of multiplying matrixes eg:(A[1]*A[2])*A[3]
 */
const matrix_chain_multiplication_order = (A: Array<number>) => {
    // n here represents the number of matrixes
    const n = A.length - 1;
    // cost computed for multiplying these matrixes
    const m: Array<Array<number>> = new Array(n);
    // solutions array
    const s: Array<Array<number>> = new Array(n);
    for (let i = 1; i < n + 1; i++) {
        m[i] = new Array(i);
        s[i] = new Array(i);
        for (let i = 1; i < n + 1; i++) {
            m[i][i] = 0;
        }
    }

    // l here is the chain length 
    /**
     * here we start computing the cost of multiplying multiple matrixes ->
     * We first calculate the cost of multiplying 2 sequential matrixes(A1*A2),(A2*A3)
     * then we calculate the cost of multiplying 3 sequential matrixes(A1*A2*A3),(A2*A3*A4) and so on....till n(A1*A2*...*An)
     * here 2,3,....,n are the chain lengths
    */
    for (let l = 2; l < n + 1; l++) {
        for (let i = 1; i <= n - l + 1; i++) {
            const j = i + l - 1;
            m[i][j] = Number.POSITIVE_INFINITY;
            for (let k = i; k < j; k++) {
                let q = m[i][k] + m[k + 1][j] + (A[i] * A[j]);
                if (m[i][j] < q) {
                    m[i][j] = q;
                    s[i][j] = k;
                }
            }
        }
    }

    return print_optimal_parens(A, s, 1, n);
}

/**
 *
 * 
 * @param {*} A sequence of matrix dimensions 
 * @param {*} S solution matrix
 * @param {*} i
 * @param {*} j
 * @returns the order of multiplying matrixes eg:((A[1]*A[2])*A[3])
 */
const print_optimal_parens = (A, S, i, j) => {
    if (i === j) {
        return 'A[' + i + ']';
    } else {
        const k = S[i][j];
        return '(' + print_optimal_parens(A, S, i, k) + print_optimal_parens(A, S, k + 1, j) + ')';
    }
}