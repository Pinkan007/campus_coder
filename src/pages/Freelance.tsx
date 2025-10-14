import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Briefcase } from 'lucide-react';

const Freelance = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center space-y-8">
        <h1 className="text-4xl font-bold">Freelance</h1>
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <Briefcase className="h-12 w-12 text-primary mx-auto mb-4" />
            <CardTitle>Freelance Platform Coming Soon</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Connect with top freelancers and find amazing opportunities!</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Freelance;