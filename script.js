// ==============================
// 1. MOBILE NAVIGATION
// ==============================

const pageLoader = document.getElementById("pageLoader");
if (pageLoader) {
    const loaderStartTime = performance.now();
    let loaderFinished = false;
    pageLoader.hidden = false;
    requestAnimationFrame(() => pageLoader.classList.add("is-visible"));

    const finishPageLoader = () => {
        if (loaderFinished) {
            return;
        }
        loaderFinished = true;
        const minimumDisplay = Math.max(0, 220 - (performance.now() - loaderStartTime));
        window.setTimeout(() => {
            pageLoader.classList.remove("is-visible");
            window.setTimeout(() => { pageLoader.hidden = true; }, 280);
        }, minimumDisplay);
    };

    window.addEventListener("load", finishPageLoader, { once: true });
    window.setTimeout(finishPageLoader, 1100);
    if (document.readyState === "complete") {
        finishPageLoader();
    }
}

const menuToggle = document.getElementById("menuToggle");
const navigation = document.getElementById("navigation");
const backToTop = document.getElementById("backToTop");

menuToggle.addEventListener("click", () => {
    const isOpen = navigation.classList.toggle("active");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
});

// Close menu after clicking a navigation link
const navLinks = document.querySelectorAll(".navigation a");

navLinks.forEach((link) => {
    link.addEventListener("click", () => {
        navigation.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
        navLinks.forEach((item) => {
            const isCurrent = item === link;
            item.classList.toggle("is-active", isCurrent);
            if (isCurrent) {
                item.setAttribute("aria-current", "location");
            } else {
                item.removeAttribute("aria-current");
            }
        });
    });
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && navigation.classList.contains("active")) {
        navigation.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.focus();
    }
});

const navigationTargets = [...document.querySelectorAll(".navigation a[href^='#']")]
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

function updateActiveNavigation() {
    const activeLine = window.innerHeight * 0.3;
    const currentTarget = navigationTargets
        .filter((target) => target.getBoundingClientRect().top <= activeLine)
        .sort((first, second) => second.getBoundingClientRect().top - first.getBoundingClientRect().top)[0]
        || navigationTargets[0];

    document.querySelectorAll(".navigation a[href^='#']").forEach((link) => {
        const isCurrent = link.getAttribute("href") === `#${currentTarget.id}`;
        link.classList.toggle("is-active", isCurrent);
        if (isCurrent) {
            link.setAttribute("aria-current", "location");
        } else {
            link.removeAttribute("aria-current");
        }
    });

    backToTop.hidden = window.scrollY < 480;
}

let navigationUpdateScheduled = false;
window.addEventListener("scroll", () => {
    if (navigationUpdateScheduled) {
        return;
    }

    navigationUpdateScheduled = true;
    requestAnimationFrame(() => {
        updateActiveNavigation();
        navigationUpdateScheduled = false;
    });
}, { passive: true });

updateActiveNavigation();

backToTop.addEventListener("click", () => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reducedMotion ? "auto" : "smooth" });
});


// ==============================
// 2. CURRENT YEAR IN FOOTER
// ==============================

const currentYear = document.getElementById("currentYear");

currentYear.textContent = new Date().getFullYear();


// ==============================
// 3. SCROLL REVEAL ANIMATION
// ==============================

const revealElements = document.querySelectorAll(
    ".section-heading, .intro-content, .intro-image, .highlight-item, .glance-heading, .glance-stat, " +
    ".service-card, .facilities-content, .facilities-image, .facility-visual, .operation-flow, " +
    ".marine-card, .terminal-view-heading, .safety-heading, .safety-card, .certification-item, " +
    ".careers-content, .contact-item, .contact-map, .contact-form"
);

revealElements.forEach((element) => {
    element.classList.add("reveal");
});

const observer = new IntersectionObserver(
    (entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }
        });
    },
    {
        threshold: 0.12
    }
);

revealElements.forEach((element) => {
    observer.observe(element);
});


// ==============================
// 4. ENGLISH / THAI LANGUAGE SWITCHER
// ==============================

