import CategoryBadge from "@/components/shared/CategoryBadge";
import RoleBadge from "@/components/shared/RoleBadge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { mockClubs, mockEvents, mockMembers } from "@/data/mockData";
import { useNavigate, useParams } from "@tanstack/react-router";
import { ArrowLeft, CalendarDays, MapPin, Users } from "lucide-react";

function formatDate(ts: bigint) {
  return new Date(Number(ts)).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function ClubDetails() {
  const { clubId } = useParams({ strict: false }) as { clubId: string };
  const navigate = useNavigate();
  const club = mockClubs.find((c) => c.clubId === clubId);

  if (!club) {
    return (
      <div className="text-center py-20">
        <p className="text-muted-foreground">Club not found.</p>
        <Button className="mt-4" onClick={() => navigate({ to: "/clubs" })}>
          Back to Clubs
        </Button>
      </div>
    );
  }

  const members = mockMembers.filter((m) => m.clubId === clubId);
  const events = mockEvents.filter((e) => e.clubId === clubId);

  return (
    <div className="space-y-6 max-w-5xl">
      <button
        type="button"
        onClick={() => navigate({ to: "/clubs" })}
        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        data-ocid="club_details.back.button"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Clubs
      </button>

      <Card className="shadow-card">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="font-display text-2xl font-bold">{club.name}</h1>
            <CategoryBadge category={club.category} />
          </div>
          <p className="text-muted-foreground">{club.description}</p>
          <div className="flex items-center gap-4 mt-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Users className="w-4 h-4" />
              {Number(club.memberCount)} members
            </span>
            <span>Founded {formatDate(club.createdAt)}</span>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="font-display text-base">
            Members ({members.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {members.length === 0 ? (
            <div
              className="text-center py-8 text-muted-foreground text-sm"
              data-ocid="club_details.members.empty_state"
            >
              No members yet.
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Joined</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {members.map((m, i) => (
                  <TableRow
                    key={m.memberId}
                    data-ocid={`club_details.members.row.${i + 1}`}
                  >
                    <TableCell className="font-medium">{m.name}</TableCell>
                    <TableCell className="text-muted-foreground">
                      {m.email}
                    </TableCell>
                    <TableCell>
                      <RoleBadge role={m.role} />
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {formatDate(m.joinedAt)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="font-display text-base">
            Events ({events.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {events.length === 0 ? (
            <div
              className="text-center py-8 text-muted-foreground text-sm"
              data-ocid="club_details.events.empty_state"
            >
              No events yet.
            </div>
          ) : (
            events.map((evt) => (
              <div
                key={evt.eventId}
                className="flex items-start gap-3 p-3 rounded-lg bg-muted/30"
              >
                <CalendarDays className="w-4 h-4 text-primary mt-0.5" />
                <div>
                  <p className="font-medium text-sm">{evt.title}</p>
                  <p className="text-xs text-muted-foreground flex items-center gap-2 mt-0.5">
                    {formatDate(evt.date)}
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {evt.location}
                    </span>
                  </p>
                </div>
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
}
