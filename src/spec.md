# Specification

## Summary
**Goal:** Add pre-chat quick options on the Chat page empty state to guide a user’s first message.

**Planned changes:**
- Show four selectable options (“Study”, “Knowledge”, “Research”, “Other”) in the Chat page empty-state UI only when there are zero chat messages and the chat is not loading.
- Make each option prefill the message Textarea with an appropriate short English prompt, without sending, and focus the Textarea for editing.
- Style the options using existing design system components to fit the current theme (light/dark) and keep the empty-state layout responsive on mobile/desktop.

**User-visible outcome:** Before starting a new chat, users can click Study/Knowledge/Research/Other to prefill a starter prompt in the input (focused and editable) and then send it normally.
