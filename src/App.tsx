import React, { useState, useEffect, useCallback } from 'react';
import { Illustrations } from './components/Illustrations';
import { GAME_IMAGES, getActImage } from './components/GameImages';
import {
  SCENES, SPHERES, BUSINESS_TYPES, IDEAS, INITIAL_STATS,
  GLOSSARY, ENDINGS, TARGET_AUDIENCE_DATA, BUSINESS_PLAN_SECTIONS,
  INVESTOR_DIALOGUES, INTERVIEW_CANDIDATES, FINANCE_PROBLEMS,
  MARKETING_CHANNELS, MINIGAMES,
  type GameState, type GameStats, type Decision
} from './game/data';

// ============ UTILITY FUNCTIONS ============
const formatMoney = (n: number) => {
  if (Math.abs(n) >= 1000000) return `${(n/1000000).toFixed(1)} млн ₽`;
  if (Math.abs(n) >= 1000) return `${(n/1000).toFixed(0)} тыс ₽`;
  return `${n.toLocaleString('ru')} ₽`;
};

const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v));

const getInitialState = (): GameState => ({
  screen: 'start',
  founderName: '',
  sphere: '',
  businessType: '',
  businessIdea: '',
  stats: { ...INITIAL_STATS },
  currentScene: 'a1_s1',
  currentAct: 1,
  decisions: [],
  achievements: [],
  glossary: [],
  flags: [],
  miniGameScores: {},
  startTime: Date.now(),
});

// ============ SAVE/LOAD ============
const saveGame = (state: GameState) => {
  localStorage.setItem('startup_game_save', JSON.stringify(state));
};

const loadGame = (): GameState | null => {
  const saved = localStorage.getItem('startup_game_save');
  if (saved) return JSON.parse(saved);
  return null;
};

const getAllPlayers = (): GameState[] => {
  const data = localStorage.getItem('startup_game_players');
  return data ? JSON.parse(data) : [];
};

const savePlayerResult = (state: GameState) => {
  const players = getAllPlayers();
  players.push({ ...state, endTime: Date.now() });
  localStorage.setItem('startup_game_players', JSON.stringify(players));
};

