import React, {useEffect} from "react";
import {useRef} from "react";
import * as d3 from "d3";
import "./style.css";

export default function ScatterImg(props) {
    const ref = useRef();
    const temperatureData = [8, 5, 13, 9, 12];
    const height = 200;
    const width = 200;
    const data = require("./marvel.json");
    const drag = (simulation) => {
        function dragstarted(d) {
            if (!d3.event.active) simulation.alphaTarget(0.3).restart();
            d.fx = d.x;
            d.fy = d.y;
        }

        function dragged(d) {
            d.fx = d3.event.x;
            d.fy = d3.event.y;
        }

        function dragended(d) {
            if (!d3.event.active) simulation.alphaTarget(0);
            d.fx = null;
            d.fy = null;
        }

        return d3
            .drag()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended);
    };
    const chart = (height, width) => {
        const root = d3.hierarchy(data);

        let svg = null;
        svg = d3
            .select(ref.current)
            .attr("viewBox", [0, 0, width, height])
            .attr("height", "100%")
            .attr("width", "100%");
        const defs = svg.append("defs");
        const gLink = svg
            .append("g")
            .attr("stroke", "#999")
            .attr("stroke-opacity", 0.6);

        const gNode = svg
            .append("g")
            .attr("cursor", "pointer")
            .attr("pointer-events", "all");

        function update() {
            const links = root.links();
            const nodes = root.descendants();

            defs
                .selectAll(".pattern")
                .data(nodes)
                .enter()
                .append("pattern")
                .attr("class", "pattern")
                .attr("patternContentUnits", "objectBoundingBox")
                .attr("id", (d) => d.data.name.replace(/\W/g, "-"))
                .attr("height", "100%")
                .attr("width", "100%")
                .append("image")
                .attr("height", "1")
                .attr("width", "1")
                .attr("preserveAspectRatio", "none")
                .attr("xlink:href", (d) => d.data.img);
            const simulation = d3
                .forceSimulation(nodes)
                .force(
                    "link",
                    d3
                        .forceLink(links)
                        .id((d) => d.id)
                        .distance((d) => {
                            return 20;
                        })
                        .strength(1)
                )
                .force("charge", d3.forceManyBody().strength(-50))
                .force("x", d3.forceX(height / 2).strength(0.05))
                .force("y", d3.forceY(width / 2).strength(0.05))
                .force("collide", d3.forceCollide(11));

            const link = gLink.selectAll("line").data(links).join("line");

            const node = gNode
                .selectAll("circle")
                .data(nodes, (d) => d.index)
                .join("circle")
                .attr("fill", (d) =>
                    d.data.img ? "url(#" + d.data.name.replace(/\W/g, "-") + ")" : "#eee"
                )
                .attr("stroke", (d) => (d.children ? null : "#fff"))
                .attr("r", 5)
                .call(drag(simulation))
                .on("click", (d) => {
                    if (d.children) {
                        d._children = d.children;
                        d.children = null;
                    } else {
                        d.children = d._children;
                        d._children = null;
                    }

                    update();
                });

            node.append("title").text((d) => d.data.name);

            simulation.on("tick", () => {
                link
                    .attr("x1", (d) => d.source.x)
                    .attr("y1", (d) => d.source.y)
                    .attr("x2", (d) => d.target.x)
                    .attr("y2", (d) => d.target.y);

                node.attr("cx", (d) => d.x).attr("cy", (d) => d.y);
            });
            svg.call(
                d3
                    .zoom()
                    .extent([
                        [0, 0],
                        [width, height],
                    ])
                    .scaleExtent([0, 10])
                    .on("zoom", () => {
                        gNode.attr("transform", d3.event.transform);
                        gLink.attr("transform", d3.event.transform);
                    })
            );
        }

        gLink.exit().remove();
        gNode.exit().remove();

        function collapse(d) {
            if (d.children) {
                d._children = d.children;
                d._children.forEach(collapse);
                d.children = null;
            }
        }

        update();
    };

    useEffect(() => {
        // some colour variables

        console.log(ref.current.clientHeight);

        chart(height, width);
        console.log(ref.current.clientHeight);
    }, []);

    return (
        <div style={{height: 500}}>
            <svg ref={ref}></svg>
        </div>
    );
}
