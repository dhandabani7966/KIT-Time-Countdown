# IEEE Xtreme 24-Hour Countdown Website
### Live Event Countdown & Auditorium Display Screen
**Institution:** Kangeyam Institute of Technology  
**Organizer:** IEEE Student Branch (STB 12781A)  
**Primary Target:** Portrait 9:16 Display (1080 × 1920) / Vertical LED Screen / Adaptive Projector Mode  

---

## ⚡ Overview
A premium, production-ready, portrait-oriented live event countdown website engineered for the **Kangeyam Institute of Technology IEEE Student Branch** for the **IEEE Xtreme 24-Hour Programming Competition**.

Rebuilt with real HTML, CSS, React, and Tailwind elements (not a static poster), preserving real campus architecture, official college and IEEE logos, tabular digital clock typography, cybernetic neon animations, sound synthesizer, and complete offline persistence.

---

## 🚀 Key Features

1. **Official Top Branding**:
   - **Top-Left:** Kangeyam Institute of Technology official college logo.
   - **Top-Right:** Official IEEE Student Branch logo (STB 12781A).
   - Preserves exact proportions, transparent PNG/SVG support, and replaceable asset slots.

2. **Event Identity & Typography**:
   - Centered **IEEEXtreme Programming Competition** logo with energetic electric-blue and purple neon orbits.
   - Tagline: `24 HOURS OF CODING. ONE EXTREME CHALLENGE.`
   - Side accents: `THINK • CODE • SOLVE • REPEAT` and `24 Hours, Infinite Possibilities`.

3. **Real Campus Photograph Integration**:
   - Features the authentic Kangeyam Institute of Technology campus architecture in the background.
   - Low-opacity dark navy (`#050B1B`) gradient mask ensuring maximum contrast and legibility from across the auditorium.

4. **Robust Timestamp-Based Countdown Engine**:
   - **24:00:00** default duration (`HH : MM : SS`).
   - Uses absolute deadline timestamps (`Date.now() + remainingMs`) to prevent time drift caused by tab switching, system sleep, or background throttling.
   - Guarded single-interval timer: strictly prevents duplicate timers or negative values.
   - Accurate states: `READY`, `RUNNING`, `PAUSED`, `COMPLETED`.

5. **Main Start Button**:
   - Large circular neon button positioned beneath the timer.
   - Features the official **Kangeyam Institute of Technology** seal inside the center.
   - Neon concentric orbit rings with smooth pulsing glow when `READY`.
   - Starts the countdown on click or with Spacebar.

6. **Full Event Persistence & Refresh Safety**:
   - Automatically synchronizes state, remaining time, end timestamps, and configured duration into `localStorage`.
   - On browser refresh or accidental close:
     - If `RUNNING`, calculates exact remaining time from saved target timestamp.
     - If `PAUSED`, restores exact frozen duration.
     - If deadline expired while closed, triggers `COMPLETED`.
   - Custom uploaded logos and backgrounds are safely saved in `IndexedDB`.

7. **Admin / Control Drawer**:
   - Accessible via discreet gear icon in top right or hotkey.
   - Set custom duration (Hours, Minutes, Seconds) with quick presets:
     - `24 Hours (Full Event)`
     - `12 Hours`
     - `2 Hours`
     - `30 Minutes`
     - `10s Test Run ⚡` (for quick verification of 00:00:00 completion and celebration)
   - Live editable event details (college name, branch name, event title, taglines).
   - Upload & replace official logos, emblems, and campus photo with live preview.
   - Sound toggle & Fullscreen toggle.
   - Safe reset confirmation dialog to prevent accidental resets during live event.

8. **Celebration & Sound Synthesis**:
   - Web Audio API synthesizer for 100% offline audio effects (ticks, chirps, power-up sequence, and completion fanfare).
   - Restrained cyber confetti celebration on event completion.

