import { Search, User, LogOut, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Header = () => {
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">&lt;/&gt;</span>
            </div>
            <span className="text-xl font-bold text-primary">TheCampusCoders</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden lg:flex items-center space-x-2">
            <Button variant={isActive('/') ? "default" : "ghost"} size="sm" asChild>
              <Link to="/">Home</Link>
            </Button>
            <Button variant={isActive('/blogs') ? "default" : "ghost"} size="sm" asChild>
              <Link to="/blogs">Blogs</Link>
            </Button>
            <Button variant={isActive('/jobs') ? "default" : "ghost"} size="sm" asChild>
              <Link to="/jobs">Jobs</Link>
            </Button>
            <Button variant={isActive('/learn') ? "default" : "ghost"} size="sm" asChild>
              <Link to="/learn">Learn</Link>
            </Button>
            <Button variant={isActive('/projects') ? "default" : "ghost"} size="sm" asChild>
              <Link to="/projects">Projects</Link>
            </Button>
            <Button variant={isActive('/cheatsheet') ? "default" : "ghost"} size="sm" asChild>
              <Link to="/cheatsheet">Cheatsheet</Link>
            </Button>
            {isAdmin() && (
              <Button variant={isActive('/admin') ? "default" : "ghost"} size="sm" asChild>
                <Link to="/admin">Admin</Link>
              </Button>
            )}
          </nav>

          {/* User Menu or Login */}
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback>{user.name.charAt(0).toUpperCase()}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuItem asChild>
                  <Link to="/profile" className="flex items-center">
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </Link>
                </DropdownMenuItem>
                {isAdmin() && (
                  <DropdownMenuItem asChild>
                    <Link to="/admin" className="flex items-center">
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Admin Dashboard</span>
                    </Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button variant="default" size="sm" asChild>
              <Link to="/login">Login</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;