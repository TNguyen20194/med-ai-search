#!/bin/bash
set -e

MODEL_DIR="/models"
MODEL_FILE="${MODEL_FILE:-qwen2.5-1.5b-instruct-q4_k_m.gguf}"
MODEL_PATH="${MODEL_DIR}/${MODEL_FILE}"
MODEL_URL="${MODEL_URL:-https://huggingface.co/Qwen/Qwen2.5-1.5B-Instruct-GGUF/resolve/main/qwen2.5-1.5b-instruct-q4_k_m.gguf}"

if [ ! -f "${MODEL_PATH}" ]; then
    echo "==> Model not found at ${MODEL_PATH}"
    echo "==> Downloading from: ${MODEL_URL}"
    mkdir -p "${MODEL_DIR}"
    wget --progress=bar:force -O "${MODEL_PATH}" "${MODEL_URL}" || {
        echo "ERROR: Download failed. Check MODEL_URL or mount a pre-downloaded model."
        rm -f "${MODEL_PATH}"
        exit 1
    }
    echo "==> Model downloaded successfully."
else
    echo "==> Model found at ${MODEL_PATH}, skipping download."
fi

echo "==> Starting llama-server..."
exec llama-server \
    --model "${MODEL_PATH}" \
    --ctx-size "${CTX_SIZE:-2048}" \
    --threads "${THREADS:-4}" \
    --host "0.0.0.0" \
    --port "${PORT:-8000}" \
    ${EXTRA_ARGS:-}
