import { useId, useState } from 'react';

type Template = 'flarely' | 'streak' | 'crest' | 'medal';
type Tier = 'common' | 'rare' | 'epic';
type Tone = 'flare' | 'amber' | 'gold' | 'purple' | 'green' | 'red' | 'pink';
type BadgeState = 'earned' | 'won' | 'locked';
type Glyph =
  | 'star' | 'bolt' | 'flash' | 'fire' | 'pin' | 'chat' | 'groups' | 'add'
  | 'edit' | 'person_add' | 'people' | 'heart' | 'trophy' | 'crown'
  | 'celebration' | 'rocket' | 'goal' | 'whistle' | 'card' | 'timer'
  | 'music' | 'mic' | 'calendar' | 'target';

const colours: Record<Tone, { base: string; light: string; dark: string }> = {
  flare: { base: '#FF6D1F', light: '#FFD166', dark: '#C2410C' },
  amber: { base: '#FFAB3D', light: '#FFE3A8', dark: '#C77A12' },
  gold: { base: '#FFD166', light: '#FFF1C2', dark: '#B8860B' },
  purple: { base: '#A855F7', light: '#E2C6FF', dark: '#6B2FB3' },
  green: { base: '#22C55E', light: '#BBF7D0', dark: '#15803D' },
  red: { base: '#EF4444', light: '#FECACA', dark: '#B91C1C' },
  pink: { base: '#EC4899', light: '#FBCFE8', dark: '#BE185D' },
};

const glyphs: Glyph[] = [
  'star', 'bolt', 'flash', 'fire', 'pin', 'chat', 'groups', 'add', 'edit',
  'person_add', 'people', 'heart', 'trophy', 'crown', 'celebration', 'rocket',
  'goal', 'whistle', 'card', 'timer', 'music', 'mic', 'calendar', 'target',
];

