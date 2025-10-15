import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';
import { FileText, Download, Search, Code, Copy, Star, Bookmark } from 'lucide-react';

const cheatsheets = [
  {
    id: 1,
    title: "React Hooks Reference",
    description: "Complete guide to all React hooks with examples and best practices",
    category: "React",
    difficulty: "Beginner",
    downloads: 2540,
    rating: 4.9,
    lastUpdated: "2024-01-15",
    free: true,
    preview: `
// useState Hook
const [count, setCount] = useState(0);

// useEffect Hook
useEffect(() => {
  document.title = \`Count: \${count}\`;
}, [count]);

// useContext Hook
const value = useContext(MyContext);
    `,
    tags: ["useState", "useEffect", "useContext", "Hooks"]
  },
  {
    id: 2,
    title: "CSS Flexbox Cheatsheet",
    description: "Visual guide to CSS Flexbox properties with practical examples",
    category: "CSS",
    difficulty: "Beginner",
    downloads: 3200,
    rating: 4.8,
    lastUpdated: "2024-01-12",
    free: true,
    preview: `
/* Container Properties */
display: flex;
flex-direction: row | column;
justify-content: flex-start | center | flex-end;
align-items: flex-start | center | flex-end;
flex-wrap: nowrap | wrap;

/* Item Properties */
flex: 1;
align-self: auto | flex-start | center;
    `,
    tags: ["flexbox", "layout", "responsive", "CSS"]
  },
  {
    id: 3,
    title: "JavaScript ES6+ Features",
    description: "Modern JavaScript features with syntax examples and use cases",
    category: "JavaScript",
    difficulty: "Intermediate",
    downloads: 1890,
    rating: 4.7,
    lastUpdated: "2024-01-10",
    free: false,
    preview: `
// Arrow Functions
const add = (a, b) => a + b;

// Destructuring
const { name, age } = user;
const [first, second] = array;

// Template Literals
const message = \`Hello \${name}!\`;

// Spread Operator
const newArray = [...oldArray, newItem];
    `,
    tags: ["ES6", "arrows", "destructuring", "spread"]
  },
  {
    id: 4,
    title: "Git Commands Reference",
    description: "Essential Git commands for version control and collaboration",
    category: "Git",
    difficulty: "Beginner",
    downloads: 4100,
    rating: 4.9,
    lastUpdated: "2024-01-08",
    free: false,
    preview: `
# Basic Commands
git init
git add .
git commit -m "message"
git push origin main

# Branching
git branch feature-name
git checkout feature-name
git merge feature-name

# Collaboration
git pull origin main
git fetch
    `,
    tags: ["version control", "commands", "branching", "collaboration"]
  },
  {
    id: 5,
    title: "Node.js Express.js Guide",
    description: "Quick reference for building APIs with Express.js framework",
    category: "Node.js",
    difficulty: "Intermediate",
    downloads: 1560,
    rating: 4.6,
    lastUpdated: "2024-01-05",
    free: false,
    preview: `
// Basic Setup
const express = require('express');
const app = express();

// Routes
app.get('/api/users', (req, res) => {
  res.json(users);
});

app.post('/api/users', (req, res) => {
  // Create user logic
});

app.listen(3000);
    `,
    tags: ["express", "API", "routes", "middleware"]
  },
  {
    id: 6,
    title: "Python Data Structures",
    description: "Comprehensive guide to Python's built-in data structures",
    category: "Python",
    difficulty: "Beginner",
    downloads: 2340,
    rating: 4.8,
    lastUpdated: "2024-01-03",
    free: false,
    preview: `
# Lists
my_list = [1, 2, 3]
my_list.append(4)
my_list.extend([5, 6])

# Dictionaries
my_dict = {'key': 'value'}
my_dict['new_key'] = 'new_value'

# Sets
my_set = {1, 2, 3}
my_set.add(4)
    `,
    tags: ["lists", "dictionaries", "sets", "data structures"]
  }
];

const categories = ["All", "React", "JavaScript", "CSS", "Python", "Node.js", "Git"];
const difficulties = ["All", "Beginner", "Intermediate", "Advanced"];

