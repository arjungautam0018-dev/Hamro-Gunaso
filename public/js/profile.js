function toggleMenu(){
    document.querySelector(".quickies").classList.toggle("show");
}
document.addEventListener("DOMContentLoaded", ()=>{
    load_data();
    load_gunaso();
});
async function load_data(){
    try {
        const res = await fetch("/api/data", {
            method:"POST",
            credentials:"include"
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
//Load specific gunaso
async function load_gunaso(){
    try {
        const res = await fetch("/api/user/gunaso",{
            method:"GET",
            credentials:"include"
        });
        const data = await res.json();
                

        
            const item = data.gunasos || [];
            console.log("Gunaso data:", item);
            showgunaso(item);
        

    } catch (error) {
        console.error(error);
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
function showgunaso(items){
    console.log("Gunaso data:", items);
    const wrapper = document.querySelector(".gunaso-card");

    if(items.length === 0){
        wrapper.innerHTML = `<p class="no-gunaso">No gunaso submitted yet.</p>`;
        return;
    }

const gunasoHTML = items.map(gunaso => `
    <div class="gunaso-item" data-id="${gunaso.id}">
        
        <div class="gunaso-content">
            <div class="gunaso-title">${gunaso.description}</div>
            <div class="gunaso-date">${new Date(gunaso.createdAt).toLocaleString()}</div>
        </div>

        <button class="delete-btn" data-id="${gunaso.id}">
            Delete
        </button>

    </div>
`).join("");

    wrapper.innerHTML = `
        <div class="gunaso-header">
            <h3>My Gunaso</h3>
            <span class="gunaso-count">${items.length}</span>
        </div>
        ${gunasoHTML}
    `;

    attachDeleteEvents();
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

document.addEventListener("click", (e)=>{
    const card = e.target.closest(".gunaso-item");
    if(!card) return;
    const id = card.dataset.id;
    window.location.href = `/gunaso/${id}`;

});


//Delete gunaso
async function attachDeleteEvents(){
    document.querySelectorAll(".delete-btn").forEach(btn=>{
        btn.addEventListener("click", async(e)=>{
            e.stopPropagation();
            const id = btn.dataset.id;
            const ok = confirm("Are you sure you want to delete this Gunaso?");
            if(!ok) return;
            try {
                const res = await fetch(`/api/gunaso/${id}`, {method:"DELETE"});
                if(!res.ok){
                    throw new Error("Failed to delete gunaso");
                }
                else{
                    load_gunaso();
                }

            } catch (error) {
                            alert("Error deleting Gunaso: " + error.message);

                console.error(error);
            }
        })
    })
}