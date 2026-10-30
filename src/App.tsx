import { useState } from 'react';

type View = 'vouchers' | 'stickers' | 'gifts' | 'avatars' | 'badges';
type VoucherState = 'available' | 'claimed' | 'used' | 'expired' | 'sold out';
type Campaign = 'terrace' | 'artist' | 'telco' | 'food';

const campaigns: Record<Campaign, { sponsor: string; title: string; value: string; accent: string; icon: string }> = {
  terrace: { sponsor: 'The Terrace', title: 'Match day refresh', value: 'Free soda with any meal', accent: '#FF6D1F', icon: 'stadium' },
  artist: { sponsor: 'Zuri Live', title: 'See Zuri live', value: '20% off concert tickets', accent: '#A855F7', icon: 'artist' },
  telco: { sponsor: 'Poa Mobile', title: 'Stay in the moment', value: '1 GB free data', accent: '#22C55E', icon: 'mascot' },
  food: { sponsor: 'Moto Bites', title: 'Double the flavour', value: 'Buy one, get one free', accent: '#EF4444', icon: 'food' },
};

const portraits = [
  'https://images.unsplash.com/photo-1770419252442-1485fd76cdb2?auto=format&fit=crop&w=500&q=80',
  'https://images.unsplash.com/photo-1764166904636-10a561a2e6ab?auto=format&fit=crop&w=500&q=80',
  'https://images.unsplash.com/photo-1739511833060-f47de1a48d28?auto=format&fit=crop&w=500&q=80',
  'https://images.unsplash.com/photo-1736967327745-b66c0e2a609d?auto=format&fit=crop&w=500&q=80',
];

function Mark({ small = false }: { small?: boolean }) {
  return <div className={`mark ${small ? 'small' : ''}`}><span>S</span>{!small && <b>STARSTREAK</b>}</div>;
}

function Qr({ large = false }: { large?: boolean }) {
  const bits = [1,1,1,0,1,0,1,1,1,1,0,1,0,1,0,1,0,1,1,1,1,0,1,0,0,0,1,0,1,1,1,0,1,1,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,1,1,0,1,0,1,1,1,1,0,0,1,1,0,1,0,0,1,1,1,0,1,1,1,0,1,0,1,0,1,0,1];
  return <div className={`qr ${large ? 'large' : ''}`}>{bits.map((v,i)=><i className={v ? 'on' : ''} key={i}/>)}</div>;
}

function SponsorArt({ campaign, compact = false }: { campaign: Campaign; compact?: boolean }) {
  const c = campaigns[campaign];
  return <div className={`sponsor-art art-${campaign} ${compact ? 'compact' : ''}`} style={{'--accent':c.accent} as React.CSSProperties}>
    <div className="art-pattern"/>
    <div className="sponsor-logo">{campaign === 'terrace' ? 'TERRACE' : campaign === 'artist' ? 'ZURI' : campaign === 'telco' ? 'POA' : 'MOTO'}</div>
    {campaign === 'terrace' && <><div className="flood a"/><div className="flood b"/><div className="pitch"/><div className="ball">◆</div></>}
    {campaign === 'artist' && <><div className="confetti">✦ · ✦</div><div className="pop-character"><span>♪</span><i/></div></>}
    {campaign === 'telco' && <><div className="signal">)))</div><div className="telco-mascot"><i/><span>•‿•</span></div></>}
    {campaign === 'food' && <><div className="food-bowl"><i/><span>◒</span></div><div className="steam">∿ ∿</div></>}
  </div>
}

