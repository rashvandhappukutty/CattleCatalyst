import { motion } from 'framer-motion';
import { CheckCircle, Zap, Users, Brain, Target, Clock } from 'lucide-react';

const AboutSection = () => {
  const features = [
    {
      icon: Brain,
      title: "AI-Powered Accuracy",
      description: "Advanced machine learning algorithms trained on thousands of cattle and buffalo images for precise breed identification."
    },
    {
      icon: Users,
      title: "Farmer-Friendly Tool",
      description: "Designed specifically for farmers, researchers, and livestock professionals with intuitive interface and clear results."
    },
    {
      icon: Zap,
      title: "Real-time Identification",
      description: "Get instant breed recognition results in just 2-3 seconds with detailed insights and confidence scoring."
    }
  ];

  const steps = [
    {
      step: "01",
      title: "Upload Image",
      description: "Simply drag and drop or click to upload a clear image of your cattle or buffalo.",
      color: "premium-royal"
    },
    {
      step: "02", 
      title: "AI Processing",
      description: "Our advanced neural network analyzes the image using deep learning algorithms.",
      color: "premium-aqua"
    },
    {
      step: "03",
      title: "Instant Result",
      description: "Receive detailed breed information with confidence score and additional insights.",
      color: "premium-success"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        duration: 0.8
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <section id="about" className="py-24 relative">
      <div className="container mx-auto px-6">
        {/* Features Section */}
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-7xl mx-auto mb-24"
        >
          <div className="text-center mb-16">
            <motion.h2
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              viewport={{ once: true }}
              className="text-4xl md:text-6xl font-bold font-montserrat gradient-text mb-6"
            >
              Why Choose CattleAI Pro?
            </motion.h2>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              viewport={{ once: true }}
              className="text-xl text-muted-foreground font-montserrat max-w-3xl mx-auto"
            >
              Revolutionizing livestock management with cutting-edge AI technology designed for modern agriculture
            </motion.p>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8"
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                variants={itemVariants}
                className="glass-card p-8 rounded-2xl text-center group hover:premium-glow transition-all duration-500"
              >
                <div className="w-16 h-16 bg-premium-glow/20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-8 h-8 text-premium-aqua" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4 font-montserrat">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed font-montserrat">
                  {feature.description}
                </p>
                <div className="mt-6 flex justify-center">
                  <CheckCircle className="w-6 h-6 text-premium-success" />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* How It Works Section */}
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto"
        >
          <div className="text-center mb-16">
            <motion.h2
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold font-montserrat text-foreground mb-6"
            >
              How It Works
            </motion.h2>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              viewport={{ once: true }}
              className="text-xl text-muted-foreground font-montserrat"
            >
              Simple, fast, and accurate - three steps to professional breed identification
            </motion.p>
          </div>

          <div className="relative">
            {/* Connection Line */}
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-premium opacity-30 transform -translate-y-1/2 z-0"></div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid md:grid-cols-3 gap-12 relative z-10"
            >
              {steps.map((step, index) => (
                <motion.div
                  key={step.step}
                  variants={itemVariants}
                  className="text-center relative"
                >
                  {/* Step Number */}
                  <motion.div
                    className={`w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 glass-card border-2 border-${step.color}/50 relative z-10`}
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <span className={`text-2xl font-bold text-premium-${step.color.split('-')[1]} font-montserrat`}>
                      {step.step}
                    </span>
                  </motion.div>

                  <h3 className="text-2xl font-bold text-foreground mb-4 font-montserrat">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed font-montserrat">
                    {step.description}
                  </p>

                  {/* Timeline Icon */}
                  {index < steps.length - 1 && (
                    <div className="hidden md:block absolute top-10 -right-6 w-12 h-0.5 bg-gradient-premium opacity-50"></div>
                  )}
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Stats Section */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            viewport={{ once: true }}
            className="mt-20 glass-card p-8 rounded-2xl"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <Target className="w-8 h-8 text-premium-success mx-auto mb-3" />
                <div className="text-3xl font-bold text-premium-success font-montserrat">94.7%</div>
                <div className="text-sm text-muted-foreground font-medium">Accuracy Rate</div>
              </div>
              <div>
                <Clock className="w-8 h-8 text-premium-aqua mx-auto mb-3" />
                <div className="text-3xl font-bold text-premium-aqua font-montserrat">2.3s</div>
                <div className="text-sm text-muted-foreground font-medium">Processing Speed</div>
              </div>
              <div>
                <Brain className="w-8 h-8 text-premium-royal mx-auto mb-3" />
                <div className="text-3xl font-bold text-premium-royal font-montserrat">50+</div>
                <div className="text-sm text-muted-foreground font-medium">Supported Breeds</div>
              </div>
              <div>
                <Users className="w-8 h-8 text-premium-glow mx-auto mb-3" />
                <div className="text-3xl font-bold text-premium-glow font-montserrat">10K+</div>
                <div className="text-sm text-muted-foreground font-medium">Training Images</div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;