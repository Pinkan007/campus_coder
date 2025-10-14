import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';
import { Github, ExternalLink, Star, GitFork, Search, Code, Users, Eye } from 'lucide-react';

const mockProjects = [
  {
    id: 1,
    title: "Campus Social Network",
    description: "A social platform specifically designed for college students to connect, share resources, and collaborate on projects.",
    author: "Sarah Chen",
    tags: ["React", "Node.js", "MongoDB", "Socket.io"],
    stars: 245,
    forks: 67,
    language: "JavaScript",
    lastUpdated: "2 days ago",
    featured: true,
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=200&fit=crop",
    githubUrl: "https://github.com/example/campus-social",
    liveUrl: "https://campus-social.demo.com"
  },
  {
    id: 2,
    title: "Code Review Bot",
    description: "An AI-powered bot that automatically reviews code submissions and provides helpful feedback to students.",
    author: "Alex Johnson",
    tags: ["Python", "FastAPI", "OpenAI", "Docker"],
    stars: 189,
    forks: 34,
    language: "Python",
    lastUpdated: "1 week ago",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=200&fit=crop",
    githubUrl: "https://github.com/example/code-review-bot",
    liveUrl: "https://codereview-bot.demo.com"
  },
  {
    id: 3,
    title: "Study Planner App",
    description: "A comprehensive study planning application with calendar integration, progress tracking, and collaboration features.",
    author: "Maria Rodriguez",
    tags: ["Vue.js", "Firebase", "PWA", "TypeScript"],
    stars: 156,
    forks: 23,
    language: "TypeScript",
    lastUpdated: "3 days ago",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=200&fit=crop",
    githubUrl: "https://github.com/example/study-planner",
    liveUrl: "https://study-planner.demo.com"
  },
  {
    id: 4,
    title: "Campus Event Finder",
    description: "Discover and organize campus events with real-time updates, RSVP functionality, and social features.",
    author: "David Kim",
    tags: ["React Native", "Express", "PostgreSQL", "Maps API"],
    stars: 198,
    forks: 45,
    language: "JavaScript",
    lastUpdated: "5 days ago",
    image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400&h=200&fit=crop",
    githubUrl: "https://github.com/example/campus-events",
    liveUrl: "https://campus-events.demo.com"
  }
];

const technologies = ["All", "React", "Vue.js", "Python", "Node.js", "TypeScript", "JavaScript", "MongoDB", "Firebase"];
const sortOptions = ["Most Stars", "Recently Updated", "Most Forks", "Newest"];

