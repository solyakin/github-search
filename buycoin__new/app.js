const inputField = document.getElementById("input");
const submitBtn = document.getElementById("submit-btn");
const mainPage = document.querySelector(".main_page")
const hamburger = document.querySelector(".hamburger");
const menuList = document.querySelector(".hamburger-menu");
const hamburgerProfile = document.querySelector(".username");
const repositoryList = document.querySelector(".repository_list");
const profile_details = document.querySelector(".profile-name");
const avatar = document.querySelector(".avatar_icon");
const avatarPhoto = document.querySelector(".avatar-photo")
const statusBtn = document.querySelector(".status-btn");
const statusText = document.querySelector(".status-text");
const repoLanguageColor = document.querySelector('.repo-language-color');
const repototalCount = document.querySelector('.repototalCount');
const contact = document.querySelector(".contact");
const follower = document.querySelector(".follower");
const followerIcon =document.querySelector(".follower_icon");
const starredIcon = document.querySelector(".starred_icon");
const profileImage = document.querySelector(".profile-image");
const userBio = document.querySelector(".user-bio");
const UserLocation = document.querySelector(".location");
const link = document.querySelector(".link");
const twitter = document.querySelector(".twitter");
const searchBox = document.querySelector(".search_wrapper"); 
const licensed = document.querySelector('.licensed');
const searchHistory = document.querySelector(".search_history");
const typeMirror = document.querySelector(".type_mirror");
const jumpToBtn = document.querySelector(".jump-to-button");
const star = document.querySelector(".octicon-star");
const justiceScale = document.querySelector('.justice-scale');


const baseurl = "https://api.github.com/graphql";

const headers = {
    "content-type" : "application/json",
    Authorization: "bearer 3b5bb79df6b2fb359ab93df10a2cf124c18b37d8"
}

const dataController = async (userName) => {
  let user = userName
  let result = await fetch(baseurl, {
     method: "POST",
     headers: headers,
     body: JSON.stringify(
      {
        "query": `
                 query {
                  user(login : ${JSON.stringify(user)}){
                      repositories(first: 20, orderBy: {field: CREATED_AT, direction: DESC}) {
                        totalCount
                        nodes {
                          name
                          url
                          createdAt
                          description
                          updatedAt
                          stargazerCount 
                          forkCount
                          licenseInfo{
                            name
                            featured
                          }
                          primaryLanguage{
                            name
                            color
                          }
                        }
                      }
                    avatarUrl
                    name
                    login
                    bio
                    location
                    websiteUrl
                    twitterUsername
                    followers{
                      totalCount
                    }
                    following{
                      totalCount
                    }
                    starredRepositories{
                      totalCount
                    }
                  }
                }
              `
      }
     )
     }).catch(error => console.log(JSON.stringify(error)))
  let { data } = await result.json()
  const profile = data.user;
  localStorage.setItem('search', JSON.stringify(profile));
  window.location.href = "profile.html"
}

if(submitBtn){
  submitBtn.addEventListener( 'click', () => {
    if(inputField.value !== ""){
      const userName = inputField.value;
      inputField.value = "";
      dataController(userName)
      }
    })
}

const UiContoller = () =>{
  const localStorageData = JSON.parse(localStorage.getItem('search'));
  RenderingProfileImages(localStorageData)
  RenderingProfileSection(localStorageData)
  RenderingRepoList(localStorageData)
}

//defining each rendering parameters
const RenderingProfileImages = (profile) => {
    const markUpPhoto = document.createElement("img");
    markUpPhoto.setAttribute('src', profile.avatarUrl);
    markUpPhoto.setAttribute("alt", "The Profile pic");

    const avatarIcon = document.createElement('img');
    avatarIcon.setAttribute('src', profile.avatarUrl)
    avatarIcon.setAttribute('class', 'avatar');

    profileImage.appendChild(markUpPhoto);
    avatar.appendChild(avatarIcon);
}

