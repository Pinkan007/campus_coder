import { Card, CardContent } from "@/components/ui/card";
import { 
  BookOpen, 
  ShoppingBag, 
  Code, 
  Briefcase, 
  MapPin, 
  Calendar,
  GraduationCap,
  FileText,
  MoreHorizontal
} from "lucide-react";

const categories = [
  {
    title: "Blog",
    description: "Read the latest blogs",
    icon: BookOpen,
    href: "/blogs"
  },
  {
    title: "Store", 
    description: "Explore our store",
    icon: ShoppingBag,
    href: "/store"
  },
  {
    title: "Project",
    description: "Discover innovative projects", 
    icon: Code,
    href: "/projects"
  },
  {
    title: "Freelance",
    description: "Hire top freelancers",
    icon: Briefcase,
    href: "/freelance"
  },
  {
    title: "Job",
    description: "Find the latest jobs",
    icon: MapPin,
    href: "/jobs"
  },
  {
    title: "Event",
    description: "Explore upcoming events",
    icon: Calendar,
    href: "/events"
  },
  {
    title: "Tutorials",
    description: "Learn with our tutorials",
    icon: GraduationCap,
    href: "/tutorials"
  },
  {
    title: "Cheatsheet",
    description: "Access developer cheatsheets",
    icon: FileText,
    href: "/cheatsheet"
  },
  {
    title: "More Categories",
    description: "View more categories",
    icon: MoreHorizontal,
    href: "/more-categories"
  }
];

const Categories = () => {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Featured Categories
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore our wide range of categories to find exactly what you're looking for
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <Card key={index} className="group hover:shadow-lg transition-all duration-300 cursor-pointer hover:-translate-y-1">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <category.icon className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {category.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {category.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;