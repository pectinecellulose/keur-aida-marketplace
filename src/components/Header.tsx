import { useState } from "react"
import { Search, ShoppingCart, User, Menu, X, Heart, MapPin } from "lucide-react"
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

const categories = [
  {
    title: "Produits",
    items: [
      { name: "Téléphones & Tablettes", href: "/category/phones" },
      { name: "Informatique & Électronique", href: "/category/electronics" },
      { name: "Mode & Beauté", href: "/category/fashion" },
      { name: "Maison & Meubles", href: "/category/home" },
      { name: "Électroménager", href: "/category/appliances" },
    ]
  },
  {
    title: "Services",
    items: [
      { name: "Véhicules", href: "/category/vehicles" },
      { name: "Immobilier", href: "/category/real-estate" },
      { name: "Emploi & Services", href: "/category/jobs" },
      { name: "Animaux", href: "/category/pets" },
    ]
  }
]

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-lg">
      <div className="container mx-auto px-4">
        {/* Top bar */}
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-primary text-primary-foreground font-bold text-xl">
              K
            </div>
            <span className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              KeurAida
            </span>
          </div>

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
                          <NavigationMenuLink key={item.name} href={item.href}>
                            <div className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground">
                              <div className="text-sm font-medium leading-none">{item.name}</div>
                            </div>
                          </NavigationMenuLink>
                        ))}
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
            
            <a href="/deals" className="text-foreground font-medium hover:text-primary transition-colors">
              Deals & Promos
            </a>
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
              <Button variant="ghost" size="icon" className="relative">
                <Heart className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-xs text-primary-foreground flex items-center justify-center">
                  3
                </span>
              </Button>
              
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-xs text-primary-foreground flex items-center justify-center">
                  2
                </span>
              </Button>
            </div>

            <ThemeToggle />

            <Button variant="ghost" size="icon" className="hidden md:flex">
              <User className="h-5 w-5" />
            </Button>

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
              
              <div className="pt-4 border-t">
                <a href="/deals" className="block py-2 px-3 rounded-lg hover:bg-accent transition-colors font-medium">
                  Deals & Promotions
                </a>
              </div>

              <div className="flex items-center justify-center space-x-4 pt-4">
                <Button variant="ghost" size="icon">
                  <Heart className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon">
                  <ShoppingCart className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}