function IconGlyph({ name, size = 32 }: { name: Glyph; size?: number }) {
  const common = { fill: 'currentColor', stroke: 'currentColor', strokeWidth: 2.3, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
  const icons: Record<Glyph, React.ReactNode> = {
    star: <path d="m12 2.8 2.7 5.5 6.1.9-4.4 4.3 1 6-5.4-2.8-5.4 2.8 1-6-4.4-4.3 6.1-.9z" />,
    bolt: <path d="M13.7 1.8 5 13h5.4l-1 9.2L19 10.4h-5.8z" />,
    flash: <><path d="m15.3 2-9 11.1h5.2l-1.8 8.8 8.6-11.3h-5z" /><path d="M4 5 2 7m19 9-2 2" fill="none" /></>,
    fire: <path d="M13 2c.6 4.1-2.2 4.7-2 7.7-1.3-1-1.9-2.2-1.5-4.1-3 2.4-5 5.4-4.2 9.5C6 19.4 9.2 22 12 22s6.2-2.3 6.7-6.8c.4-3.6-1.4-6.3-3.5-8.7.1 2.6-1 4-2.1 4.8.9-3.3 1.8-5.8-.1-9.3Z" />,
    pin: <path d="M12 22s7-7.1 7-13a7 7 0 1 0-14 0c0 5.9 7 13 7 13Zm0-10a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z" fillRule="evenodd" />,
    chat: <path d="M3 4h18v13H9l-5.8 4 .9-4H3zM7 9h10v2H7z" fillRule="evenodd" />,
    groups: <><circle cx="8" cy="8" r="3" /><circle cx="16.5" cy="8.5" r="2.5" /><path d="M2 20c.2-5 2.2-7 6-7s5.8 2 6 7Zm11-6c4.9-.6 7.4 1.4 8 5h-5.7c-.3-2.2-1.1-3.8-2.3-5Z" /></>,
    add: <path d="M10 2h4v8h8v4h-8v8h-4v-8H2v-4h8z" />,
    edit: <path d="m4 16 12-12 4 4L8 20l-5 1zM14.6 5.4l4 4" />,
    person_add: <><circle cx="9" cy="7" r="4" /><path d="M2 21c0-5 2.3-7.5 7-7.5s7 2.5 7 7.5Zm16-9V8h2v4h3v2h-3v3h-2v-3h-3v-2z" /></>,
    people: <><circle cx="8" cy="8" r="3.5" /><circle cx="17" cy="9" r="3" /><path d="M1.5 21c0-5.3 2.2-8 6.5-8s6.5 2.7 6.5 8Zm12-6.7C19 13.5 22 15.8 22.5 21H16c-.1-2.9-.9-5.1-2.5-6.7Z" /></>,
    heart: <path d="M12 21S2.5 15.2 2.5 8.5A5.5 5.5 0 0 1 12 4.7a5.5 5.5 0 0 1 9.5 3.8C21.5 15.2 12 21 12 21Z" />,
    trophy: <path d="M7 3h10v3h4c0 5-1.7 7.3-5.2 7.5-.7 1.2-1.6 2-2.8 2.3V19h4v3H7v-3h4v-3.2c-1.2-.3-2.1-1.1-2.8-2.3C4.7 13.3 3 11 3 6h4zm0 5H5.3c.2 1.8.9 2.8 2.2 3.1A11 11 0 0 1 7 8Zm10 0c0 1.2-.2 2.2-.5 3.1 1.3-.3 2-1.3 2.2-3.1Z" fillRule="evenodd" />,
    crown: <path d="m3 6 5 4 4-7 4 7 5-4-2 13H5zm2.4 15h13.2v2H5.4z" />,
    celebration: <><path d="m4 21 3-12 8 8z" /><path d="m13 3 1 4m6-2-4 3m4 5-4-1M7 3l2 3" fill="none" /></>,
    rocket: <path d="M14 4c3-2 6-2 7-1 1 1 1 4-1 7l-5 5-6-6zM8 11l-4 1-2 4 7-1zm5 5-1 6 4-2 1-4zM5 18c-2 0-3 1-3 4 3 0 4-1 4-3z" />,
    goal: <path d="M2 5h20v15h-3V8H5v12H2zm5 5h10v10h-2v-7H9v7H7z" fillRule="evenodd" />,
    whistle: <path d="M3 10h11a6 6 0 1 1-6 6H3zm12.5-5L22 2l-1 6zM8 14a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z" fillRule="evenodd" />,
    card: <path d="M6 2h12a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Zm2 5h8v2H8z" fillRule="evenodd" />,
    timer: <path d="M9 2h6v3H9zm3 4a8 8 0 1 1-8 8 8 8 0 0 1 8-8Zm0 3v5l4 2 .9-1.8-2.9-1.4V9z" fillRule="evenodd" />,
    music: <path d="M9 4v12.5A4 4 0 1 1 6 15V7l14-3v10.5a4 4 0 1 1-3-1.5V1z" />,
    mic: <path d="M8 4a4 4 0 0 1 8 0v7a4 4 0 0 1-8 0zm-3 7h2c0 3.4 1.7 5 5 5s5-1.6 5-5h2c0 4-2 6.3-6 6.9V21h4v2H7v-2h4v-3.1C7 17.3 5 15 5 11Z" />,
    calendar: <path d="M4 4h3V2h2v2h6V2h2v2h3v18H4zm2 6v9h12v-9zm2 2h3v3H8z" fillRule="evenodd" />,
    target: <path d="M12 2a10 10 0 1 0 10 10h-4a6 6 0 1 1-6-6zm0 7a3 3 0 1 0 3 3h-3zm3-5h4V1h2v5l-7 7-2-2z" />,
  };
  return <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true" {...common}>{icons[name]}</svg>;
}

function Badge({ template, tier, tone, state = 'earned', icon, size = 120, animate = false, className = '' }: {
  template: Template; tier: Tier; tone: Tone; state?: BadgeState; icon: Glyph; size?: number; animate?: boolean; className?: string;
}) {
  const uid = useId().replace(/:/g, '');
  const c = state === 'locked' ? { base: '#636363', light: '#A3A3A3', dark: '#2F2F2F' } : colours[tone];
  const isRare = tier === 'rare';
  const isEpic = tier === 'epic';
  const iconScale = template === 'streak' ? .84 : template === 'flarely' ? .76 : .8;
  const shape = {
    flarely: 'M61 5c-2 13-12 18-14 31-5-4-7-11-6-19-14 14-20 31-16 50 4 22 18 38 37 40 20 2 37-12 41-33 4-20-7-37-23-52 1 12-3 20-10 25 3-18 1-30-5-42ZM27 52c-4-5-9-7-13-3-4 4-2 9 2 11l8 6 6-7Zm68 0c4-5 9-7 13-3 4 4 2 9-2 11l-8 6-6-7ZM29 76 5 99l30-13Zm7 12L13 111l34-17Z',
    streak: 'M74 5 62 25 43 16 46 38 14 34 35 55 8 73 42 72 36 108 59 83 72 111 76 80 104 91 87 65 112 49 80 47Z',
    crest: 'M60 7 101 20v32c0 26-15 45-41 59C34 97 19 78 19 52V20Z',
    medal: 'M42 4h15l4 28H42L30 5h14m20-1h15l12 1-15 27H57l5-28M60 25a42 42 0 1 1 0 84 42 42 0 0 1 0-84Z',
  }[template];

  return (
    <svg className={`badge ${animate ? 'badge--animate' : ''} ${className}`} viewBox="0 0 120 120" width={size} height={size} role="img" aria-label={`${tone} ${tier} ${template} badge, ${state}`}>
      <defs>
        <linearGradient id={`${uid}base`} x1="20" y1="10" x2="98" y2="110" gradientUnits="userSpaceOnUse">
          <stop stopColor={c.light}/><stop offset=".47" stopColor={c.base}/><stop offset="1" stopColor={c.dark}/>
        </linearGradient>
        <linearGradient id={`${uid}rim`} x1="20" y1="10" x2="95" y2="108" gradientUnits="userSpaceOnUse">
          <stop stopColor={isEpic ? '#FFF6CE' : c.light}/><stop offset=".32" stopColor={c.base}/><stop offset=".7" stopColor={c.dark}/><stop offset="1" stopColor={isEpic ? '#FFD166' : c.light}/>
        </linearGradient>
        <radialGradient id={`${uid}inner`} cx=".42" cy=".32" r=".78">
          <stop stopColor={c.light}/><stop offset=".28" stopColor={c.base}/><stop offset="1" stopColor={c.dark}/>
        </radialGradient>
        <clipPath id={`${uid}clip`}><path d={shape}/></clipPath>
      </defs>

      {isEpic && <g className="epic-rays" fill={c.base}>
        {Array.from({ length: 12 }, (_, i) => <path key={i} d="M58 1h4l-1 17h-2z" transform={`rotate(${i * 30} 60 60)`}/>)}
      </g>}

      <path d={shape} fill={`url(#${uid}base)`} stroke={isEpic || isRare ? `url(#${uid}rim)` : c.dark} strokeWidth={isEpic ? 6 : isRare ? 4 : 3} strokeLinejoin="round"/>
      <path d={shape} fill="none" stroke={c.light} strokeOpacity={state === 'locked' ? .15 : .65} strokeWidth="1.4" transform="translate(60 60) scale(.88) translate(-60 -60)"/>

      {(isRare || isEpic) && <path d={shape} fill={`url(#${uid}inner)`} opacity=".28" transform="translate(60 60) scale(.72) translate(-60 -60)"/>}

      {isEpic && <g className="bead-ring" fill={c.light} stroke={c.dark} strokeWidth="1">
        {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => <circle key={a} cx="60" cy="9" r="2.7" transform={`rotate(${a} 60 60)`}/>)}
      </g>}

      <g transform={`translate(${60 - 12 * iconScale} ${58 - 12 * iconScale}) scale(${iconScale})`} color={state === 'locked' ? '#252525' : tier === 'common' ? '#FFF7E8' : '#FFFFFF'}>
        <IconGlyph name={icon} size={24}/>
      </g>

      {(isRare || isEpic) && state !== 'locked' && <g fill={c.light}>
        <path d="m20 23 1.5 3.5L25 28l-3.5 1.5L20 33l-1.5-3.5L15 28l3.5-1.5z"/>
        <path d="m100 76 1.2 2.8 2.8 1.2-2.8 1.2L100 84l-1.2-2.8L96 80l2.8-1.2z"/>
        {isEpic && <path d="m94 22 2 4.5 4.5 2-4.5 2-2 4.5-2-4.5-4.5-2 4.5-2z"/>}
      </g>}

      {state === 'won' && <g className="won-mark" fill="none" stroke="#FFF1C2" strokeWidth="4" strokeLinecap="round">
        <path d="M26 82C14 69 15 52 23 40m71 42c12-13 11-30 3-42"/>
        <path d="m25 74-8-1m10 3-3 8m69-10 8-1m-10 3 3 8M28 62l-8-3m72 3 8-3M33 89c18 10 36 10 54 0"/>
        <path d="m60 101 2.6 5.2 5.7.8-4.1 4 1 5.7-5.2-2.8-5.2 2.8 1-5.7-4.1-4 5.7-.8z" fill="#FFF1C2" strokeWidth="1"/>
      </g>}

      {state === 'locked' && <g opacity=".9" fill="#1D1D1D"><path d="M51 57v-6a9 9 0 0 1 18 0v6h4v20H47V57zm5 0h8v-6a4 4 0 0 0-8 0z" fillRule="evenodd"/></g>}

      {isEpic && <g className="shine" clipPath={`url(#${uid}clip)`}><path d="m-30 100 22 12L62-12 40-24z" fill="#fff" opacity=".52"/></g>}
    </svg>
  );
}

