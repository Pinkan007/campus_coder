import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Briefcase } from 'lucide-react';

const Freelance = () => {
  const opportunities = []; // Placeholder for future freelance listings

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center space-y-8">
        <h1 className="text-4xl font-bold">Freelance</h1>

        {opportunities.length === 0 ? (
          <Card className="max-w-md mx-auto border-dashed border-2 border-primary">
            <CardHeader>
              <Briefcase className="h-12 w-12 text-primary mx-auto mb-4" />
              <CardTitle>Freelance Platform Coming Soon</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Connect with top freelancers and find amazing opportunities!
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {opportunities.map((job, index) => (
              <Card key={index}>
                <CardHeader>
                  <Briefcase className="h-8 w-8 text-primary mr-2" />
                  <CardTitle>{job.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{job.description}</p>
                  <p className="text-sm text-muted-foreground mt-2">Posted: {job.date}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Freelance;
