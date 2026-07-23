import { motion } from 'framer-motion';
import { Heart, Cpu, Zap } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="py-12 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="glass-card p-8 rounded-3xl relative overflow-hidden"
        >
          {/* Glow Effects */}
          <div className="absolute inset-0 neon-glow opacity-30"></div>
          <div className="absolute top-0 left-0 w-32 h-32 bg-neon-glow/20 rounded-full blur-2xl"></div>
          <div className="absolute bottom-0 right-0 w-40 h-40 bg-neon-green/20 rounded-full blur-2xl"></div>
          
          <div className="relative z-10">
            <div className="text-center mb-8">
              <motion.div
                className="inline-flex items-center gap-3 text-2xl font-bold gradient-text mb-4"
                whileHover={{ scale: 1.05 }}
              >
                <Cpu className="w-8 h-8" />
                CattleAI Recognition
              </motion.div>
              
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-lg text-muted-foreground max-w-2xl mx-auto"
              >
                Powered by cutting-edge AI technology for precision livestock identification
              </motion.p>
            </div>

            <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-8">
              <motion.div 
                className="flex items-center gap-2 glass-card px-4 py-2 rounded-full"
                whileHover={{ scale: 1.05 }}
              >
                <Zap className="w-5 h-5 text-neon-glow" />
                <span className="text-foreground">Lightning Fast</span>
              </motion.div>
              
              <motion.div 
                className="flex items-center gap-2 glass-card px-4 py-2 rounded-full"
                whileHover={{ scale: 1.05 }}
              >
                <Heart className="w-5 h-5 text-neon-green" />
                <span className="text-foreground">Made for Farmers</span>
              </motion.div>
              
              <motion.div 
                className="flex items-center gap-2 glass-card px-4 py-2 rounded-full"
                whileHover={{ scale: 1.05 }}
              >
                <Cpu className="w-5 h-5 text-accent" />
                <span className="text-foreground">AI Powered</span>
              </motion.div>
            </div>

            <div className="text-center">
              <motion.div
                className="text-xl font-semibold text-foreground mb-2"
                animate={{ 
                  textShadow: [
                    "0 0 10px hsl(var(--neon-glow) / 0.5)",
                    "0 0 20px hsl(var(--neon-glow) / 0.8)",
                    "0 0 10px hsl(var(--neon-glow) / 0.5)"
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                🚀 Powered by AI – Backend coming soon 🚀
              </motion.div>
              
              <p className="text-muted-foreground text-sm">
                © 2024 CattleAI Recognition. Built with future technology.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;