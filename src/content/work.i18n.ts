import type { Locale } from '@/lib/i18n/routing';

/** Localizable case-study copy. `results` are labels in the same order as English. */
export type CaseStudyCopy = {
  client: string;
  categoryLabel: string;
  summary: string;
  challenge: string;
  solution: string;
  results: string[];
  quote?: { text: string; author: string; role: string };
};

export const caseStudyI18n: Partial<Record<Locale, Record<string, CaseStudyCopy>>> = {
  de: {
    'alpine-fintech': {
      client: 'Alpine Fintech (Konzept)',
      categoryLabel: 'Web · KI',
      summary: 'Eine mehrsprachige Marketing-Website + KI-Support-Assistent für ein Schweizer Fintech.',
      challenge: 'Ein schnell wachsendes Fintech brauchte einen glaubwürdigen, mehrsprachigen Webauftritt und wollte wiederkehrende Support-Fragen reduzieren, ohne Personal aufzubauen.',
      solution: 'Wir gestalteten und bauten eine Next.js-Website in vier Sprachen und lieferten einen Claude-gestützten Assistenten, trainiert auf ihren Produktdokumenten, mit Übergabe an Menschen bei komplexen Fällen.',
      results: ['Qualifizierte Leads', 'Support-Tickets', 'LCP auf Mobile'],
      quote: { text: 'Sie lieferten schneller als unsere interne Roadmap, und der KI-Assistent rechnete sich in einem Monat.', author: 'Vertraulich', role: 'Head of Growth' },
    },
    'gourmet-delivery': {
      client: 'Gourmet Delivery (Konzept)',
      categoryLabel: 'App · Branding',
      summary: 'Markenidentität und eine plattformübergreifende Bestell-App für einen Premium-Mahlzeitenservice.',
      challenge: 'Ein Premium-Mahlzeitenservice hatte treue Kunden, aber einen umständlichen Bestellablauf und eine inkonsistente Marke.',
      solution: 'Wir bauten die Marke neu und lieferten eine React-Native-App mit reibungslosem Nachbestellfluss, Push-Benachrichtigungen und einem Loyalty-System.',
      results: ['Wiederholungsbestellungen', 'App-Store-Bewertung', 'Durchschn. Bestellwert'],
      quote: { text: 'Unsere Kunden haben endlich eine App, die so hochwertig wirkt wie das Essen.', author: 'Vertraulich', role: 'Gründer' },
    },
    'luxe-watches': {
      client: 'Luxe Watches (Konzept)',
      categoryLabel: 'Branding · SEO',
      summary: 'Eine raffinierte Identität und ein SEO-Relaunch für einen Schweizer Uhrenhändler.',
      challenge: 'Ein etablierter Uhrenhändler wirkte online veraltet und war für kaufstarke Suchbegriffe unsichtbar.',
      solution: 'Wir modernisierten die Identität, bauten den Shop für Speed neu und betrieben ein technisches SEO- + Content-Programm auf Käufer-Keywords.',
      results: ['Organischer Traffic', 'Top-Rankings', 'Online-Umsatz'],
    },
    'medtech-portal': {
      client: 'MedTech Portal (Konzept)',
      categoryLabel: 'KI · Web',
      summary: 'Ein sicherer interner Wissensassistent für ein Medtech-Unternehmen.',
      challenge: 'Mitarbeitende verloren Stunden mit der Suche in verstreuter interner Dokumentation über Systeme hinweg.',
      solution: 'Wir bauten einen privaten RAG-Assistenten über ihre freigegebenen Dokumente mit strengen Zugriffskontrollen und vollständigen Antwort-Quellenangaben.',
      results: ['Gespart / Person / Woche', 'Belegte Antworten', 'Zugriffskontrollen'],
      quote: { text: 'Er beantwortet in Sekunden, wofür man früher einen halben Vormittag suchte.', author: 'Vertraulich', role: 'Operations Lead' },
    },
  },
  fr: {
    'alpine-fintech': {
      client: 'Alpine Fintech (concept)',
      categoryLabel: 'Web · IA',
      summary: 'Un site marketing multilingue + un assistant IA de support pour une fintech suisse.',
      challenge: 'Une fintech en forte croissance avait besoin d’une présence web crédible et multilingue, et voulait réduire les questions de support répétitives sans recruter.',
      solution: 'Nous avons conçu et développé un site Next.js en quatre langues et livré un assistant propulsé par Claude, entraîné sur leur documentation produit, avec transfert à un humain pour les cas complexes.',
      results: ['Leads qualifiés', 'Tickets de support', 'LCP sur mobile'],
      quote: { text: 'Ils ont livré plus vite que notre feuille de route interne, et l’assistant IA s’est rentabilisé en un mois.', author: 'Confidentiel', role: 'Head of Growth' },
    },
    'gourmet-delivery': {
      client: 'Gourmet Delivery (concept)',
      categoryLabel: 'App · Image de marque',
      summary: 'Identité de marque et application de commande multiplateforme pour un service de repas premium.',
      challenge: 'Un service de repas premium avait des clients fidèles mais un parcours de commande laborieux et une marque incohérente.',
      solution: 'Nous avons refait la marque et livré une app React Native avec un re-commande sans friction, des notifications push et un système de fidélité.',
      results: ['Commandes répétées', 'Note sur les stores', 'Panier moyen'],
      quote: { text: 'Nos clients ont enfin une app aussi premium que la cuisine.', author: 'Confidentiel', role: 'Fondateur' },
    },
    'luxe-watches': {
      client: 'Luxe Watches (concept)',
      categoryLabel: 'Image de marque · SEO',
      summary: 'Une identité raffinée et une refonte SEO pour un détaillant horloger suisse.',
      challenge: 'Un détaillant horloger établi paraissait dépassé en ligne et était invisible sur les requêtes à forte intention.',
      solution: 'Nous avons modernisé l’identité, reconstruit la boutique pour la vitesse et mené un programme SEO technique + contenu ciblant les mots-clés acheteurs.',
      results: ['Trafic organique', 'Positions clés', 'Revenu en ligne'],
    },
    'medtech-portal': {
      client: 'MedTech Portal (concept)',
      categoryLabel: 'IA · Web',
      summary: 'Un assistant de connaissances interne sécurisé pour une entreprise medtech.',
      challenge: 'Le personnel perdait des heures à chercher une documentation interne dispersée entre les systèmes.',
      solution: 'Nous avons construit un assistant RAG privé sur leurs documents approuvés, avec des contrôles d’accès stricts et des citations complètes des réponses.',
      results: ['Gagné / personne / semaine', 'Réponses sourcées', 'Contrôles d’accès'],
      quote: { text: 'Il répond en quelques secondes à ce qui prenait une demi-matinée à trouver.', author: 'Confidentiel', role: 'Responsable des opérations' },
    },
  },
  it: {
    'alpine-fintech': {
      client: 'Alpine Fintech (concept)',
      categoryLabel: 'Web · IA',
      summary: 'Un sito marketing multilingue + un assistente IA di supporto per una fintech svizzera.',
      challenge: 'Una fintech in rapida crescita aveva bisogno di una presenza web credibile e multilingue e voleva ridurre le domande di supporto ripetitive senza assumere.',
      solution: 'Abbiamo progettato e sviluppato un sito Next.js in quattro lingue e rilasciato un assistente basato su Claude, addestrato sulla loro documentazione di prodotto, con passaggio a un umano per i casi complessi.',
      results: ['Lead qualificati', 'Ticket di supporto', 'LCP su mobile'],
      quote: { text: 'Hanno consegnato più velocemente della nostra roadmap interna e l’assistente IA si è ripagato in un mese.', author: 'Riservato', role: 'Head of Growth' },
    },
    'gourmet-delivery': {
      client: 'Gourmet Delivery (concept)',
      categoryLabel: 'App · Branding',
      summary: 'Identità di brand e un’app di ordinazione multipiattaforma per un servizio di pasti premium.',
      challenge: 'Un servizio di pasti premium aveva clienti fedeli ma un flusso di ordinazione macchinoso e un brand incoerente.',
      solution: 'Abbiamo ricostruito il brand e rilasciato un’app React Native con riordino senza attriti, notifiche push e un sistema di fedeltà.',
      results: ['Ordini ripetuti', 'Valutazione sugli store', 'Valore medio ordine'],
      quote: { text: 'I nostri clienti hanno finalmente un’app premium quanto il cibo.', author: 'Riservato', role: 'Fondatore' },
    },
    'luxe-watches': {
      client: 'Luxe Watches (concept)',
      categoryLabel: 'Branding · SEO',
      summary: 'Un’identità raffinata e una revisione SEO per un rivenditore di orologi svizzero.',
      challenge: 'Un rivenditore di orologi affermato appariva datato online ed era invisibile per le ricerche ad alta intenzione.',
      solution: 'Abbiamo modernizzato l’identità, ricostruito lo store per la velocità e gestito un programma di SEO tecnica + contenuti mirato alle keyword d’acquisto.',
      results: ['Traffico organico', 'Posizioni chiave', 'Ricavi online'],
    },
    'medtech-portal': {
      client: 'MedTech Portal (concept)',
      categoryLabel: 'IA · Web',
      summary: 'Un assistente di conoscenza interno e sicuro per un’azienda medtech.',
      challenge: 'Il personale perdeva ore a cercare documentazione interna sparsa tra i sistemi.',
      solution: 'Abbiamo costruito un assistente RAG privato sui loro documenti approvati, con controlli di accesso rigorosi e citazioni complete delle risposte.',
      results: ['Risparmio / persona / settimana', 'Risposte con fonti', 'Controlli di accesso'],
      quote: { text: 'Risponde in secondi a ciò che prima richiedeva mezza mattinata di ricerca.', author: 'Riservato', role: 'Responsabile operazioni' },
    },
  },
  ar: {
    'alpine-fintech': {
      client: 'Alpine Fintech (مفهوم)',
      categoryLabel: 'ويب · ذكاء اصطناعي',
      summary: 'موقع تسويقي متعدد اللغات + مساعد دعم ذكي لشركة فينتك سويسرية.',
      challenge: 'شركة فينتك سريعة النمو احتاجت حضوراً إلكترونياً موثوقاً متعدد اللغات، وأرادت تقليل أسئلة الدعم المتكرّرة دون توظيف.',
      solution: 'صمّمنا وبنينا موقع Next.js بأربع لغات، وأطلقنا مساعداً مدعوماً بـ Claude مُدرَّباً على مستندات منتجهم، مع تحويل للبشر في الحالات المعقّدة.',
      results: ['عملاء مؤهّلون', 'تذاكر الدعم', 'LCP على الموبايل'],
      quote: { text: 'سلّموا أسرع من خارطة طريقنا الداخلية، والمساعد الذكي عوّض تكلفته خلال شهر.', author: 'سرّي', role: 'رئيس النمو' },
    },
    'gourmet-delivery': {
      client: 'Gourmet Delivery (مفهوم)',
      categoryLabel: 'تطبيق · هوية',
      summary: 'هوية علامة وتطبيق طلبات متعدد المنصات لخدمة وجبات فاخرة.',
      challenge: 'خدمة وجبات فاخرة لديها عملاء أوفياء لكن مسار طلب معقّد وهوية غير متّسقة.',
      solution: 'أعدنا بناء العلامة وأطلقنا تطبيق React Native بمسار إعادة طلب سلس وإشعارات وبرنامج ولاء.',
      results: ['الطلبات المتكرّرة', 'تقييم المتجر', 'متوسط قيمة الطلب'],
      quote: { text: 'أخيراً صار لعملائنا تطبيق فاخر بقدر فخامة الطعام.', author: 'سرّي', role: 'المؤسس' },
    },
    'luxe-watches': {
      client: 'Luxe Watches (مفهوم)',
      categoryLabel: 'هوية · سيو',
      summary: 'هوية أنيقة وتحديث شامل للسيو لمتجر ساعات سويسري.',
      challenge: 'متجر ساعات عريق بدا قديماً على الإنترنت وكان غير ظاهر في كلمات البحث عالية النية الشرائية.',
      solution: 'حدّثنا الهوية، وأعدنا بناء المتجر من أجل السرعة، وأدرنا برنامج سيو تقني + محتوى يستهدف كلمات المشترين.',
      results: ['الزيارات العضوية', 'تصدّر الكلمات', 'الإيرادات الإلكترونية'],
    },
    'medtech-portal': {
      client: 'MedTech Portal (مفهوم)',
      categoryLabel: 'ذكاء اصطناعي · ويب',
      summary: 'مساعد معرفة داخلي آمن لشركة تكنولوجيا طبية.',
      challenge: 'كان الموظفون يضيّعون ساعات في البحث ضمن وثائق داخلية مبعثرة عبر أنظمة مختلفة.',
      solution: 'بنينا مساعد RAG خاصاً على مستنداتهم المعتمدة، بضوابط وصول صارمة واستشهادات كاملة للإجابات.',
      results: ['توفير / شخص / أسبوع', 'إجابات موثّقة', 'ضوابط الوصول'],
      quote: { text: 'يجيب في ثوانٍ عمّا كان يستغرق نصف صباح للعثور عليه.', author: 'سرّي', role: 'مدير العمليات' },
    },
  },
};
