/* ============================================================
   SecretariatQuest — Données du programme DEP 5357 (Secrétariat)
   Contenu porté depuis l'app source vers le moteur web (PWA).
   Format moteur: COMPETENCIES[].tiers[].questions[] avec choices[{fr,en,correct}].
   25 modules officiels, 3 paliers par module.
   Les questions QCM sont des EXEMPLES à valider par les enseignants.
   ============================================================ */

const PROGRAM = {
  fr: {
    code: "5357",
    title: "Secrétariat",
    subtitle: "DEP 5357 — 1485 heures — 99 unités"
  },
  en: {
    code: "5357",
    title: "Secretarial Studies",
    subtitle: "DVS 5357 — 1485 hours — 99 credits"
  }
};

function ch(fr, en, correct) { return { fr, en, correct: !!correct }; }

/* Question de type vrai/faux: affirmation à juger. */
function tf(fr, en, isTrue) { return { type: "tf", fr, en, isTrue: !!isTrue }; }

/* Question de type "association de termes": l'élève touche un terme puis
   sa définition correspondante. pairs: tableau de
   { term_fr, term_en, def_fr, def_en }. Toutes les paires doivent être
   associées correctement pour que la question soit considérée réussie. */
function pair(term_fr, term_en, def_fr, def_en) { return { term_fr, term_en, def_fr, def_en }; }
function match(fr, en, pairs) { return { type: "match", fr, en, pairs }; }

/* Question de type "situation complexe" (mise en situation): un court
   scénario réaliste suivi d'un choix multiple basé sur le jugement
   professionnel. Réutilise le même format "choices" qu'un QCM standard. */
function scenario(fr, en, choices) { return { type: "scenario", fr, en, choices }; }

/* Paliers de difficulté d'une quête. Chaque compétence est maintenant
   divisée en 3 paliers progressifs (tiers[]), débloqués l'un après l'autre:
   Débutant -> Intermédiaire -> Avancé. Réussir le palier 1 d'une compétence
   déverrouille la compétence suivante sur la carte; réussir le palier 3
   (Avancé) accorde le badge de maîtrise de la compétence. */

/* Un palier de difficulté d'un module (compat. données source). */
function lvl(level, label_fr, label_en, questions) { return { level, label_fr, label_en, questions }; }

const TIER_META = [
  { level: 1, name_fr: "Débutant", name_en: "Beginner", icon: "🌱" },
  { level: 2, name_fr: "Intermédiaire", name_en: "Intermediate", icon: "⚙️" },
  { level: 3, name_fr: "Avancé", name_en: "Advanced", icon: "🏆" }
];


