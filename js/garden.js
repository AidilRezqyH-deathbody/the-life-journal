// ===================================
// SUPABASE CONFIGURATION
// ===================================

const SUPABASE_URL = "https://ztfgnjakasohhtkohjln.supabase.co";
const SUPABASE_PUBLISHABLE_KEY =
    "sb_publishable_93rjkEGPxv8ec9ldggW6VQ_0BVeQe2g";

const VERIFY_CODE_URL =
    `${SUPABASE_URL}/functions/v1/verify-code`;

const VERIFY_SESSION_URL =
    `${SUPABASE_URL}/functions/v1/verify-session`;

const GET_MEMORIES_URL =
    `${SUPABASE_URL}/functions/v1/get-memories`;

const GET_COVER_URL =
    `${SUPABASE_URL}/functions/v1/get-cover`;

const UPDATE_COVER_URL =
    `${SUPABASE_URL}/functions/v1/update-cover`;

    let coverPreviewObjectUrl = null;
    
// ===================================
// HTML ELEMENTS
// ===================================

const accessForm = document.getElementById("access-form");
const accessInput = document.getElementById("access-code");
const accessButton = document.getElementById("access-button");
const accessMessage = document.getElementById("access-message");

const accessScreen = document.getElementById("access-screen");
const galleryScreen = document.getElementById("gallery-screen");
const sessionScreen = document.getElementById("session-screen");

const bookCover = document.getElementById("book-cover");
const bookContent = document.getElementById("book-content");
const openBookButton = document.getElementById("open-book-button");

const leftPage = document.querySelector(".left-page");
const rightPage = document.querySelector(".right-page");

const leftPageTitle = document.getElementById("left-page-title");
const leftPageDescription = document.getElementById("left-page-description");
const rightPageContent = document.getElementById("right-page-content");

const previousPageButton =
    document.getElementById("previous-page-button");
const nextPageButton =
    document.getElementById("next-page-button");
const pageIndicator = document.getElementById("page-indicator");

const SESSION_KEY = "garden_session_token";

// ===================================
// BACK COVER ELEMENTS
// ===================================

const backCoverFileInput =
    document.getElementById("back-cover-file-input");

// ===================================
// FRONT COVER ELEMENTS
// ===================================

const frontCoverImage =
    document.getElementById("front-cover-image");

const frontCoverPlaceholder =
    document.getElementById("front-cover-placeholder");

// ===================================
// BOOK STATE
// ===================================

let bookPages = [];
let currentPageIndex = 0;

// ===================================
// BACK COVER STATE
// ===================================

let activeSessionToken = null;



// =========================================
// AUTOMATIC SESSION VERIFICATION
// =========================================

async function restoreGardenSession() {

    const savedToken = sessionStorage.getItem(SESSION_KEY);

    // No saved token: show the access form
    if (!savedToken) {
        return;
    }

    // Show restoration screen
    accessScreen.classList.add("hidden");
    galleryScreen.classList.add("hidden");
    sessionScreen.classList.remove("hidden");

    try {

        const response = await fetch(VERIFY_SESSION_URL, {
            method: "POST",

            headers: {
                "Content-Type": "application/json",
                "apikey": SUPABASE_PUBLISHABLE_KEY,
                "Authorization": `Bearer ${savedToken}`
            }
        });

        const result = await response.json();

        // Invalid or expired session
        if (response.status === 401) {

            sessionStorage.removeItem(SESSION_KEY);
            activeSessionToken = null;

            sessionScreen.classList.add("hidden");
            accessScreen.classList.remove("hidden");

            return;
        }

        if (!response.ok) {
            throw new Error(
                result.error || "Unable to verify the session."
            );
        }

        // Valid session
        if (result.valid === true) {

            activeSessionToken = savedToken;

            await loadMemories(savedToken);

            console.log("Garden session restored successfully.");

            return;
        }

        // Unexpected verification response
        sessionStorage.removeItem(SESSION_KEY);
        activeSessionToken = null;

        sessionScreen.classList.add("hidden");
        accessScreen.classList.remove("hidden");

    } catch (error) {

        console.error("Session restoration failed:", error);

        activeSessionToken = null;

        sessionScreen.classList.add("hidden");
        accessScreen.classList.remove("hidden");

        if (accessMessage) {
            accessMessage.textContent =
                "Unable to restore your session. Please try entering your access code.";
        }

    }

}



// ===================================
// RENDER FRONT COVER IMAGE
// ===================================

function renderFrontCoverImage() {

    if (!frontCoverImage || !frontCoverPlaceholder) {
        return;
    }

    if (currentCoverImageUrl) {

        frontCoverImage.src = currentCoverImageUrl;
        frontCoverImage.hidden = false;
        frontCoverPlaceholder.hidden = true;

    } else {

        frontCoverImage.removeAttribute("src");
        frontCoverImage.hidden = true;
        frontCoverPlaceholder.hidden = false;
    }

}

// ===================================
// CHAPTER POETIC ENDINGS
// ===================================

const CHAPTER_POETIC_ENDINGS = {
    0: "And somehow, a simple joke became the beginning of our story."
};

const DEFAULT_POETIC_ENDING =
    "And every little moment found its place in this garden.";

// ===================================
// ACCESS CODE VERIFICATION
// ===================================

async function verifyAccessCode(code) {

    const response = await fetch(VERIFY_CODE_URL, {
        method: "POST",

        headers: {
            "Content-Type": "application/json",
            "apikey": SUPABASE_PUBLISHABLE_KEY
        },

        body: JSON.stringify({ code })
    });

    const result = await response.json();

    if (!response.ok) {
        throw new Error(result.error || "Unable to verify access.");
    }

    return result;
}

// ===================================
// LOAD MEMORIES FROM SUPABASE
// ===================================

async function loadMemories(token) {

    const response = await fetch(GET_MEMORIES_URL, {
        method: "POST",

        headers: {
            "Content-Type": "application/json",
            "apikey": SUPABASE_PUBLISHABLE_KEY,
            "x-session-token": token
        },

        body: JSON.stringify({})
    });

    const result = await response.json();

    if (!response.ok || !result.success) {
        throw new Error(result.error || "Unable to load memories.");
    }

    renderBook(result.chapters || []);

    await loadCover(token);

   accessScreen.classList.add("hidden");
sessionScreen.classList.add("hidden");
galleryScreen.classList.remove("hidden");

}

// ===================================
// LOAD BACK COVER IMAGE FROM SUPABASE
// ===================================

