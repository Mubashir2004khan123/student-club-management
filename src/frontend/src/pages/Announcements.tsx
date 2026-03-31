import type { Announcement } from "@/backend.d";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { clubNameMap, mockAnnouncements, mockClubs } from "@/data/mockData";
import { Megaphone, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

function formatDate(ts: bigint) {
  return new Date(Number(ts)).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default function Announcements() {
  const [announcements, setAnnouncements] =
    useState<Announcement[]>(mockAnnouncements);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [form, setForm] = useState({
    title: "",
    content: "",
    clubId: "",
    authorName: "",
  });

  const handleCreate = () => {
    if (!form.title.trim() || !form.clubId) {
      toast.error("Title and club are required");
      return;
    }
    const ann: Announcement = {
      announcementId: `ann-${Date.now()}`,
      title: form.title,
      content: form.content,
      clubId: form.clubId,
      authorName: form.authorName || "Admin",
      createdAt: BigInt(Date.now()),
    };
    setAnnouncements((prev) => [ann, ...prev]);
    setDialogOpen(false);
    setForm({ title: "", content: "", clubId: "", authorName: "" });
    toast.success("Announcement published");
  };

  const handleDelete = (id: string) => {
    setAnnouncements((prev) => prev.filter((a) => a.announcementId !== id));
    toast.success("Announcement deleted");
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold">Announcements</h1>
          <p className="text-muted-foreground text-sm mt-0.5">
            {announcements.length} announcements
          </p>
        </div>
        <Button
          onClick={() => setDialogOpen(true)}
          data-ocid="announcements.new.button"
        >
          <Plus className="w-4 h-4 mr-2" /> New Announcement
        </Button>
      </div>

      {announcements.length === 0 ? (
        <div
          className="text-center py-16"
          data-ocid="announcements.empty_state"
        >
          <Megaphone className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
          <p className="text-muted-foreground">No announcements yet</p>
        </div>
      ) : (
        <div className="space-y-4">
          {announcements.map((ann, i) => (
            <Card
              key={ann.announcementId}
              className="shadow-card hover:shadow-card-hover transition-all duration-200"
              data-ocid={`announcements.item.${i + 1}`}
            >
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <CardTitle className="font-display text-base">
                      {ann.title}
                    </CardTitle>
                    <p className="text-xs text-muted-foreground mt-1">
                      {clubNameMap[ann.clubId] ?? ann.clubId} · by{" "}
                      {ann.authorName} · {formatDate(ann.createdAt)}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 flex-shrink-0 hover:text-destructive"
                    onClick={() => handleDelete(ann.announcementId)}
                    data-ocid={`announcements.delete_button.${i + 1}`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {ann.content}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent data-ocid="announcements.dialog">
          <DialogHeader>
            <DialogTitle className="font-display">New Announcement</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label>Title</Label>
              <Input
                placeholder="Announcement title"
                value={form.title}
                onChange={(e) =>
                  setForm((f) => ({ ...f, title: e.target.value }))
                }
                data-ocid="announcements.title.input"
              />
            </div>
            <div className="space-y-2">
              <Label>Club</Label>
              <Select
                value={form.clubId}
                onValueChange={(v) => setForm((f) => ({ ...f, clubId: v }))}
              >
                <SelectTrigger data-ocid="announcements.club.select">
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
              <Label>Author Name</Label>
              <Input
                placeholder="Your name"
                value={form.authorName}
                onChange={(e) =>
                  setForm((f) => ({ ...f, authorName: e.target.value }))
                }
                data-ocid="announcements.author.input"
              />
            </div>
            <div className="space-y-2">
              <Label>Content</Label>
              <Textarea
                placeholder="Write your announcement..."
                value={form.content}
                onChange={(e) =>
                  setForm((f) => ({ ...f, content: e.target.value }))
                }
                rows={4}
                data-ocid="announcements.content.textarea"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDialogOpen(false)}
              data-ocid="announcements.cancel_button"
            >
              Cancel
            </Button>
            <Button
              onClick={handleCreate}
              data-ocid="announcements.submit_button"
            >
              Publish
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
