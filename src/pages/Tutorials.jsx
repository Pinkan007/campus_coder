import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { GraduationCap } from 'lucide-react';

const Tutorials = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center space-y-8">
        <h1 className="text-4xl font-bold">Tutorials</h1>
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <GraduationCap className="h-12 w-12 text-primary mx-auto mb-4" />
            <CardTitle>Tutorials Coming Soon</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Step-by-step tutorials and coding guides will be available soon!
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Tutorials;
