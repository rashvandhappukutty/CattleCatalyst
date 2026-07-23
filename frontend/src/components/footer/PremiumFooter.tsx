import { motion } from 'framer-motion';
import { Heart, Cpu, Trophy, Github, Linkedin, Mail } from 'lucide-react';

const PremiumFooter = () => {
  return (
    <footer className="relative py-16 overflow-hidden">
      {/* Glowing Top Border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-premium"></div>
      
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="glass-card p-12 rounded-3xl relative overflow-hidden"
        >
          {/* Premium Glow Effects */}
          <div className="absolute inset-0 premium-glow opacity-40"></div>
          <div className="absolute top-0 left-0 w-40 h-40 bg-premium-glow/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-56 h-56 bg-premium-success/15 rounded-full blur-3xl"></div>
          
          <div className="relative z-10">
            {/* Header Section */}
            <div className="text-center mb-12">
              <motion.div
                className="inline-flex items-center gap-4 text-3xl font-bold gradient-text mb-6 font-montserrat"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Cpu className="w-10 h-10" />
                CattleAI Pro
              </motion.div>
              
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed font-montserrat"
              >
                Revolutionizing agriculture through artificial intelligence - empowering farmers and researchers with instant, accurate breed identification technology.
              </motion.p>
            </div>

            {/* Achievement Banner */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <div className="inline-flex items-center gap-4 glass-card px-8 py-4 rounded-2xl border border-premium-glow/30">
                <Trophy className="w-8 h-8 text-premium-glow" />
                <div className="text-left">
                  <div className="text-xl font-bold text-foreground font-montserrat">
                    🚀 National Innovation Challenge 2025
                  </div>
                  <div className="text-sm text-muted-foreground font-montserrat">
                    Developed for agricultural innovation and research
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Features Grid */}
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <motion.div 
                className="text-center group"
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="w-16 h-16 bg-premium-royal/20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Cpu className="w-8 h-8 text-premium-royal" />
                </div>
                <div className="text-lg font-bold text-foreground font-montserrat">AI-Powered Engine</div>
                <div className="text-sm text-muted-foreground">Advanced neural networks</div>
              </motion.div>
              
              <motion.div 
                className="text-center group"
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="w-16 h-16 bg-premium-success/20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Heart className="w-8 h-8 text-premium-success" />
                </div>
                <div className="text-lg font-bold text-foreground font-montserrat">Made for Farmers</div>
                <div className="text-sm text-muted-foreground">User-friendly design</div>
              </motion.div>
              
              <motion.div 
                className="text-center group"
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="w-16 h-16 bg-premium-aqua/20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Trophy className="w-8 h-8 text-premium-aqua" />
                </div>
                <div className="text-lg font-bold text-foreground font-montserrat">Competition Ready</div>
                <div className="text-sm text-muted-foreground">Professional grade solution</div>
              </motion.div>
            </div>

            {/* Social Links & Contact */}
            <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-glass-border/20">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="text-muted-foreground text-sm font-montserrat mb-4 md:mb-0"
              >
                © 2025 CattleAI Pro. Built with cutting-edge technology for the future of agriculture.
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
                className="flex items-center gap-6"
              >
                <motion.a
                  href="#"
                  className="w-12 h-12 glass-card rounded-xl flex items-center justify-center hover:premium-glow transition-all duration-300"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Linkedin className="w-5 h-5 text-premium-aqua" />
                </motion.a>
                <motion.a
                  href="#"
                  className="w-12 h-12 glass-card rounded-xl flex items-center justify-center hover:premium-glow transition-all duration-300"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Github className="w-5 h-5 text-premium-glow" />
                </motion.a>
                <motion.a
                  href="#"
                  className="w-12 h-12 glass-card rounded-xl flex items-center justify-center hover:premium-glow transition-all duration-300"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Mail className="w-5 h-5 text-premium-success" />
                </motion.a>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default PremiumFooter;