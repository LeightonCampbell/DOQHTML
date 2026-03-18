/**
 * Content for each tech-support sub-service landing page.
 * Pain → Agitate → Solve structure; conversational, high-converting.
 */

export type PainCard = { title: string; body: string };
export type AgitateStat = { num: string; label: string; sub: string };
export type SolvePoint = { strong: string; text: string };
export type ProcessStep = { title: string; body: string };
export type FAQItem = { q: string; a: string };

export type TechLandingContent = {
  slug: string;
  serviceLabel: string; // e.g. "Remote Support"
  title: string;
  description: string;
  canonicalPath: string;
  hero: {
    h1: string;
    sub: string;
    /** Optional hero background image for this spoke page */
    image?: string;
    imageAlt?: string;
  };
  pain: {
    eyebrow: string;
    heading: string;
    intro: string;
    cards: PainCard[];
  };
  agitate: {
    heading: string;
    highlight: string;
    paragraphs: string[];
    stats: AgitateStat[];
  };
  solve: {
    eyebrow: string;
    heading: string;
    paragraphs: string[];
    points: SolvePoint[];
    /** Optional image for the solution section */
    image?: string;
    imageAlt?: string;
  };
  process: {
    eyebrow: string;
    heading: string;
    steps: ProcessStep[];
  };
  guarantee: { title: string; body: string }[];
  faq: FAQItem[];
  ctaHeading: string;
  ctaSub: string;
};

const baseUrl = 'https://www.dealsofquality.com';

const sharedProcessSteps: ProcessStep[] = [
  { title: 'Tell us what\'s wrong', body: 'Call, chat, or book online. Describe the issue in plain English — we\'ll figure out the technical details and match you to the right specialist.' },
  { title: 'We match you to a tech', body: 'A certified technician who specializes in your exact issue is assigned — remote or on-site, your choice. You get a clear quote before we start.' },
  { title: 'Problem solved', body: 'We fix the issue completely, explain what happened in plain language, and make sure everything is working before we leave or disconnect.' },
  { title: 'Stay protected', body: 'We leave you with a quick-reference guide and follow-up support so the problem stays solved long after we\'re gone.' },
];

const sharedGuarantee = [
  { title: '30-Day Service Guarantee', body: 'If the same issue returns within 30 days of our visit, we come back and fix it at no additional charge. No runaround.' },
  { title: 'Upfront Price. Final Price.', body: 'We quote before we start. What we quote is what you pay. No surprise charges, no hourly billing that drags on forever.' },
  { title: 'Certified, background-checked technicians', body: 'Every technician is certified on the platforms they work on and has passed a thorough background check. We don\'t cut corners on who enters your home or accesses your devices.' },
];

export const techLandingSlugs = [
  'remote-support',
  'computer-repair',
  'network-setup',
  'virus-removal',
  'data-backup-recovery',
  'cloud-services',
  'software-support',
  'printer-setup',
] as const;

export type TechLandingSlug = (typeof techLandingSlugs)[number];

