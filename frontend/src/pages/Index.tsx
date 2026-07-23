import { useState } from 'react';
import PremiumNavigation from '@/components/navigation/PremiumNavigation';
import PremiumHero from '@/components/hero/PremiumHero';
import PremiumUpload from '@/components/upload/PremiumUpload';
import PremiumResults from '@/components/results/PremiumResults';
import AboutSection from '@/components/layout/AboutSection';
import PremiumFooter from '@/components/footer/PremiumFooter';

const Index = () => {
  const [predictionResult, setPredictionResult] = useState(null);

  const handlePredictResult = (result: any) => {
    setPredictionResult(result);
  };

  return (
    <div className="min-h-screen bg-gradient-hero relative">
      {/* Sophisticated Background Pattern */}
      <div className="fixed inset-0 opacity-8 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            radial-gradient(circle at 20% 20%, hsl(var(--premium-glow)) 0%, transparent 40%),
            radial-gradient(circle at 80% 80%, hsl(var(--premium-success)) 0%, transparent 40%),
            radial-gradient(circle at 40% 60%, hsl(var(--premium-royal)) 0%, transparent 40%)
          `,
        }}></div>
      </div>

      {/* Subtle Grid Pattern */}
      <div className="fixed inset-0 opacity-5 pointer-events-none" style={{
        backgroundImage: `
          linear-gradient(hsl(var(--premium-glow) / 0.1) 1px, transparent 1px),
          linear-gradient(90deg, hsl(var(--premium-glow) / 0.1) 1px, transparent 1px)
        `,
        backgroundSize: '50px 50px'
      }}></div>
      
      <PremiumNavigation />
      <PremiumHero />
      <PremiumUpload onPredictResult={handlePredictResult} />
      <PremiumResults result={predictionResult} />
      <AboutSection />
      
      {/* Contact Section Placeholder */}
      <section id="contact" className="py-24 relative">
        <div className="container mx-auto px-6 text-center">
          <div className="glass-card p-12 rounded-3xl max-w-2xl mx-auto">
            <h2 className="text-4xl font-bold font-montserrat gradient-text mb-6">
              Get In Touch
            </h2>
            <p className="text-xl text-muted-foreground font-montserrat mb-8">
              Have questions about CattleAI Pro? We'd love to hear from you.
            </p>
            <div className="text-premium-aqua font-montserrat text-lg">
              📧 contact@cattleai-pro.com
            </div>
          </div>
        </div>
      </section>
      
      <PremiumFooter />
    </div>
  );
};

export default Index;