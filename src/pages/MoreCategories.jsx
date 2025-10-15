import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MoreHorizontal } from 'lucide-react';

const MoreCategories = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center space-y-8">
        <h1 className="text-4xl font-bold">More Categories</h1>
        <Card className="max-w-md mx-auto">
          <CardHeader className="text-center">
            <MoreHorizontal className="h-12 w-12 text-primary mx-auto mb-4" />
            <CardTitle>More Categories Coming Soon</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-center">
              Additional categories and features will be added soon!
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MoreCategories;