const languageToggle = document.getElementById("languageToggle");
const pageDescription = document.getElementById("pageDescription");
const translations = {
    en: {
        pageTitle: "Thai Tank Terminal | TTT",
        pageDescription: "Thai Tank Terminal Limited - Independent liquid terminal operator in Map Ta Phut, Rayong, Thailand.",
        menuLabel: "Toggle navigation",
        languageLabel: "Switch language to Thai",
        navHome: "Home",
        navAbout: "About Us",
        navServices: "Services",
        navFacilities: "Facilities",
        navMarine: "Marine",
        navOperations: "Operations",
        navSafety: "Safety",
        navStandards: "Standards",
        navCareers: "Careers",
        navContact: "Contact Us",
        heroEyebrow: "LIQUID TERMINAL SOLUTIONS",
        heroTitle: "Moving Energy.<br><span>Connecting Industries.</span>",
        heroDescription: "Professional liquid storage and terminal services supporting the petrochemical and petroleum industries in Map Ta Phut, Thailand.",
        heroAbout: "Discover TTT",
        heroServices: "Explore Services",
        heroLocation: "MAP TA PHUT, RAYONG, THAILAND",
        heroValue1: "RELIABILITY",
        heroValue2: "OPERATIONAL EXCELLENCE",
        heroValue3: "SAFETY FIRST",
        aboutImageAlt: "Thai Tank Terminal storage tanks at Map Ta Phut",
        aboutLabel: "ABOUT OUR COMPANY",
        aboutTitle: "Supporting Industry<br>Through <span>Reliable Solutions.</span>",
        aboutParagraph1: "Thai Tank Terminal Limited (TTT) is an independent liquid terminal operator located in the Map Ta Phut area of Rayong, Thailand.",
        aboutParagraph2: "The company provides storage and handling services for petrochemical and petroleum products, supporting industrial customers through terminal operations and product transportation.",
        aboutParagraph3: "TTT was established as a joint venture involving PTT Tank Terminal Company Limited, Royal Vopak and PTT Global Chemical Public Company Limited. Gulf Development Public Company Limited became a shareholder in 2022. In February 2026, PTT Tank Terminal Company Limited became the major shareholder, replacing PTT Global Chemical.",
        aboutLink: "Discover our services <span>→</span>",
        highlightTitle1: "Strategic Location",
        highlightText1: "Located in the Map Ta Phut industrial area, Rayong.",
        highlightTitle2: "Liquid Terminal",
        highlightText2: "Storage and handling for liquid products.",
        highlightTitle3: "Integrated Operations",
        highlightText3: "Product movements by pipeline, truck and vessel.",
        highlightTitle4: "Safety Focus",
        highlightText4: "Commitment to safe and responsible operations.",
        servicesLabel: "WHAT WE DO",
        servicesTitle: "Our <span>Services</span>",
        servicesDescription: "Terminal solutions designed to support industrial supply chains and customer requirements.",
        serviceTitle1: "Liquid Storage",
        serviceText1: "Storage solutions for petrochemical and petroleum products in terminal facilities.",
        serviceTitle2: "Product Handling",
        serviceText2: "Handling and transfer of liquid products within terminal operations.",
        serviceTitle3: "Pipeline Transfer",
        serviceText3: "Product transportation through pipeline connections to support industrial logistics.",
        serviceTitle4: "Terminal Operations",
        serviceText4: "Coordinated liquid product storage, handling and transfer services for customer logistics.",
        serviceTitle5: "Marine Operations",
        serviceText5: "Vessel loading and unloading through the terminal's marine facilities.",
        serviceTitle6: "Truck Loading",
        serviceText6: "Tank-truck loading and unloading to support product distribution.",
        facilitiesLabel: "OUR INFRASTRUCTURE",
        facilitiesTitle: "Built to Support<br><span>Industrial Needs.</span>",
        facilitiesDescription: "Terminal infrastructure supports the storage, handling and transportation of liquid products. Facilities and operations are designed around customer requirements and operational needs.",
        facility1: "Liquid product storage tanks",
        facility2: "Pipeline transfer systems",
        facility3: "Marine jetty operations",
        facility4: "Truck loading facilities",
        facility5: "Terminal operational equipment",
        facilitiesImageAlt: "Thai Tank Terminal liquid storage tanks and transfer lines",
        facilitiesPipesAlt: "Thai Tank Terminal tank farm with visible transfer pipework",
        facilitiesJettyAlt: "Thai Tank Terminal marine jetty with vessels and product transfer pipelines",
        facilitiesTruckAlt: "Tank trucks at Thai Tank Terminal loading stations",
        facilitiesControlAlt: "Industrial power plant control room",
        facilitiesFireAlt: "Fixed fire protection pipework and valves",
        facilitiesTankLabel: "Liquid storage tanks",
        facilitiesPipesLabel: "Transfer pipework",
        facilitiesJettyLabel: "Marine jetty",
        facilitiesTruckLabel: "Truck loading station",
        facilitiesControlLabel: "Control room",
        facilitiesFireLabel: "Fire protection",
        officialLogoAlt: "Thai Tank Terminal Ltd. official logo",
        navGlance: "At a Glance",
        glanceLabel: "TTT AT A GLANCE",
        glanceTitle: "Terminal scale, at a glance",
        glanceDescription: "Verified figures published by Thai Tank Terminal.",
        glanceAria: "Verified company statistics",
        glanceTanks: "storage tanks",
        glanceCapacity: "total storage capacity",
        glanceJetties: "marine jetties",
        glanceDepth: "jetty water depth",
        glanceSource: "Source: Official TTT website",
        marineLabel: "MARINE TERMINAL",
        marineTitle: "Four berths. One terminal.",
        marineDescription: "Published berth particulars for TTT's Map Ta Phut marine facilities.",
        berthLength: "Berth length",
        maxVessel: "Maximum vessel LOA",
        waterDepth: "Water depth",
        marineDepthNote: "Water depths are published as 12.5 m CDL; 0.6 m seabed clearance is required.",
        marineSource: "View official marine facility particulars <span>→</span>",
        overviewLabel: "INTERACTIVE TERMINAL OVERVIEW",
        overviewTitle: "Terminal Overview",
        overviewDescription: "Select a functional area to learn how liquid bulk terminal services fit together.",
        overviewDisclaimer: "Illustrative overview only. Not to scale and not an official TTT site or engineering plan.",
        overviewScrollAria: "Scrollable terminal overview diagram",
        overviewMapAria: "Illustrative functional areas of a liquid bulk terminal",
        overviewZone01: "01 / STORAGE",
        overviewAreaStorage: "Storage Tank Area",
        overviewAreaStorageAria: "Storage tank area. Select for details.",
        overviewStorageDescription: "Liquid products are stored in terminal tanks. TTT publishes information about its storage tank facilities and capacity.",
        overviewZone02: "02 / OPERATIONS",
        overviewAreaControl: "Control & Operations",
        overviewAreaControlAria: "Control and operations area. Select for details.",
        overviewControlDescription: "Terminal operations coordinate product handling and movement. This diagram does not show the actual control-room location or layout.",
        overviewZone03: "03 / TRANSFER",
        overviewAreaPipeline: "Pipeline System",
        overviewAreaPipelineAria: "Pipeline system. Select for details.",
        overviewPipelineDescription: "TTT provides pipeline transfer and is connected to chemical producers by factory pipelines. Routes shown here are illustrative only.",
        overviewZone04: "04 / PRODUCT HANDLING",
        overviewAreaHandling: "Loading / Unloading",
        overviewAreaHandlingAria: "Loading and unloading area. Select for details.",
        overviewHandlingDescription: "TTT lists vessel and tank-truck loading and unloading among its standard product-handling services.",
        overviewZone05: "05 / SAFETY",
        overviewAreaSafety: "Safety & Fire Protection",
        overviewAreaSafetyAria: "Safety and fire protection area. Select for details.",
        overviewSafetyDescription: "TTT describes safety and process safety management as part of its terminal operations. The diagram does not specify actual safety-equipment locations.",
        overviewZone06: "06 / MARINE",
        overviewAreaMarine: "Marine Jetty",
        overviewAreaMarineAria: "Marine jetty. Select for details.",
        overviewMarineDescription: "TTT operates marine jetty facilities for vessel loading and unloading. Refer to the official Marine Facilities page for published berth particulars.",
        overviewDetailsLabel: "AREA DETAILS",
        overviewCloseAria: "Close terminal area details",
        overviewImageStorageAlt: "TTT storage tank facilities",
        overviewImagePipelineAlt: "TTT tank farm with transfer pipework",
        overviewImageHandlingAlt: "TTT tank-truck loading station",
        overviewImageMarineAlt: "TTT marine jetty and vessels",
        overviewImageControlAlt: "Illustrative industrial control-room photograph, not TTT's facility",
        overviewImageSafetyAlt: "Illustrative fire protection equipment, not TTT's facility",
        overviewPhotoNoteTTT: "Photo from the official TTT website.",
        overviewPhotoNoteIllustrative: "Illustrative photo only; not a photograph of TTT's facility.",
        terminalViewLabel: "TERMINAL ENVIRONMENT",
        terminalViewTitle: "Built for around-the-clock operations",
        viewToggleAria: "Choose terminal photograph view",
        dayView: "Day",
        nightView: "Night",
        daySceneAlt: "Thai Tank Terminal storage tanks in daylight",
        nightSceneAlt: "Illuminated industrial tank facility at night",
        terminalViewCaption: "Liquid bulk terminal infrastructure, shown in day and night views.",
        terminalViewNote: "Illustrative industrial photography; not a depiction of TTT's specific facility.",
        certificationLabel: "INTERNATIONAL STANDARDS",
        certificationTitle: "Certified management systems",
        certificationDescription: "Standards listed by Thai Tank Terminal on its official website.",
        isoQuality: "Quality Management",
        isoEnvironment: "Environmental Management",
        isoSafety: "Occupational Health &amp; Safety",
        isoContinuity: "Business Continuity Management",
        certificationSource: "View TTT's standards information <span>→</span>",
        careersLabel: "CAREERS AT TTT",
        careersTitle: "Build your career in a vital industry.",
        careersDescription: "Explore current opportunities, open applications and internship information through TTT's official careers page.",
        careersButton: "Explore Careers <span>→</span>",
        locationDescription: "Located in Map Ta Phut, Rayong, with road access to nearby industrial zones and regional distribution routes.",
        openMap: "Open directions <span>↗</span>",
        contactEmail: "Business enquiries",
        formLabel: "SEND AN ENQUIRY",
        formDescription: "Complete the form to open a pre-addressed message in your email application.",
        formName: "Full name",
        formCompany: "Company",
        formEmail: "Work email",
        formTopic: "Enquiry topic",
        formTopicPlaceholder: "Select a topic",
        formTopicStorage: "Storage and handling",
        formTopicMarine: "Marine terminal",
        formTopicOther: "Other",
        formMessage: "Message",
        formSubmit: "Prepare email <span>→</span>",
        formEmailNote: "Your email application will open; no enquiry is sent from this page.",
        formMailStatus: "Your email application should open with the enquiry details.",
        tankVisualLabel: "STORAGE SYSTEM",
        tankVisualTitle: "Animated storage tanks",
        illustrationNote: "Illustrative only · not live data",
        tankDiagramAlt: "Illustration of industrial storage tanks with animated liquid levels",
        pipelineVisualLabel: "TRANSFER SYSTEM",
        pipelineVisualTitle: "Pipeline flow",
        pipelineDiagramAlt: "Illustrative pipeline diagram with connections and valves showing liquid flow",
        pipelineInlet: "INLET",
        pipelineOutlet: "OUTLET",
        operationFlowLabel: "TERMINAL PROCESS",
        operationFlowTitle: "Terminal operation flow",
        operationStepsAria: "Terminal operation stages",
        stageReceiving: "Receiving",
        stageReceivingDescription: "Liquid products arrive by vessel, pipeline or tank truck for terminal handling.",
        stageTransfer: "Loading / Unloading",
        stageTransferDescription: "TTT provides vessel and tank-truck loading and unloading, as well as pipeline transfer.",
        stageStorage: "Storage",
        stageStorageDescription: "TTT provides short- and long-term liquid storage, including third-party storage.",
        stageDelivery: "Delivery",
        stageDeliveryDescription: "Products can be dispatched via pipeline or tank truck; TTT can assist customers in arranging transportation.",
        safetyLabel: "OUR COMMITMENT",
        safetyTitle: "Safety Is at the <span>Core.</span>",
        safetyDescription: "Responsible terminal operations require a strong commitment to people, the environment and business integrity.",
        safetyTitle1: "Health &amp; Safety",
        safetyText1: "Promoting safe working practices and awareness throughout operational activities.",
        safetyTitle2: "Environmental Care",
        safetyText2: "Supporting responsible operations with attention to environmental protection.",
        safetyTitle3: "Business Integrity",
        safetyText3: "Conducting business ethically and responsibly towards stakeholders.",
        ctaLabel: "CONNECT WITH TTT",
        ctaTitle: "Let's Build Reliable<br>Industrial Connections.",
        ctaButton: "Contact Our Team",
        contactLabel: "LOCATION &amp; CONTACT",
        contactTitle: "Location <span>&amp; Contact</span>",
        contactDescription: "Connect with the Map Ta Phut terminal or send a business enquiry.",
        contactOffice: "Rayong Office",
        contactAddress: "Thai Tank Terminal Limited<br>19 I-1 Road, Map Ta Phut,<br>Mueang Rayong, Rayong 21150,<br>Thailand",
        contactTelephone: "Telephone",
        contactFax: "Fax",
        contactWebsite: "Official Website",
        mapTitle: "Thai Tank Terminal location",
        footerDescription: "Supporting the petrochemical and petroleum industries through liquid terminal services in Thailand.",
        footerExplore: "Explore",
        footerServices: "Our Services",
        footerContact: "Contact",
        copyright: "Thai Tank Terminal Limited. All rights reserved.",
        backToTop: "Back to top ↑",
        backToTopLabel: "Back to top",
        lightboxAria: "Image viewer",
        lightboxClose: "Close image viewer",
        lightboxPrevious: "Previous image",
        lightboxNext: "Next image",
        imageOpenPrefix: "View larger image: "
    },
    th: {
        pageTitle: "ไทย แทงค์ เทอร์มินัล | TTT",
        pageDescription: "บริษัท ไทย แทงค์ เทอร์มินัล จำกัด ผู้ให้บริการคลังจัดเก็บและขนถ่ายผลิตภัณฑ์ของเหลวอิสระในมาบตาพุด จังหวัดระยอง ประเทศไทย",
        menuLabel: "เปิดหรือปิดเมนูนำทาง",
        languageLabel: "เปลี่ยนภาษาเป็นอังกฤษ",
        navHome: "หน้าหลัก",
        navAbout: "เกี่ยวกับเรา",
        navServices: "บริการ",
        navFacilities: "สิ่งอำนวยความสะดวก",
        navMarine: "ท่าเทียบเรือ",
        navOperations: "การดำเนินงาน",
        navSafety: "ความปลอดภัย",
        navStandards: "มาตรฐาน",
        navCareers: "ร่วมงานกับเรา",
        navContact: "ติดต่อเรา",
        heroEyebrow: "โซลูชันคลังจัดเก็บผลิตภัณฑ์ของเหลว",
        heroTitle: "ขับเคลื่อนพลังงาน<br><span>เชื่อมโยงทุกอุตสาหกรรม</span>",
        heroDescription: "บริการจัดเก็บผลิตภัณฑ์ของเหลวและบริหารจัดการคลังอย่างมืออาชีพ เพื่อสนับสนุนอุตสาหกรรมปิโตรเคมีและปิโตรเลียมในมาบตาพุด ประเทศไทย",
        heroAbout: "รู้จัก TTT",
        heroServices: "ดูบริการของเรา",
        heroLocation: "มาบตาพุด จังหวัดระยอง ประเทศไทย",
        heroValue1: "ไว้วางใจได้",
        heroValue2: "ปฏิบัติการเป็นเลิศ",
        heroValue3: "ความปลอดภัยต้องมาก่อน",
        aboutImageAlt: "ถังจัดเก็บผลิตภัณฑ์ของบริษัท ไทย แทงค์ เทอร์มินัล ณ มาบตาพุด",
        aboutLabel: "เกี่ยวกับบริษัท",
        aboutTitle: "สนับสนุนภาคอุตสาหกรรม<br>ด้วย <span>โซลูชันที่เชื่อถือได้</span>",
        aboutParagraph1: "บริษัท ไทย แทงค์ เทอร์มินัล จำกัด (TTT) เป็นผู้ให้บริการคลังจัดเก็บผลิตภัณฑ์ของเหลวอิสระ ตั้งอยู่ในพื้นที่มาบตาพุด จังหวัดระยอง ประเทศไทย",
        aboutParagraph2: "บริษัทให้บริการจัดเก็บและขนถ่ายผลิตภัณฑ์ปิโตรเคมีและปิโตรเลียม พร้อมสนับสนุนลูกค้าภาคอุตสาหกรรมผ่านการดำเนินงานคลังและการขนส่งผลิตภัณฑ์",
        aboutParagraph3: "TTT ก่อตั้งขึ้นเป็นบริษัทร่วมทุนระหว่างบริษัท พีทีที แทงค์ เทอร์มินัล จำกัด รอยัล โวปัก และบริษัท พีทีที โกลบอล เคมิคอล จำกัด (มหาชน) ต่อมา บริษัท กัลฟ์ ดีเวลลอปเมนท์ จำกัด (มหาชน) เข้าถือหุ้นในปี 2565 และในเดือนกุมภาพันธ์ 2569 บริษัท พีทีที แทงค์ เทอร์มินัล จำกัด ได้เป็นผู้ถือหุ้นรายใหญ่แทนบริษัท พีทีที โกลบอล เคมิคอล จำกัด (มหาชน)",
        aboutLink: "ดูบริการของเรา <span>→</span>",
        highlightTitle1: "ทำเลเชิงกลยุทธ์",
        highlightText1: "ตั้งอยู่ในเขตอุตสาหกรรมมาบตาพุด จังหวัดระยอง",
        highlightTitle2: "คลังผลิตภัณฑ์ของเหลว",
        highlightText2: "บริการจัดเก็บและขนถ่ายผลิตภัณฑ์ของเหลว",
        highlightTitle3: "การดำเนินงานครบวงจร",
        highlightText3: "ขนส่งผลิตภัณฑ์ผ่านท่อ รถบรรทุก และเรือ",
        highlightTitle4: "ใส่ใจความปลอดภัย",
        highlightText4: "มุ่งมั่นดำเนินงานอย่างปลอดภัยและมีความรับผิดชอบ",
        servicesLabel: "บริการของเรา",
        servicesTitle: "บริการ<span>ของเรา</span>",
        servicesDescription: "โซลูชันคลังจัดเก็บที่ออกแบบเพื่อสนับสนุนห่วงโซ่อุปทานภาคอุตสาหกรรมและความต้องการของลูกค้า",
        serviceTitle1: "จัดเก็บผลิตภัณฑ์ของเหลว",
        serviceText1: "บริการจัดเก็บผลิตภัณฑ์ปิโตรเคมีและปิโตรเลียมภายในคลังจัดเก็บ",
        serviceTitle2: "ขนถ่ายผลิตภัณฑ์",
        serviceText2: "ให้บริการขนถ่ายและเคลื่อนย้ายผลิตภัณฑ์ของเหลวภายในคลัง",
        serviceTitle3: "ขนส่งผ่านระบบท่อ",
        serviceText3: "ขนส่งผลิตภัณฑ์ผ่านระบบท่อเพื่อสนับสนุนการจัดการโลจิสติกส์อุตสาหกรรม",
        serviceTitle4: "การดำเนินงานคลัง",
        serviceText4: "บริการจัดเก็บ ขนถ่าย และถ่ายโอนผลิตภัณฑ์ของเหลวเพื่อสนับสนุนโลจิสติกส์ของลูกค้า",
        serviceTitle5: "ปฏิบัติการทางทะเล",
        serviceText5: "ให้บริการขนถ่ายผลิตภัณฑ์ขึ้นและลงจากเรือผ่านท่าเทียบเรือของคลัง",
        serviceTitle6: "ขนถ่ายด้วยรถบรรทุก",
        serviceText6: "ให้บริการขนถ่ายผลิตภัณฑ์ขึ้นและลงจากรถบรรทุกถังเพื่อสนับสนุนการกระจายสินค้า",
        facilitiesLabel: "โครงสร้างพื้นฐานของเรา",
        facilitiesTitle: "พร้อมรองรับ<br><span>ความต้องการอุตสาหกรรม</span>",
        facilitiesDescription: "โครงสร้างพื้นฐานของคลังรองรับการจัดเก็บ ขนถ่าย และขนส่งผลิตภัณฑ์ของเหลว สิ่งอำนวยความสะดวกและการดำเนินงานได้รับการออกแบบให้สอดคล้องกับความต้องการของลูกค้าและการปฏิบัติงาน",
        facility1: "ถังจัดเก็บผลิตภัณฑ์ของเหลว",
        facility2: "ระบบขนถ่ายผลิตภัณฑ์ผ่านท่อ",
        facility3: "ปฏิบัติการท่าเทียบเรือ",
        facility4: "สถานีขนถ่ายผลิตภัณฑ์ขึ้นรถบรรทุก",
        facility5: "อุปกรณ์ปฏิบัติการภายในคลัง",
        facilitiesImageAlt: "ถังจัดเก็บผลิตภัณฑ์ของ TTT และระบบท่อถ่ายโอน",
        facilitiesPipesAlt: "พื้นที่ถังจัดเก็บ TTT พร้อมระบบท่อถ่ายโอนผลิตภัณฑ์",
        facilitiesJettyAlt: "ท่าเทียบเรือ TTT พร้อมเรือและท่อถ่ายโอนผลิตภัณฑ์",
        facilitiesTruckAlt: "รถบรรทุกถัง ณ สถานีขนถ่ายผลิตภัณฑ์ของ TTT",
        facilitiesControlAlt: "ห้องควบคุมโรงไฟฟ้าอุตสาหกรรม",
        facilitiesFireAlt: "ระบบท่อและวาล์วป้องกันอัคคีภัยแบบติดตั้งประจำที่",
        facilitiesTankLabel: "ถังจัดเก็บผลิตภัณฑ์ของเหลว",
        facilitiesPipesLabel: "ระบบท่อถ่ายโอน",
        facilitiesJettyLabel: "ท่าเทียบเรือทางทะเล",
        facilitiesTruckLabel: "สถานีขนถ่ายขึ้นรถบรรทุก",
        facilitiesControlLabel: "ห้องควบคุม",
        facilitiesFireLabel: "ระบบป้องกันอัคคีภัย",
        officialLogoAlt: "โลโก้อย่างเป็นทางการของบริษัท ไทย แทงค์ เทอร์มินัล จำกัด",
        navGlance: "ข้อมูลโดยสรุป",
        glanceLabel: "TTT โดยสรุป",
        glanceTitle: "ขนาดการดำเนินงานโดยสรุป",
        glanceDescription: "ตัวเลขที่เผยแพร่โดยบริษัท ไทย แทงค์ เทอร์มินัล",
        glanceAria: "สถิติบริษัทที่ได้รับการยืนยัน",
        glanceTanks: "ถังจัดเก็บ",
        glanceCapacity: "ความจุจัดเก็บรวม",
        glanceJetties: "ท่าเทียบเรือ",
        glanceDepth: "ความลึกบริเวณท่าเทียบเรือ",
        glanceSource: "แหล่งข้อมูล: เว็บไซต์ทางการของ TTT",
        marineLabel: "ท่าเทียบเรือ",
        marineTitle: "สี่ท่าเทียบเรือในหนึ่งคลัง",
        marineDescription: "ข้อมูลท่าเทียบเรือทางทะเลของ TTT ในมาบตาพุดตามที่เผยแพร่ไว้",
        berthLength: "ความยาวท่าเทียบเรือ",
        maxVessel: "ความยาวเรือสูงสุด (LOA)",
        waterDepth: "ความลึกน้ำ",
        marineDepthNote: "ข้อมูลระบุความลึกน้ำ 12.5 เมตร CDL และต้องมีระยะห่างจากพื้นทะเล 0.6 เมตร",
        marineSource: "ดูรายละเอียดท่าเทียบเรือจากเว็บไซต์ทางการ <span>→</span>",
        overviewLabel: "ภาพรวมพื้นที่ปฏิบัติการแบบโต้ตอบ",
        overviewTitle: "ภาพรวมพื้นที่ปฏิบัติการ",
        overviewDescription: "เลือกพื้นที่เพื่อดูบทบาทของแต่ละส่วนในการให้บริการคลังผลิตภัณฑ์ของเหลว",
        overviewDisclaimer: "ภาพประกอบเพื่ออธิบายเท่านั้น ไม่ได้แสดงตามมาตราส่วน และไม่ใช่ผังสถานที่หรือแบบวิศวกรรมอย่างเป็นทางการของ TTT",
        overviewScrollAria: "แผนภาพพื้นที่ปฏิบัติการ เลื่อนดูในแนวนอนได้",
        overviewMapAria: "พื้นที่การทำงานโดยสังเขปของคลังผลิตภัณฑ์ของเหลว",
        overviewZone01: "01 / จัดเก็บ",
        overviewAreaStorage: "พื้นที่ถังจัดเก็บ",
        overviewAreaStorageAria: "พื้นที่ถังจัดเก็บ เลือกเพื่อดูรายละเอียด",
        overviewStorageDescription: "จัดเก็บผลิตภัณฑ์ของเหลวในถังของคลัง TTT เผยแพร่ข้อมูลเกี่ยวกับถังจัดเก็บและความจุไว้บนเว็บไซต์ทางการ",
        overviewZone02: "02 / ปฏิบัติการ",
        overviewAreaControl: "ควบคุมและปฏิบัติการ",
        overviewAreaControlAria: "พื้นที่ควบคุมและปฏิบัติการ เลือกเพื่อดูรายละเอียด",
        overviewControlDescription: "การปฏิบัติการคลังประสานงานการขนถ่ายและเคลื่อนย้ายผลิตภัณฑ์ แผนภาพนี้ไม่ได้ระบุตำแหน่งหรือผังห้องควบคุมจริง",
        overviewZone03: "03 / ถ่ายโอน",
        overviewAreaPipeline: "ระบบท่อ",
        overviewAreaPipelineAria: "ระบบท่อ เลือกเพื่อดูรายละเอียด",
        overviewPipelineDescription: "TTT ให้บริการถ่ายโอนผ่านระบบท่อและเชื่อมต่อกับโรงงานเคมีด้วยท่อ แผนภาพเส้นทางนี้เป็นภาพประกอบเท่านั้น",
        overviewZone04: "04 / ขนถ่ายผลิตภัณฑ์",
        overviewAreaHandling: "พื้นที่ขนถ่ายขึ้น / ลง",
        overviewAreaHandlingAria: "พื้นที่ขนถ่ายผลิตภัณฑ์ขึ้นและลง เลือกเพื่อดูรายละเอียด",
        overviewHandlingDescription: "TTT ระบุบริการขนถ่ายผลิตภัณฑ์ขึ้นและลงจากเรือและรถบรรทุกถังเป็นบริการขนถ่ายมาตรฐาน",
        overviewZone05: "05 / ความปลอดภัย",
        overviewAreaSafety: "ความปลอดภัยและระบบป้องกันอัคคีภัย",
        overviewAreaSafetyAria: "พื้นที่ความปลอดภัยและระบบป้องกันอัคคีภัย เลือกเพื่อดูรายละเอียด",
        overviewSafetyDescription: "TTT ระบุเรื่องความปลอดภัยและการบริหารจัดการความปลอดภัยในกระบวนการเป็นส่วนหนึ่งของการดำเนินงาน แผนภาพนี้ไม่ได้ระบุตำแหน่งอุปกรณ์จริง",
        overviewZone06: "06 / ทางทะเล",
        overviewAreaMarine: "ท่าเทียบเรือ",
        overviewAreaMarineAria: "ท่าเทียบเรือ เลือกเพื่อดูรายละเอียด",
        overviewMarineDescription: "TTT ให้บริการท่าเทียบเรือสำหรับขนถ่ายผลิตภัณฑ์ขึ้นและลงจากเรือ ดูข้อมูลท่าเทียบเรือที่เผยแพร่ไว้ได้จากหน้า Marine Facilities อย่างเป็นทางการ",
        overviewDetailsLabel: "รายละเอียดพื้นที่",
        overviewCloseAria: "ปิดรายละเอียดพื้นที่ปฏิบัติการ",
        overviewImageStorageAlt: "พื้นที่ถังจัดเก็บของ TTT",
        overviewImagePipelineAlt: "พื้นที่ถังจัดเก็บ TTT พร้อมระบบท่อถ่ายโอน",
        overviewImageHandlingAlt: "สถานีขนถ่ายผลิตภัณฑ์ขึ้นรถบรรทุกของ TTT",
        overviewImageMarineAlt: "ท่าเทียบเรือและเรือของ TTT",
        overviewImageControlAlt: "ภาพห้องควบคุมอุตสาหกรรมประกอบ ไม่ใช่สถานที่ของ TTT",
        overviewImageSafetyAlt: "ภาพอุปกรณ์ป้องกันอัคคีภัยประกอบ ไม่ใช่สถานที่ของ TTT",
        overviewPhotoNoteTTT: "ภาพถ่ายจากเว็บไซต์ทางการของ TTT",
        overviewPhotoNoteIllustrative: "ภาพประกอบเท่านั้น ไม่ใช่ภาพสถานที่จริงของ TTT",
        terminalViewLabel: "บรรยากาศคลัง",
        terminalViewTitle: "พร้อมปฏิบัติงานตลอด 24 ชั่วโมง",
        viewToggleAria: "เลือกภาพคลังช่วงกลางวันหรือกลางคืน",
        dayView: "กลางวัน",
        nightView: "กลางคืน",
        daySceneAlt: "ถังจัดเก็บผลิตภัณฑ์ของ TTT ในเวลากลางวัน",
        nightSceneAlt: "คลังถังอุตสาหกรรมที่มีแสงสว่างในเวลากลางคืน",
        terminalViewCaption: "โครงสร้างพื้นฐานคลังผลิตภัณฑ์ของเหลวในมุมมองกลางวันและกลางคืน",
        terminalViewNote: "ภาพถ่ายอุตสาหกรรมเพื่อประกอบการนำเสนอ ไม่ใช่ภาพสถานที่จริงของ TTT",
        certificationLabel: "มาตรฐานสากล",
        certificationTitle: "ระบบบริหารจัดการที่ได้รับการรับรอง",
        certificationDescription: "มาตรฐานที่บริษัท ไทย แทงค์ เทอร์มินัล ระบุไว้บนเว็บไซต์ทางการ",
        isoQuality: "การบริหารคุณภาพ",
        isoEnvironment: "การบริหารจัดการสิ่งแวดล้อม",
        isoSafety: "อาชีวอนามัยและความปลอดภัย",
        isoContinuity: "การบริหารความต่อเนื่องทางธุรกิจ",
        certificationSource: "ดูข้อมูลมาตรฐานของ TTT <span>→</span>",
        careersLabel: "ร่วมงานกับ TTT",
        careersTitle: "เติบโตในสายงานอุตสาหกรรมที่สำคัญ",
        careersDescription: "ดูตำแหน่งงาน การสมัครงานทั่วไป และข้อมูลฝึกงานได้จากหน้าร่วมงานกับเราอย่างเป็นทางการของ TTT",
        careersButton: "ดูโอกาสร่วมงาน <span>→</span>",
        locationDescription: "ตั้งอยู่ในมาบตาพุด จังหวัดระยอง เชื่อมต่อกับเขตอุตสาหกรรมใกล้เคียงและเส้นทางกระจายสินค้าในภูมิภาค",
        openMap: "เปิดเส้นทาง <span>↗</span>",
        contactEmail: "สอบถามด้านธุรกิจ",
        formLabel: "ส่งคำสอบถาม",
        formDescription: "กรอกแบบฟอร์มเพื่อเปิดข้อความที่ระบุผู้รับไว้ในโปรแกรมอีเมลของคุณ",
        formName: "ชื่อและนามสกุล",
        formCompany: "บริษัท",
        formEmail: "อีเมลที่ทำงาน",
        formTopic: "หัวข้อสอบถาม",
        formTopicPlaceholder: "เลือกหัวข้อ",
        formTopicStorage: "บริการจัดเก็บและขนถ่าย",
        formTopicMarine: "ท่าเทียบเรือ",
        formTopicOther: "อื่น ๆ",
        formMessage: "ข้อความ",
        formSubmit: "เตรียมอีเมล <span>→</span>",
        formEmailNote: "ระบบจะเปิดโปรแกรมอีเมลของคุณ โดยเว็บไซต์นี้ไม่ได้ส่งคำสอบถามโดยตรง",
        formMailStatus: "โปรแกรมอีเมลของคุณควรเปิดพร้อมรายละเอียดคำสอบถาม",
        tankVisualLabel: "ระบบจัดเก็บ",
        tankVisualTitle: "ภาพเคลื่อนไหวถังจัดเก็บ",
        illustrationNote: "ภาพประกอบเท่านั้น · ไม่ใช่ข้อมูลปฏิบัติการจริง",
        tankDiagramAlt: "ภาพประกอบถังจัดเก็บอุตสาหกรรมพร้อมระดับของเหลวเคลื่อนไหว",
        pipelineVisualLabel: "ระบบถ่ายโอน",
        pipelineVisualTitle: "การไหลในระบบท่อ",
        pipelineDiagramAlt: "แผนภาพประกอบระบบท่อ จุดเชื่อมต่อ และวาล์วแสดงการไหลของผลิตภัณฑ์",
        pipelineInlet: "ทางเข้า",
        pipelineOutlet: "ทางออก",
        operationFlowLabel: "กระบวนการคลัง",
        operationFlowTitle: "ลำดับการดำเนินงานของคลัง",
        operationStepsAria: "ขั้นตอนการดำเนินงานของคลัง",
        stageReceiving: "รับผลิตภัณฑ์เข้า",
        stageReceivingDescription: "รับผลิตภัณฑ์ของเหลวเข้าคลังทางเรือ ระบบท่อ หรือรถบรรทุกถังเพื่อดำเนินการภายในคลัง",
        stageTransfer: "ขนถ่ายขึ้น / ลง",
        stageTransferDescription: "TTT ให้บริการขนถ่ายผลิตภัณฑ์ขึ้นและลงจากเรือและรถบรรทุกถัง รวมถึงการถ่ายโอนผ่านระบบท่อ",
        stageStorage: "จัดเก็บ",
        stageStorageDescription: "TTT ให้บริการจัดเก็บผลิตภัณฑ์ของเหลวทั้งระยะสั้นและระยะยาว รวมถึงบริการจัดเก็บให้แก่บุคคลภายนอก",
        stageDelivery: "จัดส่ง",
        stageDeliveryDescription: "สามารถขนส่งผลิตภัณฑ์ออกทางระบบท่อหรือรถบรรทุกถัง โดย TTT สามารถช่วยลูกค้าประสานงานการขนส่งได้",
        safetyLabel: "พันธกิจของเรา",
        safetyTitle: "ความปลอดภัยคือ <span>หัวใจสำคัญ</span>",
        safetyDescription: "การดำเนินงานคลังอย่างมีความรับผิดชอบต้องยึดมั่นในความปลอดภัยของบุคลากร การดูแลสิ่งแวดล้อม และความซื่อสัตย์ในการดำเนินธุรกิจ",
        safetyTitle1: "อาชีวอนามัยและความปลอดภัย",
        safetyText1: "ส่งเสริมแนวปฏิบัติและจิตสำนึกด้านความปลอดภัยตลอดการปฏิบัติงาน",
        safetyTitle2: "การดูแลสิ่งแวดล้อม",
        safetyText2: "ดำเนินงานอย่างมีความรับผิดชอบและคำนึงถึงการปกป้องสิ่งแวดล้อม",
        safetyTitle3: "ความซื่อสัตย์ทางธุรกิจ",
        safetyText3: "ดำเนินธุรกิจอย่างมีจริยธรรมและรับผิดชอบต่อผู้มีส่วนได้ส่วนเสีย",
        ctaLabel: "เชื่อมต่อกับ TTT",
        ctaTitle: "ร่วมสร้างการเชื่อมโยง<br>ภาคอุตสาหกรรมที่เชื่อถือได้",
        ctaButton: "ติดต่อทีมงานของเรา",
        contactLabel: "ที่ตั้งและการติดต่อ",
        contactTitle: "ที่ตั้ง<span>และติดต่อ</span>",
        contactDescription: "ติดต่อคลังมาบตาพุดหรือส่งคำสอบถามทางธุรกิจ",
        contactOffice: "สำนักงานระยอง",
        contactAddress: "บริษัท ไทย แทงค์ เทอร์มินัล จำกัด<br>19 ถนนไอ-1 มาบตาพุด<br>อำเภอเมืองระยอง จังหวัดระยอง 21150<br>ประเทศไทย",
        contactTelephone: "โทรศัพท์",
        contactFax: "โทรสาร",
        contactWebsite: "เว็บไซต์ทางการ",
        mapTitle: "ที่ตั้งบริษัท ไทย แทงค์ เทอร์มินัล",
        footerDescription: "สนับสนุนอุตสาหกรรมปิโตรเคมีและปิโตรเลียมด้วยบริการคลังจัดเก็บผลิตภัณฑ์ของเหลวในประเทศไทย",
        footerExplore: "สำรวจเว็บไซต์",
        footerServices: "บริการของเรา",
        footerContact: "ติดต่อ",
        copyright: "บริษัท ไทย แทงค์ เทอร์มินัล จำกัด สงวนลิขสิทธิ์",
        backToTop: "กลับไปด้านบน ↑",
        backToTopLabel: "กลับไปด้านบน",
        lightboxAria: "แสดงภาพขนาดใหญ่",
        lightboxClose: "ปิดภาพ",
        lightboxPrevious: "ภาพก่อนหน้า",
        lightboxNext: "ภาพถัดไป",
        imageOpenPrefix: "ดูภาพขนาดใหญ่: "
    }
};

