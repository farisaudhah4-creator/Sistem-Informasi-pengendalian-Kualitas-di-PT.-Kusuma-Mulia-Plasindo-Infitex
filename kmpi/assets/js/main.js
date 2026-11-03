const WA_NUMBER = '6281952764147';

const navLinks = document.querySelectorAll('#navMenu .nav-link');

function updateActiveLink() {
    let current = navLinks[0];

    navLinks.forEach(function (link) {
        const section = document.querySelector(link.getAttribute('href'));
        if (section && section.getBoundingClientRect().top <= 120) {
            current = link;
        }
    });

    if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 2) {
        current = navLinks[navLinks.length - 1];
    }

    navLinks.forEach(function (link) {
        link.classList.toggle('active', link === current);
    });
}

window.addEventListener('scroll', updateActiveLink);
updateActiveLink();


const reveal = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
        }
    });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(function (item) {
    reveal.observe(item);
});


const counterObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;

        const el = entry.target;
        const target = Number(el.dataset.count);
        let current = 0;
        const step = Math.ceil(target / 60);

        const timer = setInterval(function () {
            current += step;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            el.textContent = current;
        }, 25);

        counterObserver.unobserve(el);
    });
}, { threshold: 0.6 });

document.querySelectorAll('[data-count]').forEach(function (el) {
    counterObserver.observe(el);
});


const track = document.getElementById('processTrack');
const trackBar = document.getElementById('trackBar');

track.addEventListener('scroll', function () {
    const maxScroll = track.scrollWidth - track.clientWidth;
    trackBar.style.width = (track.scrollLeft / maxScroll) * 100 + '%';
});

document.getElementById('trackNext').addEventListener('click', function () {
    track.scrollBy({ left: 400, behavior: 'smooth' });
});

document.getElementById('trackPrev').addEventListener('click', function () {
    track.scrollBy({ left: -400, behavior: 'smooth' });
});


const photoModal = new bootstrap.Modal(document.getElementById('photoModal'));
const photoModalImg = document.getElementById('photoModalImg');

document.querySelectorAll('.zoom').forEach(function (img) {
    img.addEventListener('click', function () {
        photoModalImg.src = img.src;
        photoModal.show();
    });
});


const filterButtons = document.querySelectorAll('#productFilter .nav-link');
const productItems = document.querySelectorAll('#productGrid > [data-group]');

filterButtons.forEach(function (button) {
    button.addEventListener('click', function () {
        filterButtons.forEach(function (b) {
            b.classList.remove('active');
        });
        button.classList.add('active');

        productItems.forEach(function (item) {
            const show = button.dataset.filter === 'all' || item.dataset.group === button.dataset.filter;
            item.classList.toggle('d-none', !show);
        });
    });
});


const fabrics = [
    { name: 'Kain Rayon', img: 'kain-rayon', score: { harian: 2, adem: 3 }, why: 'Lembut, halus, dan berdaya serap tinggi. Enak jatuhnya untuk kemeja, celana, dan gaun.' },
    { name: 'Kain Katun', img: 'kain-katun', score: { harian: 2, adem: 3, awet: 1 }, why: 'Nyaman dan menyerap keringat, pilihan aman untuk kaus dan pakaian sehari-hari.' },
    { name: 'Teteron Cotton', img: 'teteron-cotton', score: { seragam: 3, awet: 3, harian: 1 }, why: 'Campuran polyester dan katun yang tidak mudah kusut dan awet, cocok untuk seragam.' },
    { name: 'Kain Polyester', img: 'kain-polyester', score: { olahraga: 2, awet: 2, seragam: 1 }, why: 'Kuat, tahan lama, dan tidak mudah kusut. Praktis untuk pakaian kerja dan olahraga.' },
    { name: 'Kain Spandex', img: 'kain-spandex', score: { olahraga: 3, melar: 3 }, why: 'Melar lalu kembali ke bentuk semula, ideal untuk pakaian ketat dan olahraga.' },
    { name: 'Kain Drill', img: 'kain-drill', score: { seragam: 3, tebal: 3 }, why: 'Tebal, kuat, dan tidak mudah robek. Teman setia seragam dan pakaian kerja.' },
    { name: 'Polyester Felt', img: 'polyester-felt', score: { kerajinan: 3, tebal: 2 }, why: 'Padat dan kaku, cocok untuk kerajinan, alas, dan perlengkapan.' }
];

const answers = {};
const pickerResult = document.getElementById('pickerResult');

function showRecommendation() {
    let best = fabrics[0];
    let bestScore = -1;

    fabrics.forEach(function (fabric) {
        const total = (fabric.score[answers.use] || 0) + (fabric.score[answers.need] || 0);
        if (total > bestScore) {
            bestScore = total;
            best = fabric;
        }
    });

    const message = 'Halo, saya tertarik dengan ' + best.name + '. Bisa dibantu?';
    const link = 'https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent(message);

    pickerResult.innerHTML =
        '<img src="assets/img/products/' + best.img + '.png" alt="' + best.name + '">' +
        '<div>' +
        '<h3>' + best.name + '</h3>' +
        '<p>' + best.why + '</p>' +
        '<a class="btn btn-kmp rounded-pill" target="_blank" rel="noopener" href="' + link + '">Tanya ' + best.name + '</a>' +
        '</div>';
    pickerResult.classList.remove('d-none');
}

document.querySelectorAll('.picker-opts').forEach(function (group) {
    const buttons = group.querySelectorAll('.btn');

    buttons.forEach(function (button) {
        button.addEventListener('click', function () {
            buttons.forEach(function (b) {
                b.classList.remove('active');
            });
            button.classList.add('active');
            answers[group.dataset.q] = button.dataset.v;

            if (answers.use && answers.need) {
                showRecommendation();
            }
        });
    });
});


document.querySelectorAll('.soc a').forEach(function (link) {
    link.addEventListener('click', function (e) {
        e.preventDefault();
    });
});


const form = document.getElementById('contactForm');
const formAlert = document.getElementById('formAlert');
const submitBtn = document.getElementById('fBtn');

function showAlert(type, text) {
    formAlert.innerHTML =
        '<div class="alert alert-' + type + ' alert-dismissible fade show" role="alert">' +
        text +
        '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Tutup"></button>' +
        '</div>';
}

form.addEventListener('submit', function (e) {
    e.preventDefault();

    if (!form.checkValidity()) {
        form.classList.add('was-validated');
        showAlert('warning', 'Lengkapi nama, email, dan pesan terlebih dahulu.');
        return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = 'Mengirim...';

    setTimeout(function () {
        showAlert('success', 'Pesan terkirim. Terima kasih, kami akan segera menghubungi kamu.');
        form.reset();
        form.classList.remove('was-validated');
        submitBtn.disabled = false;
        submitBtn.textContent = 'Kirim pesan';
    }, 900);
});