function TrustStrip({ campaign, state }: { campaign: Campaign; state: VoucherState }) {
  const c = campaigns[campaign];
  return <div className="trust-strip" data-layer="strip">
    <div className="official">Official · {c.sponsor} <b>✓</b><span>{state === 'available' ? '432 of 1,000 left' : state}</span></div>
    <div className="offer-row"><div><h3>{c.title}</h3><p>{c.value} · Expires 30 Jun</p></div>
      {state === 'claimed' ? <div className="code" data-layer="code"><Qr/><strong>SS-7K2P</strong></div> :
       <button disabled={state !== 'available'}>{state === 'available' ? 'Claim' : state === 'used' ? 'Redeemed' : state === 'expired' ? 'Expired' : 'All claimed'}</button>}
    </div>
  </div>
}

function Voucher({ campaign, state = 'available', mini = false, feed = false }: { campaign: Campaign; state?: VoucherState; mini?: boolean; feed?: boolean }) {
  if (mini) return <div className="voucher-chip"><SponsorArt campaign={campaign} compact/><div><b>{campaigns[campaign].title}</b><span>{state}</span></div></div>;
  return <div className={`voucher state-${state.replace(' ','-')} ${feed ? 'feed-voucher' : ''}`}>
    {feed && <div className="sponsored-label">SPONSORED</div>}
    <SponsorArt campaign={campaign}/>
    {(state === 'used' || state === 'expired' || state === 'sold out') && <div className="state-stamp">{state === 'used' ? 'REDEEMED' : state.toUpperCase()}</div>}
    <TrustStrip campaign={campaign} state={state}/>
  </div>
}

function Flarely({ expression='happy', colour='#FF6D1F', accessory='', size=100 }: { expression?: string; colour?: string; accessory?: string; size?: number }) {
  const eyes = expression === 'sleepy' ? <><path d="M39 54h10M68 54h10"/><path d="M47 70q12 7 24 0"/></> :
    expression === 'shocked' ? <><circle cx="44" cy="54" r="5"/><circle cx="73" cy="54" r="5"/><circle cx="59" cy="72" r="7"/></> :
    expression === 'cool' ? <><path d="M35 50h20l-3 10H39zm28 0h20l-4 10H66zM55 53h8"/><path d="M48 70q11 7 22 0"/></> :
    <><circle cx="44" cy="54" r="4"/><circle cx="73" cy="54" r="4"/><path d="M45 68q14 13 28 0"/></>;
  return <svg className="flarely" viewBox="0 0 120 120" width={size} height={size} aria-label={`Flarely ${expression}`}>
    <defs><linearGradient id={`f-${colour.replace('#','')}`} x1="35" y1="20" x2="80" y2="105"><stop stopColor="#FFD166"/><stop offset=".5" stopColor={colour}/><stop offset="1" stopColor="#C2410C"/></linearGradient></defs>
    <path d="M61 6c-2 13-12 18-14 31-5-4-7-11-6-19-14 14-20 31-16 50 4 22 18 38 37 40 20 2 37-12 41-33 4-20-7-37-23-52 1 12-3 20-10 25 3-18 1-30-9-42Z" fill={`url(#f-${colour.replace('#','')})`} stroke="#3A1709" strokeWidth="4"/>
    <path d="M28 53c-7-8-13-5-12 1 1 3 5 6 10 9m68-10c7-8 13-5 12 1-1 3-5 6-10 9M27 78 7 98l29-11" fill="none" stroke="#3A1709" strokeWidth="5" strokeLinecap="round"/>
    <g fill="none" stroke="#2B170F" strokeWidth="4" strokeLinecap="round">{eyes}</g>
    <circle cx="36" cy="64" r="4" fill="#FF9AA2"/><circle cx="82" cy="64" r="4" fill="#FF9AA2"/>
    {accessory === 'crown' && <path d="m39 30 6-15 14 11 13-13 8 20z" fill="#FFD166" stroke="#3A1709" strokeWidth="3"/>}
    {accessory === 'headphones' && <path d="M28 55c0-36 62-36 64 0M28 53h8v18h-8zm56 0h8v18h-8z" fill="#A855F7" stroke="#3A1709" strokeWidth="4"/>}
    {accessory === 'scarf' && <path d="M32 82q28 13 57-2l-5 14q-23 14-47 1z" fill="#22C55E" stroke="#3A1709" strokeWidth="3"/>}
  </svg>
}

