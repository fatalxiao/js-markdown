import _ from 'lodash';
import H1 from './syntax/H1';

export default {

    initData: '',

    tree: null,

    result: '',

    htmlStack: [],

    initTree(data) {

        this.initData = String(data);

        this.tree = {
            rawValue: this.initData,
            parent: null,
            index: 0,
            isRoot: true,
            children: []
        };

        let tempData = this.initData,
            searchIndex,
            index = 0;

        while (tempData) {

            searchIndex = tempData.search(/\n{2,}/);

            if (searchIndex === -1) {
                this.tree.children.push({
                    rawValue: tempData,
                    parent: this.tree,
                    index: 0,
                    isRoot: false
                });
                break;
            }

            this.tree.children.push({
                rawValue: tempData.slice(0, searchIndex),
                parent: this.tree,
                index: index++,
                isRoot: false
            });

            tempData = tempData.slice(searchIndex);
            tempData = _.trimStart(tempData, '\n');

        }

    },

    traverseData(node) {

        if (!node) {
            return;
        }

        const rawValue = node.rawValue;

        if (H1.valid(rawValue)) {
            node.type = 'h1';
            node.children = [{
                rawValue: H1.content(rawValue)
            }];
            this.traverseData(node.children[0], 0, node);
        }

    },

    parseData(node) {

        if (!node.children) {
            return node.rawValue;
        }

        let string = '';
        for (let i = 0, len = node.children.length; i < len; i++) {
            string += this.parseData(node.children[i]);
        }

        if (node.isRoot) {
            return string;
        }

        if (node.type === 'h1') {
            return H1.parse(string);
        }

        return node.rawValue;

    },

    parse(data) {

        if (!data) {
            return;
        }

        if (String(data) === this.initData) {
            return this.result;
        }

        this.initTree(data);

        for (let i = 0, len = this.tree.children.length; i < len; i++) {
            this.traverseData(this.tree.children[i]);
        }

        this.result = this.parseData(this.tree);

        return this.result;

    }

};