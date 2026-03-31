import Map "mo:core/Map";
import Set "mo:core/Set";
import Text "mo:core/Text";
import Array "mo:core/Array";
import Iter "mo:core/Iter";
import Order "mo:core/Order";
import Time "mo:core/Time";
import Runtime "mo:core/Runtime";

actor {
  module Club {
    public type Category = {
      #academic;
      #sports;
      #arts;
      #social;
    };

    public type Club = {
      clubId : Text;
      name : Text;
      description : Text;
      category : Category;
      memberCount : Nat;
      createdAt : Time.Time;
    };

    public func compare(club1 : Club, club2 : Club) : Order.Order {
      Text.compare(club1.clubId, club2.clubId);
    };
  };

  module Event {
    public type Event = {
      eventId : Text;
      title : Text;
      description : Text;
      clubId : Text;
      date : Time.Time;
      location : Text;
      attendeeCount : Nat;
    };

    public func compare(event1 : Event, event2 : Event) : Order.Order {
      Text.compare(event1.eventId, event2.eventId);
    };
  };

  module Member {
    public type Role = {
      #student;
      #leader;
      #admin;
    };

    public type Member = {
      memberId : Text;
      name : Text;
      email : Text;
      role : Role;
      clubId : Text;
      joinedAt : Time.Time;
    };
  };

  module Announcement {
    public type Announcement = {
      announcementId : Text;
      title : Text;
      content : Text;
      clubId : Text;
      createdAt : Time.Time;
      authorName : Text;
    };

    public func compare(announcement1 : Announcement, announcement2 : Announcement) : Order.Order {
      Text.compare(announcement1.announcementId, announcement2.announcementId);
    };
  };

  module Application {
    public type ApplicationStatus = {
      #pending;
      #approved;
      #rejected;
    };

    public type Application = {
      applicationId : Text;
      studentName : Text;
      email : Text;
      clubName : Text;
      appliedAt : Time.Time;
      status : ApplicationStatus;
    };

    public func compare(application1 : Application, application2 : Application) : Order.Order {
      Text.compare(application1.applicationId, application2.applicationId);
    };
  };

  module Report {
    public type Report = {
      totalClubs : Nat;
      totalMembers : Nat;
      totalEvents : Nat;
      activeApplications : Nat;
    };
  };

  let clubs = Map.empty<Text, Club.Club>();
  let events = Map.empty<Text, Event.Event>();
  let members = Map.empty<Text, Member.Member>();
  let announcements = Map.empty<Text, Announcement.Announcement>();
  let applications = Map.empty<Text, Application.Application>();

  // Clubs CRUD
  public shared ({ caller }) func createClub(clubId : Text, name : Text, description : Text, category : Club.Category) : async () {
    if (clubs.containsKey(clubId)) { Runtime.trap("Club already exists") };
    let club : Club.Club = {
      clubId;
      name;
      description;
      category;
      memberCount = 0;
      createdAt = Time.now();
    };
    clubs.add(clubId, club);
  };

  public query ({ caller }) func getClub(clubId : Text) : async Club.Club {
    switch (clubs.get(clubId)) {
      case (null) { Runtime.trap("Club not found") };
      case (?club) { club };
    };
  };

  public shared ({ caller }) func updateClub(clubId : Text, name : Text, description : Text, category : Club.Category) : async () {
    switch (clubs.get(clubId)) {
      case (null) { Runtime.trap("Club not found") };
      case (?club) {
        let updatedClub : Club.Club = {
          clubId = club.clubId;
          name;
          description;
          category;
          memberCount = club.memberCount;
          createdAt = club.createdAt;
        };
        clubs.add(clubId, updatedClub);
      };
    };
  };

  public shared ({ caller }) func deleteClub(clubId : Text) : async () {
    if (not clubs.containsKey(clubId)) { Runtime.trap("Club not found") };
    clubs.remove(clubId);
  };

  // Events CRUD
  public shared ({ caller }) func createEvent(eventId : Text, title : Text, description : Text, clubId : Text, date : Time.Time, location : Text) : async () {
    if (events.containsKey(eventId)) { Runtime.trap("Event already exists") };
    let event : Event.Event = {
      eventId;
      title;
      description;
      clubId;
      date;
      location;
      attendeeCount = 0;
    };
    events.add(eventId, event);
  };

  public query ({ caller }) func getEvent(eventId : Text) : async Event.Event {
    switch (events.get(eventId)) {
      case (null) { Runtime.trap("Event not found") };
      case (?event) { event };
    };
  };

  public shared ({ caller }) func updateEvent(eventId : Text, title : Text, description : Text, clubId : Text, date : Time.Time, location : Text, attendeeCount : Nat) : async () {
    switch (events.get(eventId)) {
      case (null) { Runtime.trap("Event not found") };
      case (?event) {
        let updatedEvent : Event.Event = {
          eventId;
          title;
          description;
          clubId;
          date;
          location;
          attendeeCount;
        };
        events.add(eventId, updatedEvent);
      };
    };
  };

  public shared ({ caller }) func deleteEvent(eventId : Text) : async () {
    if (not events.containsKey(eventId)) { Runtime.trap("Event not found") };
    events.remove(eventId);
  };

  // Members - Read Only
  public query ({ caller }) func getMembers() : async [Member.Member] {
    members.values().toArray().filter(func(m) { m.role == #student });
  };

  // Announcements CRUD
  public shared ({ caller }) func createAnnouncement(announcementId : Text, title : Text, content : Text, clubId : Text, authorName : Text) : async () {
    if (announcements.containsKey(announcementId)) { Runtime.trap("Announcement already exists") };
    let announcement : Announcement.Announcement = {
      announcementId;
      title;
      content;
      clubId;
      createdAt = Time.now();
      authorName;
    };
    announcements.add(announcementId, announcement);
  };

  public query ({ caller }) func getAnnouncement(announcementId : Text) : async Announcement.Announcement {
    switch (announcements.get(announcementId)) {
      case (null) { Runtime.trap("Announcement not found") };
      case (?announcement) { announcement };
    };
  };

  public shared ({ caller }) func deleteAnnouncement(announcementId : Text) : async () {
    if (not announcements.containsKey(announcementId)) { Runtime.trap("Announcement not found") };
    announcements.remove(announcementId);
  };

  // Applications - Read Only & Status Update
  public query ({ caller }) func getApplications() : async [Application.Application] {
    applications.values().toArray().sort();
  };

  public shared ({ caller }) func approveApplication(applicationId : Text) : async () {
    switch (applications.get(applicationId)) {
      case (null) { Runtime.trap("Application not found") };
      case (?application) {
        let updatedApplication : Application.Application = {
          applicationId = application.applicationId;
          studentName = application.studentName;
          email = application.email;
          clubName = application.clubName;
          appliedAt = application.appliedAt;
          status = #approved;
        };
        applications.add(applicationId, updatedApplication);
      };
    };
  };

  public shared ({ caller }) func rejectApplication(applicationId : Text) : async () {
    switch (applications.get(applicationId)) {
      case (null) { Runtime.trap("Application not found") };
      case (?application) {
        let updatedApplication : Application.Application = {
          applicationId = application.applicationId;
          studentName = application.studentName;
          email = application.email;
          clubName = application.clubName;
          appliedAt = application.appliedAt;
          status = #rejected;
        };
        applications.add(applicationId, updatedApplication);
      };
    };
  };
};