function setLanguage(language) {
    const selectedLanguage = translations[language] ? language : "en";
    const copy = translations[selectedLanguage];

    document.documentElement.lang = selectedLanguage;
    document.title = copy.pageTitle;
    pageDescription.content = copy.pageDescription;

    document.querySelectorAll("[data-i18n]").forEach((element) => {
        const translation = copy[element.dataset.i18n];
        if (translation !== undefined) {
            element.innerHTML = translation;
        }
    });

    document.querySelectorAll("[data-i18n-alt], [data-i18n-title], [data-i18n-aria]").forEach((element) => {
        const attributes = {
            alt: "i18nAlt",
            title: "i18nTitle",
            "aria-label": "i18nAria"
        };
        Object.entries(attributes).forEach(([attribute, dataKey]) => {
            const key = element.dataset[dataKey];
            if (key && copy[key] !== undefined) {
                element.setAttribute(attribute, copy[key]);
            }
        });
    });

    lightboxImages.forEach((image) => {
        image.setAttribute("aria-label", `${copy.imageOpenPrefix}${image.alt}`);
    });
    if (lightboxOpen) {
        updateLightboxImage();
    }

    if (selectedOverviewArea) {
        renderOverviewArea(selectedOverviewArea);
    }

    languageToggle.innerHTML = selectedLanguage === "en" ? "TH | <strong>EN</strong>" : "<strong>TH</strong> | EN";
    languageToggle.setAttribute("aria-pressed", String(selectedLanguage === "th"));
    languageToggle.setAttribute("aria-label", copy.languageLabel);

    try {
        localStorage.setItem("ttt-language", selectedLanguage);
    } catch (error) {
        // Language switching still works when browser storage is unavailable.
    }
}

