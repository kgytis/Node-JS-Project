const deleteButtons = document.querySelectorAll('.deleteButton')
deleteButtons.forEach(async (btn) => {
    btn.addEventListener('click', async event => {
        await fetch(`http://localhost:3000/user/blog/${event.target.id}`, {
            method: 'DELETE',
        });
        await location.reload()
    });
});

const toggle = document.querySelector('#flexSwitchCheckDefault');
const darkMode = document.querySelector('#darkModeLabel');
const body = document.querySelector('body');
const sorting = document.querySelector('.sortingDiv select')
const cards = document.querySelectorAll('.flexContainer')


//Dar reiks patvarkyti
// toggle.addEventListener('click', () => {
//     darkMode.textContent = toggle.checked ? 'Dark mode ON' : 'Dark mode OFF'
//     const bodyTheme = localStorage.getItem('theme1');
//     const selectTheme = localStorage.getItem('theme2');
//     const cardsTheme = localStorage.getItem('theme3');
//     body.classList.toggle(bodyTheme);
//     sorting.classList.toggle(selectTheme)
//     cards.forEach((card) => {
//         card.classList.toggle(cardsTheme)
//     });
//     if (!localStorage.getItem('theme1')) {
//         localStorage.setItem('theme1', 'dark-mode');
//         localStorage.setItem('theme2', 'select-dark-mode');
//         localStorage.setItem('theme3', 'card-dark-mode');
//     }
//     else {
//         localStorage.removeItem('theme1')
//         localStorage.removeItem('theme2')
//         localStorage.removeItem('theme3')
//     }
// })

