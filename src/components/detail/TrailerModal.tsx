import React from "react";
import { X, Play } from "lucide-react";
import { VideoResult } from "@/types/media";

interface TrailerModalProps {
  isOpen: boolean;
  onClose: () => void;
  trailer: VideoResult | null;
}

const TrailerModal: React.FC<TrailerModalProps> = ({
  isOpen,
  onClose,
  trailer,
}) => {
  if (!isOpen || !trailer) return null;

  const getTrailerUrl = (video: VideoResult) => {
    if (video.site === "YouTube") {
      return `https://www.youtube.com/embed/${video.key}?autoplay=1&rel=0`;
    }
    return null;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-4xl mx-4">
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
        >
          <X className="w-8 h-8" />
        </button>

        <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden">
          {trailer.site === "YouTube" ? (
            <iframe
              src={getTrailerUrl(trailer) ?? ""}
              title={trailer.name}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center text-white">
                <Play className="w-16 h-16 mx-auto mb-4" />
                <p className="text-lg">Trailer not available</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TrailerModal;
