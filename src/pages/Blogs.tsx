import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';
import { BookOpen, Calendar, User, Search, Filter } from 'lucide-react';

const mockBlogs = [
  {
    id: 1,
    title: "Getting Started with React Hooks",
    excerpt: "Learn the fundamentals of React Hooks and how to use them effectively in your projects.",
    author: "Jane Doe",
    date: "2024-01-15",
    category: "React",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=200&fit=crop",
    featured: true
  },
  {
    id: 2,
    title: "Building REST APIs with Node.js",
    excerpt: "A comprehensive guide to creating robust REST APIs using Node.js and Express.",
    author: "John Smith",
    date: "2024-01-12",
    category: "Node.js",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400&h=200&fit=crop"
  },
  {
    id: 3,
    title: "CSS Grid vs Flexbox: When to Use Which",
    excerpt: "Understanding the differences between CSS Grid and Flexbox and choosing the right tool.",
    author: "Alice Johnson",
    date: "2024-01-10",
    category: "CSS",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=200&fit=crop"
  },
  {
    id: 4,
    title: "Introduction to TypeScript",
    excerpt: "Get started with TypeScript and improve your JavaScript development workflow.",
    author: "Bob Wilson",
    date: "2024-01-08",
    category: "TypeScript",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=200&fit=crop"
  }
];

const categories = ["All", "React", "Node.js", "CSS", "TypeScript", "JavaScript", "Python"];

const Blogs = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [filteredBlogs, setFilteredBlogs] = useState(mockBlogs);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    filterBlogs(term, selectedCategory);
  };

  const handleCategoryFilter = (category: string) => {
    setSelectedCategory(category);
    filterBlogs(searchTerm, category);
  };

  const filterBlogs = (search: string, category: string) => {
    let filtered = mockBlogs;
    
    if (search) {
      filtered = filtered.filter(blog =>
        blog.title.toLowerCase().includes(search.toLowerCase()) ||
        blog.excerpt.toLowerCase().includes(search.toLowerCase())
      );
    }
    
    if (category !== 'All') {
      filtered = filtered.filter(blog => blog.category === category);
    }
    
    setFilteredBlogs(filtered);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-foreground">Developer Blog</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Stay updated with the latest tutorials, tips, and insights from the developer community
          </p>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search blogs..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => handleCategoryFilter(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Featured Blog */}
        {filteredBlogs.find(blog => blog.featured) && (
          <Card className="overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/2">
                <img 
                  src={filteredBlogs.find(blog => blog.featured)?.image} 
                  alt="Featured blog"
                  className="w-full h-64 md:h-full object-cover"
                />
              </div>
              <div className="md:w-1/2 p-6">
                <Badge className="mb-2">Featured</Badge>
                <h2 className="text-2xl font-bold mb-2">{filteredBlogs.find(blog => blog.featured)?.title}</h2>
                <p className="text-muted-foreground mb-4">{filteredBlogs.find(blog => blog.featured)?.excerpt}</p>
                <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-4">
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-1" />
                    {filteredBlogs.find(blog => blog.featured)?.author}
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    {filteredBlogs.find(blog => blog.featured)?.date}
                  </div>
                  <div className="flex items-center">
                    <BookOpen className="h-4 w-4 mr-1" />
                    {filteredBlogs.find(blog => blog.featured)?.readTime}
                  </div>
                </div>
                <Button>Read More</Button>
              </div>
            </div>
          </Card>
        )}

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBlogs.filter(blog => !blog.featured).map((blog) => (
            <Card key={blog.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-video overflow-hidden">
                <img 
                  src={blog.image} 
                  alt={blog.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="secondary">{blog.category}</Badge>
                  <span className="text-sm text-muted-foreground">{blog.readTime}</span>
                </div>
                <CardTitle className="line-clamp-2">{blog.title}</CardTitle>
                <CardDescription className="line-clamp-3">{blog.excerpt}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <User className="h-4 w-4" />
                    <span>{blog.author}</span>
                  </div>
                  <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>{blog.date}</span>
                  </div>
                </div>
                <Button className="w-full mt-4" variant="outline">
                  Read Article
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredBlogs.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No blogs found</h3>
            <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Blogs;