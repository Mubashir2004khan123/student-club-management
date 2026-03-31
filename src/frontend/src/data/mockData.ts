import { ApplicationStatus, Category, Role } from "../backend.d";
import type {
  Announcement,
  Application,
  Club,
  Event,
  Member,
} from "../backend.d";

export const mockClubs: Club[] = [
  {
    clubId: "club-1",
    name: "Computer Science Society",
    description:
      "Exploring algorithms, software engineering, and cutting-edge technology through hands-on projects and competitions.",
    category: Category.academic,
    memberCount: BigInt(48),
    createdAt: BigInt(1672531200000),
  },
  {
    clubId: "club-2",
    name: "Photography Club",
    description:
      "Capturing moments and telling stories through the lens. Weekly shoots, darkroom sessions, and portfolio reviews.",
    category: Category.arts,
    memberCount: BigInt(32),
    createdAt: BigInt(1675209600000),
  },
  {
    clubId: "club-3",
    name: "Robotics & AI Lab",
    description:
      "Building autonomous robots, competing in national championships, and researching artificial intelligence applications.",
    category: Category.academic,
    memberCount: BigInt(27),
    createdAt: BigInt(1677628800000),
  },
  {
    clubId: "club-4",
    name: "Basketball Warriors",
    description:
      "Competitive basketball team participating in inter-university leagues. Practice sessions three times a week.",
    category: Category.sports,
    memberCount: BigInt(22),
    createdAt: BigInt(1680307200000),
  },
  {
    clubId: "club-5",
    name: "Drama & Theatre Arts",
    description:
      "Producing original plays and adaptations, acting workshops, and performing at university events and festivals.",
    category: Category.arts,
    memberCount: BigInt(36),
    createdAt: BigInt(1682899200000),
  },
  {
    clubId: "club-6",
    name: "International Students Circle",
    description:
      "Fostering cross-cultural friendships, language exchange, and celebrating global traditions.",
    category: Category.social,
    memberCount: BigInt(61),
    createdAt: BigInt(1685577600000),
  },
  {
    clubId: "club-7",
    name: "Debate Society",
    description:
      "Sharpening critical thinking, public speaking, and argumentation through weekly debates and national tournaments.",
    category: Category.academic,
    memberCount: BigInt(19),
    createdAt: BigInt(1688169600000),
  },
  {
    clubId: "club-8",
    name: "Green Campus Initiative",
    description:
      "Promoting sustainability, organizing eco-drives, and working toward a carbon-neutral campus.",
    category: Category.social,
    memberCount: BigInt(44),
    createdAt: BigInt(1690848000000),
  },
];

export const mockEvents: Event[] = [
  {
    eventId: "evt-1",
    title: "Annual Hackathon 2026",
    description:
      "24-hour coding challenge with prizes worth $5000. Open to all CS and engineering students.",
    clubId: "club-1",
    date: BigInt(1741996800000),
    location: "Engineering Block, Lab 301",
    attendeeCount: BigInt(85),
  },
  {
    eventId: "evt-2",
    title: "Spring Photography Exhibition",
    description:
      "Annual showcase of the best work from our members. Free entry, refreshments provided.",
    clubId: "club-2",
    date: BigInt(1742256000000),
    location: "Art Gallery, Main Building",
    attendeeCount: BigInt(120),
  },
  {
    eventId: "evt-3",
    title: "Robot Wars Championship",
    description:
      "Inter-university robot combat competition. Watch our team compete for the regional title.",
    clubId: "club-3",
    date: BigInt(1742601600000),
    location: "Sports Arena, East Campus",
    attendeeCount: BigInt(200),
  },
  {
    eventId: "evt-4",
    title: "Inter-University Basketball Tournament",
    description:
      "Three-day basketball tournament featuring 12 universities. Come cheer for the Warriors!",
    clubId: "club-4",
    date: BigInt(1742860800000),
    location: "University Sports Complex",
    attendeeCount: BigInt(350),
  },
  {
    eventId: "evt-5",
    title: "Midsummer Night's Dream — Live Performance",
    description:
      "Our award-winning production of Shakespeare's classic comedy. Two nights only.",
    clubId: "club-5",
    date: BigInt(1743120000000),
    location: "Amphitheatre, Central Campus",
    attendeeCount: BigInt(180),
  },
  {
    eventId: "evt-6",
    title: "World Cultures Food Festival",
    description:
      "Taste dishes from 30+ countries, cultural performances, and language exchange booths.",
    clubId: "club-6",
    date: BigInt(1743379200000),
    location: "University Quad",
    attendeeCount: BigInt(450),
  },
  {
    eventId: "evt-7",
    title: "Grand Debate: AI vs Human Creativity",
    description:
      "Watch our best debaters tackle the most pressing philosophical question of our time.",
    clubId: "club-7",
    date: BigInt(1743638400000),
    location: "Lecture Hall A, Building 2",
    attendeeCount: BigInt(95),
  },
  {
    eventId: "evt-8",
    title: "Campus Green Day",
    description:
      "Tree planting drive, waste sorting workshops, and eco-fair with student-run sustainable businesses.",
    clubId: "club-8",
    date: BigInt(1743897600000),
    location: "North Campus Gardens",
    attendeeCount: BigInt(130),
  },
];

