import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, X, Camera, FileImage } from 'lucide-react';

interface PremiumUploadProps {
  onPredictResult: (result: any) => void;
}

const PremiumUpload = ({ onPredictResult }: PremiumUploadProps) => {
  const [dragActive, setDragActive] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  }, []);

  const handleFile = (file: File) => {
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handlePrediction = async () => {
    if (!uploadedImage) return;
    
    setIsProcessing(true);
    
    // Simulate AI processing with more professional results
    setTimeout(() => {
      const mockResults = [
        { 
          breed: "Murrah Buffalo", 
          confidence: 94, 
          description: "Indian water buffalo breed renowned for exceptional milk production and adaptability to tropical climates.",
          weight: "450-550 kg",
          milkYield: "12-15 L/day",
          origin: "India"
        },
        { 
          breed: "Holstein Friesian", 
          confidence: 91, 
          description: "World-renowned dairy cattle breed with distinctive black and white markings, known for high milk output.",
          weight: "580-650 kg",
          milkYield: "25-30 L/day",
          origin: "Netherlands"
        },
        { 
          breed: "Gir Cattle", 
          confidence: 88, 
          description: "Indigenous Indian zebu breed with excellent heat tolerance and disease resistance capabilities.",
          weight: "300-400 kg",
          milkYield: "8-12 L/day",
          origin: "India"
        },
        { 
          breed: "Sahiwal", 
          confidence: 92, 
          description: "Superior dairy breed from the Indian subcontinent, well-adapted to hot and humid conditions.",
          weight: "350-450 kg",
          milkYield: "10-15 L/day",
          origin: "Pakistan/India"
        }
      ];
      
      const randomResult = mockResults[Math.floor(Math.random() * mockResults.length)];
      setIsProcessing(false);
      onPredictResult(randomResult);
      
      // Smooth scroll to results
      setTimeout(() => {
        const resultsSection = document.getElementById('results');
        resultsSection?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }, 2500);
  };

  const handleReset = () => {
    setUploadedImage(null);
    setIsProcessing(false);
  };

  return (
    <section id="upload" className="py-24 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto"
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
              AI Recognition Engine
            </motion.h2>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              viewport={{ once: true }}
              className="text-xl text-muted-foreground font-montserrat max-w-2xl mx-auto"
            >
              Upload your cattle or buffalo image for instant AI-powered breed identification with detailed insights
            </motion.p>
          </div>

          {/* Upload Card */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            viewport={{ once: true }}
            className="glass-card p-10 rounded-3xl relative overflow-hidden premium-glow"
          >
            <div className="absolute inset-0 bg-gradient-premium opacity-5"></div>
            
            <AnimatePresence mode="wait">
              {!uploadedImage ? (
                <motion.div
                  key="upload-zone"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className={`relative border-2 border-dashed rounded-2xl p-16 text-center transition-all duration-500 ${
                    dragActive 
                      ? 'border-premium-glow bg-premium-glow/10 shadow-premium scale-105' 
                      : 'border-glass-border/40 hover:border-premium-aqua/60 hover:bg-premium-aqua/5'
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleInputChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  
                  <motion.div
                    animate={{ 
                      scale: dragActive ? 1.1 : 1,
                      y: dragActive ? -10 : 0
                    }}
                    transition={{ duration: 0.3, type: "spring" }}
                  >
                    {dragActive ? (
                      <Camera className="w-20 h-20 mx-auto mb-6 text-premium-glow" />
                    ) : (
                      <Upload className="w-20 h-20 mx-auto mb-6 text-premium-aqua" />
                    )}
                    
                    <h3 className="text-3xl font-semibold mb-4 text-foreground font-montserrat">
                      {dragActive ? "Drop your image here!" : "Upload Cattle Image"}
                    </h3>
                    <p className="text-lg text-muted-foreground mb-6 font-montserrat">
                      Drag & drop your image or click to browse files
                    </p>
                    
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <FileImage className="w-4 h-4" />
                        JPG, PNG, WEBP supported
                      </div>
                      <div className="hidden sm:block w-1 h-1 bg-muted-foreground rounded-full"></div>
                      <div>Max size: 10MB</div>
                    </div>
                  </motion.div>
                </motion.div>
              ) : (
                <motion.div
                  key="preview"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  transition={{ duration: 0.5, type: "spring" }}
                  className="text-center"
                >
                  {/* Image Preview */}
                  <motion.div
                    className="glass-card p-6 rounded-2xl mb-8 inline-block max-w-md mx-auto"
                    layoutId="image-preview"
                  >
                    <img
                      src={uploadedImage}
                      alt="Uploaded preview"
                      className="max-w-full max-h-80 rounded-xl object-contain shadow-card"
                    />
                  </motion.div>
                  
                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                    <motion.button
                      onClick={handlePrediction}
                      disabled={isProcessing}
                      className={`px-12 py-5 bg-gradient-premium text-primary-foreground rounded-2xl font-semibold text-lg font-montserrat shadow-premium transition-all duration-300 ${
                        isProcessing 
                          ? 'opacity-75 cursor-not-allowed' 
                          : 'hover:shadow-lg hover:scale-105'
                      }`}
                      whileTap={{ scale: isProcessing ? 1 : 0.98 }}
                    >
                      {isProcessing ? (
                        <span className="flex items-center gap-3">
                          <motion.div
                            className="w-5 h-5 border-2 border-current border-t-transparent rounded-full"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          />
                          Processing AI Analysis...
                        </span>
                      ) : (
                        <span className="flex items-center gap-3">
                          🚀 Predict Breed
                        </span>
                      )}
                    </motion.button>
                    
                    <motion.button
                      onClick={handleReset}
                      className="px-8 py-4 glass-card hover:premium-glow rounded-xl transition-all duration-300 text-foreground font-medium font-montserrat border border-glass-border/30 hover:border-premium-glow/50"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <X className="w-5 h-5 inline mr-2" />
                      Reset
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default PremiumUpload;