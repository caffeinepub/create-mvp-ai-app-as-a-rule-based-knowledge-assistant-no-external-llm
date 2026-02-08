# Specification

## Summary
**Goal:** Create an MVP chat-style “AI assistant” that answers deterministically from a user-managed knowledge base using simple keyword matching (no external LLM), with authenticated persistence and a coherent themed UI.

**Planned changes:**
- Build a Chat page where authenticated users ask questions and receive deterministic answers derived from their stored knowledge entries, with a fallback message when nothing matches.
- Implement a Motoko backend to persist per-user knowledge entries (title + body) with full CRUD and to store/retrieve per-user chat history, using stable storage across upgrades.
- Create a Knowledge Base management page to add/edit/delete/list entries, including validation and React Query loading/error states.
- Add an authenticated app shell using Internet Identity, gating data when signed out and providing navigation between Chat and Knowledge Base while keeping session state.
- Apply a consistent productivity-themed UI using Tailwind + shadcn/ui composition, avoiding blue/purple as primary brand colors.
- Add a generated static logo asset and display it in the header and/or sign-in view.

**User-visible outcome:** Users can sign in with Internet Identity, manage their personal knowledge entries, chat with a rule-based assistant that answers from that knowledge, and see their chat history persist across refreshes in a consistently themed app with a custom logo.