const COMPETENCIES = [
  {
    id: "secr01", code: "460501", hours: 15, order: 1,
    title_fr: "Métier et formation", title_en: "Trade and Training",
    icon: "🧭",
    tiers: [
      lvl(1, "Facile", "Easy", [
        { fr: "Quel diplôme obtient-on à la fin du programme Secrétariat 5357?", en: "What diploma is awarded at the end of the Secretarial Studies 5357 program?",
          choices: [ ch("Un diplôme d'études professionnelles (DEP)", "A Diploma of Vocational Studies (DVS)", true), ch("Un diplôme d'études collégiales (DEC)", "A Diploma of College Studies (DEC)"), ch("Une attestation d'études collégiales (AEC)", "An Attestation of College Studies (AEC)"), ch("Un baccalauréat", "A Bachelor's degree") ] },
        { fr: "Quel métier ce programme prépare-t-il principalement à exercer?", en: "What trade does this program mainly prepare students for?",
          choices: [ ch("Secrétaire", "Secretary", true), ch("Comptable professionnel agréé (CPA)", "Chartered Professional Accountant (CPA)"), ch("Traducteur professionnel", "Professional Translator"), ch("Notaire", "Notary") ] },
        tf("Le programme Secrétariat 5357 comporte 25 modules.", "The Secretarial Studies 5357 program has 25 modules.", true)
      ]),
      lvl(2, "Intermédiaire", "Intermediate", [
        { fr: "Combien d'heures totalise le programme Secrétariat 5357?", en: "How many hours does the Secretarial Studies 5357 program total?",
          choices: [ ch("1485 heures", "1485 hours", true), ch("1350 heures", "1350 hours"), ch("900 heures", "900 hours"), ch("1800 heures", "1800 hours") ] },
        { fr: "Combien d'unités totalise le programme (1 unité = 15 heures)?", en: "How many credits does the program total (1 credit = 15 hours)?",
          choices: [ ch("99 unités", "99 credits", true), ch("90 unités", "90 credits"), ch("60 unités", "60 credits"), ch("120 unités", "120 credits") ] },
        tf("Le programme est structuré par compétences, formulé par objectifs et découpé en modules.", "The program is structured by competencies, formulated as objectives, and divided into modules.", true)
      ]),
      lvl(3, "Avancé", "Advanced", [
        { fr: "Le module « Intégration au milieu de travail » dure 90 heures. Combien d'unités cela représente-t-il?", en: "The 'Workplace Integration' module lasts 90 hours. How many credits does that represent?",
          choices: [ ch("6 unités", "6 credits", true), ch("8 unités", "8 credits"), ch("5 unités", "5 credits"), ch("10 unités", "10 credits") ] },
        { fr: "Lequel décrit le mieux l'approche du programme Secrétariat?", en: "Which best describes the approach of the Secretarial Studies program?",
          choices: [ ch("Une approche par compétences tenant compte des besoins de formation et de la situation de travail", "A competency-based approach that accounts for training needs and the work situation", true), ch("Un programme théorique sans lien avec le marché du travail", "A theoretical program with no link to the job market"), ch("Une formation universitaire menant à la maîtrise", "University training leading to a Master's degree"), ch("Une formation improvisée par chaque enseignant", "Training improvised by each teacher") ] },
        tf("L'obtention du DEP donne automatiquement le titre de notaire.", "Earning the DVS automatically grants the title of notary.", false)
      ])
    ]
  },
  {
    id: "secr02", code: "460515", hours: 75, order: 2,
    title_fr: "Révision de textes en français", title_en: "French Text Revision",
    icon: "🔍",
    tiers: [
      lvl(1, "Facile", "Easy", [
        { fr: "Quel est le rôle principal de la révision linguistique d'un texte?", en: "What is the main role of proofreading a text?",
          choices: [ ch("Corriger l'orthographe, la grammaire et la syntaxe avant diffusion", "Correcting spelling, grammar and syntax before distribution", true), ch("Changer le sens du texte", "Changing the meaning of the text"), ch("Traduire le texte dans une autre langue", "Translating the text into another language"), ch("Mettre en forme uniquement les images", "Formatting only the images") ] },
        { fr: "Quel outil aide à repérer les fautes d'orthographe dans un traitement de texte?", en: "Which tool helps spot spelling mistakes in a word processor?",
          choices: [ ch("Le correcteur orthographique intégré", "The built-in spell-checker", true), ch("Le correcteur de virus", "The antivirus scanner"), ch("Le gestionnaire de fichiers", "The file manager"), ch("Le pilote d'imprimante", "The printer driver") ] },
        tf("Un correcteur automatique détecte toujours toutes les fautes de grammaire sans supervision humaine.", "An automatic checker always catches every grammar mistake without human oversight.", false)
      ]),
      lvl(2, "Intermédiaire", "Intermediate", [
        { fr: "Quelle phrase respecte l'accord du participe passé?", en: "Which sentence correctly applies past-participle agreement?",
          choices: [ ch("Les documents qu'elle a révisés", "Les documents qu'elle a révisés", true), ch("Les documents qu'elle a révisé", "Les documents qu'elle a révisé"), ch("Les documents qu'elle a révisée", "Les documents qu'elle a révisée"), ch("Les documents qu'elle a réviser", "Les documents qu'elle a réviser") ] },
        { fr: "Que faut-il vérifier quand le sujet d'une phrase est placé après le verbe (ex. « où se trouvent les dossiers »)?", en: "What must be checked when a sentence's subject comes after the verb (e.g. 'where the files are located')?",
          choices: [ ch("Le verbe s'accorde avec le sujet réel même s'il est placé après", "The verb agrees with the real subject even when placed after it", true), ch("Le verbe reste toujours au singulier", "The verb always stays singular"), ch("L'accord ne s'applique pas dans ce cas", "Agreement doesn't apply in this case"), ch("Seul le premier mot compte", "Only the first word matters") ] },
        tf("La révision d'un texte comprend la vérification de la ponctuation.", "Proofreading a text includes checking punctuation.", true)
      ]),
      lvl(3, "Avancé", "Advanced", [
        { fr: "Un texte contient « Les erreurs qu'elle a décelé ». Quelle correction est appropriée?", en: "A text contains 'Les erreurs qu'elle a décelé.' Which correction is appropriate?",
          choices: [ ch("« décelées » (accord avec le COD placé avant le verbe)", "'décelées' (agreement with the direct object placed before the verb)", true), ch("« décelé » reste correct tel quel", "'décelé' is already correct as is"), ch("« déceler » à l'infinitif", "'déceler' in the infinitive"), ch("« décelées » n'est jamais correct", "'décelées' is never correct") ] },
        { fr: "Quelle est la meilleure pratique lors de la révision d'un document rédigé par une autre personne?", en: "What is the best practice when proofreading a document written by someone else?",
          choices: [ ch("Relire à voix haute ou faire une relecture à rebours pour repérer les erreurs", "Reading aloud or reading backwards to catch errors", true), ch("Ignorer les répétitions de mots", "Ignoring repeated words"), ch("Ne relire qu'une seule fois rapidement", "Only skimming it once quickly"), ch("Se fier uniquement au correcteur automatique", "Relying only on the automatic spell-checker") ] },
        tf("Malgré l'utilisation d'un correcteur automatique, une relecture humaine demeure nécessaire.", "Even when using an automatic checker, a human proofreading pass remains necessary.", true)
      ])
    ]
  },
  {
    id: "secr03", code: "460526", hours: 90, order: 3,
    title_fr: "Traitement des textes", title_en: "Word Processing",
    icon: "⌨️",
    tiers: [
      lvl(1, "Facile", "Easy", [
        { fr: "Quelle vitesse de frappe minimale vise généralement l'élève en secrétariat?", en: "What minimum typing speed does a secretarial student generally aim for?",
          choices: [ ch("Environ 25 mots par minute", "About 25 words per minute", true), ch("Environ 5 mots par minute", "About 5 words per minute"), ch("Environ 100 mots par minute", "About 100 words per minute"), ch("Environ 300 mots par minute", "About 300 words per minute") ] },
        { fr: "Quel raccourci clavier sert généralement à mettre du texte en gras?", en: "Which keyboard shortcut is generally used to bold text?",
          choices: [ ch("Ctrl+G (Ctrl+B en anglais)", "Ctrl+B", true), ch("Ctrl+I", "Ctrl+I"), ch("Ctrl+U", "Ctrl+U"), ch("Ctrl+S", "Ctrl+S") ] },
        tf("La méthode de doigté consiste à taper sans regarder le clavier, en utilisant tous les doigts.", "Touch typing means typing without looking at the keyboard, using all fingers.", true)
      ]),
      lvl(2, "Intermédiaire", "Intermediate", [
        { fr: "Que permet la fonction « Rechercher et remplacer » dans un traitement de texte?", en: "What does the 'Find and Replace' function do in a word processor?",
          choices: [ ch("Remplacer automatiquement un mot ou une expression partout dans le document", "Automatically replacing a word or phrase everywhere in the document", true), ch("Corriger automatiquement la grammaire", "Automatically fixing grammar"), ch("Traduire le document", "Translating the document"), ch("Compresser le fichier", "Compressing the file") ] },
        { fr: "Quel élément assure un espacement automatique et une pagination cohérente dans un long document?", en: "What ensures consistent spacing and pagination in a long document?",
          choices: [ ch("Les styles de titres (Titre 1, Titre 2...)", "Heading styles (Heading 1, Heading 2...)", true), ch("La police par défaut", "The default font"), ch("Le mode brouillon", "Draft mode"), ch("Le niveau de zoom", "The zoom level") ] },
        tf("Les styles n'ont aucun lien avec la génération automatique d'une table des matières; il faut toujours la faire manuellement.", "Styles have no connection to automatically generating a table of contents; it must always be done manually.", false)
      ]),
      lvl(3, "Avancé", "Advanced", [
        { fr: "Un document de 40 pages doit avoir une numérotation reprenant à 1 après la page de titre. Quelle fonction utiliser?", en: "A 40-page document needs page numbering that restarts at 1 after the title page. Which feature is used?",
          choices: [ ch("Insérer un saut de section, puis configurer la numérotation de cette section", "Inserting a section break, then configuring that section's page numbering", true), ch("Insérer un simple saut de page", "Inserting a simple page break"), ch("Appuyer sur Entrée plusieurs fois", "Pressing Enter several times"), ch("Renommer le fichier", "Renaming the file") ] },
        { fr: "Quelle pratique assure la cohérence de mise en forme dans un document produit par plusieurs personnes?", en: "What ensures consistent formatting in a document produced by several people?",
          choices: [ ch("Utiliser un modèle (gabarit) avec des styles prédéfinis", "Using a template with predefined styles", true), ch("Laisser chacun choisir sa propre police", "Letting everyone choose their own font"), ch("Ignorer la mise en forme jusqu'à la fin", "Ignoring formatting until the end"), ch("Imprimer avant de vérifier", "Printing before checking anything") ] },
        tf("Le mode « Suivi des modifications » masque toujours l'identité du réviseur qui a fait chaque changement.", "'Track Changes' mode always hides the identity of the reviewer who made each change.", false)
      ])
    ]
  },
  {
    id: "secr04", code: "460534", hours: 60, order: 4,
    title_fr: "Qualité du français écrit", title_en: "Quality of Written French",
    icon: "✅",
    tiers: [
      lvl(1, "Facile", "Easy", [
        { fr: "Quel mot est correctement orthographié?", en: "Which word is spelled correctly?",
          choices: [ ch("développer", "développer", true), ch("dévellopper", "dévellopper"), ch("développper", "développper"), ch("dévelloper", "dévelloper") ] },
        { fr: "Quel mot complète correctement: « Je vais ____ bureau chercher le dossier. »?", en: "Which word correctly completes: 'Je vais ____ bureau chercher le dossier.'?",
          choices: [ ch("au", "au", true), ch("haut", "haut"), ch("eau", "eau"), ch("oh", "oh") ] },
        tf("« Ces derniers » et « ses derniers » ont le même sens.", "'Ces derniers' and 'ses derniers' mean the same thing.", false)
      ]),
      lvl(2, "Intermédiaire", "Intermediate", [
        { fr: "Quelle phrase est correcte?", en: "Which sentence is correct?",
          choices: [ ch("Malgré leurs erreurs, ils ont continué.", "Malgré leurs erreurs, ils ont continué.", true), ch("Malgré leur erreurs, ils ont continué.", "Malgré leur erreurs, ils ont continué."), ch("Malgré leurs erreur, ils ont continué.", "Malgré leurs erreur, ils ont continué."), ch("Malgré leur erreur, ils ont continués.", "Malgré leur erreur, ils ont continués.") ] },
        { fr: "Quel est le féminin correct de « professionnel »?", en: "What is the correct feminine form of 'professionnel'?",
          choices: [ ch("professionnelle", "professionnelle", true), ch("professionele", "professionele"), ch("professionnel", "professionnel"), ch("professionnele", "professionnele") ] },
        tf("« Quelque » s'accorde en genre et en nombre quand il est adjectif.", "'Quelque' agrees in gender and number when used as an adjective.", true)
      ]),
      lvl(3, "Avancé", "Advanced", [
        { fr: "Repérez la phrase sans faute:", en: "Identify the sentence without an error:",
          choices: [ ch("Les deux employées se sont parlé.", "Les deux employées se sont parlé.", true), ch("Les deux employées se sont parlées.", "Les deux employées se sont parlées."), ch("Les deux employées se sont parler.", "Les deux employées se sont parler."), ch("Les deux employées se sont parlées à.", "Les deux employées se sont parlées à.") ] },
        { fr: "Pourquoi « Ils se sont lavé les mains » ne prend-il pas d'accord sur le participe passé?", en: "Why doesn't the past participle agree in 'Ils se sont lavé les mains'?",
          choices: [ ch("Le complément d'objet direct (les mains) est placé après le verbe", "The direct object (the hands) comes after the verb", true), ch("Le verbe est toujours invariable", "The verb is always invariable"), ch("Il s'agit d'un verbe intransitif", "It's an intransitive verb"), ch("C'est une exception sans raison précise", "It's an exception with no particular reason") ] },
        tf("« Malgré que » est une formulation fautive en français standard; on préfère « bien que ».", "'Malgré que' is considered incorrect in standard French; 'bien que' is preferred.", true)
      ])
    ]
  },
  {
    id: "secr05", code: "460544", hours: 60, order: 5,
    title_fr: "Service à la clientèle", title_en: "Customer Service",
    icon: "🤝",
    tiers: [
      lvl(1, "Facile", "Easy", [
        { fr: "Lorsqu'un visiteur se présente à la réception, la priorité est de...", en: "When a visitor arrives at the reception desk, the priority is to...",
          choices: [ ch("L'accueillir avec courtoisie et s'informer de sa demande", "Greet them courteously and find out what they need", true), ch("Continuer sa tâche avant de le saluer", "Finish your task before acknowledging them"), ch("Lui demander d'attendre sans le saluer", "Ask them to wait without greeting them"), ch("L'ignorer s'il n'a pas de rendez-vous", "Ignore them if they have no appointment") ] },
        { fr: "Au téléphone, il faut...", en: "On the phone, you should...",
          choices: [ ch("Se nommer et nommer l'entreprise dès la réponse", "State your name and the company name right away", true), ch("Répondre sans se présenter", "Answer without introducing yourself"), ch("Laisser sonner longtemps avant de répondre", "Let it ring for a long time before answering"), ch("Raccrocher si on ne reconnaît pas le numéro", "Hang up if you don't recognize the number") ] },
        tf("L'écoute active consiste à reformuler pour confirmer sa compréhension.", "Active listening means rephrasing to confirm understanding.", true)
      ]),
      lvl(2, "Intermédiaire", "Intermediate", [
        { fr: "Un client insiste pour parler à une personne absente. La bonne pratique est de...", en: "A client insists on speaking to someone who is out. The right approach is to...",
          choices: [ ch("Proposer de prendre un message précis ou de rediriger vers une personne disponible", "Offer to take a detailed message or redirect them to someone available", true), ch("Dire simplement de rappeler plus tard", "Simply tell them to call back later"), ch("Raccrocher poliment", "Politely hang up"), ch("Ignorer la demande", "Ignore the request") ] },
        { fr: "Comment gérer un appel alors qu'on est déjà en ligne avec quelqu'un d'autre?", en: "How should you handle a call while already on the line with someone else?",
          choices: [ ch("Mettre le premier interlocuteur en attente poliment après lui avoir demandé la permission", "Politely put the first caller on hold after asking their permission", true), ch("Raccrocher avec le premier interlocuteur", "Hang up on the first caller"), ch("Ignorer le deuxième appel", "Ignore the second call"), ch("Répondre aux deux en même temps", "Answer both at the same time") ] },
        tf("Le ton de voix n'a aucune influence sur la perception du service au téléphone; seuls les mots comptent.", "Tone of voice has no influence on how service is perceived over the phone; only the words matter.", false)
      ]),
      lvl(3, "Avancé", "Advanced", [
        { fr: "Un client se plaint fortement d'un retard de livraison au téléphone. Quelle est la meilleure réaction?", en: "A client strongly complains about a delayed delivery on the phone. What is the best reaction?",
          choices: [ ch("Rester calme, reconnaître le problème et proposer une solution ou un suivi", "Stay calm, acknowledge the issue and offer a solution or follow-up", true), ch("Raccrocher", "Hang up"), ch("Argumenter fermement", "Argue firmly"), ch("Promettre quelque chose sans vérifier", "Promise something without checking") ] },
        { fr: "Deux visiteurs arrivent en même temps, l'un avec rendez-vous, l'autre sans. Quelle est la bonne priorité?", en: "Two visitors arrive at the same time, one with an appointment and one without. What is the right priority?",
          choices: [ ch("Accueillir les deux, informer poliment celui sans rendez-vous du délai d'attente", "Greet both, politely informing the one without an appointment of the wait", true), ch("Ignorer celui sans rendez-vous", "Ignore the one without an appointment"), ch("Faire attendre celui qui a rendez-vous", "Make the one with an appointment wait"), ch("Refuser l'accès à celui sans rendez-vous", "Refuse entry to the one without an appointment") ] },
        tf("La confidentialité s'applique aussi aux conversations tenues à la réception.", "Confidentiality also applies to conversations held at the reception desk.", true)
      ])
    ]
  },
  {
    id: "secr06", code: "460554", hours: 60, order: 6,
    title_fr: "Gestion documentaire", title_en: "Records Management",
    icon: "🗂️",
    tiers: [
      lvl(1, "Facile", "Easy", [
        { fr: "Quel système de classement utilise l'ordre alphabétique des noms de dossiers?", en: "Which filing system uses the alphabetical order of file names?",
          choices: [ ch("Le classement alphabétique", "Alphabetical filing", true), ch("Le classement chronologique seul", "Chronological filing alone"), ch("Le classement par couleur seule", "Colour-only filing"), ch("Le classement au hasard", "Random filing") ] },
        { fr: "Un dossier « actif » désigne...", en: "An 'active' file refers to...",
          choices: [ ch("Un dossier consulté régulièrement et conservé à portée de main", "A file used regularly and kept close at hand", true), ch("Un dossier fermé définitivement", "A file permanently closed"), ch("Un dossier vide", "An empty file"), ch("Un dossier personnel", "A personal file") ] },
        tf("Le classement numérique utilise un index pour retrouver les dossiers.", "Numerical filing uses an index to find files.", true)
      ]),
      lvl(2, "Intermédiaire", "Intermediate", [
        { fr: "Quelle méthode de classement convient bien pour des dossiers clients quand plusieurs partagent le même nom de famille?", en: "Which filing method works well for client files when several share the same last name?",
          choices: [ ch("Un classement alphanumérique avec un numéro de client unique", "Alphanumeric filing with a unique client number", true), ch("Un classement uniquement par prénom", "Filing only by first name"), ch("Un classement par couleur du dossier", "Filing by folder colour"), ch("Un classement sans aucun ordre", "Filing with no order at all") ] },
        { fr: "Quel document guide les décisions sur la durée de conservation et la destruction des dossiers?", en: "Which document guides decisions on how long to keep files and when to destroy them?",
          choices: [ ch("Le calendrier de conservation des documents", "The records retention schedule", true), ch("La liste des employés", "The employee list"), ch("Le carnet d'adresses", "The address book"), ch("Le registre des visiteurs", "The visitor log") ] },
        tf("Un document classé au mauvais endroit reste toujours facile à retrouver grâce à la recherche par mot-clé.", "A misfiled document is always easy to find thanks to keyword search.", false)
      ]),
      lvl(3, "Avancé", "Advanced", [
        { fr: "Une entreprise numérise ses dossiers papier. Quelle pratique assure qu'on retrouve un document facilement dans le système électronique?", en: "A company digitizes its paper files. What practice ensures a document is easily found in the electronic system?",
          choices: [ ch("Nommer les fichiers selon une convention cohérente (date, client, type)", "Naming files according to a consistent convention (date, client, type)", true), ch("Nommer les fichiers au hasard", "Naming files randomly"), ch("Garder tous les fichiers dans un seul dossier sans sous-dossiers", "Keeping all files in a single folder with no subfolders"), ch("Ne pas nommer les fichiers du tout", "Not naming files at all") ] },
        { fr: "Un dossier arrive à la fin de sa période de conservation légale. Que faire selon les bonnes pratiques?", en: "A file reaches the end of its legal retention period. What should be done according to best practice?",
          choices: [ ch("Consulter le calendrier de conservation avant de détruire ou d'archiver", "Consult the retention schedule before destroying or archiving it", true), ch("Le détruire immédiatement sans vérification", "Destroy it immediately without checking"), ch("Le laisser indéfiniment sans décision", "Leave it indefinitely with no decision"), ch("Le donner à un employé", "Give it to an employee") ] },
        tf("La gestion documentaire moderne se limite aux documents électroniques; le papier n'est plus considéré.", "Modern records management is limited to electronic documents; paper is no longer considered.", false)
      ])
    ]
  },
  {
    id: "secr07", code: "460562", hours: 30, order: 7,
    title_fr: "Production de feuilles de calcul", title_en: "Producing Spreadsheets",
    icon: "📈",
    tiers: [
      lvl(1, "Facile", "Easy", [
        { fr: "Quelle fonction Excel additionne automatiquement une plage de cellules?", en: "Which Excel function automatically adds up a range of cells?",
          choices: [ ch("SOMME (SUM)", "SUM", true), ch("MOYENNE (AVERAGE)", "AVERAGE"), ch("NB (COUNT)", "COUNT"), ch("RECHERCHEV (VLOOKUP)", "VLOOKUP") ] },
        { fr: "Que signifie l'utilisation du symbole $ dans une référence Excel comme $A$1?", en: "What does the $ symbol mean in an Excel reference like $A$1?",
          choices: [ ch("Une référence absolue (fixe)", "An absolute (fixed) reference", true), ch("Une référence relative", "A relative reference"), ch("Une erreur de formule", "A formula error"), ch("Un format monétaire", "A currency format") ] },
        tf("RECHERCHEV (VLOOKUP) sert à retrouver une valeur dans un tableau à partir d'une clé de recherche.", "VLOOKUP is used to find a value in a table based on a lookup key.", true)
      ]),
      lvl(2, "Intermédiaire", "Intermediate", [
        { fr: "Quelle fonction calcule la moyenne d'une plage de cellules?", en: "Which function calculates the average of a range of cells?",
          choices: [ ch("MOYENNE (AVERAGE)", "AVERAGE", true), ch("SOMME (SUM)", "SUM"), ch("NB (COUNT)", "COUNT"), ch("MAX", "MAX") ] },
        { fr: "Une formule =A1+B1 est copiée de la cellule C1 vers C2. Que devient-elle en C2?", en: "A formula =A1+B1 is copied from cell C1 to C2. What does it become in C2?",
          choices: [ ch("=A2+B2", "=A2+B2", true), ch("=A1+B1", "=A1+B1"), ch("=A2+B1", "=A2+B1"), ch("=A1+B2", "=A1+B2") ] },
        tf("NB.SI (COUNTIF) additionne toujours les valeurs numériques d'une plage, peu importe le critère.", "COUNTIF always sums the numeric values in a range, regardless of the criterion.", false)
      ]),
      lvl(3, "Avancé", "Advanced", [
        { fr: "Pour verrouiller uniquement la colonne dans une référence lors d'une copie, laquelle écrire?", en: "To lock only the column in a reference when copying, which one should you write?",
          choices: [ ch("$A1", "$A1", true), ch("A$1", "A$1"), ch("$A$1", "$A$1"), ch("A1", "A1") ] },
        { fr: "Quelle combinaison permet de rechercher une valeur même si la colonne recherchée n'est pas la première du tableau?", en: "Which combination finds a value even when the lookup column isn't the first one in the table?",
          choices: [ ch("INDEX et ÉQUIV (INDEX/MATCH)", "INDEX and MATCH", true), ch("RECHERCHEV seul", "VLOOKUP alone"), ch("SOMME.SI (SUMIF)", "SUMIF"), ch("NB.SI (COUNTIF)", "COUNTIF") ] },
        tf("Un tableau croisé dynamique permet de résumer de grandes quantités de données sans modifier les données sources.", "A pivot table can summarize large amounts of data without altering the source data.", true)
      ])
    ]
  },
  {
    id: "secr08", code: "460572", hours: 30, order: 8,
    title_fr: "Conception de présentations", title_en: "Designing Presentations",
    icon: "🖥️",
    tiers: [
      lvl(1, "Facile", "Easy", [
        { fr: "Quel type de logiciel sert typiquement à créer une présentation à diapositives?", en: "What type of software is typically used to create a slide presentation?",
          choices: [ ch("Un logiciel de présentation (ex. PowerPoint)", "Presentation software (e.g. PowerPoint)", true), ch("Un tableur", "A spreadsheet program"), ch("Un lecteur multimédia seul", "A media player alone"), ch("Un antivirus", "An antivirus program") ] },
        { fr: "Pour rester lisible, une diapositive devrait généralement contenir...", en: "To stay readable, a slide should generally contain...",
          choices: [ ch("Peu de texte, l'essentiel seulement", "Little text, just the essentials", true), ch("Le plus de texte possible", "As much text as possible"), ch("Aucune limite de texte", "No text limit at all"), ch("Un seul très long paragraphe", "One very long paragraph") ] },
        tf("Une diapositive surchargée de texte nuit à la compréhension du public.", "A slide overloaded with text hurts audience comprehension.", true)
      ]),
      lvl(2, "Intermédiaire", "Intermediate", [
        { fr: "Quel élément assure la cohérence visuelle entre toutes les diapositives d'une présentation?", en: "What ensures visual consistency across all the slides of a presentation?",
          choices: [ ch("Un modèle (thème) de diapositive uniforme", "A uniform slide template (theme)", true), ch("Une police différente à chaque diapositive", "A different font on every slide"), ch("Des couleurs choisies au hasard", "Randomly chosen colours"), ch("Aucun élément particulier", "No particular element") ] },
        { fr: "Quelle pratique améliore la lisibilité d'une présentation projetée dans une grande salle?", en: "What practice improves readability of a presentation projected in a large room?",
          choices: [ ch("Utiliser une police et une taille de texte suffisamment grandes", "Using a large enough font and text size", true), ch("Utiliser la plus petite police possible", "Using the smallest possible font"), ch("Éviter les contrastes de couleur", "Avoiding colour contrast"), ch("Éteindre les lumières de la salle uniquement", "Only turning off the room lights") ] },
        tf("Ajouter le plus d'animations possible rend toujours une présentation plus professionnelle.", "Adding as many animations as possible always makes a presentation look more professional.", false)
      ]),
      lvl(3, "Avancé", "Advanced", [
        { fr: "Un collègue veut insérer un graphique Excel qui se met à jour automatiquement si les données changent. Quelle méthode utiliser?", en: "A colleague wants to insert an Excel chart that updates automatically if the data changes. Which method should be used?",
          choices: [ ch("Coller le graphique en le liant à la source Excel (liaison)", "Pasting the chart linked to the Excel source", true), ch("Coller le graphique comme une image statique", "Pasting the chart as a static image"), ch("Prendre une capture d'écran du graphique", "Taking a screenshot of the chart"), ch("Retaper les données manuellement chaque fois", "Retyping the data manually every time") ] },
        { fr: "Quelle est la meilleure pratique pour préparer une présentation destinée à être présentée par une autre personne?", en: "What is the best practice when preparing a presentation meant to be delivered by someone else?",
          choices: [ ch("Ajouter des notes du présentateur claires et complètes", "Adding clear and complete presenter notes", true), ch("Ne rien ajouter et laisser deviner", "Adding nothing and letting them guess"), ch("Utiliser uniquement des images sans texte", "Using only images with no text"), ch("Retirer les titres des diapositives", "Removing the slide titles") ] },
        tf("Une présentation bien conçue reste utile même sans la personne qui l'a créée, grâce aux notes.", "A well-designed presentation remains useful even without its creator, thanks to the notes.", true)
      ])
    ]
  },
  {
    id: "secr09", code: "460584", hours: 60, order: 9,
    title_fr: "Rédaction de textes en français", title_en: "Writing Professional Texts in French",
    icon: "📝",
    tiers: [
      lvl(1, "Facile", "Easy", [
        { fr: "Quelle est la première étape avant de rédiger un texte professionnel?", en: "What is the first step before writing a professional text?",
          choices: [ ch("Déterminer l'objectif et le destinataire du texte", "Determining the text's purpose and intended reader", true), ch("Choisir la police de caractères", "Choosing the font"), ch("Imprimer une version brouillon", "Printing a draft version"), ch("Ajouter des images", "Adding images") ] },
        { fr: "Un texte professionnel bien structuré comprend généralement...", en: "A well-structured professional text generally includes...",
          choices: [ ch("Une introduction, un développement et une conclusion", "An introduction, a body and a conclusion", true), ch("Seulement une liste de mots-clés", "Only a list of keywords"), ch("Uniquement des images", "Only images"), ch("Aucune structure particulière", "No particular structure") ] },
        tf("Dans un texte d'affaires, on privilégie des phrases courtes et claires.", "In business writing, short and clear sentences are preferred.", true)
      ]),
      lvl(2, "Intermédiaire", "Intermediate", [
        { fr: "Quel style convient à un courriel professionnel?", en: "Which style suits a professional email?",
          choices: [ ch("Clair, poli et concis", "Clear, polite and concise", true), ch("Familier et abrégé", "Casual and abbreviated"), ch("Long et sans structure", "Long and unstructured"), ch("Rempli d'émojis", "Full of emojis") ] },
        { fr: "Quelle formule de politesse convient pour clore une lettre d'affaires formelle?", en: "Which closing is most appropriate for a formal business letter?",
          choices: [ ch("Nous vous prions d'agréer, Madame, l'expression de nos salutations distinguées.", "Nous vous prions d'agréer, Madame, l'expression de nos salutations distinguées.", true), ch("Salut, à plus!", "Salut, à plus!"), ch("Bien à toi mon chum", "Bien à toi mon chum"), ch("OK merci bye", "OK merci bye") ] },
        tf("La relecture avant l'envoi n'est utile que pour les très longs textes, jamais pour les courriels courts.", "Proofreading before sending is only useful for very long texts, never for short emails.", false)
      ]),
      lvl(3, "Avancé", "Advanced", [
        { fr: "Quelle phrase respecte le mieux la concordance des temps?", en: "Which sentence best respects tense agreement?",
          choices: [ ch("Elle a dit qu'elle enverrait la facture demain.", "Elle a dit qu'elle enverrait la facture demain.", true), ch("Elle a dit qu'elle enverra la facture hier.", "Elle a dit qu'elle enverra la facture hier."), ch("Elle dit qu'elle avait envoyé demain.", "Elle dit qu'elle avait envoyé demain."), ch("Elle disait qu'elle enverrait hier.", "Elle disait qu'elle enverrait hier.") ] },
        { fr: "Un rapport interne doit convaincre la direction d'adopter une nouvelle procédure. Quelle structure est la plus efficace?", en: "An internal report must convince management to adopt a new procedure. Which structure is most effective?",
          choices: [ ch("Présenter le problème, les options envisagées et une recommandation appuyée par des faits", "Presenting the problem, the options considered, and a fact-based recommendation", true), ch("Présenter uniquement une opinion personnelle", "Presenting only a personal opinion"), ch("Éviter toute recommandation", "Avoiding any recommendation"), ch("Présenter les faits sans conclusion", "Presenting the facts with no conclusion") ] },
        tf("Un texte rédigé pour la direction devrait toujours inclure le plus de détails possible, peu importe la longueur.", "A text written for management should always include as much detail as possible, regardless of length.", false)
      ])
    ]
  },
  {
    id: "secr10", code: "460596", hours: 90, order: 10,
    title_fr: "Opérations comptables", title_en: "Accounting Operations",
    icon: "🧾",
    tiers: [
      lvl(1, "Facile", "Easy", [
        { fr: "Quelle pièce justificative prouve un achat à crédit fait à un fournisseur?", en: "Which source document proves a credit purchase made from a supplier?",
          choices: [ ch("La facture d'achat", "The purchase invoice", true), ch("Le relevé bancaire", "The bank statement"), ch("Le bon de commande seul", "The purchase order alone"), ch("La carte professionnelle", "The business card") ] },
        { fr: "Un dépôt bancaire doit être accompagné de...", en: "A bank deposit must be accompanied by...",
          choices: [ ch("Un bordereau de dépôt détaillant les chèques et l'argent comptant", "A deposit slip detailing the cheques and cash", true), ch("Une facture de vente", "A sales invoice"), ch("Un relevé de paie", "A pay stub"), ch("Un bon de commande", "A purchase order") ] },
        tf("Chaque écriture comptable doit toujours respecter l'égalité débit = crédit.", "Every accounting entry must always respect the equality debit = credit.", true)
      ]),
      lvl(2, "Intermédiaire", "Intermediate", [
        { fr: "Le suivi des comptes clients par ancienneté (« aging ») sert à...", en: "Accounts receivable aging is used to...",
          choices: [ ch("Repérer les comptes en retard de paiement", "Identify overdue accounts", true), ch("Calculer la paie", "Calculate payroll"), ch("Remplir la déclaration de revenus", "Fill out the tax return"), ch("Choisir un fournisseur", "Choose a supplier") ] },
        { fr: "Une note de crédit émise à un client sert à...", en: "A credit note issued to a customer is used to...",
          choices: [ ch("Réduire le solde dû suite à un retour ou un rabais", "Reduce the balance owed following a return or an allowance", true), ch("Augmenter la dette du client", "Increase the customer's debt"), ch("Remplacer une facture normale", "Replace a normal invoice"), ch("Annuler un paiement de paie", "Cancel a payroll payment") ] },
        tf("Le grand livre auxiliaire des comptes clients présente uniquement un solde global, sans détail par client.", "The accounts receivable subsidiary ledger only shows an overall balance, with no detail by client.", false)
      ]),
      lvl(3, "Avancé", "Advanced", [
        { fr: "Une facture reçue indique un montant différent du bon de commande. Quelle est la bonne pratique?", en: "A received invoice shows an amount different from the purchase order. What is the correct practice?",
          choices: [ ch("Comparer bon de commande, bon de réception et facture avant de payer", "Compare the purchase order, receiving report and invoice before paying", true), ch("Payer immédiatement le montant facturé", "Pay the invoiced amount immediately"), ch("Ignorer l'écart", "Ignore the discrepancy"), ch("Modifier la facture soi-même", "Alter the invoice yourself") ] },
        { fr: "Un rapport d'ancienneté des comptes clients montre plusieurs comptes en retard de plus de 90 jours. Quelle est l'action appropriée?", en: "An accounts receivable aging report shows several accounts over 90 days late. What is the appropriate action?",
          choices: [ ch("Signaler ces comptes au superviseur et amorcer un suivi de recouvrement", "Flag these accounts to the supervisor and start a collection follow-up", true), ch("Radier automatiquement les comptes", "Automatically write off the accounts"), ch("Ignorer le rapport", "Ignore the report"), ch("Augmenter leur limite de crédit", "Increase their credit limit") ] },
        tf("Une secrétaire peut être responsable du suivi des comptes fournisseurs et clients en plus de ses tâches administratives.", "A secretary may be responsible for accounts payable and receivable follow-up in addition to administrative duties.", true)
      ])
    ]
  },
  {
    id: "secr11", code: "460605", hours: 75, order: 11,
    title_fr: "Production de lettres", title_en: "Producing Letters",
    icon: "✉️",
    tiers: [
      lvl(1, "Facile", "Easy", [
        { fr: "Dans une lettre d'affaires, où se place généralement la date?", en: "In a business letter, where is the date usually placed?",
          choices: [ ch("En haut de la lettre, souvent alignée à droite", "At the top of the letter, often right-aligned", true), ch("Au bas de la lettre", "At the bottom of the letter"), ch("Dans la marge gauche seulement", "In the left margin only"), ch("Après la signature", "After the signature") ] },
        { fr: "Quel élément identifie clairement le destinataire d'une lettre d'affaires?", en: "Which element clearly identifies the recipient of a business letter?",
          choices: [ ch("La vedette (nom et adresse du destinataire)", "The inside address (recipient's name and address)", true), ch("L'objet seul", "The subject line alone"), ch("Le post-scriptum", "The postscript"), ch("La formule de salutation seulement", "The closing salutation alone") ] },
        tf("Le style « bloc » aligne tous les éléments de la lettre à la marge gauche, sans retrait.", "The 'block' style aligns every element of the letter to the left margin, with no indentation.", true)
      ]),
      lvl(2, "Intermédiaire", "Intermediate", [
        { fr: "Que signifie la mention « p. j. » dans une lettre?", en: "What does the abbreviation 'encl.' mean in a letter?",
          choices: [ ch("Pièce(s) jointe(s)", "Enclosure(s)", true), ch("Pour information", "For information"), ch("Personnel et joint", "Personal and joint"), ch("Priorité jointe", "Joint priority") ] },
        { fr: "L'objet d'une lettre sert à...", en: "The subject line of a letter is used to...",
          choices: [ ch("Résumer brièvement son contenu", "Briefly summarize its content", true), ch("Remplacer la signature", "Replace the signature"), ch("Indiquer le nombre de pages", "Indicate the number of pages"), ch("Servir de formule de salutation", "Serve as the closing salutation") ] },
        tf("Une lettre professionnelle formelle peut se terminer directement par la signature, sans formule de salutation.", "A formal professional letter can end directly with the signature, with no closing salutation.", false)
      ]),
      lvl(3, "Avancé", "Advanced", [
        { fr: "Dans une lettre avec copie conforme envoyée à une troisième personne, quelle mention utilise-t-on?", en: "In a letter with a copy sent to a third party, which notation is used?",
          choices: [ ch("« c. c. »", "'cc'", true), ch("« p. j. »", "'encl.'"), ch("« N/Réf. »", "'Our ref.'"), ch("« À l'att. de »", "'Attn:'") ] },
        { fr: "Une lettre professionnelle contient une erreur d'adresse dans la vedette. Quelle est la meilleure pratique?", en: "A professional letter has an address error in the inside address. What is the best practice?",
          choices: [ ch("Corriger et réimprimer avant l'envoi", "Correct it and reprint before sending", true), ch("Envoyer telle quelle", "Send it as is"), ch("Ajouter une note manuscrite", "Add a handwritten note"), ch("Ignorer l'erreur", "Ignore the error") ] },
        tf("Le style « semi-bloc » indente le premier paragraphe, contrairement au style bloc.", "The 'semi-block' style indents the first line of paragraphs, unlike the block style.", true)
      ])
    ]
  },
  {
    id: "secr12", code: "460613", hours: 45, order: 12,
    title_fr: "Création de bases de données", title_en: "Creating Databases",
    icon: "🗄️",
    tiers: [
      lvl(1, "Facile", "Easy", [
        { fr: "Dans une base de données, une ligne représente généralement...", en: "In a database, a row generally represents...",
          choices: [ ch("Un enregistrement", "A record", true), ch("Un champ", "A field"), ch("Une base de données entière", "An entire database"), ch("Un rapport", "A report") ] },
        { fr: "Dans une base de données, une colonne représente généralement...", en: "In a database, a column generally represents...",
          choices: [ ch("Un champ", "A field", true), ch("Un enregistrement", "A record"), ch("Une requête", "A query"), ch("Un formulaire", "A form") ] },
        tf("Une clé primaire identifie de façon unique chaque enregistrement d'une table.", "A primary key uniquely identifies each record in a table.", true)
      ]),
      lvl(2, "Intermédiaire", "Intermediate", [
        { fr: "Quelle opération permet de retrouver les enregistrements correspondant à un critère précis?", en: "Which operation retrieves the records matching a specific criterion?",
          choices: [ ch("Un filtre ou une requête", "A filter or a query", true), ch("Une sauvegarde", "A backup"), ch("Une impression", "A printout"), ch("Une compression de fichier", "A file compression") ] },
        { fr: "Pourquoi éviter de dupliquer les mêmes données dans plusieurs tables sans lien entre elles?", en: "Why avoid duplicating the same data across several unrelated tables?",
          choices: [ ch("Cela crée un risque d'incohérence lors des mises à jour", "It creates a risk of inconsistency during updates", true), ch("Cela accélère toujours le système", "It always speeds up the system"), ch("Cela dépend uniquement du logiciel utilisé par le bureau", "It depends only on the software used by the office"), ch("Cela améliore la sécurité", "It improves security") ] },
        tf("Le tri d'une base de données modifie en permanence l'ordre original des enregistrements, sans possibilité de revenir en arrière.", "Sorting a database permanently changes the original order of records, with no way to go back.", false)
      ]),
      lvl(3, "Avancé", "Advanced", [
        { fr: "Une liste de clients doit fusionner avec un modèle de lettre pour un envoi personnalisé. Quelle fonction utiliser?", en: "A client list must merge with a letter template for a personalized mailing. Which feature is used?",
          choices: [ ch("Le publipostage (fusion et publipostage)", "Mail merge", true), ch("Le tri alphabétique seul", "Alphabetical sorting alone"), ch("La copie manuelle de chaque lettre", "Manually copying each letter"), ch("L'impression en noir et blanc", "Black and white printing") ] },
        { fr: "Deux tables doivent être reliées par un identifiant commun. Ce lien s'appelle...", en: "Two tables need to be linked by a common identifier. This link is called...",
          choices: [ ch("Une relation (clé étrangère)", "A relationship (foreign key)", true), ch("Un filtre", "A filter"), ch("Un rapport", "A report"), ch("Un champ calculé", "A calculated field") ] },
        tf("La conception d'une base de données n'a aucun lien avec la fiabilité des statistiques qu'on peut en extraire.", "Database design has no connection to the reliability of the statistics that can be extracted from it.", false)
      ])
    ]
  },
  {
    id: "secr13", code: "460623", hours: 45, order: 13,
    title_fr: "Gestion de l'encaisse", title_en: "Cash Management",
    icon: "💵",
    tiers: [
      lvl(1, "Facile", "Easy", [
        { fr: "Le fonds de petite caisse sert principalement à...", en: "The petty cash fund is mainly used to...",
          choices: [ ch("Payer de menues dépenses courantes", "Pay small routine expenses", true), ch("Payer les salaires", "Pay employee salaries"), ch("Payer les taxes annuelles", "Pay annual taxes"), ch("Investir en bourse", "Invest in the stock market") ] },
        { fr: "Lors du rapprochement bancaire, un chèque émis mais pas encore encaissé par le fournisseur est appelé...", en: "During bank reconciliation, a cheque issued but not yet cashed by the supplier is called a...",
          choices: [ ch("Chèque en circulation", "Outstanding cheque", true), ch("Dépôt en transit", "Deposit in transit"), ch("Frais bancaires", "Bank charges"), ch("Chèque sans provision (NSF)", "NSF cheque") ] },
        tf("Un dépôt en transit est un dépôt enregistré par l'entreprise mais qui n'apparaît pas encore sur le relevé bancaire.", "A deposit in transit is a deposit recorded by the company that has not yet appeared on the bank statement.", true)
      ]),
      lvl(2, "Intermédiaire", "Intermediate", [
        { fr: "Que doit-on faire si la petite caisse présente un déficit lors du renflouement?", en: "What should be done if petty cash shows a shortage when replenished?",
          choices: [ ch("Enregistrer l'écart dans un compte d'écarts de caisse", "Record the shortage in a cash-over-and-short account", true), ch("Ignorer l'écart", "Ignore the shortage"), ch("Modifier les reçus", "Alter the receipts"), ch("Augmenter le fonds sans justification", "Increase the fund without justification") ] },
        { fr: "Un chèque NSF (sans provision) reçu d'un client doit être...", en: "An NSF cheque received from a customer should be...",
          choices: [ ch("Retiré du compte banque et remis au compte client", "Removed from the cash account and the customer's balance restored", true), ch("Ignoré", "Ignored"), ch("Ajouté à la petite caisse", "Added to petty cash"), ch("Considéré comme un revenu", "Treated as revenue") ] },
        tf("Le rapprochement bancaire compare uniquement les dépôts, jamais les retraits ou les chèques en circulation.", "Bank reconciliation only compares deposits, never withdrawals or outstanding cheques.", false)
      ]),
      lvl(3, "Avancé", "Advanced", [
        { fr: "Le solde du relevé bancaire est de 3000 $. Il y a 400 $ de chèques en circulation et 250 $ de dépôt en transit. Quel est le solde bancaire rajusté?", en: "The bank statement balance is $3,000. There is $400 of outstanding cheques and $250 of deposit in transit. What is the adjusted bank balance?",
          choices: [ ch("2850 $", "$2,850", true), ch("3150 $", "$3,150"), ch("2350 $", "$2,350"), ch("3650 $", "$3,650") ] },
        { fr: "Le solde des livres est de 2850 $ avant des frais bancaires de 30 $ non enregistrés. Quel est le solde ajusté des livres?", en: "The book balance is $2,850 before $30 of unrecorded bank charges. What is the adjusted book balance?",
          choices: [ ch("2820 $", "$2,820", true), ch("2880 $", "$2,880"), ch("2850 $", "$2,850"), ch("2790 $", "$2,790") ] },
        tf("Après rapprochement, le solde ajusté de la banque doit être égal au solde ajusté des livres.", "After reconciliation, the adjusted bank balance must equal the adjusted book balance.", true)
      ])
    ]
  },
  {
    id: "secr14", code: "460635", hours: 75, order: 14,
    title_fr: "Traduction", title_en: "Translation",
    icon: "🔤",
    tiers: [
      lvl(1, "Facile", "Easy", [
        { fr: "Que signifie « invoice » en français?", en: "What does 'invoice' mean in French?",
          choices: [ ch("Facture", "Facture", true), ch("Reçu", "Reçu"), ch("Devis", "Devis"), ch("Relevé", "Relevé") ] },
        { fr: "Comment dit-on « compte à recevoir » en anglais?", en: "How do you say 'compte à recevoir' in English?",
          choices: [ ch("Accounts receivable", "Accounts receivable", true), ch("Accounts payable", "Accounts payable"), ch("Bank statement", "Bank statement"), ch("Petty cash", "Petty cash") ] },
        tf("Un bon traducteur adapte le ton du texte à son destinataire, pas seulement les mots.", "A good translator adapts the tone of a text to its reader, not just the words.", true)
      ]),
      lvl(2, "Intermédiaire", "Intermediate", [
        { fr: "Quelle formule de politesse convient pour terminer un courriel d'affaires en anglais?", en: "Which closing is appropriate for a business email in English?",
          choices: [ ch("Best regards,", "Best regards,", true), ch("See ya,", "See ya,"), ch("Whatever,", "Whatever,"), ch("Bye bye,", "Bye bye,") ] },
        { fr: "Que signifie « past due » sur une facture?", en: "What does 'past due' mean on an invoice?",
          choices: [ ch("En retard de paiement", "Payment is overdue", true), ch("Payée d'avance", "Paid in advance"), ch("Annulée", "Cancelled"), ch("Gratuite", "Free of charge") ] },
        tf("La traduction littérale mot à mot produit toujours le meilleur résultat.", "Literal word-for-word translation always produces the best result.", false)
      ]),
      lvl(3, "Avancé", "Advanced", [
        { fr: "Quelle version anglaise convient le mieux pour informer poliment un fournisseur d'une erreur de facturation?", en: "Which English version is best to politely inform a supplier of a billing error?",
          choices: [ ch("We noticed a discrepancy on invoice #112 and would appreciate your review at your earliest convenience.", "We noticed a discrepancy on invoice #112 and would appreciate your review at your earliest convenience.", true), ch("Your invoice is wrong, fix it.", "Your invoice is wrong, fix it."), ch("Something seems off maybe on that invoice thing.", "Something seems off maybe on that invoice thing."), ch("This invoice is a huge mistake on your part!!", "This invoice is a huge mistake on your part!!") ] },
        { fr: "Un terme technique n'a pas d'équivalent direct en français. Quelle est la bonne pratique?", en: "A technical term has no direct French equivalent. What is the correct practice?",
          choices: [ ch("Utiliser une explication ou un équivalent reconnu du domaine, avec une note si nécessaire", "Use a recognized field equivalent or explanation, with a note if needed", true), ch("Inventer un mot au hasard", "Invent a random word"), ch("Laisser le terme non traduit sans explication", "Leave the term untranslated with no explanation"), ch("Supprimer la phrase concernée", "Delete the sentence in question") ] },
        tf("Un glossaire de termes propres à l'entreprise aide à garder une traduction cohérente dans le temps.", "A glossary of company-specific terms helps keep translation consistent over time.", true)
      ])
    ]
  },
  {
    id: "secr15", code: "460644", hours: 60, order: 15,
    title_fr: "Conception de tableaux et de graphiques", title_en: "Designing Tables and Charts",
    icon: "📊",
    tiers: [
      lvl(1, "Facile", "Easy", [
        { fr: "Quel type de graphique convient le mieux pour montrer la répartition des dépenses par catégorie?", en: "Which chart type best shows the breakdown of expenses by category?",
          choices: [ ch("Un graphique circulaire (camembert)", "A pie chart", true), ch("Un nuage de points", "A scatter plot"), ch("Un graphique radar", "A radar chart"), ch("Un histogramme de fréquence cumulée", "A cumulative frequency histogram") ] },
        { fr: "Quel type de graphique montre bien une évolution dans le temps?", en: "Which chart type clearly shows change over time?",
          choices: [ ch("Un graphique en ligne", "A line chart", true), ch("Un graphique circulaire", "A pie chart"), ch("Un nuage de points sans axe temporel", "A scatter plot with no time axis"), ch("Aucun graphique n'est utile", "No chart is useful") ] },
        tf("Un tableau bien structuré facilite la comparaison de données.", "A well-structured table makes comparing data easier.", true)
      ]),
      lvl(2, "Intermédiaire", "Intermediate", [
        { fr: "Que faut-il ajouter à un graphique pour que le lecteur comprenne ce que représente chaque série?", en: "What should be added to a chart so readers understand what each series represents?",
          choices: [ ch("Une légende", "A legend", true), ch("Une bordure épaisse", "A thick border"), ch("Un fond en couleur vive", "A bright coloured background"), ch("Un titre en très petit caractère", "A very small title") ] },
        { fr: "Quel élément d'un tableau permet d'identifier rapidement le contenu de chaque colonne?", en: "Which table element allows quick identification of each column's content?",
          choices: [ ch("Un en-tête de colonne clair", "A clear column header", true), ch("Une couleur de fond aléatoire", "A random background colour"), ch("Une police décorative", "A decorative font"), ch("Aucun en-tête", "No header at all") ] },
        tf("Plus un graphique contient de couleurs et d'effets, plus il est facile à lire.", "The more colours and effects a chart contains, the easier it is to read.", false)
      ]),
      lvl(3, "Avancé", "Advanced", [
        { fr: "Un tableau destiné à la direction contient trop de données brutes pour être lu rapidement. Quelle solution privilégier?", en: "A table meant for management contains too much raw data to read quickly. Which solution is best?",
          choices: [ ch("Résumer les données clés dans un graphique et fournir le détail en annexe", "Summarizing key data in a chart and providing the detail in an appendix", true), ch("Ajouter encore plus de données", "Adding even more data"), ch("Réduire la taille de police pour tout faire tenir", "Shrinking the font size to fit everything"), ch("Retirer tous les titres", "Removing all titles") ] },
        { fr: "Quel type de graphique convient pour comparer plusieurs catégories entre elles à un instant donné?", en: "Which chart type suits comparing several categories at a single point in time?",
          choices: [ ch("Un graphique à barres", "A bar chart", true), ch("Un graphique en ligne seul", "A line chart alone"), ch("Un nuage de points sans catégories", "A scatter plot with no categories"), ch("Aucun graphique", "No chart") ] },
        tf("Le type de graphique n'a aucune importance tant que les données sont exactes.", "The type of chart doesn't matter at all as long as the data is accurate.", false)
      ])
    ]
  },
  {
    id: "secr16", code: "460656", hours: 90, order: 16,
    title_fr: "Conception visuelle de documents", title_en: "Visual Document Design",
    icon: "🎨",
    tiers: [
      lvl(1, "Facile", "Easy", [
        { fr: "Qu'est-ce que l'éditique (desktop publishing)?", en: "What is desktop publishing?",
          choices: [ ch("La mise en page et la conception visuelle de documents à l'aide de logiciels", "Layout and visual design of documents using software", true), ch("La saisie de texte sans mise en forme", "Typing text with no formatting"), ch("L'impression seule", "Printing alone"), ch("La sauvegarde de fichiers", "Backing up files") ] },
        { fr: "Quel élément assure une apparence professionnelle uniforme dans tous les documents d'une entreprise?", en: "What ensures a consistent professional look across all of a company's documents?",
          choices: [ ch("Un gabarit avec une charte graphique (couleurs, polices, logo)", "A template with a graphic charter (colours, fonts, logo)", true), ch("Une police différente à chaque document", "A different font for each document"), ch("Aucune règle particulière", "No particular rule"), ch("Le hasard", "Random chance") ] },
        tf("L'espace blanc (marges, interlignes) contribue à la lisibilité d'un document.", "White space (margins, line spacing) contributes to a document's readability.", true)
      ]),
      lvl(2, "Intermédiaire", "Intermediate", [
        { fr: "Pourquoi limiter le nombre de polices différentes dans un document?", en: "Why limit the number of different fonts in a document?",
          choices: [ ch("Pour garder une apparence cohérente et professionnelle", "To keep a consistent, professional look", true), ch("Pour respecter la hiérarchie visuelle prévue par la mise en page", "To follow the visual hierarchy set by the layout"), ch("Cela dépend uniquement des préférences personnelles de la secrétaire", "It depends only on the secretary's personal preferences"), ch("Pour augmenter la taille du fichier", "To increase the file size") ] },
        { fr: "Quel format d'image convient pour un logo avec un fond transparent?", en: "Which image format suits a logo with a transparent background?",
          choices: [ ch("PNG", "PNG", true), ch("JPEG", "JPEG"), ch("BMP", "BMP"), ch("TXT", "TXT") ] },
        tf("L'alignement des éléments n'a aucun effet sur la clarté visuelle d'un document; seul le contenu compte.", "Element alignment has no effect on a document's visual clarity; only the content matters.", false)
      ]),
      lvl(3, "Avancé", "Advanced", [
        { fr: "Un document combine plusieurs polices, couleurs et tailles sans logique apparente. Quel est le principal problème?", en: "A document combines several fonts, colours and sizes with no apparent logic. What is the main problem?",
          choices: [ ch("Il nuit à la lisibilité et à l'image professionnelle de l'entreprise", "It hurts readability and the company's professional image", true), ch("Cela ne concerne que la présentation visuelle du document", "It only concerns the document's visual presentation"), ch("Il est plus rapide à produire", "It is faster to produce"), ch("Il respecte toujours une charte graphique", "It always respects a graphic charter") ] },
        { fr: "Quelle pratique aide à concevoir un gabarit réutilisable pour les futurs documents de l'entreprise?", en: "What practice helps design a reusable template for the company's future documents?",
          choices: [ ch("Utiliser des styles et une charte graphique définis à l'avance", "Using predefined styles and a graphic charter", true), ch("Recommencer la mise en page à zéro chaque fois", "Starting the layout from scratch every time"), ch("Copier un document au hasard sur Internet", "Copying a random document from the Internet"), ch("Ignorer les couleurs de l'entreprise", "Ignoring the company's colours") ] },
        tf("La conception visuelle doit toujours servir la clarté du message, pas seulement l'esthétique.", "Visual design should always serve the clarity of the message, not just aesthetics.", true)
      ])
    ]
  },
  {
    id: "secr17", code: "460666", hours: 90, order: 17,
    title_fr: "Rédaction de textes en anglais", title_en: "Writing Texts in English",
    icon: "🖋️",
    tiers: [
      lvl(1, "Facile", "Easy", [
        { fr: "Quelle phrase est correctement rédigée en anglais des affaires?", en: "Which sentence is correctly written in business English?",
          choices: [ ch("Please find attached the requested invoice.", "Please find attached the requested invoice.", true), ch("Find please the invoice attach.", "Find please the invoice attach."), ch("The invoice, attached is, please find.", "The invoice, attached is, please find."), ch("Please to find attach invoice.", "Please to find attach invoice.") ] },
        { fr: "Comment dit-on « ci-joint » en anglais dans un courriel?", en: "How do you say 'ci-joint' in an English email?",
          choices: [ ch("Attached / Please find attached", "Attached / Please find attached", true), ch("Close to", "Close to"), ch("Joined here", "Joined here"), ch("Near this", "Near this") ] },
        tf("« Dear Mr. Tremblay, » est une formule d'appel appropriée dans une lettre d'affaires en anglais.", "'Dear Mr. Tremblay,' is an appropriate salutation in an English business letter.", true)
      ]),
      lvl(2, "Intermédiaire", "Intermediate", [
        { fr: "Quel est le pluriel correct de « memo »?", en: "What is the correct plural of 'memo'?",
          choices: [ ch("memos", "memos", true), ch("memoes", "memoes"), ch("memoi", "memoi"), ch("memo's", "memo's") ] },
        { fr: "Quelle formule convient pour démarrer un courriel formel à une personne inconnue?", en: "Which greeting suits a formal email to an unknown recipient?",
          choices: [ ch("Dear Sir or Madam,", "Dear Sir or Madam,", true), ch("Hey you,", "Hey you,"), ch("To whom,", "To whom,"), ch("Hiya,", "Hiya,") ] },
        tf("En anglais des affaires, les contractions comme « don't » sont toujours préférées, même dans les lettres très formelles.", "In business English, contractions like 'don't' are always preferred, even in very formal letters.", false)
      ]),
      lvl(3, "Avancé", "Advanced", [
        { fr: "Quelle version convient le mieux pour informer poliment un client d'un retard?", en: "Which version is best to politely inform a client of a delay?",
          choices: [ ch("We regret to inform you that your order will be delayed by two business days.", "We regret to inform you that your order will be delayed by two business days.", true), ch("Your order is late, sorry not sorry.", "Your order is late, sorry not sorry."), ch("Order thing delayed I guess.", "Order thing delayed I guess."), ch("This delay is not really our fault.", "This delay is not really our fault.") ] },
        { fr: "Complétez correctement: « Enclosed ____ the documents you requested. »", en: "Complete correctly: 'Enclosed ____ the documents you requested.'",
          choices: [ ch("are", "are", true), ch("is", "is"), ch("be", "be"), ch("being", "being") ] },
        tf("« I would like to inform you that... » est une formule appropriée pour introduire une information importante dans une lettre d'affaires.", "'I would like to inform you that...' is an appropriate phrase to introduce important information in a business letter.", true)
      ])
    ]
  },
  {
    id: "secr18", code: "460672", hours: 30, order: 18,
    title_fr: "Médias numériques", title_en: "Digital Media",
    icon: "📱",
    tiers: [
      lvl(1, "Facile", "Easy", [
        { fr: "Publier une mise à jour sur le site web ou les réseaux sociaux d'une entreprise nécessite...", en: "Posting an update on a company's website or social media requires...",
          choices: [ ch("De respecter le ton et l'image de marque de l'entreprise", "Respecting the company's tone and brand image", true), ch("D'écrire n'importe quoi rapidement", "Writing anything quickly"), ch("D'éviter toute vérification", "Skipping any checking"), ch("De copier un autre site sans permission", "Copying another site without permission") ] },
        { fr: "Avant de publier un contenu au nom de l'entreprise, il faut...", en: "Before posting content on behalf of the company, you must...",
          choices: [ ch("Vérifier l'exactitude de l'information et obtenir les approbations nécessaires", "Verify the information's accuracy and get the necessary approvals", true), ch("Publier immédiatement sans relecture", "Post immediately without proofreading"), ch("Attendre qu'un client le signale s'il y a une erreur", "Wait for a client to flag an error"), ch("Publier uniquement le week-end", "Only post on weekends") ] },
        tf("Une publication effacée après coup peut avoir déjà été vue ou partagée.", "A post deleted after the fact may already have been seen or shared.", true)
      ]),
      lvl(2, "Intermédiaire", "Intermediate", [
        { fr: "Quelle pratique aide à garder une image professionnelle cohérente sur les réseaux sociaux de l'entreprise?", en: "What practice helps keep a consistent professional image on the company's social media?",
          choices: [ ch("Suivre un calendrier de publication et un guide éditorial de ton", "Following a publication calendar and an editorial tone guide", true), ch("Publier au hasard sans plan", "Posting randomly with no plan"), ch("Laisser chaque employé publier ce qu'il veut", "Letting every employee post whatever they want"), ch("Ne jamais publier de contenu", "Never publishing any content") ] },
        { fr: "Un commentaire négatif est publié sur la page de l'entreprise. Quelle est la bonne pratique générale?", en: "A negative comment is posted on the company's page. What is the general best practice?",
          choices: [ ch("Répondre de façon professionnelle et posée, selon la politique de l'entreprise", "Responding professionally and calmly, following company policy", true), ch("Supprimer et ignorer systématiquement", "Systematically deleting and ignoring it"), ch("Répondre de façon agressive", "Responding aggressively"), ch("Publier une réponse publique fâchée", "Posting an angry public reply") ] },
        tf("Le contenu publié en ligne au nom d'une entreprise n'a qu'un impact temporaire, sans conséquence à long terme.", "Content posted online on behalf of a company only has a temporary impact, with no long-term consequences.", false)
      ]),
      lvl(3, "Avancé", "Advanced", [
        { fr: "Une erreur est publiée sur le site web de l'entreprise (prix erroné). Quelle est la meilleure action?", en: "An error is posted on the company's website (wrong price). What is the best action?",
          choices: [ ch("Corriger rapidement et informer le responsable si nécessaire", "Correct it quickly and inform the person in charge if necessary", true), ch("Ne rien faire", "Do nothing"), ch("Attendre la fin de la semaine pour corriger", "Wait until the end of the week to fix it"), ch("Supprimer tout le site web", "Delete the entire website") ] },
        { fr: "Pourquoi est-il important de connaître les bases du référencement (mots-clés, structure) pour du contenu web?", en: "Why is it important to know the basics of SEO (keywords, structure) for web content?",
          choices: [ ch("Cela aide le contenu à être mieux trouvé par les visiteurs pertinents", "It helps content be found more easily by relevant visitors", true), ch("Cela ne concerne que la mise en forme, jamais le contenu", "It only concerns formatting, never the content"), ch("Cela ralentit toujours le site", "It always slows down the site"), ch("Cela sert uniquement à décorer la page", "It only serves to decorate the page") ] },
        tf("La gestion des médias numériques d'une entreprise doit respecter les mêmes standards de qualité que ses autres communications.", "A company's digital media management should meet the same quality standards as its other communications.", true)
      ])
    ]
  },
  {
    id: "secr19", code: "460683", hours: 45, order: 19,
    title_fr: "Interaction en anglais", title_en: "Interaction in English",
    icon: "🗣️",
    tiers: [
      lvl(1, "Facile", "Easy", [
        { fr: "Comment répondre poliment au téléphone en anglais dans un contexte professionnel?", en: "How should you politely answer the phone in English in a professional context?",
          choices: [ ch("\"Good morning, [Company name], how may I help you?\"", "\"Good morning, [Company name], how may I help you?\"", true), ch("\"Yeah, what?\"", "\"Yeah, what?\""), ch("\"Who's this?\"", "\"Who's this?\""), ch("\"Hold on.\" (sans plus)", "\"Hold on.\" (nothing more)") ] },
        { fr: "Que signifie « Could you hold, please? »?", en: "What does 'Could you hold, please?' mean?",
          choices: [ ch("Demander à l'interlocuteur de patienter", "Asking the caller to wait", true), ch("Demander de raccrocher", "Asking them to hang up"), ch("Demander de rappeler demain", "Asking them to call back tomorrow"), ch("Demander leur nom", "Asking for their name") ] },
        tf("Le ton et la politesse sont aussi importants que les mots exacts utilisés en anglais.", "Tone and politeness matter as much as the exact words used in English.", true)
      ]),
      lvl(2, "Intermédiaire", "Intermediate", [
        { fr: "Un client anglophone appelle avec une plainte. Quelle réponse est la plus appropriée?", en: "An English-speaking client calls with a complaint. Which response is most appropriate?",
          choices: [ ch("\"I understand your concern, let me look into this for you.\"", "\"I understand your concern, let me look into this for you.\"", true), ch("\"That's not my problem.\"", "\"That's not my problem.\""), ch("\"Calm down.\"", "\"Calm down.\""), ch("\"I don't know, call someone else.\"", "\"I don't know, call someone else.\"") ] },
        { fr: "Que répondre si on ne comprend pas bien une demande en anglais?", en: "What should you say if you don't quite understand a request in English?",
          choices: [ ch("\"Could you please repeat that?\"", "\"Could you please repeat that?\"", true), ch("\"What?\" (sèchement)", "\"What?\" (curtly)"), ch("Rester silencieux", "Staying silent"), ch("Raccrocher", "Hanging up") ] },
        tf("Demander une clarification en langue seconde est généralement perçu comme un signe de faiblesse professionnelle.", "Asking for clarification in your second language is generally seen as a sign of professional weakness.", false)
      ]),
      lvl(3, "Avancé", "Advanced", [
        { fr: "Un visiteur anglophone se présente sans rendez-vous pour une réunion urgente. Quelle réponse est appropriée?", en: "An English-speaking visitor shows up without an appointment for an urgent meeting. What is an appropriate response?",
          choices: [ ch("\"Let me check if [Name] is available. Please have a seat.\"", "\"Let me check if [Name] is available. Please have a seat.\"", true), ch("\"No appointment, no entry.\" (sans plus)", "\"No appointment, no entry.\" (nothing more)"), ch("Ignorer le visiteur", "Ignoring the visitor"), ch("\"Come back another day.\" (sans explication)", "\"Come back another day.\" (no explanation)") ] },
        { fr: "Comment gérer poliment un désaccord avec un interlocuteur anglophone au téléphone?", en: "How should you politely handle a disagreement with an English-speaking caller on the phone?",
          choices: [ ch("Rester courtois, reformuler la demande et proposer une solution", "Stay courteous, rephrase the request and propose a solution", true), ch("Raccrocher immédiatement", "Hang up immediately"), ch("Hausser le ton", "Raise your voice"), ch("Ignorer la demande", "Ignore the request") ] },
        tf("Une bonne maîtrise orale de l'anglais aide à représenter professionnellement l'entreprise auprès d'une clientèle anglophone.", "Strong spoken English helps represent the company professionally to English-speaking clients.", true)
      ])
    ]
  },
  {
    id: "secr20", code: "460695", hours: 75, order: 20,
    title_fr: "Suivi de la correspondance", title_en: "Correspondence Follow-up",
    icon: "📬",
    tiers: [
      lvl(1, "Facile", "Easy", [
        { fr: "Le courrier entrant doit généralement être...", en: "Incoming mail should generally be...",
          choices: [ ch("Trié, daté et acheminé à la bonne personne rapidement", "Sorted, dated and routed to the right person promptly", true), ch("Laissé sans être ouvert", "Left unopened"), ch("Jeté si non urgent", "Thrown out if not urgent"), ch("Ouvert seulement le vendredi", "Only opened on Fridays") ] },
        { fr: "Un registre du courrier sert à...", en: "A mail log is used to...",
          choices: [ ch("Suivre l'envoi et la réception des documents importants", "Track the sending and receipt of important documents", true), ch("Décorer le bureau", "Decorate the office"), ch("Remplacer les enveloppes", "Replace envelopes"), ch("Calculer la paie", "Calculate payroll") ] },
        tf("Le courrier confidentiel doit être traité avec une attention particulière à la discrétion.", "Confidential mail must be handled with particular attention to discretion.", true)
      ]),
      lvl(2, "Intermédiaire", "Intermediate", [
        { fr: "Une lettre importante attend une réponse depuis 2 semaines sans suivi. Quelle est la bonne pratique?", en: "An important letter has been awaiting a response for 2 weeks with no follow-up. What is the correct practice?",
          choices: [ ch("Relancer poliment ou signaler le retard au responsable", "Politely follow up or flag the delay to the person in charge", true), ch("Ne rien faire", "Do nothing"), ch("Supprimer la demande", "Delete the request"), ch("Attendre indéfiniment", "Wait indefinitely") ] },
        { fr: "Quel outil aide à suivre les échéances de réponse à la correspondance?", en: "Which tool helps track correspondence response deadlines?",
          choices: [ ch("Un système de suivi (agenda, registre ou logiciel)", "A tracking system (planner, log or software)", true), ch("La mémoire seule", "Memory alone"), ch("Aucun outil n'est nécessaire", "No tool is necessary"), ch("Un post-it perdu sur le bureau", "A lost sticky note on the desk") ] },
        tf("Le suivi de la correspondance ne concerne que le courrier papier; le courrier électronique n'a pas besoin de suivi.", "Correspondence follow-up only concerns paper mail; email doesn't need follow-up.", false)
      ]),
      lvl(3, "Avancé", "Advanced", [
        { fr: "Plusieurs courriels urgents arrivent en même temps que des appels téléphoniques. Quelle est la bonne approche?", en: "Several urgent emails arrive at the same time as phone calls. What is the right approach?",
          choices: [ ch("Prioriser selon l'urgence et l'importance, puis traiter méthodiquement", "Prioritize by urgency and importance, then handle things methodically", true), ch("Paniquer et tout ignorer", "Panic and ignore everything"), ch("Traiter au hasard", "Handle things randomly"), ch("Répondre à tout en même temps sans ordre", "Answer everything at once with no order") ] },
        { fr: "Une lettre recommandée nécessite une preuve de réception. Quelle pratique assure ce suivi?", en: "A registered letter requires proof of receipt. Which practice ensures this follow-up?",
          choices: [ ch("Conserver l'accusé de réception et noter la date dans le registre", "Keeping the acknowledgment of receipt and noting the date in the log", true), ch("Jeter l'accusé de réception", "Throwing out the acknowledgment of receipt"), ch("Ne rien noter", "Noting nothing"), ch("Se fier uniquement à sa mémoire", "Relying only on memory") ] },
        tf("Un bon suivi de la correspondance réduit le risque d'oublier une réponse importante.", "Good correspondence follow-up reduces the risk of forgetting an important reply.", true)
      ])
    ]
  },
  {
    id: "secr21", code: "460704", hours: 60, order: 21,
    title_fr: "Réunions et événements", title_en: "Meetings and Events",
    icon: "📅",
    tiers: [
      lvl(1, "Facile", "Easy", [
        { fr: "Avant une réunion, la secrétaire prépare généralement...", en: "Before a meeting, the secretary generally prepares...",
          choices: [ ch("L'ordre du jour et la convocation", "The agenda and the meeting notice", true), ch("Uniquement la date de réception du document", "Only the document's date of receipt"), ch("Seulement le café", "Just the coffee"), ch("Le rapport annuel complet", "The full annual report") ] },
        { fr: "Pendant une réunion, la personne qui prend des notes officielles rédige...", en: "During a meeting, the person taking official notes writes...",
          choices: [ ch("Le procès-verbal (compte rendu)", "The minutes", true), ch("Un roman", "A novel"), ch("Une facture", "An invoice"), ch("Un contrat de travail", "An employment contract") ] },
        tf("Réserver une salle et prévoir le matériel nécessaire font partie de l'organisation d'une réunion.", "Booking a room and arranging the necessary equipment are part of organizing a meeting.", true)
      ]),
      lvl(2, "Intermédiaire", "Intermediate", [
        { fr: "Un ordre du jour bien conçu comprend généralement...", en: "A well-designed agenda generally includes...",
          choices: [ ch("Les sujets à traiter, dans un ordre logique, avec une durée estimée", "The topics to cover, in a logical order, with an estimated duration", true), ch("Aucun sujet précis", "No specific topics"), ch("Uniquement le nom des participants", "Only the names of participants"), ch("La liste des vacances de l'entreprise", "The company's vacation schedule") ] },
        { fr: "Après une réunion, le procès-verbal doit être...", en: "After a meeting, the minutes should be...",
          choices: [ ch("Envoyé aux participants pour validation dans un délai raisonnable", "Sent to participants for validation within a reasonable time", true), ch("Détruit immédiatement", "Destroyed immediately"), ch("Gardé secret", "Kept secret"), ch("Envoyé seulement un an plus tard", "Sent only a year later") ] },
        tf("La logistique d'un événement se limite à réserver le lieu; les invitations et le traiteur relèvent d'un autre service.", "Event logistics are limited to booking the venue; invitations and catering are handled by another department.", false)
      ]),
      lvl(3, "Avancé", "Advanced", [
        { fr: "Deux réunions importantes sont prévues à la même heure par erreur. Quelle est la meilleure action?", en: "Two important meetings are mistakenly scheduled at the same time. What is the best action?",
          choices: [ ch("Vérifier les disponibilités et reporter l'une des deux le plus tôt possible, en avisant les participants", "Check availability and reschedule one of them as soon as possible, notifying participants", true), ch("Ignorer le conflit", "Ignore the conflict"), ch("Annuler les deux réunions sans préavis", "Cancel both meetings without notice"), ch("Laisser les participants découvrir le conflit sur place", "Let participants discover the conflict on site") ] },
        { fr: "Un événement de 100 personnes doit être organisé en 3 semaines. Quelle est la première étape?", en: "An event for 100 people must be organized in 3 weeks. What is the first step?",
          choices: [ ch("Établir un échéancier des tâches et réserver le lieu et les ressources clés en priorité", "Establishing a task timeline and booking the venue and key resources first", true), ch("Attendre la dernière semaine pour commencer", "Waiting until the last week to start"), ch("Envoyer les invitations sans avoir de lieu", "Sending invitations before securing a venue"), ch("Improviser sans plan", "Improvising with no plan") ] },
        tf("Une bonne organisation d'événement anticipe les imprévus (retards, annulations, besoins techniques).", "Good event planning anticipates the unexpected (delays, cancellations, technical needs).", true)
      ])
    ]
  },
  {
    id: "secr22", code: "460714", hours: 60, order: 22,
    title_fr: "Production de rapports", title_en: "Producing Reports",
    icon: "📄",
    tiers: [
      lvl(1, "Facile", "Easy", [
        { fr: "Un rapport professionnel comprend généralement...", en: "A professional report generally includes...",
          choices: [ ch("Une introduction, un développement et une conclusion avec recommandations", "An introduction, a body and a conclusion with recommendations", true), ch("Seulement une liste de chiffres", "Only a list of numbers"), ch("Aucune structure particulière", "No particular structure"), ch("Uniquement des images", "Only images") ] },
        { fr: "Pourquoi inclure un sommaire (résumé) au début d'un rapport long?", en: "Why include an executive summary at the beginning of a long report?",
          choices: [ ch("Pour permettre un survol rapide sans lire tout le document", "To allow a quick overview without reading the whole document", true), ch("Pour allonger inutilement le document", "To needlessly lengthen the document"), ch("Cela n'est utile que pour la paperasse administrative", "It is only useful for administrative paperwork"), ch("Pour remplacer la conclusion", "To replace the conclusion") ] },
        tf("La mise en page (titres, sections) rend un rapport plus facile à consulter.", "Layout (titles, sections) makes a report easier to consult.", true)
      ]),
      lvl(2, "Intermédiaire", "Intermediate", [
        { fr: "Quel élément aide à retrouver rapidement une section précise dans un long rapport?", en: "Which element helps quickly find a specific section in a long report?",
          choices: [ ch("Une table des matières", "A table of contents", true), ch("Une police décorative", "A decorative font"), ch("Une seule longue page sans titre", "One long page with no headings"), ch("Aucun élément particulier", "No particular element") ] },
        { fr: "Un rapport présente des chiffres financiers. Quel format aide à les rendre plus clairs?", en: "A report presents financial figures. Which format helps make them clearer?",
          choices: [ ch("Un tableau ou un graphique bien légendé", "A well-labelled table or chart", true), ch("Un long paragraphe de texte seul", "A long block of plain text alone"), ch("Une seule phrase vague", "One vague sentence"), ch("Aucun format particulier", "No particular format") ] },
        tf("Un rapport destiné à la direction devrait présenter uniquement des données brutes, sans conclusions ni interprétation.", "A report meant for management should present only raw data, with no conclusions or interpretation.", false)
      ]),
      lvl(3, "Avancé", "Advanced", [
        { fr: "Une secrétaire doit compiler des données de plusieurs services pour un rapport annuel. Quelle est la bonne pratique?", en: "A secretary must compile data from several departments for an annual report. What is the correct practice?",
          choices: [ ch("Vérifier la cohérence des données avant de les intégrer, et citer leurs sources", "Checking the data's consistency before including it, and citing sources", true), ch("Intégrer les données sans vérification", "Including the data without checking it"), ch("Ignorer les données incomplètes sans le signaler", "Ignoring incomplete data without flagging it"), ch("Inventer les données manquantes", "Making up the missing data") ] },
        { fr: "Un rapport contient une erreur de calcul découverte après diffusion. Quelle est la bonne pratique?", en: "A report contains a calculation error discovered after distribution. What is the correct practice?",
          choices: [ ch("Corriger rapidement et diffuser une version corrigée avec une note explicative", "Correct it quickly and distribute a corrected version with an explanatory note", true), ch("Ne rien dire", "Say nothing"), ch("Nier l'erreur", "Deny the error"), ch("Attendre le prochain rapport annuel pour corriger", "Wait for next year's annual report to fix it") ] },
        tf("La crédibilité d'un rapport dépend de l'exactitude et de la clarté de son contenu.", "A report's credibility depends on the accuracy and clarity of its content.", true)
      ])
    ]
  },
  {
    id: "secr23", code: "460722", hours: 30, order: 23,
    title_fr: "Soutien technique", title_en: "Technical Support",
    icon: "🛠️",
    tiers: [
      lvl(1, "Facile", "Easy", [
        { fr: "Un collègue ne parvient pas à imprimer un document. Une première vérification simple est de...", en: "A colleague can't print a document. A simple first check is to...",
          choices: [ ch("Vérifier que l'imprimante est allumée et connectée", "Check that the printer is turned on and connected", true), ch("Redémarrer tout l'immeuble", "Restart the whole building"), ch("Acheter une nouvelle imprimante immédiatement", "Immediately buy a new printer"), ch("Ignorer le problème", "Ignore the problem") ] },
        { fr: "Une nouvelle employée doit apprendre à utiliser le photocopieur multifonction. La secrétaire peut...", en: "A new employee needs to learn how to use the multifunction copier. The secretary can...",
          choices: [ ch("Lui montrer les fonctions de base et lui fournir un guide simple", "Show her the basic functions and give her a simple guide", true), ch("La laisser deviner seule", "Leave her to figure it out alone"), ch("Refuser de l'aider", "Refuse to help her"), ch("Lui dire de ne jamais l'utiliser", "Tell her never to use it") ] },
        tf("Documenter les problèmes fréquents et leurs solutions aide les futurs collègues.", "Documenting common problems and their solutions helps future colleagues.", true)
      ]),
      lvl(2, "Intermédiaire", "Intermediate", [
        { fr: "Un logiciel plante fréquemment sur un poste de travail. Quelle est une première étape de dépannage raisonnable?", en: "Software frequently crashes on a workstation. What is a reasonable first troubleshooting step?",
          choices: [ ch("Redémarrer le poste et vérifier les mises à jour disponibles", "Restart the workstation and check for available updates", true), ch("Jeter l'ordinateur", "Throw out the computer"), ch("Ignorer le problème indéfiniment", "Ignore the problem indefinitely"), ch("Débrancher tous les câbles au hasard", "Randomly unplug all the cables") ] },
        { fr: "Pourquoi maintenir une liste des contacts du service informatique ou du fournisseur d'équipement?", en: "Why keep a list of IT department or equipment supplier contacts?",
          choices: [ ch("Pour accélérer la résolution des problèmes techniques plus complexes", "To speed up the resolution of more complex technical problems", true), ch("Cela n'est utile que pour les très longs documents", "It is only useful for very long documents"), ch("Pour remplacer les mots de passe", "To replace passwords"), ch("Pour éviter d'appeler quiconque", "To avoid calling anyone") ] },
        tf("Le soutien technique de base n'est jamais confié au personnel de secrétariat; cela relève uniquement du service informatique.", "Basic technical support is never assigned to secretarial staff; it's solely the IT department's responsibility.", false)
      ]),
      lvl(3, "Avancé", "Advanced", [
        { fr: "Plusieurs employés signalent le même problème avec un logiciel après une mise à jour. Quelle est la bonne approche?", en: "Several employees report the same software problem after an update. What is the right approach?",
          choices: [ ch("Documenter le problème et le signaler au service informatique avec les détails observés", "Documenting the problem and reporting it to IT with the observed details", true), ch("Ignorer les signalements", "Ignoring the reports"), ch("Désinstaller tous les logiciels de l'entreprise", "Uninstall all of the company's software"), ch("Demander à chacun de résoudre le problème seul", "Ask everyone to fix it on their own") ] },
        { fr: "Une nouvelle employée est submergée par le nombre d'outils technologiques à apprendre. Quelle approche aide son intégration?", en: "A new employee is overwhelmed by the number of tech tools to learn. Which approach helps her integration?",
          choices: [ ch("Prioriser les outils essentiels d'abord et prévoir un accompagnement progressif", "Prioritizing the essential tools first and planning gradual support", true), ch("Tout lui montrer en une seule journée sans pause", "Showing her everything in a single day with no break"), ch("Ne lui montrer aucun outil", "Showing her no tools at all"), ch("La laisser seule sans aucune ressource", "Leaving her alone with no resources") ] },
        tf("Une bonne documentation des procédures facilite la formation du personnel nouvellement arrivé.", "Good procedure documentation makes training newly arrived staff easier.", true)
      ])
    ]
  },
  {
    id: "secr24", code: "460733", hours: 45, order: 24,
    title_fr: "Coordination de tâches multiples", title_en: "Multitasking Coordination",
    icon: "🧩",
    tiers: [
      lvl(1, "Facile", "Easy", [
        { fr: "Quelle pratique aide à gérer plusieurs tâches urgentes en même temps?", en: "What practice helps manage several urgent tasks at once?",
          choices: [ ch("Établir les priorités selon l'urgence et l'importance", "Setting priorities based on urgency and importance", true), ch("Faire toutes les tâches en même temps sans ordre", "Doing all tasks at once with no order"), ch("Ignorer les échéances", "Ignoring deadlines"), ch("Reporter systématiquement tout à demain", "Systematically postponing everything to tomorrow") ] },
        { fr: "Une liste de tâches (« to-do list ») sert principalement à...", en: "A to-do list mainly serves to...",
          choices: [ ch("Ne rien oublier et suivre l'avancement du travail", "Avoid forgetting anything and track progress", true), ch("Décorer le bureau", "Decorate the desk"), ch("Remplacer l'agenda", "Replace the calendar entirely"), ch("Impressionner les collègues", "Impress coworkers") ] },
        tf("Une bonne gestion du temps inclut la capacité à repérer les tâches à faible valeur ajoutée.", "Good time management includes the ability to spot low-value tasks.", true)
      ]),
      lvl(2, "Intermédiaire", "Intermediate", [
        { fr: "Un supérieur ajoute une tâche urgente alors que l'horaire est déjà chargé. Quelle est la bonne approche?", en: "A supervisor adds an urgent task while the schedule is already full. What is the right approach?",
          choices: [ ch("Réévaluer les priorités avec lui et ajuster l'échéancier si nécessaire", "Reassessing priorities with them and adjusting the timeline if needed", true), ch("Refuser catégoriquement", "Flatly refusing"), ch("Ignorer les autres tâches sans en parler", "Ignoring the other tasks without saying anything"), ch("Faire semblant de ne pas avoir vu la demande", "Pretending not to have seen the request") ] },
        { fr: "Pourquoi regrouper des tâches similaires (ex. répondre à tous les courriels à un moment précis)?", en: "Why group similar tasks (e.g. answering all emails at a set time)?",
          choices: [ ch("Cela réduit les interruptions et améliore l'efficacité", "It reduces interruptions and improves efficiency", true), ch("Cela ralentit toujours le travail", "It always slows down work"), ch("Cela ne concerne que la mise en forme, jamais le contenu", "It only concerns formatting, never the content"), ch("Cela complique inutilement les choses", "It needlessly complicates things") ] },
        tf("Déléguer une tâche est généralement perçu comme un manque de compétence, même en cas de charge de travail élevée.", "Delegating a task is generally seen as a lack of competence, even when the workload is heavy.", false)
      ]),
      lvl(3, "Avancé", "Advanced", [
        { fr: "Trois dossiers urgents arrivent en même temps de trois gestionnaires différents. Quelle est la meilleure approche?", en: "Three urgent files arrive at the same time from three different managers. What is the best approach?",
          choices: [ ch("Clarifier les échéances réelles avec chacun et prioriser en conséquence", "Clarifying the real deadlines with each one and prioritizing accordingly", true), ch("Choisir au hasard lequel faire en premier", "Randomly choosing which to do first"), ch("Ignorer deux des trois demandes", "Ignoring two of the three requests"), ch("Refuser les trois demandes", "Refusing all three requests") ] },
        { fr: "Une interruption fréquente (appels, visites) nuit à l'avancement d'une tâche complexe. Quelle stratégie aide à limiter cet effet?", en: "Frequent interruptions (calls, visits) hurt progress on a complex task. Which strategy helps limit this?",
          choices: [ ch("Réserver des plages de temps dédiées aux tâches prioritaires quand c'est possible", "Blocking off dedicated time for priority tasks when possible", true), ch("Accepter toutes les interruptions sans exception", "Accepting every interruption without exception"), ch("Ne jamais fermer la porte du bureau", "Never closing the office door"), ch("Répondre à chaque appel avant de finir sa phrase", "Answering every call before finishing a sentence") ] },
        tf("La capacité à jongler avec plusieurs priorités est une compétence clé du personnel de secrétariat.", "The ability to juggle multiple priorities is a key skill for secretarial staff.", true)
      ])
    ]
  },
  {
    id: "secr25", code: "460746", hours: 90, order: 25,
    title_fr: "Intégration au milieu de travail", title_en: "Workplace Integration",
    icon: "🎓",
    tiers: [
      lvl(1, "Facile", "Easy", [
        { fr: "Lors d'une entrevue d'embauche pour un poste de secrétaire, il est important de...", en: "In a job interview for a secretarial position, it is important to...",
          choices: [ ch("Préparer des exemples concrets de ses compétences", "Prepare concrete examples of your skills", true), ch("Ne rien préparer", "Prepare nothing"), ch("Refuser de parler de ses compétences", "Refuse to talk about your skills"), ch("Éviter toutes les questions", "Avoid all questions") ] },
        { fr: "Quelle attitude convient le mieux dès le premier jour dans un nouveau milieu de travail?", en: "Which attitude works best on the very first day in a new workplace?",
          choices: [ ch("Observer, poser des questions et suivre les consignes", "Observing, asking questions and following instructions", true), ch("Tout changer immédiatement selon ses propres méthodes", "Immediately changing everything to your own methods"), ch("Rester silencieux sans jamais poser de question", "Staying silent and never asking questions"), ch("Critiquer les méthodes existantes dès le départ", "Criticizing existing methods right away") ] },
        tf("L'intégration au travail est aussi une occasion de bâtir son réseau professionnel.", "Workplace integration is also an opportunity to build your professional network.", true)
      ]),
      lvl(2, "Intermédiaire", "Intermediate", [
        { fr: "Un bon comportement professionnel en stage inclut...", en: "Good professional conduct during an internship includes...",
          choices: [ ch("La ponctualité, la discrétion et le respect de la confidentialité", "Punctuality, discretion and respect for confidentiality", true), ch("Le retard fréquent", "Frequent lateness"), ch("Le partage des dossiers de l'entreprise sur les réseaux sociaux", "Sharing company files on social media"), ch("L'absentéisme", "Absenteeism") ] },
        { fr: "Recevoir une rétroaction constructive d'un superviseur de stage devrait mener à...", en: "Receiving constructive feedback from an internship supervisor should lead to...",
          choices: [ ch("Ajuster son travail et poser des questions au besoin", "Adjusting your work and asking questions as needed", true), ch("Ignorer la rétroaction", "Ignoring the feedback"), ch("Se sentir offensé et cesser d'essayer", "Feeling offended and giving up"), ch("Contester systématiquement", "Systematically arguing back") ] },
        tf("Un stage réussi mène rarement à une offre d'emploi; la plupart des employeurs préfèrent embaucher à l'extérieur.", "A successful internship rarely leads to a job offer; most employers prefer to hire externally.", false)
      ]),
      lvl(3, "Avancé", "Advanced", [
        { fr: "Pendant un stage, on te demande d'effectuer une tâche pour laquelle tu ne te sens pas suffisamment formée. Quelle est la meilleure attitude?", en: "During an internship, you're asked to do a task you don't feel adequately trained for. What is the best attitude?",
          choices: [ ch("Communiquer honnêtement la situation à ton superviseur et demander de l'encadrement", "Honestly communicate the situation to your supervisor and ask for guidance", true), ch("Refuser d'obéir sans explication", "Refuse to comply without explanation"), ch("Faire la tâche sans rien dire même en cas de doute sérieux", "Do the task without saying anything even with serious doubts"), ch("Quitter le stage immédiatement", "Leave the internship immediately") ] },
        { fr: "Quelle attitude professionnelle est la plus susceptible de mener à une embauche après le stage?", en: "Which professional attitude is most likely to lead to a job offer after the internship?",
          choices: [ ch("Faire preuve de rigueur, de fiabilité et d'une bonne collaboration avec l'équipe", "Showing rigour, reliability and good teamwork", true), ch("Faire le strict minimum sans engagement", "Doing the bare minimum with no commitment"), ch("Éviter les interactions avec les collègues", "Avoiding interactions with coworkers"), ch("Contester régulièrement les méthodes de l'entreprise", "Regularly challenging the company's methods") ] },
        tf("Le stage d'intégration au travail représente une part importante du programme, avec 90 heures qui lui sont consacrées.", "The workplace integration internship represents a significant part of the program, with 90 hours dedicated to it.", true)
      ])
    ]
  }
];