const stickerPacks = {
  basics: ['laughing','cry-laugh','shocked','heart eyes','thumbs up','facepalm','sleeping','waving'],
  matchday: ['goal','VAR check','red card','penalty nerves','slide','offside','whistle','winner'],
  vibes: ['Sawa','Noma!','Aki si','Wueh','Pole','Twende','Fiti','Hapana'],
  sponsored: ['hello','fast','bonus','cheers','wow','love','party','bye'],
};

function Sticker({ pack, name, index, size=96 }: { pack: keyof typeof stickerPacks; name: string; index: number; size?: number }) {
  if (pack === 'vibes') return <div className={`sticker word word-${index%4}`} style={{width:size,height:size}}><strong>{name}</strong><i>✦</i></div>;
  if (pack === 'matchday') return <div className="sticker match" style={{width:size,height:size}}><Flarely expression={index===3?'shocked':'happy'} accessory={index===6?'headphones':index===7?'scarf':''} size={size}/><span>{['⚽','▣','■','◆','⌁','↔','◖','★'][index]}</span></div>;
  if (pack === 'sponsored') return <div className="sticker sponsor-sticker" style={{width:size,height:size}}><div className="telco-mascot"><i/><span>{index%2?'•ᴗ•':'•‿•'}</span></div></div>;
  return <div className="sticker" style={{width:size,height:size}}><Flarely expression={index===2?'shocked':index===6?'sleepy':index===5?'cool':'happy'} colour={index%3===0?'#FF6D1F':index%3===1?'#FFAB3D':'#EC4899'} size={size}/></div>;
}

const gifts = [
  ['Flare','✦','Free'],['High five','✋','5'],['Heart burst','♥','5'],['Scarf','〰','20'],['Vuvuzela','◁','25'],
  ['Football','●','30'],['Mic drop','♩','50'],['Trophy','♛','120'],['Fireworks','✺','150'],['Golden Flarely','S','Won'],
];

function GiftIcon({ index, size=86 }: { index: number; size?: number }) {
  const g = gifts[index];
  return <div className={`gift-icon gift-${index} ${index===9?'won':''}`} style={{width:size,height:size}}><i>{g[1]}</i>{index===9&&<span>❧</span>}</div>;
}

function IllustratedBadge({ kind, shape='medal', won=false }: { kind: number; shape?: 'medal'|'crest'|'streak'; won?: boolean }) {
  const colors = ['#EF4444','#A855F7','#22C55E','#FFD166','#EC4899','#FF6D1F'];
  return <div className={`ibadge ${shape} ${won?'won':''}`} style={{'--bc':colors[kind]} as React.CSSProperties}>
    <div className="ibadge-rim"/><div className="ibadge-art">
      {kind===0&&<><span className="halfball">◐</span><i className="versus"/></>}
      {kind===1&&<><span className="micshape">♪</span><i className="lights"/></>}
      {kind===2&&<div className="perk-mascot">•‿•</div>}
      {kind===3&&<><div className="perk-mascot">•ᴗ•</div><b className="perk-tab">✦</b></>}
      {kind===4&&<Flarely accessory="crown" size={70}/>}
      {kind===5&&<Flarely accessory="scarf" size={70}/>}
    </div>{won&&<div className="laurel">❧　❧</div>}
  </div>
}

function PageHead({ index, eyebrow, title, copy }: { index:string; eyebrow:string; title:string; copy:string }) {
  return <header className="page-head"><span>{index} / {eyebrow}</span><h1>{title}</h1><p>{copy}</p></header>;
}

