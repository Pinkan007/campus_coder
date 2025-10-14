import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import { useSubscription } from '@/contexts/SubscriptionContext';
import { useToast } from '@/hooks/use-toast';
import { Calendar, Crown, Shield, User } from 'lucide-react';

const Profile = () => {
  const { user, updateUser } = useAuth();
  const { subscribe, cancelSubscription, plans, currentPlan } = useSubscription();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardContent className="flex items-center justify-center h-64">
            <p>Please log in to view your profile.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleUpdateProfile = () => {
    updateUser({ name, email });
    setEditMode(false);
    toast({
      title: "Profile updated",
      description: "Your profile has been updated successfully.",
    });
  };

  const handleSubscribe = async (planId: string) => {
    setLoading(true);
    const success = await subscribe(planId);
    if (success) {
      toast({
        title: "Subscription updated",
        description: `You are now subscribed to the ${planId} plan!`,
      });
    } else {
      toast({
        title: "Subscription failed",
        description: "There was an error processing your subscription.",
        variant: "destructive",
      });
    }
    setLoading(false);
  };

  const handleCancelSubscription = () => {
    cancelSubscription();
    toast({
      title: "Subscription cancelled",
      description: "Your subscription has been cancelled.",
    });
  };

  const getSubscriptionIcon = (subscription: string) => {
    switch (subscription) {
      case 'pro': return <Crown className="h-4 w-4" />;
      case 'premium': return <Shield className="h-4 w-4" />;
      default: return <User className="h-4 w-4" />;
    }
  };

  const getSubscriptionColor = (subscription: string) => {
    switch (subscription) {
      case 'pro': return 'bg-yellow-500 text-white';
      case 'premium': return 'bg-blue-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="grid gap-6">
        {/* Profile Header */}
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="text-2xl">{user.name.charAt(0).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <h1 className="text-2xl font-bold">{user.name}</h1>
                  <Badge className={getSubscriptionColor(user.subscription)}>
                    {getSubscriptionIcon(user.subscription)}
                    <span className="ml-1 capitalize">{user.subscription}</span>
                  </Badge>
                  {user.role === 'admin' && (
                    <Badge variant="destructive">
                      <Shield className="h-3 w-3 mr-1" />
                      Admin
                    </Badge>
                  )}
                </div>
                <p className="text-muted-foreground">{user.email}</p>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4 mr-1" />
                  Joined {new Date(user.joinedAt).toLocaleDateString()}
                </div>
              </div>
            </div>
          </CardHeader>
        </Card>

        <Tabs defaultValue="profile" className="w-full">
          <TabsList>
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="subscription">Subscription</TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>Update your personal information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {editMode ? (
                  <>
                    <div>
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div className="flex space-x-2">
                      <Button onClick={handleUpdateProfile}>Save Changes</Button>
                      <Button variant="outline" onClick={() => setEditMode(false)}>Cancel</Button>
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <Label>Name</Label>
                      <p className="text-sm">{user.name}</p>
                    </div>
                    <div>
                      <Label>Email</Label>
                      <p className="text-sm">{user.email}</p>
                    </div>
                    <Button onClick={() => setEditMode(true)}>Edit Profile</Button>
                  </>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="subscription" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Current Plan</CardTitle>
                <CardDescription>Manage your subscription</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold">{currentPlan?.name} Plan</h3>
                    <p className="text-muted-foreground">
                      ${currentPlan?.price}/month
                    </p>
                    {user.subscriptionExpiry && (
                      <p className="text-sm text-muted-foreground">
                        Expires: {new Date(user.subscriptionExpiry).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                  {user.subscription !== 'free' && (
                    <Button variant="destructive" onClick={handleCancelSubscription}>
                      Cancel Subscription
                    </Button>
                  )}
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-medium">Features included:</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                    {currentPlan?.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-3 gap-4">
              {plans.map((plan) => (
                <Card key={plan.id} className={plan.popular ? 'border-primary' : ''}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{plan.name}</CardTitle>
                      {plan.popular && <Badge>Popular</Badge>}
                    </div>
                    <CardDescription className="text-2xl font-bold">
                      ${plan.price}
                      <span className="text-sm font-normal">/month</span>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm mb-4">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-primary mr-2">✓</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                    {user.subscription === plan.id ? (
                      <Button disabled className="w-full">Current Plan</Button>
                    ) : (
                      <Button
                        onClick={() => handleSubscribe(plan.id)}
                        disabled={loading}
                        className="w-full"
                        variant={plan.popular ? 'default' : 'outline'}
                      >
                        {loading ? 'Processing...' : `Upgrade to ${plan.name}`}
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Profile;