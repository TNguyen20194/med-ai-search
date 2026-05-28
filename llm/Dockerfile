FROM debian:trixie

ADD ./models /models

RUN apt update && apt install -y build-essential cmake git libcurl4-openssl-dev

WORKDIR /opt/llama
RUN git clone https://github.com/ggerganov/llama.cpp.git && cd llama.cpp

WORKDIR /opt/llama/llama.cpp
RUN cmake -B build -DLLAMA_CURL=OFF && cmake --build build --config Release

ENTRYPOINT [ "/opt/llama/llama.cpp/build/bin/llama-server" ]