languageToggle.addEventListener("click", () => {
    setLanguage(document.documentElement.lang === "en" ? "th" : "en");
});

const operationStages = document.querySelectorAll(".operation-stage");
const operationStageTitle = document.getElementById("operationStageTitle");
const operationStageDescription = document.getElementById("operationStageDescription");

operationStages.forEach((stage) => {
    stage.addEventListener("click", () => {
        operationStages.forEach((item) => {
            const isActive = item === stage;
            item.classList.toggle("is-active", isActive);
            item.setAttribute("aria-pressed", String(isActive));
        });

        const titleKey = stage.dataset.stageTitle;
        const descriptionKey = stage.dataset.stageDescription;
        operationStageTitle.dataset.i18n = titleKey;
        operationStageDescription.dataset.i18n = descriptionKey;
        operationStageTitle.innerHTML = translations[document.documentElement.lang][titleKey];
        operationStageDescription.innerHTML = translations[document.documentElement.lang][descriptionKey];
    });
});

const overviewAreas = {
    storage: {
        title: "overviewAreaStorage",
        description: "overviewStorageDescription",
        image: "assets/images/ttt-tank-facilities-8.jpg",
        imageAlt: "overviewImageStorageAlt",
        photoNote: "overviewPhotoNoteTTT"
    },
    control: {
        title: "overviewAreaControl",
        description: "overviewControlDescription",
        image: "https://images.unsplash.com/photo-1738918937796-743064feefa1?auto=format&fit=crop&w=800&q=85",
        imageAlt: "overviewImageControlAlt",
        photoNote: "overviewPhotoNoteIllustrative"
    },
    pipeline: {
        title: "overviewAreaPipeline",
        description: "overviewPipelineDescription",
        image: "assets/images/ttt-about-tank-3.jpg",
        imageAlt: "overviewImagePipelineAlt",
        photoNote: "overviewPhotoNoteTTT"
    },
    handling: {
        title: "overviewAreaHandling",
        description: "overviewHandlingDescription",
        image: "assets/images/ttt-truck-loading.jpg",
        imageAlt: "overviewImageHandlingAlt",
        photoNote: "overviewPhotoNoteTTT"
    },
    safety: {
        title: "overviewAreaSafety",
        description: "overviewSafetyDescription",
        image: "https://images.unsplash.com/photo-1577678923709-758495cb4497?auto=format&fit=crop&w=800&q=85",
        imageAlt: "overviewImageSafetyAlt",
        photoNote: "overviewPhotoNoteIllustrative"
    },
    marine: {
        title: "overviewAreaMarine",
        description: "overviewMarineDescription",
        image: "assets/images/ttt-marine-jetty.jpg",
        imageAlt: "overviewImageMarineAlt",
        photoNote: "overviewPhotoNoteTTT"
    }
};

