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
toggle.addEventListener('click', () => {
    darkMode.textContent = toggle.checked ? 'Dark mode ON' : 'Dark mode OFF'
    body.classList.toggle('dark-mode');
})
