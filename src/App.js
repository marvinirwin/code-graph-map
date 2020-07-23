import React from 'react';
import logo from './logo.svg';
import './App.css';
import * as babelParser from '@babel/parser';

const ret = babelParser.parse(`

function test1() {test2()} 
function test2() {test3()} 
function test3() {test1()}

`);
const edges = [];

function processNodeChildren(source, node) {
    switch (node.type) {
        case "ExpressionStatement":
            processNodeChildren(source, node.expression);
            break;
        case "CallExpression":
            processNodeChildren(source, node.callee);
            break;
        case "MemberExpression":
            processNodeChildren(source, node.object);
            break;
        case "Identifier":
            edges.push({source, target: node.name});
            break;
        case "Program":
        case "BlockStatement":
            node.body.forEach(bodyElement => processNodeChildren(source, bodyElement));
            break;
        case "FunctionDeclaration":
            // Here I assume that every functionDeclaration has a name, this is not correct but whatever
            // If it doesnt have a name
            node.body.forEach(bodyElement => processNodeChildren(node?.id?.name || source, bodyElement));
            break;
    }
}



// First I have to walk the tree and get a global registry of functions I have to traverse

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
                <p>
                    Edit <code>src/App.js</code> and save to reload.
                </p>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a>
            </header>
        </div>
    );
}

export default App;
