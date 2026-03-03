import { redirect } from "next/navigation";

export default function TripSlugRedirect({
  params: { locale, slug },
}: {
  params: { locale: string; slug: string };
}) {
  redirect(`/${locale}/articles/${slug}`);
}