// ============ MAIN APP ============
export default function App() {
  const [state, setState] = useState<GameState>(getInitialState());
  const [showGlossary, setShowGlossary] = useState(false);
  const [showJournal, setShowJournal] = useState(false);
  const [showAchievement, setShowAchievement] = useState<string | null>(null);
  const [teachingMsg, setTeachingMsg] = useState<string | null>(null);
  const [teacherMode, setTeacherMode] = useState(false);
  const [teacherAuth, setTeacherAuth] = useState(false);
  const [teacherPassword, setTeacherPassword] = useState('');
  const [currentMinigame, setCurrentMinigame] = useState<string | null>(null);
  const [animClass, setAnimClass] = useState('animate-fadeIn');

  const triggerAnim = () => {
    setAnimClass('');
    setTimeout(() => setAnimClass('animate-fadeIn'), 10);
  };

  // Auto-save
  useEffect(() => {
    if (state.screen !== 'start' && state.screen !== 'role_select') {
      saveGame(state);
    }
  }, [state]);

  // Check achievements
  const checkAchievements = useCallback((newState: GameState) => {
    const newAchievements: string[] = [];
    if (newState.stats.money > 200000 && !newState.achievements.includes('first_ruble')) {
      newAchievements.push('first_ruble');
    }
    if (newState.stats.team >= 3 && !newState.achievements.includes('team_builder')) {
      newAchievements.push('team_builder');
    }
    if (newState.stats.legal >= 80 && !newState.achievements.includes('legal_pure')) {
      newAchievements.push('legal_pure');
    }
    if (newState.flags.includes('review_polite') && !newState.achievements.includes('review_hero')) {
      newAchievements.push('review_hero');
    }
    if (newState.flags.includes('social_yes') && !newState.achievements.includes('ethical')) {
      newAchievements.push('ethical');
    }
    if (newAchievements.length > 0) {
      setShowAchievement(newAchievements[0]);
      setTimeout(() => setShowAchievement(null), 3000);
      return [...newState.achievements, ...newAchievements];
    }
    return newState.achievements;
  }, []);

  const applyChoice = (choice: { text?: string; effects: Partial<GameStats>; teaching?: string; flag?: string }) => {
    setState(prev => {
      const newStats = { ...prev.stats };
      Object.entries(choice.effects).forEach(([key, val]) => {
        if (key === 'money' || key === 'profit') {
          (newStats as any)[key] = ((newStats as any)[key] || 0) + (val || 0);
        } else if (key === 'team') {
          newStats.team = clamp(newStats.team + (val || 0), 0, 20);
        } else {
          (newStats as any)[key] = clamp(((newStats as any)[key] || 0) + (val || 0), 0, 100);
        }
      });
      const newFlags = choice.flag ? [...prev.flags, choice.flag] : prev.flags;
      const newGlossary = [...prev.glossary];
      // Add relevant glossary terms based on teaching
      if (choice.teaching) {
        if (choice.teaching.includes('MVP') && !newGlossary.includes('mvp')) newGlossary.push('mvp');
        if (choice.teaching.includes('УТП') && !newGlossary.includes('utp')) newGlossary.push('utp');
        if (choice.teaching.includes('CustDev') && !newGlossary.includes('custdev')) newGlossary.push('custdev');
        if (choice.teaching.includes('безубыточн') && !newGlossary.includes('bep')) newGlossary.push('bep');
        if (choice.teaching.includes('Кассовый') && !newGlossary.includes('cashgap')) newGlossary.push('cashgap');
        if (choice.teaching.includes('ROI') && !newGlossary.includes('roi')) newGlossary.push('roi');
        if (choice.teaching.includes('LTV') && !newGlossary.includes('ltv')) newGlossary.push('ltv');
        if (choice.teaching.includes('4P') && !newGlossary.includes('fourp')) newGlossary.push('fourp');
        if (choice.teaching.includes('Франшиз') && !newGlossary.includes('franchise')) newGlossary.push('franchise');
        if (choice.teaching.includes('Пивот') && !newGlossary.includes('pivot')) newGlossary.push('pivot');
        if (choice.teaching.includes('НПД') && !newGlossary.includes('npd')) newGlossary.push('npd');
        if (choice.teaching.includes('УСН') && !newGlossary.includes('usn')) newGlossary.push('usn');
        if (choice.teaching.includes('exit') && !newGlossary.includes('exit')) newGlossary.push('exit');
      }
      const decision: Decision = {
        sceneId: prev.currentScene,
        choiceText: choice.text || '',
        effects: choice.effects,
        teaching: choice.teaching,
        timestamp: Date.now(),
      };
      const newState = {
        ...prev,
        stats: newStats,
        flags: newFlags,
        glossary: newGlossary,
        decisions: [...prev.decisions, decision],
      };
      newState.achievements = checkAchievements(newState);
      return newState;
    });

    if (choice.teaching) {
      setTeachingMsg(choice.teaching);
      setTimeout(() => setTeachingMsg(null), 6000);
    }
  };

  const advanceScene = () => {
    setState(prev => {
      const currentSceneData = SCENES.find(s => s.id === prev.currentScene);
      if (!currentSceneData) return prev;
      
      // Find next scene
      const allScenesInAct = SCENES.filter(s => s.act === prev.currentAct);
      const currentIndex = allScenesInAct.findIndex(s => s.id === prev.currentScene);
      
      if (currentIndex < allScenesInAct.length - 1) {
        return { ...prev, currentScene: allScenesInAct[currentIndex + 1].id };
      } else {
        // Move to next act or minigame
        const nextAct = prev.currentAct + 1;
        if (nextAct > 6) {
          // Game over - determine ending
          return determineEnding(prev);
        }
        const nextScenes = SCENES.filter(s => s.act === nextAct);
        if (nextScenes.length > 0) {
          return { ...prev, currentAct: nextAct, currentScene: nextScenes[0].id };
        }
        return determineEnding(prev);
      }
    });
    triggerAnim();
  };

  const determineEnding = (state: GameState): GameState => {
    // Check endings in priority order
    const endingOrder = ['mentor', 'unicorn', 'franchise', 'social', 'exit', 'stable', 'burnout', 'bankruptcy'];
    let finalEnding = 'stable'; // default
    for (const key of endingOrder) {
      if (ENDINGS[key].condition(state)) {
        finalEnding = key;
        break;
      }
    }
    const newState = { ...state, screen: 'ending', ending: finalEnding, endTime: Date.now() };
    savePlayerResult(newState);
    return newState;
  };

  const startMinigame = (id: string) => {
    setCurrentMinigame(id);
    setState(prev => ({ ...prev, screen: 'minigame' }));
  };

  const completeMinigame = (score: number) => {
    setState(prev => ({
      ...prev,
      screen: 'game',
      miniGameScores: { ...prev.miniGameScores, [currentMinigame!]: score },
    }));
    setCurrentMinigame(null);
    triggerAnim();
  };

  // ============ RENDER FUNCTIONS ============

  const renderHUD = () => (
    <div className="hud-bar">
      <div className="flex flex-wrap gap-3 justify-between items-center max-w-6xl mx-auto">
        <div className="stat-item">
          <span>💰</span>
          <span className="font-bold text-yellow-400 animate-countUp">{formatMoney(state.stats.money)}</span>
        </div>
        <div className="stat-item">
          <span>📈</span>
          <span>{formatMoney(state.stats.profit)}</span>
        </div>
        <div className="stat-item">
          <span>👥</span>
          <span>{state.stats.team}</span>
          <div className="stat-bar">
            <div className="stat-bar-fill bg-blue-400" style={{ width: `${state.stats.morale}%` }}/>
          </div>
        </div>
        <div className="stat-item">
          <span>⭐</span>
          <div className="stat-bar">
            <div className="stat-bar-fill bg-yellow-400" style={{ width: `${state.stats.reputation}%` }}/>
          </div>
          <span>{state.stats.reputation}</span>
        </div>
        <div className="stat-item">
          <span>😊</span>
          <div className="stat-bar">
            <div className="stat-bar-fill bg-green-400" style={{ width: `${state.stats.satisfaction}%` }}/>
          </div>
        </div>
        <div className="stat-item">
          <span>⚖️</span>
          <div className="stat-bar">
            <div className="stat-bar-fill bg-purple-400" style={{ width: `${state.stats.legal}%` }}/>
          </div>
        </div>
        <div className="stat-item">
          <span>🔥</span>
          <div className="stat-bar">
            <div className="stat-bar-fill bg-red-400" style={{ width: `${state.stats.risk}%` }}/>
          </div>
        </div>
        <div className="stat-item">
          <span>💡</span>
          <div className="stat-bar">
            <div className="stat-bar-fill bg-cyan-400" style={{ width: `${state.stats.innovation}%` }}/>
          </div>
        </div>
        <div className="stat-item text-xs opacity-70">
          Этап {state.currentAct}/6
        </div>
      </div>
    </div>
  );

  const renderStartScreen = () => (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 animate-fadeIn">
      <div className="text-center mb-8">
        <img 
          src={GAME_IMAGES.hero} 
          alt="Стартап - Путь основателя" 
          className="game-hero-image mb-6"
        />
        <h1 className="text-4xl md:text-5xl font-bold mt-6 mb-2 text-white" style={{ fontFamily: 'Georgia, serif', textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>
          СТАРТАП
        </h1>
        <p className="text-xl text-orange-400 mb-2 font-semibold">Путь основателя</p>
        <p className="text-sm text-gray-300">Обучающая игра по предпринимательству • 10 класс</p>
      </div>
      <div className="flex flex-col gap-3 w-full max-w-xs">
        <button className="btn btn-primary text-lg" onClick={() => setState(prev => ({ ...prev, screen: 'role_select' }))}>
          🎮 Новая игра
        </button>
        {loadGame() && (
          <button className="btn btn-success" onClick={() => {
            const saved = loadGame();
            if (saved) setState(saved);
          }}>
            ▶️ Продолжить
          </button>
        )}
        <button className="btn btn-outline" onClick={() => setState(prev => ({ ...prev, screen: 'rules' }))}>
          📖 Правила
        </button>
        <button className="btn btn-outline" onClick={() => setShowGlossary(true)}>
          📚 Глоссарий
        </button>
        <button className="btn btn-outline" onClick={() => setTeacherMode(true)}>
          👨‍🏫 Режим учителя
        </button>
        <button className="btn btn-outline text-sm" onClick={downloadGame}>
          ⬇️ Скачать игру
        </button>
      </div>
    </div>
  );

  const renderRoleSelect = () => (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 animate-fadeIn">
      <div className="game-card max-w-md w-full text-center">
        <h2 className="text-2xl font-bold mb-6">Кто вы?</h2>
        <div className="flex flex-col gap-4">
          <button className="btn btn-primary text-lg py-4" onClick={() => {
            setState(prev => ({ ...prev, screen: 'create' }));
            triggerAnim();
          }}>
            🎓 Я ученик — играть!
          </button>
          <button className="btn btn-outline" onClick={() => setTeacherMode(true)}>
            👨‍🏫 Я учитель
          </button>
          <button className="btn btn-outline text-sm" onClick={() => setState(prev => ({ ...prev, screen: 'start' }))}>
            ← Назад
          </button>
        </div>
      </div>
    </div>
  );

  const renderCreateScreen = () => (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 animate-fadeIn">
      <div className="game-card max-w-lg w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">🚀 Создай свой стартап</h2>
        
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-1">Имя основателя:</label>
          <input
            type="text"
            className="w-full p-3 rounded-lg border-2 border-gray-200 focus:border-orange-400 outline-none text-gray-800"
            placeholder="Введите ваше имя"
            value={state.founderName}
            onChange={e => setState(prev => ({ ...prev, founderName: e.target.value }))}
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2">Сфера бизнеса:</label>
          <div className="grid grid-cols-1 gap-2">
            {Object.entries(SPHERES).map(([key, s]) => (
              <button
                key={key}
                className={`p-3 rounded-lg border-2 text-left transition-all ${
                  state.sphere === key ? 'border-orange-400 bg-orange-50' : 'border-gray-200 hover:border-orange-300'
                }`}
                onClick={() => setState(prev => ({ ...prev, sphere: key, businessIdea: '' }))}
              >
                <span className="text-xl mr-2">{s.emoji}</span>
                <span className="font-semibold text-gray-800">{s.name}</span>
                <span className="text-xs text-gray-500 ml-2">{s.description}</span>
              </button>
            ))}
          </div>
        </div>

        {state.sphere && (
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">Тип бизнеса:</label>
            <div className="grid grid-cols-1 gap-2">
              {Object.entries(BUSINESS_TYPES).map(([key, bt]) => (
                <button
                  key={key}
                  className={`p-3 rounded-lg border-2 text-left transition-all ${
                    state.businessType === key ? 'border-green-400 bg-green-50' : 'border-gray-200 hover:border-green-300'
                  }`}
                  onClick={() => setState(prev => ({ ...prev, businessType: key }))}
                >
                  <div className="font-semibold text-gray-800">{bt.name}</div>
                  <div className="text-xs text-gray-500">Налог: {bt.tax} | {bt.pros}</div>
                  <div className="text-xs text-red-500">Минус: {bt.cons}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {state.sphere && state.businessType && (
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">Бизнес-идея:</label>
            <div className="grid grid-cols-1 gap-2 mb-2">
              {(IDEAS[state.sphere as keyof typeof IDEAS] || []).map((idea: string, i: number) => (
                <button
                  key={i}
                  className={`p-3 rounded-lg border-2 text-left text-sm transition-all ${
                    state.businessIdea === idea ? 'border-purple-400 bg-purple-50' : 'border-gray-200 hover:border-purple-300'
                  }`}
                  onClick={() => setState(prev => ({ ...prev, businessIdea: idea }))}
                >
                  💡 {idea}
                </button>
              ))}
            </div>
            <input
              type="text"
              className="w-full p-3 rounded-lg border-2 border-gray-200 focus:border-purple-400 outline-none text-gray-800 text-sm"
              placeholder="Или введите свою идею..."
              value={state.businessIdea}
              onChange={e => setState(prev => ({ ...prev, businessIdea: e.target.value }))}
            />
          </div>
        )}

        <button
          className="btn btn-primary w-full mt-4"
          disabled={!state.founderName || !state.sphere || !state.businessType || !state.businessIdea}
          onClick={() => {
            setState(prev => ({ ...prev, screen: 'game', currentScene: 'a1_s1', currentAct: 1 }));
            triggerAnim();
          }}
        >
          🚀 Начать путь!
        </button>
      </div>
    </div>
  );

  const renderGameScreen = () => {
    const scene = SCENES.find(s => s.id === state.currentScene);
    if (!scene) return renderEndingScreen();

    const svgId = scene.svgId as keyof typeof Illustrations;
    const SvgComponent = Illustrations[svgId];
    const actImage = getActImage(state.currentAct);
    
    // Check if we should show minigame button for this act
    const minigameForAct = Object.values(MINIGAMES).find(m => m.act === state.currentAct);
    const hasPlayedMinigame = minigameForAct && state.miniGameScores[minigameForAct.id] !== undefined;

    return (
      <div className="min-h-screen flex flex-col">
        {renderHUD()}
        <div className="flex-1 p-4 max-w-4xl mx-auto w-full">
          <div className={`${animClass}`}>
            {/* Act Image */}
            <div className="flex justify-center mb-6">
              <img 
                src={actImage} 
                alt={`Этап ${state.currentAct}`}
                className="game-scene-image"
              />
            </div>

            {/* Scene title */}
            <div className="text-center mb-6">
              <span className="text-sm text-gray-400 uppercase tracking-wider font-medium">
                Этап {scene.act} • {['Идея и рынок', 'Регистрация', 'Капитал', 'Команда', 'Запуск и рост', 'Кризис и выбор'][scene.act - 1]}
              </span>
              <h2 className="text-3xl font-bold mt-2 text-white" style={{ fontFamily: 'Georgia, serif', textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}>
                {scene.title}
              </h2>
            </div>

            {/* Scene text */}
            <div className="game-card mb-4">
              {scene.text.split('\n\n').map((para, i) => (
                <p key={i} className="mb-3 text-gray-700 leading-relaxed">{para}</p>
              ))}
            </div>

            {/* Minigame button */}
            {minigameForAct && !hasPlayedMinigame && (
              <div className="mb-4 text-center">
                <button
                  className="btn btn-gold animate-glow"
                  onClick={() => startMinigame(minigameForAct.id)}
                >
                  🎮 Мини-игра: {minigameForAct.title.replace('Мини-игра: ', '')}
                </button>
              </div>
            )}
            {hasPlayedMinigame && minigameForAct && (
              <div className="mb-4 text-center text-sm text-green-400">
                ✅ Мини-игра пройдена! Результат: {state.miniGameScores[minigameForAct.id]}%
              </div>
            )}

            {/* Choices */}
            <div className="space-y-3">
              {scene.choices.map((choice, i) => (
                <button
                  key={i}
                  className="btn-choice"
                  onClick={() => {
                    applyChoice(choice);
                    if (choice.teaching) {
                      setTeachingMsg(choice.teaching);
                      setTimeout(() => setTeachingMsg(null), 6000);
                    }
                  }}
                >
                  {choice.text}
                </button>
              ))}
            </div>

            {/* Teaching message */}
            {teachingMsg && (
              <div className="teaching-tip mt-4">
                <strong>Ты применил понятие:</strong> {teachingMsg}
              </div>
            )}

            {/* Bottom actions */}
            <div className="flex flex-wrap gap-2 mt-6 justify-center">
              <button className="btn btn-outline text-sm" onClick={() => setShowJournal(true)}>
                📓 Журнал решений ({state.decisions.length})
              </button>
              <button className="btn btn-outline text-sm" onClick={() => setShowGlossary(true)}>
                📚 Глоссарий ({state.glossary.length})
              </button>
              <button className="btn btn-outline text-sm" onClick={() => {
                saveGame(state);
                alert('Игра сохранена!');
              }}>
                💾 Сохранить
              </button>
            </div>

            {/* Next scene button */}
            <div className="text-center mt-6">
              <button className="btn btn-primary" onClick={advanceScene}>
                Далее →
              </button>
            </div>
          </div>
        </div>

        {/* Achievement popup */}
        {showAchievement && (
          <div className="fixed top-20 right-4 z-50 animate-popIn">
            <div className="achievement">
              🏆 {showAchievement === 'first_ruble' ? 'Первый рубль!' :
                  showAchievement === 'team_builder' ? 'Строитель команды!' :
                  showAchievement === 'legal_pure' ? 'Юридическая чистота!' :
                  showAchievement === 'review_hero' ? 'Герой отзывов!' :
                  showAchievement === 'ethical' ? 'Этичный предприниматель!' : 'Достижение!'}
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderEndingScreen = () => {
    const ending = state.ending ? ENDINGS[state.ending] : ENDINGS.stable;
    const duration = state.endTime ? Math.round((state.endTime - state.startTime) / 60000) : 0;
    
    // Calculate grade
    const effectiveDecisions = state.decisions.filter(d => {
      const effects = d.effects;
      const positive = (effects.money || 0) > 0 || (effects.reputation || 0) > 5 || (effects.legal || 0) > 5;
      const negative = (effects.risk || 0) > 15 || (effects.legal || 0) < -10;
      return positive && !negative;
    }).length;
    const decisionRate = state.decisions.length > 0 ? effectiveDecisions / state.decisions.length : 0;
    const miniGameAvg = Object.values(state.miniGameScores).length > 0
      ? Object.values(state.miniGameScores).reduce((a, b) => a + b, 0) / Object.values(state.miniGameScores).length
      : 0;
    
    let grade = 2;
    if (state.currentAct >= 6 && decisionRate >= 0.8 && miniGameAvg >= 70) grade = 5;
    else if (state.currentAct >= 6 && decisionRate >= 0.6) grade = 4;
    else if (state.currentAct >= 5) grade = 3;

    const endingImage = state.ending === 'bankruptcy' ? GAME_IMAGES.act6 :
                        state.ending === 'burnout' ? GAME_IMAGES.act6 :
                        GAME_IMAGES.act5;

    return (
      <div className="min-h-screen p-4 flex flex-col items-center animate-fadeIn">
        <div className="max-w-2xl w-full">
          <div className="text-center mb-6">
            <img 
              src={endingImage} 
              alt="Финал"
              className="game-scene-image mb-4"
            />
            <h1 className="text-4xl font-bold mt-4 text-white" style={{ fontFamily: 'Georgia, serif', textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>
              {ending.title}
            </h1>
          </div>

          <div className="game-card mb-6">
            <p className="text-gray-700 leading-relaxed">{ending.description}</p>
          </div>

          {/* Investor Report */}
          <div className="game-card mb-6">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              📋 Инвесторский отчёт
            </h3>
            <div className="report-section">
              <p><strong>Основатель:</strong> {state.founderName}</p>
              <p><strong>Сфера:</strong> {SPHERES[state.sphere]?.name}</p>
              <p><strong>Форма бизнеса:</strong> {BUSINESS_TYPES[state.businessType]?.name}</p>
              <p><strong>Идея:</strong> {state.businessIdea}</p>
            </div>
            <div className="report-section">
              <p><strong>💰 Итого денег:</strong> {formatMoney(state.stats.money)}</p>
              <p><strong>⭐ Репутация:</strong> {state.stats.reputation}/100</p>
              <p><strong>👥 Команда:</strong> {state.stats.team} чел. (мораль: {state.stats.morale}%)</p>
              <p><strong>⚖️ Юр. чистота:</strong> {state.stats.legal}/100</p>
              <p><strong>💡 Инновации:</strong> {state.stats.innovation}/100</p>
            </div>
            <div className="report-section">
              <p><strong>⏱️ Время прохождения:</strong> {duration} мин.</p>
              <p><strong>📊 Решений принято:</strong> {state.decisions.length}</p>
              <p><strong>✅ Эффективных:</strong> {effectiveDecisions} ({Math.round(decisionRate * 100)}%)</p>
              <p><strong>🎮 Мини-игры:</strong> {Object.keys(state.miniGameScores).length} пройдено (средний балл: {Math.round(miniGameAvg)}%)</p>
            </div>
            <div className="report-section">
              <p><strong>🏆 Достижения:</strong></p>
              <div className="flex flex-wrap gap-2 mt-2">
                {state.achievements.map(a => (
                  <span key={a} className="achievement">
                    {a === 'first_ruble' ? '💰 Первый рубль' :
                     a === 'team_builder' ? '👥 Командостроитель' :
                     a === 'legal_pure' ? '⚖️ Чистый перед законом' :
                     a === 'review_hero' ? '⭐ Герой отзывов' :
                     a === 'ethical' ? '🌍 Этичный' : a}
                  </span>
                ))}
                {state.achievements.length === 0 && <span className="text-sm opacity-50">Пока нет</span>}
              </div>
            </div>
            <div className="report-section">
              <p><strong>📌 Ключевые решения:</strong></p>
              <div className="mt-2 space-y-1 max-h-40 overflow-y-auto">
                {state.decisions.slice(-10).map((d, i) => (
                  <div key={i} className="text-sm p-2 rounded bg-gray-50">
                    <span className="font-medium">{d.choiceText.substring(0, 60)}...</span>
                    {d.teaching && <span className="text-xs text-gray-500 block mt-1">→ {d.teaching.substring(0, 80)}...</span>}
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-4 p-4 rounded-lg bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200">
              <p className="text-2xl font-bold text-center">Оценка: <span className={grade >= 4 ? 'text-green-600' : grade >= 3 ? 'text-yellow-600' : 'text-red-600'}>{grade}</span>/5</p>
              <p className="text-sm text-center text-gray-600 mt-1">
                {grade === 5 ? 'Превосходно! Ты настоящий предприниматель!' :
                 grade === 4 ? 'Хороший результат! Есть потенциал для роста.' :
                 grade === 3 ? 'Неплохо, но есть над чем работать.' :
                 'Не сдался — уже хорошо. Попробуй ещё раз!'}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 justify-center">
            <button className="btn btn-primary" onClick={() => {
              setState(getInitialState());
              triggerAnim();
            }}>
              🔄 Играть снова
            </button>
            <button className="btn btn-outline" onClick={() => {
              setState(prev => ({ ...prev, screen: 'start' }));
              triggerAnim();
            }}>
              🏠 На главную
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderRulesScreen = () => (
    <div className="min-h-screen p-4 flex flex-col items-center animate-fadeIn">
      <div className="game-card max-w-2xl w-full">
        <h2 className="text-2xl font-bold mb-4">📖 Правила игры</h2>
        <div className="space-y-3 text-gray-700 text-sm leading-relaxed">
          <p><strong>🎯 Цель:</strong> Пройти путь от идеи до действующей компании за 6 этапов (кварталов).</p>
          <p><strong>📊 Ресурсы:</strong> Следи за деньгами, репутацией, командой, юридической чистотой и уровнем риска.</p>
          <p><strong>🎮 Мини-игры:</strong> На каждом этапе — интерактивная мини-игра. Они влияют на итоговую оценку.</p>
          <p><strong>💡 Обучение:</strong> После каждого решения — пояснение, как это работает в реальности.</p>
          <p><strong>📚 Глоссарий:</strong> Термины добавляются по ходу игры. Нажми «Глоссарий» чтобы посмотреть.</p>
          <p><strong>💾 Сохранение:</strong> Игра автосохраняется после каждого решения.</p>
          <p><strong>🏆 Финалы:</strong> 8 разных финалов зависят от твоих решений. Есть скрытая концовка!</p>
          <p><strong>⏱️ Время:</strong> 30–45 минут на полное прохождение.</p>
          <p className="mt-4 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
            <strong>Совет:</strong> Не торопись. Читай последствия каждого выбора — они влияют на дальнейшую игру!
          </p>
        </div>
        <button className="btn btn-primary mt-6 w-full" onClick={() => setState(prev => ({ ...prev, screen: 'start' }))}>
          ← Назад
        </button>
      </div>
    </div>
  );

  // ============ MINIGAMES ============
  const renderMinigame = () => {
    if (!currentMinigame) return null;

    switch (currentMinigame) {
      case 'target_audience': return <MinigameTargetAudience sphere={state.sphere} onComplete={completeMinigame} />;
      case 'business_plan': return <MinigameBusinessPlan onComplete={completeMinigame} />;
      case 'investor': return <MinigameInvestor onComplete={completeMinigame} />;
      case 'interview': return <MinigameInterview onComplete={completeMinigame} />;
      case 'finance': return <MinigameFinance onComplete={completeMinigame} />;
      case 'marketing_mix': return <MinigameMarketingMix sphere={state.sphere} onComplete={completeMinigame} />;
      default: return null;
    }
  };

  // ============ TEACHER PANEL ============
  const renderTeacherPanel = () => {
    if (!teacherAuth) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 animate-fadeIn">
          <div className="game-card max-w-sm w-full text-center">
            <h2 className="text-xl font-bold mb-4">👨‍🏫 Режим учителя</h2>
            <p className="text-sm text-gray-600 mb-4">Введите пароль для доступа:</p>
            <input
              type="password"
              className="w-full p-3 rounded-lg border-2 border-gray-200 focus:border-orange-400 outline-none text-gray-800 mb-4"
              placeholder="Пароль"
              value={teacherPassword}
              onChange={e => setTeacherPassword(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter' && teacherPassword === 'teacher2024') setTeacherAuth(true); }}
            />
            <button className="btn btn-primary w-full mb-2" onClick={() => {
              if (teacherPassword === 'teacher2024') setTeacherAuth(true);
              else alert('Неверный пароль!');
            }}>
              Войти
            </button>
            <button className="btn btn-outline w-full" onClick={() => { setTeacherMode(false); setTeacherAuth(false); }}>
              ← Назад
            </button>
          </div>
        </div>
      );
    }

    const players = getAllPlayers();
    return (
      <div className="min-h-screen p-4 animate-fadeIn">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">👨‍🏫 Панель учителя</h2>
            <div className="flex gap-2">
              <button className="btn btn-outline text-sm" onClick={exportCSV}>📥 Экспорт CSV</button>
              <button className="btn btn-danger text-sm" onClick={() => {
                if (confirm('Удалить все данные учеников?')) {
                  localStorage.removeItem('startup_game_players');
                  window.location.reload();
                }
              }}>🗑️ Сброс</button>
              <button className="btn btn-outline text-sm" onClick={() => { setTeacherMode(false); setTeacherAuth(false); }}>← Выход</button>
            </div>
          </div>

          {players.length === 0 ? (
            <div className="game-card text-center">
              <p className="text-gray-500">Пока нет результатов учеников.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {players.map((player, i) => {
                const duration = player.endTime ? Math.round((player.endTime - player.startTime) / 60000) : 0;
                const effectiveDecisions = player.decisions?.filter((d: Decision) => {
                  const effects = d.effects;
                  return ((effects.money || 0) > 0 || (effects.reputation || 0) > 5) && (effects.risk || 0) <= 15;
                }).length || 0;
                const decisionRate = player.decisions?.length > 0 ? effectiveDecisions / player.decisions.length : 0;
                const miniGameAvg = player.miniGameScores ? 
                  (Object.values(player.miniGameScores).reduce((a: number, b: any) => a + b, 0) / Math.max(1, Object.values(player.miniGameScores).length)) : 0;
                
                let grade = 2;
                if (player.currentAct >= 6 && decisionRate >= 0.8 && miniGameAvg >= 70) grade = 5;
                else if (player.currentAct >= 6 && decisionRate >= 0.6) grade = 4;
                else if (player.currentAct >= 5) grade = 3;

                return (
                  <div key={i} className="game-card">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold text-lg">{player.founderName || 'Без имени'}</h3>
                        <p className="text-sm text-gray-500">
                          {SPHERES[player.sphere]?.name} | {BUSINESS_TYPES[player.businessType]?.name} | {duration} мин.
                        </p>
                      </div>
                      <div className="text-2xl font-bold text-right">
                        <span className={grade >= 4 ? 'text-green-500' : grade >= 3 ? 'text-yellow-500' : 'text-red-500'}>{grade}</span>
                        <span className="text-sm text-gray-400">/5</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-3 text-xs">
                      <div>💰 {formatMoney(player.stats?.money || 0)}</div>
                      <div>⭐ {player.stats?.reputation || 0}/100</div>
                      <div>📊 Решений: {player.decisions?.length || 0}</div>
                      <div>🎮 Мини-игры: {Object.keys(player.miniGameScores || {}).length}</div>
                    </div>
                    <div className="mt-2 text-xs text-gray-500">
                      Финал: {player.ending ? ENDINGS[player.ending]?.title : 'Не завершил'}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    );
  };

  // ============ MODALS ============
  const renderGlossaryModal = () => {
    if (!showGlossary) return null;
    return (
      <div className="modal-overlay" onClick={() => setShowGlossary(false)}>
        <div className="modal-content" onClick={e => e.stopPropagation()}>
          <h3 className="text-xl font-bold mb-4">📚 Глоссарий</h3>
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {(state.glossary.length > 0 ? state.glossary : Object.keys(GLOSSARY)).map(key => {
              const term = GLOSSARY[key];
              if (!term) return null;
              return (
                <div key={key} className="glossary-card">
                  <div className="font-bold text-orange-400">{term.term}</div>
                  <div className="text-sm text-gray-300 mt-1">{term.definition}</div>
                  <div className="text-xs text-gray-500 mt-1 italic">Пример: {term.example}</div>
                </div>
              );
            })}
          </div>
          <button className="btn btn-outline mt-4 w-full" onClick={() => setShowGlossary(false)}>Закрыть</button>
        </div>
      </div>
    );
  };

  const renderJournalModal = () => {
    if (!showJournal) return null;
    return (
      <div className="modal-overlay" onClick={() => setShowJournal(false)}>
        <div className="modal-content" onClick={e => e.stopPropagation()}>
          <h3 className="text-xl font-bold mb-4">📓 Журнал решений</h3>
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {state.decisions.length === 0 ? (
              <p className="text-gray-500 text-center">Пока нет решений</p>
            ) : (
              state.decisions.map((d, i) => (
                <div key={i} className="glossary-card">
                  <div className="text-sm font-medium">{d.choiceText}</div>
                  {d.teaching && (
                    <div className="text-xs text-gray-400 mt-1">💡 {d.teaching}</div>
                  )}
                  <div className="text-xs text-gray-500 mt-1">
                    {Object.entries(d.effects).map(([k, v]) => {
                      const icons: Record<string, string> = { money: '💰', reputation: '⭐', risk: '🔥', legal: '⚖️', innovation: '💡', morale: '😊', satisfaction: '😊', team: '👥' };
                      return `${icons[k] || k}${(v as number) > 0 ? '+' : ''}${v}`;
                    }).join(' ')}
                  </div>
                </div>
              ))
            )}
          </div>
          <button className="btn btn-outline mt-4 w-full" onClick={() => setShowJournal(false)}>Закрыть</button>
        </div>
      </div>
    );
  };

  // ============ MAIN RENDER ============
  if (teacherMode) return <>{renderTeacherPanel()}{renderGlossaryModal()}</>;

  switch (state.screen) {
    case 'start': return <>{renderStartScreen()}{renderGlossaryModal()}</>;
    case 'role_select': return <>{renderRoleSelect()}{renderGlossaryModal()}</>;
    case 'create': return <>{renderCreateScreen()}{renderGlossaryModal()}</>;
    case 'rules': return <>{renderRulesScreen()}{renderGlossaryModal()}</>;
    case 'game': return <>{renderGameScreen()}{renderGlossaryModal()}{renderJournalModal()}</>;
    case 'minigame': return <>{renderMinigame()}{renderGlossaryModal()}</>;
    case 'ending': return <>{renderEndingScreen()}{renderGlossaryModal()}</>;
    default: return <>{renderStartScreen()}{renderGlossaryModal()}</>;
  }
}

// ============ DOWNLOAD FUNCTION ============
function downloadGame() {
  const html = '<!DOCTYPE html>\n' + document.documentElement.outerHTML;
  const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'Startap_Igra_10klass.html';
  document.body.appendChild(a);
  a.click();
  setTimeout(() => { document.body.removeChild(a); URL.revokeObjectURL(url); }, 200);
}

// ============ EXPORT CSV ============
function exportCSV() {
  const players = getAllPlayers();
  if (players.length === 0) { alert('Нет данных для экспорта'); return; }
  
  let csv = 'Имя;Сфера;Форма;Идея;Деньги;Репутация;Команда;Этап;Финал;Оценка;Время(мин);Решений\n';
  players.forEach(p => {
    const duration = p.endTime ? Math.round((p.endTime - p.startTime) / 60000) : 0;
    const effectiveDecisions = p.decisions?.filter((d: Decision) => ((d.effects.money || 0) > 0 || (d.effects.reputation || 0) > 5) && (d.effects.risk || 0) <= 15).length || 0;
    const decisionRate = p.decisions?.length > 0 ? effectiveDecisions / p.decisions.length : 0;
    const miniGameAvg = p.miniGameScores ? 
      Object.values(p.miniGameScores).reduce((a: number, b: any) => a + b, 0) / Math.max(1, Object.values(p.miniGameScores).length) : 0;
    let grade = 2;
    if (p.currentAct >= 6 && decisionRate >= 0.8 && miniGameAvg >= 70) grade = 5;
    else if (p.currentAct >= 6 && decisionRate >= 0.6) grade = 4;
    else if (p.currentAct >= 5) grade = 3;
    
    csv += `${p.founderName};${SPHERES[p.sphere]?.name || ''};${BUSINESS_TYPES[p.businessType]?.name || ''};${p.businessIdea};${p.stats?.money || 0};${p.stats?.reputation || 0};${p.stats?.team || 0};${p.currentAct};${p.ending || 'не завершил'};${grade};${duration};${p.decisions?.length || 0}\n`;
  });
  
  const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'startup_game_results.csv';
  document.body.appendChild(a);
  a.click();
  setTimeout(() => { document.body.removeChild(a); URL.revokeObjectURL(url); }, 200);
}

// ============ MINIGAME COMPONENTS ============

function MinigameTargetAudience({ sphere, onComplete }: { sphere: string; onComplete: (score: number) => void }) {
  const [myClients, setMyClients] = useState<string[]>([]);
  const [notClients, setNotClients] = useState<string[]>([]);
  const [checked, setChecked] = useState(false);
  const [score, setScore] = useState(0);

  const correct = TARGET_AUDIENCE_DATA.correct[sphere as keyof typeof TARGET_AUDIENCE_DATA.correct] || TARGET_AUDIENCE_DATA.correct.food;
  const personas = TARGET_AUDIENCE_DATA.personas;

  const moveToMy = (id: string) => {
    if (!myClients.includes(id)) {
      setMyClients([...myClients, id]);
      setNotClients(notClients.filter(c => c !== id));
    }
  };

  const moveToNot = (id: string) => {
    if (!notClients.includes(id)) {
      setNotClients([...notClients, id]);
      setMyClients(myClients.filter(c => c !== id));
    }
  };

  const check = () => {
    let correctCount = 0;
    myClients.forEach(id => { if (correct.includes(id)) correctCount++; });
    notClients.forEach(id => { if (!correct.includes(id)) correctCount++; });
    const total = personas.length;
    const result = Math.round((correctCount / total) * 100);
    setScore(result);
    setChecked(true);
  };

  return (
    <div className="min-h-screen p-4 flex flex-col items-center animate-fadeIn">
      <div className="game-card max-w-2xl w-full">
        <h2 className="text-2xl font-bold mb-3 text-white">🎯 {MINIGAMES.target_audience.title}</h2>
        <p className="text-sm text-gray-300 mb-4">{MINIGAMES.target_audience.description}</p>
        <p className="text-sm mb-4 text-gray-200">Твоя сфера: <strong className="text-orange-400">{SPHERES[sphere]?.name}</strong>. Определи, кто твой идеальный клиент!</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <h4 className="font-bold text-green-400 mb-3 text-lg">✅ Мой клиент</h4>
            <div className={`drop-zone ${checked ? 'correct' : ''}`}>
              {myClients.map(id => {
                const p = personas.find(x => x.id === id);
                const isCorrect = correct.includes(id);
                return (
                  <div key={id} className={`drag-item mb-3 ${checked ? (isCorrect ? 'border-green-400 bg-green-900/50' : 'border-red-400 bg-red-900/50') : ''}`}>
                    <div className="flex justify-between items-center">
                      <span className="text-base font-semibold">{p?.name}</span>
                      <button onClick={() => moveToNot(id)} className="text-sm text-red-400 hover:text-red-300 font-bold">✕</button>
                    </div>
                    <div className="text-sm opacity-80 mt-1">{p?.desc}</div>
                  </div>
                );
              })}
              {myClients.length === 0 && <p className="text-sm opacity-50 text-center py-6">Нажмите ✅ на карточке ниже</p>}
            </div>
          </div>
          <div>
            <h4 className="font-bold text-red-400 mb-3 text-lg">❌ Не мой сегмент</h4>
            <div className={`drop-zone ${checked ? 'correct' : ''}`}>
              {notClients.map(id => {
                const p = personas.find(x => x.id === id);
                const isCorrect = !correct.includes(id);
                return (
                  <div key={id} className={`drag-item mb-3 ${checked ? (isCorrect ? 'border-green-400 bg-green-900/50' : 'border-red-400 bg-red-900/50') : ''}`}>
                    <div className="flex justify-between items-center">
                      <span className="text-base font-semibold">{p?.name}</span>
                      <button onClick={() => moveToMy(id)} className="text-sm text-green-400 hover:text-green-300 font-bold">←</button>
                    </div>
                    <div className="text-sm opacity-80 mt-1">{p?.desc}</div>
                  </div>
                );
              })}
              {notClients.length === 0 && <p className="text-sm opacity-50 text-center py-6">Нажмите ❌ на карточке ниже</p>}
            </div>
          </div>
        </div>

        {/* Available personas */}
        <div className="mb-6">
          <h4 className="font-bold mb-3 text-lg text-orange-400">Доступные сегменты:</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {personas.filter(p => !myClients.includes(p.id) && !notClients.includes(p.id)).map(p => (
              <div key={p.id} className="drag-item">
                <div className="flex items-center justify-between gap-3">
                  <button onClick={() => moveToMy(p.id)} className="text-lg text-green-400 hover:text-green-300 font-bold flex-shrink-0">✅</button>
                  <div className="flex-1">
                    <div className="text-base font-semibold">{p.name}</div>
                    <div className="text-sm opacity-70 mt-1">{p.desc}</div>
                  </div>
                  <button onClick={() => moveToNot(p.id)} className="text-lg text-red-400 hover:text-red-300 font-bold flex-shrink-0">❌</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {checked && (
          <div className="teaching-tip mb-4">
            Результат: {score}%. {score >= 70 ? 'Отлично! Ты хорошо понимаешь свою аудиторию.' : 'Стоит ещё раз подумать, кому нужен твой продукт.'}
          </div>
        )}

        <div className="flex gap-3">
          {!checked ? (
            <button className="btn btn-primary" onClick={check}>Проверить</button>
          ) : (
            <button className="btn btn-success" onClick={() => onComplete(score)}>Продолжить →</button>
          )}
        </div>
      </div>
    </div>
  );
}

function MinigameBusinessPlan({ onComplete }: { onComplete: (score: number) => void }) {
  const [order, setOrder] = useState<string[]>([]);
  const [available, setAvailable] = useState(BUSINESS_PLAN_SECTIONS.map(s => s.id));
  const [checked, setChecked] = useState(false);
  const [score, setScore] = useState(0);

  const correctOrder = BUSINESS_PLAN_SECTIONS.map(s => s.id);

  const addSection = (id: string) => {
    setOrder([...order, id]);
    setAvailable(available.filter(a => a !== id));
  };

  const removeSection = (id: string) => {
    setAvailable([...available, id]);
    setOrder(order.filter(o => o !== id));
  };

  const check = () => {
    let correctCount = 0;
    order.forEach((id, i) => { if (id === correctOrder[i]) correctCount++; });
    const result = Math.round((correctCount / correctOrder.length) * 100);
    setScore(result);
    setChecked(true);
  };

  return (
    <div className="min-h-screen p-4 flex flex-col items-center animate-fadeIn">
      <div className="game-card max-w-2xl w-full">
        <h2 className="text-2xl font-bold mb-3 text-white">📋 {MINIGAMES.business_plan.title}</h2>
        <p className="text-sm text-gray-300 mb-4">{MINIGAMES.business_plan.description}</p>

        <div className="mb-4">
          <h4 className="font-semibold text-green-400 mb-2">Порядок разделов:</h4>
          <div className="space-y-2">
            {order.map((id, i) => {
              const section = BUSINESS_PLAN_SECTIONS.find(s => s.id === id);
              const isCorrect = id === correctOrder[i];
              return (
                <div key={id} className={`p-3 rounded-lg border-2 ${checked ? (isCorrect ? 'border-green-400 bg-green-900/20' : 'border-red-400 bg-red-900/20') : 'border-gray-600 bg-gray-800/50'}`}>
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-xs font-bold text-orange-400 mr-2">{i + 1}.</span>
                      <span className="text-sm">{section?.name}</span>
                    </div>
                    <button onClick={() => removeSection(id)} className="text-xs text-red-400">✕</button>
                  </div>
                  <div className="text-xs opacity-60 ml-5">{section?.desc}</div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mb-4">
          <h4 className="font-semibold mb-2">Доступные разделы:</h4>
          <div className="flex flex-wrap gap-2">
            {available.map(id => {
              const section = BUSINESS_PLAN_SECTIONS.find(s => s.id === id);
              return (
                <button key={id} className="drag-item text-sm" onClick={() => addSection(id)}>
                  {section?.name}
                </button>
              );
            })}
          </div>
        </div>

        {checked && (
          <div className="teaching-tip mb-4">
            Результат: {score}%. Правильный порядок: резюме → анализ рынка → продукт → маркетинг → производство → финансы → риски.
          </div>
        )}

        <div className="flex gap-3">
          {!checked ? (
            <button className="btn btn-primary" onClick={check} disabled={order.length < 7}>Проверить</button>
          ) : (
            <button className="btn btn-success" onClick={() => onComplete(score)}>Продолжить →</button>
          )}
        </div>
      </div>
    </div>
  );
}

function MinigameInvestor({ onComplete }: { onComplete: (score: number) => void }) {
  const [step, setStep] = useState(0);
  const [response, setResponse] = useState('');
  const [totalScore, setTotalScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const handleChoice = (option: typeof INVESTOR_DIALOGUES[0]['options'][0]) => {
    setResponse(option.response);
    const points = option.result === 'good' ? 50 : option.result === 'ok' ? 25 : 0;
    setTotalScore(prev => prev + points);
    
    if (step >= INVESTOR_DIALOGUES.length - 1) {
      setFinished(true);
    }
  };

  if (finished) {
    const finalScore = Math.round((totalScore / (INVESTOR_DIALOGUES.length * 50)) * 100);
    return (
      <div className="min-h-screen p-4 flex flex-col items-center animate-fadeIn">
        <div className="game-card max-w-lg w-full text-center">
          <h2 className="text-2xl font-bold mb-4 text-white">🤝 Переговоры завершены!</h2>
          <p className="text-4xl font-bold mb-2" style={{ color: finalScore >= 70 ? '#2ec4b6' : finalScore >= 40 ? '#ffd60a' : '#e71d36', textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>
            {finalScore}%
          </p>
          <p className="text-sm text-gray-300 mb-4">
            {finalScore >= 70 ? 'Отличные переговоры! Инвестор впечатлён.' :
             finalScore >= 40 ? 'Неплохо, но можно было лучше.' :
             'Инвестор не впечатлён. Нужно учиться аргументировать.'}
          </p>
          <div className="teaching-tip mb-4 text-left">
            На переговорах с инвестором важно: 1) Знать свою оценку на основе цифр. 2) Не завышать и не занижать. 3) Аргументировать юнит-экономикой и ростом.
          </div>
          <button className="btn btn-success" onClick={() => onComplete(finalScore)}>Продолжить →</button>
        </div>
      </div>
    );
  }

  const dialogue = INVESTOR_DIALOGUES[step];

  return (
    <div className="min-h-screen p-4 flex flex-col items-center animate-fadeIn">
      <div className="game-card max-w-lg w-full">
        <h2 className="text-2xl font-bold mb-4 text-white">💼 {MINIGAMES.investor.title}</h2>
        <div className="mb-4 p-4 rounded-lg bg-gray-800 border border-gray-700">
          <p className="text-sm text-gray-400">Инвестор:</p>
          <p className="font-medium">«{dialogue.investor}»</p>
        </div>

        {response && (
          <div className="mb-4 p-3 rounded-lg bg-blue-900/30 border border-blue-700 animate-popIn">
            <p className="text-sm">{response}</p>
          </div>
        )}

        {response && step < INVESTOR_DIALOGUES.length - 1 ? (
          <button className="btn btn-primary" onClick={() => { setStep(step + 1); setResponse(''); }}>
            Далее →
          </button>
        ) : !response ? (
          <div className="space-y-2">
            {dialogue.options.map((opt, i) => (
              <button key={i} className="btn-choice" onClick={() => handleChoice(opt)}>
                {opt.text}
              </button>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}

function MinigameInterview({ onComplete }: { onComplete: (score: number) => void }) {
  const [candidateIdx, setCandidateIdx] = useState(0);
  const [questionIdx, setQuestionIdx] = useState(0);
  const [goodAnswers, setGoodAnswers] = useState(0);
  const [decision, setDecision] = useState<string | null>(null);
  const [finished, setFinished] = useState(false);
  const [totalScore, setTotalScore] = useState(0);
  const [showDecisionScreen, setShowDecisionScreen] = useState(false);

  const candidate = INTERVIEW_CANDIDATES[candidateIdx];

  const handleAnswer = (isGood: boolean) => {
    const newGoodAnswers = isGood ? goodAnswers + 1 : goodAnswers;
    if (isGood) setGoodAnswers(newGoodAnswers);
    
    if (questionIdx < candidate.questions.length - 1) {
      setQuestionIdx(prev => prev + 1);
    } else {
      // Last question answered - show decision screen
      setShowDecisionScreen(true);
    }
  };

  const handleDecision = (dec: string) => {
    setDecision(dec);
    const points = dec === 'hire' && goodAnswers >= 2 ? 40 :
                   dec === 'trial' ? 25 :
                   dec === 'reject' && goodAnswers <= 1 ? 40 : 10;
    const newTotal = totalScore + points;
    setTotalScore(newTotal);

    if (candidateIdx < INTERVIEW_CANDIDATES.length - 1) {
      setTimeout(() => {
        setCandidateIdx(prev => prev + 1);
        setQuestionIdx(0);
        setGoodAnswers(0);
        setDecision(null);
        setShowDecisionScreen(false);
      }, 2000);
    } else {
      setFinished(true);
    }
  };

  if (finished) {
    const finalScore = Math.round((totalScore / (INTERVIEW_CANDIDATES.length * 40)) * 100);
    return (
      <div className="min-h-screen p-4 flex flex-col items-center animate-fadeIn">
        <div className="game-card max-w-lg w-full text-center">
          <h2 className="text-2xl font-bold mb-4 text-white">Собеседования завершены!</h2>
          <p className="text-4xl font-bold mb-2" style={{ color: finalScore >= 70 ? '#2ec4b6' : finalScore >= 40 ? '#ffd60a' : '#e71d36', textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>{finalScore}%</p>
          <div className="teaching-tip mb-4 text-left">
            На собеседовании важно: задавать вопросы о конкретных результатах, проверять мотивацию, оценивать культурное соответствие. Не нанимай «знакомого друга» без проверки навыков!
          </div>
          <button className="btn btn-success" onClick={() => onComplete(finalScore)}>Продолжить →</button>
        </div>
      </div>
    );
  }

  if (decision) {
    return (
      <div className="min-h-screen p-4 flex flex-col items-center animate-fadeIn">
        <div className="game-card max-w-lg w-full text-center">
          <h3 className="font-bold mb-2">Решение по кандидату {candidate.name}</h3>
          <p className="text-sm text-gray-400 mb-4">{candidate.hire}</p>
          <p className="text-sm">Ваше решение: <strong>{decision === 'hire' ? 'Нанять' : decision === 'trial' ? 'Испытательный срок' : 'Отказать'}</strong></p>
        </div>
      </div>
    );
  }

  const question = candidate.questions[questionIdx];

  return (
    <div className="min-h-screen p-4 flex flex-col items-center animate-fadeIn">
      <div className="game-card max-w-lg w-full">
        <h2 className="text-2xl font-bold mb-3 text-white">🎤 {MINIGAMES.interview.title}</h2>
        <div className="mb-4 p-3 rounded-lg bg-gray-800">
          <p className="font-bold text-white">{candidate.name}</p>
          <p className="text-sm text-gray-300">{candidate.resume}</p>
          {candidate.redFlags.map((flag, i) => (
            <p key={i} className="text-xs text-red-400 mt-1">⚠️ {flag}</p>
          ))}
        </div>

        {!showDecisionScreen ? (
          <div>
            <p className="font-semibold mb-2 text-white">Вопрос {questionIdx + 1}/{candidate.questions.length}: {question.q}</p>
            <div className="space-y-2">
              <button className="btn-choice" onClick={() => handleAnswer(true)}>
                ✅ Хороший ответ: {question.good}
              </button>
              <button className="btn-choice" onClick={() => handleAnswer(false)}>
                ❌ Плохой ответ: {question.bad}
              </button>
            </div>
          </div>
        ) : (
          <div>
            <p className="font-semibold mb-3 text-white">Принять решение:</p>
            <button className="btn-choice" onClick={() => handleDecision('hire')}>💼 Нанять</button>
            <button className="btn-choice" onClick={() => handleDecision('trial')}>📋 Взять на испытательный срок</button>
            <button className="btn-choice" onClick={() => handleDecision('reject')}>🚫 Отказать</button>
          </div>
        )}
      </div>
    </div>
  );
}

function MinigameFinance({ onComplete }: { onComplete: (score: number) => void }) {
  const [problemIdx, setProblemIdx] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [finished, setFinished] = useState(false);

  const problem = FINANCE_PROBLEMS[problemIdx];

  const check = () => {
    setShowResult(true);
    if (selected === problem.correct) {
      setCorrectCount(prev => prev + 1);
    }
  };

  const next = () => {
    if (problemIdx < FINANCE_PROBLEMS.length - 1) {
      setProblemIdx(prev => prev + 1);
      setSelected(null);
      setShowResult(false);
    } else {
      setFinished(true);
    }
  };

  if (finished) {
    const score = Math.round((correctCount / FINANCE_PROBLEMS.length) * 100);
    return (
      <div className="min-h-screen p-4 flex flex-col items-center animate-fadeIn">
        <div className="game-card max-w-lg w-full text-center">
          <h2 className="text-2xl font-bold mb-4 text-white">💰 Финансовый калькулятор</h2>
          <p className="text-4xl font-bold mb-2" style={{ color: score >= 70 ? '#2ec4b6' : score >= 40 ? '#ffd60a' : '#e71d36', textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>{score}%</p>
          <p className="text-sm text-gray-300 mb-4">Правильных ответов: {correctCount} из {FINANCE_PROBLEMS.length}</p>
          <div className="teaching-tip mb-4 text-left">
            Ключевые формулы: Прибыль = Выручка − Издержки. Точка безубыточности = Постоянные затраты / Маржа на единицу. Кассовый разрыв = когда нужно заплатить сейчас, а деньги придут позже.
          </div>
          <button className="btn btn-success" onClick={() => onComplete(score)}>Продолжить →</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 flex flex-col items-center animate-fadeIn">
      <div className="game-card max-w-lg w-full">
        <h2 className="text-2xl font-bold mb-3 text-white">💰 {MINIGAMES.finance.title}</h2>
        <p className="text-sm text-gray-300 mb-3">Задача {problemIdx + 1} из {FINANCE_PROBLEMS.length}</p>
        
        <div className="p-4 rounded-lg bg-gray-800 mb-4">
          <p className="text-sm">{problem.question}</p>
        </div>

        <div className="space-y-2 mb-4">
          {problem.options.map((opt, i) => (
            <button
              key={i}
              className={`btn-choice ${showResult ? (i === problem.correct ? 'border-green-400 bg-green-900/30' : (i === selected ? 'border-red-400 bg-red-900/30' : '')) : ''}`}
              onClick={() => !showResult && setSelected(i)}
              disabled={showResult}
            >
              {opt}
            </button>
          ))}
        </div>

        {showResult && (
          <div className="teaching-tip mb-4">
            <p><strong>Формула:</strong> {problem.formula}</p>
            <p><strong>Решение:</strong> {problem.calculation}</p>
          </div>
        )}

        {!showResult ? (
          <button className="btn btn-primary" disabled={selected === null} onClick={check}>Проверить</button>
        ) : (
          <button className="btn btn-success" onClick={next}>{problemIdx < FINANCE_PROBLEMS.length - 1 ? 'Следующая задача →' : 'Результат →'}</button>
        )}
      </div>
    </div>
  );
}

function MinigameMarketingMix({ sphere, onComplete }: { sphere: string; onComplete: (score: number) => void }) {
  const [budget, setBudget] = useState({ ads: 75000, discounts: 75000, packaging: 75000, service: 75000 });
  const [calculated, setCalculated] = useState(false);
  const totalBudget = 300000;

  const updateBudget = (channel: string, value: number) => {
    const newBudget = { ...budget, [channel]: value };
    const sum = Object.values(newBudget).reduce((a, b) => a + b, 0);
    if (sum <= totalBudget) {
      setBudget(newBudget);
    }
  };

  const remaining = totalBudget - Object.values(budget).reduce((a, b) => a + b, 0);

  const calculate = () => {
    setCalculated(true);
  };

  const getResult = () => {
    // Sphere-specific coefficients
    const sphereCoeffs: Record<string, Record<string, number>> = {
      food: { ads: 0.7, discounts: 0.9, packaging: 0.6, service: 0.8 },
      it: { ads: 0.9, discounts: 0.4, packaging: 0.7, service: 0.9 },
      production: { ads: 0.6, discounts: 0.5, packaging: 0.9, service: 0.7 },
      services: { ads: 0.8, discounts: 0.6, packaging: 0.5, service: 0.9 },
      ecommerce: { ads: 0.9, discounts: 0.8, packaging: 0.7, service: 0.6 },
    };
    const coeffs = sphereCoeffs[sphere] || sphereCoeffs.food;
    
    let score = 0;
    MARKETING_CHANNELS.forEach(ch => {
      const allocated = budget[ch.id as keyof typeof budget] || 0;
      const ratio = allocated / totalBudget;
      score += ratio * coeffs[ch.id] * 100;
    });
    
    // Bonus for balance
    const values = Object.values(budget);
    const max = Math.max(...values);
    const min = Math.min(...values);
    if (max - min < 50000) score += 10; // balance bonus
    
    return Math.min(100, Math.round(score * 2.5));
  };

  const score = calculated ? getResult() : 0;

  return (
    <div className="min-h-screen p-4 flex flex-col items-center animate-fadeIn">
      <div className="game-card max-w-lg w-full">
        <h2 className="text-2xl font-bold mb-3 text-white">📣 {MINIGAMES.marketing_mix.title}</h2>
        <p className="text-sm text-gray-300 mb-4">{MINIGAMES.marketing_mix.description}</p>
        <p className="text-sm mb-2 text-gray-200">Бюджет: <strong className="text-yellow-400">{formatMoney(totalBudget)}</strong></p>
        <p className={`text-sm mb-4 font-semibold ${remaining < 0 ? 'text-red-400' : 'text-green-400'}`}>
          Осталось: {formatMoney(remaining)}
        </p>

        {MARKETING_CHANNELS.map(ch => (
          <div key={ch.id} className="slider-container mb-4">
            <div className="flex justify-between text-sm mb-1">
              <span>{ch.name}</span>
              <span className="text-orange-400 font-bold">{formatMoney(budget[ch.id as keyof typeof budget])}</span>
            </div>
            <input
              type="range"
              min="0"
              max={totalBudget}
              step="5000"
              value={budget[ch.id as keyof typeof budget]}
              onChange={e => updateBudget(ch.id, parseInt(e.target.value))}
              disabled={calculated}
            />
            <p className="text-xs text-gray-500">{ch.desc}</p>
          </div>
        ))}

        {calculated && (
          <div className="teaching-tip mb-4">
            <p><strong>Результат:</strong> <span className="text-2xl font-bold">{score}%</span> эффективности маркетинга</p>
            <p className="text-sm mt-2 text-gray-200">
              {score >= 70 ? '✅ Отличный баланс! Ты учёл и привлечение, и удержание.' :
               score >= 40 ? '⚠️ Неплохо, но есть куда расти. Попробуй другой баланс.' :
               '❌ Стоит пересмотреть стратегию. Не вкладывай всё в один канал.'}
            </p>
            <p className="text-xs mt-3 text-gray-300">
              💡 Подсказка: для <strong className="text-orange-400">{SPHERES[sphere]?.name}</strong> лучше всего работают {
                sphere === 'food' ? 'скидки и сервис' :
                sphere === 'it' ? 'реклама и сервис' :
                sphere === 'production' ? 'упаковка и реклама' :
                sphere === 'services' ? 'сервис и реклама' : 'реклама и скидки'
              }.
            </p>
          </div>
        )}

        {!calculated ? (
          <button className="btn btn-primary" onClick={calculate}>Рассчитать результат</button>
        ) : (
          <button className="btn btn-success" onClick={() => onComplete(score)}>Продолжить →</button>
        )}
      </div>
    </div>
  );
}
