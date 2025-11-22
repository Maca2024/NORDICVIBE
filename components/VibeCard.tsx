import React from 'react';
import { VibeResponse } from '../types';
import { Share2, Heart, MapPin, Download } from 'lucide-react';

interface VibeCardProps {
  data: VibeResponse;
  onReset: () => void;
}

export const VibeCard: React.FC<VibeCardProps> = ({ data, onReset }) => {
  
  const handleDownload = () => {
    if (!data.imageUrl) return;
    
    const link = document.createElement('a');
    link.href = data.imageUrl;
    link.download = `ruka-rizz-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="w-full max-w-md mx-auto bg-ruka-dark/80 border border-ruka-purple/50 rounded-3xl overflow-hidden shadow-[0_0_30px_rgba(168,85,247,0.3)] backdrop-blur-lg transform transition-all duration-500 hover:scale-[1.02]">
      {/* Image Section */}
      <div className="relative aspect-[4/5] w-full bg-slate-900 group">
        {data.imageUrl ? (
          <img 
            src={data.imageUrl} 
            alt="Ruka Reindeer Selfie" 
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-slate-800 text-slate-500">
            No Image Generated
          </div>
        )}
        
        {/* Overlay UI */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-6 pt-20">
            <div className="flex items-center space-x-2 mb-2">
                <span className="px-2 py-1 bg-ruka-green/20 text-ruka-green border border-ruka-green/50 rounded text-xs font-bold uppercase tracking-wider backdrop-blur-sm">
                    Verified Oku ✨
                </span>
                <div className="flex items-center text-gray-300 text-xs">
                    <MapPin size={12} className="mr-1" />
                    Ruka, Finland
                </div>
            </div>
            <p className="text-white font-sans font-bold text-lg leading-tight shadow-black drop-shadow-md">
                "{data.text}"
            </p>
            <div className="flex flex-wrap gap-2 mt-3">
                {data.tags?.map((tag, i) => (
                    <span key={i} className="text-ruka-purple font-mono text-xs">
                        {tag}
                    </span>
                ))}
            </div>
        </div>
      </div>

      {/* Action Bar */}
      <div className="p-4 flex items-center justify-between bg-black/40 border-t border-white/5">
        <button 
            onClick={onReset}
            className="text-sm font-mono text-gray-400 hover:text-white transition-colors"
        >
            ← GO AGAIN
        </button>
        <div className="flex space-x-3">
            {data.imageUrl && (
                <button 
                    onClick={handleDownload}
                    className="flex items-center justify-center w-10 h-10 rounded-full bg-white/5 hover:bg-ruka-green text-white border border-white/10 hover:border-ruka-green transition-all duration-300 group"
                    title="Save Image"
                >
                    <Download className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </button>
            )}
            <button className="flex items-center justify-center w-10 h-10 rounded-full bg-white/5 hover:bg-pink-500 text-white border border-white/10 hover:border-pink-500 transition-all duration-300 group">
                <Heart className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </button>
            <button className="flex items-center justify-center w-10 h-10 rounded-full bg-white/5 hover:bg-blue-500 text-white border border-white/10 hover:border-blue-500 transition-all duration-300 group">
                <Share2 className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </button>
        </div>
      </div>
    </div>
  );
};