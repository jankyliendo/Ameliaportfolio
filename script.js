document.addEventListener('DOMContentLoaded', () => {
    // --- Selección de Elementos del DOM ---
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeToggleMobileBtn = document.getElementById('theme-toggle-mobile');
    const langToggleBtn = document.getElementById('language-toggle');
    const langToggleMobileBtn = document.getElementById('language-toggle-mobile');
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenuCloseButton = document.getElementById('mobile-menu-close-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const overlay = document.getElementById('overlay');
    const sections = document.querySelectorAll('main > section');
    const allNavLinks = document.querySelectorAll('header a, .mobile-nav a');
    const typingElement = document.getElementById('typing-element');

    // --- Lógica de Traducción ---
    const translations = {
        id: {
            portfolio_title: "Portofolio Amelia | Desainer Grafis",
            nav_home: "Beranda",
            nav_about: "Tentang Saya",
            nav_blog: "Karya Saya",
            nav_contact: "Kontak",
            home_greeting: "Halo, saya",
            home_intro: "Selamat datang di portofolio saya! Seorang desainer yang bersemangat dalam mengubah ide menjadi konsep visual yang berdampak dan tak terlupakan.",
            home_cv_button: "Unduh CV",
            about_title: "Tentang Saya",
            about_p1: "Saya seorang desainer grafis yang bersemangat dan berdedikasi, lulusan Sekolah Menengah Kejuruan Desain Komunikasi Visual (DKV), dengan pengalaman kuat dalam menciptakan materi visual yang inovatif dan efektif. Saya mahir menggunakan alat profesional seperti Adobe Photoshop dan Illustrator, serta prinsip-prinsip dasar desain—komposisi, teori warna, dan tipografi—yang saya terapkan dalam proyek branding, papan nama, poster, dan konten media sosial.",
            about_p2: "Perjalanan karir saya mencakup mulai dari pengembangan identitas korporat lengkap hingga pembuatan materi pemasaran cetak dan digital. Saya dikenal karena perhatian saya yang besar terhadap detail, kreativitas yang konstan, dan kemampuan untuk menghasilkan solusi visual yang mengkomunikasikan pesan yang jelas dan menarik. Selain itu, saya memiliki keterampilan dalam ilustrasi dan produksi multimedia, yang memungkinkan saya untuk memperkaya setiap proyek dengan elemen yang dipersonalisasi dan orisinal.",
            about_p3: "Saya bekerja secara mandiri, mengelola tenggat waktu dan sumber daya, dan juga berkolaborasi secara efektif dalam tim multidisiplin, berkomunikasi dengan lancar dengan klien dan kolega untuk memastikan hasil yang sejalan dengan tujuan proyek. Saya selalu mencari tantangan baru yang memungkinkan saya untuk berkembang secara profesional dan memberikan nilai melalui desain.",
            skills_title: "Keterampilan",
            skill_photoshop: "Adobe Photoshop",
            skill_illustrator: "Adobe Illustrator",
            skill_branding: "Desain Branding",
            skill_illustration: "Ilustrasi Digital",
            skill_photography: "Fotografi",
            skill_video: "Konten Video",
            skill_communication: "Komunikasi",
            skill_time_management: "Manajemen Waktu",
            skill_color_theory: "Teori Warna",
            skill_typography: "Tipografi",
            work_title: "Karya Saya",
            contact_title: "Mari Bicara",
            contact_subtitle: "Punya proyek yang ingin didiskusikan? Kirimkan saya pesan.",
            form_name: "Nama",
            form_email: "Email",
            form_message: "Pesan",
            form_submit: "Kirim Pesan",
            typing_words: ["Desainer Grafis", "Kreatif", "Ilustrator", "UI/UX Designer"]
        },
        en: {
            portfolio_title: "Amelia's Portfolio | Graphic Designer",
            nav_home: "Home",
            nav_about: "About Me",
            nav_blog: "My Work",
            nav_contact: "Contact",
            home_greeting: "Hello, I'm",
            home_intro: "Welcome to my portfolio! A passionate designer dedicated to transforming ideas into impactful and memorable visual concepts.",
            home_cv_button: "Download CV",
            about_title: "About Me",
            about_p1: "I am a passionate and dedicated graphic designer, a graduate of the Vocational High School in Visual Communication Design (DKV), with solid experience in creating innovative and effective visual materials. I am proficient in professional tools like Adobe Photoshop and Illustrator, as well as fundamental design principles—composition, color theory, and typography—which I apply to branding, signage, posters, and social media content projects.",
            about_p2: "My career path ranges from developing complete corporate identities to creating print and digital marketing materials. I am characterized by great attention to detail, constant creativity, and the ability to generate visual solutions that communicate clear and attractive messages. Additionally, I have skills in illustration and multimedia production, allowing me to enrich each project with personalized and original elements.",
            about_p3: "I work autonomously, managing deadlines and resources, and also collaborate effectively in multidisciplinary teams, communicating fluently with clients and colleagues to ensure results are aligned with project goals. I am always seeking new challenges that allow me to grow professionally and add value through design.",
            skills_title: "Skills",
            skill_photoshop: "Adobe Photoshop",
            skill_illustrator: "Adobe Illustrator",
            skill_branding: "Branding Design",
            skill_illustration: "Digital Illustration",
            skill_photography: "Photography",
            skill_video: "Video Content",
            skill_communication: "Communication",
            skill_time_management: "Time Management",
            skill_color_theory: "Color Theory",
            skill_typography: "Typography",
            work_title: "My Work",
            contact_title: "Let's Talk",
            contact_subtitle: "Have a project in mind? Send me a message.",
            form_name: "Name",
            form_email: "Email",
            form_message: "Message",
            form_submit: "Send Message",
            typing_words: ["Graphic Designer", "Creative", "Illustrator", "UI/UX Designer"]
        }
    };

    let currentLang = localStorage.getItem('lang') || 'id';
    let wordsToType = translations[currentLang].typing_words;

    const setLanguage = (lang) => {
        currentLang = lang;
        localStorage.setItem('lang', lang);
        document.documentElement.lang = lang;
        
        wordsToType = translations[lang].typing_words;
        if (typingEffect) typingEffect.reset();

        document.querySelectorAll('[data-lang]').forEach(el => {
            const key = el.getAttribute('data-lang');
            if (translations[lang][key]) {
                el.innerText = translations[lang][key];
            }
        });

        langToggleBtn.textContent = lang.toUpperCase();
        langToggleMobileBtn.textContent = lang.toUpperCase();
    };

    const toggleLanguage = () => {
        const newLang = currentLang === 'id' ? 'en' : 'id';
        setLanguage(newLang);
    };

    if (langToggleBtn) langToggleBtn.addEventListener('click', toggleLanguage);
    if (langToggleMobileBtn) langToggleMobileBtn.addEventListener('click', toggleLanguage);

    // --- Lógica del Tema (Modo Oscuro/Claro) ---
    const applyTheme = (theme) => {
        const darkIconDesktop = document.getElementById('theme-toggle-dark-icon');
        const lightIconDesktop = document.getElementById('theme-toggle-light-icon');
        const darkIconMobile = document.getElementById('theme-toggle-dark-icon-mobile');
        const lightIconMobile = document.getElementById('theme-toggle-light-icon-mobile');

        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
            if (lightIconDesktop) lightIconDesktop.style.display = 'block';
            if (darkIconDesktop) darkIconDesktop.style.display = 'none';
            if (lightIconMobile) lightIconMobile.style.display = 'block';
            if (darkIconMobile) darkIconMobile.style.display = 'none';
        } else {
            document.documentElement.classList.remove('dark');
            if (darkIconDesktop) darkIconDesktop.style.display = 'block';
            if (lightIconDesktop) lightIconDesktop.style.display = 'none';
            if (darkIconMobile) darkIconMobile.style.display = 'block';
            if (lightIconMobile) lightIconMobile.style.display = 'none';
        }
    };

    const toggleTheme = () => {
        const newTheme = document.documentElement.classList.contains('dark') ? 'light' : 'dark';
        localStorage.setItem('theme', newTheme);
        applyTheme(newTheme);
    };

    if (themeToggleBtn) themeToggleBtn.addEventListener('click', toggleTheme);
    if (themeToggleMobileBtn) themeToggleMobileBtn.addEventListener('click', toggleTheme);
    
    const savedTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    applyTheme(savedTheme);

    // --- Lógica de Navegación por Clic ---
    const showSection = (targetId) => {
        sections.forEach(section => {
            section.style.display = 'none';
        });
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
            targetSection.style.display = 'block';
        }
        
        document.querySelectorAll('#nav-desktop .nav-link, .nav-link-mobile').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === targetId) {
                link.classList.add('active');
            }
        });
    };

    allNavLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href');
            // Si el enlace es solo un ancla, previene el comportamiento por defecto
            if (targetId.startsWith('#')) {
                e.preventDefault();
                showSection(targetId);
                closeMobileMenu();
            }
        });
    });

    // --- Lógica del Menú Móvil Lateral ---
    const openMobileMenu = () => {
        if (mobileMenu) mobileMenu.classList.add('open');
        if (overlay) overlay.classList.add('active');
    };

    const closeMobileMenu = () => {
        if (mobileMenu) mobileMenu.classList.remove('open');
        if (overlay) overlay.classList.remove('active');
    };

    if (mobileMenuButton) mobileMenuButton.addEventListener('click', openMobileMenu);
    if (mobileMenuCloseButton) mobileMenuCloseButton.addEventListener('click', closeMobileMenu);
    if (overlay) overlay.addEventListener('click', closeMobileMenu);

    // Mostrar la sección correcta al cargar la página
    const initialHash = window.location.hash || '#home';
    showSection(initialHash);

    // --- LÓGICA DE ANIMACIÓN DE ESCRITURA ---
    const TypingEffect = (element, words) => {
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let timeoutId;

        const type = () => {
            const currentWord = words[wordIndex];
            let displayText;

            if (isDeleting) {
                displayText = currentWord.substring(0, charIndex - 1);
                charIndex--;
            } else {
                displayText = currentWord.substring(0, charIndex + 1);
                charIndex++;
            }

            element.textContent = displayText;

            let typeSpeed = isDeleting ? 100 : 150;

            if (!isDeleting && charIndex === currentWord.length) {
                typeSpeed = 2000;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                typeSpeed = 500; 
            }
            
            timeoutId = setTimeout(type, typeSpeed);
        }
        
        const start = () => {
             if (timeoutId) clearTimeout(timeoutId);
             type();
        }

        const reset = () => {
            if (timeoutId) clearTimeout(timeoutId);
            wordIndex = 0;
            charIndex = 0;
            isDeleting = false;
            words = translations[currentLang].typing_words;
            start();
        }

        return { start, reset };
    }
    
    let typingEffect;
    if (typingElement) {
        typingEffect = TypingEffect(typingElement, wordsToType);
        typingEffect.start();
    }

    // --- LÓGICA DE LA GALERÍA LIGHTBOX ---
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.getElementById('lightbox-close');
    const lightboxPrev = document.getElementById('lightbox-prev');
    const lightboxNext = document.getElementById('lightbox-next');
    
    const galleryItems = document.querySelectorAll('.card-project');
    let currentIndex = 0;

    const showLightbox = (index) => {
        const item = galleryItems[index];
        const src = item.getAttribute('data-src');
        lightboxImg.setAttribute('src', src);
        lightbox.classList.add('active');
        currentIndex = index;
    };

    const hideLightbox = () => {
        lightbox.classList.remove('active');
    };

    const showNext = () => {
        currentIndex = (currentIndex + 1) % galleryItems.length;
        showLightbox(currentIndex);
    };

    const showPrev = () => {
        currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
        showLightbox(currentIndex);
    };

    galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            showLightbox(index);
        });
    });

    if (lightboxClose) lightboxClose.addEventListener('click', hideLightbox);
    if (lightboxNext) lightboxNext.addEventListener('click', showNext);
    if (lightboxPrev) lightboxPrev.addEventListener('click', showPrev);

    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                hideLightbox();
            }
        });
    }

    document.addEventListener('keydown', (e) => {
        if (lightbox && lightbox.classList.contains('active')) {
            if (e.key === 'ArrowRight') showNext();
            else if (e.key === 'ArrowLeft') showPrev();
            else if (e.key === 'Escape') hideLightbox();
        }
    });

    // --- Inicializar Idioma ---
    setLanguage(currentLang);
});