function VouchersPage() {
  const [state,setState]=useState<VoucherState>('available');
  const states:VoucherState[]=['available','claimed','used','expired','sold out'];
  return <div className="page vouchers-page">
    <PageHead index="01" eyebrow="Sponsor vouchers" title="Their world. Our promise." copy="Every campaign can look completely different. The fixed Starstreak strip is the unmistakable mark of a real reward."/>
    <div className="state-tabs">{states.map(s=><button className={state===s?'active':''} onClick={()=>setState(s)} key={s}>{s}</button>)}</div>
    <section className="voucher-grid">{(Object.keys(campaigns) as Campaign[]).map(c=><Voucher campaign={c} state={state} key={c}/>)}</section>
    <div className="component-note"><b>LOCKED COMPONENT · trust-strip/v1</b><span>Official identity</span><span>Offer + value</span><span>Inventory</span><span>Action / code / QR</span></div>
    <h2 className="section-title">Wallet stack <span>Different art. One trusted rhythm.</span></h2>
    <section className="wallet-redeem">
      <div className="phone wallet"><div className="phone-bar"><span>Rewards</span><i>8 active</i></div><div className="filter-row"><b>All</b><span>Food</span><span>Data</span><span>Events</span></div>
        <Voucher campaign="terrace"/><Voucher campaign="artist" state="claimed"/><Voucher campaign="telco"/><Voucher campaign="food" state="expired"/>
      </div>
      <div className="phone redeem"><SponsorArt campaign="telco"/><div className="redeem-panel"><span>READY TO REDEEM</span><h3>1 GB free data</h3><Qr large/><strong>*123*88#</strong><p>Show this at the counter</p><div className="timer">Single-use code · 04:58</div></div></div>
      <div className="placements"><div><h3>Global feed</h3><Voucher campaign="food" feed/></div><div><h3>Flash drop</h3><div className="flash-drop"><span>LIVE DROP · 02:14</span><Voucher campaign="terrace" mini/></div></div><div><h3>Mini / notification</h3><Voucher campaign="telco" mini/></div></div>
    </section>
    <h2 className="section-title">Sponsor art kit <span>Downloadable production canvas · 1080 × 720</span></h2>
    <section className="art-kit"><div className="kit-board"><div className="pop-zone">POP-OUT ZONE · 160</div><div className="bleed-zone"><div className="safe-zone"><b>SAFE ZONE</b><div className="logo-slot">LOGO · MAX 240 × 96</div><span>Keep logos and essential art inside</span></div><div className="reserved">RESERVED · STARSTREAK STRIP</div></div></div>
      <div className="kit-spec"><h3>Handoff rules</h3><ul><li><b>Canvas</b> 1080 × 720 · 3:2</li><li><b>Bleed</b> 48 px on all edges</li><li><b>Pattern tile</b> Optional · 256 × 256</li><li><b>Character loop</b> Lottie · ≤ 3 s</li><li><b>Accessibility</b> All-ages art required</li></ul><div className="token-row"><i/><i/><i/><span>Primary · Secondary · On-primary</span></div></div>
    </section>
  </div>
}

