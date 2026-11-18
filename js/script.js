
/* =========================================
   THE LIFE JOURNAL
   LANGUAGE, SOUND & INTERACTION SYSTEM
========================================= */


/* =========================================
   1. HTML ELEMENTS
========================================= */

const mainMenu = document.getElementById("main-menu");
const settingsPanel = document.getElementById("settings-panel");

const settingsButton = document.getElementById("settings-button");
const backButton = document.getElementById("back-button");

const navSettingsButton = document.getElementById("nav-settings-button");
const portfolioContent = document.getElementById("portfolio-content");

const languageSelect = document.getElementById("language-select");

const volumeControl = document.getElementById("volume-control");
const volumeValue = document.getElementById("volume-value");

const soundToggle = document.getElementById("sound-toggle");

const languageStatus = document.getElementById("setting-language-status");
const soundStatus = document.getElementById("setting-sound-status");
const volumeStatus = document.getElementById("setting-volume-status");

const menuMusic = document.getElementById("menu-music");
const portfolioMusic = document.getElementById("portfolio-music");


/* =========================================
   2. RETURNING FROM CREATIVE LIBRARY
========================================= */

const returningFromGallery =
    new URLSearchParams(window.location.search).get("return") === "gallery";

if (returningFromGallery) {

    if (mainMenu) mainMenu.hidden = true;
    if (portfolioContent) portfolioContent.hidden = false;

}


/* =========================================
   3. LOAD SAVED SETTINGS
========================================= */

const savedLanguage = localStorage.getItem("journalLanguage") || "en";
const savedVolume = localStorage.getItem("journalVolume") || "50";
const savedSound = localStorage.getItem("journalSound") || "true";

let currentMusic = null;

if (languageSelect) {
    languageSelect.value = savedLanguage;
}

if (volumeControl) {
    volumeControl.value = savedVolume;
}

if (volumeValue) {
    volumeValue.textContent = savedVolume + "%";
}

if (soundToggle) {
    soundToggle.checked = savedSound === "true";
}


/* =========================================
   4. BILINGUAL TRANSLATION SYSTEM
========================================= */

