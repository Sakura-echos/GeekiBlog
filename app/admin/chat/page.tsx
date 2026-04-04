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
import { EmojiPicker } from "@/components/chat/EmojiPicker";
import {
  Send,
  Smile,
  ImageIcon,
  Loader2,
  MessageSquare,
  RefreshCw,
} from "lucide-react";

interface Session {
  id: string;
  session_token: string;
  status: string;
  created_at: string;
  updated_at: string;
  lastMessage?: string;
}

interface Message {
  id: string;
  session_id: string;
  sender: "user" | "admin";
  content: string | null;
  message_type: "text" | "image";
  image_url: string | null;
  created_at: string;
}

export default function AdminChatPage() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [selectedSession, setSelectedSession] = useState<Session | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [showEmoji, setShowEmoji] = useState(false);
  const [loadingSessions, setLoadingSessions] = useState(false);
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

  const loadSessions = useCallback(async () => {
    setLoadingSessions(true);
    try {
      const { data } = await supabase
        .from("chat_sessions")
        .select("*")
        .order("updated_at", { ascending: false });

      if (data) {
        const sessionsWithLastMsg = await Promise.all(
          data.map(async (s) => {
            const { data: msgs } = await supabase
              .from("chat_messages")
              .select("content, message_type")
              .eq("session_id", s.id)
              .order("created_at", { ascending: false })
              .limit(1);
            const last = msgs?.[0];
            return {
              ...s,
              lastMessage:
                last?.message_type === "image"
                  ? "[图片]"
                  : (last?.content ?? "暂无消息"),
            };
          })
        );
        setSessions(sessionsWithLastMsg);
      }
    } finally {
      setLoadingSessions(false);
    }
  }, [supabase]);

  useEffect(() => {
    loadSessions();
  }, [loadSessions]);

  // 订阅会话表变更，刷新列表
  useEffect(() => {
    const channel = supabase
      .channel("admin_sessions")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "chat_sessions" },
        () => loadSessions()
      )
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, [supabase, loadSessions]);

  const loadMessages = useCallback(
    async (sessionId: string) => {
      const res = await fetch(`/api/chat/messages?sessionId=${sessionId}`);
      const data = await res.json();
      if (data.messages) setMessages(data.messages);
    },
    []
  );

  const handleSelectSession = async (session: Session) => {
    setSelectedSession(session);
    setMessages([]);
    await loadMessages(session.id);
  };

  // 订阅当前会话的消息
  useEffect(() => {
    if (!selectedSession) return;

    const channel = supabase
      .channel(`admin_msgs:${selectedSession.id}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "chat_messages",
          filter: `session_id=eq.${selectedSession.id}`,
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

    return () => { supabase.removeChannel(channel); };
  }, [selectedSession, supabase]);

  const sendMessage = async (
    content: string,
    messageType: "text" | "image" = "text",
    imageUrl?: string
  ) => {
    if (!selectedSession) return;
    setSending(true);
    try {
      await fetch("/api/chat/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId: selectedSession.id,
          sender: "admin",
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
    return date.toLocaleString("zh-CN", {
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const shortToken = (token: string) => token.slice(0, 8) + "…";

  return (
    <div className="flex h-screen bg-[#f8f8f8] text-[#333] font-sans">
      {/* 左侧会话列表 */}
      <aside className="w-72 flex-shrink-0 border-r border-gray-200 bg-white flex flex-col">
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
          <h1 className="font-bold text-base">在线客服管理</h1>
          <button
            onClick={loadSessions}
            disabled={loadingSessions}
            className="text-gray-400 hover:text-gray-700 transition-colors"
            aria-label="刷新"
          >
            <RefreshCw
              size={16}
              className={loadingSessions ? "animate-spin" : ""}
            />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto">
          {sessions.length === 0 && !loadingSessions && (
            <p className="text-center text-gray-400 text-sm mt-8">暂无会话</p>
          )}
          {sessions.map((s) => (
            <button
              key={s.id}
              onClick={() => handleSelectSession(s)}
              className={`w-full text-left px-4 py-3 border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                selectedSession?.id === s.id ? "bg-blue-50 border-l-2 border-l-blue-500" : ""
              }`}
            >
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                  <MessageSquare size={14} className="text-gray-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">
                    用户 {shortToken(s.session_token)}
                  </p>
                  <p className="text-xs text-gray-400 truncate">{s.lastMessage}</p>
                </div>
              </div>
              <p className="text-xs text-gray-300 mt-1 text-right">
                {formatTime(s.updated_at)}
              </p>
            </button>
          ))}
        </div>
      </aside>

      {/* 右侧聊天区 */}
      <main className="flex-1 flex flex-col">
        {!selectedSession ? (
          <div className="flex-1 flex items-center justify-center text-gray-400">
            <div className="text-center">
              <MessageSquare size={48} className="mx-auto mb-3 opacity-30" />
              <p>选择左侧会话开始回复</p>
            </div>
          </div>
        ) : (
          <>
            {/* 聊天头部 */}
            <div className="px-5 py-3 border-b border-gray-200 bg-white flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-400" />
              <span className="font-semibold text-sm">
                用户 {shortToken(selectedSession.session_token)}
              </span>
              <span className="text-xs text-gray-400 ml-auto">
                会话 ID: {selectedSession.id.slice(0, 8)}
              </span>
            </div>

            {/* 消息列表 */}
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3 bg-[#f8f8f8]">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col gap-1 ${
                    msg.sender === "admin" ? "items-end" : "items-start"
                  }`}
                >
                  <span className="text-xs text-gray-400 px-1">
                    {msg.sender === "admin" ? "我" : "用户"}
                  </span>
                  <div
                    className={`max-w-[60%] px-3 py-2 rounded-2xl text-sm break-words ${
                      msg.sender === "admin"
                        ? "bg-blue-500 text-white rounded-br-sm"
                        : "bg-white text-gray-800 rounded-bl-sm shadow-sm"
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
                  <span className="text-xs text-gray-300 px-1">
                    {formatTime(msg.created_at)}
                  </span>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Emoji 面板 */}
            {showEmoji && (
              <div className="border-t border-gray-200 px-3 pt-2 bg-white">
                <EmojiPicker onSelect={(e) => { setInput((v) => v + e); setShowEmoji(false); }} />
              </div>
            )}

            {/* 输入区 */}
            <div className="border-t border-gray-200 bg-white px-4 py-3">
              <div className="flex items-end gap-2">
                <div className="flex-1 flex items-end bg-gray-100 rounded-xl px-3 py-2 gap-2">
                  <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="回复消息… (Enter 发送)"
                    rows={1}
                    className="flex-1 bg-transparent text-sm resize-none outline-none max-h-24 text-gray-800 placeholder:text-gray-400"
                    style={{ minHeight: "24px" }}
                  />
                  <div className="flex items-center gap-1 pb-0.5">
                    <button
                      type="button"
                      onClick={() => setShowEmoji((v) => !v)}
                      className="text-gray-400 hover:text-gray-700 transition-colors"
                    >
                      <Smile size={18} />
                    </button>
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={uploading}
                      className="text-gray-400 hover:text-gray-700 transition-colors disabled:opacity-50"
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
                  className="w-9 h-9 flex items-center justify-center rounded-xl bg-blue-500 text-white disabled:opacity-40 hover:bg-blue-600 transition-colors"
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
          </>
        )}
      </main>

      {/* 图片预览 */}
      {previewImage && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
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