const overviewLayout = document.getElementById("overviewLayout");
const overviewPanel = document.getElementById("overviewPanel");
const overviewPanelImage = document.getElementById("overviewPanelImage");
const overviewPanelTitle = document.getElementById("overviewPanelTitle");
const overviewPanelDescription = document.getElementById("overviewPanelDescription");
const overviewImageNote = document.getElementById("overviewImageNote");
const overviewZones = document.querySelectorAll(".overview-zone");
const overviewClose = document.getElementById("overviewClose");
let selectedOverviewArea = null;
let selectedOverviewTrigger = null;

function renderOverviewArea(areaId) {
    const area = overviewAreas[areaId];
    if (!area) {
        return;
    }

    const copy = translations[document.documentElement.lang];
    selectedOverviewArea = areaId;
    overviewLayout.classList.add("has-selection");
    overviewPanel.hidden = false;
    overviewPanelTitle.textContent = copy[area.title];
    overviewPanelDescription.textContent = copy[area.description];
    overviewPanelImage.loading = "eager";
    overviewPanelImage.src = area.image;
    overviewPanelImage.alt = copy[area.imageAlt];
    overviewPanelImage.hidden = false;
    overviewImageNote.textContent = copy[area.photoNote];
    overviewImageNote.hidden = false;

    overviewZones.forEach((zone) => {
        const isSelected = zone.dataset.overviewArea === areaId;
        zone.classList.toggle("is-selected", isSelected);
        zone.setAttribute("aria-pressed", String(isSelected));
    });
}