const translations = {

    en: {

        // MAIN MENU & SETTINGS
        subtitle: "A JOURNEY THROUGH LIFE",
        start: "START JOURNEY",
        settings: "SETTINGS",
        footer: "© 2026 — A PERSONAL JOURNEY",

        config: "GAME CONFIGURATION",
        language: "LANGUAGE",
        sound: "SOUND EFFECTS",
        volume: "VOLUME",
        back: "BACK TO MENU",

        currentConfiguration: "CURRENT CONFIGURATION",
        languageLabel: "LANGUAGE",
        soundLabel: "SOUND",
        volumeLabel: "VOLUME",

        loadingText: "Preparing your journey...",
        loadingWelcome: "WELCOME TO",

        // NAVIGATION
        navProfile: "PROFILE",
        navStory: "STORY",
        navSkills: "SKILLS",
        navQuests: "QUESTS",
        navAchievements: "ACHIEVEMENTS",
        navJourney: "JOURNEY",
        navContact: "CONTACT",
        navSettings: "SETTINGS",

        // PROFILE
        profileLabel: "01 — CHARACTER PROFILE",
        profileTitle: "Who Am I?",
        profileDescription: "Every journey begins with knowing yourself.",
        profileTag: "PLAYER INFORMATION",

        profileRole: "Student | Technology Enthusiast",

        profileClass: "CLASS",
        profileClassValue: "XI TKJ 1",

        profileMajor: "MAJOR",
        profileMajorValue: "Computer and Network Engineering",

        profileLocation: "LOCATION",
        profileLocationValue: "Blitar, East Java, Indonesia",

        profileStatus: "STATUS",
        profileStatusValue: "Learning & Exploring",

        profileLevel: "CHARACTER LEVEL",
        profileLevelValue: "LV.01",

        profileRank: "BEGINNER ADVENTURER",
        profileRankTag: "CHARACTER RANK",
        profileExp: "250/1000 EXP",

        profileQuote: "\"Every skill begins with curiosity, and every achievement begins with a journey.\"",

        // STORY
        storyLabel: "02 — CHARACTER STORY",
        storyTitle: "My Journey Begins",
        storyDescription: "A little story about the person behind this journey.",
        storyTag: "THE STORY SO FAR",

        storyGreeting: "Hello, I'm Aidil!",

        storyParagraph1: "I am a student at SMKN 1 Blitar, majoring in Computer and Network Engineering. My interest in the digital world began in junior high school, when I became curious about how technology worked. This curiosity grew when I joined the Robotics extracurricular program and achieved several competition awards.",

        storyParagraph2: "That experience encouraged me to continue learning and choose the TJKT program at SMKN 1 Blitar. Beyond technology, I also enjoy creative work, especially graphic design and video editing. I often create posters and edit videos for school assignments, social media content, and competitions.",

        storyParagraph3: "My learning journey started with simple Scratch projects in junior high school and has continued into web development. Each step reminds me that progress takes curiosity, determination, and a willingness to keep practicing. This website is a place to document that journey, one experience at a time.",

        storyQuote: "\"The journey of a thousand lines of code begins with a single idea.\"",

        // SKILL TREE
        skillsLabel: "03 — SKILL TREE",
        skillsTitle: "My Abilities",
        skillsDescription: "Skills I've learned and continue to develop.",

        skillLevelIntermediate: "Intermediate",
        skillLevelBeginner: "Beginner",
        skillLevelDeveloping: "Developing",
        skillLevelAdvanced: "Advanced",

        skillFrontEndTitle: "Front-End Web",
        skillIotTitle: "Internet of Things",
        skillNetworkingTitle: "Networking",
        skillDatabaseTitle: "Database",
        skillCreativeTitle: "Creative Editing",

        skillHtmlDescription: "Building structured and semantic web pages.",
        skillCssDescription: "Designing layouts and responsive interfaces.",
        skillJsDescription: "Learning programming logic and interactivity.",

        skillNetworkingDescription: "Understanding IP addressing and network configuration.",
        skillDatabaseDescription: "Learning SQL and database management.",
        skillProblemSolvingDescription: "Practicing logical thinking through projects.",

        skillFrontEndDescription: "Learning to build websites using HTML, CSS, and JavaScript.",
        skillIotDescription: "Exploring electronics, sensors, ESP32, and microcontroller projects.",
        skillDatabaseDescription: "Learning database design, SQL, and data management.",
        skillCreativeDescription: "Creating visual designs, posters, and video editing projects.",

        skillProgressLabel: "EXP PROGRESS",

        // QUEST LOG
        projectsLabel: "04 — QUEST LOG",
        projectsTitle: "My Completed Quests",
        projectsDescription: "A collection of projects and challenges I have explored throughout my learning journey.",

        projectSmartHomeTitle: "Smart Home System",
        projectSmartHomeCategory: "INTERNET OF THINGS",
        projectSmartHomeDescription: "An IoT-based home automation project featuring RFID access, automatic lighting using an LDR sensor, temperature-based cooling, and solar power support.",
        projectSmartHomeAlt: "Smart Home System project",

        projectSmartGardenTitle: "Smart Garden",
        projectSmartGardenCategory: "INTERNET OF THINGS",
        projectSmartGardenDescription: "An automatic plant-watering system using ESP32 and a soil moisture sensor, with a website for monitoring the system.",
        projectSmartGardenAlt: "Smart Garden project",

        projectWeatherTitle: "Weather Station",
        projectWeatherCategory: "INTERNET OF THINGS",
        projectWeatherDescription: "A weather monitoring project using AHT20 and BMP280 sensors to measure temperature, humidity, and air pressure, with website monitoring.",
        projectWeatherAlt: "Weather Station project",

        projectBakeryTitle: "Yuyu's Bakery",
        projectBakeryCategory: "WEB DEVELOPMENT",
        projectBakeryDescription: "A cashier website built with HTML, CSS, and JavaScript to calculate item prices, quantities, discounts, and total payments.",
        projectBakeryAlt: "Yuyu's Bakery cashier website",

        projectDatabaseTitle: "Library Database",
        projectDatabaseCategory: "DATABASE MANAGEMENT",
        projectDatabaseDescription: "A library database project using MariaDB and SQL to manage members, books, and borrowing records.",
        projectDatabaseAlt: "Library Database project",

        projectCreativeTitle: "Creative Studio",
        projectCreativeCategory: "CREATIVE DESIGN",
        projectCreativeDescription: "A collection of graphic design and video editing projects created using various creative applications.",
        projectCreativeAlt: "Creative Studio portfolio",

        techTemperatureSensor: "Temperature Sensor",
        techSolarPanel: "Solar Panel",
        techSoilSensor: "Soil Moisture Sensor",
        techWebMonitoring: "Web Monitoring",
        techDatabase: "Database",

        questStatus: "QUEST STATUS",
        questCompleted: "COMPLETED",
        questViewGallery: "OPEN CREATIVE LIBRARY",

        // ACHIEVEMENTS
        achievementLabel: "05 — ACHIEVEMENT BADGES",
        achievementTitle: "My Achievement",
        achievementDescription: "A milestone that represents dedication, effort, and learning experiences.",

        achievementView: "VIEW CERTIFICATE",
        achievementRank: "3RD PLACE",
        achievementName: "National Essay & Quiz Competition",

        achievementDetails: "An achievement earned through participation and performance in a national-level essay and quiz competition.",

        achievementType: "Competition Award",

        certificateLabel: "ACHIEVEMENT CERTIFICATE",
        certificateCaption: "National Essay & Quiz Competition — 3rd Place",

        closeCertificate: "Close certificate",
        certificateImageAlt: "Achievement certificate",
        viewCertificateFull: "View certificate in full size",

        // JOURNEY
        journeyLabel: "06 — ADVENTURE HISTORY",
        journeyTitle: "My Learning Journey",
        journeyDescription: "Every chapter is a part of my story.",

        journeyStatusCompleted: "CHAPTER COMPLETED",
        journeyStatusOngoing: "CURRENT CHAPTER — ONGOING",

        journeyKindergarten: "Kindergarten",
        journeyElementary: "Elementary School",
        journeyJuniorHigh: "Junior High School",
        journeyVocational: "Vocational High School",

        journeyDescriptionKindergarten: "The beginning of my educational journey, where I started discovering the world around me.",

        journeyDescriptionElementary: "A chapter filled with basic knowledge, new friendships, and valuable experiences.",

        journeyDescriptionJuniorHigh: "A period of growth, exploration, and discovering new interests.",

        journeyDescriptionVocational: "My current adventure in learning technology, programming, networking, and developing new skills.",

        journeyViewLocation: "VIEW SCHOOL LOCATION",
        journeyProgress: "JOURNEY IN PROGRESS",
        journeyLoading: "LOADING...",
        journeyNextChapter: "THE NEXT CHAPTER",
        journeyNextDescription: "To be discovered...",

        // CONTACT
        contactLabel: "07 — COMMUNICATION PORTAL",
        contactTitle: "Let's Connect!",

        contactDescription: "Have a question or want to discuss a project? Feel free to send me a message.",

        contactTag: "PLAYER CONNECTION",
        contactHeading: "Open a New Connection",

        contactIntroduction: "Every great journey becomes better when we share experiences and ideas.",

        contactEmail: "EMAIL",
        contactGithub: "GITHUB",
        contactInstagram: "INSTAGRAM",

        contactFormTag: "SEND A MESSAGE",
        contactFormTitle: "Message Portal",

        contactName: "Your Name",
        contactEmailLabel: "Your Email",
        contactMessage: "Your Message",

        contactNamePlaceholder: "Enter your name",
        contactEmailPlaceholder: "Enter your email",
        contactMessagePlaceholder: "Write your message...",

        contactSubmit: "SEND MESSAGE →",
        contactSending: "SENDING...",

        contactSendingFeedback: "Your message is being sent. Please wait...",

        contactSuccess: "Your message has been sent successfully. Thank you for contacting me!",

        // FOOTER
        footerDescription: "Every journey has a story. This is mine, still being written.",

        footerNavigation: "QUICK NAVIGATION",
        footerBackToTop: "↑ BACK TO TOP",

        footerCopyright: "The Life Journal. All rights reserved.",
        footerMadeWith: "Made with curiosity & passion.",
        footerReturnMenu: "↶ RETURN TO MAIN MENU",

        // LIGHTBOX & ACCESSIBILITY
        closeImage: "Close image",
        viewArtwork: "View artwork",
        openEasterEgg: "Open Easter Egg",

        interactiveNightSky: "Interactive night sky",
        toggleNavigation: "Toggle navigation",
        firefly: "Firefly",
        characterProfileAlt: "Character profile illustration",
        studyingCharacter: "Character studying",

        // EASTER EGG
easterEggPrompt: "You discovered a hidden secret!\n\nEnter the secret code:",
easterEggWrong: "Secret code not found.",
easterEggChecking: "Verifying secret code...",
easterEggRateLimited: "Too many attempts. Please try again later.",
easterEggServiceError: "Unable to verify the secret code. Please try again."

    },


    id: {

        // MENU UTAMA & PENGATURAN
        subtitle: "SEBUAH PERJALANAN HIDUP",
        start: "MULAI PERJALANAN",
        settings: "PENGATURAN",
        footer: "© 2026 — SEBUAH PERJALANAN PRIBADI",

        config: "KONFIGURASI PERMAINAN",
        language: "BAHASA",
        sound: "EFEK SUARA",
        volume: "VOLUME",
        back: "KEMBALI KE MENU",

        currentConfiguration: "KONFIGURASI SAAT INI",
        languageLabel: "BAHASA",
        soundLabel: "SUARA",
        volumeLabel: "VOLUME",

        loadingText: "Mempersiapkan perjalananmu...",
        loadingWelcome: "SELAMAT DATANG DI",

        // NAVIGASI
        navProfile: "PROFIL",
        navStory: "CERITA",
        navSkills: "KEMAMPUAN",
        navQuests: "MISI",
        navAchievements: "PENGHARGAAN",
        navJourney: "PETUALANGAN",
        navContact: "KONTAK",
        navSettings: "PENGATURAN",

        // PROFIL
        profileLabel: "01 — PROFIL KARAKTER",
        profileTitle: "Siapa Saya?",
        profileDescription: "Setiap perjalanan dimulai dengan mengenal diri sendiri.",

        profileTag: "INFORMASI PEMAIN",
        profileRole: "Pelajar | Penggemar Teknologi",

        profileClass: "KELAS",
        profileClassValue: "XI TKJ 1",

        profileMajor: "JURUSAN",
        profileMajorValue: "Teknik Komputer dan Jaringan",

        profileLocation: "LOKASI",
        profileLocationValue: "Blitar, Jawa Timur, Indonesia",

        profileStatus: "STATUS",
        profileStatusValue: "Sedang Belajar & Bereksplorasi",

        profileLevel: "LEVEL KARAKTER",
        profileLevelValue: "LV.01",

        profileRank: "PETUALANG PEMULA",
        profileRankTag: "PERINGKAT KARAKTER",
        profileExp: "250/1000 EXP",

        profileQuote: "\"Setiap kemampuan dimulai dari rasa ingin tahu, dan setiap pencapaian dimulai dari sebuah perjalanan.\"",

        // CERITA
        storyLabel: "02 — CERITA KARAKTER",
        storyTitle: "Perjalanan Dimulai",
        storyDescription: "Sedikit cerita tentang sosok di balik perjalanan ini.",

        storyTag: "KISAH SEJAUH INI",
        storyGreeting: "Halo, saya Aidil!",

        storyParagraph1: "Saya adalah siswa SMKN 1 Blitar jurusan Teknik Komputer dan Jaringan. Ketertarikan saya terhadap dunia digital dimulai sejak SMP, ketika saya memiliki rasa penasaran tentang cara kerja teknologi. Rasa ingin tahu tersebut semakin berkembang saat saya mengikuti ekstrakurikuler Robotika dan meraih beberapa prestasi perlombaan.",

        storyParagraph2: "Pengalaman tersebut mendorong saya untuk terus belajar dan memilih jurusan TJKT di SMKN 1 Blitar. Selain teknologi, saya juga menyukai kegiatan kreatif, terutama desain grafis dan penyuntingan video. Saya sering membuat poster serta mengedit video untuk tugas sekolah, konten media sosial, dan perlombaan.",

        storyParagraph3: "Perjalanan belajar saya dimulai dari pemrograman Scratch sederhana saat SMP hingga berkembang ke pengembangan web. Setiap proses mengajarkan saya bahwa kemajuan membutuhkan rasa ingin tahu, tekad, dan kemauan untuk terus berlatih. Website ini menjadi tempat untuk mendokumentasikan perjalanan tersebut, satu pengalaman demi satu pengalaman.",

        storyQuote: "\"Perjalanan seribu baris kode dimulai dari satu ide sederhana.\"",

        // KEMAMPUAN
        skillsLabel: "03 — POHON KEMAMPUAN",
        skillsTitle: "Kemampuan Saya",
        skillsDescription: "Berbagai kemampuan yang telah saya pelajari dan terus saya kembangkan.",

        skillLevelIntermediate: "Menengah",
        skillLevelBeginner: "Pemula",
        skillLevelDeveloping: "Berkembang",
        skillLevelAdvanced: "Mahir",

        skillFrontEndTitle: "Pengembangan Web Front-End",
        skillIotTitle: "Internet of Things",
        skillNetworkingTitle: "Jaringan Komputer",
        skillDatabaseTitle: "Basis Data",
        skillCreativeTitle: "Penyuntingan Kreatif",

        skillHtmlDescription: "Membangun halaman web dengan struktur yang rapi dan semantik.",
        skillCssDescription: "Merancang tata letak dan antarmuka yang responsif.",
        skillJsDescription: "Mempelajari logika pemrograman dan interaktivitas.",

        skillNetworkingDescription: "Memahami pengalamatan IP dan konfigurasi jaringan.",
        skillDatabaseDescription: "Mempelajari SQL dan pengelolaan basis data.",
        skillProblemSolvingDescription: "Melatih pola pikir logis melalui berbagai proyek.",

        skillFrontEndDescription: "Mempelajari pembuatan website menggunakan HTML, CSS, dan JavaScript.",
        skillIotDescription: "Mengeksplorasi elektronika, sensor, ESP32, dan proyek mikrokontroler.",
        skillCreativeDescription: "Membuat desain visual, poster, dan proyek penyuntingan video.",

        skillProgressLabel: "PROGRES EXP",

        // DAFTAR MISI
        projectsLabel: "04 — DAFTAR MISI",
        projectsTitle: "Misi yang Telah Diselesaikan",

        projectsDescription: "Kumpulan proyek dan tantangan yang telah saya kerjakan selama perjalanan belajar.",

        projectSmartHomeTitle: "Sistem Smart Home",
        projectSmartHomeCategory: "INTERNET OF THINGS",

        projectSmartHomeDescription: "Proyek otomatisasi rumah berbasis IoT dengan akses RFID, lampu otomatis menggunakan sensor LDR, pendingin berdasarkan suhu, dan dukungan tenaga surya.",

        projectSmartHomeAlt: "Proyek Sistem Smart Home",

        projectSmartGardenTitle: "Smart Garden",
        projectSmartGardenCategory: "INTERNET OF THINGS",

        projectSmartGardenDescription: "Sistem penyiraman tanaman otomatis menggunakan ESP32 dan sensor kelembapan tanah, dilengkapi website untuk memantau sistem.",

        projectSmartGardenAlt: "Proyek Smart Garden",

        projectWeatherTitle: "Stasiun Cuaca",
        projectWeatherCategory: "INTERNET OF THINGS",

        projectWeatherDescription: "Proyek pemantauan cuaca menggunakan sensor AHT20 dan BMP280 untuk mengukur suhu, kelembapan, dan tekanan udara melalui website.",

        projectWeatherAlt: "Proyek Stasiun Cuaca",

        projectBakeryTitle: "Yuyu's Bakery",
        projectBakeryCategory: "PENGEMBANGAN WEB",

        projectBakeryDescription: "Website kasir yang dibuat menggunakan HTML, CSS, dan JavaScript untuk menghitung harga barang, jumlah pembelian, diskon, dan total pembayaran.",

        projectBakeryAlt: "Website kasir Yuyu's Bakery",

        projectDatabaseTitle: "Basis Data Perpustakaan",
        projectDatabaseCategory: "PENGELOLAAN BASIS DATA",

        projectDatabaseDescription: "Proyek basis data perpustakaan menggunakan MariaDB dan SQL untuk mengelola data anggota, buku, dan peminjaman.",

        projectDatabaseAlt: "Proyek Basis Data Perpustakaan",

        projectCreativeTitle: "Creative Studio",
        projectCreativeCategory: "DESAIN KREATIF",

        projectCreativeDescription: "Kumpulan proyek desain grafis dan penyuntingan video yang dibuat menggunakan berbagai aplikasi kreatif.",

        projectCreativeAlt: "Portofolio Creative Studio",

        techTemperatureSensor: "Sensor Suhu",
        techSolarPanel: "Panel Surya",
        techSoilSensor: "Sensor Kelembapan Tanah",
        techWebMonitoring: "Pemantauan Website",
        techDatabase: "Basis Data",

        questStatus: "STATUS MISI",
        questCompleted: "SELESAI",
        questViewGallery: "BUKA CREATIVE LIBRARY",

        // PENGHARGAAN
        achievementLabel: "05 — LENCANA PENGHARGAAN",
        achievementTitle: "Pencapaian Saya",

        achievementDescription: "Sebuah pencapaian yang mencerminkan dedikasi, usaha, dan pengalaman belajar.",

        achievementView: "LIHAT SERTIFIKAT",
        achievementRank: "JUARA 3",
        achievementName: "Lomba Esai dan Kuis Nasional",

        achievementDetails: "Pencapaian yang diraih melalui partisipasi dan hasil dalam kompetisi esai dan kuis tingkat nasional.",

        achievementType: "Penghargaan Kompetisi",

        certificateLabel: "SERTIFIKAT PENGHARGAAN",
        certificateCaption: "Lomba Esai dan Kuis Nasional — Juara 3",

        closeCertificate: "Tutup sertifikat",
        certificateImageAlt: "Gambar sertifikat penghargaan",
        viewCertificateFull: "Lihat sertifikat dalam ukuran penuh",

        // PERJALANAN PENDIDIKAN
        journeyLabel: "06 — RIWAYAT PETUALANGAN",
        journeyTitle: "Perjalanan Belajar Saya",
        journeyDescription: "Setiap bab merupakan bagian dari cerita saya.",

        journeyStatusCompleted: "BAB TELAH SELESAI",
        journeyStatusOngoing: "BAB SAAT INI — BERLANGSUNG",

        journeyKindergarten: "Taman Kanak-Kanak",
        journeyElementary: "Sekolah Dasar",
        journeyJuniorHigh: "Sekolah Menengah Pertama",
        journeyVocational: "Sekolah Menengah Kejuruan",

        journeyDescriptionKindergarten: "Awal perjalanan pendidikan saya, saat mulai mengenal dan menjelajahi dunia di sekitar.",

        journeyDescriptionElementary: "Masa yang dipenuhi pengetahuan dasar, pertemanan baru, dan pengalaman berharga.",

        journeyDescriptionJuniorHigh: "Masa untuk berkembang, menjelajahi berbagai hal, dan menemukan minat baru.",

        journeyDescriptionVocational: "Petualangan saya saat ini dalam mempelajari teknologi, pemrograman, jaringan, dan mengembangkan kemampuan baru.",

        journeyViewLocation: "LIHAT LOKASI SEKOLAH",
        journeyProgress: "PERJALANAN BERLANGSUNG",
        journeyLoading: "MEMUAT...",

        journeyNextChapter: "BAB SELANJUTNYA",
        journeyNextDescription: "Masih menjadi misteri...",

        // KONTAK
        contactLabel: "07 — PORTAL KOMUNIKASI",
        contactTitle: "Mari Terhubung!",

        contactDescription: "Punya pertanyaan atau ingin berdiskusi tentang proyek? Jangan ragu untuk mengirimkan pesan kepada saya.",

        contactTag: "KONEKSI PEMAIN",
        contactHeading: "Buka Koneksi Baru",

        contactIntroduction: "Setiap perjalanan menjadi lebih bermakna ketika kita saling berbagi pengalaman dan ide.",

        contactEmail: "EMAIL",
        contactGithub: "GITHUB",
        contactInstagram: "INSTAGRAM",

        contactFormTag: "KIRIM PESAN",
        contactFormTitle: "Portal Pesan",

        contactName: "Nama Anda",
        contactEmailLabel: "Email Anda",
        contactMessage: "Pesan Anda",

        contactNamePlaceholder: "Masukkan nama Anda",
        contactEmailPlaceholder: "Masukkan email Anda",
        contactMessagePlaceholder: "Tuliskan pesan Anda...",

        contactSubmit: "KIRIM PESAN →",
        contactSending: "MENGIRIM...",

        contactSendingFeedback: "Pesan sedang dikirim. Mohon tunggu...",

        contactSuccess: "Pesan berhasil dikirim. Terima kasih telah menghubungi saya!",

        // FOOTER
        footerDescription: "Setiap perjalanan memiliki cerita. Inilah cerita saya yang masih terus ditulis.",

        footerNavigation: "NAVIGASI CEPAT",
        footerBackToTop: "↑ KEMBALI KE ATAS",

        footerCopyright: "The Life Journal. Hak cipta dilindungi.",
        footerMadeWith: "Dibuat dengan rasa ingin tahu & semangat.",
        footerReturnMenu: "↶ KEMBALI KE MENU UTAMA",

        // LIGHTBOX & AKSESIBILITAS
        closeImage: "Tutup gambar",
        viewArtwork: "Lihat karya",
        openEasterEgg: "Buka Easter Egg",

        interactiveNightSky: "Langit malam interaktif",
        toggleNavigation: "Buka atau tutup navigasi",
        firefly: "Kunang-kunang",
        characterProfileAlt: "Ilustrasi profil karakter",
        studyingCharacter: "Karakter sedang belajar",

        // EASTER EGG
       // EASTER EGG
easterEggPrompt: "Kamu menemukan sebuah rahasia tersembunyi!\n\nMasukkan kode rahasia:",
easterEggWrong: "Kode rahasia tidak ditemukan.",
easterEggChecking: "Memverifikasi kode rahasia...",
easterEggRateLimited: "Terlalu banyak percobaan. Silakan coba lagi nanti.",
easterEggServiceError: "Kode rahasia tidak dapat diverifikasi. Silakan coba lagi."

    }

};


