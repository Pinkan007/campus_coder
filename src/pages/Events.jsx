import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from 'lucide-react';

const Events = () => {
  const upcomingEvents = []; // Placeholder for future events

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center space-y-8">
        <h1 className="text-4xl font-bold">Events</h1>
        {upcomingEvents.length === 0 ? (
          <Card className="max-w-md mx-auto border-dashed border-2 border-primary">
            <CardHeader>
              <Calendar className="h-12 w-12 text-primary mx-auto mb-4" />
              <CardTitle>Events Coming Soon</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Discover upcoming tech events, workshops, and meetups in your area!
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {upcomingEvents.map((event, index) => (
              <Card key={index}>
                <CardHeader>
                  <Calendar className="h-8 w-8 text-primary mr-2" />
                  <CardTitle>{event.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{event.description}</p>
                  <p className="text-sm text-muted-foreground mt-2">Date: {event.date}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Events;
