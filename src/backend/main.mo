import Text "mo:core/Text";
import Array "mo:core/Array";
import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Iter "mo:core/Iter";
import Runtime "mo:core/Runtime";
import Time "mo:core/Time";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

actor {
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  public type UserProfile = {
    name : Text;
  };

  public type KnowledgeEntry = {
    id : Nat;
    question : Text;
    answer : Text;
  };

  public type ChatMessage = {
    id : Nat;
    sender : Principal;
    message : Text;
    timestamp : Time.Time;
  };

  var nextEntryId = 0;
  var nextMessageId = 0;

  // Persistent storage
  let userProfiles = Map.empty<Principal, UserProfile>();
  let knowledgeBase = Map.empty<Principal, [KnowledgeEntry]>();
  let chatHistory = Map.empty<Principal, [ChatMessage]>();

  // User Profile Management
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Knowledge Base CRUD
  public shared ({ caller }) func addKnowledgeEntry(question : Text, answer : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can add knowledge entries");
    };

    let entry : KnowledgeEntry = {
      id = nextEntryId;
      question;
      answer;
    };

    let existingEntries = switch (knowledgeBase.get(caller)) {
      case (null) { [] };
      case (?entries) { entries };
    };

    knowledgeBase.add(caller, existingEntries.concat([entry]));
    nextEntryId += 1;
  };

  public query ({ caller }) func getKnowledgeEntries() : async [KnowledgeEntry] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view knowledge entries");
    };

    switch (knowledgeBase.get(caller)) {
      case (null) { [] };
      case (?entries) { entries };
    };
  };

  public shared ({ caller }) func updateKnowledgeEntry(id : Nat, question : Text, answer : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can update knowledge entries");
    };

    let entries = switch (knowledgeBase.get(caller)) {
      case (null) { Runtime.trap("Knowledge entry not found ") };
      case (?entries) { entries };
    };

    let updatedEntries = entries.map(
      func(e) {
        if (e.id == id) { { id = e.id; question; answer } } else {
          e;
        };
      }
    );

    knowledgeBase.add(caller, updatedEntries);
  };

  public shared ({ caller }) func deleteKnowledgeEntry(id : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can delete knowledge entries");
    };

    let entries = switch (knowledgeBase.get(caller)) {
      case (null) { Runtime.trap("Knowledge entry not found ") };
      case (?entries) { entries };
    };

    let filteredEntries = entries.filter(func(e) { e.id != id });
    knowledgeBase.add(caller, filteredEntries);
  };

  // Chat Management
  public shared ({ caller }) func addChatMessage(message : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can send chat messages");
    };

    let chatMessage : ChatMessage = {
      id = nextMessageId;
      sender = caller;
      message;
      timestamp = Time.now();
    };

    let existingMessages = switch (chatHistory.get(caller)) {
      case (null) { [] };
      case (?messages) { messages };
    };

    chatHistory.add(caller, (existingMessages.concat([chatMessage])));
    nextMessageId += 1;
  };

  public query ({ caller }) func getChatHistory() : async [ChatMessage] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view chat history");
    };

    switch (chatHistory.get(caller)) {
      case (null) { [] };
      case (?messages) { messages };
    };
  };

  // Search in Knowledge Base (only caller's own knowledge base)
  public query ({ caller }) func searchKnowledge(searchTerm : Text) : async [KnowledgeEntry] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can search knowledge entries");
    };

    let userKnowledge = switch (knowledgeBase.get(caller)) {
      case (null) { [] };
      case (?entries) { entries };
    };

    userKnowledge.filter(
      func(entry) {
        entry.question.toUpper().contains(#text(searchTerm.toUpper())) or
        entry.answer.toUpper().contains(#text(searchTerm.toUpper()));
      }
    );
  };
};
