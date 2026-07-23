import { motion } from 'framer-motion';
import heroImage from '@/assets/images/hero-cattle.jpg';

const HeroSection = () => {
  const scrollToUpload = () => {
    const uploadSection = document.getElementById('upload');
    uploadSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-32 h-32 bg-neon-glow/20 rounded-full blur-xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-neon-green/20 rounded-full blur-2xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-accent/20 rounded-full blur-lg animate-float" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="container mx-auto px-6 text-center relative z-10">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="glass-card p-12 rounded-3xl max-w-4xl mx-auto relative overflow-hidden"
        >
          {/* Glow Effect */}
          <div className="absolute inset-0 bg-gradient-neon opacity-5 rounded-3xl"></div>
          <div className="absolute inset-0 neon-glow rounded-3xl"></div>
          
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="relative z-10"
          >
            <div className="mb-8">
              <img 
                src={heroImage} 
                alt="Futuristic Cattle AI" 
                className="w-32 h-32 mx-auto rounded-2xl object-cover mb-6 animate-float"
              />
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 glow-text">
              <span className="gradient-text">Cattle & Buffalo</span>
              <br />
              <span className="text-foreground">Breed Recognition</span>
            </h1>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto"
            >
              Upload an image. Let AI identify the breed instantly.
            </motion.p>

            <motion.button
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              onClick={scrollToUpload}
              className="group relative px-8 py-4 bg-gradient-neon text-primary-foreground rounded-2xl font-semibold text-lg overflow-hidden transition-all duration-300 animate-glow-pulse"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="relative z-10 flex items-center gap-3">
                🚀 Get Started
                <motion.span
                  className="inline-block"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  →
                </motion.span>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-neon-glow to-neon-green opacity-80 group-hover:opacity-100 transition-opacity duration-300"></div>
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;