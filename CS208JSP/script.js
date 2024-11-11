// Language Data for Internationalization
const langData = {
    en: {
        home: "Home",
        about: "About Me",
        skills: "Skills",
        education: "Education",
        portfolio: "Portfolio",
        contact: "Contact",
        background: "Background",
        about_me: "About Me",
        technical_skills: "Technical Skills",
        languages: "Languages",
        portfolio_message: "I will be showcasing many of my projects here in the future. I am growing.",
        address: "Address: Teke House 202",
        social_media: "Social Media",
        name_label: "Name:",
        email_label: "Email:",
        message_label: "Message:",
        send_button: "Send",
    },
    ja: {
        home: "ホーム",
        about: "自己紹介",
        skills: "スキル",
        education: "学歴",
        portfolio: "ポートフォリオ",
        contact: "連絡先",
        background: "経歴",
        about_me: "自己紹介",
        technical_skills: "技術スキル",
        languages: "言語",
        portfolio_message: "今後、多くのプロジェクトをここで紹介する予定です。",
        address: "住所：Teke House 202",
        social_media: "ソーシャルメディア",
        name_label: "名前：",
        email_label: "メールアドレス：",
        message_label: "メッセージ：",
        send_button: "送信",
    }
};

// Function to Switch Language
function switchLanguage(lang) {
    // Update Text Content Based on Language
    document.querySelectorAll('[data-lang-key]').forEach(function(element) {
        const key = element.getAttribute('data-lang-key');
        if (langData[lang][key]) {
            element.textContent = langData[lang][key];
        }
    });

    // Show/Hide Language Specific Content
    document.querySelectorAll('.lang').forEach(function(element) {
        if (element.classList.contains(lang)) {
            element.style.display = 'block';
        } else {
            element.style.display = 'none';
        }
    });

    // Save Language Preference in localStorage
    localStorage.setItem('preferredLanguage', lang);
}

// Function to Toggle Navigation Menu
function toggleMenu() {
    const nav = document.querySelector('nav ul');
    nav.classList.toggle('show');
}

// Function to Handle Form Submission
function handleFormSubmission() {
    const form = document.getElementById('contact-form');
    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const formData = new FormData(form);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            message: formData.get('message')
        };

        // Using Formspree for Form Handling
        fetch('https://formspree.io/f/your-form-id', {
            method: 'POST',
            headers: {
                'Accept': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            if (response.ok) {
                alert('Thank you for your message!');
                form.reset();
            } else {
                response.json().then(data => {
                    if (Object.hasOwn(data, 'errors')) {
                        alert(data["errors"].map(error => error["message"]).join(", "));
                    } else {
                        alert('Oops! Something went wrong.');
                    }
                });
            }
        })
        .catch(error => {
            alert('Oops! Something went wrong.');
        });
    });
}

// Initialize Functions on DOM Content Loaded
document.addEventListener('DOMContentLoaded', function () {
    // Retrieve Language Preference from localStorage or Default to 'en'
    const preferredLanguage = localStorage.getItem('preferredLanguage') || 'en';
    switchLanguage(preferredLanguage);

    // Add Event Listeners to Language Buttons
    document.getElementById('en-btn').addEventListener('click', function() {
        switchLanguage('en');
    });
    document.getElementById('ja-btn').addEventListener('click', function() {
        switchLanguage('ja');
    });

    // Handle Contact Form Submission
    handleFormSubmission();
});
