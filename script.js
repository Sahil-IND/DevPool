document.addEventListener("DOMContentLoaded", function () {
  const img = document.querySelector(".images");
  const sapn = document.querySelector(".spann");
  const doc = document.querySelector(".wrapper");
  const searchForm = document.querySelector(".search");
  const searchInput = document.querySelector("#search");
  const searchFormA = document.querySelector("#search-form");
  const btnSearch = document.querySelector(".btn-search");
  const profileContainer = document.querySelector(".profile-container");
  const profileName = document.querySelector("h2");
  const profileImage = document.querySelector(".profile_image");
  const dateJoined = document.querySelector(".date-joined");
  const url = document.querySelector("#url");
  const bio = document.querySelector("#bio");
  const rep = document.querySelector("#rep");
  const followers = document.querySelector("#followers");
  const following = document.querySelector("#following");
  const location = document.querySelector(".location");
  const webLink = document.querySelector(".web-link");
  const twitter = document.querySelector(".twitter");
  const company = document.querySelector(".company");

  console.log("script Loaded");

  img.addEventListener("click", () => {
    if (sapn.innerText === "DARK") {
      doc.classList.add("dark");
      searchForm.classList.add("dark");
      profileContainer.classList.add("dark");
      sapn.textContent = "LIGHT";
      img.src = "./assets/images/sun-icon.svg";
    } else if (sapn.innerText === "LIGHT") {
      doc.classList.remove("dark");
      searchForm.classList.remove("dark");
      profileContainer.classList.remove("dark");
      sapn.textContent = "DARK";
      img.src = "./assets/images/moon-icon.svg";
    }
  });

  
  async function fetchApi(user) {
    try {
      const response = await fetch(`https://api.github.com/users/${user}`);
      if (!response.ok) {
        throw new Error("User Not Found");
      }
      const data = await response.json();
      console.log("GitHub API response:", data); // Debugging log
      renderGithub(data);
    } catch (e) {
      console.log(e.message);
    }
  }



    function renderGithub(data) {
        profileName.innerText = data?.login;
        const daate = formatJoinedDate(data?.created_at);
        dateJoined.innerText = daate;
        url.innerText = `@${data?.name}`;
        url.href = data?.html_url;
        bio.innerText = data?.bio;
        rep.innerText = data?.public_repos;
        followers.innerText = data?.followers;
        following.innerText = data?.following;
        company.innerText = data?.company;
        twitter.innerText = data?.twitter_username;
        location.innerText = data?.location;
        webLink.innerText = data?.blog;
        profileImage.src = data?.avatar_url;
        // countryIcon.src = `https://flagcdn.com/144x108/${weatherInfo?.sys?.country.toLowerCase()}.png`;
    }

    function formatJoinedDate(dateString) {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0'); // Ensures two-digit day
        const month = date.toLocaleString('en-US', { month: 'long' }); // Full month name
        const year = date.getFullYear();
        
        return `Joined ${day} ${month} ${year}`;
    }
    
    const formattedDate = formatJoinedDate("2021-09-12T18:05:04Z");
    console.log(formattedDate); // Output: "Joined 12 September 2021"


    searchFormA.addEventListener("submit", (e) => {
        e.preventDefault();
        let user = searchInput.value;
        fetchApi(user);
    });

});
