// Função para mostrar a modal na página
function showModal(modal1, modal2, modal3) {
    var element1 = document.getElementById(modal1);
    element1.classList.add("show-modal");
    
    var element2 = document.getElementById(modal2);
    element2.classList.add("show-modal");

    var element3 = document.getElementById(modal3);
    element3.classList.add("show-modal");
}

// Função para fechar a modal na página
function closeModal(modal1, modal2, modal3) {
    var element1 = document.getElementById(modal1);
    element1.classList.remove("show-modal");

    var element2 = document.getElementById(modal2);
    element2.classList.remove("show-modal");

    var element3 = document.getElementById(modal3);
    element3.classList.remove("show-modal");
}