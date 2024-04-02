import { reactive } from "vue";

const nodes = [
  {
    id: 0,
    type: "source",
    minRtt: 0,
    maxRtt: 0,
    name: "175.158.45.67",
  },
  {
    id: 1,
    type: "host",
    minRtt: 1.902,
    maxRtt: 3.095,
    name: "192.168.1.1",
  },
  {
    id: 2,
    type: "host",
    minRtt: null,
    maxRtt: null,
    name: "Unknown",
  },
  {
    id: 3,
    type: "host",
    minRtt: 11.762,
    maxRtt: 25.947,
    name: "45.126.80.111",
  },
  {
    id: 4,
    type: "host",
    minRtt: 7.507,
    maxRtt: 12.601,
    name: "103.61.249.205",
  },
  {
    id: 5,
    type: "host",
    minRtt: 6.071,
    maxRtt: 20.293,
    name: "125.208.158.65",
  },
  {
    id: 6,
    type: "host",
    minRtt: 8.059,
    maxRtt: 16.617,
    name: "125.208.162.101",
  },
  {
    id: 7,
    type: "host",
    minRtt: 11.56,
    maxRtt: 19.086,
    name: "210.210.161.254",
  },
  {
    id: 8,
    type: "host",
    minRtt: 8.203,
    maxRtt: 17.549,
    name: "202.158.22.19",
  },
  {
    id: 10,
    type: "source",
    minRtt: 0,
    maxRtt: 0,
    name: "108.136.65.104",
  },
  {
    id: 11,
    type: "host",
    minRtt: 0.583,
    maxRtt: 8.936,
    name: "244.5.0.3",
  },
  {
    id: 12,
    type: "host",
    minRtt: 0.256,
    maxRtt: 0.322,
    name: "240.0.144.4",
  },
  {
    id: 13,
    type: "host",
    minRtt: 1.593,
    maxRtt: 2.471,
    name: "242.1.178.1",
  },
  {
    id: 14,
    type: "host",
    minRtt: 1.45,
    maxRtt: 1.601,
    name: "240.0.136.13",
  },
  {
    id: 15,
    type: "host",
    minRtt: 1.644,
    maxRtt: 1.855,
    name: "242.1.164.129",
  },
  {
    id: 16,
    type: "host",
    minRtt: 2.125,
    maxRtt: 2.237,
    name: "119.11.184.88",
  },
  {
    id: 17,
    type: "host",
    minRtt: 2.108,
    maxRtt: 2.345,
    name: "119.11.184.8",
  },
  {
    id: 19,
    type: "source",
    minRtt: 0,
    maxRtt: 0,
    name: "123.255.202.55",
  },
  {
    id: 20,
    type: "host",
    minRtt: 0.269,
    maxRtt: 0.346,
    name: "10.50.50.1",
  },
  {
    id: 21,
    type: "host",
    minRtt: 0.313,
    maxRtt: 0.363,
    name: "123.255.202.5",
  },
  {
    id: 22,
    type: "host",
    minRtt: 12.928,
    maxRtt: 12.987,
    name: "203.89.24.97",
  },
  {
    id: 23,
    type: "host",
    minRtt: 13.817,
    maxRtt: 14,
    name: "103.28.75.134",
  },
  {
    id: 25,
    type: "source",
    minRtt: 0,
    maxRtt: 0,
    name: "103.58.103.21",
  },
  {
    id: 26,
    type: "host",
    minRtt: 0.624,
    maxRtt: 0.839,
    name: "192.168.69.1",
  },
  {
    id: 27,
    type: "host",
    minRtt: 9.3,
    maxRtt: 14.235,
    name: "103.58.103.22",
  },
  {
    id: 28,
    type: "host",
    minRtt: 0.754,
    maxRtt: 1.128,
    name: "137.59.127.165",
  },
  {
    id: 29,
    type: "host",
    minRtt: 2.035,
    maxRtt: 11.228,
    name: "137.59.127.117",
  },
  {
    id: 30,
    type: "host",
    minRtt: 1.298,
    maxRtt: 1.759,
    name: "182.253.239.157",
  },
  {
    id: 31,
    type: "host",
    minRtt: 1.495,
    maxRtt: 1.78,
    name: "116.199.193.49",
  },
  {
    id: 32,
    type: "host",
    minRtt: 1.717,
    maxRtt: 6.837,
    name: "103.28.75.134",
  },
  {
    id: 34,
    type: "source",
    minRtt: 0,
    maxRtt: 0,
    name: "103.23.232.7",
  },
  {
    id: 35,
    type: "host",
    minRtt: 0.304,
    maxRtt: 0.324,
    name: "103.23.232.1",
  },
  {
    id: 36,
    type: "host",
    minRtt: 2.189,
    maxRtt: 4.192,
    name: "36.93.255.177",
  },
  {
    id: 37,
    type: "host",
    minRtt: null,
    maxRtt: null,
    name: "Unknown",
  },
  {
    id: 38,
    type: "host",
    minRtt: 17.443,
    maxRtt: 17.568,
    name: "36.93.254.226",
  },
  {
    id: 40,
    type: "destination",
    minRtt: 1.572,
    maxRtt: 19.635,
    name: "45.60.158.227",
  },
];

const edges = [
  {
    source: 0,
    target: 1,
  },
  {
    source: 1,
    target: 2,
  },
  {
    source: 2,
    target: 3,
  },
  {
    source: 3,
    target: 4,
  },
  {
    source: 4,
    target: 5,
  },
  {
    source: 5,
    target: 6,
  },
  {
    source: 6,
    target: 7,
  },
  {
    source: 7,
    target: 8,
  },
  {
    source: 8,
    target: 40,
  },
  {
    source: 10,
    target: 11,
  },
  {
    source: 11,
    target: 12,
  },
  {
    source: 12,
    target: 13,
  },
  {
    source: 13,
    target: 14,
  },
  {
    source: 14,
    target: 15,
  },
  {
    source: 15,
    target: 16,
  },
  {
    source: 16,
    target: 17,
  },
  {
    source: 17,
    target: 40,
  },
  {
    source: 19,
    target: 20,
  },
  {
    source: 20,
    target: 21,
  },
  {
    source: 21,
    target: 22,
  },
  {
    source: 22,
    target: 23,
  },
  {
    source: 23,
    target: 40,
  },
  {
    source: 25,
    target: 26,
  },
  {
    source: 26,
    target: 27,
  },
  {
    source: 27,
    target: 28,
  },
  {
    source: 28,
    target: 29,
  },
  {
    source: 29,
    target: 30,
  },
  {
    source: 30,
    target: 31,
  },
  {
    source: 31,
    target: 32,
  },
  {
    source: 32,
    target: 40,
  },
  {
    source: 34,
    target: 35,
  },
  {
    source: 35,
    target: 36,
  },
  {
    source: 36,
    target: 37,
  },
  {
    source: 37,
    target: 38,
  },
  {
    source: 38,
    target: 40,
  },
];

const layouts = reactive({
  nodes: {},
});

export default {
  nodes,
  edges,
  layouts,
};
