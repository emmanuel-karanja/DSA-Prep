/**Used for managing topics in Kafka. Load info from a jsonConfig like this below
 * 
 * This also verifies if the partitions need to be increased or reduced and confirms brokers
 * [
  { "topic": "topicA", "numPartitions": 3, "replicationFactor": 1 },
  { "topic": "topicB", "numPartitions": 5, "replicationFactor": 1 },
  { "topic": "topicC", "numPartitions": 4, "replicationFactor": 1 }
]

 */
const { Kafka } = require("kafkajs");
const fs = require("fs");
const path = require("path");

// Kafka connection config
const kafka = new Kafka({
  clientId: "topic-manager",
  brokers: ["localhost:9092"], // replace with your broker list e.g. 198.172.0.11:9092 or 198.172.0.12:9092
});

const admin = kafka.admin();

// Load topics from JSON
const topicsFile = path.join(__dirname, "topics.json");
let topicsToManage;

try {
  const data = fs.readFileSync(topicsFile, "utf-8");
  topicsToManage = JSON.parse(data);
} catch (err) {
  console.error("Failed to read topics.json:", err);
  process.exit(1);
}

async function manageTopics() {
  await admin.connect();

  try {
    // Fetch cluster info
    const cluster = await admin.describeCluster();
    const numBrokers = cluster.brokers.length;

    // Fetch existing topics metadata
    const metadata = await admin.fetchTopicMetadata();
    const existingTopics = metadata.topics.reduce((acc, t) => {
      acc[t.name] = t.partitions.length;
      return acc;
    }, {});

    for (const t of topicsToManage) {
      if (t.replicationFactor > numBrokers) {
        console.warn(
          `Skipping topic "${t.topic}": replication factor (${t.replicationFactor}) exceeds number of brokers (${numBrokers})`
        );
        continue;
      }

      const currentPartitions = existingTopics[t.topic];

      if (!currentPartitions) {
        // Topic does not exist, create it
        await admin.createTopics({
          topics: [{
            topic: t.topic,
            numPartitions: t.numPartitions,
            replicationFactor: t.replicationFactor
          }]
        });
        console.log(`Created topic "${t.topic}" with ${t.numPartitions} partitions and replication factor ${t.replicationFactor}`);
      } else if (currentPartitions < t.numPartitions) {
        // Topic exists but has fewer partitions, increase partitions
        await admin.createPartitions({
          topicPartitions: [{
            topic: t.topic,
            count: t.numPartitions
          }]
        });
        console.log(`Increased partitions of "${t.topic}" from ${currentPartitions} to ${t.numPartitions}`);
      } else {
        console.log(`Topic "${t.topic}" already exists with ${currentPartitions} partitions`);
      }
    }
  } catch (err) {
    console.error("Error managing topics:", err);
  } finally {
    await admin.disconnect();
  }
}

// Run
manageTopics();
