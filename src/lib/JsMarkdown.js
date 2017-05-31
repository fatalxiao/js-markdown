import _ from 'lodash';
// import Syntax from './syntax';
import {
    H1, H2, H3, H4, H5, H6
} from './syntax';

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

        if (!node) {
            return;
        }

        const rawValue = node.rawValue;

        if (H1.valid(rawValue)) {
            node.type = 'h1';
            node.children = [{
                rawValue: H1.content(rawValue),
                parent: node,
                index: 0
            }];
        } else if (H2.valid(rawValue)) {
            node.type = 'h2';
            node.children = [{
                rawValue: H2.content(rawValue),
                parent: node,
                index: 0
            }];
        } else if (H3.valid(rawValue)) {
            node.type = 'h3';
            node.children = [{
                rawValue: H3.content(rawValue),
                parent: node,
                index: 0
            }];
        } else if (H4.valid(rawValue)) {
            node.type = 'h4';
            node.children = [{
                rawValue: H4.content(rawValue),
                parent: node,
                index: 0
            }];
        } else if (H5.valid(rawValue)) {
            node.type = 'h5';
            node.children = [{
                rawValue: H5.content(rawValue),
                parent: node,
                index: 0
            }];
        } else if (H6.valid(rawValue)) {
            node.type = 'h6';
            node.children = [{
                rawValue: H6.content(rawValue),
                parent: node,
                index: 0
            }];
        } else {
            return;
        }

        for (let i = 0, len = node.children.length; i < len; i++) {
            this.traverseData(node.children[i]);
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

        if (node.type === 'h2') {
            return H2.parse(string);
        }

        if (node.type === 'h3') {
            return H3.parse(string);
        }

        if (node.type === 'h4') {
            return H4.parse(string);
        }

        if (node.type === 'h5') {
            return H5.parse(string);
        }

        if (node.type === 'h6') {
            return H6.parse(string);
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