export const mockMembers: Member[] = [
  {
    memberId: "mem-1",
    name: "Alexandra Chen",
    email: "a.chen@university.edu",
    role: Role.admin,
    clubId: "club-1",
    joinedAt: BigInt(1672531200000),
  },
  {
    memberId: "mem-2",
    name: "James Okafor",
    email: "j.okafor@university.edu",
    role: Role.leader,
    clubId: "club-2",
    joinedAt: BigInt(1675209600000),
  },
  {
    memberId: "mem-3",
    name: "Priya Sharma",
    email: "p.sharma@university.edu",
    role: Role.student,
    clubId: "club-1",
    joinedAt: BigInt(1677628800000),
  },
  {
    memberId: "mem-4",
    name: "Marcus Webb",
    email: "m.webb@university.edu",
    role: Role.student,
    clubId: "club-4",
    joinedAt: BigInt(1680307200000),
  },
  {
    memberId: "mem-5",
    name: "Sofia Rodriguez",
    email: "s.rodriguez@university.edu",
    role: Role.leader,
    clubId: "club-5",
    joinedAt: BigInt(1682899200000),
  },
  {
    memberId: "mem-6",
    name: "Liam Nguyen",
    email: "l.nguyen@university.edu",
    role: Role.student,
    clubId: "club-6",
    joinedAt: BigInt(1685577600000),
  },
  {
    memberId: "mem-7",
    name: "Amara Diallo",
    email: "a.diallo@university.edu",
    role: Role.student,
    clubId: "club-3",
    joinedAt: BigInt(1688169600000),
  },
  {
    memberId: "mem-8",
    name: "Tom Harrison",
    email: "t.harrison@university.edu",
    role: Role.leader,
    clubId: "club-7",
    joinedAt: BigInt(1690848000000),
  },
  {
    memberId: "mem-9",
    name: "Yuki Tanaka",
    email: "y.tanaka@university.edu",
    role: Role.student,
    clubId: "club-2",
    joinedAt: BigInt(1693526400000),
  },
  {
    memberId: "mem-10",
    name: "Emma Larsson",
    email: "e.larsson@university.edu",
    role: Role.student,
    clubId: "club-8",
    joinedAt: BigInt(1696118400000),
  },
  {
    memberId: "mem-11",
    name: "Carlos Mendoza",
    email: "c.mendoza@university.edu",
    role: Role.student,
    clubId: "club-1",
    joinedAt: BigInt(1698796800000),
  },
  {
    memberId: "mem-12",
    name: "Nadia Petrov",
    email: "n.petrov@university.edu",
    role: Role.student,
    clubId: "club-6",
    joinedAt: BigInt(1701388800000),
  },
];

