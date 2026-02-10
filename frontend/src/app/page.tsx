import { getEvents, getCities } from "@/lib/api";
import HomeContent from "@/components/HomeContent";

export const revalidate = 60;

export default async function HomePage() {
  const now = new Date();
  const [eventsData, cities] = await Promise.all([
    getEvents({ month: now.getMonth() + 1, year: now.getFullYear() }),
    getCities(),
  ]);

  return <HomeContent initialEvents={eventsData.results} cities={cities} />;
}
