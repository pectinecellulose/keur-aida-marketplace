import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Search, ShoppingCart, User, Menu, X, Heart, LogOut, Settings, Package } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAuth } from "@/hooks/use-auth"

const categories = [
  {
    title: "Produits",
    items: [
      { name: "Téléphones & Tablettes", href: "/category/produits-a-vendre/telephones-tablettes" },
      { name: "Informatique & Électronique", href: "/category/produits-a-vendre/informatique-electronique" },
      { name: "Mode & Beauté", href: "/category/produits-a-vendre/mode-beaute" },
      { name: "Maison & Meubles", href: "/category/produits-a-vendre/maison-meubles" },
      { name: "Électroménager", href: "/category/produits-a-vendre/electromenager" },
    ]
  },
  {
    title: "Services",
    items: [
      { name: "Véhicules", href: "/category/vehicules" },
      { name: "Immobilier", href: "/category/immobilier" },
      { name: "Emploi & Services", href: "/category/emploi-services" },
      { name: "Animaux", href: "/category/animaux" },
    ]
  }
]

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { user, signOut } = useAuth()
  const navigate = useNavigate()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-lg">
      <div className="container mx-auto px-4">
        {/* Top bar */}
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-primary text-primary-foreground font-bold text-xl">
              K
            </div>
            <span className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              KeurAida
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <NavigationMenu>
              <NavigationMenuList>
                {categories.map((category) => (
                  <NavigationMenuItem key={category.title}>
                    <NavigationMenuTrigger className="text-foreground font-medium">
                      {category.title}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="grid w-96 gap-3 p-6">
                        {category.items.map((item) => (
                          <NavigationMenuLink key={item.name} asChild>
                            <Link to={item.href} className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground">
                              <div className="text-sm font-medium leading-none">{item.name}</div>
                            </Link>
                          </NavigationMenuLink>
                        ))}
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
            
            <Link to="/all-products" className="text-foreground font-medium hover:text-primary transition-colors">
              Tous les produits
            </Link>
            <Link to="/newsletter" className="text-foreground font-medium hover:text-primary transition-colors">
              Newsletter
            </Link>
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Rechercher des produits, services..."
                className="pl-10 pr-4 h-11 bg-surface border-border focus:border-primary"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-2">
            <div className="hidden md:flex items-center space-x-1">
              <Button variant="ghost" size="icon" className="relative" asChild>
                <Link to="/favorites">
                  <Heart className="h-5 w-5" />
                </Link>
              </Button>
              
              <Button variant="ghost" size="icon" className="relative" asChild>
                <Link to="/cart">
                  <ShoppingCart className="h-5 w-5" />
                </Link>
              </Button>
            </div>

            <ThemeToggle />

            {/* User Menu */}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="hidden md:flex">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem onClick={() => navigate("/dashboard")}>
                    <Package className="mr-2 h-4 w-4" />
                    <span>Mes annonces</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate("/profile")}>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Profil</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={signOut}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Déconnexion</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button variant="outline" size="sm" onClick={() => navigate("/auth")}>
                Connexion
              </Button>
            )}

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden pb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Rechercher..."
              className="pl-10 pr-4 h-11 bg-surface"
            />
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden border-t bg-background/95 backdrop-blur-lg">
          <div className="container mx-auto px-4 py-6">
            <div className="space-y-6">
              {categories.map((category) => (
                <div key={category.title}>
                  <h3 className="font-semibold text-lg mb-3">{category.title}</h3>
                  <div className="space-y-2">
                    {category.items.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className="block py-2 px-3 rounded-lg hover:bg-accent transition-colors"
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>
              ))}
              
              <div className="pt-4 border-t space-y-2">
                <Link to="/all-products" className="block py-2 px-3 rounded-lg hover:bg-accent transition-colors font-medium">
                  Tous les produits
                </Link>
                <Link to="/newsletter" className="block py-2 px-3 rounded-lg hover:bg-accent transition-colors font-medium">
                  Newsletter
                </Link>
              </div>

              <div className="flex items-center justify-center space-x-4 pt-4">
                <Button variant="ghost" size="icon" asChild>
                  <Link to="/favorites">
                    <Heart className="h-5 w-5" />
                  </Link>
                </Button>
                <Button variant="ghost" size="icon" asChild>
                  <Link to="/cart">
                    <ShoppingCart className="h-5 w-5" />
                  </Link>
                </Button>
                {user ? (
                  <Button variant="ghost" size="icon" onClick={() => navigate("/dashboard")}>
                    <User className="h-5 w-5" />
                  </Button>
                ) : (
                  <Button variant="ghost" size="icon" onClick={() => navigate("/auth")}>
                    <User className="h-5 w-5" />
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}