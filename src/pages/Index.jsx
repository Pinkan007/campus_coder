import Hero from "@/components/Hero";
import Categories from "@/components/Categories";
import WeeklyHighlights from "@/components/WeeklyHighlights";

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <section>
        <Hero />
      </section>

      <section className="py-8">
        <Categories />
      </section>

      <section className="py-8">
        <WeeklyHighlights />
      </section>
    </main>
  );
};

export default Index;
