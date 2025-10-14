import Hero from "@/components/Hero";
import Categories from "@/components/Categories";
import WeeklyHighlights from "@/components/WeeklyHighlights";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Hero />
      <Categories />
      <WeeklyHighlights />
    </div>
  );
};

export default Index;
