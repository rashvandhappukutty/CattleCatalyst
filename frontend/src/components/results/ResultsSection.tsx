import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, Award, Info } from 'lucide-react';

interface ResultsSectionProps {
  result: {
    breed: string;
    confidence: number;
    description: string;
  } | null;
}

const ResultsSection = ({ result }: ResultsSectionProps) => {
  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 85) return 'text-neon-green';
    if (confidence >= 70) return 'text-accent';
    return 'text-yellow-400';
  };

  const getConfidenceLabel = (confidence: number) => {
    if (confidence >= 85) return 'High Confidence';
    if (confidence >= 70) return 'Medium Confidence';
    return 'Low Confidence';
  };

  return (
    <section id="results" className="py-20 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-12">
            Recognition Results
          </h2>

          <AnimatePresence mode="wait">
            {result ? (
              <motion.div
                key="result"
                initial={{ scale: 0.8, opacity: 0, y: 50 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.8, opacity: 0, y: -50 }}
                transition={{ 
                  duration: 0.8,
                  type: "spring",
                  bounce: 0.4 
                }}
                className="glass-card p-8 rounded-3xl relative overflow-hidden animate-glow-pulse"
              >
                {/* Animated background */}
                <div className="absolute inset-0 bg-gradient-neon opacity-5 animate-gradient-shift"></div>
                <div className="absolute inset-0 neon-glow"></div>
                
                <div className="relative z-10">
                  {/* Success Icon */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", bounce: 0.6 }}
                    className="inline-flex items-center justify-center w-16 h-16 bg-neon-green/20 rounded-full mb-6"
                  >
                    <CheckCircle className="w-8 h-8 text-neon-green" />
                  </motion.div>

                  {/* Breed Name */}
                  <motion.h3
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-3xl md:text-4xl font-bold text-foreground mb-4 glow-text"
                  >
                    {result.breed}
                  </motion.h3>

                  {/* Confidence Score */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="mb-6"
                  >
                    <div className="flex items-center justify-center gap-3 mb-3">
                      <Award className="w-6 h-6 text-accent" />
                      <span className="text-xl font-semibold text-muted-foreground">
                        Confidence Score
                      </span>
                    </div>
                    
                    <div className="max-w-md mx-auto">
                      <div className="flex items-center justify-between mb-2">
                        <span className={`font-bold text-lg ${getConfidenceColor(result.confidence)}`}>
                          {result.confidence}%
                        </span>
                        <span className="text-sm text-muted-foreground">
                          {getConfidenceLabel(result.confidence)}
                        </span>
                      </div>
                      
                      {/* Progress Bar */}
                      <div className="glass-card h-3 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${result.confidence}%` }}
                          transition={{ delay: 0.8, duration: 1, ease: "easeOut" }}
                          className="h-full bg-gradient-neon rounded-full shadow-neon"
                        />
                      </div>
                    </div>
                  </motion.div>

                  {/* Description */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 }}
                    className="glass-card p-6 rounded-2xl max-w-2xl mx-auto"
                  >
                    <div className="flex items-start gap-3">
                      <Info className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                      <p className="text-muted-foreground text-left leading-relaxed">
                        {result.description}
                      </p>
                    </div>
                  </motion.div>

                  {/* Additional Stats */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2 }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8"
                  >
                    <div className="glass-card p-4 rounded-xl">
                      <div className="text-2xl font-bold text-accent">AI Model</div>
                      <div className="text-sm text-muted-foreground">CattleNet v2.1</div>
                    </div>
                    <div className="glass-card p-4 rounded-xl">
                      <div className="text-2xl font-bold text-neon-green">Processing</div>
                      <div className="text-sm text-muted-foreground">2.3 seconds</div>
                    </div>
                    <div className="glass-card p-4 rounded-xl">
                      <div className="text-2xl font-bold text-neon-glow">Accuracy</div>
                      <div className="text-sm text-muted-foreground">94.7% overall</div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="no-result"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="glass-card p-12 rounded-3xl"
              >
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-2xl font-semibold text-muted-foreground mb-4">
                  Awaiting Analysis
                </h3>
                <p className="text-muted-foreground">
                  Upload an image above to see AI-powered breed recognition results
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default ResultsSection;