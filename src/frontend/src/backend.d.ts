import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface ChatMessage {
    id: bigint;
    sender: Principal;
    message: string;
    timestamp: Time;
}
export type Time = bigint;
export interface UserProfile {
    name: string;
}
export interface KnowledgeEntry {
    id: bigint;
    question: string;
    answer: string;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addChatMessage(message: string): Promise<void>;
    addKnowledgeEntry(question: string, answer: string): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    deleteKnowledgeEntry(id: bigint): Promise<void>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getChatHistory(): Promise<Array<ChatMessage>>;
    getKnowledgeEntries(): Promise<Array<KnowledgeEntry>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    searchKnowledge(searchTerm: string): Promise<Array<KnowledgeEntry>>;
    updateKnowledgeEntry(id: bigint, question: string, answer: string): Promise<void>;
}