async function loadCover(token) {

    try {

        const response = await fetch(GET_COVER_URL, {
            method: "POST",

            headers: {
                "Content-Type": "application/json",
                "apikey": SUPABASE_PUBLISHABLE_KEY,
                "x-session-token": token
            },

            body: JSON.stringify({})
        });

        const result = await response.json();

        if (!response.ok || !result.success) {
            throw new Error(
                result.error || "Unable to load back cover."
            );
        }

        currentCoverImageUrl = result.image_url || null;

        renderFrontCoverImage();

        console.log("Cover images loaded successfully.");

    } catch (error) {

        console.error("Back cover loading error:", error);

        currentCoverImageUrl = null;

        renderFrontCoverImage();
    }
}

// ===================================
// SORT DATA
// ===================================

function sortByPageOrder(items) {

    return [...items].sort((a, b) => {
        return Number(a.page_order ?? 0) -
            Number(b.page_order ?? 0);
    });

}

// ===================================
// CHAPTER STORY CONTENT
// ===================================

const chapterStories = {

    0: {

        firstPage: `
Kalau mengingat kembali awal kita kenal,
rasanya cukup lucu juga.

Semuanya dimulai dari sebuah candaan darimu
yang mengatakan bahwa aku mirip dengan guru
Bahasa Inggris favoritmu di sekolah baru.

Awalnya hanya sebuah lelucon sederhana.
Namun, dari situlah percakapan kita dimulai.

Kita mulai berbincang, saling membalas cerita,
dan perlahan menjadi semakin akrab.

Saat itu sebenarnya belum ada perasaan apa-apa.
Kita hanya menikmati obrolan yang ada,
tanpa pernah berpikir bahwa suatu hari
percakapan sederhana itu akan menjadi
awal dari sesuatu yang lebih berarti.
        `,

        secondPage: `
Seiring berjalannya waktu, obrolan kita mulai berubah.

Bukan hanya tentang candaan atau hal-hal ringan,
tetapi juga tentang cerita pribadi dan masa lalu
yang tidak selalu menyenangkan.

Kita mulai saling memahami pengalaman masing-masing,
bahkan ketika di dalamnya ada hal-hal
yang mungkin tidak sepenuhnya benar.

Kita tidak berusaha menghakimi satu sama lain,
melainkan mencoba memahami apa yang pernah terjadi.

Dari sana, kita mulai saling menemani
ketika keadaan sedang tidak mudah.

Menjadi tempat untuk bercerita, mendengarkan,
dan memahami tanpa harus selalu memberikan penilaian.

Mungkin tanpa benar-benar kita sadari,
dari semua percakapan dan kebersamaan kecil itu,
rasa suka mulai tumbuh.
        `,

        poeticClosing:
            "And somehow, a simple joke became the beginning of our story."
    },

    // ===================================
    // CHAPTER 2
    // ===================================

    1: {

        firstPage: `
Ada masa ketika perjalanan kita tidak selalu
berjalan semudah sebelumnya.

Sesekali, keadaan membawa kita pada jarak
dan membuat percakapan yang biasanya hadir
terasa sedikit berbeda.

Namun, dari masa itu aku belajar bahwa
tidak semua hal harus dipaksakan untuk segera
kembali seperti semula.

Terkadang, kita hanya perlu memberi waktu,
belajar memahami keadaan, dan menerima
bahwa setiap orang memiliki caranya sendiri
dalam menghadapi sesuatu.

Sampai akhirnya, kesempatan untuk kembali
berbincang itu datang.

Kita mulai membuka ruang untuk saling memahami,
mengesampingkan hal-hal yang telah berlalu,
dan perlahan membangun kembali kedekatan
yang sempat berubah.

Aku senang karena kita masih diberi kesempatan
untuk melanjutkan cerita ini, dengan hati
yang sedikit lebih dewasa dan pemahaman
yang lebih baik terhadap satu sama lain.
        `,

        secondPage: `
Seiring waktu, ada hal-hal kecil yang ternyata
mulai memiliki arti tersendiri bagi kita.

Katanya, salah satu hal yang membuatmu nyaman
adalah sifatku yang cukup cerewet,
tetapi selalu berusaha menunjukkan perhatian.

Bahkan kebiasaanku membalas setiap pesanmu,
tanpa sengaja melewatkan satu pun,
ternyata menjadi sesuatu yang kamu hargai.

Bagiku, itu mungkin hanya kebiasaan sederhana.
Aku hanya ingin setiap cerita yang kamu sampaikan
mendapatkan tempat dan tidak terasa diabaikan.

Ada satu hal lain yang ternyata membuatmu
begitu terharu.

Selama ini, aku menyimpan gambar-gambar
hasil karyamu dan mengumpulkannya menjadi
sebuah koleksi kecil di ponselku.

Setiap gambar yang kamu buat memiliki
keunikannya sendiri.

Mungkin awalnya kamu hanya menganggapnya
sebagai sesuatu yang sederhana, tetapi bagiku,
setiap karya itu layak untuk disimpan dan dihargai.

Aku tidak pernah menyangka bahwa kebiasaanku
mengumpulkan gambar-gambarmu ternyata memiliki
arti sebesar itu bagimu.

Mengetahui bahwa karyamu selama ini diperhatikan
dan disimpan dengan begitu baik membuatku sadar
bahwa terkadang, hal sederhana yang kita lakukan
dengan tulus bisa memberikan kebahagiaan
yang tidak terduga bagi seseorang.

Dan dari semua hal itu, aku belajar bahwa
terkadang bukan sesuatu yang besar
yang membuat seseorang merasa berarti,
melainkan bagaimana hal-hal kecil tentang dirinya
dihargai dengan tulus.
        `,

        poeticClosing:
            "Sometimes, the most meaningful things are found in the little moments we choose to cherish."
    },

    // ===================================
    // CHAPTER 3
    // ===================================

    2: {

        firstPage: `
Ada satu masa ketika keadaan membawaku
melewati hari-hari yang tidak mudah.

Saat itu, kesehatanku sedang menurun cukup serius.
Di tengah keadaan yang membuatku harus lebih
banyak beristirahat, ada sesuatu yang akhirnya
ingin kusampaikan kepadamu.

Aku mulai menceritakan keadaanku dengan lebih
jujur, termasuk perasaan yang selama ini
perlahan tumbuh.

Mungkin saat itu bukan waktu yang paling tepat
untuk membicarakannya, tetapi aku tidak ingin
terus menyimpan semuanya sendiri.

Ada sedikit ketakutan bahwa setelah mengetahui
semuanya, keadaan di antara kita mungkin
akan berubah.

Bahkan ketika rasanya kamu mulai mencoba
menerima apa pun yang mungkin terjadi,
aku justru berharap kamu tidak pergi.

Aku hanya ingin kamu tetap ada.

Dan ternyata, meskipun kita tidak berada
di tempat yang sama, kamu tetap menemaniku
melewati masa itu.

Kita mengobrol seperti biasanya, berbagi cerita,
dan membuat hari-hari yang terasa berat
menjadi sedikit lebih ringan.

Aneh rasanya, karena terkadang percakapan
sederhana denganmu membuatku merasa
seolah-olah kamu sedang berada
tepat di sampingku.
        `,

        secondPage: `
Syukurlah, masa sulit itu akhirnya berlalu
dan keadaanku berangsur membaik.

Namun, ada satu hal dari masa itu
yang masih kuingat dengan jelas.

Tanpa direncanakan, kita pernah mengucapkan
kalimat yang hampir sama:

"Jangan pergi" dan "Jangan tinggalin aku."

Awalnya mungkin hanya sebuah ungkapan spontan.
Kita bahkan belum benar-benar membicarakan
apa arti perasaan di balik kalimat tersebut.

Sampai suatu hari, ketika aku bercanda
tentang bagaimana jadinya jika suatu saat
kita tinggal serumah, ternyata jawabanmu
menunjukkan bahwa hal itu bukan sekadar
candaan bagimu.

Dari percakapan sederhana itu,
aku mulai menyadari sesuatu.

Rupanya, harapan yang selama ini hanya berani
kusampaikan sebagai candaan ternyata juga
pernah terlintas di pikiranmu.

Perlahan, kita mulai memahami bahwa perasaan
itu ternyata berjalan ke arah yang sama.

Bukan lagi sekadar rasa nyaman karena terbiasa
berbincang, tetapi sesuatu yang tumbuh
dari perhatian, kebersamaan, dan keinginan
untuk tetap saling menemani.

Mungkin kita membutuhkan waktu
untuk menyadarinya.

Namun, pada akhirnya, kita mulai memahami
bahwa ada perasaan yang selama ini
tumbuh di antara kita.
        `,

        poeticClosing:
            "Even across the distance, we found a reason to stay."
    },

    // ===================================
    // CHAPTER 4
    // ===================================

    3: {

        firstPage: `
Ada satu hal dari hari ulang tahunku
yang ingin kusimpan sebagai kenangan tersendiri.

Di antara berbagai hal yang terjadi pada hari itu,
ada sesuatu darimu yang membuatnya terasa
lebih istimewa.

Tiga gambar kecil yang kamu buat
dan berikan kepadaku.

Mungkin bagi orang lain, itu hanya beberapa
gambar sederhana. Namun, bagiku, setiap gambar
memiliki ceritanya sendiri.

Ada waktu, usaha, dan perhatian yang kamu
berikan di dalamnya.

Aku tahu sebuah hadiah tidak selalu harus
sesuatu yang besar atau mewah untuk bisa berarti.

Terkadang, hal sederhana yang dibuat dengan tulus
justru menjadi sesuatu yang paling sulit dilupakan.

Terima kasih sudah menyempatkan diri membuat
sesuatu untuk hari ulang tahunku.
Aku benar-benar menghargainya.

Dan sejujurnya, bukan hanya gambarnya
yang membuatku bahagia, tetapi juga kenyataan
bahwa seseorang sepertimu telah memikirkan
sesuatu yang begitu istimewa untukku.
        `,

        secondPage: `
Seiring berjalannya waktu, aku menyadari
bahwa bukan hanya hadiah itu yang ingin kusimpan.

Ada banyak momen kecil lainnya yang perlahan
menjadi bagian dari cerita kita.

Percakapan sederhana, tawa, perhatian,
dan kenangan yang mungkin terlihat biasa saja,
tetapi memiliki tempat tersendiri dalam ingatanku.

Setelah semua yang telah kita lalui,
aku semakin memahami bahwa kehadiran seseorang
terkadang bisa membuat hari-hari
terasa lebih berarti.

Dan kamu adalah salah satu bagian dari cerita itu.

Tentang perasaanku, sepertinya tidak banyak
yang berubah.

Aku masih menyukaimu, dan aku masih menghargai
kesempatan untuk mengenalmu lebih jauh,
sedikit demi sedikit.
        `,

        poeticClosing: ""
    }

};