const UI_TEXT = {
  fr: {
    appName: "SecretariatQuest",
    tagline: "Deviens Secrétaire de direction — DEP 5357",
    start: "Commencer l'aventure",
    yourName: "Ton prénom",
    chooseAvatar: "Choisis ton avatar",
    map: "Mon parcours",
    badges: "Badges",
    trophies: "Trophées",
    leaderboard: "Palmarès",
    profile: "Profil",
    level: "Niveau",
    xp: "XP",
    locked: "Verrouillé",
    completeToUnlock: "Termine la quête précédente pour déverrouiller",
    startQuest: "Démarrer la quête",
    retryQuest: "Reprendre la quête",
    question: "Question",
    of: "sur",
    submit: "Valider",
    next: "Suivant",
    finish: "Terminer",
    correct: "Bonne réponse!",
    incorrect: "Ce n'est pas ça...",
    questResult: "Résultat de la quête",
    score: "Score",
    passed: "Quête réussie! 🎉",
    failed: "Pas encore réussi — réessaie pour débloquer le badge (seuil: 70%)",
    backToMap: "Retour à la carte",
    newBadge: "Nouveau badge!",
    newTrophy: "Nouveau trophée!",
    hours: "heures",
    switchLang: "EN",
    privacy: "Confidentialité",
    resetProgress: "Réinitialiser tout",
    confirmReset: "Tout réinitialiser? Ton avatar, tes badges, trophées et toute ta progression seront effacés. Cette action est irréversible.",
    installApp: "Installer l'application",
    rank: "Rang",
    you: "Toi",
    leaderboardNote: "Classement local (démo) — un vrai palmarès de classe nécessite un serveur partagé.",
    completedQuests: "quêtes complétées",
    chooseVehicle: "Choisis ta machine",
    myVehicle: "Ta machine",
    vehicleGrows: "Évolue avec ton expérience",
    maxSize: "Taille maximale atteinte!",
    trueLabel: "Vrai",
    falseLabel: "Faux",
    tfPrompt: "Vrai ou faux?",
    masteredLabel: "compétences maîtrisées",
    tierLabel: "Palier",
    matchPrompt: "Touche un terme, puis sa définition qui correspond.",
    scenarioLabel: "Mise en situation",
    masteryUnlocked: "Compétence maîtrisée — badge débloqué!",
    accessCodeTitle: "Code d'accès",
    accessCodePrompt: "Entre le code d'accès fourni par ton enseignant pour continuer.",
    accessCodeTrialOver: "Ton essai gratuit de 7 jours est terminé. Entre le code d'accès fourni par ton centre de formation pour continuer.",
    accessCodePlaceholder: "Code d'accès",
    accessCodeSubmit: "Valider",
    accessCodeChecking: "Vérification...",
    accessCodeInvalid: "Code invalide ou inactif. Vérifie auprès de ton enseignant.",
    accessCodeOffline: "Connexion Internet requise pour valider ton code la première fois. Réessaie une fois connecté.",
    accessCodeNotConfigured: "L'application n'est pas encore configurée. Contacte ton enseignant.",
    welcomeHeading: "Comment ça marche",
    welcomeIntro: "Avant de commencer, voici un survol rapide de l'application.",
    welcomeSteps: [
      { icon: "🗺️", title: "Mon parcours", text: "Chaque compétence du programme est une quête sur la carte. Termine-les dans l'ordre pour avancer." },
      { icon: "📝", title: "Questions", text: "Réponds à des questions à choix multiples et vrai/faux liées à chaque compétence." },
      { icon: "🎖️", title: "Badges", text: "Réussis une quête à 70% ou plus pour débloquer son badge." },
      { icon: "🏆", title: "Trophées", text: "Décroche des trophées spéciaux pour tes exploits et ta progression." },
      { icon: "📊", title: "Palmarès", text: "Compare ton avancement avec celui du reste de la classe." },
      { icon: "👷", title: "Ton avatar", text: "Choisis ton avatar — il évolue à mesure que tu gagnes de l'expérience." }
    ]
  },
  en: {
    appName: "SecretariatQuest",
    tagline: "Become an Executive Secretary — DVS 5357",
    start: "Start the adventure",
    yourName: "Your first name",
    chooseAvatar: "Choose your avatar",
    map: "My path",
    badges: "Badges",
    trophies: "Trophies",
    leaderboard: "Leaderboard",
    profile: "Profile",
    level: "Level",
    xp: "XP",
    locked: "Locked",
    completeToUnlock: "Complete the previous quest to unlock",
    startQuest: "Start quest",
    retryQuest: "Retry quest",
    question: "Question",
    of: "of",
    submit: "Submit",
    next: "Next",
    finish: "Finish",
    correct: "Correct!",
    incorrect: "Not quite...",
    questResult: "Quest Result",
    score: "Score",
    passed: "Quest passed! 🎉",
    failed: "Not passed yet — try again to unlock the badge (threshold: 70%)",
    backToMap: "Back to map",
    newBadge: "New badge!",
    newTrophy: "New trophy!",
    hours: "hours",
    switchLang: "FR",
    privacy: "Privacy",
    resetProgress: "Reset everything",
    confirmReset: "Reset everything? Your avatar, badges, trophies and all progress will be erased. This cannot be undone.",
    installApp: "Install the app",
    rank: "Rank",
    you: "You",
    leaderboardNote: "Local (demo) ranking — a real class leaderboard needs a shared server.",
    completedQuests: "quests completed",
    chooseVehicle: "Choose your machine",
    myVehicle: "Your machine",
    vehicleGrows: "Evolves with your experience",
    maxSize: "Maximum size reached!",
    trueLabel: "True",
    falseLabel: "False",
    tfPrompt: "True or false?",
    masteredLabel: "competencies mastered",
    tierLabel: "Tier",
    matchPrompt: "Tap a term, then its matching definition.",
    scenarioLabel: "Scenario",
    masteryUnlocked: "Competency mastered — badge unlocked!",
    accessCodeTitle: "Access code",
    accessCodePrompt: "Enter the access code given by your teacher to continue.",
    accessCodeTrialOver: "Your free 7-day trial has ended. Enter the access code provided by your training center to continue.",
    accessCodePlaceholder: "Access code",
    accessCodeSubmit: "Submit",
    accessCodeChecking: "Checking...",
    accessCodeInvalid: "Invalid or inactive code. Check with your teacher.",
    accessCodeOffline: "Internet connection required to validate your code the first time. Try again once connected.",
    accessCodeNotConfigured: "The app isn't configured yet. Contact your teacher.",
    welcomeHeading: "How it works",
    welcomeIntro: "Before you start, here's a quick overview of the app.",
    welcomeSteps: [
      { icon: "🗺️", title: "My path", text: "Each program competency is a quest on the map. Complete them in order to move forward." },
      { icon: "📝", title: "Questions", text: "Answer multiple-choice and true/false questions tied to each competency." },
      { icon: "🎖️", title: "Badges", text: "Pass a quest with 70% or more to unlock its badge." },
      { icon: "🏆", title: "Trophies", text: "Earn special trophies for your achievements and progress." },
      { icon: "📊", title: "Leaderboard", text: "Compare your progress with the rest of the class." },
      { icon: "👷", title: "Your avatar", text: "Choose your avatar — it evolves as you earn experience." }
    ]
  }
};

