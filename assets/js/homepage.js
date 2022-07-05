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

var getUserRepos = function(user) {
    // format the github api url
    var apiURL = "https://api.github.com/users/" + user + "/repos";

    // make a request to the url
    fetch(apiURL).then(function(response) {

        // request was successful
        if (response.ok) {                              // ok(property that's bundled in the response object from fetch()) means HTTP request status is in the 200s
        response.json().then(function(data) {
            displayRepos(data, user);
            //console.log(data);
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

var displayRepos = function(repos, searchTerm) { //how does it know what searchTerm is?

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
        var repoName = repos[i].owner.login + "/" + repos[i].name;  // how does it know what owner.login is?

        // create a container for each repo
        var repoEl = document.createElement("div");
        repoEl.classList = "list-item flex-row justify-space-between align-center";

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

    console.log(repos);
    // console.log(searchTerm);
};