/* =========================================
   5. SETTINGS STATUS
========================================= */

function updateSettingsStatus() {

    if (languageStatus && languageSelect) {

        languageStatus.textContent =
            languageSelect.options[languageSelect.selectedIndex]
                .text.toUpperCase();

    }

    if (soundStatus && soundToggle) {

        soundStatus.textContent =
            soundToggle.checked ? "ON" : "OFF";

    }

    if (volumeStatus && volumeControl) {

        volumeStatus.textContent =
            volumeControl.value + "%";

    }

}


/* =========================================
   6. LANGUAGE SWITCHING FUNCTION
========================================= */

function changeLanguage(language) {

    const selectedTranslations = translations[language] || translations.en;

    // Translate visible text
    document.querySelectorAll("[data-i18n]").forEach(element => {

        const key = element.dataset.i18n;
        const translatedText = selectedTranslations[key];

        if (translatedText !== undefined) {
            element.textContent = translatedText;
        }

    });

    // Translate placeholders
    document.querySelectorAll("[data-i18n-placeholder]").forEach(element => {

        const key = element.dataset.i18nPlaceholder;
        const translatedText = selectedTranslations[key];

        if (translatedText !== undefined) {
            element.setAttribute("placeholder", translatedText);
        }

    });

    // Translate accessibility labels
    document.querySelectorAll("[data-i18n-aria-label]").forEach(element => {

        const key = element.dataset.i18nAriaLabel;
        const translatedText = selectedTranslations[key];

        if (translatedText !== undefined) {
            element.setAttribute("aria-label", translatedText);
        }

    });

    // Translate image alt text
    document.querySelectorAll("[data-i18n-alt]").forEach(element => {

        const key = element.dataset.i18nAlt;
        const translatedText = selectedTranslations[key];

        if (translatedText !== undefined) {
            element.setAttribute("alt", translatedText);
        }

    });

    // Translate title attributes
    document.querySelectorAll("[data-i18n-title]").forEach(element => {

        const key = element.dataset.i18nTitle;
        const translatedText = selectedTranslations[key];

        if (translatedText !== undefined) {
            element.setAttribute("title", translatedText);
        }

    });

    document.documentElement.lang = language;

    updateSettingsStatus();

}


