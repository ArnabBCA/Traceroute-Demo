<script setup>
import { ref, onMounted, watch, toRaw, reactive } from "vue";
import * as vNG from "v-network-graph";
import { VNetworkGraph } from "v-network-graph";
import dagre from "dagre/dist/dagre.min.js";

const graph = ref();
const nodeSize = 30;

const props = defineProps({
  nodes: Array,
  edges: Array,
});

watch(props, () => {
  nodes.value = props.nodes;
  edges.value = props.edges;
  updateLayout("LR");
});

const nodes = ref([]);
const edges = ref([]);

const configs = vNG.defineConfigs({
  node: {
    normal: {
      radius: nodeSize / 2,
      strokeWidth: 1,
      strokeColor: "#aaa",
      color: (node) =>
        node.type === "source"
          ? "#90d272"
          : node.type === "target"
          ? "orange"
          : node.type === "timeout"
          ? "gray"
          : "#6C8CEB",
    },
    label: {
      direction: "north",
      directionAutoAdjustment: true,
      fontSize: 12,
      fontWeight: "bold",
    },
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

function layout(direction) {
  const g = new dagre.graphlib.Graph();
  g.setGraph({
    rankdir: direction,
    nodesep: nodeSize * 3,
    edgesep: nodeSize * 3,
    ranksep: nodeSize * 3,
  });
  g.setDefaultEdgeLabel(() => ({}));

  nodes.value.forEach((node) => {
    g.setNode(node.id, { label: node.name, width: nodeSize, height: nodeSize });
  });

  edges.value.forEach((edge) => {
    g.setEdge(edge.source, edge.target);
  });

  dagre.layout(g);

  // Calculate the center of the graph
  let minX = Infinity;
  let maxX = -Infinity;
  let minY = Infinity;
  let maxY = -Infinity;

  g.nodes().forEach((nodeId) => {
    const x = g.node(nodeId).x;
    const y = g.node(nodeId).y;
    minX = Math.min(minX, x);
    maxX = Math.max(maxX, x);
    minY = Math.min(minY, y);
    maxY = Math.max(maxY, y);
  });
  const centerX = (minX + maxX) / 2;
  const centerY = (minY + maxY) / 2;

  // Update node positions to center the graph
  g.nodes().forEach((nodeId) => {
    const x = g.node(nodeId).x - centerX;
    const y = g.node(nodeId).y - centerY;
    layouts.nodes[nodeId] = { x, y };
  });
}

function updateLayout(direction) {
  graph.value?.transitionWhile(() => {
    layout(direction);
  });
}

const layouts = reactive({
  nodes: {},
});
</script>

<template>
  <button @click="updateLayout('LR')">Left to Right</button>
  <button @click="updateLayout('TB')">Top to Bottom</button>
  <div class="graphContainer">
    <v-network-graph
      ref="graph"
      class="graph"
      :nodes="nodes"
      :edges="edges"
      :layouts="layouts"
      :configs="configs"
    />
  </div>
</template>

<!--<template>
  <button @click="updateLayout('LR')">Left to Right</button>
  <button @click="updateLayout('TB')">Top to Bottom</button>
  <div class="graphContainer">
    <v-network-graph
      ref="graph"
      class="graph"
      :nodes="
        nodes.reduce((acc, node) => {
          acc[node.id] = node;
          return acc;
        }, {})
      "
      :edges="edges"
      :layouts="layouts"
      :configs="configs"
    />
  </div>
</template>-->