function closeOverviewPanel(returnFocus = false) {
    overviewPanel.hidden = true;
    overviewLayout.classList.remove("has-selection");
    selectedOverviewArea = null;
    overviewZones.forEach((zone) => {
        zone.classList.remove("is-selected");
        zone.setAttribute("aria-pressed", "false");
    });

    if (returnFocus && selectedOverviewTrigger) {
        selectedOverviewTrigger.focus();
    }
    selectedOverviewTrigger = null;
}

overviewZones.forEach((zone) => {
    zone.addEventListener("click", () => {
        selectedOverviewTrigger = zone;
        renderOverviewArea(zone.dataset.overviewArea);
    });

    zone.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            selectedOverviewTrigger = zone;
            renderOverviewArea(zone.dataset.overviewArea);
        }
    });
});

overviewClose.addEventListener("click", () => closeOverviewPanel(true));

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !overviewPanel.hidden) {
        closeOverviewPanel(true);
    }
});

const countElements = document.querySelectorAll("[data-count-target]");

function animateCount(element) {
    const target = Number(element.dataset.countTarget);
    const decimals = Number(element.dataset.countDecimals || 0);

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        element.textContent = new Intl.NumberFormat("en-US", {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals
        }).format(target);
        return;
    }

    const startTime = performance.now();
    const duration = 1400;

    function updateCount(now) {
        const progress = Math.min((now - startTime) / duration, 1);
        const easedProgress = 1 - Math.pow(1 - progress, 3);
        const currentValue = target * easedProgress;
        const formatter = new Intl.NumberFormat("en-US", {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals
        });

        element.textContent = formatter.format(progress === 1 ? target : currentValue);

        if (progress < 1) {
            requestAnimationFrame(updateCount);
        }
    }

    requestAnimationFrame(updateCount);
}

const countObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            animateCount(entry.target);
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.45 });

countElements.forEach((element) => countObserver.observe(element));

const terminalViewFrame = document.querySelector(".terminal-view-frame");
const terminalViewButtons = document.querySelectorAll("[data-terminal-view]");

terminalViewButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const view = button.dataset.terminalView;
        terminalViewFrame.dataset.view = view;
        terminalViewButtons.forEach((option) => {
            const isActive = option === button;
            option.classList.toggle("is-active", isActive);
            option.setAttribute("aria-pressed", String(isActive));
        });
        terminalViewFrame.querySelector(".terminal-scene--day").setAttribute("aria-hidden", String(view !== "day"));
        terminalViewFrame.querySelector(".terminal-scene--night").setAttribute("aria-hidden", String(view !== "night"));
    });
});

const imageLightbox = document.getElementById("imageLightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxCaption = document.getElementById("lightboxCaption");
const lightboxClose = document.getElementById("lightboxClose");
const lightboxPrevious = document.getElementById("lightboxPrevious");
const lightboxNext = document.getElementById("lightboxNext");
const lightboxImages = [...document.querySelectorAll(
    ".intro-image img:not(.official-logo), .facility-photo img, .terminal-view-frame img"
)];
let lightboxGallery = [];
let lightboxIndex = -1;
let lightboxOpener = null;
let lightboxOpen = false;
let lightboxScrollPosition = 0;

function updateLightboxImage() {
    const sourceImage = lightboxGallery[lightboxIndex];
    if (!sourceImage) {
        return;
    }

    lightboxImage.src = sourceImage.currentSrc || sourceImage.src;
    lightboxImage.alt = sourceImage.alt;
    lightboxCaption.textContent = sourceImage.alt;
    const hasMultipleImages = lightboxGallery.length > 1;
    lightboxPrevious.hidden = !hasMultipleImages;
    lightboxNext.hidden = !hasMultipleImages;
}

function openLightbox(sourceImage) {
    lightboxGallery = lightboxImages.filter((image) => image.getAttribute("aria-hidden") !== "true");
    lightboxIndex = lightboxGallery.indexOf(sourceImage);
    if (lightboxIndex < 0) {
        return;
    }

    lightboxOpener = sourceImage;
    updateLightboxImage();
    lightboxScrollPosition = window.scrollY;
    document.documentElement.classList.add("lightbox-open");
    document.body.style.top = `-${lightboxScrollPosition}px`;
    document.body.classList.add("lightbox-open");
    imageLightbox.hidden = false;
    lightboxOpen = true;
    lightboxClose.focus();
}

function closeLightbox() {
    if (!lightboxOpen) {
        return;
    }

    imageLightbox.hidden = true;
    lightboxOpen = false;
    document.documentElement.classList.remove("lightbox-open");
    document.body.classList.remove("lightbox-open");
    document.body.style.top = "";
    window.scrollTo({ top: lightboxScrollPosition, behavior: "auto" });
    if (lightboxOpener) {
        lightboxOpener.focus();
    }
    lightboxOpener = null;
}

function moveLightbox(step) {
    lightboxIndex = (lightboxIndex + step + lightboxGallery.length) % lightboxGallery.length;
    updateLightboxImage();
}

lightboxImages.forEach((image) => {
    image.classList.add("lightbox-trigger");
    image.setAttribute("role", "button");
    image.setAttribute("tabindex", "0");
    image.setAttribute("aria-label", `${translations[document.documentElement.lang].imageOpenPrefix}${image.alt}`);
    image.addEventListener("click", () => openLightbox(image));
    image.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            openLightbox(image);
        }
    });
});