// ===================================
// CHAPTER CLOSING CONTENT
// ===================================

const chapterClosings = {
    3: {
        leftTitle: "A Heartfelt Thank You",

        leftLabel: "WITH GRATITUDE",

        leftText: `
Ada satu hal lagi yang ingin kusampaikan.

Terima kasih karena selama ini kamu telah
menemaniku, mendengarkan cerita-ceritaku,
dan berusaha memahami diriku dengan begitu baik.

Aku sadar bahwa masih ada banyak hal
dalam diriku yang perlu diperbaiki dan dipelajari.

Aku belum menjadi pribadi yang sepenuhnya baik.
Masih banyak ruang bagiku untuk tumbuh
dan menjadi lebih dewasa.

Namun, kamu tetap bersabar, memberiku waktu,
dan bersedia menunggu sembari kita sama-sama
berusaha menjadi lebih baik.

Aku tidak ingin menganggap kesabaran
dan pengertianmu sebagai sesuatu yang biasa saja.

Semua itu berarti bagiku,
lebih dari yang mungkin bisa kusampaikan
lewat kata-kata.
        `,

        rightLabel: "A NOTE FOR THE DAYS AHEAD",

        rightTitle: "Until We Meet Again",

        rightText: `
Aku berharap kita tidak berhenti belajar
hanya karena perjalanan ini belum selalu mudah.

Mari kita sama-sama memperbaiki diri,
mengejar hal-hal baik, dan menjadi pribadi
yang lebih dewasa.

Bukan karena tuntutan satu sama lain,
tetapi karena kita memang ingin tumbuh
menjadi lebih baik.

Aku tidak tahu kapan kesempatan itu akan datang.

Namun, jika suatu hari nanti kita dipertemukan,
semoga kita hadir dengan keadaan yang lebih baik,
membawa cerita tentang bagaimana kita
telah bertumbuh selama perjalanan ini.

Sampai hari itu tiba, semoga kita tetap bisa
saling mendukung, memahami, dan menghargai
setiap langkah kecil yang kita lalui.
        `,

        quote:
            "Until that day comes, let's keep growing."
    }
};

// ===================================
// GET STORY BY CHAPTER
// ===================================

function getChapterStory(chapter) {

    return chapterStories[chapter.chapterIndex] || {
        firstPage: chapter.description || "",
        secondPage: "",
        poeticClosing: ""
    };

}

// ===================================
// CREATE PHOTO FRAME
// ===================================

