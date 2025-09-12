#!/bin/bash
# deploy-redis-cluster.sh
# Usage: ./deploy-redis-cluster.sh <master_ip> <replica_ip1,replica_ip2,...> <config_dir> <ssh_user>
# Example: ./deploy-redis-cluster.sh 10.0.0.1 10.0.0.2,10.0.0.3 ./configs ubuntu

set -e

MASTER_IP="$1"
REPLICAS="$2"
CONFIG_DIR="$3"
SSH_USER="$4"

if [[ -z "$MASTER_IP" || -z "$REPLICAS" || -z "$SSH_USER" ]]; then
    echo "Usage: $0 <master_ip> <replica_ip1,replica_ip2,...> <config_dir> <ssh_user>"
    exit 1
fi

REPLICA_IPS=(${REPLICAS//,/ })

install_and_start_redis() {
    local ROLE="$1"
    local TARGET_IP="$2"
    local MASTER="$3"

    echo "Deploying Redis ($ROLE) on $TARGET_IP..."
    
    # Copy configs if master
    local CONFIG_CMD=""
    if [[ "$ROLE" == "master" ]]; then
        CONFIG_CMD="mkdir -p ~/configs && scp -r $CONFIG_DIR/* $SSH_USER@$TARGET_IP:~/configs/"
    fi

    ssh $SSH_USER@$TARGET_IP bash -c "'
        set -e
        echo \"Installing Redis...\"
        if ! command -v redis-server &> /dev/null; then
            sudo apt-get update
            sudo apt-get install -y redis-server jq
        fi

        BASE_DIR=\"\$HOME/redis\"
        [[ \"$ROLE\" == \"master\" ]] && DIR=\"\$BASE_DIR/master\" || DIR=\"\$BASE_DIR/replica\"
        mkdir -p \$DIR

        CONF_FILE=\$DIR/redis.conf
        cat > \$CONF_FILE <<EOF
port 6379
dir \$DIR
daemonize yes
logfile \$DIR/redis.log
dbfilename dump.rdb
appendonly yes
EOF

        if [[ \"$ROLE\" == \"replica\" ]]; then
            echo \"replicaof $MASTER 6379\" >> \$CONF_FILE
        fi

        echo \"Starting Redis...\"
        redis-server \$CONF_FILE

        if [[ \"$ROLE\" == \"master\" && -d ~/configs ]]; then
            echo \"Loading JSON configs...\"
            for json_file in ~/configs/*.json; do
                [[ -e \$json_file ]] || continue
                jq -r 'to_entries|map(\"SET \(.key) \(.value)\")|.[]' \$json_file | redis-cli -p 6379
            done
        fi
    '"
}

# ---------------------------
# 1. Deploy Master
# ---------------------------
install_and_start_redis "master" "$MASTER_IP"

# ---------------------------
# 2. Deploy Replicas
# ---------------------------
for ip in "${REPLICA_IPS[@]}"; do
    install_and_start_redis "replica" "$ip" "$MASTER_IP"
done

echo "Redis cluster deployment complete!"
echo "Master: $MASTER_IP"
echo "Replicas: ${REPLICA_IPS[*]}"
