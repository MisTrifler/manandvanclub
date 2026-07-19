"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { MessageCircle, X, Phone, Send, ArrowRight } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const SUGGESTIONS = [
  "How much does a man and van cost?",
  "Do you cover Birmingham?",
  "What's the cheapest option?",
  "How does it work?",
];

export default function AIChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasGreeted, setHasGreeted] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading, scrollToBottom]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

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

        if (data.reply) {
          setMessages((prev) => [
            ...prev,
            { role: "assistant", content: data.reply },
          ]);
        } else {
          setMessages((prev) => [
            ...prev,
            {
              role: "assistant",
              content:
                "Sorry, I had trouble with that. Try again or call us on 0121 751 1269 — we're open 7 days.",
            },
          ]);
        }
      } catch {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content:
              "Something went wrong. Please try again or call 0121 751 1269 — we're open 7 days.",
          },
        ]);
      } finally {
        setIsLoading(false);
      }
    },
    [isLoading, messages]
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
      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 left-6 sm:left-auto sm:right-6 z-[300] w-[calc(100vw-3rem)] sm:w-[380px] max-h-[70vh] flex flex-col bg-white rounded-2xl shadow-2xl border border-border overflow-hidden animate-in slide-in-from-bottom-4 fade-in duration-200">
          {/* Header */}
          <div className="bg-primary text-white px-4 py-3 flex items-center justify-between flex-shrink-0">
            <div className="flex items-center gap-2">
              <MessageCircle size={18} />
              <div>
                <p className="text-sm font-black leading-tight">Man and Van Club</p>
                <p className="text-[10px] text-white/60">AI assistant · Replies instantly</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="w-7 h-7 rounded-full hover:bg-white/10 flex items-center justify-center transition-colors"
              aria-label="Close chat"
            >
              <X size={16} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-0" style={{ maxHeight: "calc(70vh - 120px)" }}>
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "bg-accent text-white rounded-br-md"
                      : "bg-[#F9F9F7] text-primary rounded-bl-md"
                  }`}
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

          {/* Suggestions (show only at start) */}
          {messages.length <= 1 && (
            <div className="px-4 pb-2 flex flex-wrap gap-1.5">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => handleSuggestion(s)}
                  className="text-[10px] font-bold text-accent bg-accent/5 border border-accent/20 rounded-full px-3 py-1.5 hover:bg-accent/10 transition-colors"
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          {/* Quick actions */}
          <div className="px-4 pb-2 flex gap-2">
            <a
              href="tel:01217511269"
              className="flex-1 flex items-center justify-center gap-1.5 text-[10px] font-black text-primary bg-[#F9F9F7] rounded-lg py-2 hover:bg-accent/5 transition-colors"
            >
              <Phone size={12} /> Call 0121 751 1269
            </a>
            <a
              href="/get-started"
              className="flex-1 flex items-center justify-center gap-1.5 text-[10px] font-black text-white bg-accent rounded-lg py-2 hover:bg-accent/90 transition-colors"
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
              placeholder="Ask me anything about your move..."
              className="flex-1 text-sm bg-transparent outline-none placeholder:text-primary/30 text-primary"
              disabled={isLoading}
              maxLength={500}
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="w-8 h-8 bg-accent text-white rounded-lg flex items-center justify-center hover:bg-accent/90 transition-colors disabled:opacity-30 disabled:cursor-not-allowed flex-shrink-0"
              aria-label="Send message"
            >
              <Send size={14} />
            </button>
          </form>
        </div>
      )}

      {/* Floating Chat Button */}
      {!isOpen && (
        <button
          onClick={openChat}
          className="fixed bottom-6 left-6 z-[300] flex items-center gap-3 bg-primary text-white pl-5 pr-6 py-4 rounded-full shadow-2xl hover:bg-primary/90 transition-all group cursor-pointer"
          aria-label="Open AI chat"
        >
          <MessageCircle size={22} className="text-accent group-hover:scale-110 transition-transform" />
          <span className="font-black tracking-tight text-sm">Ask AI</span>
        </button>
      )}
    </>
  );
}
