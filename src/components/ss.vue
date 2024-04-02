<script setup>
import { ref, watch, reactive } from "vue";
import * as vNG from "v-network-graph";
import { VNetworkGraph } from "v-network-graph";
import dagre from "dagre/dist/dagre.min.js";

//import { VNetworkGraph, defineConfigs } from "v-network-graph";
//import dagre from "dagre/dist/dagre.min.js";

const props = defineProps({
  nodes: Array,
  edges: Array,
});

const nodes = ref([]);
const edges = ref([]);
const graph = ref();
const nodeSize = ref(30);
const layouts = ref({
  nodes: {},
});

const configs = defineConfigs({
  node: {}, // Define custom the node style
  edge: {}, // Define custom the edge style
});

function updateLayout(direction) {
  const g = new dagre.graphlib.Graph();
  // Set an object for the graph
  g.setGraph({
    rankdir: direction,
    nodesep: nodeSize.value * 3,
    edgesep: nodeSize.value * 3,
    ranksep: nodeSize.value * 3,
  });
  // Default to assigning a new object as a label for each new edge.
  g.setDefaultEdgeLabel(() => ({}));
  // Add Nodes with arguments to the graph
  nodes.value.forEach((node) => {
    g.setNode(node.id, {
      label: node.name,
      width: nodeSize.value,
      height: nodeSize.value,
    });
  });
  // Add edges to the graph.
  edges.value.forEach((edge) => {
    g.setEdge(edge.source, edge.target);
  });
  // Run the layout
  dagre.layout(g);
  // Update node positions
  g.nodes().forEach((nodeId) => {
    const x = g.node(nodeId).x;
    const y = g.node(nodeId).y;
    layouts.value.nodes[nodeId] = { x, y };
  });
}

watch(props, () => {
  nodes.value = props.nodes;
  edges.value = props.edges;
  updateLayout("LR");
});
</script>

<template>
  <button @click="updateLayout('LR')">Left to Right</button>
  <button @click="updateLayout('TB')">Top to Bottom</button>
  <v-network-graph
    ref="graph"
    class="graph"
    :nodes="nodes"
    :edges="edges"
    :layouts="layouts"
    :configs="configs"
  />
</template>
