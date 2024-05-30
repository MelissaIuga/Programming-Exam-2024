"use strict"; // Use ECMAScript 5 strict mode in browsers that support it

window.addEventListener("load", initApp); // When the page is loaded, run initApp function

// Function to initialize the Web App
async function initApp() {
  console.log("initApp: app.js is running 🎉"); // Log to the console that the app is running
  const projects = await getProjects();
  console.log(projects);
  displayProjectsGrid(projects);
}

async function getProjects(){
  const response = await fetch("https://extracurricular-exam.melissaiuga.com/wp-json/wp/v2/projects?acf_format=standard");
  const data = await response.json();
  return data;
}


function displayProjects(projects) {
  const projectsList = document.querySelector("#projects-list");
}


function displayProjectsGrid(projects) {
  const projectsGrid = document.querySelector("#projects-grid");



for (const project of projects) {

    let websiteLink = ''; // init. link variable
    let linkText = 'View Website'; // for the default link text

    if (project.acf.link) {
      // If the project's title is 'Coopack WebApp', set the link text to 'View Figma File', because there is no website for the project
      if (project.acf.title === 'Coopack WebApp') {
        linkText = 'View Figma File';
      }
      // code to generate the link
      websiteLink = `<a href="${project.acf.link}" class="view-website-link" target="_blank">${linkText} →</a>`;
    }


  projectsGrid.insertAdjacentHTML(
    "beforeend",
    /*html*/ `
    <article class="grid-item">
      <img src="${project.acf.image}" alt="${project.acf.title}" />
      <h2>${project.acf.title}</h2>
      <h4>${project.acf.subtitle}</h4>
      <p><b>Client:</b> ${project.acf.client}</p>
      <p>${project.acf.description}</p>
      ${websiteLink}

    </article>
  `
  );
}
}

window.addEventListener('scroll', function() {
  const scrollBtn = document.getElementById('scroll');
  if (window.scrollY > 100) {
    scrollBtn.style.display = 'block';
  } else {
    scrollBtn.style.display = 'none';
  }
});

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
