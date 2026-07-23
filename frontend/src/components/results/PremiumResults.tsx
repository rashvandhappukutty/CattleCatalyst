import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, Award, Info, MapPin, Droplets, Scale } from 'lucide-react';
import CircularProgress from './CircularProgress';

interface ResultData {
  breed: string;
  confidence: number;
  description: string;
  weight: string;
  milkYield: string;
  origin: string;
}

interface PremiumResultsProps {
  result: ResultData | null;
}

const PremiumResults = ({ result }: PremiumResultsProps) => {
  const getConfidenceLabel = (confidence: number) => {
    if (confidence >= 90) return 'Excellent Match';
    if (confidence >= 80) return 'High Confidence';
    if (confidence >= 70) return 'Good Match';
    return 'Moderate Confidence';
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section id="results" className="py-24 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto"
        >
          {/* Section Header */}
          <div className="text-center mb-16">
            <motion.h2
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              viewport={{ once: true }}
              className="text-4xl md:text-6xl font-bold font-montserrat gradient-text mb-6"
            >
              AI Recognition Results
            </motion.h2>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              viewport={{ once: true }}
              className="text-xl text-muted-foreground font-montserrat"
            >
              Detailed analysis powered by advanced machine learning
            </motion.p>
          </div>

          <AnimatePresence mode="wait">
            {result ? (
              <motion.div
                key="result"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className="glass-card rounded-3xl overflow-hidden relative"
              >
                {/* Premium glow effect */}
                <div className="absolute inset-0 premium-glow"></div>
                <div className="absolute inset-0 bg-gradient-premium opacity-3"></div>
                
                <div className="relative z-10 p-8 md:p-12">
                  {/* Header with Success Icon */}
                  <motion.div 
                    variants={itemVariants}
                    className="flex flex-col md:flex-row items-center gap-8 mb-12"
                  >
                    <div className="flex-shrink-0">
                      <div className="w-20 h-20 bg-premium-success/20 rounded-2xl flex items-center justify-center backdrop-blur-xl border border-premium-success/30">
                        <CheckCircle className="w-10 h-10 text-premium-success" />
                      </div>
                    </div>
                    
                    <div className="text-center md:text-left flex-1">
                      <h3 className="text-4xl md:text-5xl font-bold text-foreground mb-2 font-montserrat glow-text">
                        {result.breed}
                      </h3>
                      <div className="flex items-center gap-3 justify-center md:justify-start">
                        <Award className="w-5 h-5 text-premium-aqua" />
                        <span className="text-lg text-muted-foreground font-medium">
                          {getConfidenceLabel(result.confidence)}
                        </span>
                      </div>
                    </div>
                  </motion.div>

                  {/* Main Content Grid */}
                  <div className="grid lg:grid-cols-3 gap-12 mb-12">
                    {/* Confidence Score */}
                    <motion.div 
                      variants={itemVariants}
                      className="text-center"
                    >
                      <h4 className="text-xl font-semibold text-foreground mb-6 font-montserrat">
                        Confidence Score
                      </h4>
                      <CircularProgress 
                        percentage={result.confidence} 
                        size={160}
                        delay={500}
                      />
                    </motion.div>

                    {/* Breed Information */}
                    <motion.div 
                      variants={itemVariants}
                      className="lg:col-span-2"
                    >
                      <div className="glass-card p-8 rounded-2xl h-full">
                        <div className="flex items-start gap-4 mb-6">
                          <Info className="w-6 h-6 text-premium-aqua mt-1 flex-shrink-0" />
                          <div>
                            <h4 className="text-xl font-semibold text-foreground mb-3 font-montserrat">
                              Breed Information
                            </h4>
                            <p className="text-muted-foreground leading-relaxed font-montserrat">
                              {result.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  {/* Detailed Stats */}
                  <motion.div 
                    variants={itemVariants}
                    className="grid md:grid-cols-3 gap-6 mb-12"
                  >
                    <div className="glass-card p-6 rounded-2xl text-center group hover:success-glow transition-all duration-300">
                      <Scale className="w-8 h-8 text-premium-aqua mx-auto mb-3 group-hover:scale-110 transition-transform duration-300" />
                      <div className="text-2xl font-bold text-foreground font-montserrat">{result.weight}</div>
                      <div className="text-sm text-muted-foreground font-medium">Average Weight</div>
                    </div>
                    
                    <div className="glass-card p-6 rounded-2xl text-center group hover:success-glow transition-all duration-300">
                      <Droplets className="w-8 h-8 text-premium-success mx-auto mb-3 group-hover:scale-110 transition-transform duration-300" />
                      <div className="text-2xl font-bold text-foreground font-montserrat">{result.milkYield}</div>
                      <div className="text-sm text-muted-foreground font-medium">Daily Milk Yield</div>
                    </div>
                    
                    <div className="glass-card p-6 rounded-2xl text-center group hover:success-glow transition-all duration-300">
                      <MapPin className="w-8 h-8 text-premium-royal mx-auto mb-3 group-hover:scale-110 transition-transform duration-300" />
                      <div className="text-2xl font-bold text-foreground font-montserrat">{result.origin}</div>
                      <div className="text-sm text-muted-foreground font-medium">Origin Region</div>
                    </div>
                  </motion.div>

                  {/* AI Model Information */}
                  <motion.div 
                    variants={itemVariants}
                    className="border-t border-glass-border/20 pt-8"
                  >
                    <div className="grid md:grid-cols-4 gap-6 text-center">
                      <div>
                        <div className="text-lg font-bold text-premium-glow font-montserrat">CattleNet v3.2</div>
                        <div className="text-sm text-muted-foreground">AI Model</div>
                      </div>
                      <div>
                        <div className="text-lg font-bold text-premium-success font-montserrat">2.3 seconds</div>
                        <div className="text-sm text-muted-foreground">Processing Time</div>
                      </div>
                      <div>
                        <div className="text-lg font-bold text-premium-royal font-montserrat">50+ Breeds</div>
                        <div className="text-sm text-muted-foreground">Recognition Database</div>
                      </div>
                      <div>
                        <div className="text-lg font-bold text-premium-aqua font-montserrat">94.7%</div>
                        <div className="text-sm text-muted-foreground">Overall Accuracy</div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="no-result"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass-card p-16 rounded-3xl text-center"
              >
                <div className="text-8xl mb-8">🔍</div>
                <h3 className="text-3xl font-semibold text-foreground mb-6 font-montserrat">
                  Awaiting AI Analysis
                </h3>
                <p className="text-xl text-muted-foreground font-montserrat max-w-2xl mx-auto">
                  Upload an image above to experience our advanced AI-powered breed recognition system with detailed insights and professional analysis.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default PremiumResults;