/* ---- Paliers de niveau (basés sur XP total) ---- */
const LEVELS = [
  { min: 0,    name_fr: "Novice",       name_en: "Novice",     avatarStage: 0 },
  { min: 200,  name_fr: "Apprenti(e)",  name_en: "Apprentice", avatarStage: 2 },
  { min: 500,  name_fr: "Compétent(e)", name_en: "Competent",  avatarStage: 4 },
  { min: 1000, name_fr: "Chevronné(e)", name_en: "Seasoned",   avatarStage: 6 },
  { min: 2000, name_fr: "Expert(e)",    name_en: "Expert",     avatarStage: 9 },
  { min: 3500, name_fr: "Maître",       name_en: "Master",     avatarStage: 11 }
];

/* ---- Personnages d'avatar (ouvriers de chantier / camionneurs) ----
   Chaque personnage est dessiné en SVG dans app.js (fonction AVATAR_SVG).
   "accent" = couleur par défaut du casque/gilet, modifiable via la
   sélection de couleur. */
const AVATAR_CHARACTERS = [
 {
  "id": "fourmi",
  "name_fr": "Fourmi",
  "name_en": "Ant",
  "title_fr": "L'Organisée",
  "title_en": "The Organized One",
  "stages": [
   "🥚",
   "🥚",
   "🐜",
   "🐜",
   "🐜",
   "🐜",
   "🐜",
   "🐜",
   "🐜",
   "🐜",
   "🐜",
   "🐜"
  ]
 },
 {
  "id": "ecureuil",
  "name_fr": "Écureuil",
  "name_en": "Squirrel",
  "title_fr": "La Prévoyante",
  "title_en": "The Foresighted One",
  "stages": [
   "🥚",
   "🥚",
   "🐿️",
   "🐿️",
   "🐿️",
   "🐿️",
   "🐿️",
   "🐿️",
   "🐿️",
   "🐿️",
   "🐿️",
   "🐿️"
  ]
 },
 {
  "id": "chouette",
  "name_fr": "Chouette",
  "name_en": "Owl",
  "title_fr": "La Méthodique",
  "title_en": "The Methodical One",
  "stages": [
   "🥚",
   "🥚",
   "🐣",
   "🐣",
   "🐤",
   "🐤",
   "🦉",
   "🦉",
   "🦉",
   "🦉",
   "🦉",
   "🦉"
  ]
 },
 {
  "id": "chat",
  "name_fr": "Chat",
  "name_en": "Cat",
  "title_fr": "La Précise",
  "title_en": "The Precise One",
  "stages": [
   "🥚",
   "🥚",
   "🐱",
   "🐱",
   "🐈",
   "🐈",
   "🐈",
   "🐈",
   "🐈",
   "🐈",
   "🐈",
   "🐈"
  ]
 }
];

