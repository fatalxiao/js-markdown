import _ from 'lodash';
import Syntax from './syntax';

// import {
//     Table,
//     H1, H2, H3, H4, H5, H6
// } from './syntax';

export default {

    initData: '',

    tree: null,

    result: '',

    htmlStack: [],

    initTree(data) {

        this.initData = String(data);

        this.tree = {
            rawValue: this.initData,
            index: 0,
            isRoot: true
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
                    index: 0
                });
                break;
            }

            this.tree.children.push({
                rawValue: tempData.slice(0, searchIndex),
                parent: this.tree,
                index: index++
            });

            tempData = tempData.slice(searchIndex);
            tempData = _.trimStart(tempData, '\n');

        }

    },

    traverseData(node) {

        debugger;

        if (!node || !node.rawValue) {
            return;
        }

        let flag;

        while (node.rawValue) {

            flag = false;

            for (let key in Syntax) {
                if (Syntax[key].valid && Syntax[key].valid(node.rawValue)) {
                    Syntax[key].handle(node);
                    flag = true;
                    break;
                }
            }

            if (!flag) {
                Syntax.DefaultString.handle(node);
            }

        }

        // this.traverseData(node);

        if (node.children) {
            for (let i = 0, len = node.children.length; i < len; i++) {
                this.traverseData(node.children[i]);
            }
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

        for (let key in Syntax) {
            if (node.type === key) {
                return Syntax[key].parse(string);
            }
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

        this.traverseData(this.tree);

        console.log(this.tree);

        this.result = this.parseData(this.tree);

        return this.result;

    }

};