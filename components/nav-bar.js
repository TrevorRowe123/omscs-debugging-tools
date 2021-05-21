const navbarTemplate = document.createElement('template');
navbarTemplate.innerHTML = `
  <link rel="stylesheet" href="/styles/navbar.css">
  <link href="/styles/global.css" rel="stylesheet" type="text/css">
   <div class="navbar">
     <a class = "navbar-item" href="/index.html">Home</a>
     <div class="dropdown">
       <button class="dropbtn">Courses</button>
       <div class="dropdown-content">
        <div class="cs6250-dropdown">
         <a>CS 6250: Computer Networks</a>
         <div class="cs6250-dropdown-content">
            <a href="/CS6250/STP_Link_Visualizer/visualizer.html">Spanning Tree Project Link Visualizer</a>
            <a href="/CS6250/DV_Link_Visualizer/visualizer.html">Distance Vector Project Link Visualizer</a>
            </div>
          </div>
       </div>
     </div>
     <div class="social-row">
          <a href="https://github.com/TrevorRowe123/omscs-debugging-tools"><img class="icon" src="/img/GitHub-Mark.svg" alt="GitHub Link"></a>
          <a href="https://www.linkedin.com/in/trevor-rowe/"><img class = "icon" src="/img/LI-In-Bug.svg" alt="LinkedIn Link"></a>
        </div>
   </div>
`;

class NavBar extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        const shadowRoot = this.attachShadow({ mode: 'closed' });
        shadowRoot.appendChild(navbarTemplate.content);
    }
}

customElements.define('nav-bar-component', NavBar);