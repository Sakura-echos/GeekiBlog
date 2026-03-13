import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { getResumeAssetUrl, RESUME_ASSETS } from "@/lib/resume";
import { ResumeAvatar } from "@/components/resume-avatar";
import { resumeData } from "@/lib/resume-data";
import type { ResumeLocale } from "@/lib/resume-data";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://geekiblog.vercel.app";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const isZh = locale === "zh";
  return {
    title: isZh ? "简历" : "Resume",
    description: isZh
      ? "黄梓杰的个人简历 — 前端开发工程师，3年港澳 Web / App 开发经验"
      : "Zijie Huang's Resume — Frontend Developer with 3+ years of Web & App experience in HK/Macau",
    alternates: {
      canonical: `${siteUrl}/${locale}/resume`,
    },
    openGraph: {
      title: isZh ? "简历 | Geeki's Blog" : "Resume | Geeki's Blog",
      description: isZh
        ? "黄梓杰的个人简历 — 前端开发工程师，3年港澳 Web / App 开发经验"
        : "Zijie Huang's Resume — Frontend Developer with 3+ years of Web & App experience in HK/Macau",
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
  const resumeZhUrl = getResumeAssetUrl(RESUME_ASSETS.resumeZh);
  const resumeEnUrl = getResumeAssetUrl(RESUME_ASSETS.resumeEn);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 max-w-4xl">
        {/* Header: download buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          <a
            href={resumeZhUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg border border-border bg-background-secondary text-text-primary text-sm font-medium hover:shadow-hover transition-all"
          >
            {t("downloadZh")}
          </a>
          <a
            href={resumeEnUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg border border-border bg-background-secondary text-text-primary text-sm font-medium hover:shadow-hover transition-all"
          >
            {t("downloadEn")}
          </a>
        </div>

        {/* Name + contact + avatar */}
        <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-8 mb-12 pb-10 border-b border-border">
          <div className="flex flex-col gap-1.5 text-text-secondary text-sm order-2 md:order-1">
            <p>{data.contact.address}</p>
            <a
              href={`mailto:${data.contact.email}`}
              className="text-text-primary hover:underline"
            >
              {data.contact.email}
            </a>
            <a
              href={`tel:${data.contact.phone.replace(/\s/g, "")}`}
              className="text-text-primary hover:underline"
            >
              {data.contact.phone}
            </a>
          </div>

          <div className="flex flex-col items-center gap-4 order-1 md:order-2">
            <ResumeAvatar src={avatarUrl} alt={data.name} />
            <h1 className="text-3xl md:text-4xl font-bold text-text-primary text-center">
              {data.name}
            </h1>
          </div>

          <div className="hidden md:block w-[120px] shrink-0 order-3" />
        </header>

        {/* Section: Skills */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-text-primary mb-4">
            {t("skills")}
          </h2>
          <ul className="space-y-1.5 text-text-secondary text-sm leading-relaxed">
            <li>{data.skills.techStack}</li>
            <li>{data.skills.languages}</li>
          </ul>
        </section>

        <hr className="border-border mb-10" />

        {/* Section: Work Experience */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-text-primary mb-6">
            {t("workExperience")}
          </h2>
          <div className="space-y-6">
            {data.work.map((job) => (
              <div key={job.company}>
                <div className="flex flex-wrap items-baseline justify-between gap-2 mb-1">
                  <span className="font-semibold text-text-primary">
                    {job.company}
                  </span>
                  <span className="text-sm text-text-light">{job.period}</span>
                </div>
                <p className="text-sm text-text-secondary font-medium mb-2">
                  {job.role}
                </p>
                {job.companyDesc && (
                  <p className="text-sm text-text-secondary mb-3">
                    {job.companyUrl ? (
                      <a
                        href={job.companyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline"
                      >
                        {job.companyDesc}
                      </a>
                    ) : (
                      job.companyDesc
                    )}
                  </p>
                )}
                <ul className="list-disc list-inside space-y-1 text-sm text-text-secondary">
                  {job.points.map((point, i) => (
                    <li key={i}>{point}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-border mb-10" />

        {/* Section: Project Experience */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-text-primary mb-6">
            {t("projectExperience")}
          </h2>
          <div className="space-y-6">
            {data.projects.map((project) => (
              <div key={project.name}>
                <h3 className="font-semibold text-text-primary mb-1">
                  {project.name}
                </h3>
                <p className="text-sm text-text-secondary mb-2">
                  {project.description}
                </p>
                <ul className="list-disc list-inside space-y-1 text-sm text-text-secondary">
                  {project.points.map((point, i) => (
                    <li key={i}>{point}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-border mb-10" />

        {/* Section: Education */}
        <section>
          <h2 className="text-xl font-semibold text-text-primary mb-6">
            {t("education")}
          </h2>
          <div className="space-y-6">
            {data.education.map((edu) => (
              <div key={`${edu.school}-${edu.period}`}>
                <div className="flex flex-wrap items-baseline justify-between gap-2 mb-1">
                  <span className="font-semibold text-text-primary">
                    {edu.major} - {edu.school}
                  </span>
                  <span className="text-sm text-text-light">{edu.period}</span>
                </div>
                <p className="text-sm text-text-secondary mb-2">
                  {edu.location}
                </p>
                <ul className="list-disc list-inside space-y-1 text-sm text-text-secondary">
                  {edu.points.map((point, i) => (
                    <li key={i}>{point}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