function StickersPage() {
  const [pack,setPack]=useState<keyof typeof stickerPacks>('basics');
  return <div className="page">
    <PageHead index="02" eyebrow="Sticker packs" title="Say it with heat." copy="Four expressive families, drawn to read instantly at 96 px with bold keylines for every chat surface."/>
    <div className="pack-tabs">{Object.keys(stickerPacks).map((p,i)=><button className={pack===p?'active':''} onClick={()=>setPack(p as keyof typeof stickerPacks)} key={p}><span>{['FREE','EARNED','120 STARS','SPONSORED'][i]}</span>{p}</button>)}</div>
    <section className={`sticker-sheet ${pack==='matchday'?'foil':''}`}>{stickerPacks[pack].map((n,i)=><div className="sticker-cell" key={n}><Sticker pack={pack} name={n} index={i} size={124}/><span>{pack}/{n.replaceAll(' ','-')}</span></div>)}</section>
    <section className="sticker-product">
      <div className="picker"><div className="picker-handle"/><div className="picker-top"><b>Stickers</b><span>✦ 340</span></div><div className="picker-tabs">{(['basics','matchday','vibes','sponsored'] as const).map((p,i)=><button className={p===pack?'active':''} onClick={()=>setPack(p)} key={p}>{i===1?'◇':i===2?'S':'●'}</button>)}</div><div className="picker-grid">{stickerPacks[pack].slice(0,8).map((n,i)=><Sticker pack={pack} name={n} index={i} size={65} key={n}/>)}</div>{pack!=='basics'&&<div className="lock-line">{pack==='matchday'?'Win it · active in 5 Flashes':pack==='vibes'?'Unlock for 120 Stars':'Campaign pack'}</div>}</div>
      <div className="chat-demo"><div className="chat-head">Kasarani Crew <i>LIVE</i></div><div className="bubble theirs">That finish was wild!</div><div className="sent-sticker"><Sticker pack={pack} name={stickerPacks[pack][1]} index={1} size={108}/><span>Seen now</span></div><div className="flash-reply"><b>FLASH · 88'</b><Sticker pack="matchday" name="winner" index={7} size={70}/><span>Amani reacted</span></div></div>
      <div className="store-cards">{(['basics','matchday','vibes','sponsored'] as const).map((p,i)=><div className={`pack-card ${i===1?'foil':''}`} key={p}><Sticker pack={p} name={stickerPacks[p][0]} index={0} size={88}/><div><span>{['FREE','EARNED','120 STARS','CAMPAIGN'][i]}</span><h3>{p==='vibes'?'Kenyan vibes':p}</h3><p>8 stickers</p></div></div>)}</div>
    </section>
  </div>
}

function GiftsPage() {
  return <div className="page">
    <PageHead index="03" eyebrow="Gifts" title="A private little spectacle." copy="Ten gifts across three tiers. Sending is quick; receiving is a full-screen delight seen only by the person it was meant for."/>
    <section className="gift-set">{gifts.map((g,i)=><div className="gift-item" key={g[0]}><GiftIcon index={i}/><div><b>{g[0]}</b><span>{i<3?'Small':i<7?'Medium':'Large'} · {g[2]==='Won'?'Won only':g[2]==='Free'?'Free today':`${g[2]} Stars`}</span></div></div>)}</section>
    <h2 className="section-title">Motion storyboards <span>Lottie-safe · vector layers · under 300 KB</span></h2>
    <section className="storyboards">{[7,8,3].map((g)=><div key={g}><h3>{gifts[g][0]} · receive / 2.4 s</h3><div className="frames">{[0,1,2,3].map(f=><div className={`motion-frame f${f}`} key={f}><GiftIcon index={g} size={48+f*8}/><span>{f===0?'enter':f===1?'anticipate':f===2?'burst':'settle'}</span></div>)}</div><p>gift/body · gift/rays · gift/sparks · gift/shadow</p></div>)}</section>
    <section className="gift-product">
      <div className="gift-tray"><div className="tray-head"><div><span>YOUR BALANCE</span><b>✦ 340 Stars</b></div><button>Get Stars</button></div><div className="tray-grid">{gifts.slice(0,8).map((g,i)=><div key={g[0]}><GiftIcon index={i} size={58}/><span>{g[2]==='Free'?'Free today':g[2]}</span></div>)}</div><button className="send-btn">Send gift</button></div>
      <div className="inbox"><h3>Gift inbox <span>3 new</span></h3>{[7,0,3,9].map((g,i)=><div className="inbox-row" key={g}><GiftIcon index={g} size={48}/><div><b>{['Nia','Kamau','Amani','Starstreak'][i]} sent {gifts[g][0]}</b><span>{i+1}h ago · From your Flash</span></div><button>Thank</button></div>)}</div>
      <div className="sponsor-reveal"><span>SPONSORED GIFT</span><div className="can">POA</div><i>opens to reveal</i><Voucher campaign="telco" mini/></div>
    </section>
    <div className="post-stack"><b>On the post</b><div>{[7,0,4].map(i=><GiftIcon index={i} size={38} key={i}/>)}</div><span>Trophy ×3 · Flare ×12 · Vuvuzela ×2</span></div>
  </div>
}