const examples: { name: string; note: string; template: Template; tier: Tier; tone: Tone; state?: BadgeState; icon: Glyph }[] = [
  { name: 'Welcome to Starstreak', note: 'Joined the movement', template: 'flarely', tier: 'rare', tone: 'gold', icon: 'star' },
  { name: 'First post', note: 'Shared a first moment', template: 'medal', tier: 'common', tone: 'flare', icon: 'chat' },
  { name: '100 followers', note: 'Built your first crowd', template: 'crest', tier: 'rare', tone: 'purple', icon: 'people' },
  { name: '1,000 followers', note: 'A community landmark', template: 'crest', tier: 'epic', tone: 'gold', icon: 'crown' },
  { name: 'Caught the moment', note: 'Posted while it happened', template: 'streak', tier: 'rare', tone: 'gold', icon: 'bolt' },
  { name: 'Top of the moment', note: 'Won the live conversation', template: 'streak', tier: 'epic', tone: 'gold', state: 'won', icon: 'trophy' },
  { name: 'Called it', note: 'Prediction came true', template: 'medal', tier: 'rare', tone: 'green', state: 'won', icon: 'target' },
  { name: 'Start to finish', note: 'Stayed for every minute', template: 'medal', tier: 'rare', tone: 'amber', state: 'won', icon: 'timer' },
  { name: 'On a roll', note: 'Three moments running', template: 'streak', tier: 'common', tone: 'flare', icon: 'rocket' },
  { name: 'Week on fire', note: 'Seven days of activity', template: 'streak', tier: 'rare', tone: 'red', icon: 'fire' },
  { name: 'Crowd favourite', note: 'Felt the love', template: 'medal', tier: 'common', tone: 'pink', icon: 'heart' },
  { name: 'Hundred days', note: 'A century of showing up', template: 'crest', tier: 'epic', tone: 'gold', icon: 'calendar' },
];

