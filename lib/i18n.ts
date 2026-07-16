export const locales = ['en', 'sk'] as const;
export type Locale = (typeof locales)[number];

export function isLocale(v: string): v is Locale {
  return (locales as readonly string[]).includes(v);
}

const en = {
  nav: {
    home: 'Home',
    projects: 'Projects',
    news: 'News',
    events: 'Events',
    about: 'About us',
    contact: 'Contact'
  },
  hero: {
    eyebrow: 'Club of Intellectuals · Slovakia',
    title1: 'Learning that',
    titleMark: 'changes',
    title2: 'communities',
    lead: 'We are a non-governmental organization supporting non-formal education and lifelong learning for adults and youth across Slovakia and Europe.',
    ctaProjects: 'Explore our projects',
    ctaAbout: 'Who we are'
  },
  home: {
    whoWeAre: 'Who we are',
    whoText: '"Club of Intellectuals" Association supports non-formal education and lifelong learning through local and cross-border training courses, exchange of experience and good practices, and educational initiatives that promote inclusion and equal participation.',
    latestNews: 'Latest news',
    featuredProjects: 'Featured projects',
    upcomingEvents: 'Upcoming events',
    viewAll: 'View all',
    quote: '"Everything that is done in the world is done by hope."',
    quoteAuthor: 'Martin Luther',
    contactTitle: 'Get in touch',
    contactLead: 'Have a question about our work, or want to collaborate on a project? Write to us.'
  },
  about: {
    title: 'A bit about us',
    p1: '"Club of Intellectuals" Association is a non-governmental organization from Slovakia created to support non-formal education and lifelong learning, with a focus on adults and youth. We organize local and cross-border training courses, exchange experience and good practices, and design and realize educational initiatives that promote inclusion and equal participation.',
    p2: 'Our main efforts are directed towards the transfer of knowledge, skills portfolio development and adult education through blended approaches featuring e-learning, non-formal education and innovative techniques. Over the years we have built networks with decision-makers, NGOs, chambers of commerce and umbrella organizations working with youth and adults.',
    p3: 'Adult learning courses are a major part of our portfolio. We have extensive experience in designing mobile technologies and training tools, including for people with special needs, low-educated adults and marginalized communities, and we act as an adult education provider.',
    experienceTitle: 'Project experience',
    experienceText: 'Since 2015 Club Intellectuals has taken part in multiple Erasmus+ projects, including:',
    teamTitle: 'Our people',
    teamText: 'The members of the association combine decades of experience in educational and social services with young experts in information technology who create new educational tools and technologies.'
  },
  posts: {
    newsTitle: 'News',
    newsLead: 'Updates from our projects and activities.',
    projectsTitle: 'Projects',
    projectsLead: 'Initiatives we design and implement with partners across Europe.',
    eventsTitle: 'Events',
    eventsLead: 'Trainings, exchanges and meetings — join us.',
    readMore: 'Read more',
    visitSite: 'Visit project site',
    empty: 'Nothing published here yet — check back soon.',
    back: 'Back'
  },
  contact: {
    title: 'Contact Club Intellectuals',
    lead: 'Write to us — we usually reply within a few days.',
    name: 'Your name',
    email: 'Email address',
    message: 'Your message',
    send: 'Send message',
    sending: 'Sending…',
    ok: 'Thanks — your message was sent.',
    error: 'Something went wrong. Please try again or email us directly.',
    location: 'Slovakia'
  },
  footer: {
    tagline: 'Working today for a brighter and better tomorrow.',
    rights: 'Club Intellectuals Association'
  }
};

