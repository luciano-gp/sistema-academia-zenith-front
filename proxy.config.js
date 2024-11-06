const proxy = [
  {
    context: "/",
    target: "http://localhost:8765",
  },
];

module.exports = proxy;
