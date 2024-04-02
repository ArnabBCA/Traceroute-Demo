<script setup>
import { ref, onMounted, watch, toRaw, reactive } from "vue";
import axios from "axios";
import Graph from "./Graph.vue";

const nodes = ref([]);
const edges = ref([]);

const tracerouteData = ref([]);

const fetchTraceData = async () => {
  try {
    const response = await axios.get(
      "https://atlas.ripe.net/api/v2/measurements/67485894/results"
    );
    console.log(response.data);
    tracerouteData.value = response.data; // Storing the response data
  } catch (error) {
    console.error(error); // Handling error
  }
};

/*const generateGraphData = () => {
  let idCounter = 0; // Counter for unique IDs
  let destfrom = [];
  let destMinRtt = [];
  let destMaxRtt = [];
  let destIds = [];
  let tempNoddes = [];
  tracerouteData.value.forEach((trace) => {
    const hops = trace.result;
    const uniqueIPs = {}; // To store unique IPs within each hop
    if (!(trace.from in uniqueIPs)) {
      tempNoddes.push({
        id: idCounter++,
        type: "source",
        minRtt: 0,
        maxRtt: 0,
        name: trace.from,
      });
    }
    edges.value.push({ source: idCounter - 1, target: idCounter });
    hops.forEach((hop, hopIndex) => {
      hop.result.forEach((result) => {
        const ip = result.from ? result.from : "Unknown";
        // Check if the IP is already encountered in this hop
        if (!(ip in uniqueIPs)) {
          if (ip === trace.dst_addr) {
            destIds.push(idCounter);
          }
          uniqueIPs[ip] = {
            id: idCounter++,
            type: "host",
            minRtt: result.rtt,
            maxRtt: result.rtt,
            name: result.from || "Unknown",
          };
        } else {
          uniqueIPs[ip].minRtt = Math.min(uniqueIPs[ip].minRtt, result.rtt);
          uniqueIPs[ip].maxRtt = Math.max(uniqueIPs[ip].maxRtt, result.rtt);
        }
      });
      if (hopIndex !== hops.length - 1) {
        edges.value.push({ source: idCounter - 1, target: idCounter });
      }
    });
    tempNoddes.push(...Object.values(uniqueIPs));
  });
  tempNoddes.forEach((node, index) => {
    if (destIds.includes(node.id)) {
      destfrom.push(node.name);
      destMinRtt.push(node.minRtt);
      destMaxRtt.push(node.maxRtt);
      tempNoddes.splice(index, 1);
    }
  });
  edges.value.forEach((edge) => {
    if (destIds.includes(edge.target)) {
      edge.target = idCounter;
    }
  });
  tempNoddes.push({
    id: idCounter,
    type: "destination",
    minRtt: Math.min(...destMinRtt),
    maxRtt: Math.max(...destMaxRtt),
    name: destfrom[0],
  });
  nodes.value = tempNoddes;
};*/
let nodeId = 0;
let dstNodes = [];

const graphData = () => {
  tracerouteData.value.forEach((trace) => {
    insertSourceNode(trace);
    trace.result.forEach((hop, index) => {
      let from = [];
      let rtt = [];
      hop.result.forEach((value) => {
        if (value.from) {
          from.push(value.from);
          rtt.push(value.rtt);
        }
        if (value.x) {
          from.push("*");
          rtt.push("N/A");
        }
      });
      if (index !== trace.result.length - 1) {
        insertHostNode({
          from: from[0],
          minRTT: Math.min(...rtt),
          maxRTT: Math.max(...rtt),
        });
      } else {
        storeDestinationNode({
          from: from[0],
          dst: trace.dst_addr,
          minRTT: Math.min(...rtt),
          maxRTT: Math.max(...rtt),
        });
      }
      console.log("-------");
    });
  });
  insertDestinationNode();
};

let targetIds = [];
const storeDestinationNode = (node) => {
  if (!dstNodes.find((n) => n.dst === node.dst)) {
    targetIds.push(nodeId);
    dstNodes.push({
      id: nodeId,
      dst: node.dst,
      name: node.dst,
      minRTT: node.minRTT,
      maxRTT: node.maxRTT,
      type: "target",
    });
  } else {
    dstNodes.forEach((n) => {
      targetIds.push(nodeId);
      if (n.dst === node.dst) {
        n.id = nodeId;
        n.minRTT = Math.min(n.minRTT, node.minRTT);
        n.maxRTT = Math.max(n.maxRTT, node.maxRTT);
      }
    });
  }
};

const insertDestinationNode = () => {
  nodes.value.push(...dstNodes);
  edges.value.forEach((edge) => {
    if (targetIds.includes(edge.target)) {
      edge.target = nodeId;
    }
  });
};

const insertHostNode = (node) => {
  if (
    nodes.value.filter((n) => n.name === node.from).length === 0 ||
    node.from === "*"
  ) {
    nodes.value.push({
      id: nodeId,
      name: node.from,
      minRTT: node.minRTT,
      maxRTT: node.maxRTT,
      type: node.from === "*" ? "timeout" : "host",
    });
    edges.value.push({ source: nodeId, target: nodeId + 1 });
    nodeId++;
  } else {
    let modifyId;
    let targetId = nodeId;
    nodes.value.forEach((n) => {
      if (n.name === node.from) {
        modifyId = n.id;
        n.minRTT = Math.min(n.minRTT, node.minRTT);
        n.maxRTT = Math.max(n.maxRTT, node.maxRTT);
      }
    });
    edges.value.forEach((edge) => {
      if (edge.target === targetId) {
        edge.target = modifyId;
      }
    });
  }
};

const insertSourceNode = (node) => {
  if (!nodes.value.some((n) => n.name === node.name)) {
    nodes.value.push({
      id: nodeId,
      name: node.from,
      type: "source",
    });
  }
  edges.value.push({ source: nodeId, target: nodeId + 1 });
  nodeId++;
};

onMounted(() => {
  fetchTraceData();
});
watch(tracerouteData, () => {
  //generateGraphData();
  graphData();
});
const show = () => {
  console.log(toRaw(nodes.value));
  console.log(toRaw(edges.value));
};
</script>

<template>
  <h1>Traceroute</h1>
  <button @click="show">Show Data</button>
  <Graph :nodes="nodes" :edges="edges" />
</template>
