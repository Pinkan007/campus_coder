import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useAuth } from '@/contexts/AuthContext';
import { GraduationCap, Clock, Star, Play, BookOpen, Award } from 'lucide-react';

const learningPaths = [
  {
    id: 1,
    title: "Web Development Fundamentals",
    description: "Master the basics of HTML, CSS, and JavaScript",
    level: "Beginner",
    duration: "6 weeks",
    rating: 4.8,
    enrolled: 1200,
    progress: 75,
    modules: 12,
    completedModules: 9,
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=200&fit=crop",
    free: true
  },
  {
    id: 2,
    title: "React Development Mastery",
    description: "Build modern web applications with React and its ecosystem",
    level: "Intermediate",
    duration: "8 weeks",
    rating: 4.9,
    enrolled: 890,
    progress: 30,
    modules: 16,
    completedModules: 5,
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=200&fit=crop",
    free: false
  },
  {
    id: 3,
    title: "Full Stack Development",
    description: "Complete course covering frontend, backend, and deployment",
    level: "Advanced",
    duration: "12 weeks",
    rating: 4.7,
    enrolled: 567,
    progress: 0,
    modules: 24,
    completedModules: 0,
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=200&fit=crop",
    free: false
  }
];

const quickTutorials = [
  {
    id: 1,
    title: "CSS Grid in 10 Minutes",
    duration: "10 min",
    type: "Video",
    difficulty: "Beginner",
    thumbnail: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=150&fit=crop"
  },
  {
    id: 2,
    title: "JavaScript Promises Explained",
    duration: "15 min",
    type: "Article",
    difficulty: "Intermediate",
    thumbnail: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=300&h=150&fit=crop"
  },
  {
    id: 3,
    title: "React Hooks Deep Dive",
    duration: "20 min",
    type: "Video",
    difficulty: "Intermediate",
    thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=300&h=150&fit=crop"
  }
];

const achievements = [
  { name: "First Steps", description: "Complete your first tutorial", unlocked: true },
  { name: "Code Warrior", description: "Complete 5 tutorials", unlocked: true },
  { name: "Learning Master", description: "Complete a full learning path", unlocked: false },
  { name: "Community Helper", description: "Help 10 other learners", unlocked: false }
];

// Helper functions
const getLevelBadge = (level) => {
  switch(level) {
    case 'Beginner': return 'default';
    case 'Intermediate': return 'secondary';
    case 'Advanced': return 'destructive';
    default: return 'default';
  }
};

const Learn = () => {
  const { hasSubscription } = useAuth();
  const [activeTab, setActiveTab] = useState('paths');

  const canAccessContent = (isFree) => {
    return isFree || hasSubscription('premium');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-8">

        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-foreground">Learning Center</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Advance your skills with structured learning paths and hands-on tutorials
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex justify-center">
          <div className="flex space-x-1 bg-muted p-1 rounded-lg">
            {['paths', 'tutorials', 'achievements'].map((tab) => (
              <Button
                key={tab}
                variant={activeTab === tab ? 'default' : 'ghost'}
                onClick={() => setActiveTab(tab)}
                className="rounded-md capitalize"
              >
                {tab.replace(/^\w/, c => c.toUpperCase()).replace('paths', 'Learning Paths').replace('tutorials', 'Quick Tutorials')}
              </Button>
            ))}
          </div>
        </div>

        {/* Learning Paths */}
        {activeTab === 'paths' && (
          <div className="space-y-6">
            {!hasSubscription('premium') && (
              <Card className="border-primary">
                <CardContent className="p-6 text-center">
                  <GraduationCap className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Unlock All Learning Paths</h3>
                  <p className="text-muted-foreground mb-4">
                    Get access to advanced courses and complete learning paths with Premium
                  </p>
                  <Button asChild>
                    <a href="/profile">Upgrade to Premium</a>
                  </Button>
                </CardContent>
              </Card>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {learningPaths.map((path) => (
                <Card key={path.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-video overflow-hidden">
                    <img src={path.image} alt={path.title} className="w-full h-full object-cover" />
                  </div>
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant={getLevelBadge(path.level)}>{path.level}</Badge>
                      {path.free && <Badge variant="outline">Free</Badge>}
                    </div>
                    <CardTitle className="line-clamp-2">{path.title}</CardTitle>
                    <CardDescription>{path.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center"><Clock className="h-4 w-4 mr-1" />{path.duration}</div>
                      <div className="flex items-center"><Star className="h-4 w-4 mr-1 text-yellow-500" />{path.rating}</div>
                      <div className="flex items-center"><BookOpen className="h-4 w-4 mr-1" />{path.modules} modules</div>
                    </div>

                    {path.progress > 0 && (
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span>{path.completedModules}/{path.modules} modules</span>
                        </div>
                        <Progress value={path.progress} max={100} className="h-2" />
                      </div>
                    )}

                    <div className="flex space-x-2">
                      {canAccessContent(path.free) ? (
                        <>
                          <Button className="flex-1">{path.progress > 0 ? 'Continue' : 'Start Learning'}</Button>
                          <Button variant="outline" size="icon"><Play className="h-4 w-4" /></Button>
                        </>
                      ) : (
                        <Button disabled className="flex-1">Premium Required</Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Quick Tutorials */}
        {activeTab === 'tutorials' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quickTutorials.map((tutorial) => (
              <Card key={tutorial.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-video overflow-hidden relative">
                  <img src={tutorial.thumbnail} alt={tutorial.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                    <Button size="icon" className="h-12 w-12 rounded-full"><Play className="h-6 w-6" /></Button>
                  </div>
                </div>
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary">{tutorial.type}</Badge>
                    <Badge variant="outline">{tutorial.difficulty}</Badge>
                  </div>
                  <CardTitle className="text-lg">{tutorial.title}</CardTitle>
                  <div className="flex items-center text-muted-foreground">
                    <Clock className="h-4 w-4 mr-1" />{tutorial.duration}
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        )}

        {/* Achievements */}
        {activeTab === 'achievements' && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center"><Award className="h-5 w-5 mr-2" />Your Achievements</CardTitle>
                <CardDescription>Track your learning progress and unlock new achievements</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {achievements.map((achievement, index) => (
                    <div key={index} className={`p-4 rounded-lg border ${achievement.unlocked ? 'bg-primary/5 border-primary' : 'bg-muted border-muted'}`}>
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-full ${achievement.unlocked ? 'bg-primary text-primary-foreground' : 'bg-muted-foreground text-muted'}`}>
                          <Award className="h-4 w-4" />
                        </div>
                        <div>
                          <h3 className={`font-medium ${achievement.unlocked ? '' : 'text-muted-foreground'}`}>{achievement.name}</h3>
                          <p className="text-sm text-muted-foreground">{achievement.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

      </div>
    </div>
  );
};

export default Learn;