function Avatar({ index=0, rare=false, ring='purple', size=110 }: { index?:number; rare?:boolean; ring?:'purple'|'orange'; size?:number }) {
  const cols=['#FF6D1F','#FFAB3D','#FFD166','#A855F7','#22C55E','#EC4899'];
  const acc=['','scarf','headphones','crown'][index%4];
  return <div className={`avatar ${ring} ${rare?'rare':''}`} style={{width:size,height:size}}><div className={`avatar-bg bg-${index%4}`}/><Flarely colour={rare?'#FFD166':cols[index%6]} expression={['happy','hyped','cool','shocked','laughing','focused','sleepy','wink'][index%8]} accessory={acc} size={size*.88}/>{rare&&<span className="avatar-laurel">❧</span>}</div>
}

function IllustratedPerson({ index }: { index:number }) {
  const skin=['#5D321F','#8B5637','#3B2118','#B87850'][index];
  return <div className={`illustrated-person hair-${index}`}><div className="hair"/><div className="face" style={{background:skin}}><i/><i/><span/></div><div className="neck" style={{background:skin}}/><div className="shirt"/></div>
}

function AvatarsPage() {
  const [tab,setTab]=useState('Expression');
  return <div className="page">
    <PageHead index="04" eyebrow="Avatars" title="Show up as yourself." copy="Build a Flarely alter ego or turn a personal photo into a warm, consistent Starstreak illustration—always free."/>
    <h2 className="section-title">Mascot layer system <span>Shared 512 × 512 canvas · face-safe centre 80%</span></h2>
    <section className="avatar-grid">{Array.from({length:8},(_,i)=><div key={i}><Avatar index={i} ring={i%3===0?'orange':'purple'}/><span>{['Happy flare','Hyped amber','Cool gold','Shocked purple','Laughing green','Focused pink','Sleepy flare','Wink amber'][i]}</span></div>)}</section>
    <div className="layer-stack"><span>background/stadium-night</span><b>+</b><span>base/flare</span><b>+</b><span>expression/hyped</span><b>+</b><span>outfit/scarf</span><b>+</b><span>ring/purple</span></div>
    <section className="rare-row"><div><Avatar index={3} rare ring="orange" size={150}/><h3>Golden Flarely</h3><span>Won · never bought</span></div><div><Avatar index={2} rare size={150}/><h3>Holographic Flarely</h3><span>Won · foil edition</span></div><div className="scale-avatar"><Avatar index={0} size={120}/><Avatar index={0} size={56}/><Avatar index={0} size={32}/><span>120 profile · 56 post · 32 comment</span></div></section>
    <h2 className="section-title">Photo → illustrated <span>Identity-faithful, flat-shaded, and always free</span></h2>
    <section className="portrait-guide">{portraits.map((p,i)=><div className="before-after" key={p}><div className="photo"><img src={p} alt={`Portrait reference ${i+1}`}/><span>PHOTO</span></div><b>→</b><div className="drawn"><IllustratedPerson index={i}/><span>AVATAR</span></div></div>)}</section>
    <div className="style-rules"><span><b>01</b> Preserve skin tone</span><span><b>02</b> Simplify, don’t erase</span><span><b>03</b> Bold 8 px outline</span><span><b>04</b> Face inside centre 80%</span><span><b>05</b> Respect hair & dress</span></div>
    <section className="avatar-product"><div className="editor"><div className="editor-top"><span>Cancel</span><b>Edit avatar</b><span>Save</span></div><div className="editor-stage"><Avatar index={2} size={180}/></div><div className="editor-tabs">{['Expression','Outfit','Background'].map(t=><button className={tab===t?'active':''} onClick={()=>setTab(t)} key={t}>{t}</button>)}</div><div className="editor-options">{Array.from({length:4},(_,i)=><div key={i}><Avatar index={i+1} size={60}/><span>{i===2?'✦ 80':i===3?'Win it':'Owned'}</span></div>)}</div></div>
      <div className="avatar-context"><div className="profile-cover"><Avatar index={2} ring="orange" size={112}/><h3>Amani M.</h3><span>@amani · Nairobi</span></div><div className="context-post"><Avatar index={2} ring="orange" size={46}/><div><b>Amani M.</b><span>That finish! Kasarani is alive.</span></div></div><div className="context-post small"><Avatar index={5} size={32}/><div><b>Nia</b><span>Wueh, what a match.</span></div></div></div></section>
  </div>
}

