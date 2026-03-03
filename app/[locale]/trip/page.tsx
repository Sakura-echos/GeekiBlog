import { redirect } from "next/navigation";

export default function TripRedirect({
  params: { locale },
}: {
  params: { locale: string };
}) {
  redirect(`/${locale}/articles?category=trip`);
}
