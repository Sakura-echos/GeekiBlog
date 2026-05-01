import type { Metadata } from "next";
import type { LucideIcon } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Globe, Languages, Mail, MapPin, Phone, User } from "lucide-react";
import { getResumeAssetUrl, RESUME_ASSETS } from "@/lib/resume";
import { ResumeAvatar } from "@/components/resume-avatar";
import { resumeData } from "@/lib/resume-data";
import type { ResumeLocale } from "@/lib/resume-data";
import { cn } from "@/lib/utils";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://geekiblog.com";

function ContactRow({
  icon: Icon,
  href,
  className,
  children,
}: {
  icon: LucideIcon;
  href?: string;
  className?: string;
  children: React.ReactNode;
}) {
  const inner = (
    <span
      className={cn(
        "flex items-start gap-2.5 text-sm text-text-secondary leading-snug",
        className
      )}
    >
      <Icon className="w-4 h-4 shrink-0 mt-0.5 text-text-light" aria-hidden />
      <span className="min-w-0 break-words">{children}</span>
    </span>
  );
  if (href) {
    return (
      <a
        href={href}
        className="rounded-md hover:text-text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        {inner}
      </a>
    );
  }
  return inner;
}

function SkillsPanel({
  skillGroups,
  heading,
  className,
}: {
  skillGroups: (typeof resumeData)["zh"]["skillGroups"];
  heading: string;
  className?: string;
}) {
  return (
    <div className={cn("space-y-5", className)}>
      <h2 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-text-light">
        {heading}
      </h2>
      <div className="space-y-4">
        {skillGroups.map((group) => (
          <div key={group.title}>
            <p className="text-xs font-medium text-text-primary mb-1.5">
              {group.title}
            </p>
            <ul className="space-y-1.5 text-xs text-text-secondary leading-relaxed">
              {group.items.map((item, i) => (
                <li key={i} className="pl-0">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const isZh = locale === "zh";
  return {
    title: isZh ? "简历" : "Resume",
    description: isZh
      ? "黄子杰的个人简历 — 前端 / 跨平台开发工程师，约 2 年港澳 Web 与 App 项目经验"
      : "Zijie Huang's resume — Frontend & cross-platform developer with ~2 years of Web & App delivery in Macau/HK",
    alternates: {
      canonical: `${siteUrl}/${locale}/resume`,
    },
    openGraph: {
      title: isZh ? "简历 | Geeki's Blog" : "Resume | Geeki's Blog",
      description: isZh
        ? "黄子杰的个人简历 — 前端 / 跨平台开发工程师，约 2 年港澳 Web 与 App 项目经验"
        : "Zijie Huang's resume — Frontend & cross-platform developer with ~2 years of Web & App delivery in Macau/HK",
      url: `${siteUrl}/${locale}/resume`,
    },
  };
}

export default async function ResumePage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations("resume");
  const lang = (locale === "zh" ? "zh" : "en") as ResumeLocale;
  const data = resumeData[lang];

  const avatarUrl = getResumeAssetUrl(RESUME_ASSETS.avatar);

  const asideContact = (
    <div className="flex flex-col gap-3">
      <ContactRow icon={MapPin}>{data.contact.location}</ContactRow>
      <ContactRow icon={Mail} href={`mailto:${data.contact.email}`}>
        {data.contact.email}
      </ContactRow>
      <ContactRow
        icon={Phone}
        href={`tel:${data.contact.phone.replace(/\s/g, "")}`}
      >
        {data.contact.phone}
      </ContactRow>
      <ContactRow icon={Globe} href={data.contact.blogUrl}>
        {data.contact.blogLabel}
      </ContactRow>
      <ContactRow icon={User}>{data.contact.age}</ContactRow>
      <ContactRow icon={Languages}>
        <span>
          <span className="text-text-light font-medium">
            {t("languages")}:{" "}
          </span>
          {data.contact.languages}
        </span>
      </ContactRow>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14 max-w-5xl">
        {/* Mobile header */}
        <header className="lg:hidden mb-10 pb-8 border-b border-border">
          <div className="flex flex-col items-center text-center gap-4">
            <ResumeAvatar
              src={avatarUrl}
              alt={data.name}
              className="w-28 h-28"
            />
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-text-primary tracking-tight">
                {data.name}
              </h1>
              <p className="mt-1 text-sm text-text-secondary font-medium">
                {data.headline}
              </p>
            </div>
            <div className="w-full max-w-md text-left">{asideContact}</div>
          </div>
        </header>

        <div className="lg:grid lg:grid-cols-[minmax(0,17.5rem)_1fr] lg:gap-12 xl:gap-14">
          <aside className="hidden lg:flex flex-col gap-8 lg:sticky lg:top-24 lg:self-start">
            <ResumeAvatar
              src={avatarUrl}
              alt={data.name}
              className="w-28 h-28"
            />
            <div>
              <h1 className="text-2xl font-bold text-text-primary tracking-tight leading-tight">
                {data.name}
              </h1>
              <p className="mt-1.5 text-sm text-text-secondary font-medium leading-snug">
                {data.headline}
              </p>
            </div>
            {asideContact}
            <SkillsPanel skillGroups={data.skillGroups} heading={t("skills")} />
          </aside>

          <main className="space-y-12 min-w-0">
            <section className="rounded-xl border border-border bg-background-secondary/40 p-6 sm:p-7">
              <h2 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-text-light mb-3">
                {t("profile")}
              </h2>
              <p className="text-sm text-text-secondary leading-relaxed">
                {data.summary}
              </p>
            </section>

            <SkillsPanel
              skillGroups={data.skillGroups}
              heading={t("skills")}
              className="lg:hidden border-b border-border pb-10"
            />

            <section>
              <h2 className="text-lg font-semibold text-text-primary mb-6 pb-2 border-b border-border">
                {t("workExperience")}
              </h2>
              <div className="space-y-8">
                {data.work.map((job) => (
                  <article key={job.company}>
                    <div className="flex flex-wrap items-baseline justify-between gap-2 gap-y-1 mb-1">
                      <h3 className="font-semibold text-text-primary">
                        {job.company}
                      </h3>
                      <time className="text-xs tabular-nums text-text-light shrink-0">
                        {job.period}
                      </time>
                    </div>
                    <p className="text-sm text-text-secondary font-medium mb-2">
                      {job.role}
                    </p>
                    {job.companyDesc && (
                      <p className="text-xs text-text-secondary mb-3 leading-relaxed">
                        {job.companyUrl ? (
                          <a
                            href={job.companyUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline underline-offset-2 hover:text-text-primary"
                          >
                            {job.companyDesc}
                          </a>
                        ) : (
                          job.companyDesc
                        )}
                      </p>
                    )}
                    <ul className="space-y-2 text-sm text-text-secondary leading-relaxed">
                      {job.points.map((point, i) => (
                        <li key={i} className="flex gap-2">
                          <span
                            className="text-text-light shrink-0 mt-1.5 w-1 h-1 rounded-full bg-text-light/80"
                            aria-hidden
                          />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-text-primary mb-6 pb-2 border-b border-border">
                {t("projectExperience")}
              </h2>
              <div className="space-y-8">
                {data.projects.map((project) => (
                  <article key={project.name}>
                    <h3 className="font-semibold text-text-primary mb-1">
                      {project.name}
                    </h3>
                    <p className="text-sm text-text-secondary mb-2 leading-relaxed">
                      {project.description}
                    </p>
                    {project.stack && (
                      <p className="text-[11px] text-text-light font-mono mb-3 leading-relaxed break-words">
                        <span className="font-sans font-medium text-text-secondary/90">
                          {t("techStack")}:{" "}
                        </span>
                        {project.stack}
                      </p>
                    )}
                    <ul className="space-y-2 text-sm text-text-secondary leading-relaxed">
                      {project.points.map((point, i) => (
                        <li key={i} className="flex gap-2">
                          <span
                            className="text-text-light shrink-0 mt-1.5 w-1 h-1 rounded-full bg-text-light/80"
                            aria-hidden
                          />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-text-primary mb-6 pb-2 border-b border-border">
                {t("education")}
              </h2>
              <div className="space-y-8">
                {data.education.map((edu) => (
                  <article key={`${edu.school}-${edu.period}`}>
                    <div className="flex flex-wrap items-baseline justify-between gap-2 gap-y-1 mb-1">
                      <h3 className="font-semibold text-text-primary">
                        {edu.school}
                      </h3>
                      <time className="text-xs tabular-nums text-text-light shrink-0">
                        {edu.period}
                      </time>
                    </div>
                    <p className="text-sm text-text-secondary mb-1">
                      {edu.major}
                    </p>
                    <p className="text-xs text-text-light mb-3">
                      {edu.location}
                    </p>
                    <ul className="space-y-2 text-sm text-text-secondary leading-relaxed">
                      {edu.points.map((point, i) => (
                        <li key={i} className="flex gap-2">
                          <span
                            className="text-text-light shrink-0 mt-1.5 w-1 h-1 rounded-full bg-text-light/80"
                            aria-hidden
                          />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}
