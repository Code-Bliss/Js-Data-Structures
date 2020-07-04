
// TODO:: testing :p
// TODO:: use this class to create one function which takes a file and compress it and save it 
// into a file along with the tree structure which is used to get original contents

import { TreeNode } from "../tree";
import Heap from "../min-heap";

export interface huffmanData<T> {
    frequency: number;
    character: T
}

class Huffman<T>{

    huffmanTree: TreeNode<huffmanData<T>>;
    huffmanSymbolDict: {};

    public getHuffmanCode() {
        return this.huffmanTree;
    }

    public constructHuffman(data: huffmanData<T>[]) {
        const heap = new Heap<TreeNode<huffmanData<T>>>();
        heap.insert(data.map(el => new TreeNode(el)));

        do {
            const left = heap.extract_min();
            const right = heap.extract_min();
            const head: huffmanData<T> = { frequency: left.data.frequency + right.data.frequency, character: undefined }
            const newNode = new TreeNode(head);
            newNode.left = left;
            newNode.right = right;
            heap.insert([newNode]);
        } while (heap.getHeight() > 1);

        this.huffmanTree = heap.extract_min();

        this.huffmanSymbolDict = {};
        this.getSymbols(this.huffmanSymbolDict, this.huffmanTree, '');
    }

    private getSymbols(symbols: {}, head: TreeNode<huffmanData<T>>, path: string) {
        if (!head.left) {
            symbols[path.toString()] = head.data.character;
            symbols[head.data.character.toString()] = path;
        } else {
            this.getSymbols(symbols, head.left, path + '0');
            this.getSymbols(symbols, head.right, path + '1')
        }
    }

    public compressData(data: T[]) {
        let compressed = '';
        data.forEach(element => {
            compressed = compressed + this.huffmanSymbolDict[element.toString()];
        });
        return compressed;
    }

    public extractData(data: string) {
        let extracted = '';
        for (let index = 0; index < data.length; index++) {
            let element = data[index];
            while (!this.huffmanSymbolDict[element]) {
                index++;
                element = element + data[index];
            }
            extracted = extracted + this.huffmanSymbolDict[element];
        }
        return extracted;
    }

}