
function addImageOverlays() {
    const containers = document.querySelectorAll(".images-show");
    
    containers.forEach(container => {
        const images = Array.from(container.querySelectorAll("img"));
        const maxVisible = 2;
        
        images.forEach((img, index) => {
            if (index >= maxVisible) img.style.display = "none";
        });

        if (images.length > maxVisible) {
            const lastVisible = images[maxVisible - 1];
            
            const wrapper = document.createElement("div");
            wrapper.style.position = "relative";
            wrapper.style.display = "inline-block"; // ensure inline layout
            lastVisible.parentNode.replaceChild(wrapper, lastVisible);
            wrapper.appendChild(lastVisible);

            const overlay = document.createElement("div");
            overlay.className = "more-overlay";
            overlay.textContent = `+${images.length - maxVisible}`;
            wrapper.appendChild(overlay);
        }
    });
}

// Call after DOM content loaded or after adding cards
document.addEventListener("DOMContentLoaded", () => {
    addImageOverlays();
});



document.addEventListener("DOMContentLoaded", ()=> {
    loadGunaso();
});
async function loadGunaso(){
    try {
        const res = await fetch("/gunaso");
        const data = await res.json();
        
        const container = document.getElementById("datas");
        container.innerHTML = "";
        
        data.forEach(item => {
            container.appendChild(createGunasoCard(item));
            addImageOverlays();
            attachShareHandler(item._id);
        });
        
        
    } catch (error) {
        console.error("Failed to load gunaso", error);
    }
}
function createGunasoCard(item) {
    const wrapper = document.createElement("div");
    wrapper.className = "firstdata";
    wrapper.dataset.id = item._id;
    
    wrapper.innerHTML = `
    <div class="first-data">
    <div class="data1">
    <div class="first-part">
    <div class="left-part">
    <div class="pp">
    <span class="profile-pic">👤</span>
    </div>
    <div class="other-inf-pp">
    <span class="anonymous-spec-1 other-inf-pp-2">Anonymous User</span>
    <span class="time-spec-1  other-inf-pp-2">${timeAgo(item.createdAt)}</span>
    </div>
    </div>
    
    </div>
    <div class="right-part">
    <!-- svg -->
    <?xml version="1.0" encoding="utf-8"?><svg version="1.1" id="Layer_1"
    xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
    x="0px" y="0px" viewBox="0 0 122.88 68.04"
                                    style="enable-background:new 0 0 122.88 68.04" xml:space="preserve">
                                    <g>
                                    <path fill="white"
                                    d="M2.03,56.52c-2.66,2.58-2.72,6.83-0.13,9.49c2.58,2.66,6.83,2.72,9.49,0.13l27.65-26.98l23.12,22.31 c2.67,2.57,6.92,2.49,9.49-0.18l37.77-38.22v19.27c0,3.72,3.01,6.73,6.73,6.73s6.73-3.01,6.73-6.73V6.71h-0.02 c0-1.74-0.67-3.47-2-4.78c-1.41-1.39-3.29-2.03-5.13-1.91H82.4c-3.72,0-6.73,3.01-6.73,6.73c0,3.72,3.01,6.73,6.73,6.73h17.63 L66.7,47.2L43.67,24.97c-2.6-2.5-6.73-2.51-9.33,0.03L2.03,56.52L2.03,56.52z" />
                                    </g>
                                    </svg>
                                    
                                    <span class="trend-or-not">Trending</span>
                                    </div>
                                    
                                    </div>
                                    <!-- SHOW CATEGORY -->
                                    <div class="after-cate">
                                    
                                    
                                    <div class="category">
                                    <span class="category-1">${item.category || "General"}</span>
                            </div>
                            <!-- SHOW DESCRIPTION -->
                            <div class="description1">
                                <p class="descp-1">${item.description || ""}</p>
                                <button class="toggle" >Show more</button>
                            </div>

                            <div class="images-show">
                            ${renderImages(item.files)}
                            
                            </div>
                            <div class="divider2"></div>
                        </div>
                        <div class="like-cmt">
                            <div class="like-cmt-left">

                            
                                <!-- Like -->
                                <button class="buttons-crud like-btn like-btn-1" data-id="${item._id}">
                                    <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
                                    viewBox="0 0 24 24">
                                    <path fill-rule="evenodd" fill="crimson"
                                    d="M15.03 9.684h3.965c.322 0 .64.08.925.232.286.153.532.374.717.645a2.109 2.109 0 0 1 .242 1.883l-2.36 7.201c-.288.814-.48 1.355-1.884 1.355-2.072 0-4.276-.677-6.157-1.256-.472-.145-.924-.284-1.348-.404h-.115V9.478a25.485 25.485 0 0 0 4.238-5.514 1.8 1.8 0 0 1 .901-.83 1.74 1.74 0 0 1 1.21-.048c.396.13.736.397.96.757.225.36.32.788.269 1.211l-1.562 4.63ZM4.177 10H7v8a2 2 0 1 1-4 0v-6.823C3 10.527 3.527 10 4.176 10Z"
                                    clip-rule="evenodd" />
                                    </svg>
                                    <span id="like-count-${item._id}" > ${item.likeCount || 0}</span>
                                    </button>
                                <!-- comment -->
                                <button class="buttons-crud like-btn like-btn-2">
                                <img src="/elements/chat.png" alt="" class="comment-box-img">
                                <span>${item.commentCount || 0} </span>
                                </button>
                                </div>
                                <div class="like-cmt-right like-btn-3">
                                <button class="buttons-crud like-cmt-right-item like-btn share-btn-1">
                                <svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 3791 3729"
                                shape-rendering="geometricPrecision" text-rendering="geometricPrecision"
                                image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd">
                                <path
                                d="M713 1152c197 0 375 80 504 209 29 29 56 61 80 95l1125-468c-36-85-55-178-55-275 0-197 80-375 209-504S2883 0 3080 0s375 80 504 209 209 307 209 504-80 375-209 504-307 209-504 209-375-80-504-209c-22-22-43-46-62-71l-1132 471c29 77 45 161 45 248 0 54-6 106-17 157l1131 530c11-13 23-26 36-39 129-129 307-209 504-209s375 80 504 209 209 307 209 504-80 375-209 504-307 209-504 209-375-80-504-209-209-307-209-504c0-112 26-219 73-313l-1092-512c-34 66-78 126-130 177-129 129-307 209-504 209s-375-80-504-209S2 2062 2 1865s80-375 209-504 307-209 504-209zm2742-815c-96-96-229-156-376-156s-280 60-376 156-156 229-156 376 60 280 156 376 229 156 376 156 280-60 376-156 156-229 156-376-60-280-156-376zm0 2303c-96-96-229-156-376-156s-280 60-376 156-156 229-156 376 60 280 156 376 229 156 376 156 280-60 376-156 156-229 156-376-60-280-156-376zM1089 1488c-96-96-229-156-376-156s-280 60-376 156-156 229-156 376 60 280 156 376 229 156 376 156 280-60 376-156 156-229 156-376-60-280-156-376z"
                                fill-rule="nonzero" />
                                </svg>
                                <span>Share</span>
                                </button>
                                </div>
                                </div>
                                </div>
                                
                                `;
                                
                                // Navigate on card click
                                wrapper.addEventListener("click", () => {
                                    window.location.href = `/gunaso/${item._id}`;
                                });
                                
                                // Prevent inner buttons from navigating
                                wrapper.querySelectorAll("button").forEach(btn => {
                                    btn.addEventListener("click", e => e.stopPropagation());
                                });
                                
                                return wrapper;
                            }
                            
                            
                            function renderImages(files = []){
                                if (!Array.isArray(files) || files.length === 0) return "";
                                
                                return files.slice(0, 6).map(file => `
                                    <img src="/${file.path}" class="model-image">
                                    `).join("");
                                }
                                

