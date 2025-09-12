#!/bin/bash
# install-and-setup-kafka.sh
# Installs Kafka, sets up n brokers from config file, and starts them

CONFIG_FILE="$1"
KAFKA_VERSION="3.6.0"
KAFKA_HOME="/opt/kafka"
ZOOKEEPER_HOME="/opt/zookeeper"

if [[ -z "$CONFIG_FILE" ]]; then
  echo "Usage: $0 /path/to/brokers.json"
  exit 1
fi

# Install prerequisites
sudo apt update
sudo apt install -y openjdk-11-jdk wget tar jq

# Download and extract Kafka
if [[ ! -d "$KAFKA_HOME" ]]; then
  wget -q https://downloads.apache.org/kafka/$KAFKA_VERSION/kafka_2.13-$KAFKA_VERSION.tgz -O /tmp/kafka.tgz
  sudo tar -xzf /tmp/kafka.tgz -C /opt
  sudo mv /opt/kafka_2.13-$KAFKA_VERSION $KAFKA_HOME
fi

# Optional: Install Zookeeper (only for Kafka <= 3.x)
if [[ ! -d "$ZOOKEEPER_HOME" ]]; then
  wget -q https://downloads.apache.org/zookeeper/stable/apache-zookeeper-3.8.3-bin.tar.gz -O /tmp/zookeeper.tgz
  sudo tar -xzf /tmp/zookeeper.tgz -C /opt
  sudo mv /opt/apache-zookeeper-3.8.3-bin $ZOOKEEPER_HOME
fi

# Start Zookeeper (background)
$ZOOKEEPER_HOME/bin/zkServer.sh start

# Function to create server.properties for each broker
create_broker_config() {
  local broker_id=$1
  local host=$2
  local port=$3
  local log_dir=$4
  local broker_conf="$KAFKA_HOME/config/server-$broker_id.properties"

  sudo mkdir -p "$log_dir"

  cat | sudo tee "$broker_conf" > /dev/null <<EOF
broker.id=$broker_id
listeners=PLAINTEXT://$host:$port
log.dirs=$log_dir
num.network.threads=3
num.io.threads=8
socket.send.buffer.bytes=102400
socket.receive.buffer.bytes=102400
socket.request.max.bytes=104857600
log.retention.hours=168
log.segment.bytes=1073741824
log.retention.check.interval.ms=300000
zookeeper.connect=localhost:2181
offsets.topic.replication.factor=2
transaction.state.log.replication.factor=2
transaction.state.log.min.isr=1
EOF

  echo "Generated config for broker $broker_id at $broker_conf"
}

# Parse JSON config
num_brokers=$(jq length "$CONFIG_FILE")
for i in $(seq 0 $((num_brokers - 1))); do
  broker_id=$(jq ".[$i].broker_id" "$CONFIG_FILE")
  host=$(jq -r ".[$i].host" "$CONFIG_FILE")
  port=$(jq -r ".[$i].port" "$CONFIG_FILE")
  log_dir=$(jq -r ".[$i].log_dir" "$CONFIG_FILE")

  create_broker_config "$broker_id" "$host" "$port" "$log_dir"
done

echo "Kafka broker configurations generated."

# Start brokers
for i in $(seq 0 $((num_brokers - 1))); do
  broker_id=$(jq ".[$i].broker_id" "$CONFIG_FILE")
  $KAFKA_HOME/bin/kafka-server-start.sh -daemon $KAFKA_HOME/config/server-$broker_id.properties
  echo "Started broker $broker_id"
done

echo "Kafka cluster setup complete."

# Run it
chmod +x setup-kafka-brokers.sh
./setup-kafka-brokers.sh /path/to/brokers.json /opt/kafka
