import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, MessageCircle } from "lucide-react";

const highlights = [
  {
    title: "Top 5 React Libraries to Explore",
    category: "React",
    date: "Aug 21, 2024",
    comments: 8,
    readTime: null,
    image:
      "https://media.geeksforgeeks.org/wp-content/uploads/20240222170028/Top-5-React-UI--component-Libraries-of-2024-copy.webp",
  },
  {
    title: "JavaScript Best Practices",
    category: "JavaScript",
    date: null,
    comments: 15,
    readTime: "6 min read",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2GqqoPTla62a66sNcqTNsotM90R-wZSam7Q&s",
  },
  {
    title: "Understanding CSS Grid",
    category: "CSS",
    date: null,
    comments: 12,
    readTime: "8 min read",
    image: "https://i.ytimg.com/vi/68O6eOGAGqA/maxresdefault.jpg",
  },
];

const WeeklyHighlights = () => {
  return (
    <section className="py-16 bg-accent/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Weekly Highlights
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Stay updated with our most popular content from this week
          </p>
        </div>

        {/* Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {highlights.map((highlight, index) => (
            <Card
              key={index}
              className="group hover:shadow-lg transition-all duration-300 cursor-pointer hover:-translate-y-1 overflow-hidden"
            >
              {/* Image */}
              <div className="aspect-video overflow-hidden">
                <img
                  src={highlight.image}
                  alt={highlight.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              <CardContent className="p-6">
                {/* Category Badge */}
                <Badge variant="secondary" className="mb-3">
                  {highlight.category}
                </Badge>

                {/* Title */}
                <h3 className="text-xl font-semibold text-foreground mb-4 group-hover:text-primary transition-colors line-clamp-2">
                  {highlight.title}
                </h3>

                {/* Meta Information */}
                <div className="flex items-center text-sm text-muted-foreground space-x-4">
                  {highlight.date && <span>{highlight.date}</span>}

                  {highlight.readTime && (
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{highlight.readTime}</span>
                    </div>
                  )}

                  <div className="flex items-center space-x-1">
                    <MessageCircle className="w-4 h-4" />
                    <span>{highlight.comments} comments</span>
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

export default WeeklyHighlights;
