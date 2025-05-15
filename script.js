console.log('big baba console nachricht')

const loadingBar = document.getElementById("loadingBar");
const profile = document.getElementById("profile");
const matchImage = document.getElementById("matchImage");
const matchName = document.getElementById("matchName");
const button = document.getElementById("getMatchBtn");

async function getYourMatch() {
    //hide button
    button.style.display = "none";

    //reset UI before loading
    matchImage.style.opacity = 0;
    matchName.style.opacity = 0;
    profile.hidden = true;
    loadingBar.style.width = "0%";
    loadingBar.style.display = "block";

    //loading bar animation

    requestAnimationFrame(() => {
        loadingBar.style.width = "100%";
    });

    try {
        const response = await fetch('https://randomuser.me/api');
        const data = await response.json();
        const user = data.results[0];

        //delay simulation
        await new Promise((resolve) => setTimeout(resolve, 2300));

        matchImage.src = user.picture.large;
        matchImage.onload = () => {
            matchImage.style.opacity = 1;
        };
        matchName.textContent = `${user.name.first} ${user.name.last}`;
        matchName.style.opacity = 1;

        //show profile
        profile.hidden = false;
    } catch (error) {
        matchName.textContent = "Failed to load Match";
        console.error("Error fetching Match:", error);
    } finally {
        //hide loading bar
        loadingBar.style.display = "none";
        loadingBar.style.width = "0%";
    }
}


document.getElementById('getMatchBtn').addEventListener('click', getYourMatch);

