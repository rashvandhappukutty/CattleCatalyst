import { motion } from 'framer-motion';
import aiCattleImage from '@/assets/images/ai-cattle-professional.jpg';

const PremiumHero = () => {
  const scrollToUpload = () => {
    const uploadSection = document.getElementById('upload');
    uploadSection?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about');
    aboutSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-24">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-40 h-40 bg-premium-glow/30 rounded-full blur-3xl animate-float-gentle"></div>
        <div className="absolute bottom-32 right-16 w-56 h-56 bg-premium-success/25 rounded-full blur-3xl animate-float-gentle" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-premium-royal/20 rounded-full blur-2xl animate-float-gentle" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Wave Pattern Animation */}
      <div className="absolute inset-0 overflow-hidden opacity-5">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-premium animate-wave"></div>
        <div className="absolute top-20 left-0 w-full h-1 bg-gradient-premium animate-wave" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-40 left-0 w-full h-1 bg-gradient-premium animate-wave" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-left"
          >
            <motion.h1
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-5xl lg:text-7xl font-bold font-montserrat leading-tight mb-8"
            >
              <span className="gradient-text glow-text">AI-Powered</span>
              <br />
              <span className="text-foreground">Cattle & Buffalo</span>
              <br />
              <span className="text-premium-aqua">Breed Recognition</span>
            </motion.h1>
            
            <motion.p
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-xl lg:text-2xl text-muted-foreground mb-12 max-w-2xl leading-relaxed font-montserrat"
            >
              Empowering farmers & researchers with instant breed identification using advanced AI technology.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-6"
            >
              <motion.button
                onClick={scrollToUpload}
                className="group px-10 py-5 bg-gradient-premium text-primary-foreground rounded-2xl font-semibold text-lg font-montserrat shadow-premium hover:shadow-lg transition-all duration-300"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="flex items-center justify-center gap-3">
                  📤 Upload Image
                  <motion.span
                    className="inline-block"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                  >
                    →
                  </motion.span>
                </span>
              </motion.button>
              
              <motion.button
                onClick={scrollToAbout}
                className="group px-10 py-5 glass-card hover:premium-glow rounded-2xl font-semibold text-lg font-montserrat text-foreground border border-glass-border/30 hover:border-premium-glow/50 transition-all duration-300"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                Learn More
              </motion.button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="grid grid-cols-3 gap-8 mt-16"
            >
              <div className="text-center">
                <div className="text-3xl font-bold text-premium-glow font-montserrat">94.7%</div>
                <div className="text-sm text-muted-foreground">Accuracy</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-premium-success font-montserrat">2.3s</div>
                <div className="text-sm text-muted-foreground">Processing</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-premium-royal font-montserrat">50+</div>
                <div className="text-sm text-muted-foreground">Breeds</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Illustration */}
          <motion.div
            initial={{ x: 100, opacity: 0, scale: 0.8 }}
            animate={{ x: 0, opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 1, ease: "easeOut" }}
            className="relative flex justify-center"
          >
            <div className="relative">
              <motion.div
                className="glass-card p-8 rounded-3xl premium-glow animate-premium-glow"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              >
                <img 
                  src={aiCattleImage} 
                  alt="AI-Powered Cattle Recognition" 
                  className="w-full max-w-lg rounded-2xl object-cover"
                />
              </motion.div>
              
              {/* Floating Elements */}
              <motion.div
                className="absolute -top-4 -right-4 w-16 h-16 bg-premium-success/20 rounded-full backdrop-blur-xl border border-premium-success/30 flex items-center justify-center text-2xl"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                🧠
              </motion.div>
              
              <motion.div
                className="absolute -bottom-4 -left-4 w-20 h-20 glass-card rounded-full flex items-center justify-center text-2xl"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                🐄
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PremiumHero;