const AVATAR_COLORS = [
  { id: "jaune",  hex: "#f7b500", name_fr: "Jaune sécurité", name_en: "Safety Yellow" },
  { id: "orange", hex: "#ff7a1a", name_fr: "Orange chantier", name_en: "Site Orange" },
  { id: "vert",   hex: "#3bb54a", name_fr: "Vert forêt", name_en: "Forest Green" },
  { id: "bleu",   hex: "#2a7de1", name_fr: "Bleu acier", name_en: "Steel Blue" },
  { id: "rouge",  hex: "#e13c3c", name_fr: "Rouge feu", name_en: "Fire Red" }
];

/* ---- Machines de l'élève (grossissent avec le XP) ----
   Le dessin SVG de chaque machine est dans app.js (fonction vehicleSVG). */
const VEHICLE_TYPES = [
  { id: "camion", name_fr: "Camion à benne", name_en: "Dump Truck" },
  { id: "pelle", name_fr: "Pelle mécanique", name_en: "Excavator" },
  { id: "bouteur", name_fr: "Bouteur", name_en: "Bulldozer" },
  { id: "chargeuse", name_fr: "Chargeuse", name_en: "Loader" }
];

/* La hauteur affichée (en pixels) interpole entre minHeight et maxHeight
   selon le XP actuel de l'élève (voir vehicleHeight() dans app.js). La
   largeur est calculée automatiquement pour respecter les proportions
   propres à chaque machine (voir VEHICLE_VIEWBOX dans app.js). */
