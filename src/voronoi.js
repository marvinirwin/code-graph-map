import {Delaunay} from "d3-delaunay";
import * as babelParser from "@babel/parser";
import {processNodeChildren} from "./create-ast";
import {Graph, Layout} from "graphdracula";

export function getGraphLayout() {
    const ret = babelParser.parse(basicProgram);
    const edges = processNodeChildren([], "This should be a filename I think", ret.program)
    const g = new Graph();
    edges.forEach(({source, target}) => g.addEdge(source, target))
    const layouter = new Layout.Spring(g);
    layouter.layout();
    return g;
}

export function getVoronoi() {
    const g = getGraphLayout();
    const nodes = g.nodes;

    const points = Object.values(nodes).map(({layoutPosX, layoutPosY}) => [layoutPosX * 100, layoutPosY * 100]);
    let xMin = points.reduce((min, [x, ]) => x < min ? x : min, Number.MAX_SAFE_INTEGER) - 100;
    let yMin = points.reduce((min, [, y]) => y < min ? y : min, Number.MAX_SAFE_INTEGER) - 100;
    let xMax = points.reduce((max, [x, ]) => x > max ? x : max, Number.MIN_SAFE_INTEGER) + 100;
    let yMax = points.reduce((max, [, y]) => y > max ? y : max, Number.MIN_SAFE_INTEGER) + 100;
    // How to set all points to be at 0,0
    points.forEach(p => {
        const xOffset = 0 - xMin;
        const yOffset = 0 - yMin;
        p[0] = p[0] + xOffset;
        p[1] = p[1] + yOffset;
        xMax += xOffset;
        yMax += yOffset;
    })
    const delaunay = Delaunay.from(points);
    return delaunay.voronoi([
            0,
            0,
            xMax,
            yMax
        ]
    );
}

export let basicProgram = `
        function test1() {test2()} 
        function test2() {test3()} 
        function test3() {
            test1()
            test2()
            test3()
            test4()
            test5()
            test6()
            test7()
            test5()
            test5()
            test2()
            test9()
        }
`;