lightboxClose.addEventListener("click", closeLightbox);
lightboxPrevious.addEventListener("click", () => moveLightbox(-1));
lightboxNext.addEventListener("click", () => moveLightbox(1));

imageLightbox.addEventListener("click", (event) => {
    if (event.target === imageLightbox) {
        closeLightbox();
    }
});

document.addEventListener("keydown", (event) => {
    if (!lightboxOpen) {
        return;
    }

    if (event.key === "Escape") {
        event.preventDefault();
        closeLightbox();
    } else if (event.key === "ArrowLeft") {
        moveLightbox(-1);
    } else if (event.key === "ArrowRight") {
        moveLightbox(1);
    } else if (event.key === "Tab") {
        const controls = [lightboxClose, lightboxPrevious, lightboxNext].filter((button) => !button.hidden);
        const firstControl = controls[0];
        const lastControl = controls[controls.length - 1];
        if (event.shiftKey && document.activeElement === firstControl) {
            event.preventDefault();
            lastControl.focus();
        } else if (!event.shiftKey && document.activeElement === lastControl) {
            event.preventDefault();
            firstControl.focus();
        }
    }
});

const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(contactForm);
    const message = [
        `Name: ${formData.get("name")}`,
        `Company: ${formData.get("company") || "Not provided"}`,
        `Email: ${formData.get("email")}`,
        `Topic: ${formData.get("topic")}`,
        "",
        String(formData.get("message"))
    ].join("\n");
    const subject = encodeURIComponent("Thai Tank Terminal website enquiry");
    const body = encodeURIComponent(message);

    formStatus.dataset.i18n = "formMailStatus";
    formStatus.textContent = translations[document.documentElement.lang].formMailStatus;
    window.location.href = `mailto:commercial.team@thaitank.com?subject=${subject}&body=${body}`;
});

let savedLanguage = "en";
try {
    savedLanguage = localStorage.getItem("ttt-language") || "en";
} catch (error) {
    savedLanguage = "en";
}
setLanguage(savedLanguage);