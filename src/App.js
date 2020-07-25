import React, {useEffect, useState} from 'react';
import './App.css';
import {getVoronoi} from "./voronoi";



// First I have to walk the tree and get a global registry of functions I have to traverse

function App() {
    const [el, setEl] = useState();
    useEffect(() => {
        if (el) {
            const v = getVoronoi()
            // console.log(v.render())
            el.height = v.ymax - v.ymin;
            el.width = v.xmax - v.xmin;
            const ctx = el.getContext('2d');
            v.render(ctx);
            ctx.stroke();
        }
    }, [el]);
    return (
        <canvas className="App" ref={setEl} width="1000" height="1000">
        </canvas>
    );
}

export default App;
