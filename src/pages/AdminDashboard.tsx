import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth, User } from '@/contexts/AuthContext';
import { Users, Crown, Shield, TrendingUp, DollarSign } from 'lucide-react';

const AdminDashboard = () => {
  const { user, isAdmin } = useAuth();
  const [users, setUsers] = useState<(User & { password: string })[]>([]);
  const [stats, setStats] = useState({
    totalUsers: 0,
    freeUsers: 0,
    premiumUsers: 0,
    proUsers: 0,
    totalRevenue: 0,
  });

  useEffect(() => {
    if (isAdmin()) {
      loadUsers();
    }
  }, []);

  const loadUsers = () => {
    const savedUsers = JSON.parse(localStorage.getItem('users') || '[]');
    setUsers(savedUsers);
    
    const stats = savedUsers.reduce((acc: any, user: User) => {
      acc.totalUsers++;
      if (user.subscription === 'free') acc.freeUsers++;
      else if (user.subscription === 'premium') {
        acc.premiumUsers++;
        acc.totalRevenue += 9.99;
      } else if (user.subscription === 'pro') {
        acc.proUsers++;
        acc.totalRevenue += 19.99;
      }
      return acc;
    }, { totalUsers: 0, freeUsers: 0, premiumUsers: 0, proUsers: 0, totalRevenue: 0 });
    
    setStats(stats);
  };

  const updateUserRole = (userId: string, newRole: 'user' | 'admin') => {
    const updatedUsers = users.map(u => 
      u.id === userId ? { ...u, role: newRole } : u
    );
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    loadUsers();
  };

  const updateUserSubscription = (userId: string, newSubscription: 'free' | 'premium' | 'pro') => {
    const updatedUsers = users.map(u => 
      u.id === userId ? { ...u, subscription: newSubscription } : u
    );
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    loadUsers();
  };

  if (!isAdmin()) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardContent className="flex items-center justify-center h-64">
            <p>Access denied. Admin privileges required.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage users and platform statistics</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalUsers}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Free Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.freeUsers}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Premium Users</CardTitle>
              <Shield className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.premiumUsers}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pro Users</CardTitle>
              <Crown className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.proUsers}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${stats.totalRevenue.toFixed(2)}</div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="users" className="w-full">
          <TabsList>
            <TabsTrigger value="users">User Management</TabsTrigger>
            <TabsTrigger value="content">Content Management</TabsTrigger>
          </TabsList>

          <TabsContent value="users" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Users</CardTitle>
                <CardDescription>Manage user accounts and permissions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {users.map((userData) => (
                    <div key={userData.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <h3 className="font-medium">{userData.name}</h3>
                          <Badge variant={userData.role === 'admin' ? 'destructive' : 'secondary'}>
                            {userData.role}
                          </Badge>
                          <Badge 
                            className={
                              userData.subscription === 'pro' ? 'bg-yellow-500 text-white' :
                              userData.subscription === 'premium' ? 'bg-blue-500 text-white' :
                              'bg-gray-500 text-white'
                            }
                          >
                            {userData.subscription}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{userData.email}</p>
                        <p className="text-xs text-muted-foreground">
                          Joined: {new Date(userData.joinedAt).toLocaleDateString()}
                        </p>
                      </div>
                      
                      <div className="flex space-x-2">
                        <select
                          value={userData.role}
                          onChange={(e) => updateUserRole(userData.id, e.target.value as 'user' | 'admin')}
                          className="px-2 py-1 border rounded text-sm"
                        >
                          <option value="user">User</option>
                          <option value="admin">Admin</option>
                        </select>
                        
                        <select
                          value={userData.subscription}
                          onChange={(e) => updateUserSubscription(userData.id, e.target.value as 'free' | 'premium' | 'pro')}
                          className="px-2 py-1 border rounded text-sm"
                        >
                          <option value="free">Free</option>
                          <option value="premium">Premium</option>
                          <option value="pro">Pro</option>
                        </select>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="content" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Content Management</CardTitle>
                <CardDescription>Manage platform content and features</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Blog Posts</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-2xl font-bold">25</p>
                        <p className="text-sm text-muted-foreground">Published articles</p>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Projects</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-2xl font-bold">42</p>
                        <p className="text-sm text-muted-foreground">Community projects</p>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Job Listings</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-2xl font-bold">18</p>
                        <p className="text-sm text-muted-foreground">Active job posts</p>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Tutorials</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-2xl font-bold">33</p>
                        <p className="text-sm text-muted-foreground">Learning resources</p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;