function timeAgo(date){
    if (!date) return "Just now";

    const seconds = Math.floor(
        (Date.now() - new Date(date)) / 1000
    );

    const map = {
        year: 31536000,
        month: 2592000,
        day: 86400,
        hour: 3600,
        minute: 60
    };
    
    for (let key in map){
        const value = Math.floor(seconds / map[key]);
        if (value >= 1){
            return `${value} ${key}${value > 1 ? "s" : ""} ago`;
        }
    }
    return "Just now";
}



document.addEventListener("click", async (e) => {
    const btn = e.target.closest(".like-btn-1");
    if (!btn) return;

    const gunasoId = btn.dataset.id;
    const countSpan = document.getElementById(`like-count-${gunasoId}`);
    
    try {
        const res = await fetch(`/gunaso/${gunasoId}/like`, {
            method: "POST"
        });
        
        const data = await res.json();
        let count = parseInt(countSpan.innerText);
        
        if (data.like) {
            countSpan.innerText = count + 1;
            btn.classList.add("liked");
        } else {
            countSpan.innerText = count - 1;
            btn.classList.remove("liked");
        }
        
    } catch (err) {
        console.error("Like failed", err);
    }
});

document.addEventListener("click", e => {
    if (e.target.classList.contains("toggle")) {
        e.stopPropagation();
        const p = e.target.previousElementSibling;
        p.classList.toggle("expanded");

        e.target.textContent = p.classList.contains("expanded")
            ? "Show less"
            : "Show more";
    }
});

function attachShareHandler(gunasoId){
    const shareBtn = document.querySelector(".share-btn-1");
    if(!shareBtn) return;
    shareBtn.addEventListener("click", async()=>{
        const link = `${window.location.origin}/gunaso/${gunasoId}`;
        try {
            await navigator.clipboard.writeText(link);
            alert("Link copied to clipboard!");
        } catch (error) {
            console.log("Failed to copy link:", error);
            alert("Failed to copy link.");
        }
    })
}