const Cheatsheet = () => {
  const { user, hasSubscription } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [filteredCheatsheets, setFilteredCheatsheets] = useState(cheatsheets);

  const handleSearch = (term) => {
    setSearchTerm(term);
    filterCheatsheets(term, selectedCategory, selectedDifficulty);
  };

  const filterCheatsheets = (search, category, difficulty) => {
    let filtered = cheatsheets;
    
    if (search) {
      filtered = filtered.filter(sheet =>
        sheet.title.toLowerCase().includes(search.toLowerCase()) ||
        sheet.description.toLowerCase().includes(search.toLowerCase()) ||
        sheet.tags.some(tag => tag.toLowerCase().includes(search.toLowerCase()))
      );
    }
    
    if (category !== 'All') {
      filtered = filtered.filter(sheet => sheet.category === category);
    }
    
    if (difficulty !== 'All') {
      filtered = filtered.filter(sheet => sheet.difficulty === difficulty);
    }
    
    setFilteredCheatsheets(filtered);
  };

  const canAccessCheatsheet = (isFree) => {
    if (isFree) return true;
    return hasSubscription('premium');
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-foreground">Developer Cheatsheets</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Quick reference guides and code snippets for popular programming languages and frameworks
          </p>
          {!hasSubscription('premium') && (
            <Card className="max-w-md mx-auto border-primary">
              <CardContent className="p-4 text-center">
                <p className="text-sm text-muted-foreground mb-2">
                  Free users have limited access. Upgrade for all cheatsheets!
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
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search cheatsheets, languages, or topics..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex flex-col md:flex-row gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Category</label>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => {
                      setSelectedCategory(category);
                      filterCheatsheets(searchTerm, category, selectedDifficulty);
                    }}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Difficulty</label>
              <div className="flex flex-wrap gap-2">
                {difficulties.map((difficulty) => (
                  <Button
                    key={difficulty}
                    variant={selectedDifficulty === difficulty ? "default" : "outline"}
                    size="sm"
                    onClick={() => {
                      setSelectedDifficulty(difficulty);
                      filterCheatsheets(searchTerm, selectedCategory, difficulty);
                    }}
                  >
                    {difficulty}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Cheatsheets Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredCheatsheets.map((sheet) => (
            <Card key={sheet.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Badge variant="secondary">{sheet.category}</Badge>
                      <Badge variant={sheet.difficulty === 'Beginner' ? 'default' : sheet.difficulty === 'Intermediate' ? 'secondary' : 'destructive'}>
                        {sheet.difficulty}
                      </Badge>
                      {sheet.free && <Badge variant="outline">Free</Badge>}
                    </div>
                    <CardTitle className="text-xl">{sheet.title}</CardTitle>
                    <CardDescription>{sheet.description}</CardDescription>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <Download className="h-4 w-4 mr-1" />
                    {sheet.downloads} downloads
                  </div>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 mr-1 text-yellow-500" />
                    {sheet.rating}
                  </div>
                  <span>Updated {sheet.lastUpdated}</span>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Code Preview */}
                {canAccessCheatsheet(sheet.free) ? (
                  <div className="relative">
                    <div className="bg-muted rounded-lg p-4 font-mono text-sm overflow-x-auto">
                      <pre className="whitespace-pre-wrap">{sheet.preview}</pre>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      className="absolute top-2 right-2"
                      onClick={() => copyToClipboard(sheet.preview)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <div className="bg-muted/50 rounded-lg p-8 text-center">
                    <FileText className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">Premium required to view full cheatsheet</p>
                  </div>
                )}
                
                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {sheet.tags.map((tag, i) => (
                    <Badge key={i} variant="outline" className="text-xs">{tag}</Badge>
                  ))}
                </div>
                
                {/* Actions */}
                <div className="flex space-x-2">
                  {canAccessCheatsheet(sheet.free) ? (
                    <>
                      <Button className="flex-1">
                        <Download className="h-4 w-4 mr-2" />
                        Download PDF
                      </Button>
                      <Button variant="outline" size="icon">
                        <Bookmark className="h-4 w-4" />
                      </Button>
                    </>
                  ) : (
                    <Button disabled className="flex-1">
                      Premium Required
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredCheatsheets.length === 0 && (
          <div className="text-center py-12">
            <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No cheatsheets found</h3>
            <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
          </div>
        )}

        {/* Request Cheatsheet CTA */}
        <Card className="text-center">
          <CardContent className="p-8">
            <Code className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Missing a Cheatsheet?</h3>
            <p className="text-muted-foreground mb-4">
              Can't find what you're looking for? Request a new cheatsheet and we'll create it for the community.
            </p>
            <Button>Request Cheatsheet</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Cheatsheet;
