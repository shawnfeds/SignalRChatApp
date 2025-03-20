var themeItems = document.querySelectorAll('.theme-item');

// Add a click event listener to each item 
themeItems.forEach(function (item) {
    item.addEventListener('click', function () {
        // Get the text content of the clicked item 
        var themeName = this.textContent;
        console.log('Selected theme:', themeName);

        cssFileToReference = "";
       
        var linkTag = document.getElementById("mainCSS");

        switch (themeName) {
            case "Slate":
                cssFileToReference = "/css/Themes/Slate.bootstrap.min.css";
                break;
            case "Solar":
                cssFileToReference = "/css/Themes/Solar.bootstrap.min.css";
                break;
            case "Superhero":
                cssFileToReference = "/css/Themes/Superhero.bootstrap.min.css";
                break;
            case "Vapor":
                cssFileToReference = "/css/Themes/Vapor.bootstrap.min.css";
                break;
            case "Morph":
                cssFileToReference = "/css/Themes/Morph.bootstrap.min.css";
                break;
            case "Quartz":
                cssFileToReference = "/css/Themes/Quartz.bootstrap.min.css";
                break;
            case "Sketchy":
                cssFileToReference = "/css/Themes/Sketchy.bootstrap.min.css";
                break;
            case "Minty":
                cssFileToReference = "/css/Themes/Minty.bootstrap.min.css";
                break;
            case "Materia":
                cssFileToReference = "/css/Themes/Materia.bootstrap.min.css";
                break;
            default:
                cssFileToReference = "https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css";
        }

        linkTag.setAttribute("href", cssFileToReference);

        // Save the selected theme to localStorage 
        localStorage.setItem('selectedTheme', cssFileToReference);
    });
});