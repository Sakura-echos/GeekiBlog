import { redirect } from "next/navigation";

export default function BlogRedirect({
  params: { locale },
}: {
  params: { locale: string };
}) {
  redirect(`/${locale}/articles?category=blog`);
}