/* =========================================
   7. LANGUAGE SELECTOR
========================================= */

if (languageSelect) {

    languageSelect.addEventListener("change", function() {

        const selectedLanguage = languageSelect.value;

        localStorage.setItem("journalLanguage", selectedLanguage);

        changeLanguage(selectedLanguage);

    });

}


/* =========================================
   8. INITIAL SETTINGS
========================================= */

changeLanguage(savedLanguage);

updateSettingsStatus();


/* =========================================
   9. START PORTFOLIO JOURNEY
========================================= */

const startButton = document.getElementById("start-button");

if (startButton) {

    startButton.addEventListener("click", function() {

        playClickSound();
        startMusic(portfolioMusic);

        mainMenu.hidden = true;
        portfolioContent.hidden = false;

        portfolioContent.classList.remove("portfolio-enter");

        void portfolioContent.offsetWidth;

        portfolioContent.classList.add("portfolio-enter");

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

}


/* =========================================
   10. SETTINGS NAVIGATION
========================================= */

let settingsReturnTo = "mainMenu";
let settingsTransitionTimer;


// OPEN SETTINGS
function openSettings(source) {

    clearTimeout(settingsTransitionTimer);

    playClickSound();

    if (source === "mainMenu") {
        startMusic(menuMusic);
    }

    settingsReturnTo = source;

    mainMenu.hidden = true;
    portfolioContent.hidden = true;

    settingsPanel.hidden = false;

    settingsPanel.classList.remove("settings-exit");
    settingsPanel.classList.remove("settings-enter");

    void settingsPanel.offsetWidth;

    settingsPanel.classList.add("settings-enter");

}


// SETTINGS BUTTON — MAIN MENU
if (settingsButton) {

    settingsButton.addEventListener("click", function() {
        openSettings("mainMenu");
    });

}


// SETTINGS BUTTON — PORTFOLIO NAVBAR
if (navSettingsButton) {

    navSettingsButton.addEventListener("click", function() {
        openSettings("portfolio");
    });

}


// CLOSE SETTINGS
function closeSettings() {

    if (
        settingsPanel.hidden ||
        settingsPanel.classList.contains("settings-exit")
    ) {
        return;
    }

    playClickSound();

    settingsPanel.classList.remove("settings-enter");
    settingsPanel.classList.add("settings-exit");

    settingsTransitionTimer = setTimeout(function() {

        settingsPanel.hidden = true;

        settingsPanel.classList.remove("settings-exit");

        if (settingsReturnTo === "portfolio") {
            portfolioContent.hidden = false;
        } else {
            mainMenu.hidden = false;
        }

    }, 250);

}


// BACK BUTTON
if (backButton) {
    backButton.addEventListener("click", closeSettings);
}


// ESCAPE KEY
document.addEventListener("keydown", function(event) {

    if (
        event.key === "Escape" &&
        settingsPanel &&
        !settingsPanel.hidden
    ) {
        closeSettings();
    }

});


/* =========================================
   11. SOUND TOGGLE
========================================= */

if (soundToggle) {

    soundToggle.addEventListener("change", function() {

        localStorage.setItem("journalSound", soundToggle.checked);

        applyAudioSettings();

        updateSettingsStatus();

        if (soundToggle.checked) {
            console.log("Sound Effects: ON");
        } else {
            console.log("Sound Effects: OFF");
        }

    });

}


/* =========================================
   12. CLICK SOUND SYSTEM
========================================= */

let audioContext;

function playClickSound() {

    if (!soundToggle || !soundToggle.checked) {
        return;
    }

    const AudioContextClass =
        window.AudioContext || window.webkitAudioContext;

    if (!AudioContextClass) {
        return;
    }

    if (!audioContext) {
        audioContext = new AudioContextClass();
    }

    if (audioContext.state === "suspended") {
        audioContext.resume();
    }

    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();

    const volume = Number(volumeControl.value) / 100;

    oscillator.type = "sine";
    oscillator.frequency.value = 620;

    gain.gain.setValueAtTime(
        volume * 0.04,
        audioContext.currentTime
    );

    gain.gain.exponentialRampToValueAtTime(
        0.001,
        audioContext.currentTime + 0.07
    );

    oscillator.connect(gain);
    gain.connect(audioContext.destination);

    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.07);

}


/* =========================================
   13. BACKGROUND MUSIC SYSTEM
========================================= */

function applyAudioSettings() {

    if (!menuMusic || !portfolioMusic) {
        return;
    }

    const volume = Number(volumeControl.value) / 100;
    const muted = !soundToggle.checked;

    menuMusic.volume = volume;
    portfolioMusic.volume = volume;

    menuMusic.muted = muted;
    portfolioMusic.muted = muted;

}


/* =========================================
   14. BACKGROUND MUSIC TRANSITION
========================================= */

let musicFadeTimer = null;

function startMusic(audio) {

    if (!audio) {
        return;
    }

    clearInterval(musicFadeTimer);

    if (currentMusic === audio && !audio.paused) {
        applyAudioSettings();
        return;
    }

    const previousMusic = currentMusic;
    const targetVolume = Number(volumeControl.value) / 100;

    audio.muted = !soundToggle.checked;

    function fadeOut() {

        if (!previousMusic || previousMusic.paused) {
            playNewMusic();
            return;
        }

        musicFadeTimer = setInterval(function() {

            previousMusic.volume = Math.max(
                0,
                previousMusic.volume - 0.025
            );

            if (previousMusic.volume <= 0.001) {

                clearInterval(musicFadeTimer);

                previousMusic.pause();
                previousMusic.currentTime = 0;

                playNewMusic();

            }

        }, 30);

    }


    function playNewMusic() {

        currentMusic = audio;

        audio.volume = 0;
        audio.muted = !soundToggle.checked;

        audio.play().then(function() {

            musicFadeTimer = setInterval(function() {

                audio.volume = Math.min(
                    targetVolume,
                    audio.volume + 0.025
                );

                if (audio.volume >= targetVolume - 0.001) {

                    clearInterval(musicFadeTimer);

                    audio.volume = targetVolume;

                }

            }, 30);

        }).catch(function(error) {

            console.warn("Music playback was blocked:", error);

        });

    }

    fadeOut();

}


/* =========================================
   15. VOLUME CONTROL
========================================= */

if (volumeControl) {

    volumeControl.addEventListener("input", function() {

        volumeValue.textContent = volumeControl.value + "%";

        localStorage.setItem("journalVolume", volumeControl.value);

        applyAudioSettings();

        updateSettingsStatus();

    });

}

applyAudioSettings();


/* =========================================
   16. CONTACT FORM — FORMSUBMIT
========================================= */

const contactForm = document.getElementById("contact-form");
const formFeedback = document.getElementById("form-feedback");

if (contactForm && formFeedback) {

    contactForm.addEventListener("submit", function() {

        const language = languageSelect.value;
        const selectedTranslations = translations[language] || translations.en;

        formFeedback.textContent =
            selectedTranslations.contactSendingFeedback;

        formFeedback.style.color = "#a3c4ae";

        const submitButton = contactForm.querySelector(
            'button[type="submit"]'
        );

        if (submitButton) {

            submitButton.disabled = true;
            submitButton.style.opacity = "0.6";

            submitButton.textContent =
                selectedTranslations.contactSending;

        }

    });

}


/* =========================================
   17. SCROLL REVEAL ANIMATION
========================================= */

const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {

    const revealObserver = new IntersectionObserver(
        function(entries, observer) {

            entries.forEach(function(entry) {

                if (entry.isIntersecting) {

                    entry.target.classList.add("active");

                    observer.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.12
        }
    );

    revealElements.forEach(function(element) {
        revealObserver.observe(element);
    });

} else {

    revealElements.forEach(function(element) {
        element.classList.add("active");
    });

}


/* =========================================
   18. CHARACTER EXP ANIMATION
========================================= */

const characterExp = document.querySelector(".character-exp");

if (characterExp && "IntersectionObserver" in window) {

    const expObserver = new IntersectionObserver(function(entries) {

        entries.forEach(function(entry) {

            if (entry.isIntersecting) {

                characterExp.classList.add("active");

                expObserver.unobserve(characterExp);

            }

        });

    }, {
        threshold: 0.5
    });

    expObserver.observe(characterExp);

}


/* =========================================
   19. CURRENT YEAR
========================================= */

const currentYear = document.getElementById("current-year");

if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}


/* =========================================
   20. LOADING SCREEN SYSTEM
========================================= */

const loadingScreen = document.getElementById("loading-screen");
const loadingProgress = document.getElementById("loading-progress");
const loadingText = document.getElementById("loading-text");

let loadingValue = 0;


// RETURNING FROM CREATIVE LIBRARY
if (returningFromGallery) {

    if (loadingScreen) {
        loadingScreen.classList.add("hide");
    }

    window.addEventListener("load", function() {

        const projectsSection = document.getElementById("projects");

        if (projectsSection) {

            projectsSection.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }

        history.replaceState(
            null,
            "",
            window.location.pathname + "#projects"
        );

    });

}


// NORMAL LOADING
else if (loadingScreen && loadingProgress && loadingText) {

    window.addEventListener("load", function() {

        const loadingInterval = setInterval(function() {

            loadingValue += 5;

            if (loadingValue > 100) {
                loadingValue = 100;
            }

            loadingProgress.style.width = loadingValue + "%";

            const currentLanguage = languageSelect.value;

            const loadingMessage =
                translations[currentLanguage].loadingText;

            loadingText.textContent =
                `${loadingMessage} ${loadingValue}%`;

            if (loadingValue >= 100) {

                clearInterval(loadingInterval);

                setTimeout(function() {

                    loadingScreen.classList.add("hide");

                }, 300);

            }

        }, 50);

    });

}



/* =========================================
   21. EASTER EGG SYSTEM
   SUPABASE CODE VERIFICATION
========================================= */

// HTML ELEMENTS
const easterEggButton = document.getElementById("easter-egg-button");
const easterEggImage = document.getElementById("easter-egg-image");


// SUPABASE CONFIGURATION
const EASTER_EGG_SUPABASE_URL =
    "https://ztfgnjakasohhtkohjln.supabase.co";

const EASTER_EGG_SUPABASE_KEY =
    "sb_publishable_93rjkEGPxv8ec9ldggW6VQ_0BVeQe2g";

const EASTER_EGG_VERIFY_URL =
    `${EASTER_EGG_SUPABASE_URL}/functions/v1/verify-code`;


// EASTER EGG STATE
let easterEggClickCount = 0;
let easterEggTimer = null;
let easterEggVerifying = false;

const easterEggImages = [
    "assets/images/easter-egg-1.png",
    "assets/images/easter-egg-2.png"
];

let currentEasterEggImage = 0;


// RESET EASTER EGG
function resetEasterEgg() {

    easterEggClickCount = 0;

    currentEasterEggImage = 0;

    clearTimeout(easterEggTimer);

    easterEggImage.src = easterEggImages[0];

    easterEggImage.classList.remove("easter-changing");

}


// VERIFY SECRET CODE
async function verifyEasterEggCode(code) {

    const currentLanguage = languageSelect?.value || "en";

    const selectedTranslations =
        translations[currentLanguage] || translations.en;

    try {

        const response = await fetch(EASTER_EGG_VERIFY_URL, {

            method: "POST",

            headers: {
                "Content-Type": "application/json",
                "apikey": EASTER_EGG_SUPABASE_KEY
            },

            body: JSON.stringify({
                code: code
            })

        });


        const result = await response.json();


        // INVALID CODE
        if (response.status === 401) {

            alert(selectedTranslations.easterEggWrong);

            return;

        }


        // RATE LIMIT
        if (response.status === 429) {

            alert(selectedTranslations.easterEggRateLimited);

            return;

        }


        // OTHER SERVER ERRORS
        if (!response.ok) {

            console.error(
                "Easter Egg Verification Error:",
                result.error || response.status
            );

            alert(selectedTranslations.easterEggServiceError);

            return;

        }


        // SUCCESSFUL VERIFICATION
        if (result.success && result.token) {

            // SAVE TEMPORARY SESSION TOKEN
            sessionStorage.setItem(
                "garden_session_token",
                result.token
            );

            // REDIRECT TO A GARDEN OF MEMORIES
            window.location.href = "garden.html";

            return;

        }


        // UNEXPECTED RESPONSE
        alert(selectedTranslations.easterEggServiceError);

    } catch (error) {

        console.error(
            "Easter Egg Connection Error:",
            error
        );

        alert(selectedTranslations.easterEggServiceError);

    }

}


// EASTER EGG CLICK EVENT
if (easterEggButton && easterEggImage) {

    easterEggButton.addEventListener("click", async function() {

        // PREVENT MULTIPLE VERIFICATION REQUESTS
        if (easterEggVerifying) {
            return;
        }

        playClickSound();

        easterEggClickCount++;

        clearTimeout(easterEggTimer);


        // CHANGE EASTER EGG IMAGE
        const nextImage =
            currentEasterEggImage === 0 ? 1 : 0;

        easterEggImage.classList.add("easter-changing");

        setTimeout(function() {

            currentEasterEggImage = nextImage;

            easterEggImage.src =
                easterEggImages[currentEasterEggImage];

            easterEggImage.classList.remove("easter-changing");

        }, 250);


        // RESET IMAGE AFTER INACTIVITY
        easterEggTimer = setTimeout(function() {

            easterEggImage.classList.add("easter-changing");

            setTimeout(function() {

                currentEasterEggImage = 0;

                easterEggImage.src = easterEggImages[0];

                easterEggImage.classList.remove("easter-changing");

            }, 250);

        }, 900);


        // AFTER FIVE CLICKS
        if (easterEggClickCount >= 5) {

            clearTimeout(easterEggTimer);

            easterEggVerifying = true;

            easterEggButton.disabled = true;

            setTimeout(async function() {

                const currentLanguage =
                    languageSelect?.value || "en";

                const selectedTranslations =
                    translations[currentLanguage] || translations.en;


                // ASK FOR SECRET CODE
                const secretCode = prompt(
                    selectedTranslations.easterEggPrompt
                );


                // CANCEL INPUT
                if (secretCode === null) {

                    resetEasterEgg();

                    easterEggVerifying = false;

                    easterEggButton.disabled = false;

                    return;

                }


                // EMPTY INPUT
                if (!secretCode.trim()) {

                    alert(selectedTranslations.easterEggWrong);

                    resetEasterEgg();

                    easterEggVerifying = false;

                    easterEggButton.disabled = false;

                    return;

                }


                // VERIFY WITH SUPABASE
                await verifyEasterEggCode(secretCode.trim());


                // RESET AFTER VERIFICATION
                resetEasterEgg();

                easterEggVerifying = false;

                easterEggButton.disabled = false;

            }, 550);

        }

    });

}


/* =========================================
   22. PORTFOLIO 2 — STORY REVEAL
========================================= */

const storySection = document.querySelector("#about");

if (storySection && "IntersectionObserver" in window) {

    const storyObserver = new IntersectionObserver(
        function(entries, observer) {

            entries.forEach(function(entry) {

                if (entry.isIntersecting) {

                    storySection.classList.add("story-visible");

                    observer.unobserve(storySection);

                }

            });

        },
        {
            threshold: 0.2
        }
    );

    storyObserver.observe(storySection);

}


/* =========================================
   23. PORTFOLIO 3 — SKILL TREE ANIMATION
========================================= */

const skillsSection = document.querySelector("#skills");

if (skillsSection && "IntersectionObserver" in window) {

    const skillCards = skillsSection.querySelectorAll(".skill-card");

    const skillsObserver = new IntersectionObserver(
        function(entries, observer) {

            entries.forEach(function(entry) {

                if (entry.isIntersecting) {

                    skillsSection.classList.add("skills-visible");

                    skillCards.forEach(function(card) {

                        const progressBar =
                            card.querySelector(".skill-progress");

                        if (progressBar) {

                            const targetProgress =
                                progressBar.dataset.progress;

                            requestAnimationFrame(function() {

                                progressBar.style.width =
                                    targetProgress + "%";

                            });

                        }

                    });

                    observer.unobserve(skillsSection);

                }

            });

        },
        {
            threshold: 0.15
        }
    );

    skillsObserver.observe(skillsSection);

}


/* =========================================
   24. PORTFOLIO 4 — QUEST LOG ANIMATION
========================================= */

const projectsSection = document.querySelector("#projects");

if (projectsSection && "IntersectionObserver" in window) {

    const projectObserver = new IntersectionObserver(
        function(entries, observer) {

            entries.forEach(function(entry) {

                if (entry.isIntersecting) {

                    projectsSection.classList.add("projects-visible");

                    observer.unobserve(projectsSection);

                }

            });

        },
        {
            threshold: 0.12
        }
    );

    projectObserver.observe(projectsSection);

}


/* =========================================
   25. CERTIFICATE LIGHTBOX
========================================= */

const certificateLightbox =
    document.getElementById("certificate-lightbox");

const certificateOpenButton =
    document.querySelector(".certificate-open");

const lightboxCertificateImage =
    document.getElementById("lightbox-certificate-image");

const lightboxCloseButton =
    document.getElementById("lightbox-close");


if (
    certificateLightbox &&
    certificateOpenButton &&
    lightboxCertificateImage &&
    lightboxCloseButton
) {

    // OPEN CERTIFICATE
    certificateOpenButton.addEventListener("click", function() {

        const certificateImage =
            certificateOpenButton.querySelector("img");

        if (!certificateImage) {
            return;
        }

        lightboxCertificateImage.src = certificateImage.src;
        lightboxCertificateImage.alt = certificateImage.alt;

        certificateLightbox.classList.add("active");

        certificateLightbox.setAttribute("aria-hidden", "false");

        document.body.style.overflow = "hidden";

        lightboxCloseButton.focus();

    });


    // CLOSE CERTIFICATE
    function closeCertificateLightbox() {

        certificateLightbox.classList.remove("active");

        certificateLightbox.setAttribute("aria-hidden", "true");

        document.body.style.overflow = "";

        certificateOpenButton.focus();

    }


    lightboxCloseButton.addEventListener(
        "click",
        closeCertificateLightbox
    );


    // CLICK OUTSIDE IMAGE
    certificateLightbox.addEventListener("click", function(event) {

        if (event.target === certificateLightbox) {
            closeCertificateLightbox();
        }

    });


    // ESCAPE KEY
    document.addEventListener("keydown", function(event) {

        if (
            event.key === "Escape" &&
            certificateLightbox.classList.contains("active")
        ) {

            closeCertificateLightbox();

        }

    });

}

/* =========================================
   26. CONTACT FORM — RESET AFTER REDIRECT
========================================= */

const urlParams = new URLSearchParams(window.location.search);

if (urlParams.get("submitted") === "true") {

    if (contactForm) {
        contactForm.reset();
    }

    if (formFeedback) {

        const currentLanguage =
            languageSelect?.value || "en";

        const selectedTranslations =
            translations[currentLanguage] || translations.en;

        formFeedback.textContent =
            selectedTranslations.contactSuccess;

        formFeedback.style.color = "#a3c4ae";

    }

    window.history.replaceState(
        {},
        document.title,
        "#contact"
    );

}
