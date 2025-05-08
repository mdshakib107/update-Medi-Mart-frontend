"use client";

import AnimatedLogo from "@/assets/images/logo/AnimatedLogo";
import { Button } from "@/components/ui/button";
import { useUser } from "@/contexts/UserContext";
import { LogOut, Menu, ShoppingCart, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { protectedRoutes } from "@/contants";
import { logout } from "@/services/AuthService";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { resetCart } from "@/redux/features/cartSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "Lab Tests", href: "/labtests" },
  { label: "Blogs", href: "/blogs" },
  { label: "Offers", href: "/offers" },
  { label: "About", href: "/about" },

  // { label: "Services", href: "/services" },
  // { label: "Contact", href: "/contact" },
];

const Navbar = () => {
  //* using hooks
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, setUser, setIsLoading } = useUser();
  const pathname = usePathname();
  // const router = useRouter();

  //* redux
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.cart.medicines);

  const totalOrderQuantity = products.reduce(
    (sum, item) => sum + item.orderQuantity,
    0
  );

  const handleLogOut = async () => {
    await logout();
    setUser(null);
    setIsLoading(true);
    dispatch(resetCart()); //? clear cart
    if (protectedRoutes.some((route) => pathname.match(route))) {
      window.location.href = "/";
    }
  };

  // console.log(user)

  return (
    <header className="w-full border-b bg-white dark:bg-black sticky top-0 z-50 px-10">
      <div className="container mx-auto flex items-center justify-between py-4 px-4 md:px-0">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-[#4F46E5]">
          {/* MediMart logo */}
          <AnimatedLogo />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex justify-center items-center gap-6">
          {/* SearchBox */}

          {/* nav list */}
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              //   className="text-base text-black hover:text-[#4F46E5] transition"
              // >
              className={`relative pb-1 transition-colors hover:text-[#4F46E5] duration-300 ${
                pathname === item.href
                  ? "text-[#4F46E5] font-bold"
                  : "text-base"
              } group`}
            >
              {item.label}
            </Link>
          ))}
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar>
                  <AvatarImage
                    src={
                      user?.image ||
                      "https://i.ibb.co.com/Fz38g1t/human-celebrating.png"
                    }
                    alt={user?.name}
                  />
                  <AvatarFallback>{user?.name || "User"}</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>
                  {user?.name}{" "}
                  <Badge
                    className={
                      user?.role === "admin"
                        ? `bg-purple-400`
                        : `bg-[#4F46E5] text-white`
                    }
                  >
                    {user?.role}
                  </Badge>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link href={user?.role === "admin" ? `/admin` : `/customer`}>
                    Dashboard
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={() => {
                    handleLogOut();
                    setMenuOpen(false);
                  }}
                >
                  <LogOut />
                  <span>Log Out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link href="/login">
              {/* <CustomButton textName="Login" className="py-1!" /> */}
              <Button variant="outline">Login</Button>
            </Link>
          )}
          <Link
            href={"/cart"}
            className={`relative pb-1 transition-colors hover:text-[#4F46E5] duration-300 ${
              pathname === "/cart" ? "text-[#4F46E5] font-bold" : "text-base"
            } group relative`}
          >
            <ShoppingCart
              className="cursor-pointer hover:scale-105 border-0 border-gray-300 "
              size={30}
            />
            <Badge
              variant="outline"
              className="absolute -top-2 -right-2 bg-pink-400 text-white"
            >
              {totalOrderQuantity}
            </Badge>
          </Link>
        </nav>

        {/* Mobile Menu Icon */}
        <div className="md:hidden flex justify-center items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
          <Link
            href={"/cart"}
            className={`relative pb-1 transition-colors hover:text-[#4F46E5] duration-300 ${
              pathname === "/cart" ? "text-[#4F46E5] font-bold" : "text-base"
            } group relative`}
          >
            <ShoppingCart
              className="cursor-pointer hover:scale-105 border-0 border-gray-300 "
              size={30}
            />
            <Badge
              variant="outline"
              className="absolute -top-2 -right-2 bg-pink-400"
            >
              {totalOrderQuantity}
            </Badge>
          </Link>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-4">
          <nav className="flex flex-col gap-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm text-muted-foreground hover:text-[#4F46E5] transition"
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="mt-4">
            {user ? (
              <Button
                className="bg-red-500 text-white w-full"
                onClick={() => {
                  handleLogOut();
                  setMenuOpen(false);
                }}
              >
                <LogOut size={16} className="mr-2" />
                Log Out
              </Button>
            ) : (
              <Link href="/login">
                <Button
                  className="w-full mt-2 rounded-full"
                  variant="outline"
                  onClick={() => setMenuOpen(false)}
                >
                  Login
                </Button>
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