function createPhotoFrame(memory, ratioClass = "") {

    const frame = document.createElement("div");

    frame.className =
        `memory-photo-frame ${ratioClass}`.trim();

    // Informasi untuk Lightbox
    frame.dataset.title = memory.title || "";
    frame.dataset.caption = memory.caption || "";

    // Accessibility
    frame.setAttribute("role", "button");
    frame.setAttribute("tabindex", "0");
    frame.setAttribute("aria-haspopup", "dialog");

    frame.setAttribute(
        "aria-label",
        `Open photograph: ${memory.title || "A little memory"}`
    );

    // Image
    const image = document.createElement("img");

    image.className = "book-memory-image";
    image.src = memory.image_url || "";
    image.alt = memory.title || "A little memory";

    // Reserve image dimensions before lazy loading.
    const imageDimensions = {
        "ratio-9-16": [900, 1600],
        "ratio-3-4": [900, 1200],
        "ratio-4-3": [1200, 900],
        "ratio-4-5": [800, 1000],
        "ratio-1-1": [1000, 1000],
        "ratio-5-4": [1250, 1000],
        "ratio-5-7": [1000, 1400],
        "ratio-16-9": [1600, 900],
        "ratio-587-640": [587, 640],
        "ratio-281-320": [281, 320]
    };

    const selectedDimensions =
        imageDimensions[ratioClass] || imageDimensions["ratio-4-3"];

    image.width = selectedDimensions[0];
    image.height = selectedDimensions[1];

    image.loading = "lazy";
    image.decoding = "async";
    image.draggable = false;

    frame.appendChild(image);

    return frame;
}


// ===================================
// CREATE PHOTO GALLERY
// ===================================

function createPhotoGallery(memories, chapterIndex, side, startIndex) {

    const gallery = document.createElement("div");

    gallery.className = "memory-gallery-grid";

    // CHAPTER GALLERY CLASS
    const chapterGalleryClasses = [
        "chapter-one-gallery",
        "chapter-two-gallery",
        "chapter-three-gallery",
        "chapter-four-gallery"
    ];

    gallery.classList.add(
        chapterGalleryClasses[chapterIndex] ||
        "standard-chapter-gallery"
    );

    gallery.classList.add(`gallery-${side}`);
    gallery.classList.add(`count-${memories.length}`);

    // EMPTY GALLERY
    if (!memories.length) {

        const emptyMessage = document.createElement("p");

        emptyMessage.className = "gallery-empty-message";

        emptyMessage.textContent =
            "No photographs have been added to this page yet.";

        gallery.appendChild(emptyMessage);

        return gallery;
    }

    // MANUAL PHOTO RATIOS
    const manualRatios = {

        0: [
            "ratio-9-16",
            "ratio-3-4",
            "ratio-4-3"
        ],

        1: [
            "ratio-3-4",
            "ratio-4-5",
            "ratio-4-5",
            "ratio-583-640",
            "ratio-5-4"
        ],

        2: [
            "ratio-1-1",
            "ratio-16-9",
            "ratio-5-7",
            "ratio-3-4",
            "ratio-16-9"
        ],

        3: [
            "ratio-587-640",
            "ratio-1-1",
            "ratio-4-5",
            "ratio-4-3",
           "ratio-15-16",
           "ratio-281-320"
        ]
 
    };

    // CREATE PHOTO ELEMENTS
    memories.forEach((memory, index) => {

        const originalIndex = startIndex + index;

        const chapterRatios = manualRatios[chapterIndex] || [];

        const ratioClass =
            chapterRatios[originalIndex] || "ratio-4-3";

        gallery.appendChild(
            createPhotoFrame(memory, ratioClass)
        );

    });

    return gallery;
}


// ===================================
// PHOTO LIGHTBOX
// ===================================

let activeGalleryImages = [];
let activePhotoIndex = 0;
let photoLightbox = null;
let lightboxImage = null;
let lightboxTitle = null;
let lightboxCaption = null;
let lightboxCounter = null;
let previousFocusedElement = null;


// CREATE LIGHTBOX ELEMENTS
function createPhotoLightbox() {

    if (photoLightbox) return;

    photoLightbox = document.createElement("div");

    photoLightbox.className = "photo-lightbox";
    photoLightbox.setAttribute("role", "dialog");
    photoLightbox.setAttribute("aria-modal", "true");

    photoLightbox.setAttribute(
        "aria-label",
        "Photograph viewer"
    );

    photoLightbox.hidden = true;

    const closeButton = document.createElement("button");

    closeButton.className = "lightbox-close";
    closeButton.type = "button";
    closeButton.textContent = "×";

    closeButton.setAttribute(
        "aria-label",
        "Close photograph"
    );


    const previousButton = document.createElement("button");

    previousButton.className = "lightbox-previous";
    previousButton.type = "button";
    previousButton.textContent = "‹";

    previousButton.setAttribute(
        "aria-label",
        "Previous photograph"
    );


    const nextButton = document.createElement("button");

    nextButton.className = "lightbox-next";
    nextButton.type = "button";
    nextButton.textContent = "›";

    nextButton.setAttribute(
        "aria-label",
        "Next photograph"
    );


    const imageFrame = document.createElement("div");

    imageFrame.className = "lightbox-image-frame";


    lightboxImage = document.createElement("img");

    lightboxImage.className = "lightbox-image";
    lightboxImage.alt = "";


    // PHOTO TITLE
    lightboxTitle = document.createElement("h3");

    lightboxTitle.className = "lightbox-title";


    // PHOTO CAPTION
    lightboxCaption = document.createElement("p");

    lightboxCaption.className = "lightbox-caption";


    // PHOTO COUNTER
    lightboxCounter = document.createElement("p");

    lightboxCounter.className = "lightbox-counter";


    imageFrame.appendChild(lightboxImage);

    photoLightbox.append(
        closeButton,
        previousButton,
        imageFrame,
        nextButton,
        lightboxTitle,
        lightboxCaption,
        lightboxCounter
    );

    document.body.appendChild(photoLightbox);


    // BUTTON EVENTS
    closeButton.addEventListener(
        "click",
        closePhotoLightbox
    );

    previousButton.addEventListener(
        "click",
        showPreviousPhoto
    );

    nextButton.addEventListener(
        "click",
        showNextPhoto
    );


    // CLOSE WHEN CLICKING OUTSIDE THE PHOTO
    photoLightbox.addEventListener("click", function (event) {

        if (event.target === photoLightbox) {
            closePhotoLightbox();
        }

    });

}


// UPDATE DISPLAYED PHOTO
function updateLightboxPhoto() {

    const selectedImage =
        activeGalleryImages[activePhotoIndex];

    if (!selectedImage) return;

    lightboxImage.src = selectedImage.src;
    lightboxImage.alt = selectedImage.alt;

    const frame = selectedImage.closest(
        ".memory-photo-frame"
    );

    const title = frame?.dataset.title || "";
    const caption = frame?.dataset.caption || "";

    lightboxTitle.textContent = title;
    lightboxTitle.hidden = !title;

    lightboxCaption.textContent = caption;
    lightboxCaption.hidden = !caption;

    lightboxCounter.textContent =
        `${activePhotoIndex + 1} / ${activeGalleryImages.length}`;

}


