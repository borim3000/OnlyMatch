console.log('big baba console nachricht')

const loadingContainer = document.getElementById("loadingContainer");
const loadingBar = document.getElementById("loadingBar");
const profile = document.getElementById("profile");
const matchImage = document.getElementById("matchImage");
const matchName = document.getElementById("matchName");
const button1 = document.getElementById("getMatchBtn");
const inputFields = document.getElementById("inputFields");
const inputs = Array.from(document.querySelectorAll('#inputFields input'));
const button2 = document.getElementById('GoAgainBtn');
const matchFound = document.getElementById('matchFound');
const button3 = document.getElementById('contactBtn');
const popup = document.getElementById('contactPopup');
const closeBtn = document.getElementById('closePopup');



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
        
            matchImage.addEventListener("transitionend", () => {
                matchName.textContent = `${user.name.first} ${user.name.last}`;
                matchName.classList.add("visible");
            }, { once: true }); //run only once
        };

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
        button3.classList.add("visible");

        await new Promise((resolve) => setTimeout(resolve, 1500));
        button2.classList.add("visible");
    }
}

document.getElementById('getMatchBtn').addEventListener('click', getYourMatch);

//popup at the end

button3.addEventListener('click', () => {
    popup.hidden = false;
});

closeBtn.addEventListener('click', () => {
    popup.hidden = true;
});

//save entered data (age etc) in local storage so user doesn't have to enter it again
window.addEventListener('DOMContentLoaded', () => {
    inputs.forEach(input => {
        const savedValue = localStorage.getItem(input.id);
        if (savedValue) {
            input.value = savedValue;
        }
    });
});

inputs.forEach(input => {
    input.addEventListener('input', () => {
        localStorage.setItem(input.id, input.value);
    });
});

//console log for debug

console.log('popup:', popup);
console.log('closeBtn:', closeBtn);