const toneNames = Object.keys(colours) as Tone[];

function SectionHeading({ eyebrow, title, copy, id }: { eyebrow: string; title: string; copy: string; id: string }) {
  return <div className="section-heading" id={id}><span>{eyebrow}</span><h2>{title}</h2><p>{copy}</p></div>;
}

function App() {
  const [template, setTemplate] = useState<Template>('flarely');
  const [tier, setTier] = useState<Tier>('epic');
  const [tone, setTone] = useState<Tone>('flare');
  const [state, setState] = useState<BadgeState>('won');
  const [icon, setIcon] = useState<Glyph>('trophy');

  return (
    <main>
      <nav className="topbar">
        <div className="brand"><span className="brand-flame">S</span><strong>STARSTREAK</strong><i>Badge system 1.0</i></div>
        <div className="navlinks"><a href="#builder">Builder</a><a href="#examples">Examples</a><a href="#icons">Glyphs</a><a href="#context">In context</a></div>
      </nav>

      <header className="hero">
        <div className="hero-copy">
          <div className="kicker"><span></span>Made for live moments</div>
          <h1>Wear the <em>moment.</em></h1>
          <p>A modular badge language for the fans who show up, speak up, and make every moment feel bigger.</p>
          <div className="hero-tags"><span>4 shapes</span><span>7 colourways</span><span>3 tiers</span><span>24 glyphs</span></div>
        </div>
        <div className="hero-art">
          <div className="orbit orbit-one"></div><div className="orbit orbit-two"></div>
          <Badge template="streak" tier="rare" tone="red" icon="fire" size={92} className="hero-badge one"/>
          <Badge template="flarely" tier="epic" tone="gold" state="won" icon="star" size={190} animate className="hero-badge two"/>
          <Badge template="medal" tier="common" tone="pink" icon="heart" size={78} className="hero-badge three"/>
        </div>
      </header>

      <section className="section builder-section">
        <SectionHeading id="builder" eyebrow="01 / Component anatomy" title="One system. Every story." copy="Ops combine four independent properties. The art stays centred on a square frame, with a consistent icon zone and SVG-safe effects."/>
        <div className="builder">
          <div className="builder-controls">
            <fieldset><legend>Shape template</legend><div className="segmented">{(['flarely','streak','crest','medal'] as Template[]).map(v => <button className={template === v ? 'active' : ''} onClick={() => setTemplate(v)} key={v}>{v}</button>)}</div></fieldset>
            <fieldset><legend>Tier</legend><div className="segmented three">{(['common','rare','epic'] as Tier[]).map(v => <button className={tier === v ? 'active' : ''} onClick={() => setTier(v)} key={v}>{v}</button>)}</div></fieldset>
            <fieldset><legend>State</legend><div className="segmented three">{(['earned','won','locked'] as BadgeState[]).map(v => <button className={state === v ? 'active' : ''} onClick={() => setState(v)} key={v}>{v}</button>)}</div></fieldset>
            <fieldset><legend>Colourway</legend><div className="swatches">{toneNames.map(v => <button aria-label={v} title={v} className={tone === v ? 'active' : ''} style={{ '--swatch': colours[v].base } as React.CSSProperties} onClick={() => setTone(v)} key={v}/>)}</div></fieldset>
            <fieldset><legend>Centre glyph</legend><div className="glyph-select">{glyphs.slice(0,12).map(v => <button title={v} className={icon === v ? 'active' : ''} onClick={() => setIcon(v)} key={v}><IconGlyph name={v} size={20}/></button>)}</div></fieldset>
          </div>
          <div className="builder-preview">
            <div className="preview-grid"></div>
            <div className="preview-badge"><Badge template={template} tier={tier} tone={tone} state={state} icon={icon} size={240} animate/></div>
            <div className="spec-line"><span>{template}</span><b>•</b><span>{tier}</span><b>•</b><span>{tone}</span><b>•</b><span>{state}</span></div>
          </div>
        </div>
        <div className="anatomy-strip">
          <div><span>01</span><strong>Silhouette</strong><p>Instant category recognition</p></div>
          <div><span>02</span><strong>Centre glyph</strong><p>One rounded, filled family</p></div>
          <div><span>03</span><strong>Rim language</strong><p>Tier is readable at a glance</p></div>
          <div><span>04</span><strong>Victory mark</strong><p>Laurel reserved for won badges</p></div>
        </div>
      </section>

      <section className="section examples-section">
        <SectionHeading id="examples" eyebrow="02 / Example collection" title="Made for every kind of fan." copy="Twelve badges showing how the visual grammar scales from a first post to a once-in-a-season win."/>
        <div className="example-grid">
          {examples.map((item) => <article className="badge-card" key={item.name}>
            <div className="badge-stage"><Badge {...item} size={110} animate={item.tier === 'epic'}/></div>
            <div><span className={`tier-pill ${item.tier}`}>{item.state === 'won' ? 'won • ' : ''}{item.tier}</span><h3>{item.name}</h3><p>{item.note}</p></div>
          </article>)}
        </div>
      </section>

      <section className="section system-section">
        <SectionHeading id="system" eyebrow="03 / States & scale" title="Clear in every condition." copy="Every variant holds its character at feed size, shelf size, and in a detail view—on both light and dark."/>
        <div className="scale-board">
          <div className="scale-dark">
            <span className="board-label">Dark surface</span>
            <div className="size-demo">
              <div><Badge template="crest" tier="epic" tone="purple" icon="crown" size={120} animate/><span>120 detail</span></div>
              <div><Badge template="crest" tier="epic" tone="purple" icon="crown" size={56}/><span>56 shelf</span></div>
              <div><Badge template="crest" tier="epic" tone="purple" icon="crown" size={18}/><span>18 feed</span></div>
            </div>
          </div>
          <div className="scale-light">
            <span className="board-label">Light surface</span>
            <div className="state-demo">
              <div><Badge template="medal" tier="rare" tone="green" state="earned" icon="target" size={90}/><span>Earned</span></div>
              <div><Badge template="medal" tier="rare" tone="green" state="won" icon="target" size={90}/><span>Won</span></div>
              <div><Badge template="medal" tier="rare" tone="green" state="locked" icon="target" size={90}/><span>Locked</span></div>
            </div>
          </div>
        </div>
        <div className="tier-row">
          {(['common','rare','epic'] as Tier[]).map((v, i) => <div className="tier-card" key={v}><Badge template="flarely" tier={v} tone="flare" icon="fire" size={110} animate={v === 'epic'}/><span>0{i+1}</span><h3>{v}</h3><p>{v === 'common' ? 'Clean colour, simple rim' : v === 'rare' ? 'Metal rim, inner light, sparks' : 'Ornate beads, rays, shine sweep'}</p></div>)}
        </div>
      </section>

      <section className="section icons-section">
        <SectionHeading id="icons" eyebrow="04 / Glyph family" title="Twenty-four ways in." copy="Filled, rounded, and deliberately bold. Each glyph is drawn on a 24-unit grid to survive at the smallest badge size."/>
        <div className="icon-grid">
          {glyphs.map((name) => <div className="icon-cell" key={name}><div><IconGlyph name={name} size={28}/></div><span>{name.replace('_',' ')}</span></div>)}
        </div>
      </section>

      <section className="section context-section">
        <SectionHeading id="context" eyebrow="05 / Product context" title="Pride, right where it matters." copy="Badges are designed to be recognised in motion: in a post, pinned to a profile, or arriving as a live reward."/>
        <div className="context-grid">
          <div className="post-card">
            <div className="post-head"><div className="avatar">AM</div><div><strong>Amani M.</strong><span>@amani • now</span></div><Badge template="streak" tier="epic" tone="gold" state="won" icon="trophy" size={22}/><i>•••</i></div>
            <p>That last-minute winner! Kasarani is absolutely alive tonight.</p>
            <div className="post-media"><div className="floodlight"></div><div className="crowd"></div><span>LIVE • KASARANI</span></div>
            <div className="post-actions"><span>♡ 2.4K</span><span>◌ 186</span><span>↗ Share</span></div>
          </div>
          <div className="profile-card">
            <div className="profile-top"><div className="avatar large">AM</div><div><h3>Amani M.</h3><span>Nairobi • Football • Live music</span></div></div>
            <div className="showcase-title"><span>PINNED SHOWCASE</span><i>3 / 3</i></div>
            <div className="showcase">
              <div><Badge template="streak" tier="epic" tone="gold" state="won" icon="trophy" size={84} animate/><span>Top moment</span></div>
              <div><Badge template="crest" tier="epic" tone="purple" icon="crown" size={84}/><span>1K crowd</span></div>
              <div><Badge template="medal" tier="rare" tone="green" state="won" icon="target" size={84}/><span>Called it</span></div>
            </div>
          </div>
          <div className="phone-wrap">
            <div className="phone">
              <div className="phone-top"><span>9:41</span><i></i></div>
              <div className="earned-pop">
                <div className="pop-glow"></div><span className="mini-label">BADGE EARNED</span>
                <Badge template="flarely" tier="rare" tone="gold" icon="star" size={108}/>
                <h3>Welcome to Starstreak</h3><p>Your first badge. This is where the story starts.</p>
                <button>See badge</button>
              </div>
              <div className="phone-feed"><span></span><span></span><span></span></div>
            </div>
          </div>
        </div>
      </section>

      <footer><div className="brand"><span className="brand-flame">S</span><strong>STARSTREAK</strong></div><p>Built for the moments that move us.</p><span>Badge system • v1.0</span></footer>
    </main>
  );
}

export default App;
