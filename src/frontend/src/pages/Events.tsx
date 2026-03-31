import type { Event } from "@/backend.d";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { clubNameMap, mockClubs, mockEvents } from "@/data/mockData";
import { CalendarDays, MapPin, Plus, Users } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

function formatDate(ts: bigint) {
  return new Date(Number(ts)).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function Events() {
  const [events, setEvents] = useState<Event[]>(mockEvents);
  const [search, setSearch] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    clubId: "",
    location: "",
    date: "",
  });

  const filtered = events.filter(
    (e) =>
      e.title.toLowerCase().includes(search.toLowerCase()) ||
      (clubNameMap[e.clubId] ?? "")
        .toLowerCase()
        .includes(search.toLowerCase()),
  );

  const handleCreate = () => {
    if (!form.title.trim() || !form.clubId) {
      toast.error("Title and club are required");
      return;
    }
    const newEvent: Event = {
      eventId: `evt-${Date.now()}`,
      title: form.title,
      description: form.description,
      clubId: form.clubId,
      date: form.date
        ? BigInt(new Date(form.date).getTime())
        : BigInt(Date.now()),
      location: form.location,
      attendeeCount: BigInt(0),
    };
    setEvents((prev) => [newEvent, ...prev]);
    setDialogOpen(false);
    setForm({ title: "", description: "", clubId: "", location: "", date: "" });
    toast.success(`"${form.title}" created`);
  };

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold">Events</h1>
          <p className="text-muted-foreground text-sm mt-0.5">
            {events.length} events scheduled
          </p>
        </div>
        <Button
          onClick={() => setDialogOpen(true)}
          data-ocid="events.create.button"
        >
          <Plus className="w-4 h-4 mr-2" /> Create Event
        </Button>
      </div>

      <Input
        placeholder="Search events..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="max-w-sm"
        data-ocid="events.search.search_input"
      />

      {filtered.length === 0 ? (
        <div className="text-center py-16" data-ocid="events.empty_state">
          <CalendarDays className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
          <p className="text-muted-foreground">No events found</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((evt, i) => (
            <Card
              key={evt.eventId}
              className="shadow-card hover:shadow-card-hover transition-all duration-200"
              data-ocid={`events.item.${i + 1}`}
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex flex-col items-center justify-center flex-shrink-0">
                    <span className="text-xs font-bold text-primary">
                      {new Date(Number(evt.date))
                        .toLocaleDateString("en-US", { month: "short" })
                        .toUpperCase()}
                    </span>
                    <span className="text-lg font-display font-bold text-primary leading-none">
                      {new Date(Number(evt.date)).getDate()}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-display font-semibold text-base">
                      {evt.title}
                    </p>
                    <p className="text-sm text-muted-foreground mt-0.5 line-clamp-1">
                      {evt.description}
                    </p>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <CalendarDays className="w-3 h-3" />
                        {formatDate(evt.date)}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {evt.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        {Number(evt.attendeeCount)} attending
                      </span>
                    </div>
                  </div>
                  <Badge variant="outline" className="flex-shrink-0 text-xs">
                    {clubNameMap[evt.clubId] ?? evt.clubId}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent data-ocid="events.dialog">
          <DialogHeader>
            <DialogTitle className="font-display">Create New Event</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label>Title</Label>
              <Input
                placeholder="Event title"
                value={form.title}
                onChange={(e) =>
                  setForm((f) => ({ ...f, title: e.target.value }))
                }
                data-ocid="events.title.input"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Club</Label>
                <Select
                  value={form.clubId}
                  onValueChange={(v) => setForm((f) => ({ ...f, clubId: v }))}
                >
                  <SelectTrigger data-ocid="events.club.select">
                    <SelectValue placeholder="Select club" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockClubs.map((c) => (
                      <SelectItem key={c.clubId} value={c.clubId}>
                        {c.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Date</Label>
                <Input
                  type="date"
                  value={form.date}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, date: e.target.value }))
                  }
                  data-ocid="events.date.input"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Location</Label>
              <Input
                placeholder="Building / Room"
                value={form.location}
                onChange={(e) =>
                  setForm((f) => ({ ...f, location: e.target.value }))
                }
                data-ocid="events.location.input"
              />
            </div>
            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea
                placeholder="Event details..."
                value={form.description}
                onChange={(e) =>
                  setForm((f) => ({ ...f, description: e.target.value }))
                }
                rows={3}
                data-ocid="events.description.textarea"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDialogOpen(false)}
              data-ocid="events.cancel_button"
            >
              Cancel
            </Button>
            <Button onClick={handleCreate} data-ocid="events.submit_button">
              Create Event
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