const VEHICLE_GROWTH = { minHeight: 78, maxHeight: 178, maxXP: 3500 };

/* ---- Commandes de cabine (questions basées sur une image) ----
   Chaque machine a 4 commandes numérotées, dessinées par cabinSVG()
   dans app.js aux coordonnées cx/cy (viewBox 0 0 360 220). Ces mêmes
   coordonnées servent à la fois à dessiner l'illustration et à
   positionner les zones cliquables des questions de type "hotspot" —
   l'image et les questions restent donc toujours alignées.
   Configuration générique à titre pédagogique — la disposition réelle
   varie selon le fabricant et le modèle (à valider par l'enseignant). */
const CABIN_CONTROLS = {
  pelle: [
    { num: 1, cx: 100, cy: 168, kind: "joystick",
      label_fr: "Joystick gauche", label_en: "Left joystick",
      desc_fr: "Contrôle la rotation de la tourelle et le godet",
      desc_en: "Controls turret rotation and the bucket" },
    { num: 2, cx: 210, cy: 168, kind: "joystick",
      label_fr: "Joystick droit", label_en: "Right joystick",
      desc_fr: "Contrôle la flèche et le bras (balancier)",
      desc_en: "Controls the boom and the stick (arm)" },
    { num: 3, cx: 160, cy: 205, kind: "pedal",
      label_fr: "Pédales de translation", label_en: "Travel pedals",
      desc_fr: "Font avancer ou reculer les chenilles",
      desc_en: "Move the tracks forward or backward" },
    { num: 4, cx: 320, cy: 150, kind: "button",
      label_fr: "Klaxon", label_en: "Horn button",
      desc_fr: "Avertit les personnes autour de la machine avant un mouvement",
      desc_en: "Warns people around the machine before a movement" }
  ],
  bouteur: [
    { num: 1, cx: 110, cy: 172, kind: "lever",
      label_fr: "Levier de la lame", label_en: "Blade control lever",
      desc_fr: "Lève, abaisse et incline la lame",
      desc_en: "Raises, lowers and tilts the blade" },
    { num: 2, cx: 210, cy: 172, kind: "lever",
      label_fr: "Manettes de direction (chenilles)", label_en: "Steering clutch levers",
      desc_fr: "Contrôlent la direction en ralentissant une chenille à la fois",
      desc_en: "Control steering by slowing one track at a time" },
    { num: 3, cx: 160, cy: 205, kind: "pedal",
      label_fr: "Pédale de frein", label_en: "Brake pedal",
      desc_fr: "Ralentit ou immobilise la machine",
      desc_en: "Slows or stops the machine" },
    { num: 4, cx: 320, cy: 150, kind: "button",
      label_fr: "Klaxon", label_en: "Horn button",
      desc_fr: "Avertit les personnes autour de la machine avant un mouvement",
      desc_en: "Warns people around the machine before a movement" }
  ],
  chargeuse: [
    { num: 1, cx: 210, cy: 168, kind: "lever",
      label_fr: "Levier de commande du godet", label_en: "Bucket control lever",
      desc_fr: "Lève, abaisse et bascule le godet",
      desc_en: "Raises, lowers and tilts the bucket" },
    { num: 2, cx: 110, cy: 172, kind: "wheel",
      label_fr: "Volant de direction", label_en: "Steering wheel",
      desc_fr: "Contrôle la direction des roues",
      desc_en: "Controls the direction of the wheels" },
    { num: 3, cx: 160, cy: 205, kind: "pedal",
      label_fr: "Pédale d'accélérateur", label_en: "Accelerator pedal",
      desc_fr: "Contrôle le régime moteur et la vitesse",
      desc_en: "Controls engine speed and travel speed" },
    { num: 4, cx: 320, cy: 150, kind: "button",
      label_fr: "Klaxon", label_en: "Horn button",
      desc_fr: "Avertit les personnes autour de la machine avant un mouvement",
      desc_en: "Warns people around the machine before a movement" }
  ],
  niveleuse: [
    { num: 1, cx: 190, cy: 172, kind: "lever",
      label_fr: "Leviers de la lame", label_en: "Blade control levers",
      desc_fr: "Ajustent l'angle, la hauteur et l'inclinaison de la lame",
      desc_en: "Adjust the blade's angle, height and tilt" },
    { num: 2, cx: 100, cy: 172, kind: "wheel",
      label_fr: "Volant de direction", label_en: "Steering wheel",
      desc_fr: "Contrôle la direction des roues avant",
      desc_en: "Controls the direction of the front wheels" },
    { num: 3, cx: 255, cy: 172, kind: "switch",
      label_fr: "Commande d'articulation du châssis", label_en: "Frame articulation control",
      desc_fr: "Articule le châssis pour resserrer le rayon de braquage",
      desc_en: "Articulates the frame to tighten the turning radius" },
    { num: 4, cx: 320, cy: 150, kind: "button",
      label_fr: "Klaxon", label_en: "Horn button",
      desc_fr: "Avertit les personnes autour de la machine avant un mouvement",
      desc_en: "Warns people around the machine before a movement" }
  ]
};

