import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from 'lucide-react';

const Events = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center space-y-8">
        <h1 className="text-4xl font-bold">Events</h1>
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <Calendar className="h-12 w-12 text-primary mx-auto mb-4" />
            <CardTitle>Events Coming Soon</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Discover upcoming tech events, workshops, and meetups in your area!</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Events;