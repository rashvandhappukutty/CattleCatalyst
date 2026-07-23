import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const PremiumNavigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = ['Home', 'Upload', 'Results', 'About', 'Contact'];

  const scrollToSection = (section: string) => {
    const element = document.getElementById(section.toLowerCase());
    element?.scrollIntoView({ behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled 
            ? 'backdrop-blur-3xl bg-card/25 shadow-lg border-b border-glass-border/20' 
            : 'backdrop-blur-xl bg-card/10'
        }`}
      >
        <div className="container mx-auto px-6 py-5">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.div 
              className="text-2xl font-bold font-montserrat gradient-text cursor-pointer"
              whileHover={{ scale: 1.05 }}
              onClick={() => scrollToSection('home')}
            >
              🐄 CattleAI Pro
            </motion.div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-10">
              {navItems.map((item, index) => (
                <motion.button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className="relative text-foreground/80 hover:text-foreground transition-colors duration-300 font-medium font-montserrat group"
                  whileHover={{ y: -2 }}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.2 }}
                >
                  {item}
                  <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-gradient-premium rounded-full group-hover:w-full transition-all duration-300" />
                </motion.button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              className="md:hidden p-2 text-foreground z-50 relative"
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <motion.div
        initial={{ opacity: 0, x: "100%" }}
        animate={{ 
          opacity: isMobileMenuOpen ? 1 : 0,
          x: isMobileMenuOpen ? "0%" : "100%"
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="fixed top-0 right-0 h-full w-80 max-w-full bg-card/95 backdrop-blur-3xl z-40 md:hidden border-l border-glass-border/20"
      >
        <div className="flex flex-col pt-20 px-8">
          {navItems.map((item, index) => (
            <motion.button
              key={item}
              onClick={() => scrollToSection(item)}
              className="text-left py-4 text-lg font-medium text-foreground/80 hover:text-foreground border-b border-glass-border/10 transition-colors duration-300"
              initial={{ opacity: 0, x: 50 }}
              animate={{ 
                opacity: isMobileMenuOpen ? 1 : 0,
                x: isMobileMenuOpen ? 0 : 50
              }}
              transition={{ delay: index * 0.1 + 0.1 }}
            >
              {item}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-background/50 backdrop-blur-sm z-30 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
};

export default PremiumNavigation;