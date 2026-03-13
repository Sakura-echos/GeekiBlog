"use client";

import { useState, useRef, useCallback } from "react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  ArrowLeft,
  Bold,
  Italic,
  Heading2,
  Heading3,
  Link2,
  Code,
  Quote,
  List,
  Image as ImageIcon,
  Loader2,
} from "lucide-react";
import { ARTICLE_CATEGORIES } from "@/lib/supabase";
import type { Article, ArticleCategory } from "@/lib/supabase";
import type { ArticleFormData } from "@/lib/actions";
import { LogoutButton } from "@/components/admin/logout-button";

interface ArticleEditorProps {
  article?: Article;
  onSave: (data: ArticleFormData) => Promise<void>;
}

async function uploadImageToServer(file: File): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);
  const res = await fetch("/api/upload", { method: "POST", body: formData });
  if (!res.ok) {
    const { error } = await res.json().catch(() => ({ error: "Upload failed" }));
    throw new Error(error ?? "Upload failed");
  }
  const { url } = await res.json();
  return url as string;
}

function generateSlug(text: string) {
  return text
    .toLowerCase()
    .replace(/[\u4e00-\u9fa5\s]+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-")
    .replace(/^-|-$/g, "");
}

export function ArticleEditor({ article, onSave }: ArticleEditorProps) {
  const [title, setTitle] = useState(article?.title ?? "");
  const [slug, setSlug] = useState(article?.slug ?? "");
  const [excerpt, setExcerpt] = useState(article?.excerpt ?? "");
  const [content, setContent] = useState(article?.content ?? "");
  const [tags, setTags] = useState(article?.tags?.join(", ") ?? "");
  const [readTime, setReadTime] = useState(article?.read_time ?? 5);
  const [published, setPublished] = useState(article?.published ?? false);
  const [coverImage, setCoverImage] = useState(article?.cover_image ?? "");
  const [category, setCategory] = useState<ArticleCategory>(
    (article?.category as ArticleCategory) ?? "blog"
  );
  const [activeTab, setActiveTab] = useState<"write" | "preview">("write");
  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState("");

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleTitleChange = (value: string) => {
    setTitle(value);
    if (!article) {
      setSlug(generateSlug(value));
    }
  };

  const insertAtCursor = useCallback(
    (before: string, after = "", placeholder = "") => {
      const textarea = textareaRef.current;
      if (!textarea) return;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const selected = content.slice(start, end) || placeholder;
      const next =
        content.slice(0, start) + before + selected + after + content.slice(end);
      setContent(next);
      setTimeout(() => {
        textarea.focus();
        const pos = start + before.length + selected.length + after.length;
        textarea.setSelectionRange(pos, pos);
      }, 0);
    },
    [content]
  );

  const handleUpload = useCallback(
    async (files: File[]) => {
      const images = files.filter((f) => f.type.startsWith("image/"));
      if (images.length === 0) return;
      setIsUploading(true);
      try {
        const urls = await Promise.all(images.map(uploadImageToServer));
        const markdown = urls.map((url) => `![image](${url})`).join("\n");
        insertAtCursor(markdown);
      } catch (err: unknown) {
        setSaveError(err instanceof Error ? err.message : "Image upload failed");
      } finally {
        setIsUploading(false);
      }
    },
    [insertAtCursor]
  );

  const handlePaste = async (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
    const items = Array.from(e.clipboardData.items);
    const imageItems = items.filter((i) => i.type.startsWith("image/"));
    if (imageItems.length === 0) return;
    e.preventDefault();
    const files = imageItems
      .map((i) => i.getAsFile())
      .filter((f): f is File => f !== null);
    await handleUpload(files);
  };

  const handleDrop = async (e: React.DragEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    await handleUpload(Array.from(e.dataTransfer.files));
  };

  const handleFileInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    await handleUpload(files);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSave = async (publishState: boolean) => {
    setSaveError("");
    if (!title.trim()) return setSaveError("Title is required");
    if (!slug.trim()) return setSaveError("Slug is required");
    if (!content.trim()) return setSaveError("Content is required");
    setIsSaving(true);
    try {
      await onSave({
        title: title.trim(),
        slug: slug.trim(),
        excerpt: excerpt.trim(),
        content,
        tags: tags
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
        read_time: readTime,
        published: publishState,
        category,
        cover_image: coverImage.trim() || null,
      });
    } catch (err: unknown) {
      setSaveError(err instanceof Error ? err.message : "Save failed");
      setIsSaving(false);
    }
  };

  const toolbarBtn =
    "p-1.5 rounded text-[#666] hover:bg-[#f0f0f0] hover:text-[#333] transition-colors disabled:opacity-40 disabled:cursor-not-allowed";

  return (
    <div className="min-h-screen bg-[#f8f8f8] flex flex-col">
      {/* Top bar */}
      <header className="sticky top-0 z-20 bg-white border-b border-[#eee] shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center gap-3">
          <Link
            href="/admin"
            className="flex items-center gap-1.5 text-sm text-[#999] hover:text-[#333] transition-colors shrink-0"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Link>

          <div className="w-px h-5 bg-[#eee] shrink-0" />

          <input
            type="text"
            value={title}
            onChange={(e) => handleTitleChange(e.target.value)}
            placeholder="Article title…"
            className="flex-1 text-base font-semibold bg-transparent outline-none text-[#333] placeholder:text-[#ccc] min-w-0"
          />

          <div className="flex items-center gap-2 shrink-0">
            {saveError && (
              <span className="text-xs text-red-500 hidden sm:block">
                {saveError}
              </span>
            )}
            <button
              onClick={() => handleSave(false)}
              disabled={isSaving}
              className="px-3 py-1.5 text-sm rounded-lg border border-[#ddd] text-[#666] hover:bg-[#f8f8f8] hover:text-[#333] transition-colors disabled:opacity-50"
            >
              Save Draft
            </button>
            <button
              onClick={() => handleSave(true)}
              disabled={isSaving}
              className="px-3 py-1.5 text-sm rounded-lg bg-[#333] text-white hover:bg-[#555] transition-colors disabled:opacity-50 flex items-center gap-1.5"
            >
              {isSaving && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
              Publish
            </button>
            <div className="w-px h-5 bg-[#eee]" />
            <LogoutButton />
          </div>
        </div>
        {/* Mobile error */}
        {saveError && (
          <div className="sm:hidden px-4 py-1.5 bg-red-50 text-xs text-red-500">
            {saveError}
          </div>
        )}
      </header>

      {/* Body */}
      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 flex gap-6 items-start">
        {/* Editor + Preview */}
        <div className="flex-1 min-w-0">
          {/* Tabs */}
          <div className="flex items-center gap-1 border-b border-[#eee] mb-3">
            {(["write", "preview"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 text-sm font-medium capitalize transition-colors ${
                  activeTab === tab
                    ? "text-[#333] border-b-2 border-[#333]"
                    : "text-[#999] hover:text-[#333]"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {activeTab === "write" ? (
            <div className="bg-white rounded-xl border border-[#eee] overflow-hidden">
              {/* Toolbar */}
              <div className="flex items-center gap-0.5 px-3 py-2 border-b border-[#f0f0f0] flex-wrap">
                <button
                  className={toolbarBtn}
                  title="Bold"
                  onClick={() => insertAtCursor("**", "**", "bold text")}
                >
                  <Bold className="w-4 h-4" />
                </button>
                <button
                  className={toolbarBtn}
                  title="Italic"
                  onClick={() => insertAtCursor("*", "*", "italic text")}
                >
                  <Italic className="w-4 h-4" />
                </button>
                <div className="w-px h-4 bg-[#eee] mx-1" />
                <button
                  className={toolbarBtn}
                  title="Heading 2"
                  onClick={() => insertAtCursor("## ", "", "Heading")}
                >
                  <Heading2 className="w-4 h-4" />
                </button>
                <button
                  className={toolbarBtn}
                  title="Heading 3"
                  onClick={() => insertAtCursor("### ", "", "Heading")}
                >
                  <Heading3 className="w-4 h-4" />
                </button>
                <div className="w-px h-4 bg-[#eee] mx-1" />
                <button
                  className={toolbarBtn}
                  title="Link"
                  onClick={() => insertAtCursor("[", "](https://)", "link text")}
                >
                  <Link2 className="w-4 h-4" />
                </button>
                <button
                  className={toolbarBtn}
                  title="Inline code"
                  onClick={() => insertAtCursor("`", "`", "code")}
                >
                  <Code className="w-4 h-4" />
                </button>
                <button
                  className={toolbarBtn}
                  title="Code block"
                  onClick={() =>
                    insertAtCursor("```\n", "\n```", "code block")
                  }
                >
                  <span className="text-xs font-mono font-bold">{"{ }"}</span>
                </button>
                <button
                  className={toolbarBtn}
                  title="Blockquote"
                  onClick={() => insertAtCursor("> ", "", "quote")}
                >
                  <Quote className="w-4 h-4" />
                </button>
                <button
                  className={toolbarBtn}
                  title="Unordered list"
                  onClick={() => insertAtCursor("- ", "", "list item")}
                >
                  <List className="w-4 h-4" />
                </button>
                <div className="w-px h-4 bg-[#eee] mx-1" />
                <button
                  className={`${toolbarBtn} flex items-center gap-1 text-xs`}
                  title="Insert image (or paste / drag)"
                  disabled={isUploading}
                  onClick={() => fileInputRef.current?.click()}
                >
                  {isUploading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <ImageIcon className="w-4 h-4" />
                  )}
                  <span>{isUploading ? "Uploading…" : "Image"}</span>
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={handleFileInput}
                />
              </div>

              {/* Textarea */}
              <textarea
                ref={textareaRef}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                onPaste={handlePaste}
                onDrop={handleDrop}
                onDragOver={(e) => e.preventDefault()}
                placeholder={`Write your article in Markdown…\n\nTips:\n• Paste or drag-and-drop images directly here\n• Use the toolbar above for formatting shortcuts`}
                className="w-full h-[calc(100vh-260px)] min-h-[400px] p-4 font-mono text-sm leading-relaxed text-[#333] placeholder:text-[#ccc] resize-none outline-none bg-transparent"
              />
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-[#eee] p-6 min-h-[500px] prose prose-sm max-w-none">
              {content ? (
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {content}
                </ReactMarkdown>
              ) : (
                <p className="text-[#ccc] text-sm">Nothing to preview yet.</p>
              )}
            </div>
          )}
        </div>

        {/* Sidebar */}
        <aside className="w-64 shrink-0 hidden lg:block">
          <div className="bg-white rounded-xl border border-[#eee] p-4 space-y-4">
            <h3 className="text-sm font-semibold text-[#333]">Settings</h3>

            <label className="block">
              <span className="text-xs text-[#999] mb-1 block">Category</span>
              <div className="flex flex-wrap gap-1.5">
                {ARTICLE_CATEGORIES.map((cat) => (
                  <button
                    key={cat.value}
                    type="button"
                    onClick={() => setCategory(cat.value as ArticleCategory)}
                    className={`px-3 py-1 text-xs rounded-full border transition-colors ${
                      category === cat.value
                        ? "bg-[#333] text-white border-[#333]"
                        : "bg-[#fafafa] text-[#666] border-[#eee] hover:border-[#ccc]"
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </label>

            <label className="block">
              <span className="text-xs text-[#999] mb-1 block">Slug</span>
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="article-slug"
                className="w-full px-3 py-1.5 text-sm rounded-lg border border-[#eee] bg-[#fafafa] text-[#333] outline-none focus:border-[#ccc]"
              />
            </label>

            <label className="block">
              <span className="text-xs text-[#999] mb-1 block">Excerpt</span>
              <textarea
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                placeholder="Brief summary…"
                rows={3}
                className="w-full px-3 py-1.5 text-sm rounded-lg border border-[#eee] bg-[#fafafa] text-[#333] outline-none focus:border-[#ccc] resize-none"
              />
            </label>

            <label className="block">
              <span className="text-xs text-[#999] mb-1 block">
                Tags (comma separated)
              </span>
              <input
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="React, TypeScript…"
                className="w-full px-3 py-1.5 text-sm rounded-lg border border-[#eee] bg-[#fafafa] text-[#333] outline-none focus:border-[#ccc]"
              />
            </label>

            <label className="block">
              <span className="text-xs text-[#999] mb-1 block">
                Read time (min)
              </span>
              <input
                type="number"
                value={readTime}
                min={1}
                onChange={(e) => setReadTime(parseInt(e.target.value) || 1)}
                className="w-full px-3 py-1.5 text-sm rounded-lg border border-[#eee] bg-[#fafafa] text-[#333] outline-none focus:border-[#ccc]"
              />
            </label>

            <label className="block">
              <span className="text-xs text-[#999] mb-1 block">
                Cover image URL
              </span>
              <input
                type="text"
                value={coverImage}
                onChange={(e) => setCoverImage(e.target.value)}
                placeholder="https://…"
                className="w-full px-3 py-1.5 text-sm rounded-lg border border-[#eee] bg-[#fafafa] text-[#333] outline-none focus:border-[#ccc]"
              />
            </label>

            <div className="flex items-center justify-between pt-1">
              <span className="text-xs text-[#999]">Published</span>
              <button
                onClick={() => setPublished((p) => !p)}
                className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                  published ? "bg-[#333]" : "bg-[#ddd]"
                }`}
              >
                <span
                  className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow transition-transform ${
                    published ? "translate-x-4" : "translate-x-0.5"
                  }`}
                />
              </button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
