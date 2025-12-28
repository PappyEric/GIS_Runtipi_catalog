# Geospatial AI Suite: Private LLMs for GIS

**Geospatial AI Suite** is a self-hosted stack combining **Ollama** (for running local LLMs like Llama 3) and **AnythingLLM** (for RAG and chat interfaces).

## Why use this?
- **Privacy**: Run powerful AI models completely offline. No data is sent to OpenAI or Anthropic.
- **RAG on Data**: Chat with your documents. Upload PDF reports, field manuals, or research papers and get answers with citations.
- **Vector DB Ready**: Pre-configured to use `gis-postgres` (pgvector) as its knowledge base memory store.

## Quick Start
- **First Run**: AnythingLLM will ask for a database connection. Use the `gis-postgres` credentials.
- **Model Download**: Use the AnythingLLM interface to download models (`llama3`, `mistral`, etc.) directly into Ollama.
