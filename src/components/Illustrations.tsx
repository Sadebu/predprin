import React from 'react';

export const Illustrations: Record<string, React.FC> = {
  city: () => (
    <svg viewBox="0 0 400 300" className="scene-illustration">
      <defs>
        <linearGradient id="sky" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#1b263b"/>
          <stop offset="100%" stopColor="#415a77"/>
        </linearGradient>
        <linearGradient id="sun" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ffd60a"/>
          <stop offset="100%" stopColor="#ff8c42"/>
        </linearGradient>
      </defs>
      <rect width="400" height="300" fill="url(#sky)"/>
      <circle cx="320" cy="80" r="40" fill="url(#sun)" className="animate-pulse"/>
      <rect x="30" y="120" width="50" height="180" fill="#2d3748" rx="3"/>
      <rect x="35" y="130" width="10" height="10" fill="#ffd60a" opacity="0.7"/>
      <rect x="50" y="130" width="10" height="10" fill="#ffd60a" opacity="0.5"/>
      <rect x="35" y="150" width="10" height="10" fill="#ffd60a" opacity="0.8"/>
      <rect x="50" y="150" width="10" height="10" fill="#ffd60a" opacity="0.3"/>
      <rect x="35" y="170" width="10" height="10" fill="#ffd60a" opacity="0.6"/>
      <rect x="90" y="80" width="60" height="220" fill="#1a202c" rx="3"/>
      <rect x="95" y="90" width="12" height="12" fill="#2ec4b6" opacity="0.7"/>
      <rect x="115" y="90" width="12" height="12" fill="#2ec4b6" opacity="0.5"/>
      <rect x="135" y="90" width="12" height="12" fill="#2ec4b6" opacity="0.8"/>
      <rect x="95" y="110" width="12" height="12" fill="#2ec4b6" opacity="0.4"/>
      <rect x="115" y="110" width="12" height="12" fill="#2ec4b6" opacity="0.9"/>
      <rect x="135" y="110" width="12" height="12" fill="#2ec4b6" opacity="0.6"/>
      <rect x="160" y="140" width="45" height="160" fill="#2d3748" rx="3"/>
      <rect x="220" y="100" width="55" height="200" fill="#1a202c" rx="3"/>
      <rect x="290" y="160" width="40" height="140" fill="#2d3748" rx="3"/>
      <rect x="340" y="130" width="50" height="170" fill="#1a202c" rx="3"/>
      {/* Rocket */}
      <g className="animate-rocket" transform="translate(200, 50)">
        <ellipse cx="0" cy="0" rx="8" ry="20" fill="#e71d36"/>
        <polygon points="-5,15 0,25 5,15" fill="#ff8c42"/>
        <circle cx="0" cy="-5" r="4" fill="#ffd60a"/>
        <rect x="-3" y="15" width="2" height="8" fill="#ff8c42" opacity="0.7"/>
        <rect x="1" y="15" width="2" height="8" fill="#ff8c42" opacity="0.7"/>
      </g>
      {/* Stars */}
      <circle cx="50" cy="30" r="2" fill="white" className="animate-sparkle"/>
      <circle cx="150" cy="20" r="1.5" fill="white" className="animate-sparkle"/>
      <circle cx="250" cy="40" r="2" fill="white" className="animate-sparkle"/>
      <circle cx="370" cy="25" r="1.5" fill="white" className="animate-sparkle"/>
    </svg>
  ),

  ideation: () => (
    <svg viewBox="0 0 400 300" className="scene-illustration">
      <rect width="400" height="300" fill="transparent"/>
      {/* Light bulb */}
      <g transform="translate(200, 100)">
        <circle cx="0" cy="0" r="50" fill="#ffd60a" opacity="0.3" className="animate-pulse"/>
        <circle cx="0" cy="0" r="35" fill="#ffd60a" opacity="0.5"/>
        <path d="M-15,30 Q-15,45 -10,50 L10,50 Q15,45 15,30" fill="#ffd60a"/>
        <rect x="-10" y="50" width="20" height="5" fill="#ccc" rx="2"/>
        <rect x="-8" y="55" width="16" height="3" fill="#aaa" rx="1"/>
        {/* Gears inside */}
        <circle cx="-8" cy="-5" r="8" fill="none" stroke="#ff8c42" strokeWidth="2"/>
        <circle cx="8" cy="5" r="6" fill="none" stroke="#ff8c42" strokeWidth="2"/>
        <line x1="-8" y1="-13" x2="-8" y2="3" stroke="#ff8c42" strokeWidth="1.5"/>
        <line x1="-16" y1="-5" x2="0" y2="-5" stroke="#ff8c42" strokeWidth="1.5"/>
      </g>
      {/* Sticky notes */}
      <rect x="50" y="180" width="60" height="60" fill="#ff8c42" opacity="0.8" rx="3" transform="rotate(-5 80 210)"/>
      <rect x="130" y="190" width="60" height="60" fill="#2ec4b6" opacity="0.8" rx="3" transform="rotate(3 160 220)"/>
      <rect x="210" y="185" width="60" height="60" fill="#e71d36" opacity="0.7" rx="3" transform="rotate(-2 240 215)"/>
      <rect x="290" y="190" width="60" height="60" fill="#ffd60a" opacity="0.8" rx="3" transform="rotate(4 320 220)"/>
      <text x="65" y="215" fontSize="10" fill="white">Идея!</text>
      <text x="145" y="225" fontSize="10" fill="white">Клиент</text>
      <text x="225" y="220" fontSize="10" fill="white">MVP</text>
      <text x="305" y="225" fontSize="10" fill="#333">Рост</text>
    </svg>
  ),

  research: () => (
    <svg viewBox="0 0 400 300" className="scene-illustration">
      <rect width="400" height="300" fill="transparent"/>
      {/* Magnifying glass */}
      <circle cx="150" cy="120" r="60" fill="none" stroke="#2ec4b6" strokeWidth="4"/>
      <circle cx="150" cy="120" r="55" fill="rgba(46,196,182,0.1)"/>
      <line x1="195" y1="165" x2="230" y2="200" stroke="#2ec4b6" strokeWidth="6" strokeLinecap="round"/>
      {/* Chart inside magnifier */}
      <rect x="120" y="130" width="15" height="30" fill="#ff8c42" rx="2"/>
      <rect x="140" y="110" width="15" height="50" fill="#2ec4b6" rx="2"/>
      <rect x="160" y="120" width="15" height="40" fill="#ffd60a" rx="2"/>
      {/* People silhouettes */}
      <g transform="translate(270, 100)">
        <circle cx="0" cy="0" r="15" fill="#415a77"/>
        <rect x="-12" y="18" width="24" height="35" fill="#415a77" rx="8"/>
      </g>
      <g transform="translate(310, 110)">
        <circle cx="0" cy="0" r="12" fill="#2d3748"/>
        <rect x="-10" y="15" width="20" height="30" fill="#2d3748" rx="6"/>
      </g>
      <g transform="translate(340, 105)">
        <circle cx="0" cy="0" r="13" fill="#415a77"/>
        <rect x="-11" y="16" width="22" height="32" fill="#415a77" rx="7"/>
      </g>
      {/* Data points */}
      <circle cx="80" cy="240" r="5" fill="#ff8c42" className="animate-sparkle"/>
      <circle cx="120" cy="250" r="4" fill="#2ec4b6" className="animate-sparkle"/>
      <circle cx="160" cy="235" r="6" fill="#ffd60a" className="animate-sparkle"/>
      <circle cx="200" cy="255" r="4" fill="#e71d36" className="animate-sparkle"/>
      <line x1="80" y1="240" x2="120" y2="250" stroke="rgba(255,255,255,0.3)" strokeWidth="1"/>
      <line x1="120" y1="250" x2="160" y2="235" stroke="rgba(255,255,255,0.3)" strokeWidth="1"/>
      <line x1="160" y1="235" x2="200" y2="255" stroke="rgba(255,255,255,0.3)" strokeWidth="1"/>
    </svg>
  ),

  registration: () => (
    <svg viewBox="0 0 400 300" className="scene-illustration">
      <rect width="400" height="300" fill="transparent"/>
      {/* Building */}
      <rect x="150" y="60" width="100" height="200" fill="#2d3748" rx="5"/>
      <rect x="160" y="70" width="80" height="20" fill="#415a77"/>
      <text x="200" y="84" fontSize="10" fill="white" textAnchor="middle">ФНС</text>
      <rect x="170" y="100" width="20" height="20" fill="#ffd60a" opacity="0.7"/>
      <rect x="210" y="100" width="20" height="20" fill="#ffd60a" opacity="0.5"/>
      <rect x="170" y="130" width="20" height="20" fill="#ffd60a" opacity="0.8"/>
      <rect x="210" y="130" width="20" height="20" fill="#ffd60a" opacity="0.6"/>
      <rect x="185" y="220" width="30" height="40" fill="#1a202c"/>
      {/* Documents */}
      <g transform="translate(50, 150)" className="animate-float">
        <rect x="0" y="0" width="70" height="90" fill="white" rx="3"/>
        <line x1="10" y1="20" x2="60" y2="20" stroke="#ccc" strokeWidth="2"/>
        <line x1="10" y1="30" x2="50" y2="30" stroke="#ccc" strokeWidth="2"/>
        <line x1="10" y1="40" x2="55" y2="40" stroke="#ccc" strokeWidth="2"/>
        <line x1="10" y1="50" x2="45" y2="50" stroke="#ccc" strokeWidth="2"/>
        <circle cx="50" cy="70" r="12" fill="none" stroke="#e71d36" strokeWidth="2"/>
        <text x="50" y="74" fontSize="7" fill="#e71d36" textAnchor="middle">ПЕЧАТЬ</text>
      </g>
      {/* Stamp */}
      <g transform="translate(300, 180)">
        <rect x="0" y="0" width="60" height="25" fill="#2ec4b6" rx="3"/>
        <text x="30" y="16" fontSize="9" fill="white" textAnchor="middle">ИП/ООО</text>
      </g>
    </svg>
  ),

  capital: () => (
    <svg viewBox="0 0 400 300" className="scene-illustration">
      <rect width="400" height="300" fill="transparent"/>
      {/* Coins */}
      <g transform="translate(100, 200)">
        <ellipse cx="0" cy="0" rx="25" ry="8" fill="#ffd60a"/>
        <ellipse cx="0" cy="-5" rx="25" ry="8" fill="#e6c009"/>
        <ellipse cx="0" cy="-10" rx="25" ry="8" fill="#ffd60a"/>
        <text x="0" y="-7" fontSize="10" fill="#333" textAnchor="middle">₽</text>
      </g>
      <g transform="translate(150, 220)">
        <ellipse cx="0" cy="0" rx="20" ry="7" fill="#ffd60a"/>
        <ellipse cx="0" cy="-5" rx="20" ry="7" fill="#e6c009"/>
        <text x="0" y="-2" fontSize="8" fill="#333" textAnchor="middle">₽</text>
      </g>
      {/* Bank building */}
      <g transform="translate(250, 80)">
        <polygon points="50,0 0,30 100,30" fill="#415a77"/>
        <rect x="10" y="30" width="80" height="80" fill="#2d3748"/>
        <rect x="20" y="40" width="15" height="25" fill="#ffd60a" opacity="0.5"/>
        <rect x="45" y="40" width="15" height="25" fill="#ffd60a" opacity="0.7"/>
        <rect x="70" y="40" width="15" height="25" fill="#ffd60a" opacity="0.5"/>
        <rect x="35" y="80" width="30" height="30" fill="#1a202c"/>
        <text x="50" y="22" fontSize="8" fill="white" textAnchor="middle">БАНК</text>
      </g>
      {/* Handshake */}
      <g transform="translate(150, 100)">
        <path d="M0,20 Q20,0 40,20" fill="none" stroke="#2ec4b6" strokeWidth="3"/>
        <path d="M40,20 Q60,0 80,20" fill="none" stroke="#ff8c42" strokeWidth="3"/>
        <circle cx="40" cy="15" r="8" fill="#ffd60a" className="animate-pulse"/>
        <text x="40" y="19" fontSize="8" fill="#333" textAnchor="middle">$</text>
      </g>
    </svg>
  ),

  team: () => (
    <svg viewBox="0 0 400 300" className="scene-illustration">
      <rect width="400" height="300" fill="transparent"/>
      {/* Table */}
      <ellipse cx="200" cy="200" rx="120" ry="40" fill="#415a77" opacity="0.5"/>
      <rect x="100" y="200" width="200" height="10" fill="#2d3748" rx="5"/>
      {/* People around table */}
      <g transform="translate(120, 130)">
        <circle cx="0" cy="0" r="18" fill="#ff8c42"/>
        <text x="0" y="5" fontSize="14" textAnchor="middle">👩</text>
      </g>
      <g transform="translate(200, 120)">
        <circle cx="0" cy="0" r="20" fill="#2ec4b6"/>
        <text x="0" y="5" fontSize="16" textAnchor="middle">👨</text>
      </g>
      <g transform="translate(280, 130)">
        <circle cx="0" cy="0" r="18" fill="#ffd60a"/>
        <text x="0" y="5" fontSize="14" textAnchor="middle">🧑</text>
      </g>
      <g transform="translate(160, 240)">
        <circle cx="0" cy="0" r="16" fill="#e71d36"/>
        <text x="0" y="5" fontSize="12" textAnchor="middle">👩‍💼</text>
      </g>
      <g transform="translate(240, 240)">
        <circle cx="0" cy="0" r="16" fill="#415a77"/>
        <text x="0" y="5" fontSize="12" textAnchor="middle">👨‍💻</text>
      </g>
      {/* Connection lines */}
      <line x1="140" y1="140" x2="185" y2="125" stroke="rgba(255,255,255,0.2)" strokeWidth="1" strokeDasharray="4"/>
      <line x1="215" y1="125" x2="265" y2="140" stroke="rgba(255,255,255,0.2)" strokeWidth="1" strokeDasharray="4"/>
      <line x1="200" y1="140" x2="165" y2="230" stroke="rgba(255,255,255,0.2)" strokeWidth="1" strokeDasharray="4"/>
      <line x1="200" y1="140" x2="235" y2="230" stroke="rgba(255,255,255,0.2)" strokeWidth="1" strokeDasharray="4"/>
    </svg>
  ),

  launch: () => (
    <svg viewBox="0 0 400 300" className="scene-illustration">
      <rect width="400" height="300" fill="transparent"/>
      {/* Store/Website */}
      <rect x="100" y="80" width="200" height="180" fill="#2d3748" rx="8"/>
      <rect x="110" y="90" width="180" height="30" fill="#1a202c" rx="4"/>
      <text x="200" y="110" fontSize="12" fill="#2ec4b6" textAnchor="middle">🏪 ОТКРЫТО!</text>
      {/* Window display */}
      <rect x="120" y="130" width="70" height="60" fill="#ffd60a" opacity="0.3" rx="4"/>
      <rect x="210" y="130" width="70" height="60" fill="#ff8c42" opacity="0.3" rx="4"/>
      <text x="155" y="165" fontSize="20" textAnchor="middle">📦</text>
      <text x="245" y="165" fontSize="20" textAnchor="middle">🎁</text>
      {/* Door */}
      <rect x="170" y="200" width="60" height="60" fill="#1a202c" rx="4"/>
      <circle cx="220" cy="230" r="4" fill="#ffd60a"/>
      {/* Banner */}
      <g className="animate-float">
        <rect x="130" y="50" width="140" height="25" fill="#e71d36" rx="4"/>
        <text x="200" y="67" fontSize="11" fill="white" textAnchor="middle">✨ GRAND OPENING ✨</text>
      </g>
      {/* Confetti */}
      <circle cx="80" cy="60" r="3" fill="#ffd60a" className="animate-sparkle"/>
      <circle cx="320" cy="70" r="3" fill="#2ec4b6" className="animate-sparkle"/>
      <circle cx="90" cy="100" r="2" fill="#ff8c42" className="animate-sparkle"/>
      <circle cx="310" cy="110" r="2" fill="#e71d36" className="animate-sparkle"/>
    </svg>
  ),

  marketing: () => (
    <svg viewBox="0 0 400 300" className="scene-illustration">
      <rect width="400" height="300" fill="transparent"/>
      {/* Megaphone */}
      <g transform="translate(80, 100)">
        <polygon points="0,30 60,10 60,50" fill="#ff8c42"/>
        <rect x="60" y="15" width="40" height="30" fill="#ff8c42" rx="3"/>
        <circle cx="100" cy="30" r="15" fill="#ffd60a" opacity="0.5" className="animate-pulse"/>
        <rect x="-10" y="25" width="15" height="10" fill="#e6c009" rx="2"/>
      </g>
      {/* Likes */}
      <g transform="translate(250, 80)">
        <text fontSize="24">👍</text>
      </g>
      <g transform="translate(290, 120)">
        <text fontSize="20">❤️</text>
      </g>
      <g transform="translate(320, 90)">
        <text fontSize="18">⭐</text>
      </g>
      {/* Sales funnel */}
      <g transform="translate(200, 180)">
        <polygon points="-60,0 60,0 40,30 -40,30" fill="#2ec4b6" opacity="0.8"/>
        <polygon points="-40,32 40,32 25,60 -25,60" fill="#2ec4b6" opacity="0.6"/>
        <polygon points="-25,62 25,62 10,90 -10,90" fill="#2ec4b6" opacity="0.4"/>
        <text x="0" y="18" fontSize="10" fill="white" textAnchor="middle">Охват</text>
        <text x="0" y="48" fontSize="9" fill="white" textAnchor="middle">Интерес</text>
        <text x="0" y="78" fontSize="8" fill="white" textAnchor="middle">Покупка</text>
      </g>
      {/* Social icons */}
      <circle cx="330" cy="200" r="15" fill="#415a77"/>
      <text x="330" y="205" fontSize="12" textAnchor="middle" fill="white">in</text>
      <circle cx="360" cy="230" r="15" fill="#415a77"/>
      <text x="360" y="235" fontSize="12" textAnchor="middle" fill="white">VK</text>
    </svg>
  ),

  finance: () => (
    <svg viewBox="0 0 400 300" className="scene-illustration">
      <rect width="400" height="300" fill="transparent"/>
      {/* Calculator */}
      <g transform="translate(60, 80)">
        <rect x="0" y="0" width="80" height="120" fill="#2d3748" rx="8"/>
        <rect x="10" y="10" width="60" height="25" fill="#1a202c" rx="3"/>
        <text x="60" y="28" fontSize="12" fill="#2ec4b6" textAnchor="end">12 500</text>
        <rect x="10" y="42" width="15" height="15" fill="#415a77" rx="2"/>
        <rect x="30" y="42" width="15" height="15" fill="#415a77" rx="2"/>
        <rect x="50" y="42" width="15" height="15" fill="#ff8c42" rx="2"/>
        <rect x="10" y="62" width="15" height="15" fill="#415a77" rx="2"/>
        <rect x="30" y="62" width="15" height="15" fill="#415a77" rx="2"/>
        <rect x="50" y="62" width="15" height="15" fill="#ff8c42" rx="2"/>
        <rect x="10" y="82" width="15" height="15" fill="#415a77" rx="2"/>
        <rect x="30" y="82" width="15" height="15" fill="#415a77" rx="2"/>
        <rect x="50" y="82" width="15" height="15" fill="#2ec4b6" rx="2"/>
      </g>
      {/* Chart */}
      <g transform="translate(180, 80)">
        <rect x="0" y="0" width="180" height="120" fill="rgba(255,255,255,0.05)" rx="5"/>
        <line x1="20" y1="100" x2="160" y2="100" stroke="rgba(255,255,255,0.3)" strokeWidth="1"/>
        <line x1="20" y1="20" x2="20" y2="100" stroke="rgba(255,255,255,0.3)" strokeWidth="1"/>
        {/* Profit line */}
        <polyline points="20,90 50,80 80,60 110,40 140,30 160,25" fill="none" stroke="#2ec4b6" strokeWidth="2"/>
        {/* Cost line */}
        <polyline points="20,85 50,82 80,75 110,70 140,65 160,60" fill="none" stroke="#e71d36" strokeWidth="2"/>
        {/* Break-even point */}
        <circle cx="80" cy="60" r="5" fill="#ffd60a" className="animate-pulse"/>
        <text x="85" y="55" fontSize="8" fill="#ffd60a">Безубыточность</text>
      </g>
      {/* Money symbols */}
      <text x="100" y="250" fontSize="20" fill="#ffd60a" className="animate-float">💰</text>
      <text x="200" y="260" fontSize="16" fill="#ffd60a" className="animate-float">📈</text>
      <text x="300" y="250" fontSize="18" fill="#ffd60a" className="animate-float">💎</text>
    </svg>
  ),

  crisis: () => (
    <svg viewBox="0 0 400 300" className="scene-illustration">
      <rect width="400" height="300" fill="transparent"/>
      {/* Storm cloud */}
      <g transform="translate(200, 60)">
        <ellipse cx="0" cy="0" rx="80" ry="40" fill="#415a77"/>
        <ellipse cx="-30" cy="-10" rx="40" ry="25" fill="#2d3748"/>
        <ellipse cx="30" cy="-5" rx="35" ry="22" fill="#2d3748"/>
        <ellipse cx="0" cy="10" rx="70" ry="30" fill="#415a77"/>
        {/* Lightning */}
        <polygon points="-10,30 5,50 -5,50 10,75 -5,55 5,55" fill="#ffd60a" className="animate-sparkle"/>
      </g>
      {/* Building with cracks */}
      <g transform="translate(150, 140)">
        <rect x="0" y="0" width="100" height="140" fill="#2d3748" rx="3"/>
        {/* Cracks */}
        <path d="M30,0 L35,30 L25,50 L35,80 L30,100" fill="none" stroke="#e71d36" strokeWidth="2"/>
        <path d="M70,20 L65,50 L75,70" fill="none" stroke="#e71d36" strokeWidth="1.5"/>
        {/* Windows */}
        <rect x="15" y="20" width="15" height="15" fill="#ffd60a" opacity="0.3"/>
        <rect x="45" y="20" width="15" height="15" fill="#ffd60a" opacity="0.2"/>
        <rect x="70" y="20" width="15" height="15" fill="#ffd60a" opacity="0.1"/>
        <rect x="15" y="50" width="15" height="15" fill="#ffd60a" opacity="0.2"/>
        <rect x="45" y="50" width="15" height="15" fill="#ffd60a" opacity="0.1"/>
        <rect x="70" y="50" width="15" height="15" fill="#ffd60a" opacity="0.05"/>
        {/* Door */}
        <rect x="35" y="100" width="30" height="40" fill="#1a202c"/>
      </g>
      {/* Rain */}
      <line x1="80" y1="100" x2="75" y2="130" stroke="rgba(100,150,200,0.4)" strokeWidth="1"/>
      <line x1="120" y1="90" x2="115" y2="120" stroke="rgba(100,150,200,0.4)" strokeWidth="1"/>
      <line x1="280" y1="95" x2="275" y2="125" stroke="rgba(100,150,200,0.4)" strokeWidth="1"/>
      <line x1="320" y1="105" x2="315" y2="135" stroke="rgba(100,150,200,0.4)" strokeWidth="1"/>
    </svg>
  ),

  exit: () => (
    <svg viewBox="0 0 400 300" className="scene-illustration">
      <rect width="400" height="300" fill="transparent"/>
      {/* Handshake */}
      <g transform="translate(150, 100)">
        <path d="M0,40 Q30,20 60,40" fill="none" stroke="#2ec4b6" strokeWidth="4" strokeLinecap="round"/>
        <path d="M60,40 Q90,20 120,40" fill="none" stroke="#ff8c42" strokeWidth="4" strokeLinecap="round"/>
        <circle cx="60" cy="35" r="5" fill="#ffd60a"/>
      </g>
      {/* Briefcase with money */}
      <g transform="translate(160, 170)">
        <rect x="0" y="10" width="80" height="55" fill="#2d3748" rx="5"/>
        <rect x="25" y="0" width="30" height="15" fill="none" stroke="#415a77" strokeWidth="3" rx="3"/>
        <rect x="10" y="20" width="60" height="35" fill="#1a202c" rx="3"/>
        <text x="40" y="45" fontSize="16" fill="#ffd60a" textAnchor="middle">💰</text>
      </g>
      {/* Coins flying */}
      <circle cx="100" cy="80" r="10" fill="#ffd60a" opacity="0.7" className="animate-float"/>
      <text x="100" y="84" fontSize="8" fill="#333" textAnchor="middle">₽</text>
      <circle cx="300" cy="90" r="12" fill="#ffd60a" opacity="0.6" className="animate-float"/>
      <text x="300" y="94" fontSize="9" fill="#333" textAnchor="middle">₽</text>
      <circle cx="320" cy="180" r="8" fill="#ffd60a" opacity="0.5" className="animate-float"/>
    </svg>
  ),

  bankruptcy: () => (
    <svg viewBox="0 0 400 300" className="scene-illustration">
      <rect width="400" height="300" fill="transparent"/>
      {/* Empty office */}
      <rect x="100" y="100" width="200" height="160" fill="#2d3748" rx="5"/>
      <rect x="110" y="110" width="180" height="20" fill="#1a202c"/>
      {/* Empty desk */}
      <rect x="130" y="180" width="140" height="8" fill="#415a77"/>
      <rect x="140" y="188" width="5" height="50" fill="#415a77"/>
      <rect x="255" y="188" width="5" height="50" fill="#415a77"/>
      {/* Box with things */}
      <g transform="translate(250, 200)">
        <rect x="0" y="0" width="40" height="35" fill="#8B4513" rx="2"/>
        <rect x="-2" y="-3" width="44" height="5" fill="#A0522D" rx="1"/>
        <text x="20" y="22" fontSize="10" textAnchor="middle">📦</text>
      </g>
      {/* Broken sign */}
      <g transform="translate(150, 130)">
        <rect x="0" y="0" width="100" height="30" fill="#e71d36" opacity="0.7" rx="3"/>
        <text x="50" y="20" fontSize="11" fill="white" textAnchor="middle">ЗАКРЫТО</text>
      </g>
      {/* Cobweb */}
      <path d="M110,110 Q120,120 115,130" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5"/>
      <path d="M110,110 Q130,115 125,125" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5"/>
    </svg>
  ),

  success: () => (
    <svg viewBox="0 0 400 300" className="scene-illustration">
      <rect width="400" height="300" fill="transparent"/>
      {/* Building with HQ */}
      <rect x="130" y="100" width="140" height="180" fill="#2d3748" rx="5"/>
      <rect x="140" y="80" width="120" height="25" fill="#1a202c" rx="3"/>
      <text x="200" y="97" fontSize="14" fill="#ffd60a" textAnchor="middle" fontWeight="bold">HQ</text>
      {/* Windows lit up */}
      <rect x="145" y="115" width="20" height="20" fill="#ffd60a" opacity="0.8"/>
      <rect x="175" y="115" width="20" height="20" fill="#ffd60a" opacity="0.9"/>
      <rect x="205" y="115" width="20" height="20" fill="#ffd60a" opacity="0.7"/>
      <rect x="235" y="115" width="20" height="20" fill="#ffd60a" opacity="0.8"/>
      <rect x="145" y="145" width="20" height="20" fill="#2ec4b6" opacity="0.7"/>
      <rect x="175" y="145" width="20" height="20" fill="#2ec4b6" opacity="0.8"/>
      <rect x="205" y="145" width="20" height="20" fill="#2ec4b6" opacity="0.6"/>
      <rect x="235" y="145" width="20" height="20" fill="#2ec4b6" opacity="0.9"/>
      {/* Fireworks */}
      <g className="animate-sparkle">
        <circle cx="80" cy="50" r="3" fill="#e71d36"/>
        <circle cx="75" cy="40" r="2" fill="#ffd60a"/>
        <circle cx="90" cy="45" r="2" fill="#2ec4b6"/>
        <circle cx="85" cy="55" r="2" fill="#ff8c42"/>
      </g>
      <g className="animate-sparkle">
        <circle cx="320" cy="60" r="3" fill="#ffd60a"/>
        <circle cx="315" cy="50" r="2" fill="#e71d36"/>
        <circle cx="330" cy="55" r="2" fill="#2ec4b6"/>
        <circle cx="325" cy="65" r="2" fill="#ff8c42"/>
      </g>
      <g className="animate-sparkle">
        <circle cx="200" cy="30" r="3" fill="#2ec4b6"/>
        <circle cx="195" cy="20" r="2" fill="#ffd60a"/>
        <circle cx="210" cy="25" r="2" fill="#e71d36"/>
      </g>
      {/* Trophy */}
      <g transform="translate(200, 200)" className="animate-pulse">
        <text fontSize="40" textAnchor="middle">🏆</text>
      </g>
    </svg>
  ),

  report: () => (
    <svg viewBox="0 0 400 300" className="scene-illustration">
      <rect width="400" height="300" fill="transparent"/>
      {/* Document */}
      <g transform="translate(100, 30)">
        <rect x="0" y="0" width="200" height="250" fill="white" rx="5" opacity="0.95"/>
        <rect x="0" y="0" width="200" height="40" fill="#2d3748" rx="5"/>
        <rect x="0" y="35" width="200" height="5" fill="#2d3748"/>
        <text x="100" y="25" fontSize="12" fill="white" textAnchor="middle">ИНВЕСТИЦИОННЫЙ ОТЧЁТ</text>
        {/* Content lines */}
        <line x1="20" y1="60" x2="180" y2="60" stroke="#ccc" strokeWidth="2"/>
        <line x1="20" y1="80" x2="150" y2="80" stroke="#ccc" strokeWidth="2"/>
        <line x1="20" y1="100" x2="170" y2="100" stroke="#ccc" strokeWidth="2"/>
        <line x1="20" y1="120" x2="140" y2="120" stroke="#ccc" strokeWidth="2"/>
        <line x1="20" y1="140" x2="160" y2="140" stroke="#ccc" strokeWidth="2"/>
        <line x1="20" y1="160" x2="130" y2="160" stroke="#ccc" strokeWidth="2"/>
        {/* Stamp */}
        <circle cx="150" cy="210" r="25" fill="none" stroke="#e71d36" strokeWidth="2" opacity="0.7"/>
        <text x="150" y="215" fontSize="8" fill="#e71d36" textAnchor="middle" opacity="0.7">УТВЕРЖДЕНО</text>
        {/* Signature */}
        <path d="M30,220 Q50,210 70,220 Q90,230 110,215" fill="none" stroke="#333" strokeWidth="1.5"/>
        {/* Grade */}
        <rect x="140" y="170" width="40" height="25" fill="#ffd60a" rx="3"/>
        <text x="160" y="187" fontSize="14" fill="#333" textAnchor="middle" fontWeight="bold">5</text>
      </g>
    </svg>
  ),
};

export default Illustrations;
