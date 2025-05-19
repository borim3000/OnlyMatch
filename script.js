console.log('big baba console nachricht')

const loadingContainer = document.getElementById("loadingContainer");
const loadingBar = document.getElementById("loadingBar");
const profile = document.getElementById("profile");
const matchImage = document.getElementById("matchImage");
const matchName = document.getElementById("matchName");
const button1 = document.getElementById("getMatchBtn");
const inputFields = document.getElementById("inputFields");
const inputs = [
    document.getElementById("inputAge"),
    document.getElementById("inputEyes"),
    document.getElementById("inputFood"),
    document.getElementById("inputEmail"),
    ];
const button2 = document.getElementById('GoAgainBtn');
const matchFound = document.getElementById('matchFound');


async function getYourMatch() {

    //all text fields must  have input
    const allFilled = inputs.every(input => input.value.trim() !== "");

    if (!allFilled) {
        alert("Please enter the required Info! Our Algorithm needs to know something about you to find your perfect Match.");
        return;
    }

    //hide button
    button1.style.display = "none";

    //reset UI before loading
    matchImage.style.opacity = 0;
    profile.hidden = true;
    loadingBar.style.width = "0%";
    loadingBar.style.display = "block";

    inputFields.style.display = "none";

    //loading bar animation

    loadingContainer.classList.add("active");

    requestAnimationFrame(() => {
        loadingBar.style.width = "100%";
    });

    try {
        const response = await fetch('https://randomuser.me/api');
        const data = await response.json();
        const user = data.results[0];

        //delay simulation
        await new Promise((resolve) => setTimeout(resolve, 4500));

        matchImage.src = user.picture.large;
        matchImage.onload = () => {
            matchImage.style.opacity = 1;
        };
        matchName.textContent = `${user.name.first} ${user.name.last}`;
        matchName.classList.add("visible");

        //show profile
        profile.hidden = false;
    } catch (error) {
        matchName.textContent = "Failed to load Match";
        console.error("Error fetching Match:", error);

    } finally {

        //hide loading bar
        loadingContainer.classList.remove("active");
        loadingBar.style.display = "none";
        loadingBar.style.width = "0%";

        matchFound.classList.add("visible");

        await new Promise((resolve) => setTimeout(resolve, 2000));
        button2.classList.add("visible");
    }
}


document.getElementById('getMatchBtn').addEventListener('click', getYourMatch);

