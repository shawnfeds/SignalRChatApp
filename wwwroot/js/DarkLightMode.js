document.getElementById("ModeTheme").addEventListener('click', () => {
    if (document.documentElement.getAttribute('data-bs-theme') == 'dark') {
        document.documentElement.setAttribute('data-bs-theme', 'Light');
    } else {
        document.documentElement.setAttribute('data-bs-theme', 'dark');
    }
});