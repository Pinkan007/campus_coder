import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Hero = () => {
  return (
    <section className="bg-background py-16 md:py-24">
      <div className="container mx-auto px-4 text-center">
        {/* Greeting */}
        <h2 className="text-2xl md:text-3xl text-primary font-bold mb-4">
          Good Morning
        </h2>

        {/* Main Heading */}
        <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
          Welcome to <br />
          <span className="text-primary">TheCampusCoders</span>
        </h1>

        {/* Subtext */}
        <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
          Discover the resources, projects, and connections to accelerate your
          coding journey.
        </p>

        {/* Search Bar */}
        <div className="max-w-md mx-auto relative mb-8">
          <Input
            placeholder="Start typing to search..."
            className="pl-4 pr-16 py-3 text-lg rounded-lg"
          />
          <Button size="sm" className="absolute right-2 top-2">
            Search
          </Button>
        </div>

        {/* Explore Categories Button */}
        <div className="mb-8">
          <span className="text-sm text-muted-foreground uppercase tracking-wider">
            EXPLORE CATEGORIES
          </span>
        </div>
      </div>
    </section>
  );
};

export default Hero;
