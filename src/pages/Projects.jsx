import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';
import { Github, ExternalLink, Star, GitFork, Search, Code, Users, Eye } from 'lucide-react';

/**
 * @typedef {Object} Project
 * @property {number} id
 * @property {string} title
 * @property {string} description
 * @property {string} author
 * @property {string[]} tags
 * @property {number} stars
 * @property {number} forks
 * @property {string} language
 * @property {string} lastUpdated
 * @property {boolean} featured
 * @property {string} image
 * @property {string} githubUrl
 * @property {string} liveUrl
 */

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
    lastUpdated: "2025-10-10",
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
    lastUpdated: "2025-10-08",
    featured: false,
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
    lastUpdated: "2025-10-12",
    featured: false,
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
    lastUpdated: "2025-10-07",
    featured: false,
    image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400&h=200&fit=crop",
    githubUrl: "https://github.com/example/campus-events",
    liveUrl: "https://campus-events.demo.com"
  }
];

const technologies = ["All", "React", "Vue.js", "Python", "Node.js", "TypeScript", "JavaScript", "MongoDB", "Firebase"];
const sortOptions = ["Most Stars", "Most Forks", "Recently Updated", "Newest"];

const Projects = () => {
  const { hasSubscription } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTech, setSelectedTech] = useState('All');
  const [sortBy, setSortBy] = useState('Most Stars');
  const [filteredProjects, setFilteredProjects] = useState(mockProjects);

  useEffect(() => {
    filterProjects();
  }, [searchTerm, selectedTech, sortBy]);

  const filterProjects = () => {
    let filtered = [...mockProjects];

    // Filter by search
    if (searchTerm) {
      filtered = filtered.filter(p =>
        p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Filter by tech
    if (selectedTech !== 'All') {
      filtered = filtered.filter(p => p.tags.includes(selectedTech) || p.language === selectedTech);
    }

    // Sort
    switch (sortBy) {
      case 'Most Stars': filtered.sort((a, b) => b.stars - a.stars); break;
      case 'Most Forks': filtered.sort((a, b) => b.forks - a.forks); break;
      case 'Recently Updated': filtered.sort((a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime()); break;
      case 'Newest': filtered.sort((a, b) => b.id - a.id); break;
    }

    setFilteredProjects(filtered);
  };

  const canViewProject = (index) => hasSubscription('premium') || index < 3;

  const featuredProject = filteredProjects.find(p => p.featured);

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">

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

      {/* Search & Filters */}
      <div className="flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search projects, technologies, or descriptions..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <select 
          value={sortBy}
          onChange={e => setSortBy(e.target.value)}
          className="px-3 py-2 border rounded-md bg-background"
        >
          {sortOptions.map(opt => <option key={opt}>{opt}</option>)}
        </select>
      </div>

      <div className="flex flex-wrap gap-2">
        {technologies.map(t => (
          <Button key={t} variant={selectedTech === t ? "default" : "outline"} size="sm" onClick={() => setSelectedTech(t)}>
            {t}
          </Button>
        ))}
      </div>

      {/* Featured Project */}
      {featuredProject && (
        <Card className="overflow-hidden border-primary">
          <div className="md:flex">
            <div className="md:w-1/2">
              <img src={featuredProject.image} alt={featuredProject.title} className="w-full h-64 md:h-full object-cover" />
            </div>
            <div className="md:w-1/2 p-6">
              <Badge className="mb-2">Featured</Badge>
              <h2 className="text-2xl font-bold mb-2">{featuredProject.title}</h2>
              <p className="text-muted-foreground mb-4">{featuredProject.description}</p>
              <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-4">
                <div className="flex items-center"><Users className="h-4 w-4 mr-1" />{featuredProject.author}</div>
                <div className="flex items-center"><Star className="h-4 w-4 mr-1" />{featuredProject.stars}</div>
                <div className="flex items-center"><GitFork className="h-4 w-4 mr-1" />{featuredProject.forks}</div>
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                {featuredProject.tags?.map((tag,i)=><Badge key={i} variant="secondary">{tag}</Badge>)}
              </div>
              <div className="flex gap-2">
                <Button size="sm" asChild><a href={featuredProject.githubUrl} target="_blank" rel="noopener noreferrer"><Github className="h-4 w-4 mr-1" />Code</a></Button>
                <Button size="sm" asChild variant="outline"><a href={featuredProject.liveUrl} target="_blank" rel="noopener noreferrer"><Eye className="h-4 w-4 mr-1" />Demo</a></Button>
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.filter(p => !p.featured).map((project, index) => (
          <Card key={project.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="aspect-video overflow-hidden relative">
              <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
              {!canViewProject(index) && (
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
              <div className="flex items-center justify-between text-sm mb-2">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center"><Star className="h-4 w-4 mr-1 text-yellow-500" />{project.stars}</div>
                  <div className="flex items-center"><GitFork className="h-4 w-4 mr-1" />{project.forks}</div>
                </div>
                <div className="flex items-center text-muted-foreground"><Users className="h-4 w-4 mr-1" />{project.author}</div>
              </div>
              <div className="flex flex-wrap gap-1 mb-2">
                {project.tags?.slice(0,3).map((tag,i)=><Badge key={i} variant="secondary" className="text-xs">{tag}</Badge>)}
                {project.tags?.length > 3 && <Badge variant="secondary" className="text-xs">+{project.tags.length - 3}</Badge>}
              </div>
              {canViewProject(index) ? (
                <div className="flex space-x-2">
                  <Button size="sm" asChild className="flex-1"><a href={project.githubUrl} target="_blank" rel="noopener noreferrer"><Github className="h-4 w-4 mr-1" />Code</a></Button>
                  <Button size="sm" asChild variant="outline" className="flex-1"><a href={project.liveUrl} target="_blank" rel="noopener noreferrer"><Eye className="h-4 w-4 mr-1" />Demo</a></Button>
                </div>
              ) : (
                <Button disabled className="w-full" size="sm">Premium Required</Button>
              )}
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
  );
};

export default Projects;