9. **Responsive & Multi-Display Ready**:
   - **Portrait 9:16 (1080 × 1920)**: Pixel-perfect fit for vertical LED event screens.
   - **Widescreen 16:9 (1920 × 1080)**: Projector mode adapting cleanly without clipping.
   - Responsive layout switcher (`Auto` / `Portrait` / `Wide`).

---

## ⌨️ Keyboard Shortcuts

| Key | Action |
|---|---|
| <kbd>Space</kbd> | **Start** when Ready / **Pause** when Running / **Resume** when Paused |
| <kbd>R</kbd> | Open **Reset Confirmation** dialog |
| <kbd>F</kbd> | Toggle **Fullscreen Display Mode** |
| <kbd>M</kbd> | **Mute / Unmute** Sound Effects |
| <kbd>Esc</kbd> | Close Admin Panel / Cancel Modals |

*(Shortcuts are automatically disabled while typing in text inputs).*

---

## 🛠️ Installation & Running Locally

### 1. Prerequisites
- **Node.js** (v18 or newer, recommended v20+)
- **npm** (v9 or newer)

### 2. Install Dependencies
```bash
npm install
```

### 3. Start Development Server
```bash
npm run dev
```
Then open [http://localhost:5173](http://localhost:5173) in your browser.

### 4. Build for Production
```bash
npm run build
```
The optimized production build is generated in the `dist/` directory.

### 5. Preview Production Build
```bash
npm run preview
```

---

## 📁 Project Structure

```
Time Clock/
├── public/
│   ├── assets/
│   │   ├── campus-clean.png         # KIT Campus architecture photograph
│   │   ├── center-emblem.png        # Official Kangeyam seal inside Start button
│   │   ├── coders-silhouette.png    # Hackathon programmers silhouette
│   │   ├── ieee-student-branch.png  # Official IEEE Student Branch logo
│   │   ├── ieeextreme-logo.png      # Official IEEEXtreme Competition logo
│   │   ├── kit-logo-white.png       # Kangeyam Institute of Technology logo (white)
│   │   └── kit-logo-blue.png        # Kangeyam Institute of Technology logo (blue)
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── AdminPanel.jsx           # Settings drawer, duration setter, image uploader
│   │   ├── BrandHeader.jsx          # Top-left KIT logo & top-right IEEE logo
│   │   ├── CampusBackground.jsx     # Dark navy layered campus backdrop
│   │   ├── CompletionScreen.jsx     # Celebratory modal with confetti & fanfare
│   │   ├── CountdownTimer.jsx       # Large digital tabular HUD timer (HH:MM:SS)
│   │   ├── EventIdentity.jsx        # IEEEXtreme 24 title & side text accents
│   │   ├── ResetConfirmationModal.jsx # Accident-proof reset confirmation
│   │   ├── StartButton.jsx          # Circular neon start button with KIT emblem
│   │   └── SupportingContent.jsx    # Coding snippets, ready prompt, coder silhouettes
│   ├── hooks/
│   │   ├── useCountdown.js          # Timestamp-based countdown engine with persistence
│   │   └── useEventConfig.js        # Event configuration & IndexedDB image storage
│   ├── utils/
│   │   ├── imageStore.js            # IndexedDB image storage utility with fallback
│   │   └── soundEffects.js          # Web Audio API sound synthesizer
│   ├── App.jsx                      # Main event stage layout & keyboard handlers
│   ├── index.css                    # Tailwind CSS v4 & futuristic neon styles
│   └── main.jsx                     # React entrypoint
├── index.html                       # HTML shell with Google Fonts
├── vite.config.js                   # Vite configuration with Tailwind CSS v4
├── package.json                     # Project manifest & dependencies
└── README.md                        # Documentation
```

---

## 🎓 Institutional Credits
- **Host Institution:** Kangeyam Institute of Technology
- **Branch:** IEEE Student Branch (STB 12781A)
- **Competition:** IEEE Xtreme 24-Hour Programming Competition
