function toggleMenu(){
    document.querySelector(".quickies").classList.toggle("show");
}
document.addEventListener("DOMContentLoaded", ()=>{
    load_data();
});
async function load_data(){
    try {
        const res = await fetch("/api/data", {
            method:"POST",
        });
        const data = await res.json();
        if(data.loggedIn){
            const item = data.user;
            createProfile(item);
        }
        else{
            console.log("User not logged in");
            window.location.href = "/login";
        }

    } catch (error) {
        console.log(error);
    }
}

function createProfile(item){
    const wrapper = document.querySelector(".profile-card");
    wrapper.innerHTML = `
            <div>
            <h2 class="profile-name" id="username">${item.full_name}</h2>
            <p class="profile-handle">${item.display_name} • ${item.email}</p>
        </div>

        <button class="logout-btn">Logout</button>
    `
}

document.addEventListener("click", async(e)=>{
    if(e.target.classList.contains("logout-btn")){
        try {
            const res = await fetch("/logout", {
                method:"POST"
            });
            const data = await res.json();
            if(data.message === "Logout successful"){
                window.location.href = "/login";
            }

        } catch (error) {
            console.error(error);
        }
    }
});