export const mockAnnouncements: Announcement[] = [
  {
    announcementId: "ann-1",
    title: "Hackathon Registration Now Open",
    content:
      "Registration for Annual Hackathon 2026 is now open. Register your team of 2-4 before March 20th. Prizes include cash awards, internship opportunities, and equipment grants. Visit the CS Society portal to sign up.",
    clubId: "club-1",
    authorName: "Alexandra Chen",
    createdAt: BigInt(1741564800000),
  },
  {
    announcementId: "ann-2",
    title: "New Photography Equipment Available",
    content:
      "We have just received 5 new Canon EOS R6 Mark II cameras and a full lighting kit, available for member checkout from the equipment room. Please book at least 48 hours in advance through our booking system.",
    clubId: "club-2",
    authorName: "James Okafor",
    createdAt: BigInt(1741478400000),
  },
  {
    announcementId: "ann-3",
    title: "Sustainability Grant Awarded",
    content:
      "We are thrilled to announce that Green Campus Initiative has been awarded a $12,000 sustainability grant from the University Foundation. These funds will go toward our solar panel installation project on the east rooftop.",
    clubId: "club-8",
    authorName: "Emma Larsson",
    createdAt: BigInt(1741219200000),
  },
  {
    announcementId: "ann-4",
    title: "Drama Auditions — All Welcome",
    content:
      "Auditions for our spring production are open to ALL students, regardless of experience. Bring a 2-minute monologue or we will provide one on the day. Auditions run from 4-7pm in the Drama Studio this Friday.",
    clubId: "club-5",
    authorName: "Sofia Rodriguez",
    createdAt: BigInt(1740960000000),
  },
  {
    announcementId: "ann-5",
    title: "Robot Wars Team Selection",
    content:
      "Final selection for the Robot Wars Championship team is this Sunday at 2pm in Lab 204. All members who have been attending build sessions are eligible. We will be selecting 6 primary team members and 3 alternates.",
    clubId: "club-3",
    authorName: "Amara Diallo",
    createdAt: BigInt(1740700800000),
  },
  {
    announcementId: "ann-6",
    title: "Basketball Practice Schedule Update",
    content:
      "Following our gym renovation, practice is temporarily moved to the outdoor courts. New schedule: Tuesday 6-8pm, Thursday 6-8pm, and Saturday 10am-12pm. Please bring both indoor and outdoor shoes.",
    clubId: "club-4",
    authorName: "Marcus Webb",
    createdAt: BigInt(1740441600000),
  },
];

export const mockApplications: Application[] = [
  {
    applicationId: "app-1",
    studentName: "Oliver Bennett",
    email: "o.bennett@university.edu",
    clubName: "Computer Science Society",
    appliedAt: BigInt(1741737600000),
    status: ApplicationStatus.pending,
  },
  {
    applicationId: "app-2",
    studentName: "Isabella Martins",
    email: "i.martins@university.edu",
    clubName: "Photography Club",
    appliedAt: BigInt(1741651200000),
    status: ApplicationStatus.pending,
  },
  {
    applicationId: "app-3",
    studentName: "Ryan Kim",
    email: "r.kim@university.edu",
    clubName: "Debate Society",
    appliedAt: BigInt(1741564800000),
    status: ApplicationStatus.approved,
  },
  {
    applicationId: "app-4",
    studentName: "Fatima Al-Hassan",
    email: "f.alhassan@university.edu",
    clubName: "Green Campus Initiative",
    appliedAt: BigInt(1741478400000),
    status: ApplicationStatus.pending,
  },
  {
    applicationId: "app-5",
    studentName: "Noah Fischer",
    email: "n.fischer@university.edu",
    clubName: "Robotics & AI Lab",
    appliedAt: BigInt(1741392000000),
    status: ApplicationStatus.rejected,
  },
  {
    applicationId: "app-6",
    studentName: "Chloe Dupont",
    email: "c.dupont@university.edu",
    clubName: "Drama & Theatre Arts",
    appliedAt: BigInt(1741305600000),
    status: ApplicationStatus.pending,
  },
  {
    applicationId: "app-7",
    studentName: "Ethan Williams",
    email: "e.williams@university.edu",
    clubName: "Basketball Warriors",
    appliedAt: BigInt(1741219200000),
    status: ApplicationStatus.approved,
  },
];

export const clubNameMap: Record<string, string> = Object.fromEntries(
  mockClubs.map((c) => [c.clubId, c.name]),
);
