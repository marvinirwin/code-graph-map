
const edges = [];

export function processNodeChildren(edges = [], source, node) {
    switch (node.type) {
        case "ExpressionStatement":
            processNodeChildren(edges, source, node.expression);
            break;
        case "CallExpression":
            processNodeChildren(edges, source, node.callee);
            break;
        case "MemberExpression":
            processNodeChildren(edges, source, node.object);
            break;
        case "Identifier":
            edges.push({source, target: node.name});
            break;
        case "Program":
        case "BlockStatement":
            node.body.forEach(bodyElement => processNodeChildren(edges, source, bodyElement));
            break;
        case "FunctionDeclaration":
            // Here I assume that every functionDeclaration has a name, this is not correct but whatever
            // If it doesnt have a name
            node.body.body.forEach(bodyElement => processNodeChildren(edges, node?.id?.name || source, bodyElement));
            break;
    }
    return edges;
}