const content: Record<TechLandingSlug, TechLandingContent> = {
  'remote-support': {
    slug: 'remote-support',
    serviceLabel: 'Remote Support',
    title: 'Remote Tech Support | Deals of Quality – 24/7 Fixes Without the Wait',
    description: 'Get software glitches, OS errors, and cryptic messages fixed fast via secure remote access. Certified technicians, 24/7. No drive, no wait.',
    canonicalPath: '/tech-support/remote-support/',
    hero: {
      h1: 'Stop staring at error messages<br /><em>that make no sense.</em>',
      sub: 'Our certified technicians connect securely to your device and fix software glitches, OS errors, and setup issues in real time — no drive, no wait. Available 24/7.',
      image: '/images/remote-support-hero.jpg',
      imageAlt: 'Remote technician helping a customer over a secure connection',
    },
    pain: {
      eyebrow: 'THE REAL COST OF WAITING',
      heading: 'When your device acts up, <em>every minute feels like an hour.</em>',
      intro: 'You\'ve got work to do, bills to pay, or a presentation in an hour. A frozen screen, a cryptic error, or a printer that "just won\'t connect" shouldn\'t derail your whole day. Here\'s what that frustration is really costing you.',
      cards: [
        { title: 'Small glitches become big blocks', body: 'A slow browser, a stuck update, or a driver that stopped working can shut down your whole workflow. What started as a five-minute annoyance becomes hours of Googling, restarts, and dead ends — while your actual work sits there waiting.' },
        { title: 'DIY fixes often make things worse', body: 'One wrong setting or a sketchy "fix" from a forum can lock you out, hide your files, or break something that was only partly broken. The average person wastes over four hours on failed DIY tech fixes before giving up and calling for help anyway.' },
        { title: 'Your time is worth more than the drive', body: 'Dragging your laptop to a repair shop means time off work, waiting in line, and sometimes leaving your device for days. For most software and setup issues, you don\'t need to leave your home — you just need someone who knows what they\'re doing, right now.' },
      ],
    },
    agitate: {
      heading: 'The average person has <em class="agitate-highlight">3 unresolved tech issues</em> on their device right now.',
      highlight: '3 unresolved tech issues',
      paragraphs: [
        'That update that never finished. The app that crashes every time you open it. The Wi‑Fi that drops when you move to the other room. Each one nags at you — a background hum of "I should really get that fixed" that never quite goes away.',
        'And every day you put it off, you lose a little more productivity, a little more peace of mind. Worse, waiting can turn a simple fix into a full reinstall or a lost file. What could have been a 20‑minute remote session becomes a half-day disaster.',
        'The worst part? Finding a trustworthy remote tech on your own is its own headache. Random call centers, unclear credentials, and one-size-fits-all scripts. We exist so you get a real specialist, a clear price, and a fix that actually sticks.',
      ],
      stats: [
        { num: '4.2h', label: 'average time wasted per failed DIY tech fix', sub: 'Not counting the stress. Or the risk of making it worse.' },
        { num: '&lt;15m', label: 'typical time to connect with our remote tech', sub: 'From "I need help" to someone on your screen, fixing it.' },
        { num: '24/7', label: 'remote support availability', sub: 'Night, weekend, holiday — when it breaks, we\'re there.' },
      ],
    },
    solve: {
      eyebrow: 'THE SOLUTION',
      heading: 'Real technicians. Secure connection. <em>Fixed in real time.</em>',
      paragraphs: [
        'Deals of Quality remote support isn\'t a call center reading from a script. You get a certified technician who connects securely to your device, sees exactly what you see, and fixes the issue while you watch — or step away and grab coffee. We use the same remote tools that enterprise IT departments use, with the same security and transparency.',
        'You describe the problem. We connect, diagnose, and fix. When we\'re done, we explain what was wrong and how to avoid it next time. If the same issue comes back within 30 days, we fix it again at no extra charge.',
      ],
      points: [
        { strong: 'No driving, no waiting', text: 'We connect to your device over a secure link. Same-day and next-day slots available; many issues can be handled in under an hour.' },
        { strong: 'One price, no surprises', text: 'We quote before we start. What we quote is what you pay — no hourly creep or hidden fees.' },
        { strong: 'Certified on your platform', text: 'Windows, Mac, or mixed environment — our techs are certified on what you use, so you get the right fix the first time.' },
      ],
      image: '/images/remote-support-solution.jpg',
      imageAlt: 'Laptop screen showing a remote support session in progress',
    },
    process: { eyebrow: 'HOW IT WORKS', heading: 'From "something\'s wrong" to "all set" in four steps.', steps: sharedProcessSteps },
    guarantee: sharedGuarantee,
    faq: [
      { q: 'Is remote support secure?', a: 'Yes. We use enterprise-grade remote access tools with encryption and your explicit permission. You can see everything we do, and you can disconnect at any time.' },
      { q: 'How fast can I get help?', a: 'Average connection time is under 15 minutes from when you call or book. We offer same-day and 24/7 availability for urgent issues.' },
      { q: 'What if you can\'t fix it remotely?', a: 'If the issue requires hands-on repair (e.g. hardware), we\'ll tell you upfront and can schedule an on-site visit. No charge for the remote session if we can\'t resolve it.' },
      { q: 'Do you work on both Windows and Mac?', a: 'Yes. Our technicians are certified on Windows, macOS, and common software. We match you to a tech who knows your setup.' },
    ],
    ctaHeading: 'Your screen shouldn\'t own your day.',
    ctaSub: 'Connect with a certified tech in under 15 minutes. Book online or call now.',
  },

  'computer-repair': {
    slug: 'computer-repair',
    serviceLabel: 'Computer Repair',
    title: 'Computer & Device Repair | Deals of Quality – On-Site PC & Mac Repair',
    description: 'On-site PC and Mac repair for hardware failures, slow performance, and broken components. Certified technicians at your location. Transparent pricing, 30-day guarantee.',
    canonicalPath: '/tech-support/computer-repair/',
    hero: {
      h1: 'Your computer shouldn\'t slow you down<br /><em>or leave you stranded.</em>',
      sub: 'Hardware failures, broken components, slow performance — our certified technicians come to you. We diagnose, repair, and get you back up and running with upfront pricing and a 30-day guarantee.',
      image: '/images/computer-repair-hero.jpg',
      imageAlt: 'Technician repairing a desktop computer on a workbench',
    },
    pain: {
      eyebrow: 'THE REAL COST OF WAITING',
      heading: 'A failing computer doesn\'t get better on its own. <em>It gets worse.</em>',
      intro: 'That whirring fan. The screen that flickers. The laptop that won\'t hold a charge. You\'ve been hoping it\'ll "just hold on" a little longer — but here\'s what that hope is costing you.',
      cards: [
        { title: 'Hardware failures escalate fast', body: 'A overheating CPU, a failing drive, or a loose connection can cause data loss, permanent damage, or a full system failure. What might have been a $150 fix today can become a $800 replacement — or worse, lost files you can\'t get back.' },
        { title: 'Slow performance steals hours every week', body: 'A sluggish computer doesn\'t just annoy you — it adds up. Ten extra seconds per task, dozens of times a day, across months. That\'s hundreds of hours of lost productivity and mental drain. Often it\'s fixable with a proper cleanup, upgrade, or repair.' },
        { title: 'The wrong repair shop can make it worse', body: 'Unvetted shops sometimes replace parts that didn\'t need replacing, lose your data, or hand you back a machine that fails again in weeks. You deserve a certified technician who diagnoses correctly and stands behind the work.' },
      ],
    },
    agitate: {
      heading: 'The average PC user puts off repairs for <em class="agitate-highlight">over 6 months</em> — and 1 in 4 then lose data.',
      highlight: 'over 6 months',
      paragraphs: [
        'You tell yourself you\'ll back everything up "this weekend." You\'ll take it in "when things calm down." Meanwhile, every boot gets slower, every crash more frequent. One day the drive doesn\'t spin up at all.',
        'Data recovery is possible in many cases — but it\'s expensive and not guaranteed. The real fix is getting a proper diagnosis and repair before the point of no return. And when you do get help, you want someone who won\'t upsell you, lose your files, or leave you with the same problem in a month.',
        'We exist so you get a certified technician at your door, a clear price before any work starts, and a 30-day guarantee so the fix actually holds.',
      ],
      stats: [
        { num: '67%', label: 'of users who delayed repair said the problem got worse', sub: '...and cost more to fix — or led to data loss.' },
        { num: '30 days', label: 'service guarantee on every repair', sub: 'Same issue returns? We fix it again at no extra charge.' },
        { num: 'On-site', label: 'we come to you', sub: 'No lugging your tower or laptop to a strip-mall shop.' },
      ],
    },
    solve: {
      eyebrow: 'THE SOLUTION',
      heading: 'Certified repair. At your location. <em>Done right.</em>',
      paragraphs: [
        'Deals of Quality computer repair brings certified technicians to your home or office. We diagnose hardware and software issues, perform repairs and upgrades, and get your PC or Mac back to speed — with upfront pricing and no surprise parts bills.',
        'We don\'t replace parts for the sake of it. We find the root cause, fix it, and leave you with a machine that works and a clear explanation of what was wrong. If the same issue comes back within 30 days, we come back and make it right at no additional charge.',
      ],
      points: [
        { strong: 'We come to you', text: 'No need to unplug, pack, or drive. We work at your location and leave your setup intact.' },
        { strong: 'Upfront price, final price', text: 'We quote before we start. What we quote is what you pay — no hourly creep or hidden parts markup.' },
        { strong: 'Certified on your device', text: 'PC or Mac, desktop or laptop — we match you to a tech who knows your hardware and your OS.' },
      ],
      image: '/images/computer-repair-solution.jpg',
      imageAlt: 'Side view of an open computer case with components being tested',
    },
    process: { eyebrow: 'HOW IT WORKS', heading: 'From broken or slow to fixed in four steps.', steps: sharedProcessSteps },
    guarantee: sharedGuarantee,
    faq: [
      { q: 'Do you repair both PCs and Macs?', a: 'Yes. We work on Windows PCs and Apple Macs — desktops and laptops. We match you to a technician certified on your type of device.' },
      { q: 'Do you come to my home?', a: 'Yes. We offer on-site repair in our service areas. You don\'t need to bring your computer anywhere — we bring the expertise to you.' },
      { q: 'What if the repair is more expensive than the device is worth?', a: 'We\'ll give you an honest assessment. If repair doesn\'t make sense, we\'ll say so and can help with data recovery or migration to a new device instead.' },
      { q: 'How long does a typical repair take?', a: 'Many issues are resolved in a single visit. Complex hardware repairs may require ordering parts; we\'ll give you a clear timeline and quote upfront.' },
    ],
    ctaHeading: 'Don\'t wait until the screen goes dark.',
    ctaSub: 'Get a certified technician at your door. Book online or call now.',
  },

  'network-setup': {
    slug: 'network-setup',
    serviceLabel: 'Network Setup',
    title: 'Network Setup & Support | Deals of Quality – Wi-Fi, Router, Mesh & Security',
    description: 'Wi-Fi installation, router configuration, mesh networks, and network security. Fast, stable, and protected. Certified technicians, upfront pricing.',
    canonicalPath: '/tech-support/network-setup/',
    hero: {
      h1: 'Your Wi-Fi should just work.<br /><em>Every room. Every device.</em>',
      sub: 'From router setup and mesh networks to security hardening — we get your connection fast, stable, and protected. Certified technicians, clear pricing, and a network you can rely on.',
      image: '/images/tech-support/network-setup-hero.jpg',
      imageAlt: 'Floor plan with Wi‑Fi coverage zones highlighted',
    },
    pain: {
      eyebrow: 'THE REAL COST OF WAITING',
      heading: 'A bad network doesn\'t just buffer. <em>It costs you time, sleep, and security.</em>',
      intro: 'Dead zones, dropped Zoom calls, and that one device that "never stays connected" — you\'ve been living with it for months. Here\'s what that compromise is really costing you.',
      cards: [
        { title: 'Weak Wi-Fi kills productivity and peace of mind', body: 'Working from home, streaming, or just browsing — when the connection drops or crawls, everything stops. You move to the "good spot," reboot the router again, or give up. That\'s not normal; it\'s fixable with the right setup and placement.' },
        { title: 'Default router settings are a security risk', body: 'Out-of-the-box routers often ship with weak or default passwords, outdated firmware, and settings that leave your network open to snooping or abuse. A quick professional setup locks things down and keeps your data and devices safe.' },
        { title: 'DIY mesh and extenders often make things worse', body: 'Adding the wrong extender or misplacing mesh nodes can create interference, handoff problems, and even slower speeds. The right layout and equipment make the difference between "it works in the living room" and "it works everywhere."' },
      ],
    },
    agitate: {
      heading: 'Roughly <em class="agitate-highlight">70% of home networks</em> have at least one major security or performance issue.',
      highlight: '70% of home networks',
      paragraphs: [
        'Maybe the Wi-Fi is fine in one room and useless in another. Maybe you\'ve never changed the default admin password. Maybe you have no idea which devices are on your network or whether your kids\' devices are properly locked down.',
        'Every day you run on a poorly configured or insecure network, you\'re one step closer to a breach, a failed work call, or another evening of "why won\'t it load?" We don\'t think you should have to become a network engineer to have a network that works and is safe.',
        'We exist so you get a certified tech who designs the right setup, configures it properly, and leaves you with a network that\'s fast, stable, and locked down.',
      ],
      stats: [
        { num: '70%', label: 'of home networks have security or performance issues', sub: 'Default passwords, poor coverage, outdated firmware.' },
        { num: '1 visit', label: 'to design and configure your network', sub: 'Right equipment, placement, and settings — done once, done right.' },
        { num: 'Ongoing', label: 'support if something changes', sub: 'New device, new plan, or new problem — we\'re a call away.' },
      ],
    },
    solve: {
      eyebrow: 'THE SOLUTION',
      heading: 'A network that\'s fast, stable, and <em>actually secure.</em>',
      paragraphs: [
        'Deals of Quality network setup isn\'t just "plug in the router." We assess your space, recommend the right equipment (including mesh if you need it), configure everything for performance and security, and leave you with a network you can trust.',
        'We set strong passwords, update firmware, lock down admin access, and show you the basics so you\'re not left in the dark. If something goes wrong or you add new devices, we\'re there to help.',
      ],
      points: [
        { strong: 'Coverage that matches your space', text: 'We place and configure routers and mesh nodes so you get strong signal where you need it — no more dead zones or guessing.' },
        { strong: 'Security done right', text: 'Strong passwords, updated firmware, and locked-down settings so your network isn\'t the weak link.' },
        { strong: 'One price, no surprises', text: 'We quote before we start. Equipment recommendations are clear; labor and setup are transparent.' },
      ],
      image: '/images/tech-support/network-setup-solution.jpg',
      imageAlt: 'Technician configuring a Wi‑Fi router on a desk',
    },
    process: { eyebrow: 'HOW IT WORKS', heading: 'From "my Wi-Fi is a mess" to "it just works" in four steps.', steps: sharedProcessSteps },
    guarantee: sharedGuarantee,
    faq: [
      { q: 'Do I need to buy equipment before you come?', a: 'Not necessarily. We can recommend specific routers or mesh systems based on your space and needs; you can buy them yourself or we can source and install. We\'ll quote everything upfront.' },
      { q: 'Can you fix slow Wi-Fi without replacing everything?', a: 'Often yes. Sometimes it\'s placement, channel selection, or settings. We diagnose first and only recommend new equipment if it\'s the right fix.' },
      { q: 'What about security for smart home and IoT devices?', a: 'We can segment or lock down IoT devices, set up guest networks, and ensure your smart home doesn\'t become a back door into your network.' },
      { q: 'Do you support business networks?', a: 'Yes. We work with home offices and small businesses — same quality and transparency, with options for ongoing support if needed.' },
    ],
    ctaHeading: 'Stop buffering. Start living.',
    ctaSub: 'Get a network that works everywhere and stays secure. Book online or call now.',
  },

  'virus-removal': {
    slug: 'virus-removal',
    serviceLabel: 'Virus & Malware Removal',
    title: 'Virus & Malware Removal | Deals of Quality – Deep Scan, Removal & Hardening',
    description: 'Deep-scan diagnostics, complete threat removal, and post-removal hardening. Certified technicians so what got in once never gets in again.',
    canonicalPath: '/tech-support/virus-removal/',
    hero: {
      h1: 'That pop-up isn\'t "just a bug."<br /><em>And waiting could cost you everything.</em>',
      sub: 'Viruses, malware, and ransomware don\'t get better on their own. Our certified technicians run deep scans, remove every trace of the threat, and harden your system so it doesn\'t happen again.',
      image: '/images/tech-support/virus-removal-hero.jpg',
      imageAlt: 'Computer screen with warning symbols indicating a virus infection',
    },
    pain: {
      eyebrow: 'THE REAL COST OF WAITING',
      heading: 'Malware doesn\'t sit still. <em>It spreads, steals, and locks.</em>',
      intro: 'You clicked something. Or someone else did. Now you\'re seeing pop-ups, slow performance, or worse — and you\'re hoping a quick scan will fix it. Here\'s the reality.',
      cards: [
        { title: 'Malware spreads while you wait', body: 'Keyloggers, trojans, and ransomware don\'t announce themselves. They steal passwords, hijack files, or encrypt your data and demand payment. Every day you delay, the damage can multiply — and "free" scans often miss the root cause.' },
        { title: 'DIY removal often leaves traces', body: 'Deleting one file or running a single tool might hide the symptom, but many threats install backups, change system settings, or reinfect from another device. Incomplete removal means the problem comes back — or something worse appears later.' },
        { title: 'Your data and identity are on the line', body: 'Bank details, photos, work documents, and personal accounts can all be exposed or encrypted. The cost of proper removal is a fraction of the cost of identity theft, ransom, or lost files.' },
      ],
    },
    agitate: {
      heading: 'Over <em class="agitate-highlight">1 in 3 consumers</em> have had a device infected with malware — and many didn\'t get it fully cleaned.',
      highlight: '1 in 3 consumers',
      paragraphs: [
        'You\'re not alone. Malware gets in through email, ads, downloads, and USB drives. Once it\'s there, it can hide, replicate, and wait. A quick scan might say "clean" while something still runs in the background.',
        'Proper removal means deep scanning, manual review of suspicious processes and startup items, and hardening — stronger passwords, updated software, and safer habits. Half measures leave you exposed again.',
        'We exist so you get a certified technician who finds and removes every trace, explains what happened, and helps you lock the door so it doesn\'t happen again.',
      ],
      stats: [
        { num: '1 in 3', label: 'consumers have had a device infected', sub: 'Many never got a full, professional cleanup.' },
        { num: 'Deep scan', label: 'plus manual review', sub: 'We don\'t rely on one tool — we verify the threat is gone.' },
        { num: 'Hardening', label: 'after removal', sub: 'So what got in once doesn\'t get in again.' },
      ],
    },
    solve: {
      eyebrow: 'THE SOLUTION',
      heading: 'Complete removal. No traces. <em>And a system that stays clean.</em>',
      paragraphs: [
        'Deals of Quality virus and malware removal starts with a thorough diagnosis. We run professional-grade scans, check for rootkits and persistence mechanisms, and remove every trace of the threat. Then we harden your system — updates, settings, and best practices — so you\'re not left vulnerable again.',
        'We work remotely or on-site, depending on the situation. When we\'re done, we explain what we found, what we did, and what you should do next. If the same type of infection returns within 30 days due to our oversight, we address it at no extra charge.',
      ],
      points: [
        { strong: 'Deep scan, not just a quick fix', text: 'We use multiple tools and manual review to find and remove every trace — including what generic scans miss.' },
        { strong: 'Post-removal hardening', text: 'We update software, lock down settings, and give you clear steps so your system stays protected.' },
        { strong: 'Plain-English explanation', text: 'You\'ll know what happened, how it got in, and how to avoid it next time.' },
      ],
      image: '/images/tech-support/virus-removal-solution.jpg',
      imageAlt: 'Technician running security scans on a desktop computer',
    },
    process: { eyebrow: 'HOW IT WORKS', heading: 'From infected to clean and secure in four steps.', steps: sharedProcessSteps },
    guarantee: sharedGuarantee,
    faq: [
      { q: 'Can you remove ransomware?', a: 'We can remove the malware and restore system functionality. Decrypting files encrypted by ransomware is not always possible; we\'ll assess and be honest about recovery options. Prevention and backups are critical.' },
      { q: 'Do you work remotely for virus removal?', a: 'Yes, in many cases. We connect securely and run scans and removal remotely. If the system is too compromised to connect safely, we may recommend on-site or backup-and-wipe options.' },
      { q: 'Will you need to reinstall my operating system?', a: 'Only if the infection is too deep to clean safely. We always try to remove the threat and preserve your data first; we\'ll explain the options before doing anything drastic.' },
      { q: 'How do I prevent this from happening again?', a: 'We\'ll harden your system and walk you through best practices: updates, strong passwords, avoiding suspicious links and downloads, and backups. We can also set up ongoing monitoring if you want.' },
    ],
    ctaHeading: 'Don\'t let malware own your device.',
    ctaSub: 'Get a full scan, removal, and hardening. Book online or call now.',
  },

  'data-backup-recovery': {
    slug: 'data-backup-recovery',
    serviceLabel: 'Data Backup & Recovery',
    title: 'Data Backup & Recovery | Deals of Quality – Recover Lost Files & Set Up Backups',
    description: 'Recover data from crashed drives, failed devices, and accidental deletion. Then we set up backup systems so it never happens again.',
    canonicalPath: '/tech-support/data-backup-recovery/',
    hero: {
      h1: 'Your files shouldn\'t disappear<br /><em>when your device does.</em>',
      sub: 'Whether your hard drive crashed or you accidentally deleted years of photos — we recover what we can and set up backup systems so it never happens again. Certified technicians, transparent pricing.',
      image: '/images/tech-support/data-backup-recovery-hero.jpg',
      imageAlt: 'External drives and cloud icons representing data backup',
    },
    pain: {
      eyebrow: 'THE REAL COST OF WAITING',
      heading: 'Lost data doesn\'t come back on its own. <em>And "I\'ll back up later" often means never.</em>',
      intro: 'That click. That crash. That moment when you realize the folder is gone. You\'ve been meaning to back everything up "someday" — but here\'s what that delay can cost.',
      cards: [
        { title: 'Every day you run without a backup is a gamble', body: 'Hard drives fail. Devices get lost, stolen, or damaged. One accidental delete or ransomware attack can wipe years of photos, work, and records. Recovery is possible in many cases — but it\'s expensive and not guaranteed. The real fix is a backup system before disaster strikes.' },
        { title: 'DIY recovery can make things worse', body: 'Running random "recovery" software or opening the drive yourself can overwrite the very data you\'re trying to save. Professional recovery uses the right tools and procedures to maximize what can be restored — and to avoid making it worse.' },
        { title: 'Scattered files aren\'t a backup', body: 'Having copies on another drive or "in the cloud somewhere" often means you don\'t know what\'s where, what\'s current, or what\'s actually restorable. A proper backup strategy is automated, tested, and easy to restore from.' },
      ],
    },
    agitate: {
      heading: 'Roughly <em class="agitate-highlight">1 in 3 people</em> have lost important digital files — and most had no real backup.',
      highlight: '1 in 3 people',
      paragraphs: [
        'Photos, tax documents, work projects, and years of correspondence — when they\'re gone, the emotional and practical cost is enormous. "I didn\'t think it would happen to me" is what everyone says afterward.',
        'Recovery isn\'t magic. In some cases we can pull data off failed drives or restore from accidental deletion. In others, the damage is too severe. The only sure way to sleep at night is a backup system that runs automatically and that you\'ve actually tested.',
        'We exist so you get expert recovery when disaster strikes — and a clear, reliable backup plan so it doesn\'t strike twice.',
      ],
      stats: [
        { num: '1 in 3', label: 'people have lost important digital files', sub: 'Most had no automated, tested backup.' },
        { num: 'Recovery', label: 'when possible, before more damage', sub: 'The sooner you stop using the device, the better the odds.' },
        { num: 'Backup', label: 'set up so it never happens again', sub: 'Automated, redundant, and restorable.' },
      ],
    },
    solve: {
      eyebrow: 'THE SOLUTION',
      heading: 'Recover what we can. Back up what you have. <em>Sleep better.</em>',
      paragraphs: [
        'Deals of Quality data backup and recovery does two things: we recover data from failed drives, accidental deletion, and damaged devices when possible — and we set up backup systems (local and/or cloud) so your important files are protected going forward.',
        'We don\'t promise miracles; we promise an honest assessment and the best possible outcome. When we set up backups, we make sure they\'re automated, redundant where it matters, and actually restorable. You\'ll know exactly what\'s backed up and how to get it back.',
      ],
      points: [
        { strong: 'Recovery first, then backup', text: 'We maximize what we can recover, then design a backup plan that fits your data and your peace of mind.' },
        { strong: 'No surprise fees', text: 'We quote recovery and backup setup upfront. You\'ll know the cost before we start.' },
        { strong: 'You\'ll know how to restore', text: 'We don\'t just set it and leave — we show you how to verify and restore so you\'re never guessing.' },
      ],
      image: '/images/tech-support/data-backup-recovery-solution.jpg',
      imageAlt: 'Technician reviewing recovered files on a laptop',
    },
    process: { eyebrow: 'HOW IT WORKS', heading: 'From "I lost everything" to recovered and protected in four steps.', steps: sharedProcessSteps },
    guarantee: sharedGuarantee,
    faq: [
      { q: 'Can you recover data from a dead hard drive?', a: 'Often yes, depending on the type of failure. We assess the drive and use professional tools and procedures. If the damage is severe, we\'ll be honest and may refer to a specialist lab.' },
      { q: 'What if I accidentally deleted files?', a: 'In many cases we can recover recently deleted files, especially if you haven\'t overwritten the space. The sooner you stop using the device, the better. We\'ll walk you through next steps.' },
      { q: 'What kind of backup do you set up?', a: 'We tailor it to you: local external drives, cloud (e.g. Backblaze, iCloud, Google), or both. We focus on automation and ease of restore so you don\'t have to remember to back up.' },
      { q: 'How much does data recovery cost?', a: 'It depends on the type of failure and the amount of data. We give an assessment and quote before starting. Backup setup is quoted separately and is typically a one-time fee plus any subscription for cloud storage.' },
    ],
    ctaHeading: 'Don\'t wait for the next crash.',
    ctaSub: 'Recover your data and set up backups that work. Book online or call now.',
  },

  'cloud-services': {
    slug: 'cloud-services',
    serviceLabel: 'Cloud Services',
    title: 'Cloud Services Setup & Support | Deals of Quality – Microsoft 365, Google & More',
    description: 'Setup, migration, and ongoing management of Microsoft 365, Google Workspace, and other cloud platforms. For homes and small businesses.',
    canonicalPath: '/tech-support/cloud-services/',
    hero: {
      h1: 'The cloud should simplify your life.<br /><em>Not add another headache.</em>',
      sub: 'Microsoft 365, Google Workspace, and other cloud platforms — we handle setup, migration, and ongoing support so you can work and collaborate without the tech headaches.',
      image: '/images/tech-support/cloud-services-hero.jpg',
      imageAlt: 'Team collaborating in front of a large screen with cloud icons',
    },
    pain: {
      eyebrow: 'THE REAL COST OF WAITING',
      heading: 'Mixing old workflows with new tools <em>creates chaos — and risk.</em>',
      intro: 'You\'ve got one foot in email, one in the cloud, and files scattered across devices and accounts. It was supposed to get easier. Here\'s what that mess is really costing you.',
      cards: [
        { title: 'Scattered accounts and no single source of truth', body: 'Personal Gmail, work Microsoft 365, Dropbox here, iCloud there — when nothing is in one place, you waste time searching, risk overwriting the wrong file, and have no clear backup or handoff plan. Consolidation and a clear structure save hours and prevent disasters.' },
        { title: 'Migration done wrong loses data and time', body: 'Moving email, calendars, and files from one platform to another is delicate. Wrong steps can duplicate, truncate, or lose data. A professional migration is planned, tested, and executed so you land on the new system with everything intact.' },
        { title: 'Security and permissions are easy to get wrong', body: 'Shared links, team drives, and admin consoles can leave sensitive data exposed or lock out the wrong people. Proper setup means the right people have access, and everyone else doesn\'t.' },
      ],
    },
    agitate: {
      heading: 'Over <em class="agitate-highlight">half of small teams</em> say cloud setup and migration are a major source of stress and errors.',
      highlight: 'half of small teams',
      paragraphs: [
        'You\'re not supposed to be an IT department. You just want your email, files, and calendar to work together — and to be able to hand off or scale when needed. Doing it yourself or with ad-hoc help often leads to half-migrations, broken links, and "where did that file go?"',
        'We exist so you get a clear plan, a clean migration or setup, and ongoing support when things change. One place for your data, one set of rules, and someone to call when the cloud doesn\'t behave.',
      ],
      stats: [
        { num: '50%+', label: 'of small teams struggle with cloud setup and migration', sub: 'Stress, errors, and lost productivity.' },
        { num: 'One plan', label: 'setup, migration, and structure', sub: 'So your cloud actually works for you.' },
        { num: 'Ongoing', label: 'support when you need it', sub: 'New users, new apps, or new problems — we\'re here.' },
      ],
    },
    solve: {
      eyebrow: 'THE SOLUTION',
      heading: 'Cloud setup and migration <em>done right.</em>',
      paragraphs: [
        'Deals of Quality cloud services cover setup, migration, and ongoing management for Microsoft 365, Google Workspace, and other platforms. We design a structure that fits how you work, migrate your data safely, and train you or your team so you\'re not left guessing.',
        'We don\'t just click through wizards — we set up permissions, sharing rules, and backups so your cloud is both useful and secure. When you add users, change plans, or hit a snag, we\'re a call away.',
      ],
      points: [
        { strong: 'Clear plan before we start', text: 'We outline what we\'ll migrate, how long it takes, and what you need to do. No surprises.' },
        { strong: 'Migration that preserves everything', text: 'Email, calendars, files — we move them in the right order and verify so nothing is lost or broken.' },
        { strong: 'You\'ll know how to use it', text: 'We leave you with a quick reference and support so you can work confidently in the cloud.' },
      ],
      image: '/images/tech-support/cloud-services-solution.jpg',
      imageAlt: 'Diagram of a secure cloud architecture on a laptop screen',
    },
    process: { eyebrow: 'HOW IT WORKS', heading: 'From scattered to organized in the cloud in four steps.', steps: sharedProcessSteps },
    guarantee: sharedGuarantee,
    faq: [
      { q: 'Do you support both Microsoft 365 and Google Workspace?', a: 'Yes. We set up and migrate both, as well as hybrid setups and other cloud tools. We\'ll recommend what fits your needs and budget.' },
      { q: 'How long does a typical migration take?', a: 'It depends on the amount of data and complexity. We give a timeline and plan upfront. Many small-business migrations are completed within a few days to a week.' },
      { q: 'Will there be downtime?', a: 'We plan migrations to minimize downtime. Often we can do the heavy lifting in the background and cut over at a chosen time. We\'ll explain the process clearly.' },
      { q: 'Can you train our team on the new system?', a: 'Yes. We can provide walkthroughs and documentation so your team knows how to use the new platform and where everything lives.' },
    ],
    ctaHeading: 'Get your cloud under control.',
    ctaSub: 'Setup, migration, and support — done right. Book online or call now.',
  },

  'software-support': {
    slug: 'software-support',
    serviceLabel: 'Software Support',
    title: 'Software Support | Deals of Quality – Install, Update, Licenses & Optimization',
    description: 'Installation, updates, license management, and performance optimization for any software — consumer or business. Certified technicians.',
    canonicalPath: '/tech-support/software-support/',
    hero: {
      h1: 'Software should help you work.<br /><em>Not fight you every step.</em>',
      sub: 'Installation, updates, license management, and performance tuning — we get your software running smoothly and keep it that way. Consumer or business, we\'ve got you covered.',
      image: '/images/tech-support/software-support-hero.jpg',
      imageAlt: 'Person updating software on a laptop with progress bar visible',
    },
    pain: {
      eyebrow: 'THE REAL COST OF WAITING',
      heading: 'When software misbehaves, <em>your whole workflow breaks.</em>',
      intro: 'That app that won\'t install. The update that broke something. The license that "should work" but doesn\'t. You\'ve been restarting and Googling for hours. Here\'s what that friction is costing you.',
      cards: [
        { title: 'Install and license issues steal hours', body: 'Activation errors, wrong versions, and "contact support" loops can eat a full day. What should be a 10-minute install becomes a rabbit hole of serial numbers and driver conflicts. A trained tech can often resolve it in one session.' },
        { title: 'Updates can break more than they fix', body: 'Automatic updates sometimes introduce bugs, remove features, or conflict with other software. Knowing what to update, when, and how to roll back when things go wrong is something we handle every day.' },
        { title: 'Slow or crashing software isn\'t always "just the app"', body: 'Sometimes it\'s the app; sometimes it\'s the OS, the drive, or another program. We diagnose the root cause so you get a real fix — not just a reinstall that fails again in a week.' },
      ],
    },
    agitate: {
      heading: 'The average user loses <em class="agitate-highlight">over 2 hours a week</em> to software glitches and update chaos.',
      highlight: 'over 2 hours a week',
      paragraphs: [
        'That\'s more than 100 hours a year — time you could spend working, creating, or living. And that\'s if the problem is "just" annoying. When critical software won\'t open or your license suddenly doesn\'t work before a deadline, the cost is much higher.',
        'We exist so you get a single point of contact who installs, updates, and optimizes your software — and who can explain what went wrong and how to avoid it next time.',
      ],
      stats: [
        { num: '2h+', label: 'per week lost to software glitches (average)', sub: 'Install, update, and license issues add up.' },
        { num: 'One session', label: 'to install, activate, and optimize', sub: 'We get it right so you can get back to work.' },
        { num: 'Any software', label: 'consumer or business', sub: 'Office, creative apps, accounting, custom — we handle it.' },
      ],
    },
    solve: {
      eyebrow: 'THE SOLUTION',
      heading: 'Install. Update. Optimize. <em>Done right.</em>',
      paragraphs: [
        'Deals of Quality software support covers installation, updates, license management, and performance optimization for the applications you use every day. We work remotely or on-site, and we don\'t leave until the software is running correctly and you know the basics.',
        'We troubleshoot activation and licensing issues, resolve conflicts, and recommend settings or upgrades when needed. When we\'re done, you have working software and a clear path if something breaks again.',
      ],
      points: [
        { strong: 'Install and activate correctly', text: 'We get your software installed, licensed, and configured so it runs without errors.' },
        { strong: 'Updates and conflicts resolved', text: 'We apply updates safely and fix conflicts so your system stays stable.' },
        { strong: 'Performance tuning when needed', text: 'If your software is slow or crashing, we find the cause — whether it\'s the app, the OS, or something else.' },
      ],
      image: '/images/tech-support/software-support-solution.jpg',
      imageAlt: 'Close-up of software settings being optimized on screen',
    },
    process: { eyebrow: 'HOW IT WORKS', heading: 'From "it won\'t work" to "it just works" in four steps.', steps: sharedProcessSteps },
    guarantee: sharedGuarantee,
    faq: [
      { q: 'Do you support both Windows and Mac software?', a: 'Yes. We work with common consumer and business software on both platforms — Microsoft Office, Adobe, accounting apps, and many others.' },
      { q: 'Can you help with license activation issues?', a: 'Yes. We troubleshoot activation errors, subscription issues, and "license not found" problems. We\'ll work with vendor support when needed.' },
      { q: 'What if the software is custom or industry-specific?', a: 'We handle a wide range of software. For highly specialized or custom apps, we\'ll assess and may coordinate with the vendor or your IT team if that\'s the best path.' },
      { q: 'Do you do ongoing software maintenance?', a: 'Yes. We can schedule regular check-ins for updates, cleanup, and optimization — especially for small businesses that don\'t have dedicated IT.' },
    ],
    ctaHeading: 'Stop fighting your software.',
    ctaSub: 'Get it installed, updated, and optimized. Book online or call now.',
  },

  'printer-setup': {
    slug: 'printer-setup',
    serviceLabel: 'Printer Setup & Support',
    title: 'Printer Setup & Support | Deals of Quality – Install, Wireless & Troubleshooting',
    description: 'Printer installation, driver configuration, wireless printing, and troubleshooting. Inkjet, laser, and all-in-one — we get it working.',
    canonicalPath: '/tech-support/printer-setup/',
    hero: {
      h1: 'Your printer should print.<br /><em>Every time. From every device.</em>',
      sub: 'Installation, wireless setup, driver issues, and "why won\'t it connect?" — we get your printer working from your computer, phone, and tablet. Inkjet, laser, and all-in-one.',
      image: '/images/tech-support/printer-setup-hero.jpg',
      imageAlt: 'Home office printer on a desk ready to print',
    },
    pain: {
      eyebrow: 'THE REAL COST OF WAITING',
      heading: 'A printer that "sometimes works" <em>isn\'t a solution — it\'s a daily gamble.</em>',
      intro: 'You\'ve reinstalled the driver. You\'ve turned it off and on. You\'ve tried printing from the right computer, then the wrong one. Here\'s what that frustration is really costing you.',
      cards: [
        { title: 'Driver and connection issues never fix themselves', body: 'Wrong or outdated drivers, failed wireless setup, and "printer offline" for no obvious reason — these problems don\'t magically resolve. They need the right driver, the right settings, and sometimes the right placement of the printer and router.' },
        { title: 'Multiple devices make it worse', body: 'Printing from a laptop, a desktop, and a phone shouldn\'t require three different workarounds. A proper setup means every device can print without you playing tech support every time.' },
        { title: 'Wasted time and wasted paper', body: 'Test pages that don\'t print, jobs stuck in the queue, and cryptic error codes — every failed print wastes your time and often your supplies. A one-time professional setup pays for itself in reliability.' },
      ],
    },
    agitate: {
      heading: 'Roughly <em class="agitate-highlight">40% of home users</em> have had printer problems in the last year — and most never got a proper fix.',
      highlight: '40% of home users',
      paragraphs: [
        'Printers are one of the most complained-about tech devices. That doesn\'t mean they have to be a headache. Most issues come down to drivers, network setup, or conflicting software — all fixable by someone who does it every day.',
        'We exist so you get a technician who installs the right drivers, configures wireless printing correctly, and leaves you with a printer that works from every device — without the guesswork.',
      ],
      stats: [
        { num: '40%', label: 'of home users had printer problems in the last year', sub: 'Most didn\'t get a lasting fix.' },
        { num: '1 visit', label: 'to install, connect, and verify', sub: 'All devices, one setup.' },
        { num: 'Ongoing', label: 'support if something changes', sub: 'New computer, new router — we\'re a call away.' },
      ],
    },
    solve: {
      eyebrow: 'THE SOLUTION',
      heading: 'One setup. Every device. <em>Prints when you need it.</em>',
      paragraphs: [
        'Deals of Quality printer setup covers installation, driver configuration, and wireless printing so every computer and device on your network can print without hassle. We work with inkjet, laser, and all-in-one printers from major brands.',
        'We install the correct drivers, connect the printer to your network, and test from multiple devices. When we\'re done, you have a printer that works — and you know how to add new devices or troubleshoot basic issues.',
      ],
      points: [
        { strong: 'Right drivers, right settings', text: 'We install and configure the correct drivers and settings so your printer is recognized and reliable.' },
        { strong: 'Wireless from every device', text: 'We set up network printing so your laptop, desktop, and phone can all print without cables or workarounds.' },
        { strong: 'One price, no surprises', text: 'We quote before we start. Setup and testing are included so you\'re not left with "it worked when you were here."' },
      ],
      image: '/images/tech-support/printer-setup-solution.jpg',
      imageAlt: 'Technician configuring a wireless printer for a client',
    },
    process: { eyebrow: 'HOW IT WORKS', heading: 'From "printer offline" to printing from every device in four steps.', steps: sharedProcessSteps },
    guarantee: sharedGuarantee,
    faq: [
      { q: 'Do you support all printer brands?', a: 'We work with major brands — HP, Canon, Epson, Brother, Xerox, etc. — and most inkjet, laser, and all-in-one models. We\'ll confirm compatibility when you book.' },
      { q: 'Can you set up printing from phones and tablets?', a: 'Yes. We configure wireless printing so your mobile devices can print to the same printer — no extra apps or hacks when we do it right.' },
      { q: 'What if my printer is "offline" for no reason?', a: 'Often it\'s a driver, queue, or network issue. We diagnose and fix it so the printer shows as ready and actually prints when you hit print.' },
      { q: 'Do you repair printers or just set them up?', a: 'We focus on setup, connectivity, and software. For hardware repairs (paper jams, mechanical failures), we can assess and may refer to the manufacturer or a repair specialist depending on the issue.' },
    ],
    ctaHeading: 'Stop arguing with your printer.',
    ctaSub: 'Get it set up and printing from every device. Book online or call now.',
  },
};

export function getTechLandingContent(slug: string): TechLandingContent | null {
  if (techLandingSlugs.includes(slug as TechLandingSlug)) {
    return content[slug as TechLandingSlug];
  }
  return null;
}

export function getAllTechLandingSlugs(): readonly TechLandingSlug[] {
  return techLandingSlugs;
}