// OPEN PHOTO LIGHTBOX
function openPhotoLightbox(selectedImage) {

    createPhotoLightbox();

    activeGalleryImages = Array.from(
        document.querySelectorAll(
            ".chapter-left-gallery .book-memory-image, " +
            ".memory-gallery-grid .book-memory-image"
        )
    );

    activePhotoIndex =
        activeGalleryImages.indexOf(selectedImage);

    if (activePhotoIndex === -1) return;

    previousFocusedElement = document.activeElement;

    updateLightboxPhoto();

    photoLightbox.hidden = false;

    document.body.classList.add("lightbox-open");

    photoLightbox.querySelector(".lightbox-close").focus();

}


// CLOSE PHOTO LIGHTBOX
function closePhotoLightbox() {

    if (!photoLightbox || photoLightbox.hidden) return;

    photoLightbox.hidden = true;

    document.body.classList.remove("lightbox-open");

    lightboxImage.removeAttribute("src");

    if (previousFocusedElement) {
        previousFocusedElement.focus();
    }

}


// PREVIOUS PHOTO
function showPreviousPhoto() {

    if (!activeGalleryImages.length) return;

    activePhotoIndex =
        (activePhotoIndex - 1 + activeGalleryImages.length) %
        activeGalleryImages.length;

    updateLightboxPhoto();

}


// NEXT PHOTO
function showNextPhoto() {

    if (!activeGalleryImages.length) return;

    activePhotoIndex =
        (activePhotoIndex + 1) % activeGalleryImages.length;

    updateLightboxPhoto();

}


// PHOTO FRAME INTERACTION
document.addEventListener("click", function (event) {

    const frame = event.target.closest(
        ".chapter-left-gallery .memory-photo-frame, " +
        ".memory-gallery-grid .memory-photo-frame"
    );

    if (!frame) return;

    const image = frame.querySelector(".book-memory-image");

    if (image) {
        openPhotoLightbox(image);
    }

});


// KEYBOARD INTERACTION
document.addEventListener("keydown", function (event) {

    const frame = event.target.closest?.(
        ".chapter-left-gallery .memory-photo-frame, " +
        ".memory-gallery-grid .memory-photo-frame"
    );

    // Open a photo using Enter or Space
    if (
        frame &&
        (event.key === "Enter" || event.key === " ")
    ) {

        event.preventDefault();

        const image = frame.querySelector(".book-memory-image");

        if (image) {
            openPhotoLightbox(image);
        }

        return;
    }

    if (!photoLightbox || photoLightbox.hidden) return;

    // Close
    if (event.key === "Escape") {

        closePhotoLightbox();

    }

    // Previous
    else if (event.key === "ArrowLeft") {

        showPreviousPhoto();

    }

    // Next
    else if (event.key === "ArrowRight") {

        showNextPhoto();

    }

});


// ===================================
// CLEAR CONTENT FROM THE PREVIOUS SPREAD
// ===================================

function clearGeneratedContent() {

    leftPage.querySelectorAll(
        ".chapter-left-gallery"
    ).forEach(element => element.remove());

    leftPage.querySelectorAll(
        ".screenshot-note"
    ).forEach(element => element.remove());

    leftPageDescription.style.display = "";
    leftPageDescription.textContent = "";

    rightPageContent.replaceChildren();

    const roseDecoration =
        leftPage.querySelector(".page-rose-decoration");

    if (roseDecoration) {
        roseDecoration.style.display = "";
    }

    leftPage.classList.remove("chapter-closing-left");
    rightPage.classList.remove("chapter-closing-right");

}


// ===================================
// RENDER STORY SPREAD
// ===================================

function renderStorySpread(chapter) {

    clearGeneratedContent();

    const story = getChapterStory(chapter);

    // LEFT PAGE
    leftPageTitle.textContent = chapter.title;

    leftPageDescription.style.display = "";
    leftPageDescription.textContent = story.firstPage;

    const leftLabel = leftPage.querySelector(".page-label");

    if (leftLabel) {
        leftLabel.textContent = "A STORY TO REMEMBER";
    }

    // RIGHT PAGE
    const rightLabel = document.createElement("p");

    rightLabel.className = "page-label";
    rightLabel.textContent = "THE STORY CONTINUES";

    const continuationTitle = document.createElement("h3");

    continuationTitle.className = "story-continuation-title";
    continuationTitle.textContent = "A Little More...";

    const continuation = document.createElement("p");

    continuation.className = "story-continuation-text";
    continuation.textContent = story.secondPage;

    const poeticClosing = document.createElement("p");

    poeticClosing.className = "story-poetic-closing";
    poeticClosing.textContent = story.poeticClosing;

    rightPageContent.append(
        rightLabel,
        continuationTitle,
        continuation
    );

    if (story.poeticClosing) {
        rightPageContent.append(poeticClosing);
    }

}


// ===================================
// RENDER CLOSING SPREAD
// ===================================

function renderClosingSpread(chapter) {

    clearGeneratedContent();

    const closing = chapterClosings[chapter.chapterIndex];

    if (!closing) {
        renderStorySpread(chapter);
        return;
    }

    leftPage.classList.add("chapter-closing-left");
    rightPage.classList.add("chapter-closing-right");

    // LEFT PAGE
    const leftLabel = leftPage.querySelector(".page-label");

    if (leftLabel) {
        leftLabel.textContent = closing.leftLabel;
    }

    leftPageTitle.textContent = closing.leftTitle;

    leftPageDescription.style.display = "";
    leftPageDescription.textContent = closing.leftText;

    // RIGHT PAGE
    const rightLabel = document.createElement("p");

    rightLabel.className = "page-label";
    rightLabel.textContent = closing.rightLabel;

    const rightTitle = document.createElement("h3");

    rightTitle.className = "closing-page-title";
    rightTitle.textContent = closing.rightTitle;

    const rightText = document.createElement("p");

    rightText.className = "closing-page-text";
    rightText.textContent = closing.rightText;

    const quote = document.createElement("p");

    quote.className = "closing-page-quote";
    quote.textContent = closing.quote;

    rightPageContent.append(
        rightLabel,
        rightTitle,
        rightText,
        quote
    );

}


// ===================================
// RENDER PHOTO SPREAD
// ===================================

