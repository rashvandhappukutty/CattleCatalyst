import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'backdrop-blur-xl bg-card/20' : 'backdrop-blur-md bg-card/10'
      }`}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <motion.div 
            className="text-xl font-bold gradient-text"
            whileHover={{ scale: 1.05 }}
          >
            🐄 CattleAI
          </motion.div>
          
          <div className="hidden md:flex items-center space-x-8">
            {['Home', 'Upload', 'Results', 'About'].map((item, index) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-foreground/80 hover:text-accent transition-colors duration-300 relative group"
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-neon group-hover:w-full transition-all duration-300" />
              </motion.a>
            ))}
          </div>

          <motion.button
            className="md:hidden p-2 text-foreground"
            whileTap={{ scale: 0.95 }}
          >
            <div className="w-6 h-6 flex flex-col justify-center space-y-1">
              <span className="w-full h-0.5 bg-gradient-neon rounded"></span>
              <span className="w-full h-0.5 bg-gradient-neon rounded"></span>
              <span className="w-full h-0.5 bg-gradient-neon rounded"></span>
            </div>
          </motion.button>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navigation;