/* ---- Trophées (méta-réussites) ---- */
const TROPHIES = [
  { id: "t_first", name_fr: "Premier pas", name_en: "First Step", icon: "🥉",
    desc_fr: "Réussir ton premier palier de compétence", desc_en: "Pass your first competency tier",
    check: (state) => Object.keys(state.completed).length >= 1 },
  { id: "t_half", name_fr: "Mi-parcours", name_en: "Halfway There", icon: "🥈",
    desc_fr: "Maîtriser 10 compétences (palier Avancé)", desc_en: "Master 10 competencies (Advanced tier)",
    check: (state) => (state.badges || []).length >= 10 },
  { id: "t_all", name_fr: "Diplômé virtuel", name_en: "Virtual Graduate", icon: "🏆",
    desc_fr: "Maîtriser les 20 compétences du programme", desc_en: "Master all 20 competencies of the program",
    check: (state) => (state.badges || []).length >= 20 },
  { id: "t_perfect", name_fr: "Sans faute", name_en: "Flawless", icon: "💯",
    desc_fr: "Obtenir 100% à un palier", desc_en: "Score 100% on a tier",
    check: (state) => Object.values(state.completed).some(s => s.score === 100) },
  { id: "t_safety", name_fr: "Zone sécurité", name_en: "Safety Zone", icon: "🦺",
    desc_fr: "Réussir le palier Débutant du module Santé et sécurité", desc_en: "Pass the Beginner tier of the Health & Safety module",
    check: (state) => state.completed["c02_1"] && state.completed["c02_1"].score >= 70 },
  { id: "t_streak", name_fr: "Assidu", name_en: "Dedicated", icon: "🔥",
    desc_fr: "Se connecter 3 jours différents", desc_en: "Log in on 3 different days",
    check: (state) => (state.loginDays || []).length >= 3 },
  { id: "t_podium", name_fr: "Sur le podium", name_en: "On the Podium", icon: "🏅",
    desc_fr: "Atteindre le top 3 du palmarès", desc_en: "Reach the top 3 of the leaderboard",
    check: (state) => (LEADERBOARD_SEED.filter(p => p.xp > state.xp).length) < 3 },
  { id: "t_matcher", name_fr: "Bon association", name_en: "Great Match", icon: "🧩",
    desc_fr: "Réussir 15 questions d'association de termes", desc_en: "Complete 15 term-matching questions",
    check: (state) => (state.matchesCompleted || 0) >= 15 }
];

/* ---- Palmarès (données d'exemple — classe fictive) ----
   À remplacer par de vraies données élèves lorsqu'un backend
   partagé sera branché (voir README). */
const LEADERBOARD_SEED = [
  { name: "Mia-Rose T.", xp: 3120, avatarChar: "operatrice_bouteur", avatarColor: "vert" },
  { name: "Xavier L.", xp: 2450, avatarChar: "contremaitre", avatarColor: "bleu" },
  { name: "Sam D.", xp: 1780, avatarChar: "camionneur", avatarColor: "orange" },
  { name: "Alicia P.", xp: 1290, avatarChar: "camionneuse", avatarColor: "rouge" },
  { name: "Kevin R.", xp: 860, avatarChar: "contremaitre", avatarColor: "jaune" },
  { name: "Noémie B.", xp: 430, avatarChar: "mecanicienne", avatarColor: "bleu" },
  { name: "Tommy G.", xp: 120, avatarChar: "camionneur", avatarColor: "vert" }
];
