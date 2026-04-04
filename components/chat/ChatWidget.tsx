"use client";

import { useState, useEffect, useRef } from "react";
import { MessageCircle, X } from "lucide-react";
import { ChatWindow } from "./ChatWindow";

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [hasUnread, setHasUnread] = useState(false);
  const widgetRef = useRef<HTMLDivElement>(null);

  // 点击外部关闭
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (widgetRef.current && !widgetRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  // 打开时清除未读提示
  useEffect(() => {
    if (open) setHasUnread(false);
  }, [open]);

  return (
    <div
      ref={widgetRef}
      className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3"
    >
      {/* 聊天窗口 */}
      {open && (
        <div
          className="w-[340px] sm:w-[360px] h-[520px] rounded-xl shadow-2xl border border-border bg-background flex flex-col overflow-hidden animate-in slide-in-from-bottom-4 fade-in duration-200"
          style={{ maxHeight: "calc(100vh - 100px)" }}
        >
          <ChatWindow onClose={() => setOpen(false)} />
        </div>
      )}

      {/* 悬浮按钮 */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "关闭客服" : "联系客服"}
        className="relative w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-200 flex items-center justify-center"
      >
        {open ? <X size={24} /> : <MessageCircle size={24} />}
        {!open && hasUnread && (
          <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-red-500 rounded-full border-2 border-background animate-pulse" />
        )}
      </button>
    </div>
  );
}
