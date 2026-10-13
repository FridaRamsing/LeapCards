import { useEffect, useRef, useState } from 'react'

const site = 'https://www.leapcards.net'
const links = { cards: `${site}/bundles/all-cards`, classes: `${site}/pages/leapclass`, tracks: `${site}/pages/leaptracks`, programs: `${site}/pages/lp`, dashboard: `${site}/enrollments` }
const asset = name => `/assets/${name}`
const icons = { cards: '\uf2bb', classes: '\uf0e6', tracks: '\uf018', bell: '\uf0a2', left: '\uf104', right: '\uf105', play: '\uf04b', screen: '\uf26c' }
function Icon({ name }) { return <span className="icon" aria-hidden="true">{icons[name]}</span> }
function Button({ href, children }) { return <a className="button" href={href}>{children}</a> }

function Header() {
  const [menu, setMenu] = useState(false)
  return <header className="site-header"><div className="container header-inner">
    <a href="#" aria-label="LeapCards home"><img className="logo" src={asset('logo.png')} alt="LeapCards" /></a>
    <button className="menu-toggle" aria-label="Toggle navigation" aria-expanded={menu} onClick={() => setMenu(!menu)}>☰</button>
    <nav className={menu ? 'navigation open' : 'navigation'} aria-label="Main navigation">
      <a href={links.cards}><strong>Cards</strong></a><a href={links.classes}><strong>Classes</strong></a><a href={links.tracks}><strong>Tracks</strong></a>
      <a href={links.dashboard}>My Dashboard</a>
      <a className="profile" href={`${site}/users/sign_in`} aria-label="Frida R — open LeapCards account">FRIDA R <img src={asset('profile.jpg')} alt="" /><span className="caret">▾</span></a>
      <a className="notifications" href={links.dashboard} aria-label="Notifications on LeapCards"><Icon name="bell" /></a>
    </nav>
  </div></header>
}
function Hero() {
  return <section className="hero curved"><div className="container"><h1>Welcome to LeapCards™</h1><p>- your Building Blocks of Better Leadership</p></div></section>
}
function Introduction() {
  return <section className="introduction curved"><div className="intro-copy">
    <p>Leadership is not something you learn once — <strong>it is something<br className="desktop-break" /> you practice every day.</strong></p>
    <p>LeapCards are designed to support that practice, with simple<br className="desktop-break" /> tools, structured learning journeys, and shared experiences<br className="desktop-break" /> that can be applied directly in real situations.</p>
    <p>Take a closer look...</p>
  </div></section>
}
const products = [
  { name: 'LeapCards', icon: 'cards', intro: 'Simple, practical leadership tools designed for everyday use.', text: 'Each card combines clear frameworks, reflection questions, videos, assignments, and supporting learning material that you can apply directly in your work.', link: links.cards, label: 'LeapCards' },
  { name: 'LeapClasses', icon: 'classes', intro: 'Live, facilitated sessions where the LeapCards come to life.', text: 'Through dialogue, exercises, and real cases, participants explore leadership topics together and turn insights into practical actions they can apply immediately.', link: links.classes, label: 'LeapClass' },
  { name: 'LeapTracks', icon: 'tracks', intro: 'Structured learning journeys that connect the LeapCards into focused themes.', text: 'Each track guides you through key leadership areas step by step, helping you build clarity, consistency, and confidence over time.', link: links.tracks, label: 'LeapTracks' }
]
function ProductOverview() {
  return <section className="container product-overview" aria-label="Explore LeapCards products">{products.map(p => <article key={p.name}>
    <Icon name={p.icon} /><h2>{p.name}</h2><p>{p.intro}</p><p>{p.text}</p><p>Visit {p.label} <a href={p.link}>here</a></p>
  </article>)}</section>
}
function Feature({ id, image, alt, reverse = false, children, href, button }) {
  return <section id={id} className={`container feature ${reverse ? 'image-first' : ''}`}>
    <div className="feature-copy">{children}{href && <Button href={href}>{button}</Button>}</div>
    <img className="feature-image" src={asset(image)} alt={alt} loading="lazy" />
  </section>
}
const testimonials = [
  { image: 'bas.jpg', name: 'Bas Haaring', role: 'Engineering Manager at Jacobs', quote: 'Very intensive and personal training adjusted to the needs of the participants. Great set of tools are learned in a short period, that can be used immediately in my day to day work. Great Trainer.' },
  { image: 'robert.jpg', name: 'Robert Bohynik', role: 'Chief Investment Officer, NN Investment Partners TFI Poland', quote: 'The program enabled me to recognize orchestrated music instead of sounds of noise. We did not try to dive into theoretical concepts and “grand studies”, rather focused on our own small and big challenges and problems.' },
  { image: 'terri.jpg', name: 'Terri-Ann dela Cruz', role: 'Software Test Engineer at Ultimaker', quote: 'This has been a real eye-opener for me. I feel like all this time I was blinded with ignorance and unawareness. Halfway throughout the training, I felt being empowered with the tools that I can use to bring myself and others towards the goal. There will always be problems with work and leadership, and they will not be easy, but there are always ways to get over them.' }
]
function Testimonials() {
  const [index, setIndex] = useState(0)
  const t = testimonials[index]
  return <section className="container testimonials"><h2>LeapCard and LeapClass <strong>Experiences</strong></h2>
    <div className="testimonial-layout">
      <button className="arrow previous" aria-label="Previous testimonial" onClick={() => setIndex((index + testimonials.length - 1) % testimonials.length)}><Icon name="left" /></button>
      <div className="testimonial" aria-live="polite"><img src={asset(t.image)} alt={t.name} loading="lazy" /><h3>{t.name}</h3><p className="role">{t.role}</p><blockquote>{t.quote}</blockquote></div>
      <button className="arrow next" aria-label="Next testimonial" onClick={() => setIndex((index + 1) % testimonials.length)}><Icon name="right" /></button>
    </div>
  </section>
}
function VideoBanner({ image, title, children, video, variant = '' }) {
  const dialog = useRef(null)
  const [playing, setPlaying] = useState(false)
  useEffect(() => {
    if (!playing) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = previous }
  }, [playing])
  const close = () => { dialog.current.close(); setPlaying(false) }
  return <section className={`video-banner curved ${variant}`} style={{ '--poster': `url("${asset(image)}")` }}>
    <div className="container video-copy"><button className="play-button" aria-label={`Play ${typeof title === 'string' ? title : 'Real People, Real Answers'}`} onClick={() => { setPlaying(true); dialog.current.showModal() }}><Icon name="play" /></button><h2>{title}</h2><p>{children}</p></div>
    <dialog ref={dialog} className="video-dialog" onClose={() => setPlaying(false)} onClick={event => { if (event.target === event.currentTarget) close() }} aria-label="LeapCards video">
      <button className="close-dialog" onClick={close} aria-label="Close video">×</button>
      {playing && <iframe title="LeapCards video player" src={`https://platform.thinkific.com/videoproxy/v1/play/${video}?autoplay=false`} allow="autoplay; fullscreen; picture-in-picture" allowFullScreen />}
    </dialog>
  </section>
}
const cards = [
  { image: 'card-07.png', title: 'LC07. Motivating 3P Agreements', text: 'Clear agreements are vital for good leadership. They prevent misunderstandings, delays, and frustration...', path: '/courses/LC07-motivating-3p-agreements' },
  { image: 'card-34.png', title: 'LC34. How do you introduce yourself and avoid misunderstandings?', text: 'To reduce misunderstandings, share stories and ask. Questions when unsure, and use the JoHari window to be open and inquisitive...', path: '/courses/LC-34-open-the-johari-window' },
  { image: 'card-62.png', title: 'LC62. How do you build trust and act with integrity?', text: "Trust is essential for lasting leadership; followers must trust you, especially during major changes or cultural differences. It's...", path: '/courses/LC62-triangle-of-trust' }
]
function FreeCards() {
  return <section id="free-cards" className="container free-cards"><h2>Your <strong>Free</strong> LeapCards</h2>
    <p className="section-intro">Look for the question you need answered. <strong>No purchase required.</strong><br />These sample cards include 30+ minutes of <strong>bite-sized leadership videos.</strong></p>
    <p className="registration-note">(you will need to register once - after that all three cards are free and ready for your evaluation)</p>
    <div className="cards-grid">{cards.map(card => <a className="leapcard" href={site + card.path} key={card.path}><img src={asset(card.image)} alt={card.title} loading="lazy" /><div className="card-body"><h3>{card.title}</h3><p className="card-type"><Icon name="screen" /> LeapCard</p><p className="card-description">{card.text}</p></div></a>)}</div>
  </section>
}
function Professionals() {
  return <section id="professionals" className="container professionals"><h2>Your LeapCard <strong>Professionals</strong></h2><p className="section-intro">We are your certified LeapCard <strong>Coaches</strong>, <strong>Creators</strong>, and<br className="desktop-break" /> <strong>Facilitators</strong>. We're ready for you in corporate programs and in<br className="desktop-break" /> LeapClasses the first week of every month. See you <a href={links.classes}>there</a>!</p>
    <iframe className="professionals-embed" title="LeapCard Professionals — portraits and introductions" src="https://airtable.com/embed/appMH2wbhj7Z9qL1d/shr8NmaP98WBhXeLZ" loading="lazy" />
  </section>
}
function Footer() {
  return <><section className="closing"><div className="container"><h2>Leadership Building Blocks. Thats it. <strong>Now DO</strong> about it.</h2><div className="button-group"><Button href={links.cards}>Get the LeapCards</Button><Button href={links.classes}>Join a LeapClass</Button></div></div></section>
    <footer className="site-footer"><div className="container"><nav aria-label="Footer"><a href={`${site}/pages/rollout-feedback`}>Feedback</a><a href={`${site}/pages/terms`}>Terms</a><a href={`${site}/pages/privacy`}>Privacy</a></nav><p>©BlueBehavior, December 2024</p></div></footer></>
}
export default function App() {
  return <><a className="skip-link" href="#main">Skip to content</a><Header /><main id="main"><Hero /><Introduction /><ProductOverview />
    <Feature id="cards" image="cards-fan.png" alt="A fan of printed LeapCards leadership cards" href={links.cards} button="View the Cards">
      <p>LeapCards™ are used by <strong>10.000+ leaders</strong> world wide in their leadership development.</p>
      <p>The cards launched in 2014 as <strong>printed postcards</strong> for individualization of global leadership programs.</p>
      <p>Now the LeapCards are available to you online as <strong>free bite-sized inspiration</strong> on essential leadership skills and challenges.</p>
    </Feature>
    <Feature id="classes" image="classes-collage.png" alt="Participants working together with LeapCards" reverse href={links.classes} button="View the Classes">
      <p>Adding a monthly subscription gets you 80+ leadership topics with 20+ hours of short high-impact videos, a personalized <strong>focus plan</strong> and all monthly LeapClasses with <strong>deep dives</strong> and <strong>case clinics</strong>.</p>
      <p>Scroll below to get our <strong>top three LeapCards for free</strong>, including their in-depth studio-recorded videos and matching online Q&amp;A LeapClasses.</p>
    </Feature>
    <Feature id="programs" image="programs-collage.png" alt="Groups taking part in leadership programs" href={links.programs} button="Go to Programs">
      <p>Are you an alumni from an <strong>accelerated talent or leadership program?</strong></p>
      <p>Perhaps from Alstom, Hager Group, Nestlé, SBM Offshore, or Van Oord?</p>
      <p>Go to programs for your curated leadership bundle and localized LeapCards.</p>
    </Feature>
    <Testimonials />
    <VideoBanner image="meetings.png" title={<>Real People,<br />Real Answers</>} video="ctgmc1uel7uc72rjsdv0"><strong>30 seconds on the monthly meetings as discussed by Ulrik and Catherine, who are available for your questions the first week of most months.</strong></VideoBanner>
    <Feature id="leadership" image="leadership-training.png" alt="LeapCards individual tools and LeapClasses team sessions" reverse>
      <p>Your <strong>leadership is a muscle</strong> that needs frequent exercise.</p><div className="body-copy"><p>Think of this site as an online fitness center for your leadership.</p><p>Leap<strong>Cards</strong> are the <strong>individual machines</strong> to strengthen your skills.</p><p>Leap<strong>Classes</strong> are the <strong>team sessions</strong> where we exercise together.</p><p>Combined with a few personal recommendations - like the individual focus plan and in relay coaching - the cards and classes offer a proven and individualized way for you to <strong>develop your leadership in a way that fits your schedule!</strong></p></div>
    </Feature>
    <FreeCards /><VideoBanner image="sample-video.png" title="Sample video from typical LeapCard" video="ctgm59pd06jc72h4jv00" variant="sample">Typically each LeapCard has 2-3 video details like this.</VideoBanner><Professionals /><Footer />
  </main></>
}