function BadgesPage() {
  const names=['Mashemeji Derby 2026','Nairobi Concert Night','Poa Perk','Moto Perk','Madaraka Flarely','Rainy Season'];
  return <div className="page">
    <PageHead index="05" eyebrow="Illustrated badges" title="A whole moment, in miniature." copy="Custom event, sponsor, and Flarely art inside the established rim system. The silhouette stays familiar; only the story inside changes."/>
    <section className="badge-template-row">{(['streak','crest','medal'] as const).map((shape,i)=><div key={shape}><div className="template-area"><IllustratedBadge kind={i} shape={shape}/><span>ILLUSTRATION SAFE AREA</span></div><h3>{shape} / 120 × 120</h3><p>rim · inner-art · highlights · optional-laurel</p></div>)}</section>
    <h2 className="section-title">Six limited stories <span>No text inside art · readable at 18 px</span></h2>
    <section className="illustrated-grid">{names.map((n,i)=><div key={n}><IllustratedBadge kind={i} shape={i%3===0?'streak':i%3===1?'crest':'medal'} won={i===0||i===4}/><span>{i<2?'EVENT':i<4?'SPONSOR PERK':'FLARELY EDITION'}</span><h3>{n}</h3><p>{i===0||i===4?'Epic · won':'Rare · earned'}</p></div>)}</section>
    <section className="mixed-showcase"><div><span>AMANI’S SHOWCASE</span><h2>Three moments worth keeping.</h2></div><div className="showcase-badges"><IllustratedBadge kind={0} shape="streak" won/><IllustratedBadge kind={4} shape="crest" won/><div className="standard-badge">★</div></div></section>
    <div className="badge-scales"><span>Scale test</span><IllustratedBadge kind={1} shape="crest"/><div className="scale56"><IllustratedBadge kind={1} shape="crest"/></div><div className="scale18"><IllustratedBadge kind={1} shape="crest"/></div><b>120 detail　56 shelf　18 username</b></div>
  </div>
}

export default function App() {
  const [view,setView]=useState<View>('vouchers');
  const items: [View,string,string][]=[['vouchers','01','Vouchers'],['stickers','02','Stickers'],['gifts','03','Gifts'],['avatars','04','Avatars'],['badges','05','Badges']];
  return <main className="studio">
    <aside><Mark/><div className="suite-label">REWARDS & IDENTITY</div><nav>{items.map(([id,n,label])=><button className={view===id?'active':''} onClick={()=>setView(id)} key={id}><span>{n}</span>{label}</button>)}</nav><div className="rail-foot"><span>Design system</span><b>v1.2 · Nairobi</b></div></aside>
    <div className="workspace"><div className="workspace-bar"><span>STARSTREAK / SYSTEMS / <b>{view.toUpperCase()}</b></span><div><i/>Dark & light ready</div></div>
      {view==='vouchers'&&<VouchersPage/>}{view==='stickers'&&<StickersPage/>}{view==='gifts'&&<GiftsPage/>}{view==='avatars'&&<AvatarsPage/>}{view==='badges'&&<BadgesPage/>}
    </div>
  </main>;
}
