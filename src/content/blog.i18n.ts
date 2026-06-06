import type { Locale } from '@/lib/i18n/routing';

/** Localizable blog copy (slug, author, date, accent stay in blog.ts). */
export type BlogCopy = { title: string; excerpt: string; tags: string[]; body: string[] };

export const blogI18n: Partial<Record<Locale, Record<string, BlogCopy>>> = {
  de: {
    'why-swiss-businesses-need-ai-now': {
      title: 'Warum Schweizer Unternehmen KI jetzt einführen sollten — nicht später',
      excerpt: 'KI ist kein Moonshot mehr. Hier ist ein pragmatischer, datenschutzorientierter Einstieg für Schweizer KMU.',
      tags: ['KI', 'Strategie'],
      body: [
        'Die Diskussion um KI hat sich von «sollen wir?» zu «wie, verantwortungsvoll?» verschoben. Für Schweizer Unternehmen hängt die Antwort an drei Dingen: klare Use-Cases, strikter Datenschutz und messbarer ROI.',
        'Fangen Sie klein an. Ein Support-Assistent, der wiederkehrende Fragen abfängt, oder ein internes Tool, das Wissen sofort verfügbar macht, rechnet sich schnell — und baut die Muskeln für grössere Projekte auf.',
        'Entscheidend: Ihre Daten bleiben Ihre. Serverseitige Keys, Datenminimierung und kein Training mit Ihren Daten sind nicht verhandelbar. Das ist der Schweizer Weg — und einfach gutes Engineering.',
      ],
    },
    'building-fast-multilingual-sites': {
      title: 'Schnelle, mehrsprachige Websites bauen, die wirklich ranken',
      excerpt: 'Performance und korrektes hreflang sind in der Schweiz nicht optional. Hier ist unsere Checkliste.',
      tags: ['Web', 'SEO'],
      body: [
        'Ein mehrsprachiger Markt belohnt Websites, die Internationalisierung richtig machen. Das bedeutet locale-präfixierte URLs, vollständige hreflang-Alternativen und übersetzte Metadaten — nicht nur übersetzten Fliesstext.',
        'Performance ist Ranking-Faktor und Conversion-Hebel. Setzen Sie Server Components ein, laden Sie unterhalb des Folds verzögert, optimieren Sie Bilder und halten Sie den Hero-Text im initialen HTML.',
        'Messen Sie alles. Core Web Vitals, Scrolltiefe und CTA-Klicks zeigen, was als Nächstes zu fixen ist — und belegen, dass sich die Arbeit gelohnt hat.',
      ],
    },
  },
  fr: {
    'why-swiss-businesses-need-ai-now': {
      title: 'Pourquoi les entreprises suisses devraient adopter l’IA maintenant — pas plus tard',
      excerpt: 'L’IA n’est plus un pari fou. Voici une approche pragmatique et axée confidentialité pour les PME suisses.',
      tags: ['IA', 'Stratégie'],
      body: [
        'Le débat sur l’IA est passé de « devrions-nous ? » à « comment, de façon responsable ? ». Pour les entreprises suisses, la réponse tient à trois choses : des cas d’usage clairs, une protection stricte des données et un ROI mesurable.',
        'Commencez petit. Un assistant de support qui filtre les questions répétitives, ou un outil interne qui rend la connaissance instantanée, se rentabilise vite — et muscle l’équipe pour de plus grands projets.',
        'Surtout, vos données restent les vôtres. Clés côté serveur, minimisation des données et aucun entraînement sur vos données ne sont pas négociables. C’est la manière suisse — et tout simplement du bon génie logiciel.',
      ],
    },
    'building-fast-multilingual-sites': {
      title: 'Construire des sites multilingues rapides qui se classent vraiment',
      excerpt: 'En Suisse, la performance et un hreflang correct ne sont pas optionnels. Voici notre checklist.',
      tags: ['Web', 'SEO'],
      body: [
        'Un marché multilingue récompense les sites qui réussissent l’internationalisation. Cela signifie des URL préfixées par la langue, des alternatives hreflang complètes et des métadonnées traduites — pas seulement le corps du texte.',
        'La performance est un facteur de classement et un levier de conversion. Utilisez des Server Components, chargez en différé sous la ligne de flottaison, optimisez les images et gardez le texte du hero dans le HTML initial.',
        'Mesurez tout. Les Core Web Vitals, la profondeur de défilement et les clics sur les CTA indiquent quoi corriger ensuite — et prouvent que le travail a payé.',
      ],
    },
  },
  it: {
    'why-swiss-businesses-need-ai-now': {
      title: 'Perché le aziende svizzere dovrebbero adottare l’IA ora — non dopo',
      excerpt: 'L’IA non è più un azzardo. Ecco un approccio pragmatico e attento alla privacy per le PMI svizzere.',
      tags: ['IA', 'Strategia'],
      body: [
        'Il dibattito sull’IA è passato da «dovremmo?» a «come, in modo responsabile?». Per le aziende svizzere la risposta ruota attorno a tre elementi: casi d’uso chiari, protezione rigorosa dei dati e ROI misurabile.',
        'Inizia in piccolo. Un assistente di supporto che filtra le domande ripetitive, o uno strumento interno che rende la conoscenza immediata, si ripaga in fretta — e allena il team a progetti più grandi.',
        'Soprattutto, i tuoi dati restano tuoi. Chiavi lato server, minimizzazione dei dati e nessun addestramento sui tuoi dati non sono negoziabili. È il modo svizzero — ed è semplicemente buona ingegneria.',
      ],
    },
    'building-fast-multilingual-sites': {
      title: 'Costruire siti multilingue veloci che si posizionano davvero',
      excerpt: 'In Svizzera performance e hreflang corretto non sono opzionali. Ecco la nostra checklist.',
      tags: ['Web', 'SEO'],
      body: [
        'Un mercato multilingue premia i siti che fanno bene l’internazionalizzazione. Significa URL con prefisso lingua, alternative hreflang complete e metadati tradotti — non solo il corpo del testo.',
        'La performance è un fattore di posizionamento e una leva di conversione. Usa i Server Components, carica in differita sotto la piega, ottimizza le immagini e mantieni il testo dell’hero nell’HTML iniziale.',
        'Misura tutto. Core Web Vitals, profondità di scroll e clic sui CTA dicono cosa correggere dopo — e dimostrano che il lavoro ha pagato.',
      ],
    },
  },
  ar: {
    'why-swiss-businesses-need-ai-now': {
      title: 'لماذا ينبغي للشركات السويسرية تبنّي الذكاء الاصطناعي الآن — لا لاحقاً',
      excerpt: 'الذكاء الاصطناعي لم يعد مغامرة. إليك مدخلاً عملياً يضع الخصوصية أولاً للشركات السويسرية الصغيرة والمتوسطة.',
      tags: ['ذكاء اصطناعي', 'استراتيجية'],
      body: [
        'تحوّل النقاش حول الذكاء الاصطناعي من «هل نفعل؟» إلى «كيف، وبمسؤولية؟». بالنسبة للشركات السويسرية، تعتمد الإجابة على ثلاثة أمور: حالات استخدام واضحة، وحماية صارمة للبيانات، وعائد قابل للقياس.',
        'ابدأ صغيراً. مساعد دعم يتعامل مع الأسئلة المتكرّرة، أو أداة داخلية تُظهر المعرفة فوراً، يعوّض تكلفته بسرعة — ويبني الخبرة لمشاريع أكبر.',
        'والأهم: تبقى بياناتك ملكك. المفاتيح على الخادم، وتقليل البيانات، وعدم التدريب على بياناتك أمور غير قابلة للتفاوض. هذه هي الطريقة السويسرية — وهي ببساطة هندسة جيدة.',
      ],
    },
    'building-fast-multilingual-sites': {
      title: 'بناء مواقع متعددة اللغات سريعة تتصدّر فعلاً',
      excerpt: 'في سويسرا، الأداء و hreflang الصحيح ليسا اختياريين. إليك قائمتنا.',
      tags: ['ويب', 'سيو'],
      body: [
        'السوق متعدد اللغات يكافئ المواقع التي تتقن التدويل. وهذا يعني روابط مسبوقة باللغة، وبدائل hreflang كاملة، وبيانات وصفية مترجمة — لا مجرد ترجمة المتن.',
        'الأداء عامل ترتيب ورافعة تحويل. استخدم Server Components، وحمِّل ما تحت الطيّة بشكل مؤجّل، وحسّن الصور، وأبقِ نص الواجهة في الـ HTML الأولي.',
        'قِس كل شيء. مؤشرات Core Web Vitals وعمق التمرير ونقرات الـ CTA تخبرك بما يجب إصلاحه تالياً — وتثبت أن العمل أتى بثماره.',
      ],
    },
  },
};