function renderPhotoSpread(chapter) {

    clearGeneratedContent();

    leftPageTitle.textContent = chapter.title;
    leftPageDescription.style.display = "none";

    const roseDecoration =
        leftPage.querySelector(".page-rose-decoration");

    if (roseDecoration) {
        roseDecoration.style.display = "none";
    }

    const leftLabel = leftPage.querySelector(".page-label");

    if (leftLabel) {
        leftLabel.textContent = "MOMENTS WORTH KEEPING";
    }

    const memories = (chapter.memories || [])
        .filter(memory => memory.image_url);

    let leftMemories = [];
    let rightMemories = [];
    let middle = 0;

    // CHAPTER 1: screenshot gets its own page.
    if (chapter.chapterIndex === 0) {

        leftMemories = memories.slice(0, 1);
        rightMemories = memories.slice(1);

        middle = 1;

    } else {

        middle = Math.ceil(memories.length / 2);

        leftMemories = memories.slice(0, middle);
        rightMemories = memories.slice(middle);

    }

    // LEFT PAGE GALLERY
    const leftGallery = createPhotoGallery(
        leftMemories,
        chapter.chapterIndex,
        "left",
        0
    );

    leftGallery.classList.add("chapter-left-gallery");

    leftPage.insertBefore(
        leftGallery,
        leftPage.querySelector(".page-number")
    );

    // SPECIAL NOTE UNDER CHAPTER 1 SCREENSHOT
    if (chapter.chapterIndex === 0 && leftMemories.length > 0) {

        const screenshotNote = document.createElement("p");

        screenshotNote.className = "screenshot-note";
        screenshotNote.textContent =
            "saya tidak akan melupakan ini :b";

        leftPage.insertBefore(
            screenshotNote,
            leftPage.querySelector(".page-number")
        );

    }

    // RIGHT PAGE GALLERY
    const rightLabel = document.createElement("p");

    rightLabel.className = "page-label";
    rightLabel.textContent = "LITTLE MOMENTS";

    const rightGallery = createPhotoGallery(
        rightMemories,
        chapter.chapterIndex,
        "right",
        middle
    );

    rightPageContent.append(rightLabel, rightGallery);

}

// ===================================
// OPEN BACK COVER PHOTO PICKER
// ===================================

function openCoverPhotoPicker() {

    if (!backCoverFileInput) return;

    backCoverFileInput.click();

}


// ===================================
// VALIDATE BACK COVER IMAGE
// ===================================

async function validateCoverImage(file) {

    const allowedTypes = [
        "image/jpeg",
        "image/png",
        "image/webp"
    ];

    const maxSize = 5 * 1024 * 1024;

    if (!allowedTypes.includes(file.type)) {
        throw new Error(
            "Please choose a JPG, PNG, or WebP image."
        );
    }

    if (file.size > maxSize) {
        throw new Error(
            "The image must not exceed 5 MB."
        );
    }

    const imageUrl = URL.createObjectURL(file);

    try {

        const dimensions = await new Promise(
            (resolve, reject) => {

                const image = new Image();

                image.onload = () => {
                    resolve({
                        width: image.naturalWidth,
                        height: image.naturalHeight
                    });
                };

                image.onerror = () => {
                    reject(
                        new Error("Unable to read this image.")
                    );
                };

                image.src = imageUrl;
            }
        );

        const ratio =
            dimensions.width / dimensions.height;

        const expectedRatio = 4 / 3;

        if (
            Math.abs(ratio - expectedRatio) > 0.02
        ) {
            throw new Error(
                "Please choose an image with a 4:3 aspect ratio."
            );
        }

    } finally {

        URL.revokeObjectURL(imageUrl);

    }
}


// ===================================
// SHOW BACK COVER PHOTO PREVIEW
// ===================================

function showCoverPreview(file) {

    if (coverPreviewObjectUrl) {
        URL.revokeObjectURL(coverPreviewObjectUrl);
    }

    pendingCoverFile = file;

    coverPreviewObjectUrl = URL.createObjectURL(file);

    const image = document.getElementById("back-cover-image");
    const placeholder = document.getElementById("back-cover-placeholder");
    const changeButton = document.getElementById("change-back-cover-button");
    const actions = document.getElementById("back-cover-edit-actions");
    const message = document.getElementById("back-cover-preview-message");

    if (!image || !actions || !message) {
        console.error("Back cover preview elements are unavailable.");
        return;
    }

    image.src = coverPreviewObjectUrl;
    image.hidden = false;

    if (placeholder) {
        placeholder.hidden = true;
    }

    if (changeButton) {
        changeButton.hidden = true;
    }

    actions.hidden = false;

    message.textContent =
        "Gambar terbaikmu akan ditampilkan jika mengupload gambar 4:3 mu disini.";

    const saveButton =
        document.getElementById("confirm-cover-change-button");

    if (saveButton) {
        saveButton.disabled = false;
    }

}


// ===================================
// CLOSE BACK COVER PHOTO PREVIEW
// ===================================

function closeCoverPreview() {

    if (coverPreviewObjectUrl) {
        URL.revokeObjectURL(coverPreviewObjectUrl);
        coverPreviewObjectUrl = null;
    }

    pendingCoverFile = null;

    renderBackCoverSpread();

}


// ===================================
// HANDLE SELECTED COVER IMAGE
// ===================================

backCoverFileInput.addEventListener(
    "change",
    async function () {

        const file = this.files[0];

        if (!file) return;

        try {

            await validateCoverImage(file);

            showCoverPreview(file);

        } catch (error) {

            alert(error.message);

        } finally {

            backCoverFileInput.value = "";

        }
    }
);


// ===================================
// BACK COVER PHOTO CONTROLS
// ===================================

rightPageContent.addEventListener("click", function (event) {

    // CHANGE PHOTO / CHOOSE ANOTHER PHOTO
    if (
        event.target.closest("#change-back-cover-button") ||
        event.target.closest("#choose-another-cover-button")
    ) {

        openCoverPhotoPicker();
        return;

    }

    // CANCEL
    if (event.target.closest("#cancel-cover-change-button")) {

        closeCoverPreview();
        return;

    }

    // SAVE CHANGES
    if (event.target.closest("#confirm-cover-change-button")) {

        uploadCoverPhoto();

    }

});


// ===================================
// UPLOAD BACK COVER PHOTO
// ===================================

