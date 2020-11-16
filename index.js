const classToggle = () => {
  const navs = document.querySelectorAll('.Navbar__Items')

  navs.forEach(nav => nav.classList.toggle('Navbar__ToggleShow'));
}

document.querySelector('.Navbar__Link-toggle')
  .addEventListener('click', classToggle);


//fetcha data
let myData;
const token = "bd834b23665d6a54416ea6df144a81c97101e785"
const q = `{ 
    viewer { 
      repositories(first: 20, orderBy:{field: CREATED_AT, direction: DESC}) {
        nodes {
          name
          description
          primaryLanguage {
            color
            name
          }
          forkCount
          updatedAt
          stargazerCount
          viewerHasStarred
          isFork
        }
      }
    }
  }`
const repoDetails = []
const githubData = async () => {
  const response = await fetch("https://api.github.com/graphql",
    { method: "POST", headers: { "Authorization": `Token ${token}` }, body: JSON.stringify({ query: q }) }
  )
  const res = await response.json()
  const repo = res.data.viewer.repositories;
  const repoArr = repo.nodes.map(item => item)
  return repoArr
}

githubData().then(data => {
  const repos = document.querySelector('.repos')

  populateRepos(repos, data)
  console.log(data)
}).catch(error => console.log(error))

window.addEventListener("load", githubData)

//create array

const populateRepos = (el, repos) => {
  let repo_list = ``
  let header = ``

  repos.forEach((repo) => {
    let today = new Date();
    let createdOn = new Date(repo.updatedAt);
    let msInDay = 24 * 60 * 60 * 1000;

    createdOn.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0)

    let diff = (+today - +createdOn) / msInDay


    header = `<div class="orange-bottom">
    <svg height="16" width="16" viewbox="0 0 16 16" version="1.1" aria-hidden="true">
        <path fill-rule="evenodd" d="M2 2.5A2.5 2.5 0 014.5 0h8.75a.75.75 0 01.75.75v12.5a.75.75 0 01-.75.75h-2.5a.75.75 0 110-1.5h1.75v-2h-8a1 1 0 00-.714 1.7.75.75 0 01-1.072 1.05A2.495 2.495 0 012 11.5v-9zm10.5-1V9h-8c-.356 0-.694.074-1 .208V2.5a1 1 0 011-1h8zM5 12.25v3.25a.25.25 0 00.4.2l1.45-1.087a.25.25 0 01.3 0L8.6 15.7a.25.25 0 00.4-.2v-3.25a.25.25 0 00-.25-.25h-3.5a.25.25 0 00-.25.25z"></path>
    </svg>
    Repositories
    <span class="counter">20</span>
   </div>`
    const single_repo = `
    <div class="repo">
      <button class="btn">${repo.viewerHasStarred === true ? '<i class="fa fa-star"></i>' : '<i class="fa fa-star-o"></i>'}${repo.viewerHasStarred === false ? "Star" : "Unstar"}</button>
      <div style="clear: both;"></div>
      <h3 style="margin-top: -15px;"><a href="#" class="repo-header">${repo.name}</a></h3>
      <span class="programming-lang">${repo.description !== null ? repo.description : ""}</span>
      <div class="repo-content">
          <span class="repo-language-color" style="background-color: ${repo.primaryLanguage !== null ? repo.primaryLanguage.color : null}"></span> 
          <span class="programming-lang">${repo.primaryLanguage !== null ? repo.primaryLanguage.name : null}</span>
          <span class="programming-lang"><i class="fa fa-star-o"></i>${repo.stargazerCount}</span>
          <span class="programming-lang"><i class="fa fa-code-fork"></i>${repo.forkCount}</span>
          <span class="programming-lang">Updated ${diff} days ago</span>
          <div class="semi-header2"></div>
      </div>
    </div>
    `
    repo_list += single_repo
  })

  el.innerHTML = header + repo_list
}
