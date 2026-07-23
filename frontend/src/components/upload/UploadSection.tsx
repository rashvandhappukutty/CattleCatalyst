import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import { predictBreed } from '@/services/api';

interface UploadSectionProps {
  onPredictResult: (result: any) => void;
}

const UploadSection = ({ onPredictResult }: UploadSectionProps) => {
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
    console.log('Selected file:', file);
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        console.log('File read successfully');
        setUploadedImage(e.target?.result as string);
      };
      reader.onerror = (error) => {
        console.error('Error reading file:', error);
        alert('Error reading the file. Please try another image.');
      };
      reader.readAsDataURL(file);
    } else {
      console.error('Invalid file type:', file.type);
      alert('Please select an image file (JPG, PNG, or WEBP)');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('Input changed');
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    } else {
      console.log('No file selected');
    }
  };

  const handlePrediction = async () => {
    if (!uploadedImage) {
      console.error('No image to predict');
      alert('Please upload an image first');
      return;
    }
    
    setIsProcessing(true);
    console.log('Starting prediction...');
    
    try {
      // Convert data URL to blob
      console.log('Converting image to blob...');
      const base64Response = await fetch(uploadedImage);
      if (!base64Response.ok) {
        throw new Error('Failed to process image');
      }
      
      const blob = await base64Response.blob();
      const file = new File([blob], 'upload.jpg', { type: 'image/jpeg' });
      
      console.log('Sending prediction request...');
      const result = await predictBreed(file);
      console.log('Prediction result:', result);
      
      if (!result || !result.breed) {
        throw new Error('Invalid response from prediction service');
      }
      
      const formattedResult = {
        breed: result.breed,
        confidence: result.confidence,
        description: result.description || 'No description available.'
      };
      
      onPredictResult(formattedResult);
      
      // Scroll to results
      setTimeout(() => {
        const resultsSection = document.getElementById('results');
        if (resultsSection) {
          resultsSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
      
    } catch (error) {
      console.error('Prediction failed:', error);
      alert(`Prediction failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReset = () => {
    setUploadedImage(null);
    setIsProcessing(false);
  };

  return (
    <section id="upload" className="py-20 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
              AI-Powered Recognition
            </h2>
            <p className="text-xl text-muted-foreground">
              Drop your cattle or buffalo image below
            </p>
          </div>

          <div className="glass-card p-8 rounded-3xl relative overflow-hidden">
            <div className="absolute inset-0 neon-glow opacity-50"></div>
            
            <AnimatePresence mode="wait">
              {!uploadedImage ? (
                <motion.div
                  key="upload-zone"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className={`relative border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300 ${
                    dragActive 
                      ? 'border-neon-glow bg-neon-glow/10' 
                      : 'border-muted hover:border-accent'
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
                      rotate: dragActive ? 5 : 0 
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    <Upload className="w-16 h-16 mx-auto mb-4 text-accent" />
                    <h3 className="text-2xl font-semibold mb-2 text-foreground">
                      {dragActive ? "Drop your image here!" : "Drag & Drop Image"}
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      or click to browse files
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Supports JPG, PNG, WEBP formats
                    </p>
                  </motion.div>
                </motion.div>
              ) : (
                <motion.div
                  key="preview"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  className="text-center"
                >
                  <div className="glass-card p-6 rounded-2xl mb-6 inline-block">
                    <img
                      src={uploadedImage}
                      alt="Uploaded preview"
                      className="max-w-full max-h-64 rounded-xl object-contain"
                    />
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <motion.button
                      onClick={handlePrediction}
                      disabled={isProcessing}
                      className="px-8 py-4 bg-gradient-neon text-primary-foreground rounded-2xl font-semibold text-lg transition-all duration-300 animate-glow-pulse disabled:opacity-50 disabled:cursor-not-allowed"
                      whileHover={{ scale: isProcessing ? 1 : 1.05 }}
                      whileTap={{ scale: isProcessing ? 1 : 0.98 }}
                    >
                      {isProcessing ? (
                        <span className="flex items-center gap-3">
                          <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                          Processing...
                        </span>
                      ) : (
                        "🚀 Predict Breed"
                      )}
                    </motion.button>
                    
                    <motion.button
                      onClick={handleReset}
                      className="px-6 py-3 glass-card hover:neon-glow rounded-xl transition-all duration-300 text-foreground"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <X className="w-5 h-5 inline mr-2" />
                      🔄 Reset
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default UploadSection;