import { useTranslations } from "next-intl";
import { MasonryGrid } from "@/components/masonry-grid";
import { ProjectCard } from "@/components/project-card";
import { projects } from "@/lib/project-data";

/**
 * 项目展示页面
 * 使用瀑布流布局展示所有项目
 */
export default function ProjectsPage() {
  const t = useTranslations("projects");

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      {/* 页面标题 */}
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary mb-4">
          {t("title")}
        </h1>
        <p className="text-base md:text-lg text-text-secondary">
          {t("subtitle")}
        </p>
      </div>

      {/* 项目列表 - 瀑布流布局 */}
      {projects.length > 0 ? (
        <MasonryGrid className="max-w-7xl mx-auto">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              title={project.title}
              description={project.description}
              tags={project.tags}
              demoUrl={project.demoUrl}
              githubUrl={project.githubUrl}
            />
          ))}
        </MasonryGrid>
      ) : (
        <div className="text-center py-20">
          <p className="text-text-secondary">{t("noProjects")}</p>
        </div>
      )}
    </div>
  );
}