const RenderingProfileSection = (profile) => {

  //rendering username in the hamburger menulist for mobile
  if(hamburger){
    const div = document.createElement('div');
    div.setAttribute('class', 'avatar-wrappper')
     let avatarImage = document.createElement("img");
     avatarImage.setAttribute('src', profile.avatarUrl);
     avatarImage.setAttribute('class', 'avatar-image');

     let avatarSpan = document.createElement("span");
     avatarSpan.innerHTML = profile.name;

     div.appendChild(avatarImage);
     div.appendChild(avatarSpan);
     hamburgerProfile.appendChild(div);
  }

//Rendering  the profile section
  let div = document.createElement("div");
  let profileName = document.createElement("h1");
  profileName.setAttribute('class', 'profile_caption');
  profileName.innerHTML = profile.name;

  let profileLogin = document.createElement("p");
  profileLogin.setAttribute('class', 'profile_login');
  profileLogin.innerHTML= profile.login;

  let title = document.createElement('p');
  title.innerHTML= profile.bio;

  div.appendChild(profileName);
  div.appendChild(profileLogin);
  
  profile_details.appendChild(div);
  userBio.appendChild(title);

  //rendering the follower section
  let container = document.createElement("div");
  container.setAttribute('class', 'following');
  let cover = document.createElement("p");
  cover.setAttribute('class', 'text_grey large_font');
  cover.appendChild(followerIcon);
  let span = document.createElement("span");
  span.innerHTML = profile.followers.totalCount + ' followers';
  cover.appendChild(span);
  container.appendChild(cover);

  let FollowingCover = document.createElement("p");
  FollowingCover.setAttribute('class', 'text_grey large_font');
  FollowingCover.innerHTML = '. ' + profile.following.totalCount + ' followings' + ' .';
  container.appendChild(FollowingCover);

  let starredRepo = document.createElement("p");
  starredRepo.setAttribute('class', 'text_grey large_font');
  starredRepo.appendChild(starredIcon);
  let spanTwo = document.createElement("span");
  spanTwo.innerHTML = profile.starredRepositories.totalCount;
  starredRepo.appendChild(spanTwo);
  container.appendChild(starredRepo);

  follower.appendChild(container);

  //end of follower section

  //rendering the contact section
  let markUpContact = document.createElement("div");
  let list = document.createElement('ul');
  list.setAttribute('class', 'style');
  let listLocation = document.createElement('li');
  listLocation.setAttribute('class', 'hide list-item');
  listLocation.appendChild(UserLocation);
  let listWebUrl = document.createElement('li');
  listWebUrl.setAttribute('class', 'link list-item');
  listWebUrl.appendChild(link);
  let listSocialMedia = document.createElement('li');
  listSocialMedia.setAttribute('class', 'hide list-item');
  listSocialMedia.appendChild(twitter);

  let locationSpan = document.createElement('span');
  let webUrlAnchor = document.createElement('a');
  let socialMediaAnchor = document.createElement('a');

  locationSpan.innerHTML = profile.location;
  let webUrlAnchorNode = document.createTextNode(profile.websiteUrl);
  let socialMediaAnchorNode = document.createTextNode(profile.twitterUsername);

  webUrlAnchor.appendChild(webUrlAnchorNode);
  socialMediaAnchor.appendChild(socialMediaAnchorNode);

  listLocation.appendChild(locationSpan);
  listWebUrl.appendChild(webUrlAnchor);
  listSocialMedia.appendChild(socialMediaAnchor);

  list.appendChild(listLocation);
  list.appendChild(listWebUrl);
  list.appendChild(listSocialMedia);
  markUpContact.appendChild(list);
  contact.appendChild(markUpContact);
}

