import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';
import { MapPin, Building, Clock, DollarSign, Search, Briefcase } from 'lucide-react';

const mockJobs = [
  {
    id: 1,
    title: "Senior React Developer",
    company: "TechCorp Inc.",
    location: "San Francisco, CA",
    type: "Full-time",
    remote: true,
    salary: "$120k - $160k",
    posted: "2 days ago",
    description: "We're looking for a Senior React Developer to join our growing team and help build the next generation of web applications.",
    requirements: ["5+ years React experience", "TypeScript", "Node.js", "GraphQL"],
    featured: true
  },
  {
    id: 2,
    title: "Frontend Developer",
    company: "StartupXYZ",
    location: "New York, NY",
    type: "Full-time",
    remote: false,
    salary: "$80k - $110k",
    posted: "1 week ago",
    description: "Join our dynamic startup and help create amazing user experiences with modern web technologies.",
    requirements: ["3+ years frontend experience", "Vue.js or React", "CSS", "JavaScript"]
  },
  {
    id: 3,
    title: "Full Stack Developer",
    company: "Enterprise Solutions",
    location: "Austin, TX",
    type: "Contract",
    remote: true,
    salary: "$90 - $120/hr",
    posted: "3 days ago",
    description: "We need a full stack developer for a 6-month project to modernize our legacy systems.",
    requirements: ["Python", "Django", "React", "PostgreSQL", "AWS"]
  },
  {
    id: 4,
    title: "Junior Software Engineer",
    company: "Learning Labs",
    location: "Seattle, WA",
    type: "Full-time",
    remote: true,
    salary: "$65k - $85k",
    posted: "5 days ago",
    description: "Perfect for new graduates! Join our mentorship-focused team and grow your development skills.",
    requirements: ["Computer Science degree", "Any programming language", "Willingness to learn"]
  }
];

const jobTypes = ["All", "Full-time", "Part-time", "Contract", "Internship"];
const locations = ["All", "Remote", "San Francisco", "New York", "Austin", "Seattle"];

const Jobs = () => {
  const { user, hasSubscription } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedLocation, setSelectedLocation] = useState('All');
  const [filteredJobs, setFilteredJobs] = useState(mockJobs);

  const handleSearch = (term) => {
    setSearchTerm(term);
    filterJobs(term, selectedType, selectedLocation);
  };

  const filterJobs = (search, type, location) => {
    let filtered = mockJobs;

    if (search) {
      filtered = filtered.filter(job =>
        job.title.toLowerCase().includes(search.toLowerCase()) ||
        job.company.toLowerCase().includes(search.toLowerCase()) ||
        job.description.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (type !== 'All') {
      filtered = filtered.filter(job => job.type === type);
    }

    if (location !== 'All') {
      if (location === 'Remote') {
        filtered = filtered.filter(job => job.remote);
      } else {
        filtered = filtered.filter(job => job.location.includes(location));
      }
    }

    setFilteredJobs(filtered);
  };

  const canApplyToJob = (index) => {
    if (!user) return false;
    if (hasSubscription('premium')) return true;
    return index < 2; // Free users can apply to first 2 jobs
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-foreground">Job Board</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover amazing opportunities in tech and advance your career
          </p>
          {!hasSubscription('premium') && (
            <Card className="max-w-md mx-auto border-primary">
              <CardContent className="p-4 text-center">
                <p className="text-sm text-muted-foreground mb-2">
                  Free users can apply to 2 jobs. Upgrade for unlimited access!
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
              placeholder="Search jobs, companies, or keywords..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Job Type</label>
              <div className="flex flex-wrap gap-2">
                {jobTypes.map((type) => (
                  <Button
                    key={type}
                    variant={selectedType === type ? "default" : "outline"}
                    size="sm"
                    onClick={() => {
                      setSelectedType(type);
                      filterJobs(searchTerm, type, selectedLocation);
                    }}
                  >
                    {type}
                  </Button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Location</label>
              <div className="flex flex-wrap gap-2">
                {locations.map((location) => (
                  <Button
                    key={location}
                    variant={selectedLocation === location ? "default" : "outline"}
                    size="sm"
                    onClick={() => {
                      setSelectedLocation(location);
                      filterJobs(searchTerm, selectedType, location);
                    }}
                  >
                    {location}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Job Listings */}
        <div className="space-y-4">
          {filteredJobs.map((job, index) => (
            <Card key={job.id} className={`hover:shadow-lg transition-shadow ${job.featured ? 'border-primary' : ''}`}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <CardTitle className="text-xl">{job.title}</CardTitle>
                      {job.featured && <Badge>Featured</Badge>}
                      {job.remote && <Badge variant="secondary">Remote</Badge>}
                    </div>
                    <div className="flex items-center space-x-4 text-muted-foreground">
                      <div className="flex items-center">
                        <Building className="h-4 w-4 mr-1" />
                        {job.company}
                      </div>
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        {job.location}
                      </div>
                      <div className="flex items-center">
                        <Briefcase className="h-4 w-4 mr-1" />
                        {job.type}
                      </div>
                    </div>
                  </div>
                  <div className="text-right space-y-1">
                    <div className="flex items-center text-primary font-semibold">
                      <DollarSign className="h-4 w-4 mr-1" />
                      {job.salary}
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="h-4 w-4 mr-1" />
                      {job.posted}
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="mb-4">{job.description}</CardDescription>

                <div className="space-y-3">
                  <div>
                    <h4 className="font-medium mb-2">Requirements:</h4>
                    <div className="flex flex-wrap gap-2">
                      {job.requirements.map((req, i) => (
                        <Badge key={i} variant="outline">{req}</Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <Button variant="outline">Save Job</Button>
                    {canApplyToJob(index) ? (
                      <Button>Apply Now</Button>
                    ) : (
                      <div className="text-right">
                        <Button disabled>Apply Now</Button>
                        <p className="text-xs text-muted-foreground mt-1">
                          Premium required
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredJobs.length === 0 && (
          <div className="text-center py-12">
            <Briefcase className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No jobs
  found</h3>  
            <p className="text-muted-foreground">Try adjusting your search or filters to find what you're looking for.</p>
          </div>
        )}  
      </div>
    </div>
  );
}
export default Jobs;