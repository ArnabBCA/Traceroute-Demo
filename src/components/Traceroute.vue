<script setup>
import { ref } from "vue";
import * as vNG from "v-network-graph";
import { VNetworkGraph } from "v-network-graph";
import data from "./data";

import dagre from "dagre/dist/dagre.min.js";

const nodeSize = 40;

const configs = vNG.defineConfigs({
  view: {
    autoPanAndZoomOnLoad: "fit-content",
    onBeforeInitialDisplay: () => layout("LR"),
  },
  node: {
    normal: { radius: nodeSize / 2 },
    label: { direction: "center", color: "#000" },
  },
  edge: {
    normal: {
      color: "#aaa",
      width: 3,
    },
    margin: 4,
    marker: {
      target: {
        type: "arrow",
        width: 4,
        height: 4,
      },
    },
  },
});

const graph = ref();

function layout(direction) {
  if (data.nodes.length <= 1 || data.edges.length === 0) {
    return;
  }
  const g = new dagre.graphlib.Graph();
  g.setGraph({
    rankdir: direction,
    nodesep: nodeSize * 2,
    edgesep: nodeSize,
    ranksep: nodeSize * 2,
  });
  g.setDefaultEdgeLabel(() => ({}));

  data.nodes.forEach((node) => {
    g.setNode(node.id, { label: node.name, width: nodeSize, height: nodeSize });
  });

  data.edges.forEach((edge) => {
    g.setEdge(edge.source, edge.target);
  });

  dagre.layout(g);

  g.nodes().forEach((nodeId) => {
    const x = g.node(nodeId).x;
    const y = g.node(nodeId).y;
    data.layouts.nodes[nodeId] = { x, y };
  });
}

function updateLayout(direction) {
  graph.value?.transitionWhile(() => {
    layout(direction);
  });
}
</script>

<template>
  <button @click="updateLayout('LR')">Left to Right</button>
  <button @click="updateLayout('TB')">Top to Bottom</button>
  <div class="graphContainer">
    <v-network-graph
      ref="graph"
      class="graph"
      :nodes="data.nodes.reduce((acc, node) => { acc[node.id] = node; return acc; }, {})"
      :edges="data.edges"
      :layouts="data.layouts"
      :configs="configs"
      :style="{ width: '100%', height: '100%' }"
    />
  </div>
</template>
