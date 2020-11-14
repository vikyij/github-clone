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
          createdAt
          stargazerCount
          viewerHasStarred
          isFork
        }
      }
    }
  }`
 const repoDetails = []
  const githubData = async() => {
    const response = await fetch("https://api.github.com/graphql", 
     {method: "POST", headers: {"Authorization": `Token ${token}`}, body: JSON.stringify({query: q})}
    )
    const res = await response.json()
    const repo = res.data.viewer.repositories;
    const repoArr = repo.nodes.map(item => item)
    return repoArr
  }

  githubData().then(data => {
    console.log(data)
  }).catch(error => console.log(error))

  window.addEventListener("load", githubData)

  //create array
 
