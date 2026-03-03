"use client";

import { useState, useTransition } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageCircle, Send, User, Loader2, CheckCircle2 } from "lucide-react";
import { addComment } from "@/lib/actions";
import type { Comment } from "@/lib/supabase";
import { cn } from "@/lib/utils";

// ─── Avatar gradient based on first char ───────────────────────────────────
const AVATAR_GRADIENTS = [
  "from-violet-500 to-purple-600",
  "from-blue-500 to-cyan-500",
  "from-emerald-500 to-green-600",
  "from-orange-500 to-amber-500",
  "from-rose-500 to-pink-500",
  "from-indigo-500 to-blue-600",
];

function getAvatarGradient(name: string) {
  return AVATAR_GRADIENTS[(name.charCodeAt(0) ?? 0) % AVATAR_GRADIENTS.length];
}

// ─── Relative time ─────────────────────────────────────────────────────────
function relativeTime(dateStr: string, locale: string) {
  const diff = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000);
  if (locale === "zh") {
    if (diff < 60) return "刚刚";
    if (diff < 3600) return `${Math.floor(diff / 60)} 分钟前`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} 小时前`;
    return `${Math.floor(diff / 86400)} 天前`;
  }
  if (diff < 60) return "just now";
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

// ─── Single comment card ────────────────────────────────────────────────────
function CommentCard({
  comment,
  index,
  locale,
}: {
  comment: Comment;
  index: number;
  locale: string;
}) {
  return (
    <motion.div
      key={comment.id}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ delay: index * 0.04, duration: 0.3, ease: "easeOut" }}
      className="group flex gap-3 p-4 rounded-xl border border-border bg-background-secondary hover:border-violet-500/30 transition-colors duration-200"
    >
      {/* Gradient avatar */}
      <div
        className={cn(
          "flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center",
          "text-white font-bold text-sm select-none bg-gradient-to-br",
          getAvatarGradient(comment.user_name)
        )}
      >
        {comment.user_name.charAt(0).toUpperCase()}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-baseline gap-2 mb-1">
          <span className="font-semibold text-sm text-text-primary">
            {comment.user_name}
          </span>
          <span className="text-xs text-text-light">
            {relativeTime(comment.created_at, locale)}
          </span>
        </div>
        <p className="text-sm text-text-secondary leading-relaxed break-words">
          {comment.content}
        </p>
      </div>
    </motion.div>
  );
}

// ─── Main component ─────────────────────────────────────────────────────────
interface CommentSectionProps {
  articleId: string;
  articleSlug: string;
  initialComments: Comment[];
  locale: string;
}

export function CommentSection({
  articleId,
  articleSlug,
  initialComments,
  locale,
}: CommentSectionProps) {
  const isZh = locale === "zh";

  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [userName, setUserName] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const trimmedName = userName.trim();
    const trimmedContent = content.trim();

    if (!trimmedName) {
      setError(isZh ? "请输入昵称" : "Please enter your name");
      return;
    }
    if (!trimmedContent) {
      setError(isZh ? "请输入评论内容" : "Please write a comment");
      return;
    }

    startTransition(async () => {
      try {
        await addComment(articleId, articleSlug, trimmedName, trimmedContent);
        // Append optimistically after server confirms
        setComments((prev) => [
          {
            id: `local-${Date.now()}`,
            article_id: articleId,
            user_name: trimmedName,
            content: trimmedContent,
            created_at: new Date().toISOString(),
          },
          ...prev,
        ]);
        setUserName("");
        setContent("");
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      } catch {
        setError(isZh ? "提交失败，请稍后再试" : "Failed to submit, please try again");
      }
    });
  };

  return (
    <section className="mt-16 pt-10 border-t border-border">
      {/* ── Section header ── */}
      <div className="flex items-center gap-3 mb-8">
        <div className="relative">
          <MessageCircle className="w-5 h-5 text-text-primary" />
          <AnimatePresence>
            {comments.length > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-pink-500 text-[9px] font-bold text-white"
              >
                {comments.length}
              </motion.span>
            )}
          </AnimatePresence>
        </div>
        <h2 className="text-xl font-bold text-text-primary">
          {isZh ? "评论" : "Comments"}
          <span className="ml-2 text-sm font-normal text-text-secondary">
            ({comments.length})
          </span>
        </h2>
      </div>

      {/* ── Comment list ── */}
      <div className="space-y-3 mb-10">
        <AnimatePresence mode="popLayout">
          {comments.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center py-12 text-text-secondary"
            >
              <MessageCircle className="w-10 h-10 mb-3 opacity-20" />
              <p className="text-sm">
                {isZh
                  ? "还没有评论，快来发表第一条吧！"
                  : "No comments yet. Be the first to comment!"}
              </p>
            </motion.div>
          ) : (
            comments.map((c, i) => (
              <CommentCard key={c.id} comment={c} index={i} locale={locale} />
            ))
          )}
        </AnimatePresence>
      </div>

      {/* ── Comment form ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="relative rounded-2xl overflow-hidden"
      >
        {/* Magic UI: animated gradient border */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-2xl p-px"
          style={{
            background:
              "linear-gradient(135deg, rgba(139,92,246,0.4), rgba(236,72,153,0.3), rgba(59,130,246,0.3))",
          }}
        />
        <div className="relative rounded-2xl border border-border bg-background-secondary p-6">
          <h3 className="text-base font-semibold text-text-primary mb-5">
            {isZh ? "发表评论" : "Leave a Comment"}
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name input */}
            <div>
              <label className="block text-xs font-medium text-text-secondary mb-1.5">
                {isZh ? "昵称" : "Name"}{" "}
                <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-light pointer-events-none" />
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder={isZh ? "你的昵称" : "Your name"}
                  maxLength={50}
                  disabled={isPending}
                  className={cn(
                    "w-full pl-10 pr-4 py-2.5 rounded-lg text-sm",
                    "bg-background border border-border",
                    "text-text-primary placeholder:text-text-light",
                    "focus:outline-none focus:ring-2 focus:ring-violet-500/30 focus:border-violet-500/50",
                    "disabled:opacity-60 transition-all duration-200"
                  )}
                />
              </div>
            </div>

            {/* Content textarea */}
            <div>
              <label className="block text-xs font-medium text-text-secondary mb-1.5">
                {isZh ? "评论内容" : "Comment"}{" "}
                <span className="text-rose-500">*</span>
              </label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder={isZh ? "写下你的想法…" : "Share your thoughts…"}
                maxLength={500}
                rows={4}
                disabled={isPending}
                className={cn(
                  "w-full px-4 py-2.5 rounded-lg text-sm resize-none",
                  "bg-background border border-border",
                  "text-text-primary placeholder:text-text-light",
                  "focus:outline-none focus:ring-2 focus:ring-violet-500/30 focus:border-violet-500/50",
                  "disabled:opacity-60 transition-all duration-200"
                )}
              />
              <p className="text-right text-xs text-text-light mt-1">
                {content.length} / 500
              </p>
            </div>

            {/* Error / success feedback */}
            <AnimatePresence mode="wait">
              {error && (
                <motion.p
                  key="error"
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  className="text-sm text-rose-500"
                >
                  {error}
                </motion.p>
              )}
              {success && (
                <motion.p
                  key="success"
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  className="flex items-center gap-1.5 text-sm text-emerald-500"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  {isZh ? "评论发表成功！" : "Comment posted!"}
                </motion.p>
              )}
            </AnimatePresence>

            {/* Submit button — Magic UI gradient + shadow glow */}
            <button
              type="submit"
              disabled={isPending}
              className={cn(
                "inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium",
                "bg-gradient-to-r from-violet-500 to-pink-500 text-white",
                "hover:from-violet-600 hover:to-pink-600",
                "shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40",
                "disabled:opacity-60 disabled:cursor-not-allowed",
                "transition-all duration-200 active:scale-95"
              )}
            >
              {isPending ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
              {isPending
                ? isZh
                  ? "提交中…"
                  : "Submitting…"
                : isZh
                  ? "发表评论"
                  : "Post Comment"}
            </button>
          </form>
        </div>
      </motion.div>
    </section>
  );
}
