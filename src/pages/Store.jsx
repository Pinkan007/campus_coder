import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ShoppingBag } from 'lucide-react';

const Store = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center space-y-8">
        <h1 className="text-4xl font-bold">Store</h1>
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <ShoppingBag className="h-12 w-12 text-primary mx-auto mb-4" />
            <CardTitle>Store Coming Soon</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Our store with developer merchandise and resources will be available soon!
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Store;
