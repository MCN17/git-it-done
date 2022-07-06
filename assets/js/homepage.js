// var getUserRepos = function () {
//     var response = fetch("https://api.github.com/users/octocat/repos").then(function(response) {
//         response.json().then(function(data) {
//             console.log(data);
//         })
//     })
//     console.log("outside");
// };

// getUserRepos();

var repoContainerEl = document.querySelector("#repos-container");
var repoSearchTerm = document.querySelector("#repo-search-term");
var languageButtonsEl = document.querySelector("#language-buttons");


var getFeaturedRepos = function(language) {
    var apiUrl = "https://api.github.com/search/repositories?q=" + language + "+is:featured&sort=help-wanted-issues";

    fetch(apiUrl).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                displayRepos(data.items, language);
                //console.log(response);
            });
            
        } else {
            alert("Error: Github User Not Found");
        }
    });
};

var getUserRepos = function(user) {
    // format the github api url
    var apiURL = "https://api.github.com/users/" + user + "/repos";

    // make a request to the url
    fetch(apiURL).then(function(response) {

        // request was successful
        if (response.ok) {                              // ok(property that's bundled in the response object from fetch()) means HTTP request status is in the 200s
        response.json().then(function(data) {
            displayRepos(data, user);
            //repos = data
            //searchTerm = user
            console.log(data);
        });
    } else {
        alert("Error: Github User Not Found");
    }
    })

    .catch(function(error) {
        //Notice this `.catch()` getting chained onto the end of the `.then()` method
        alert("Unable to connect to GitHub"); 
    });
};

// getUserRepos("mcn17");

var userFormEl = document.querySelector("#user-form");
var nameInputEl = document.querySelector("#username");

var formSubmitHandler = function(event) {
    event.preventDefault();

    //get value from input element
    var username = nameInputEl.value.trim();
    if (username) {
        getUserRepos(username);
        nameInputEl.value = "";
    } else {
        alert("Please enter a Github username");
    }
    //console.log(event);
}

userFormEl.addEventListener("submit", formSubmitHandler);
function displayRepos(repos, searchTerm){
//var displayRepos = function(repos, searchTerm) { //how does it know what searchTerm is?

    // check if api returned any repos
    if (repos.length === 0) {
        repoContainerEl.textContent = "No repositories found.";
        return;
    }

    repoContainerEl.textContent = "";
    repoSearchTerm.textContent = searchTerm;

    // loop over repos
    for (var i = 0; i < repos.length; i++) {
        
        // format repo name
        var repoName = repos[i].owner.login + "/" + repos[i].name;  // how does it know what repos and  owner.login is?
//console.log(repos[i])
//console.log(repos[i].owner)
//console.log(repos[i].owner.login)
        // create a container for each repo
        var repoEl = document.createElement("a");
        repoEl.classList = "list-item flex-row justify-space-between align-center";
        repoEl.setAttribute("href", "./single-repo.html?repo=" + repoName); // when you create links to HTML pages in JS, make sure the paths are relative to the HTML pages, not the JS file.

        // create a span element to hold repository name 
        var titleEl = document.createElement("span");
        titleEl.textContent = repoName;

        // append to container
        repoEl.appendChild(titleEl);

        //create status element
        var statusEl = document.createElement("span");
        statusEl.classList = "flex-row align-center";

        //check if current repo has issues or not 
        if (repos[i].open_issues_count > 0) {
            statusEl.innerHTML = "<i class='fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + " issue(s)";
        } else {
            statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
        }

        // append to container
        repoEl.appendChild(statusEl);

        // append container to the dom
        repoContainerEl.appendChild(repoEl);
    }

    //console.log(repos);
    // console.log(searchTerm);
};

var buttonClickHandler = function(event) {
    var language = event.target.getAttribute("data-language");

    if (language) {
        getFeaturedRepos(language);

        // clear old content
        repoContainerEl.textContent = "";
    }
    //console.log(language);
}
languageButtonsEl.addEventListener("click", buttonClickHandler);


