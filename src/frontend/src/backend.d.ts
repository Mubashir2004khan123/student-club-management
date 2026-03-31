import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Application {
    status: ApplicationStatus;
    appliedAt: Time;
    clubName: string;
    studentName: string;
    applicationId: string;
    email: string;
}
export type Time = bigint;
export interface Event {
    eventId: string;
    title: string;
    clubId: string;
    attendeeCount: bigint;
    date: Time;
    description: string;
    location: string;
}
export interface Member {
    memberId: string;
    clubId: string;
    name: string;
    joinedAt: Time;
    role: Role;
    email: string;
}
export interface Announcement {
    title: string;
    clubId: string;
    content: string;
    createdAt: Time;
    authorName: string;
    announcementId: string;
}
export interface Club {
    clubId: string;
    name: string;
    createdAt: Time;
    memberCount: bigint;
    description: string;
    category: Category;
}
export enum ApplicationStatus {
    pending = "pending",
    approved = "approved",
    rejected = "rejected"
}
export enum Category {
    social = "social",
    arts = "arts",
    academic = "academic",
    sports = "sports"
}
export enum Role {
    admin = "admin",
    leader = "leader",
    student = "student"
}
export interface backendInterface {
    approveApplication(applicationId: string): Promise<void>;
    createAnnouncement(announcementId: string, title: string, content: string, clubId: string, authorName: string): Promise<void>;
    createClub(clubId: string, name: string, description: string, category: Category): Promise<void>;
    createEvent(eventId: string, title: string, description: string, clubId: string, date: Time, location: string): Promise<void>;
    deleteAnnouncement(announcementId: string): Promise<void>;
    deleteClub(clubId: string): Promise<void>;
    deleteEvent(eventId: string): Promise<void>;
    getAnnouncement(announcementId: string): Promise<Announcement>;
    getApplications(): Promise<Array<Application>>;
    getClub(clubId: string): Promise<Club>;
    getEvent(eventId: string): Promise<Event>;
    getMembers(): Promise<Array<Member>>;
    rejectApplication(applicationId: string): Promise<void>;
    updateClub(clubId: string, name: string, description: string, category: Category): Promise<void>;
    updateEvent(eventId: string, title: string, description: string, clubId: string, date: Time, location: string, attendeeCount: bigint): Promise<void>;
}
