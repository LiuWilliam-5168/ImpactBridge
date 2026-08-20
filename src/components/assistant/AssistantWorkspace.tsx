import { Loader2, RotateCcw, Send, Sparkles } from "lucide-react";
import { useRef, useState, type ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import type { AssistantEngine, AssistantMessage } from "@/lib/assistant";

type Props<T> = {
  eyebrow: string;
  title: string;
  lead?: string;
  engine: AssistantEngine<T>;
  outputTitle: string;
  /** Renders the left pane. `setOutput` lets the pane edit the state directly (e.g. a form). */
  renderOutput: (output: T, setOutput: (updater: (prev: T) => T) => void) => ReactNode;
};

export function AssistantWorkspace<T>({
  eyebrow,
  title,
  lead,
  engine,
  outputTitle,
  renderOutput,
}: Props<T>) {
  const [started, setStarted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [awaitingReply, setAwaitingReply] = useState(true);
  const [output, setOutput] = useState<T>(engine.initial);
  const [messages, setMessages] = useState<AssistantMessage[]>([
    { role: "assistant", text: engine.intro },
  ]);
  const [input, setInput] = useState("");
  const threadRef = useRef<HTMLDivElement>(null);

  const scrollThread = () => {
    requestAnimationFrame(() => {
      threadRef.current?.scrollTo({ top: threadRef.current.scrollHeight, behavior: "smooth" });
    });
  };

  const updateOutput = (updater: (prev: T) => T) => setOutput(updater);

  async function send() {
    const text = input.trim();
    if (!text || loading) return;
    setInput("");
    setLoading(true);
    setMessages((m) => [...m, { role: "user", text }]);
    scrollThread();

    const turn = started ? await engine.answer(text, output) : await engine.start(text);
    setStarted(true);
    setOutput(turn.output);
    setMessages((m) => [...m, { role: "assistant", text: turn.message }]);
    setAwaitingReply(turn.awaitingReply);
    setLoading(false);
    scrollThread();
  }

  function reset() {
    setStarted(false);
    setLoading(false);
    setAwaitingReply(true);
    setInput("");
    setOutput(engine.initial);
    setMessages([{ role: "assistant", text: engine.intro }]);
  }

  const inputDisabled = loading || (started && !awaitingReply);

  return (
    <div>
      <div className="max-w-2xl">
        <p className="eyebrow">{eyebrow}</p>
        <h2 className="mt-3 text-2xl font-semibold sm:text-3xl">{title}</h2>
        {lead && <p className="mt-4 text-muted-foreground">{lead}</p>}
      </div>

      {/* Two-pane: output (left) + assistant chat (right) */}
      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="card-soft flex flex-col p-6">
          <p className="eyebrow">{outputTitle}</p>
          <div className="mt-4 flex-1">{renderOutput(output, updateOutput)}</div>
        </div>

        <div className="card-soft flex h-full min-h-[28rem] flex-col p-0">
          <div className="flex items-center justify-between border-b border-border px-5 py-3">
            <p className="flex items-center gap-2 text-sm font-medium">
              <Sparkles className="h-4 w-4 text-primary" /> Assistant
            </p>
            {started && (
              <button
                type="button"
                onClick={reset}
                className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-ink"
              >
                <RotateCcw className="h-3.5 w-3.5" /> Start over
              </button>
            )}
          </div>

          <div
            ref={threadRef}
            className="flex-1 space-y-4 overflow-y-auto px-5 py-5"
            style={{ maxHeight: "26rem" }}
          >
            {messages.map((m, i) => (
              <div
                key={i}
                className={cn("flex", m.role === "user" ? "justify-end" : "justify-start")}
              >
                <div
                  className={cn(
                    "max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed",
                    m.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground",
                  )}
                >
                  {m.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="flex items-center gap-2 rounded-2xl bg-secondary px-3.5 py-2.5 text-sm text-muted-foreground">
                  <Loader2 className="h-3.5 w-3.5 animate-spin" /> Thinking…
                </div>
              </div>
            )}
          </div>

          <div className="border-t border-border p-3">
            {!started && !loading && (
              <button
                type="button"
                onClick={() => setInput(engine.example)}
                className="mb-2 ml-1 text-xs font-medium text-primary hover:underline"
              >
                Not sure where to start? Use an example
              </button>
            )}
            <div className="flex items-center gap-2">
              <Input
                placeholder={
                  started
                    ? awaitingReply
                      ? "Type your answer…"
                      : "You're all set — start over to try again"
                    : engine.placeholder
                }
                value={input}
                disabled={inputDisabled}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") send();
                }}
              />
              <Button
                size="icon"
                className="shrink-0 rounded-full"
                onClick={send}
                disabled={inputDisabled || !input.trim()}
                aria-label="Send"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
