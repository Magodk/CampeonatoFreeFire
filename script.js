// --- LÓGICA DO SLIDER ---
let slideIndex = 0;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;

function showSlide(n) {
    slides.forEach(slide => {
        slide.classList.remove('active');
    });

    if (n >= totalSlides) {
        slideIndex = 0;
    } else if (n < 0) {
        slideIndex = totalSlides - 1;
    } else {
        slideIndex = n;
    }

    slides[slideIndex].classList.add('active');
}

function nextSlide() {
    showSlide(slideIndex + 1);
}

if (totalSlides > 0) {
    showSlide(slideIndex);
    setInterval(nextSlide, 5000); 
}

// --- LÓGICA DO MODAL (Pop-up) ---
const modal = document.getElementById('modalInscricao');
const btn = document.getElementById('abrirModalBtn');
const span = document.getElementsByClassName('close-btn')[0];

// Abre o modal ao clicar no botão 'INSCRIÇÃO'
if (btn) {
    btn.onclick = function(event) {
        event.preventDefault(); 
        modal.style.display = "block";
    }
}

// Fecha o modal ao clicar no (x)
if (span) {
    span.onclick = function() {
        modal.style.display = "none";
    }
}

// Fecha o modal ao clicar fora dele
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// --- VALIDAÇÃO DO FORMULÁRIO (JS) ---
const form = document.getElementById('formInscricao');
if (form) {
    form.addEventListener('submit', function(event) {
        const nomeTime = document.getElementById('nome_time').value.trim();
        const whatsapp = document.getElementById('whatsapp').value.trim();
        const aceiteRegras = document.getElementById('aceite_regras').checked;
        const mensagemErro = document.getElementById('mensagemErro');

        mensagemErro.textContent = ''; 

        // 1. Validação do Nome do Time
        if (nomeTime.length < 3) {
            mensagemErro.textContent = 'O nome do time deve ter no mínimo 3 caracteres.';
            event.preventDefault();
            return;
        }

        // 2. Validação básica do WhatsApp (formato)
        const regexWhatsapp = /^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/; 
        if (!regexWhatsapp.test(whatsapp)) {
            mensagemErro.textContent = 'Por favor, insira um número de WhatsApp válido (com DDD).';
            event.preventDefault();
            return;
        }

        // 3. Validação do Aceite das Regras
        if (!aceiteRegras) {
            mensagemErro.textContent = 'Você deve aceitar o Regulamento para se inscrever.';
            event.preventDefault();
            return;
        }

        // Se a validação JS passar, o formulário será enviado
    });
}