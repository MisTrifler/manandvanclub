"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { MessageCircle, X, Phone, Send, ArrowRight, ArrowLeft } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const SUGGESTIONS = [
  "How much does a man and van cost?",
  "What areas do you cover?",
  "What's the cheapest option?",
  "How does it work?",
];

/** Strip markdown formatting that Gemini sometimes produces despite instructions */
function stripMarkdown(text: string): string {
  return text
    .replace(/\*\*(.+?)\*\*/g, "$1")
    .replace(/__(.+?)__/g, "$1")
    .replace(/(?<!\w)\*(.+?)\*(?!\w)/g, "$1")
    .replace(/(?<!\w)_(.+?)_(?!\w)/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/  +/g, " ")
    .trim();
}

/** Check if the AI response should trigger the callback form */
function shouldShowCallback(text: string): boolean {
  const lower = text.toLowerCase();
  return lower.includes("[request_callback]") || lower.includes("request_callback");
}

/** Remove the callback trigger tag from display text */
function cleanCallbackTag(text: string): string {
  return text.replace(/\[?request_callback\]?/gi, "").replace(/  +/g, " ").trim();
}

export default function AIChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasGreeted, setHasGreeted] = useState(false);
  const [showCallbackForm, setShowCallbackForm] = useState(false);
  const [callbackPhone, setCallbackPhone] = useState("");
  const [callbackName, setCallbackName] = useState("");
  const [callbackEmail, setCallbackEmail] = useState("");
  const [callbackSubmitting, setCallbackSubmitting] = useState(false);
  const [callbackSent, setCallbackSent] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const callbackPhoneRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading, scrollToBottom]);

  // Focus input only when user explicitly interacts (not on open — avoids keyboard popup)
  useEffect(() => {
    if (isOpen && showCallbackForm && callbackPhoneRef.current) {
      callbackPhoneRef.current.focus();
    }
  }, [isOpen, showCallbackForm]);

  const openChat = useCallback(() => {
    setIsOpen(true);
    if (!hasGreeted) {
      setHasGreeted(true);
      setMessages([
        {
          role: "assistant",
          content:
            "Hi! 👋 I'm the Man and Van Club assistant. I can help with pricing, areas covered, or any questions about your move. What do you need help with?",
        },
      ]);
    }
  }, [hasGreeted]);

  const sendMessage = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || isLoading) return;

      const userMessage: Message = { role: "user", content: trimmed };
      setMessages((prev) => [...prev, userMessage]);
      setInput("");
      setIsLoading(true);

      try {
        const history = messages.map((m) => ({
          role: m.role,
          content: m.content,
        }));

        const response = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: trimmed, history }),
        });

        const data = await response.json();
        const rawReply = data.reply || data.error;

        if (rawReply) {
          const cleaned = stripMarkdown(rawReply);

          if (shouldShowCallback(cleaned)) {
            const displayText = cleanCallbackTag(cleaned);
            setMessages((prev) => [
              ...prev,
              { role: "assistant", content: displayText },
            ]);
            setShowCallbackForm(true);
          } else {
            setMessages((prev) => [
              ...prev,
              { role: "assistant", content: cleaned },
            ]);
          }
        } else {
          setMessages((prev) => [
            ...prev,
            {
              role: "assistant",
              content:
                "Sorry, I had trouble with that. Call us on 0121 751 1269 — we're open 24/7.",
            },
          ]);
        }
      } catch {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content:
              "Something went wrong. Please try again or call 0121 751 1269 — we're open 24/7.",
          },
        ]);
      } finally {
        setIsLoading(false);
      }
    },
    [isLoading, messages]
  );

  const handleSubmitCallback = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      const phone = callbackPhone.trim();
      if (phone.length < 7) return;

      setCallbackSubmitting(true);
      try {
        const res = await fetch("/api/callback", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            phone,
            name: callbackName.trim() || undefined,
            email: callbackEmail.trim() || undefined,
          }),
        });

        if (res.ok) {
          setCallbackSent(true);
          setMessages((prev) => [
            ...prev,
            {
              role: "assistant",
              content:
                "Got it! We've got your number and will call you back as soon as we can. We're open 24/7. Thanks!",
            },
          ]);
          setTimeout(() => {
            setShowCallbackForm(false);
            setCallbackPhone("");
            setCallbackName("");
            setCallbackEmail("");
            setCallbackSent(false);
          }, 2000);
        } else {
          setMessages((prev) => [
            ...prev,
            {
              role: "assistant",
              content:
                "Something went wrong submitting your request. Please call us directly on 0121 751 1269 — we're open 24/7.",
            },
          ]);
        }
      } catch {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content:
              "Couldn't submit your request. Please call us on 0121 751 1269 — we're open 24/7.",
          },
        ]);
      } finally {
        setCallbackSubmitting(false);
      }
    },
    [callbackPhone, callbackName, callbackEmail]
  );

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      sendMessage(input);
    },
    [input, sendMessage]
  );

  const handleSuggestion = useCallback(
    (text: string) => {
      sendMessage(text);
    },
    [sendMessage]
  );

  return (
    <>
      {/* Chat Window — full screen on mobile, floating card on desktop */}
      {isOpen && (
        <div
          className="fixed inset-0 sm:inset-auto sm:bottom-6 sm:right-6 z-[300] flex flex-col bg-white sm:rounded-2xl sm:shadow-2xl sm:border sm:border-border sm:max-h-[70dvh] sm:w-[380px] sm:max-w-[calc(100vw-2rem)] overflow-hidden"
          style={{
            height: "100dvh",
            paddingBottom: "env(safe-area-inset-bottom, 0px)",
            touchAction: "manipulation",
          }}
        >
          {/* Header */}
          <div className="bg-primary text-white px-4 py-3 flex items-center justify-between flex-shrink-0 rounded-t-2xl">
            <div className="flex items-center gap-2">
              <MessageCircle size={18} />
              <div>
                <p className="text-sm font-black leading-tight">Man and Van Club</p>
                <p className="text-[10px] text-white/60">AI assistant · Replies instantly</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="w-9 h-9 rounded-full hover:bg-white/10 active:bg-white/20 flex items-center justify-center transition-colors"
              aria-label="Close chat"
            >
              <X size={18} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto overflow-x-hidden overscroll-contain p-4 space-y-3 min-h-0">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed break-words ${
                    msg.role === "user"
                      ? "bg-accent text-white rounded-br-md"
                      : "bg-[#F9F9F7] text-primary rounded-bl-md"
                  }`}
                  style={{ overflowWrap: "anywhere" }}
                >
                  {msg.content}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-[#F9F9F7] rounded-2xl rounded-bl-md px-4 py-3">
                  <div className="flex gap-1.5">
                    <span className="w-2 h-2 bg-primary/30 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-2 h-2 bg-primary/30 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-2 h-2 bg-primary/30 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Callback Form (replaces input area when shown) */}
          {showCallbackForm && !callbackSent ? (
            <div className="border-t border-border p-3 sm:p-4 flex flex-col gap-2 flex-shrink-0 bg-white">
              <button
                onClick={() => setShowCallbackForm(false)}
                className="flex items-center gap-1 text-xs text-gray-500 active:text-gray-700 self-start py-1"
              >
                <ArrowLeft size={12} /> Back to chat
              </button>
              <p className="text-xs font-bold text-primary">Request a callback</p>
              <form onSubmit={handleSubmitCallback} className="flex flex-col gap-2">
                <input
                  ref={callbackPhoneRef}
                  type="tel"
                  value={callbackPhone}
                  onChange={(e) => setCallbackPhone(e.target.value)}
                  placeholder="Your phone number *"
                  className="w-full text-sm bg-gray-100 outline-none placeholder:text-gray-400 text-gray-900 px-3 py-2.5 rounded-lg"
                  required
                  minLength={7}
                  disabled={callbackSubmitting}
                  autoComplete="tel"
                />
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={callbackName}
                    onChange={(e) => setCallbackName(e.target.value)}
                    placeholder="Name (optional)"
                    className="flex-1 text-sm bg-gray-100 outline-none placeholder:text-gray-400 text-gray-900 px-3 py-2.5 rounded-lg min-w-0"
                    disabled={callbackSubmitting}
                    autoComplete="name"
                  />
                  <input
                    type="email"
                    value={callbackEmail}
                    onChange={(e) => setCallbackEmail(e.target.value)}
                    placeholder="Email (optional)"
                    className="flex-1 text-sm bg-gray-100 outline-none placeholder:text-gray-400 text-gray-900 px-3 py-2.5 rounded-lg min-w-0"
                    disabled={callbackSubmitting}
                    autoComplete="email"
                  />
                </div>
                <button
                  type="submit"
                  disabled={callbackPhone.trim().length < 7 || callbackSubmitting}
                  className="w-full bg-accent text-white text-sm font-bold py-2.5 rounded-lg active:bg-accent/80 transition-colors disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <Phone size={14} />
                  {callbackSubmitting ? "Sending..." : "Request callback"}
                </button>
              </form>
            </div>
          ) : (
            <>
              {/* Suggestions (show only at start) */}
              {messages.length <= 1 && (
                <div className="px-4 pb-2 flex flex-wrap gap-1.5 flex-shrink-0">
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      onClick={() => handleSuggestion(s)}
                      className="text-[10px] font-bold text-accent bg-accent/5 border border-accent/20 rounded-full px-3 py-1.5 active:bg-accent/15 transition-colors"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}

              {/* Quick actions */}
              <div className="px-3 sm:px-4 pb-2 flex gap-2 flex-shrink-0">
                <a
                  href="tel:01217511269"
                  className="flex-1 flex items-center justify-center gap-1.5 text-[10px] font-black text-primary bg-[#F9F9F7] rounded-lg py-2 active:bg-gray-200"
                >
                  <Phone size={12} /> Call 0121 751 1269
                </a>
                <a
                  href="/get-started"
                  className="flex-1 flex items-center justify-center gap-1.5 text-[10px] font-black text-white bg-accent rounded-lg py-2 active:bg-accent/80"
                >
                  Get a Quote <ArrowRight size={10} />
                </a>
              </div>

              {/* Input */}
              <form
                onSubmit={handleSubmit}
                className="border-t border-border px-3 py-2 flex items-center gap-2 flex-shrink-0"
              >
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about your move..."
                  enterKeyHint="send"
                  className="flex-1 text-sm bg-gray-100 outline-none placeholder:text-gray-400 text-gray-900 px-3 py-2.5 rounded-lg min-w-0"
                  disabled={isLoading}
                  maxLength={500}
                  autoComplete="off"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="w-9 h-9 bg-accent text-white rounded-lg flex items-center justify-center active:bg-accent/80 transition-colors disabled:opacity-30 disabled:cursor-not-allowed flex-shrink-0"
                  aria-label="Send message"
                >
                  <Send size={14} />
                </button>
              </form>
            </>
          )}
        </div>
      )}

      {/* Floating Chat Button */}
      {!isOpen && (
        <button
          onClick={openChat}
          className="fixed bottom-6 right-4 sm:right-6 z-[300] flex items-center gap-3 bg-primary text-white pl-5 pr-6 py-4 rounded-full shadow-2xl active:bg-primary/80 transition-all group cursor-pointer"
          style={{
            bottom: "calc(1.5rem + env(safe-area-inset-bottom, 0px))",
            touchAction: "manipulation",
          }}
          aria-label="Open AI chat"
        >
          <MessageCircle size={22} className="text-accent group-hover:scale-110 group-active:scale-95 transition-transform" />
          <span className="font-black tracking-tight text-sm">Ask AI</span>
        </button>
      )}
    </>
  );
}
