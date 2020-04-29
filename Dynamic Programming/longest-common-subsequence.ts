/*

                LONGEST COMMON SUBSEQUENCE

A subsequence of a given sequence is just the given sequence with zero or more elements left
out. Formally, given a sequence X = x1, x2, ..., xm, another sequence Z = z1, z2, ..., zk is
a subsequence of X if there exists a strictly increasing sequence i1,i2, ..., ik of indices of X
such that for all j = 1, 2, ..., k, we have xij = zj . For example, Z = B, C, D, B is a
subsequence of X = A, B, C, B, D, A, B with corresponding index sequence 2, 3, 5, 7.
Given two sequences X and Y , we say that a sequence Z is a common subsequence of X and
Y if Z is a subsequence of both X and Y . For example, if X = A, B, C, B, D, A, B and Y =
B, D, C, A, B, A, the sequence B, C, A is a common subsequence of both X and Y . The
sequence B, C, A is not a longest common subsequence (LCS) of X and Y , however, since
it has length 3 and the sequence B, C, B, A, which is also common to both X and Y , has
length 4. The sequence B, C, B, A is an LCS of X and Y , as is the sequence B, D, A, B,
since there is no common subsequence of length 5 or greater.
In the longest-common-subsequence problem, we are given two sequences X = x1, x2, ...,
xm and Y = y1, y2, ..., yn and wish to find a maximum-length common subsequence of X
and Y . 

*/

/**
 *returns 0 if equal, returns 1 if first arg is greater then second otherwise returns -1
 *
 * @template T
 * @param {T} arg1
 * @param {T} arg2
 * @returns {number}
 */
function compareLcs<T>(arg1: T, arg2: T): number {
    if (arg1 === arg2) {
        return 0;
    } else if (arg1 > arg2) {
        return 1;
    } else return -1;
}



/**
 *
 * 
 * 
 * 
 * @description Let X = x1, x2, ..., xm and Y = y1, y2, ..., yn be sequences, and let Z = z1, z2, ..., zk be
                  any LCS of X and Y.
                  1. If xm = yn, then zk = xm = yn and Zk-1 is an LCS of Xm-1 and Yn-1.
                  2. If xm ≠ yn, then zk ≠ xm implies that Z is an LCS of Xm-1 and Y.
                  3. If xm ≠ yn, then zk ≠ yn implies that Z is an LCS of X and Yn-1.
 *
 * @export
 * @template T
 * @param {T[]} arr1
 * @param {T[]} arr2
 * @param {(arg1: T, arg2: T) => boolean} [compare]
 * @returns {T[]}
 */
export function longestCommonSubSequence<T>(arr1: T[], arr2: T[], compare?: (arg1: T, arg2: T) => number): number[] {

    const arr1_len = arr1.length;
    const arr2_len = arr2.length;
    const cost_arr = [];
    if (arr1_len < 1 || arr2_len < 1) {
        return [];
    }

    // comparison function
    //returns 0 if equal, returns 1 if first arg is greater then second otherwise returns -1
    const compareObjects = compare ? compare : compareLcs;

    // initialize the cost array

    // 1. initialize first column with 0
    for (let index = 0; index < arr1_len + 1; index++) {
        cost_arr[index] = Array(arr2_len + 1);
        cost_arr[index][0] = 0;
    }

    //  2. initialize first row with 0
    for (let index = 1; index < arr2_len + 1; index++) {
        cost_arr[0][index] = 0;
    }

    // builds the costs from 0 to the end of the cost array
    for (let index1 = 1; index1 < arr1_len + 1; index1++) {
        for (let index2 = 1; index2 < arr2_len + 1; index2++) {
            if (compareObjects(arr1[index1 - 1], arr2[index2 - 1])===0) {
                cost_arr[index1][index2] = cost_arr[index1 - 1][index2 - 1] + 1;
            }
            else if (compareObjects(cost_arr[index1 - 1][index2], cost_arr[index1][index2 - 1]) === -1) {
                cost_arr[index1][index2] = cost_arr[index1][index2 - 1];
            }
            else {
                cost_arr[index1][index2] = cost_arr[index1 - 1][index2];
            }
        }
    }

    //Constructing an LCS
    return constructLcs(cost_arr, arr1_len, arr2_len).reverse();

}

function constructLcs(cost_arr, i: number, j: number, result: number[] = []): number[] {
    if (i == 0 || j == 0) {
        return result;
    }
    if (cost_arr[i - 1][j - 1] + 1 === cost_arr[i][j] && !(cost_arr[i - 1][j] ===cost_arr[i][j]||cost_arr[i][j]=== cost_arr[i][j - 1])) {
        result.push(i);
        return constructLcs(cost_arr, i - 1, j - 1, result);
    }
    else if (cost_arr[i - 1][j] < cost_arr[i][j - 1]) {
        return constructLcs(cost_arr, i, j - 1, result);
    }
    else {
        return constructLcs(cost_arr, i - 1, j, result);
    }
}