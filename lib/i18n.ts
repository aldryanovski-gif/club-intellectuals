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
    ctaAbout: 'Who we are',
    imageAlt: 'People learning together at a Club Intellectuals training'
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
    imageAlt: 'The Club Intellectuals community working together on ideas',
    p1: '"Club of Intellectuals" Association is a non-governmental organization from Slovakia created to support non-formal education and lifelong learning, with a focus on adults and youth. We organize local and cross-border training courses, exchange experience and good practices, enrich the knowledge and practical skills of participants through informal learning, and design and realize educational initiatives that promote societal change, inclusion and the equal participation of people with different past experience and competencies.',
    p2: 'Our main efforts are directed towards the transfer of knowledge, skills portfolio development and adult education through blended approaches featuring e-learning, non-formal education and innovative techniques. Over the years we have built networks with decision-makers, NGOs, chambers of commerce and umbrella organizations working with youth and adults, and we have experience in designing and supporting educational products and programs that are relevant to modern education and meet social needs at national and European level.',
    p3: 'We are focused on community development through lifelong learning, inclusion and local development, and we promote innovation and the sustainable development of communities through adult learning. Our experts have developed a variety of training programs inspired by innovative methodologies and pedagogical approaches, including problem-based and game-based learning on various subjects.',
    p4: 'Adult learning courses, designed around the specific cognitive learning patterns of adults and seniors, are a major part of our portfolio. We have extensive experience in designing mobile technologies and training tools, including for people with special needs and for social inclusion, and we act as an adult education provider. In recent years we have successfully introduced new forms of adult learning through software products for digital skills, adapted to people with limited educational opportunities, low-educated adults and marginalized communities.',
    p5: 'Health-enhancing activities and sport participation are also within the scope of our experience. Our experts have supported local initiatives that include adults in health-enhancing and rehabilitation activities, assisted in a multi-level skills development program for employees, and designed a training module for creative thinking and stress relief that increases productivity and builds a more positive approach to the workspace.',
    experienceTitle: 'Project experience',
    experienceText: 'Since 2015 Club Intellectuals has taken part in multiple Erasmus+ projects, including:',
    teamTitle: 'Our people',
    teamText: 'The members of the association are people with a wide range of professional expression and multi-layered experience, mainly in the field of educational and social services. Many of them are intellectuals well known in the local community, with contacts and links to various Slovak and European organizations and institutions. The team also includes young experts in modern professions, especially information technology, who innovate and create new educational tools and technologies. Mariana Janchev brings more than 30 years of experience in educational institutions and is at the basis of our programs for working with adults, while Victor Mirica, an IT college lecturer, has a significant body of work adapting educational programs for basic digital skills to elderly people with little or no formal education.'
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
    ctaAbout: 'Kto sme',
    imageAlt: 'Ľudia, ktorí sa spoločne vzdelávajú na školení Klubu intelektuálov'
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
    imageAlt: 'Komunita Klubu intelektuálov spoločne pracuje na nápadoch',
    p1: 'Združenie „Klub intelektuálov" je mimovládna organizácia zo Slovenska vytvorená na podporu neformálneho vzdelávania a celoživotného učenia so zameraním na dospelých a mládež. Organizujeme miestne a cezhraničné školenia, vymieňame si skúsenosti a dobrú prax, obohacujeme vedomosti a praktické zručnosti účastníkov prostredníctvom informálneho učenia a realizujeme vzdelávacie iniciatívy podporujúce spoločenské zmeny, inklúziu a rovnocennú účasť ľudí s rôznymi skúsenosťami a kompetenciami.',
    p2: 'Naše hlavné úsilie smeruje k prenosu vedomostí, rozvoju zručností a vzdelávaniu dospelých prostredníctvom kombinovaných prístupov zahŕňajúcich e-learning, neformálne vzdelávanie a inovatívne techniky. V priebehu rokov sme vybudovali siete s tvorcami rozhodnutí, mimovládnymi organizáciami, obchodnými komorami a strešnými organizáciami pracujúcimi s mládežou a dospelými a máme skúsenosti s navrhovaním a podporou vzdelávacích produktov a programov, ktoré zodpovedajú modernému vzdelávaniu a spoločenským potrebám na národnej i európskej úrovni.',
    p3: 'Zameriavame sa na rozvoj komunít prostredníctvom celoživotného učenia, inklúzie a miestneho rozvoja a podporujeme inovácie a udržateľný rozvoj komunít cez vzdelávanie dospelých. Naši experti vyvinuli rôzne vzdelávacie programy inšpirované inovatívnymi metodikami a pedagogickými prístupmi vrátane problémovo orientovaného učenia a učenia založeného na hrách.',
    p4: 'Kurzy vzdelávania dospelých, navrhnuté s ohľadom na špecifické kognitívne vzorce učenia dospelých a seniorov, tvoria hlavnú časť nášho portfólia. Máme bohaté skúsenosti s navrhovaním mobilných technológií a vzdelávacích nástrojov, a to aj pre ľudí so špeciálnymi potrebami a pre sociálnu inklúziu, a pôsobíme ako poskytovateľ vzdelávania dospelých. V posledných rokoch sme úspešne zaviedli nové formy vzdelávania dospelých prostredníctvom softvérových produktov pre digitálne zručnosti, prispôsobených ľuďom s obmedzenými vzdelávacími možnosťami, dospelým s nízkym vzdelaním a marginalizovaným komunitám.',
    p5: 'K našim skúsenostiam patria aj aktivity podporujúce zdravie a účasť na športe. Naši experti podporili miestne iniciatívy zapájajúce dospelých do zdraviu prospešných a rehabilitačných aktivít, pomáhali pri viacúrovňovom programe rozvoja zručností zamestnancov a navrhli vzdelávací modul pre kreatívne myslenie a zvládanie stresu, ktorý zvyšuje produktivitu a buduje pozitívnejší prístup k pracovnému prostrediu.',
    experienceTitle: 'Projektové skúsenosti',
    experienceText: 'Od roku 2015 sa Klub intelektuálov zúčastnil viacerých projektov Erasmus+, vrátane:',
    teamTitle: 'Naši ľudia',
    teamText: 'Členovia združenia sú ľudia so širokým profesijným záberom a mnohovrstvovými skúsenosťami, najmä v oblasti vzdelávacích a sociálnych služieb. Mnohí z nich sú intelektuáli známi v miestnej komunite, s kontaktmi a väzbami na rôzne slovenské a európske organizácie a inštitúcie. Súčasťou tímu sú aj mladí odborníci v moderných profesiách, najmä v informačných technológiách, ktorí inovujú a vytvárajú nové vzdelávacie nástroje a technológie. Mariana Janchev prináša viac ako 30 rokov skúseností vo vzdelávacích inštitúciách a stojí pri základoch našich programov pre prácu s dospelými, zatiaľ čo Victor Mirica, lektor informačných technológií na vysokej škole, má rozsiahle autorské dielo v prispôsobovaní vzdelávacích programov základných digitálnych zručností pre seniorov bez vzdelania alebo s nízkym vzdelaním.'
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