const Projects = () => {
  const { user, hasSubscription } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTech, setSelectedTech] = useState('All');
  const [sortBy, setSortBy] = useState('Most Stars');
  const [filteredProjects, setFilteredProjects] = useState(mockProjects);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    filterProjects(term, selectedTech);
  };

  const handleTechFilter = (tech: string) => {
    setSelectedTech(tech);
    filterProjects(searchTerm, tech);
  };

  const filterProjects = (search: string, tech: string) => {
    let filtered = mockProjects;
    
    if (search) {
      filtered = filtered.filter(project =>
        project.title.toLowerCase().includes(search.toLowerCase()) ||
        project.description.toLowerCase().includes(search.toLowerCase()) ||
        project.tags.some(tag => tag.toLowerCase().includes(search.toLowerCase()))
      );
    }
    
    if (tech !== 'All') {
      filtered = filtered.filter(project => 
        project.tags.includes(tech) || project.language === tech
      );
    }
    
    setFilteredProjects(filtered);
  };

  const canViewProject = (index: number) => {
    if (hasSubscription('premium')) return true;
    return index < 3; // Free users can view first 3 projects
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-foreground">Community Projects</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover amazing projects built by the campus coding community
          </p>
          {!hasSubscription('premium') && (
            <Card className="max-w-md mx-auto border-primary">
              <CardContent className="p-4 text-center">
                <p className="text-sm text-muted-foreground mb-2">
                  Free users can view 3 projects. Upgrade for unlimited access!
                </p>
                <Button size="sm" asChild>
                  <a href="/profile">Upgrade to Premium</a>
                </Button>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Search and Filters */}
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search projects, technologies, or descriptions..."
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-10"
              />
            </div>
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 border rounded-md bg-background"
            >
              {sortOptions.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {technologies.map((tech) => (
              <Button
                key={tech}
                variant={selectedTech === tech ? "default" : "outline"}
                size="sm"
                onClick={() => handleTechFilter(tech)}
              >
                {tech}
              </Button>
            ))}
          </div>
        </div>

        {/* Featured Project */}
        {filteredProjects.find(project => project.featured) && (
          <Card className="overflow-hidden border-primary">
            <div className="md:flex">
              <div className="md:w-1/2">
                <img 
                  src={filteredProjects.find(project => project.featured)?.image} 
                  alt="Featured project"
                  className="w-full h-64 md:h-full object-cover"
                />
              </div>
              <div className="md:w-1/2 p-6">
                <Badge className="mb-2">Featured</Badge>
                <h2 className="text-2xl font-bold mb-2">
                  {filteredProjects.find(project => project.featured)?.title}
                </h2>
                <p className="text-muted-foreground mb-4">
                  {filteredProjects.find(project => project.featured)?.description}
                </p>
                <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-4">
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-1" />
                    {filteredProjects.find(project => project.featured)?.author}
                  </div>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 mr-1" />
                    {filteredProjects.find(project => project.featured)?.stars}
                  </div>
                  <div className="flex items-center">
                    <GitFork className="h-4 w-4 mr-1" />
                    {filteredProjects.find(project => project.featured)?.forks}
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {filteredProjects.find(project => project.featured)?.tags.map((tag, i) => (
                    <Badge key={i} variant="secondary">{tag}</Badge>
                  ))}
                </div>
                <div className="flex space-x-2">
                  <Button>
                    <Github className="h-4 w-4 mr-2" />
                    View Code
                  </Button>
                  <Button variant="outline">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Live Demo
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.filter(project => !project.featured).map((project, index) => (
            <Card key={project.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-video overflow-hidden relative">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
                {!canViewProject(index + 1) && (
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                    <div className="text-center text-white">
                      <Code className="h-8 w-8 mx-auto mb-2" />
                      <p className="text-sm font-medium">Premium Required</p>
                    </div>
                  </div>
                )}
              </div>
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="outline">{project.language}</Badge>
                  <span className="text-xs text-muted-foreground">{project.lastUpdated}</span>
                </div>
                <CardTitle className="line-clamp-2">{project.title}</CardTitle>
                <CardDescription className="line-clamp-3">{project.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 mr-1 text-yellow-500" />
                        {project.stars}
                      </div>
                      <div className="flex items-center">
                        <GitFork className="h-4 w-4 mr-1" />
                        {project.forks}
                      </div>
                    </div>
                    <div className="flex items-center text-muted-foreground">
                      <Users className="h-4 w-4 mr-1" />
                      {project.author}
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-1">
                    {project.tags.slice(0, 3).map((tag, i) => (
                      <Badge key={i} variant="secondary" className="text-xs">{tag}</Badge>
                    ))}
                    {project.tags.length > 3 && (
                      <Badge variant="secondary" className="text-xs">+{project.tags.length - 3}</Badge>
                    )}
                  </div>
                  
                  {canViewProject(index + 1) ? (
                    <div className="flex space-x-2">
                      <Button size="sm" className="flex-1">
                        <Github className="h-4 w-4 mr-1" />
                        Code
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1">
                        <Eye className="h-4 w-4 mr-1" />
                        Demo
                      </Button>
                    </div>
                  ) : (
                    <Button disabled className="w-full" size="sm">
                      Premium Required
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <Code className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No projects found</h3>
            <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
          </div>
        )}

        {/* Submit Project CTA */}
        <Card className="text-center">
          <CardContent className="p-8">
            <Code className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Share Your Project</h3>
            <p className="text-muted-foreground mb-4">
              Built something awesome? Share it with the community and get feedback from fellow developers.
            </p>
            <Button>Submit Your Project</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Projects;