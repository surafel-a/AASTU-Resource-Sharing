const LoadingSpinner = ({ fullScreen = true }) => {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-6 ${fullScreen ? "h-screen w-full bg-[#F6F6F8]" : "p-10"}`}
    >
      {/* Custom Keyframes for the Super Bounce */}
      <style>
        {`
          @keyframes super-bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-20px); }
          }
          @keyframes shimmer {
            0% { background-position: -200% center; }
            100% { background-position: 200% center; }
          }
        `}
      </style>

      {/* Main Visual: Animated Ring */}
      <div className="relative">
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-[#1152D4]/10 border-t-[#1152D4] shadow-lg"></div>
        <div className="absolute inset-0 h-16 w-16 animate-pulse rounded-full bg-[#1152D4]/5"></div>
      </div>

      {/* Text and Dots Container */}
      <div className="flex flex-col items-center gap-3">
        {/* Shimmering Loading Text */}
        <span
          className="text-2xl font-black tracking-widest uppercase"
          style={{
            background:
              "linear-gradient(90deg, #1152D4 0%, #6366f1 50%, #1152D4 100%)",
            backgroundSize: "200% auto",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            animation: "shimmer 2s linear infinite",
          }}
        >
          Loading
        </span>
      </div>
    </div>
  );
};

export default LoadingSpinner;
