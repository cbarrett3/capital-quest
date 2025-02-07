import CountryList from "@/app/components/country-list";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      <CountryList />
    </main>
  );
}