const fs = require("fs");


function readPage(pagePath){
    return fs.readFileSync(pagePath).toString();
}

function renderPage(page, config={}) {
    const navbar = fs.readFileSync("./public/components/navbar/navbar.html").toString()
        .replace("$TAB_TITLE", config.tabTitle || "Documentation")
        .replace("$CSS_LINK", config.cssLink || "");

    const footer = fs.readFileSync("./public/components/footer/footer.html").toString()
        .replace("$FOOTER_YEAR", `© ${new Date().getFullYear()}`);

    return navbar + page + footer;
}

function renderDynamicPage(post) {
    const dynamicPage = post.html;

    const constructedPage = renderPage(dynamicPage, {
        tabTitle: "Documentation | Dynamic Post"
    });

    return constructedPage;
}

async function renderDynamicPostPage(){
    const path = "./public/pages/dynamic-post/dynamic-post.html";
    let dynamicPage = readPage(path);

    const constructedPage = renderPage(dynamicPage, {
        tabTitle: "Documentation | Create Dynamic Post",
        cssLink: `<link rel="stylesheet" href="/pages/dynamic-post/dynamic-post.css" type="text/css"/>`
    });

    return constructedPage;
}



async function renderIndexPage(){
    const path = "./public/pages/index/index.html";
    let indexPage = readPage(path);

    const constructedPage = renderPage(indexPage, {
        tabTitle: "Documentation | Frontpage",
        cssLink: `<link rel="stylesheet" href="/pages/index/index.css" type="text/css"/>`
    });
    return constructedPage;
}

async function renderIntroPage() {
    const path = "./public/pages/intro/intro.html";
    let introPage = readPage(path);

    const constructedPage = renderPage(introPage, {
        tabTitle: "Documentation | Introduction",
        cssLink: `<link rel="stylesheet" href="/pages/intro/intro.css" type="text/css"/>`
    });

    return constructedPage;
}

async function renderEndpointsPage() {
    const path = "./public/pages/endpoints/endpoints.html";
    let endpointsPage = readPage(path);
    const constructedPage = renderPage(endpointsPage, {
        tabTitle: "Documentation | Endpoints"
    });
    return constructedPage;
}

async function renderServingFilesPage(){
    const path = "./public/pages/serving-files/serving-files.html";
    let servingFilesPage = readPage(path);
    const constructedPage = renderPage(servingFilesPage, {
        tabTitle: "Documentation | Serving Files"
    });
    return constructedPage;
}

async function renderLoginPage() {
    const path = "./public/pages/login/login.html";
    let loginPage = readPage(path);
    return loginPage;
}

async function renderStartPage() {
    const path = "./public/pages/getting-started/getting-started.html";
    let startPage = readPage(path);

    const constructedPage = renderPage(startPage, {
        tabTitle: "Documentation | Start",
        cssLink: `<link rel="stylesheet" href="/pages/getting-started/getting-started.css" type="text/css"/>`
    });

    return constructedPage;
}

async function renderViewDynamicPostPage(){
    const path = "./public/pages/view-dynamic-post/view-dynamic-post.html";
    let dynamicPage = readPage(path);

    const constructedPage = renderPage(dynamicPage, {
        tabTitle: "Documentation | Dynamic Post"
    });
    return constructedPage;
}

async function renderDynamicContentPage(post) {
    const path = "./public/pages/dynamic-content/dynamic-content.html";
    let dynamicContentPage = readPage(path);

    const constructedPage = renderPage(dynamicContentPage, {
        tabTitle: "Documentation | Dynamic Content"
    });
    return constructedPage;
}




function createDynamicPage(post = {}) {
    // Sort elements by order_id
    const sortedElements = [...post.codeExplanations, ...post.consoleSimulations, ...post.codeExamples]
        .sort((a, b) => a.order_id - b.order_id);

    // Create the main container for the dynamic page content
    let mainContainer = '<div class="main">';

    // Add the title
    mainContainer += '<h1>' + post.title + '</h1>';

    sortedElements.forEach(element => {
        if (element.title !== undefined && element.content !== undefined) {
            // Create a code explanation element
            let codeExplanationWrapper = '<div class="code-explanation">';

            // Add code explanation title
            codeExplanationWrapper += '<h2>' + element.title + '</h2>';

            // Add code explanation content
            codeExplanationWrapper += '<p>' + element.content + '</p>';

            // Append the code explanation wrapper to the main container
            mainContainer += codeExplanationWrapper + '</div>';
        } else if (element.lines !== undefined) {
            // Create a console simulation element
            let consoleSimulationWrapper = '<div class="console-simulation">';

            // Add console simulation title
            consoleSimulationWrapper += '<div class="console-title">Console Output</div>';

            // Add console simulation content
            let consoleContent = '<div class="console-content">';
            element.lines.forEach(line => {
                let consoleLine = '<div class="' + line.type + '">' + line.content + '</div>';
                consoleContent += consoleLine;
            });

            consoleSimulationWrapper += consoleContent + '</div>';

            // Append the console simulation wrapper to the main container
            mainContainer += consoleSimulationWrapper + '</div>';
        } else if (element.content !== undefined) {
            // Create a code example element
            let codeExampleWrapper = '<div class="code-example">';

            // Add code example content
            codeExampleWrapper += '<pre>' + element.content + '</pre>';

            // Append the code example wrapper to the main container
            mainContainer += codeExampleWrapper + '</div>';
        }
    });

    mainContainer += '</div>';

    return mainContainer;
}


module.exports = {
    renderPage,
    readPage,
    renderIndexPage,
    renderLoginPage,
    renderIntroPage,
    renderStartPage,
    renderDynamicPostPage,
    renderDynamicPage,
    renderDynamicContentPage,
    renderEndpointsPage,
    renderServingFilesPage,
    createDynamicPage,
    renderViewDynamicPostPage

};
