import React from 'react';
import * as babelParser from "@babel/parser";
import {processNodeChildren} from "./create-ast";
import {basicProgram, getGraphLayout, getVoronoi} from "./voronoi";

test('Creates a call graph', () => {
    const ret = babelParser.parse(basicProgram);
    const edges = processNodeChildren([], "This should be a filename I think", ret.program)
    expect(edges).toEqual([
        {source: "test1", target: "test2"},
        {source: "test2", target: "test3"},
        {source: "test3", target: "test1"},
    ]);
});

test("Lays out the call graph", () => {
    const g = getGraphLayout();
    expect(Object.values(g.nodes)[0].layoutPosX).not.toBeUndefined()
});

test("Draws the voronoi diagram", () => {
    getVoronoi();
    expect(1).toBeGreaterThan(1)
});
