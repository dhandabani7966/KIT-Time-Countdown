import React from 'react';

export function SupportingContent({ config }) {
  return (
    <div className="relative z-20 w-full flex-1 flex flex-col justify-end mt-auto">
      {/* Code Snippets Flanking the Lower Center (Visible on Tablet/Desktop/Portrait 1080x1920) */}
      <div className="relative w-full max-w-6xl mx-auto px-4 flex items-center justify-between pointer-events-none select-none my-1">
        {/* Left Side Code Snippet */}
        <div className="hidden md:flex flex-col items-start text-left text-[11px] lg:text-xs font-mono text-cyan-300/70 bg-[#0B1630]/60 p-3 rounded-lg border border-cyan-500/20 backdrop-blur-xs max-w-[210px] shadow-[0_4px_15px_rgba(0,0,0,0.5)]">
          <div className="flex items-center gap-1.5 mb-1 text-[9px] text-[#AAB6D3]/60 pb-1 border-b border-white/5 w-full">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500/70" />
            <span className="w-1.5 h-1.5 rounded-full bg-yellow-500/70" />
            <span className="w-1.5 h-1.5 rounded-full bg-green-500/70" />
            <span className="ml-1 tracking-wider">solution.cpp</span>
          </div>
          <span className="text-purple-300 font-semibold">#include &lt;iostream&gt;</span>
          <span className="text-[#AAB6D3]">using namespace std;</span>
          <span className="text-emerald-400 mt-1">int main() &#123;</span>
          <span className="pl-3 text-cyan-200">cout &lt;&lt; "Code\n";</span>
          <span className="pl-3 text-amber-300">return 0;</span>
          <span className="text-emerald-400">&#125;</span>
          <div className="mt-2 text-[10px] text-cyan-400/80 font-mono border-t border-cyan-500/20 pt-1 w-full">
            <div>// PLAN</div>
            <div>// DEVELOP</div>
            <div>// DEBUG</div>
            <div>// SUBMIT</div>
            <div>// REPEAT</div>
          </div>
        </div>

        {/* Center Lower Status Banner: READY TO CODE ? and CODE • COMPETE • CONQUER */}
        <div className="flex-1 flex flex-col items-center justify-center text-center px-2 py-1">
          {/* READY TO CODE ? */}
          <div className="relative group">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black font-['Space_Grotesk'] tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-white to-purple-400 uppercase drop-shadow-[0_0_20px_rgba(0,217,255,0.7)]">
              {config.readyPrompt}
            </h2>
            {/* 3 Glowing Dots */}
            <div className="flex items-center justify-center gap-3 my-1.5">
              <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_10px_#00D9FF] animate-pulse" />
              <span className="w-2 h-2 rounded-full bg-white shadow-[0_0_10px_#FFFFFF] animate-pulse delay-150" />
              <span className="w-2 h-2 rounded-full bg-purple-500 shadow-[0_0_10px_#7B3FF2] animate-pulse delay-300" />
            </div>
          </div>

          {/* CODE • COMPETE • CONQUER */}
          <div className="mt-1 flex items-center justify-center gap-2 sm:gap-4 text-xs sm:text-sm md:text-base font-bold font-mono tracking-[0.3em] uppercase text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.6)]">
            <span className="text-cyan-400">CODE</span>
            <span className="text-purple-400">•</span>
            <span className="text-white">COMPETE</span>
            <span className="text-purple-400">•</span>
            <span className="text-cyan-400">CONQUER</span>
          </div>
        </div>

        {/* Right Side IDE / Terminal Snippet */}
        <div className="hidden md:flex flex-col items-start text-left text-[11px] lg:text-xs font-mono text-purple-300/80 bg-[#0B1630]/60 p-3 rounded-lg border border-purple-500/20 backdrop-blur-xs max-w-[210px] shadow-[0_4px_15px_rgba(0,0,0,0.5)]">
          <div className="flex items-center justify-between mb-1 text-[9px] text-[#AAB6D3]/60 pb-1 border-b border-white/5 w-full">
            <span className="tracking-wider">algorithm.json</span>
            <span className="text-cyan-400 font-bold">&lt; / &gt;</span>
          </div>
          <span className="text-cyan-300">&#123;</span>
          <span className="pl-3 text-white">"IDEAS",</span>
          <span className="pl-3 text-cyan-200">"ALGORITHMS",</span>
          <span className="pl-3 text-amber-200">"TEAMWORK",</span>
          <span className="pl-3 text-purple-300">"INNOVATION",</span>
          <span className="pl-3 text-emerald-300">"IMPACT"</span>
          <span className="text-cyan-300">&#125;</span>
          <div className="mt-2 text-cyan-400 font-mono text-[10px] flex items-center gap-1 font-bold">
            <span>&gt;&gt;&gt;</span>
            <span className="animate-pulse">RUNTIME: OK</span>
          </div>
        </div>
      </div>

      {/* Bottom Hackathon Coders Silhouette & Ambience */}
      <div className="relative w-full h-20 sm:h-28 md:h-36 overflow-hidden pointer-events-none select-none">
        {/* Silhouette Image Layer */}
        <img
          src="/assets/coders-silhouette.png"
          alt="Hackathon Contestants Coding"
          className="absolute inset-0 w-full h-full object-cover object-top opacity-60 mix-blend-screen brightness-90 filter"
          onError={(e) => {
            // graceful fallback if image is missing
            e.currentTarget.style.display = 'none';
          }}
        />

        {/* Gradient Fade to Base Color */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050B1B] via-transparent to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050B1B]/40 via-transparent to-transparent" />
      </div>
    </div>
  );
}
