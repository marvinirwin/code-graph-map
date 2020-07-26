
const edges = [];

export function processNodeChildren(edges = [], source, node) {
    switch (node.type) {
        case "AssignmentExpression":
            processNodeChildren(edges, source, node.left);
            processNodeChildren(edges, source, node.right);
            break;
        // TODO case "Super"
        case "VariableDeclaration":
            node.declarations.forEach(declaration => processNodeChildren(edges, source, declaration));
            break;
        case "VariableDeclarator":
            processNodeChildren(edges, source, node.id)
            break;
        case "ExpressionStatement":
            processNodeChildren(edges, source, node.expression);
            break;
        case "CallExpression":
            processNodeChildren(edges, source, node.callee);
            break;
        case "MemberExpression":
            processNodeChildren(edges, source, node.property);
            break;
        case "Identifier":
            if (!source || !node.name) {
                console.log();
            }
            edges.push({source, target: node.name});
            break;
        case "ClassDeclaration":
            processNodeChildren(edges, node.id.name, node.body);
            break;
        case "ClassMethod":
            processNodeChildren(edges, node.key.name, node.body)
            break;
        case "Program":
        case "BlockStatement":
        case "ClassBody":
            node.body.forEach(bodyElement => processNodeChildren(edges, source, bodyElement));
            break;
        case "FunctionDeclaration":
            // Here I assume that every functionDeclaration has a name, this is not correct but whatever
            // If it doesnt have a name
            node.body.body.forEach(bodyElement => processNodeChildren(edges, node.id || source, bodyElement));
            break;
        case "Super":
        case "ReturnStatement":
        case "ObjectPattern":
        case "ObjectExpression":
            break;
        default:
            console.log();
    }
    return edges;
}