async function uploadCoverPhoto() {

    if (!pendingCoverFile) {
        return;
    }

    if (!activeSessionToken) {

        const message =
            document.getElementById("back-cover-preview-message");

        if (message) {
            message.textContent =
                "Your session has expired. Please log in again.";
        }

        return;
    }

    const saveButton =
        document.getElementById("confirm-cover-change-button");

    const message =
        document.getElementById("back-cover-preview-message");

    if (!saveButton || !message) {
        return;
    }

    saveButton.disabled = true;

    message.textContent =
        "Preserving this little memory...";

    try {

        const formData = new FormData();

        formData.append("file", pendingCoverFile);

        const response = await fetch(UPDATE_COVER_URL, {
            method: "POST",

            headers: {
                "apikey": SUPABASE_PUBLISHABLE_KEY,
                "x-session-token": activeSessionToken
            },

            body: formData
        });

        const result = await response.json();

        if (!response.ok || !result.success) {
            throw new Error(
                result.error || "Unable to update back cover."
            );
        }

        // Ambil signed URL foto terbaru dari Supabase
        await loadCover(activeSessionToken);

        if (!currentCoverImageUrl) {
            throw new Error(
                "The photo was uploaded, but could not be loaded."
            );
        }

        // Lepaskan preview sementara
        if (coverPreviewObjectUrl) {
            URL.revokeObjectURL(coverPreviewObjectUrl);
            coverPreviewObjectUrl = null;
        }

        pendingCoverFile = null;

        // Render ulang dengan foto permanen
        renderBackCoverSpread();

        console.log("Back cover photo updated successfully.");

    } catch (error) {

        console.error("Back cover upload error:", error);

        message.textContent =
            error.message || "Something went wrong.";

        saveButton.disabled = false;

    }

}


// ===================================
// RENDER BACK COVER SPREAD
// ===================================

function renderBackCoverSpread() {

    clearGeneratedContent();

    // ===================================
    // LEFT PAGE
    // ===================================

    const leftLabel =
        leftPage.querySelector(".page-label");

    if (leftLabel) {
        leftLabel.textContent = "A FINAL LITTLE NOTE";
    }

    leftPageTitle.textContent = "The Garden";

    leftPageDescription.style.display = "";

    leftPageDescription.textContent =
        "Beberapa kenangan mungkin menjelma menjadi halaman, " +
        "namun maknanya akan selalu menetap di dalam hati.\n\n" +
        "Setiap momen kecil, setiap cerita, dan setiap jejak " +
        "kini telah menemukan tempatnya di taman ini.\n\n" +
        "Dan meskipun buku kecil ini telah tiba di halaman terakhirnya, " +
        "kisah yang tersimpan di dalamnya tak akan benar-benar usai. " +
        "Sebab, beberapa kenangan akan selalu menemukan cara " +
        "untuk tetap mekar, bahkan setelah cerita selesai.";


    // ===================================
    // RIGHT PAGE
    // ===================================

    const rightLabel = document.createElement("p");

    rightLabel.className = "page-label";
    rightLabel.textContent = "ONE LAST MEMORY";


    // PHOTO FRAME
    const frame = document.createElement("div");

    frame.className = "back-cover-photo-frame";


    // PHOTO IMAGE
    const image = document.createElement("img");

    image.id = "back-cover-image";
    image.alt = "The photograph on the back cover";

    // Reserve the 4:3 image ratio before loading.
    image.width = 1200;
    image.height = 900;

    image.decoding = "async";

    image.hidden = !currentCoverImageUrl;

    if (currentCoverImageUrl) {
        image.src = currentCoverImageUrl;
    }


    // PLACEHOLDER
    const placeholder = document.createElement("div");

    placeholder.id = "back-cover-placeholder";
    placeholder.className = "back-cover-placeholder";

    placeholder.textContent =
        "A little memory will bloom here.";

    placeholder.hidden = Boolean(currentCoverImageUrl);


    frame.append(image, placeholder);


    // INITIAL CHANGE PHOTO BUTTON
    const changeButton = document.createElement("button");

    changeButton.type = "button";
    changeButton.id = "change-back-cover-button";
    changeButton.className = "change-back-cover-button";
    changeButton.textContent = "CHANGE PHOTO";


    // PREVIEW MESSAGE
    const message = document.createElement("p");

    message.id = "back-cover-preview-message";
    message.className = "back-cover-preview-message";

    message.textContent =
        "Gambar terbaikmu akan ditampilkan jika mengupload gambar 4:3 mu disini.";

    message.hidden = false;


    // PREVIEW ACTIONS
    const actions = document.createElement("div");

    actions.id = "back-cover-edit-actions";
    actions.className = "back-cover-edit-actions";
    actions.hidden = true;


    // CHOOSE ANOTHER PHOTO
    const chooseButton = document.createElement("button");

    chooseButton.type = "button";
    chooseButton.id = "choose-another-cover-button";
    chooseButton.className = "choose-another-cover-button";
    chooseButton.textContent = "CHOOSE ANOTHER PHOTO";


    // CANCEL
    const cancelButton = document.createElement("button");

    cancelButton.type = "button";
    cancelButton.id = "cancel-cover-change-button";
    cancelButton.className = "cancel-cover-change-button";
    cancelButton.textContent = "CANCEL";


    // SAVE
    const saveButton = document.createElement("button");

    saveButton.type = "button";
    saveButton.id = "confirm-cover-change-button";
    saveButton.className = "confirm-cover-change-button";
    saveButton.textContent = "SAVE CHANGES";


    actions.append(
        chooseButton,
        cancelButton,
        saveButton
    );


    // APPEND ALL ELEMENTS
    rightPageContent.append(
        rightLabel,
        frame,
        changeButton,
        message,
        actions
    );

}

// ===================================
// BUILD BOOK SPREADS
// ===================================
// Chapter 1–3:
// 1. Story
// 2. Memories
//
// Chapter 4:
// 1. Story
// 2. Closing Note
// 3. Memories
// ===================================

function renderBook(chapters) {

    bookPages = [];

    if (!chapters.length) {

        clearGeneratedContent();

        leftPageTitle.textContent = "A Quiet Garden";

        leftPageDescription.textContent =
            "No memories have been added yet.";

        rightPageContent.textContent =
            "Waiting for memories...";

        pageIndicator.textContent = "CHAPTER 0 / 0";

        previousPageButton.disabled = true;
        nextPageButton.disabled = true;

        return;
    }

    const sortedChapters = sortByPageOrder(chapters).filter(
        chapter => Number(chapter.page_order) !== 5
    );

    console.table(
        sortedChapters.map(chapter => ({
            title: chapter.title,
            page_order: chapter.page_order,
            memories: chapter.memories?.length || 0
        }))
    );

    sortedChapters.forEach((chapter, index) => {

        const preparedChapter = {
            ...chapter,

            chapterIndex: index,

            title: chapter.title || `Chapter ${index + 1}`,

            description: chapter.description || "",

            memories: sortByPageOrder(chapter.memories || [])
        };

        // SPREAD 1: STORY
        bookPages.push({
            type: "story",
            chapter: preparedChapter
        });

        // SPREAD 2: CLOSING NOTE
        // Khusus Chapter 4 (page_order = 4)
        if (Number(preparedChapter.page_order) === 4) {

            bookPages.push({
                type: "closing",
                chapter: preparedChapter
            });

        }

        // SPREAD 3: MEMORIES
        bookPages.push({
            type: "photos",
            chapter: preparedChapter
        });

    });


    // ===================================
    // FINAL SPREAD: BACK COVER
    // ===================================

    bookPages.push({
        type: "back-cover"
    });

    currentPageIndex = 0;

    showBookPage();

}


