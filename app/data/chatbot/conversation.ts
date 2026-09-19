import type { ChatNode, Conversation } from "@/app/types/chatbot";
import { contactLinks } from "./contact";

/**
 * ═══════════════════════════════════════════════════════════════════
 *  CHATBOT — the whole conversation lives here
 * ═══════════════════════════════════════════════════════════════════
 *
 *  Every answer is written by hand: no AI, no API, no generated text.
 *
 *  Adding a branch
 *  ───────────────
 *  1. Add a node below with a unique id.
 *  2. Point an option of an existing node at it with `next: "<id>"`.
 *  Nothing else to change — the UI reads this file.
 *
 *  Notes
 *  ─────
 *  • "\n" in a message is kept when rendered.
 *  • `href` options are links (route, "#anchor" or external URL): they open the
 *    link and leave the conversation where it is.
 *  • `collect` stores the picked label in the lead brief, which prefills the form.
 *  • "Back / Home" is added automatically under every node except the welcome one.
 *  • Only real projects and real contact links — never invent a URL.
 */

export const WELCOME_ID = "welcome";

const nodes: ChatNode[] = [
  /* ───────────────────────────── Welcome ───────────────────────────── */
  {
    id: WELCOME_ID,
    hideNav: true,
    message: {
      en: "Hello 👋\nI'm the assistant of Salim's portfolio.\n\nI can help you explore my services, my projects, or talk about your own project.",
      fr: "Bonjour 👋\nJe suis l'assistant du portfolio de Salim.\n\nJe peux vous aider à découvrir mes services, mes projets ou à parler de votre projet.",
    },
    options: [
      {
        label: { en: "Discover my services", fr: "Découvrir mes services" },
        next: "services",
      },
      { label: { en: "See my projects", fr: "Voir mes projets" }, next: "projects" },
      {
        label: { en: "Talk about your project", fr: "Parler de votre projet" },
        next: "brief",
      },
      { label: { en: "More about me", fr: "En savoir plus sur moi" }, next: "about" },
      { label: { en: "Contact me", fr: "Me contacter" }, next: "contact" },
    ],
  },

  /* ───────────────────────────── Services ──────────────────────────── */
  {
    id: "services",
    message: {
      en: "What kind of solution are you looking for?",
      fr: "Quels types de solutions recherchez-vous ?",
    },
    options: [
      { label: { en: "A website", fr: "Site web" }, next: "service_website" },
      {
        label: { en: "Web app / SaaS", fr: "Application web / SaaS" },
        next: "service_saas",
      },
      {
        label: { en: "Business application", fr: "Application métier" },
        next: "service_business",
      },
      { label: { en: "API / Backend", fr: "API / Backend" }, next: "service_api" },
      {
        label: { en: "I don't know yet", fr: "Je ne sais pas encore" },
        next: "service_unsure",
      },
    ],
  },
  {
    id: "service_website",
    collect: "projectType",
    message: {
      en: "What kind of website do you want to build?",
      fr: "Quel type de site souhaitez-vous créer ?",
    },
    options: [
      { label: { en: "Showcase site", fr: "Site vitrine" }, next: "website_answer" },
      { label: { en: "E-commerce", fr: "E-commerce" }, next: "website_answer" },
      {
        label: { en: "Restaurant / Hotel", fr: "Restaurant / Hôtel" },
        next: "website_answer",
      },
      {
        label: { en: "Company / Practice", fr: "Entreprise / Cabinet" },
        next: "website_answer",
      },
      { label: { en: "Something else", fr: "Autre" }, next: "website_answer" },
    ],
  },
  {
    id: "website_answer",
    message: {
      en: "I build modern websites shaped around each activity, with real care for the interface, performance and maintainability.",
      fr: "Je développe des sites modernes adaptés aux besoins de chaque activité, avec une attention particulière portée à l'interface, aux performances et à la maintenabilité.",
    },
    options: [
      { label: { en: "See some projects", fr: "Voir des projets" }, next: "projects" },
      {
        label: { en: "Ready-to-deploy sites", fr: "Sites clés en main" },
        href: "/templates",
      },
      {
        label: { en: "Talk about my project", fr: "Parler de mon projet" },
        next: "brief",
      },
    ],
  },
  {
    id: "service_saas",
    message: {
      en: "Do you already have a precise idea?",
      fr: "Vous avez déjà une idée précise ?",
    },
    options: [
      { label: { en: "Yes", fr: "Oui" }, next: "saas_idea_yes" },
      { label: { en: "Not yet", fr: "Pas encore" }, next: "saas_idea_no" },
    ],
  },
  {
    id: "saas_idea_yes",
    message: {
      en: "Describe your idea briefly.",
      fr: "Décrivez brièvement votre idée.",
    },
    widget: {
      kind: "text",
      placeholder: {
        en: "Your idea in a few words…",
        fr: "Votre idée en quelques mots…",
      },
      next: "saas_idea_captured",
    },
  },
  {
    id: "saas_idea_captured",
    message: {
      en: "Noted, thank you. Leave me your details and I'll come back to you with a clear scope, a timeline and a quote.",
      fr: "C'est noté, merci. Laissez-moi vos coordonnées et je reviens vers vous avec un périmètre clair, un délai et un devis.",
    },
    options: [
      {
        label: { en: "Leave my details", fr: "Laisser mes coordonnées" },
        next: "lead_form",
      },
      { label: { en: "See my SaaS projects", fr: "Voir mes projets SaaS" }, next: "projects_saas" },
    ],
  },
  {
    id: "saas_idea_no",
    message: {
      en: "I can help you define the features and the structure of an application starting from your need.",
      fr: "Je peux vous aider à définir les fonctionnalités et la structure d'une application à partir de votre besoin.",
    },
    options: [
      {
        label: { en: "See my SaaS projects", fr: "Voir mes projets SaaS" },
        next: "projects_saas",
      },
      { label: { en: "Talk about my need", fr: "Parler de mon besoin" }, next: "brief" },
    ],
  },
  {
    id: "service_business",
    collect: "projectType",
    message: {
      en: "Which problem do you want to solve?",
      fr: "Quel problème souhaitez-vous résoudre ?",
    },
    options: [
      {
        label: { en: "Management / Admin", fr: "Gestion / Administration" },
        next: "business_answer",
      },
      { label: { en: "Stock / Rentals", fr: "Stock / Locations" }, next: "business_answer" },
      { label: { en: "Bookings", fr: "Réservations" }, next: "business_answer" },
      { label: { en: "HR / Payroll", fr: "RH / Paie" }, next: "business_answer" },
      { label: { en: "Automation", fr: "Automatisation" }, next: "business_answer" },
      { label: { en: "Something else", fr: "Autre" }, next: "business_answer" },
    ],
  },
  {
    id: "business_answer",
    message: {
      en: "A business application can centralise your operations, cut manual work and structure your data.",
      fr: "Une application métier peut centraliser vos opérations, réduire les tâches manuelles et structurer vos données.",
    },
    options: [
      { label: { en: "See an example", fr: "Voir un exemple" }, next: "projects_management" },
      { label: { en: "Talk about my need", fr: "Parler de mon besoin" }, next: "brief" },
    ],
  },
  {
    id: "service_api",
    collect: "projectType",
    message: {
      en: "What kind of need do you have?",
      fr: "Quel type de besoin avez-vous ?",
    },
    options: [
      { label: { en: "Build an API", fr: "Créer une API" }, next: "api_answer" },
      {
        label: { en: "Integrate several services", fr: "Intégrer plusieurs services" },
        next: "api_answer",
      },
      {
        label: { en: "Connect an application", fr: "Connecter une application" },
        next: "api_answer",
      },
      {
        label: { en: "Automate a process", fr: "Automatiser un processus" },
        next: "api_answer",
      },
      { label: { en: "Something else", fr: "Autre" }, next: "api_answer" },
    ],
  },
  {
    id: "api_answer",
    message: {
      en: "I work with REST APIs, databases and modern web architectures.",
      fr: "Je travaille notamment avec des API REST, des bases de données et des architectures web modernes.",
    },
    options: [
      { label: { en: "See my projects", fr: "Voir mes projets" }, next: "projects" },
      {
        label: { en: "Talk about my project", fr: "Parler de mon projet" },
        next: "brief",
      },
    ],
  },
  {
    id: "service_unsure",
    message: {
      en: "No problem. What is your goal?",
      fr: "Pas de problème. Quel est votre objectif ?",
    },
    options: [
      { label: { en: "Sell online", fr: "Vendre en ligne" }, next: "projects_ecommerce" },
      {
        label: { en: "Present my activity", fr: "Présenter mon activité" },
        next: "service_website",
      },
      {
        label: { en: "Automate my work", fr: "Automatiser mon travail" },
        next: "service_api",
      },
      {
        label: { en: "Build an internal tool", fr: "Créer un outil interne" },
        next: "service_business",
      },
      {
        label: { en: "Launch a new idea", fr: "Créer une nouvelle idée" },
        next: "service_saas",
      },
    ],
  },

  /* ───────────────────────────── Projects ──────────────────────────── */
  {
    id: "projects",
    message: {
      en: "What would you like to see?",
      fr: "Que souhaitez-vous voir ?",
    },
    options: [
      {
        label: { en: "SaaS & applications", fr: "SaaS & applications" },
        next: "projects_saas",
      },
      { label: { en: "E-commerce", fr: "E-commerce" }, next: "projects_ecommerce" },
      {
        label: { en: "Management systems", fr: "Systèmes de gestion" },
        next: "projects_management",
      },
      { label: { en: "All projects", fr: "Tous les projets" }, next: "projects_all" },
    ],
  },
  {
    id: "projects_saas",
    message: {
      en: "Platforms I designed and built end to end:",
      fr: "Des plateformes que j'ai conçues et développées de bout en bout :",
    },
    widget: { kind: "projects", tag: "saas" },
    options: [
      { label: { en: "All case studies", fr: "Toutes les études de cas" }, href: "/portfolio" },
      {
        label: { en: "Talk about my project", fr: "Parler de mon projet" },
        next: "brief",
      },
    ],
  },
  {
    id: "projects_ecommerce",
    message: {
      en: "Custom online stores — storefront and back-office, no off-the-shelf platform:",
      fr: "Des boutiques en ligne sur mesure — vitrine et back-office, sans plateforme clé en main :",
    },
    widget: { kind: "projects", tag: "ecommerce" },
    options: [
      { label: { en: "All case studies", fr: "Toutes les études de cas" }, href: "/portfolio" },
      {
        label: { en: "Talk about my project", fr: "Parler de mon projet" },
        next: "brief",
      },
    ],
  },
  {
    id: "projects_management",
    message: {
      en: "Systems built to run day-to-day operations:",
      fr: "Des systèmes construits pour piloter les opérations au quotidien :",
    },
    widget: { kind: "projects", tag: "management" },
    options: [
      { label: { en: "All case studies", fr: "Toutes les études de cas" }, href: "/portfolio" },
      { label: { en: "Talk about my need", fr: "Parler de mon besoin" }, next: "brief" },
    ],
  },
  {
    id: "projects_all",
    message: {
      en: "Here is everything, with the problem behind each one:",
      fr: "Voici l'ensemble, avec le problème derrière chaque projet :",
    },
    widget: { kind: "projects", tag: "all" },
    options: [
      { label: { en: "All case studies", fr: "Toutes les études de cas" }, href: "/portfolio" },
      {
        label: { en: "Talk about my project", fr: "Parler de mon projet" },
        next: "brief",
      },
    ],
  },

  /* ──────────────────── Talk about your project ───────────────────── */
  {
    id: "brief",
    collect: "projectType",
    message: {
      en: "What kind of project do you have?",
      fr: "Quel type de projet avez-vous ?",
    },
    options: [
      { label: { en: "Website", fr: "Site web" }, next: "brief_stage" },
      { label: { en: "E-commerce", fr: "E-commerce" }, next: "brief_stage" },
      { label: { en: "Web application", fr: "Application web" }, next: "brief_stage" },
      { label: { en: "SaaS", fr: "SaaS" }, next: "brief_stage" },
      {
        label: { en: "Business application", fr: "Application métier" },
        next: "brief_stage",
      },
      { label: { en: "Something else", fr: "Autre" }, next: "brief_stage" },
    ],
  },
  {
    id: "brief_stage",
    collect: "stage",
    message: {
      en: "Where are you right now?",
      fr: "Où en êtes-vous actuellement ?",
    },
    options: [
      { label: { en: "I only have an idea", fr: "J'ai seulement une idée" }, next: "brief_priority" },
      {
        label: { en: "The project is already defined", fr: "J'ai déjà défini le projet" },
        next: "brief_priority",
      },
      {
        label: { en: "I have something to improve", fr: "J'ai un projet existant à améliorer" },
        next: "brief_priority",
      },
      {
        label: { en: "I need to replace a solution", fr: "J'ai besoin de remplacer une solution" },
        next: "brief_priority",
      },
    ],
  },
  {
    id: "brief_priority",
    collect: "priority",
    message: {
      en: "What matters most to you?",
      fr: "Quelle est votre priorité ?",
    },
    options: [
      { label: { en: "Launching quickly", fr: "Créer rapidement" }, next: "brief_budget" },
      { label: { en: "Automating a task", fr: "Automatiser une tâche" }, next: "brief_budget" },
      {
        label: { en: "Improving an existing system", fr: "Améliorer un système existant" },
        next: "brief_budget",
      },
      {
        label: { en: "A fully custom solution", fr: "Développer une solution personnalisée" },
        next: "brief_budget",
      },
      { label: { en: "I don't know yet", fr: "Je ne sais pas encore" }, next: "brief_budget" },
    ],
  },
  {
    id: "brief_budget",
    collect: "budget",
    message: {
      en: "Roughly, what budget do you have in mind?\n\nOptional — it only helps me propose something realistic.",
      fr: "Quel est votre budget approximatif ?\n\nC'est optionnel — cela m'aide simplement à proposer une solution réaliste.",
    },
    options: [
      { label: { en: "Under 100,000 DA", fr: "Moins de 100 000 DA" }, next: "lead_form" },
      { label: { en: "100,000 – 250,000 DA", fr: "100 000 – 250 000 DA" }, next: "lead_form" },
      { label: { en: "250,000 – 500,000 DA", fr: "250 000 – 500 000 DA" }, next: "lead_form" },
      { label: { en: "500,000 DA and above", fr: "500 000 DA et +" }, next: "lead_form" },
      { label: { en: "I don't know yet", fr: "Je ne sais pas encore" }, next: "lead_form" },
      { label: { en: "I'd rather not say", fr: "Je préfère ne pas répondre" }, next: "lead_form" },
    ],
  },
  {
    id: "lead_form",
    message: {
      en: "Thank you. You can now leave me your details and a few words about your project.",
      fr: "Merci. Vous pouvez maintenant me laisser vos coordonnées et quelques informations sur votre projet.",
    },
    widget: { kind: "leadForm", next: "lead_sent" },
  },
  {
    id: "lead_sent",
    message: {
      en: "Your message is on its way — I'll come back to you with a clear scope, a timeline and a quote.",
      fr: "Votre message est parti — je reviens vers vous avec un périmètre clair, un délai et un devis.",
    },
    options: [
      { label: { en: "See my projects", fr: "Voir mes projets" }, next: "projects" },
      { label: { en: "Message me on WhatsApp", fr: "M'écrire sur WhatsApp" }, href: contactLinks.whatsapp },
    ],
  },

  /* ───────────────────────────── About ─────────────────────────────── */
  {
    id: "about",
    message: {
      en: "What would you like to know?",
      fr: "Que souhaitez-vous savoir ?",
    },
    options: [
      { label: { en: "Who am I?", fr: "Qui suis-je ?" }, next: "about_who" },
      { label: { en: "My skills", fr: "Mes compétences" }, next: "about_skills" },
      { label: { en: "How I work", fr: "Ma façon de travailler" }, next: "about_method" },
      { label: { en: "Technologies", fr: "Technologies utilisées" }, next: "about_tech" },
      { label: { en: "My background", fr: "Mon parcours" }, next: "about_path" },
    ],
  },
  {
    id: "about_who",
    message: {
      en: "Salim FARDEHEB — Software Development Engineer & Information Systems Architect.\n\nMore than 3 years of full-stack development, based in Oran, Algeria. I design and build custom web applications end to end: architecture, database, back-end services and interface.",
      fr: "Salim FARDEHEB — Software Development Engineer & Information Systems Architect.\n\nPlus de 3 ans d'expérience en développement full-stack, basé à Oran, en Algérie. Je conçois et développe des applications web sur mesure de bout en bout : architecture, base de données, services back-end et interface.",
    },
    options: [
      { label: { en: "My skills", fr: "Mes compétences" }, next: "about_skills" },
      { label: { en: "Open the About page", fr: "Voir la page À propos" }, href: "/about" },
    ],
  },
  {
    id: "about_skills",
    message: {
      en: "What I work on:\n\n• Web development\n• SaaS applications\n• Information systems architecture\n• APIs & backend\n• Databases\n• UI/UX\n• Automation\n• Business solutions",
      fr: "Mes domaines :\n\n• Développement web\n• Applications SaaS\n• Architecture des systèmes d'information\n• API & backend\n• Bases de données\n• UI/UX\n• Automatisation\n• Solutions métier",
    },
    options: [
      { label: { en: "Technologies", fr: "Technologies utilisées" }, next: "about_tech" },
      { label: { en: "See my projects", fr: "Voir mes projets" }, next: "projects" },
    ],
  },
  {
    id: "about_method",
    message: {
      en: "Always the same method:\n\n1. We frame the need — the problem before the features.\n2. I come back with a clear scope, a timeline and a quote.\n3. I build, you follow the progress.\n4. Go live, then follow-up.\n\nFrom my own projects: 7 to 30 days for a custom store, 2 to 3 months for a management platform, longer for a full SaaS.",
      fr: "Toujours la même méthode :\n\n1. On cadre le besoin — le problème avant les fonctionnalités.\n2. Je reviens avec un périmètre clair, un délai et un devis.\n3. Je développe, vous suivez l'avancement.\n4. Mise en ligne, puis suivi.\n\nD'après mes projets : 7 à 30 jours pour une boutique sur mesure, 2 à 3 mois pour une plateforme de gestion, davantage pour un SaaS complet.",
    },
    options: [
      { label: { en: "See my projects", fr: "Voir mes projets" }, next: "projects" },
      {
        label: { en: "Talk about my project", fr: "Parler de mon projet" },
        next: "brief",
      },
    ],
  },
  {
    id: "about_tech",
    message: {
      en: "What I actually build with:\n\n• Interfaces — React, Next.js, TypeScript, Tailwind CSS\n• Back-end & data — REST APIs, relational databases, UML modelling\n• Machine learning — Python, scikit-learn, LightGBM, FastAPI\n• Delivery — Git, CI/CD, deployment on Vercel",
      fr: "Ce que j'utilise réellement :\n\n• Interfaces — React, Next.js, TypeScript, Tailwind CSS\n• Back-end & données — API REST, bases de données relationnelles, modélisation UML\n• Machine learning — Python, scikit-learn, LightGBM, FastAPI\n• Livraison — Git, CI/CD, déploiement sur Vercel",
    },
    options: [
      {
        label: { en: "Where it is used", fr: "Où c'est utilisé" },
        next: "projects_all",
      },
      { label: { en: "All my services", fr: "Tous mes services" }, href: "/services" },
    ],
  },
  {
    id: "about_path",
    message: {
      en: "More than 3 years designing and building full-stack web applications, from software architecture to the interface.\n\nThe case studies are the honest version of my background: each one shows the problem, what I built and the result.",
      fr: "Plus de 3 ans à concevoir et développer des applications web full-stack, de l'architecture logicielle à l'interface.\n\nLes études de cas sont le meilleur résumé de mon parcours : chacune montre le problème, ce que j'ai construit et le résultat.",
    },
    options: [
      { label: { en: "Read the case studies", fr: "Voir les études de cas" }, href: "/portfolio" },
      { label: { en: "Contact me", fr: "Me contacter" }, next: "contact" },
    ],
  },

  /* ───────────────────────────── Contact ──────────────────────────── */
  {
    id: "contact",
    message: {
      en: "How would you like to reach me?",
      fr: "Comment souhaitez-vous me contacter ?",
    },
    options: [
      { label: { en: "WhatsApp", fr: "WhatsApp" }, href: contactLinks.whatsapp },
      { label: { en: "Email", fr: "Email" }, next: "contact_email" },
      {
        label: { en: "Contact form", fr: "Formulaire de contact" },
        href: contactLinks.form,
      },
      { label: { en: "LinkedIn", fr: "LinkedIn" }, href: contactLinks.linkedin },
      { label: { en: "GitHub", fr: "GitHub" }, href: contactLinks.github },
    ],
  },
  {
    id: "contact_email",
    message: {
      en: "The site's form sends me an email directly — that's the quickest way to reach my inbox.",
      fr: "Le formulaire du site m'envoie directement un e-mail — c'est le plus rapide pour arriver dans ma boîte.",
    },
    options: [
      {
        label: { en: "Open the form", fr: "Ouvrir le formulaire" },
        href: contactLinks.form,
      },
      {
        label: { en: "Leave my details here", fr: "Laisser mes coordonnées ici" },
        next: "lead_form",
      },
    ],
  },
];

export const conversation: Conversation = Object.fromEntries(
  nodes.map((node) => [node.id, node])
);

/**
 * Options pointing at a node that does not exist. Empty at all times — it is
 * checked in development so a typo in `next` is caught on the first render.
 */
export const brokenLinks = (): string[] =>
  nodes.flatMap((node) => {
    const widgetTarget =
      node.widget && node.widget.kind !== "projects" ? node.widget.next : undefined;

    const targets = [
      ...(node.options ?? []).map((option) => option.next),
      widgetTarget,
    ];

    return targets
      .filter((target): target is string => typeof target === "string")
      .filter((target) => !conversation[target])
      .map((target) => `${node.id} → ${target}`);
  });