const sk: typeof en = {
  nav: {
    home: 'Domov',
    projects: 'Projekty',
    news: 'Novinky',
    events: 'Podujatia',
    about: 'O nás',
    contact: 'Kontakt'
  },
  hero: {
    eyebrow: 'Klub intelektuálov · Slovensko',
    title1: 'Vzdelávanie, ktoré',
    titleMark: 'mení',
    title2: 'komunity',
    lead: 'Sme mimovládna organizácia podporujúca neformálne vzdelávanie a celoživotné učenie dospelých a mládeže na Slovensku aj v Európe.',
    ctaProjects: 'Naše projekty',
    ctaAbout: 'Kto sme'
  },
  home: {
    whoWeAre: 'Kto sme',
    whoText: 'Združenie „Klub intelektuálov" podporuje neformálne vzdelávanie a celoživotné učenie prostredníctvom miestnych a cezhraničných školení, výmeny skúseností a dobrej praxe a vzdelávacích iniciatív podporujúcich inklúziu a rovnocennú účasť.',
    latestNews: 'Najnovšie správy',
    featuredProjects: 'Vybrané projekty',
    upcomingEvents: 'Nadchádzajúce podujatia',
    viewAll: 'Zobraziť všetko',
    quote: '„Všetko, čo sa na svete robí, sa robí s nádejou."',
    quoteAuthor: 'Martin Luther',
    contactTitle: 'Kontaktujte nás',
    contactLead: 'Máte otázku o našej práci alebo chcete spolupracovať na projekte? Napíšte nám.'
  },
  about: {
    title: 'Niečo o nás',
    p1: 'Združenie „Klub intelektuálov" je mimovládna organizácia zo Slovenska vytvorená na podporu neformálneho vzdelávania a celoživotného učenia so zameraním na dospelých a mládež. Organizujeme miestne a cezhraničné školenia, vymieňame si skúsenosti a dobrú prax a realizujeme vzdelávacie iniciatívy podporujúce inklúziu a rovnocennú účasť.',
    p2: 'Naše hlavné úsilie smeruje k prenosu vedomostí, rozvoju zručností a vzdelávaniu dospelých prostredníctvom kombinovaných prístupov zahŕňajúcich e-learning, neformálne vzdelávanie a inovatívne techniky. V priebehu rokov sme vybudovali siete s tvorcami rozhodnutí, mimovládnymi organizáciami, obchodnými komorami a strešnými organizáciami pracujúcimi s mládežou a dospelými.',
    p3: 'Kurzy vzdelávania dospelých tvoria hlavnú časť nášho portfólia. Máme bohaté skúsenosti s navrhovaním mobilných technológií a vzdelávacích nástrojov, a to aj pre ľudí so špeciálnymi potrebami, dospelých s nízkym vzdelaním a marginalizované komunity, a pôsobíme ako poskytovateľ vzdelávania dospelých.',
    experienceTitle: 'Projektové skúsenosti',
    experienceText: 'Od roku 2015 sa Klub intelektuálov zúčastnil viacerých projektov Erasmus+, vrátane:',
    teamTitle: 'Naši ľudia',
    teamText: 'Členovia združenia spájajú desaťročia skúseností vo vzdelávacích a sociálnych službách s mladými odborníkmi v oblasti informačných technológií, ktorí vytvárajú nové vzdelávacie nástroje a technológie.'
  },
  posts: {
    newsTitle: 'Novinky',
    newsLead: 'Aktuality z našich projektov a aktivít.',
    projectsTitle: 'Projekty',
    projectsLead: 'Iniciatívy, ktoré navrhujeme a realizujeme s partnermi po celej Európe.',
    eventsTitle: 'Podujatia',
    eventsLead: 'Školenia, výmeny a stretnutia — pridajte sa k nám.',
    readMore: 'Čítať viac',
    visitSite: 'Navštíviť stránku projektu',
    empty: 'Zatiaľ tu nie je nič publikované — vráťte sa čoskoro.',
    back: 'Späť'
  },
  contact: {
    title: 'Kontaktujte Klub intelektuálov',
    lead: 'Napíšte nám — zvyčajne odpovedáme do niekoľkých dní.',
    name: 'Vaše meno',
    email: 'E-mailová adresa',
    message: 'Vaša správa',
    send: 'Odoslať správu',
    sending: 'Odosiela sa…',
    ok: 'Ďakujeme — vaša správa bola odoslaná.',
    error: 'Niečo sa pokazilo. Skúste to znova alebo nám napíšte priamo.',
    location: 'Slovensko'
  },
  footer: {
    tagline: 'Pracujeme dnes pre lepší a jasnejší zajtrajšok.',
    rights: 'Združenie Klub intelektuálov'
  }
};

const dictionaries = { en, sk };

export type Dictionary = typeof en;

export function getDict(locale: Locale): Dictionary {
  return dictionaries[locale] ?? dictionaries.en;
}
