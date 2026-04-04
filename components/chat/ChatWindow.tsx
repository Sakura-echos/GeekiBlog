"use client";

import {
  useState,
  useEffect,
  useRef,
  useCallback,
  ChangeEvent,
} from "react";
import Image from "next/image";
import { createClient } from "@/utils/supabase/client";
import { EmojiPicker } from "./EmojiPicker";
import { Smile, ImageIcon, Send, X, Loader2 } from "lucide-react";

interface Message {
  id: string;
  session_id: string;
  sender: "user" | "admin";
  content: string | null;
  message_type: "text" | "image";
  image_url: string | null;
  created_at: string;
}

interface ChatWindowProps {
  onClose: () => void;
}

export function ChatWindow({ onClose }: ChatWindowProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [sending, setSending] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [showEmoji, setShowEmoji] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const supabase = createClient();

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  // 初始化会话
  useEffect(() => {
    const initSession = async () => {
      const stored = localStorage.getItem("chat_session_token");
      const res = await fetch("/api/chat/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionToken: stored ?? undefined }),
      });
      const data = await res.json();
      if (data.session) {
        setSessionId(data.session.id);
        localStorage.setItem("chat_session_token", data.session.session_token);
      }
    };
    initSession();
  }, []);

  // 加载历史消息
  useEffect(() => {
    if (!sessionId) return;
    const loadMessages = async () => {
      const res = await fetch(`/api/chat/messages?sessionId=${sessionId}`);
      const data = await res.json();
      if (data.messages) setMessages(data.messages);
    };
    loadMessages();
  }, [sessionId]);

  // Realtime 订阅
  useEffect(() => {
    if (!sessionId) return;

    const channel = supabase
      .channel(`chat_messages:${sessionId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "chat_messages",
          filter: `session_id=eq.${sessionId}`,
        },
        (payload) => {
          const newMsg = payload.new as Message;
          setMessages((prev) => {
            const exists = prev.some((m) => m.id === newMsg.id);
            return exists ? prev : [...prev, newMsg];
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [sessionId, supabase]);

  const sendMessage = async (
    content: string,
    messageType: "text" | "image" = "text",
    imageUrl?: string
  ) => {
    if (!sessionId) return;
    setSending(true);
    try {
      await fetch("/api/chat/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId,
          sender: "user",
          content: messageType === "text" ? content : null,
          messageType,
          imageUrl: imageUrl ?? null,
        }),
      });
    } finally {
      setSending(false);
    }
  };

  const handleSend = async () => {
    const text = input.trim();
    if (!text || sending) return;
    setInput("");
    setShowEmoji(false);
    await sendMessage(text, "text");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleEmojiSelect = (emoji: string) => {
    setInput((prev) => prev + emoji);
    setShowEmoji(false);
  };

  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    e.target.value = "";

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/chat/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.url) {
        await sendMessage("", "image", data.url);
      }
    } finally {
      setUploading(false);
    }
  };

  const formatTime = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleTimeString("zh-CN", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="flex flex-col h-full">
      {/* 头部 */}
      <div className="flex items-center justify-between px-4 py-3 bg-primary text-primary-foreground rounded-t-xl">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="font-semibold text-sm">在线客服</span>
        </div>
        <button
          onClick={onClose}
          className="hover:opacity-70 transition-opacity"
          aria-label="关闭聊天"
        >
          <X size={18} />
        </button>
      </div>

      {/* 消息列表 */}
      <div className="flex-1 overflow-y-auto px-3 py-3 space-y-3 bg-background">
        {messages.length === 0 && (
          <div className="text-center text-muted-foreground text-sm pt-8">
            <p>👋 你好！有什么可以帮你的吗？</p>
          </div>
        )}
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col gap-1 ${
              msg.sender === "user" ? "items-end" : "items-start"
            }`}
          >
            <div
              className={`max-w-[75%] px-3 py-2 rounded-2xl text-sm break-words ${
                msg.sender === "user"
                  ? "bg-primary text-primary-foreground rounded-br-sm"
                  : "bg-muted text-foreground rounded-bl-sm"
              }`}
            >
              {msg.message_type === "image" && msg.image_url ? (
                <button
                  onClick={() => setPreviewImage(msg.image_url)}
                  className="block"
                >
                  <Image
                    src={msg.image_url}
                    alt="图片消息"
                    width={200}
                    height={200}
                    className="rounded-lg max-w-[200px] max-h-[200px] object-cover cursor-pointer hover:opacity-90 transition-opacity"
                  />
                </button>
              ) : (
                <span className="whitespace-pre-wrap">{msg.content}</span>
              )}
            </div>
            <span className="text-xs text-muted-foreground px-1">
              {formatTime(msg.created_at)}
            </span>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Emoji 面板 */}
      {showEmoji && (
        <div className="border-t border-border px-2 pt-2">
          <EmojiPicker onSelect={handleEmojiSelect} />
        </div>
      )}

      {/* 输入区 */}
      <div className="border-t border-border bg-background rounded-b-xl px-3 py-2">
        <div className="flex items-end gap-2">
          <div className="flex-1 flex items-end bg-muted rounded-xl px-3 py-2 gap-2">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="输入消息… (Enter 发送)"
              rows={1}
              className="flex-1 bg-transparent text-sm resize-none outline-none max-h-24 text-foreground placeholder:text-muted-foreground"
              style={{ minHeight: "24px" }}
            />
            <div className="flex items-center gap-1 pb-0.5">
              <button
                type="button"
                onClick={() => setShowEmoji((v) => !v)}
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="表情"
              >
                <Smile size={18} />
              </button>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
                className="text-muted-foreground hover:text-foreground transition-colors disabled:opacity-50"
                aria-label="发送图片"
              >
                {uploading ? (
                  <Loader2 size={18} className="animate-spin" />
                ) : (
                  <ImageIcon size={18} />
                )}
              </button>
            </div>
          </div>
          <button
            type="button"
            onClick={handleSend}
            disabled={!input.trim() || sending}
            className="flex-shrink-0 w-9 h-9 flex items-center justify-center rounded-xl bg-primary text-primary-foreground disabled:opacity-40 hover:opacity-90 transition-opacity"
            aria-label="发送"
          >
            {sending ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <Send size={16} />
            )}
          </button>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/gif,image/webp"
          className="hidden"
          onChange={handleImageChange}
        />
      </div>

      {/* 图片预览弹窗 */}
      {previewImage && (
        <div
          className="fixed inset-0 z-[9999] bg-black/80 flex items-center justify-center p-4"
          onClick={() => setPreviewImage(null)}
        >
          <img
            src={previewImage}
            alt="预览"
            className="max-w-full max-h-full object-contain rounded-lg"
          />
        </div>
      )}
    </div>
  );
}
