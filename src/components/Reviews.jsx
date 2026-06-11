import React from 'react';


const reviewsData = [
  {
    id: 1,
    name: "Alex Mercer",
    role: "Audio Engineer",
    text: "The ANC 2.0 on the AeroSound X is mind-blowing. It perfectly isolates frequencies I didn't even know were there. A true game-changer for my studio work.",
    rating: 5,
  },
  {
    id: 2,
    name: "Sarah Jenkins",
    role: "Music Producer",
    text: "Haptic drivers deliver bass that you don't just hear, but actually feel. The 40mm beryllium diaphragms offer unmatched acoustic clarity.",
    rating: 5,
  },
  {
    id: 3,
    name: "David Chen",
    role: "Audiophile",
    text: "I've owned premium headsets for years, but the spatial audio precision on these is from another planet. Worth every single penny.",
    rating: 5,
  }
];


const StarIcon = () => (
  <svg className="w-4 h-4 text-cyan-400 drop-shadow-[0_0_5px_rgba(34,211,238,0.8)]" fill="currentColor" viewBox="0 0 20 20">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

export default function Reviews() {
  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center py-24 px-8 md:px-24 bg-[#0E0E0E] z-10 overflow-hidden">
      
      {/* Background Accents */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
      <div className="absolute top-1/4 -right-32 w-96 h-96 bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 -left-32 w-96 h-96 bg-blue-500/5 rounded-full blur-[120px] pointer-events-none"></div>

      {/* Header Section */}
      <div className="flex flex-col items-center text-center mb-20 z-20">
        <div className="flex items-center space-x-4 mb-4">
          <span className="w-8 h-[2px] bg-cyan-400/80"></span>
          <span className="font-['Inter'] text-[10px] font-bold uppercase tracking-[0.3em] text-cyan-400">Acoustic Feedback</span>
          <span className="w-8 h-[2px] bg-cyan-400/80"></span>
        </div>
        <h2 className="font-['Montserrat'] text-4xl md:text-6xl font-black text-white tracking-tighter uppercase">
          Verified <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Transmissions</span>
        </h2>
      </div>

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-[1200px] z-20">
        {reviewsData.map((review) => (
          <div 
            key={review.id} 
            className="group relative flex flex-col p-8 bg-white/[0.02] border border-white/5 rounded-2xl backdrop-blur-sm hover:bg-white/[0.04] hover:border-cyan-400/30 transition-all duration-500 hover:-translate-y-2 cursor-default"
          >
            {/* Quote Icon */}
            <div className="absolute top-6 right-6 opacity-10 group-hover:opacity-20 group-hover:text-cyan-400 transition-all duration-500">
              <span className="font-serif text-6xl leading-none">"</span>
            </div>

            {/* Stars */}
            <div className="flex space-x-1 mb-6">
              {[...Array(review.rating)].map((_, i) => (
                <StarIcon key={i} />
              ))}
            </div>

            {/* Review Text */}
            <p className="font-['Inter'] text-sm text-neutral-300 leading-relaxed mb-8 flex-grow">
              "{review.text}"
            </p>

            {/* User Info */}
            <div className="flex items-center space-x-4 mt-auto">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-neutral-800 to-neutral-900 border border-white/10 flex items-center justify-center">
                <span className="font-['Montserrat'] font-bold text-white text-sm">
                  {review.name.charAt(0)}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="font-['Inter'] text-sm font-bold text-white tracking-wide">{review.name}</span>
                <span className="font-['Inter'] text-[10px] text-cyan-400 uppercase tracking-wider">{review.role}</span>
              </div>
            </div>
            
            {/* Glow effect on hover */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-cyan-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none"></div>
          </div>
        ))}
      </div>

      {/* Call to action at the bottom */}
      <button className="mt-16 font-['Inter'] text-xs font-bold text-white/50 hover:text-white uppercase tracking-widest border-b border-transparent hover:border-cyan-400 pb-1 transition-all duration-300 z-20">
        Load More Reviews //
      </button>

    </div>
  );
}