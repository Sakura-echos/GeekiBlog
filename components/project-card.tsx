import { ExternalLink, Github } from "lucide-react";

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  demoUrl?: string;
  githubUrl?: string;
  className?: string;
}

/**
 * 项目卡片组件
 * 用于展示项目信息
 */
export function ProjectCard({
  title,
  description,
  tags,
  demoUrl,
  githubUrl,
  className,
}: ProjectCardProps) {
  return (
    <article
      className={`group p-6 rounded-2xl border border-border bg-background-secondary hover:shadow-hover transition-all duration-300 ${className}`}
    >
      {/* 标题 */}
      <h3 className="text-xl font-semibold text-text-primary mb-3">{title}</h3>

      {/* 描述 */}
      <p className="text-sm text-text-secondary leading-relaxed mb-4">
        {description}
      </p>

      {/* 技术标签 */}
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 text-xs rounded-full bg-background text-text-secondary border border-border"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* 链接按钮 */}
      <div className="flex gap-3">
        {demoUrl && (
          <a
            href={demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-text-primary bg-background rounded-lg hover:bg-border transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            <span>Demo</span>
          </a>
        )}
        {githubUrl && (
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-text-primary bg-background rounded-lg hover:bg-border transition-colors"
          >
            <Github className="w-4 h-4" />
            <span>Code</span>
          </a>
        )}
      </div>
    </article>
  );
}
