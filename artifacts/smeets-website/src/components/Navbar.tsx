import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "Over Ons", href: "#about" },
    { name: "Producten", href: "#products" },
    { name: "Waarom Wij", href: "#features" },
    { name: "Columns", href: "#columns" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-background/95 backdrop-blur-md shadow-sm py-3"
          : "bg-transparent py-5"
      )}
    >
      <div className="container mx-auto px-4 md:px-6 max-w-7xl flex items-center justify-between">
        <a href="#home" className="flex items-center gap-3 z-50">
          <img 
            src={`${import.meta.env.BASE_URL}images/logo.svg`} 
            alt="Smeets Logo" 
            className="w-10 h-10 object-contain"
          />
          <div className={cn(
            "font-serif font-bold text-xl transition-colors duration-300",
            isScrolled ? "text-primary" : "text-white drop-shadow-md"
          )}>
            Aardappel Handel Smeets
          </div>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={cn(
                "font-medium text-sm transition-all hover:-translate-y-0.5",
                isScrolled 
                  ? "text-foreground/80 hover:text-primary" 
                  : "text-white/90 hover:text-white drop-shadow-sm"
              )}
            >
              {link.name}
            </a>
          ))}
          <a 
            href="#contact"
            className={cn(
              "btn-animate px-5 py-2.5 rounded-full font-medium shadow-lg",
              isScrolled
                ? "bg-primary text-primary-foreground shadow-primary/20"
                : "bg-white text-primary shadow-black/20"
            )}
          >
            Offerte Aanvragen
          </a>
        </nav>

        {/* Mobile Toggle */}
        <button
          className={cn(
            "md:hidden p-2 z-50 rounded-md",
            isScrolled || isMobileMenuOpen ? "text-primary" : "text-white"
          )}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-0 left-0 right-0 h-screen bg-background flex flex-col items-center justify-center gap-8 pt-20"
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="font-serif text-2xl font-medium text-foreground hover:text-primary transition-colors"
              >
                {link.name}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
