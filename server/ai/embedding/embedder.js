const use = require('@tensorflow-models/universal-sentence-encoder');
require('@tensorflow/tfjs');

let model;

// Load once
async function loadModel() {
  if (!model) {
    console.log("🔄 Loading AI Embedding Model...");
    model = await use.load();
    console.log("✅ Embedding Model Loaded");
  }
}

// Generate embedding safely
async function generateEmbedding(text) {
  if (!model) {
    await loadModel();
  }

  const embeddings = await model.embed([text]);
  return embeddings.arraySync()[0];
}

module.exports = generateEmbedding;