//handling the repository lists
const RenderingRepoList = (profile)=> {

   //rendering the repository count
   let repoCount = document.createElement('span');
   repoCount.setAttribute('class', 'count-span');
   repoCount.innerHTML = profile.repositories.totalCount;
 
   repototalCount.appendChild(repoCount);
 
  profile.repositories.nodes.map(repo => {
    const repositories = repo;
    let repository = document.createElement("div");
    repository.setAttribute('class', '_repository');
    let repositoriesData = document.createElement("div");
    repositoriesData.setAttribute('class', 'repository-detail-section');
    let repo_casing = document.createElement('div');
    let anchor = document.createElement("a");
    let anchorNode = document.createTextNode(repositories.name);
    anchor.setAttribute('href', '#');
    anchor.setAttribute('class', 'project-title')
    anchor.appendChild(anchorNode);

    let description = document.createElement("p");
    description.setAttribute('class', 'repo_description');
    description.innerHTML = repositories.description;

    let repoBottom = document.createElement('div');
    repoBottom.setAttribute('class', 'repo-language-color');

    let languageColor = document.createElement("span");
    languageColor.setAttribute('class', 'text_grey updated-time border')
    repositories.primaryLanguage === null ? languageColor.style.display = 'none' : languageColor.style.background = repositories.primaryLanguage.color;

    let languageName =document.createElement("p");
    languageName.setAttribute('class', 'text_grey updated-time')
    repositories.primaryLanguage === null ? languageName.style.display = 'none' : languageName.innerHTML = repositories.primaryLanguage.name;

    let div = document.createElement('div');
    div.setAttribute('class', 'star-section')
    let starredGazer = document.createElement('a');
    starredGazer.setAttribute('class', 'text_grey updated-time')
    let textNode = document.createTextNode(repositories.stargazerCount);
    starredGazer.appendChild(textNode);
    let images = document.createElement("img");
    images.setAttribute('src', '/assets/images/star.svg');

    div.appendChild(images);
    div.appendChild(starredGazer);
    
    repositories.stargazerCount === 0 ? starredGazer.style.display = 'none' : starredGazer.innerHTML = repositories.stargazerCount;
    repositories.stargazerCount === 0 ? div.style.display = 'none' : div.classList.add('star-section');

    let licenseContainer = document.createElement('div');
    licenseContainer.setAttribute('class', 'license-section');

    let licenseSpan = document.createElement('span');
    licenseSpan.setAttribute('class', 'text_grey margin');
    let scale = document.createElement('img');
    scale.setAttribute('src', '/assets/images/justice-scale.svg');
    scale.setAttribute('class', 'justice-scale');

    licenseContainer.appendChild(scale);
    licenseContainer.appendChild(licenseSpan);

    repositories.licenseInfo === null ? licenseSpan.style.display = 'none'  : licenseSpan.innerHTML = 'MIT License';
    repositories.licenseInfo === null ? licenseContainer.style.display = 'none' : licenseContainer.classList.add('license-section');
    
    let updated = document.createElement("p");
    updated.setAttribute('class', 'text_grey updated-time margin')
    updated.innerHTML = 'Updated on ' + repositories.updatedAt.slice(0,7);

    repoBottom.appendChild(languageColor);
    repoBottom.appendChild(languageName);
    repoBottom.appendChild(div);
    repoBottom.appendChild(licenseContainer);
    repoBottom.appendChild(updated);

    //star botton section
    let repoStarContainer = document.createElement('div');
    repoStarContainer.setAttribute("class", "repository-star");

    let repoStarBtn = document.createElement('button');
    let btnSpan = document.createElement('img');
    btnSpan.setAttribute('src', '/assets/images/star.svg');
    btnSpan.setAttribute('class', 'star-icon');
    repoStarBtn.appendChild(btnSpan);
    let btnText = document.createElement("span");
    btnText.innerHTML = 'star';
    repoStarBtn.appendChild(btnText)
    repoStarBtn.addEventListener('click', () =>{
      btnText.innerHTML === 'star' ? btnText.innerHTML = 'unstar' : btnText.innerHTML = 'star';
    })
    repoStarContainer.appendChild(repoStarBtn);

    repositoriesData.appendChild(anchor);
    repositoriesData.appendChild(description);
    repositoriesData.appendChild(repoBottom);

    repository.appendChild(repositoriesData);
    repository.appendChild(repoStarContainer);
    
    repo_casing.appendChild(repository);
    repositoryList.appendChild(repo_casing);
  })
}

//Calling the UIControler function
if(mainPage){
  UiContoller()
};
if(hamburger){
  hamburger.addEventListener("click", () => {
    menuList.style.display === "block" ? menuList.style.display = "none" : menuList.style.display = "block";
  })
}