// ===================================
// DISPLAY CURRENT SPREAD
// ===================================

function showBookPage() {

    if (!bookPages.length) return;

    const spread = bookPages[currentPageIndex];

    const chapter = spread.chapter || null;


    // Pilih tampilan berdasarkan jenis spread
    if (spread.type === "story") {

        renderStorySpread(chapter);

    } else if (spread.type === "closing") {

        renderClosingSpread(chapter);

    } else if (spread.type === "photos") {

        renderPhotoSpread(chapter);

    } else if (spread.type === "back-cover") {

        renderBackCoverSpread();

    }


    // ===================================
    // PAGE NUMBERS
    // ===================================

    const pageNumbers =
        document.querySelectorAll(".book-page .page-number");

    const leftNumber = currentPageIndex * 2 + 1;
    const rightNumber = currentPageIndex * 2 + 2;

    if (pageNumbers.length >= 2) {

        pageNumbers[0].textContent =
            String(leftNumber).padStart(2, "0");

        pageNumbers[1].textContent =
            String(rightNumber).padStart(2, "0");

    }


    // ===================================
    // NAVIGATION BUTTONS
    // ===================================

    previousPageButton.disabled =
        currentPageIndex === 0;

    nextPageButton.disabled =
        currentPageIndex === bookPages.length - 1;


    // ===================================
    // PAGE INDICATOR
    // ===================================

    const spreadNames = {

        story: "STORY",

        closing: "CLOSING NOTE",

        photos: "MEMORIES",

        "back-cover": "THE END"

    };

    const spreadName = spreadNames[spread.type];

    const totalChapters = new Set(
        bookPages
            .filter(page => page.chapter)
            .map(page => page.chapter.id)
    ).size;

    if (spread.type === "back-cover") {

        pageIndicator.textContent =
            "THE END · BACK COVER";

    } else {

        pageIndicator.textContent =
            `CHAPTER ${chapter.chapterIndex + 1} / ${totalChapters} · ${spreadName}`;

    }


    // ===================================
    // ACCESSIBILITY LABEL
    // ===================================

    if (spread.type === "back-cover") {

        leftPage.setAttribute(
            "aria-label",
            "The Garden, back cover, left page"
        );

        rightPage.setAttribute(
            "aria-label",
            "The Garden, back cover, right page"
        );

    } else {

        leftPage.setAttribute(
            "aria-label",
            `${chapter.title}, ${spreadName}, left page`
        );

        rightPage.setAttribute(
            "aria-label",
            `${chapter.title}, ${spreadName}, right page`
        );

    }

}


// ===================================
// BOOK NAVIGATION
// ===================================

previousPageButton.addEventListener("click", function () {

    if (currentPageIndex > 0) {

        currentPageIndex--;

        showBookPage();

    }

});


nextPageButton.addEventListener("click", function () {

    if (currentPageIndex < bookPages.length - 1) {

        currentPageIndex++;

        showBookPage();

    }

});


// ===================================
// ACCESS FORM
// ===================================

accessForm.addEventListener("submit", async function (event) {

    event.preventDefault();

    const code = accessInput.value.trim();

    if (!code) {

        accessMessage.textContent =
            "Please enter your access code.";

        return;
    }

    accessButton.disabled = true;

    accessButton.textContent = "Entering...";

    accessMessage.textContent =
        "Checking your access...";

    try {

        const result = await verifyAccessCode(code);

        if (result.success && result.token) {

            activeSessionToken = result.token;

            sessionStorage.setItem(
                SESSION_KEY,
                result.token
            );

            await loadMemories(result.token);

            console.log("Garden access verified.");

            console.log("Memories loaded successfully.");

        } else {

            throw new Error(
                "The access code could not be verified."
            );

        }

    } catch (error) {

        console.error("Garden error:", error);

        accessMessage.textContent = error.message;

    } finally {

        accessButton.disabled = false;

        accessButton.textContent = "Enter the Garden";

        accessInput.value = "";

    }

});


// ===================================
// OPEN THE BOOK
// ===================================

openBookButton.addEventListener("click", function () {

    bookCover.classList.add("hidden");

    bookContent.classList.remove("hidden");

    console.log("The book has been opened.");

});


// =========================================
// ACCESS CODE — SHOW / HIDE
// =========================================

const accessCodeFieldForToggle =
    document.getElementById("access-code");

const accessCodeVisibilityToggle =
    document.getElementById("toggle-access-code");


const eyeIconSVG = `
<svg xmlns="http://www.w3.org/2000/svg"
    width="20" height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.7"
    stroke-linecap="round"
    stroke-linejoin="round">

    <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7-10-7-10-7z"/>
    <circle cx="12" cy="12" r="3"/>
</svg>
`;


const eyeOffIconSVG = `
<svg xmlns="http://www.w3.org/2000/svg"
    width="20" height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.7"
    stroke-linecap="round"
    stroke-linejoin="round">

    <path d="M3 3l18 18"/>
    <path d="M10.6 10.6a2 2 0 0 0 2.8 2.8"/>
    <path d="M9.9 5.2A10.8 10.8 0 0 1 12 5c6.4 0 10 7 10 7a15 15 0 0 1-4 4.7"/>
    <path d="M6.2 6.2C3.5 8 2 12 2 12s3.6 7 10 7c1.3 0 2.5-.3 3.6-.8"/>
</svg>
`;


if (accessCodeFieldForToggle && accessCodeVisibilityToggle) {

    accessCodeVisibilityToggle.addEventListener("click", () => {

        const isHidden =
            accessCodeFieldForToggle.type === "password";

        accessCodeFieldForToggle.type =
            isHidden ? "text" : "password";

        accessCodeVisibilityToggle.innerHTML =
            isHidden ? eyeOffIconSVG : eyeIconSVG;

        accessCodeVisibilityToggle.setAttribute(
            "aria-label",
            isHidden ? "Hide access code" : "Show access code"
        );

        accessCodeVisibilityToggle.setAttribute(
            "title",
            isHidden ? "Hide access code" : "Show access code"
        );

        accessCodeVisibilityToggle.setAttribute(
            "aria-pressed",
            String(isHidden)
        );

    });

}

// =========================================
// INITIALIZE GARDEN SESSION
// =========================================

restoreGardenSession();