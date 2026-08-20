import { createFileRoute } from "@tanstack/react-router";
import { Camera, MessageCircle, Plus, Star } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import upperEast from "@/assets/project-kenya.jpg";
import western from "@/assets/project-peru.jpg";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { projects } from "@/lib/projects";

export const Route = createFileRoute("/community")({
  head: () => ({
    meta: [
      { title: "Impact community — updates from projects and volunteers | ImpactBridge" },
      {
        name: "description",
        content:
          "Follow projects, read field updates from communities and volunteers, and connect with people working on clean water in Ghana.",
      },
      { property: "og:title", content: "Impact community — ImpactBridge" },
      {
        property: "og:description",
        content:
          "A professional community for people building clean-water access in Ghana together.",
      },
    ],
  }),
  component: CommunityPage,
});

const feed = [
  {
    author: "Abena O.",
    role: "Community lead · Zorko, Upper East",
    time: "2 days ago",
    body: "The overhead tank is up and the first three standpipes are flowing. The school will be connected next week — the water committee agreed the tariff yesterday.",
    image: upperEast,
    likes: 32,
    comments: 8,
  },
  {
    author: "Tom H.",
    role: "Volunteer · Water treatment",
    time: "5 days ago",
    body: "Two weeks on the Ankobra treatment unit near Prestea. Mornings commissioning the filtration stages, afternoons training operators to log turbidity — turbidity is already down from 9,000 to under 5 NTU at the tap.",
    image: western,
    likes: 47,
    comments: 13,
  },
  {
    author: "Yaw M.",
    role: "Community lead · Nabogu, Northern",
    time: "1 week ago",
    body: "Two of the three new handpumps are drilled and the school handwashing stations are in. Queues at dawn are already shorter. Sharing our caretaker training notes with anyone starting a WASH programme.",
    likes: 21,
    comments: 5,
  },
];

const volunteers = [
  { name: "Sofia D.", skill: "Water quality testing", place: "Lisbon" },
  { name: "Kwame A.", skill: "Borehole & pump systems", place: "Accra" },
  { name: "Mira T.", skill: "Project management", place: "Helsinki" },
  { name: "Diego S.", skill: "WASH education", place: "Lima" },
];

function CommunityPage() {
  const [following, setFollowing] = useState<string[]>([projects[0]!.id]);

  const toggleFollow = (id: string) =>
    setFollowing((prev) => (prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]));

  return (
    <section className="py-14 sm:py-16">
      <div className="container-page">
        <p className="eyebrow">Impact community</p>
        <h1 className="mt-3 max-w-2xl font-display text-4xl font-semibold sm:text-5xl">
          Field updates from the people doing the work
        </h1>

        <div className="mt-12 grid gap-8 lg:grid-cols-[1.5fr_1fr]">
          <div className="space-y-6">
            <div className="card-soft p-5">
              <Textarea
                rows={3}
                placeholder="Share an update, a lesson learned or a photo from the field…"
                className="resize-none border-0 bg-transparent p-0 shadow-none focus-visible:ring-0"
              />
              <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
                <button
                  type="button"
                  onClick={() => toast.info("Photo upload is part of the next release")}
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-ink"
                >
                  <Camera className="h-4 w-4" /> Add photo
                </button>
                <Button
                  size="sm"
                  className="rounded-full"
                  onClick={() => toast.success("Update posted to your community")}
                >
                  Post update
                </Button>
              </div>
            </div>

            {feed.map((post) => (
              <article key={post.author + post.time} className="card-soft p-6">
                <header className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-sage text-sm font-semibold text-sage-foreground">
                    {post.author.charAt(0)}
                  </span>
                  <div>
                    <p className="text-sm font-semibold">{post.author}</p>
                    <p className="text-xs text-muted-foreground">
                      {post.role} · {post.time}
                    </p>
                  </div>
                </header>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{post.body}</p>
                {post.image && (
                  <img
                    src={post.image}
                    alt="Project update from the field"
                    loading="lazy"
                    width={1400}
                    height={900}
                    className="mt-4 h-56 w-full rounded-2xl object-cover"
                  />
                )}
                <div className="mt-4 flex gap-5 border-t border-border pt-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <Star className="h-3.5 w-3.5" /> {post.likes}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MessageCircle className="h-3.5 w-3.5" /> {post.comments} comments
                  </span>
                </div>
              </article>
            ))}
          </div>

          <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
            <div className="card-soft p-6">
              <h2 className="text-base font-semibold">Projects you follow</h2>
              <ul className="mt-4 space-y-3">
                {projects.map((p) => {
                  const isFollowing = following.includes(p.id);
                  return (
                    <li key={p.id} className="flex items-center justify-between gap-3">
                      <div>
                        <p className="text-sm font-medium">{p.name}</p>
                        <p className="text-xs text-muted-foreground">{p.region}</p>
                      </div>
                      <Button
                        size="sm"
                        variant={isFollowing ? "secondary" : "outline"}
                        className="rounded-full text-xs"
                        onClick={() => toggleFollow(p.id)}
                      >
                        {isFollowing ? "Following" : "Follow"}
                      </Button>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="card-soft p-6">
              <h2 className="text-base font-semibold">Volunteers to connect with</h2>
              <ul className="mt-4 space-y-3">
                {volunteers.map((v) => (
                  <li key={v.name} className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-sm font-medium">{v.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {v.skill} · {v.place}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => toast.success(`Connection request sent to ${v.name}`)}
                      aria-label={`Connect with ${v.name}`}
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary/40 hover:text-ink"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
