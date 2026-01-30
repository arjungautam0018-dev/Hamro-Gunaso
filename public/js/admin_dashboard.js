document.addEventListener("DOMContentLoaded", () => {
    const searchForm = document.getElementById("searchForm");
    const searchInput = document.getElementById("searchInput");
    const datasDiv = document.getElementById("datas");

    // Handle form submit
    searchForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        let input = searchInput.value.trim();
        if (!input) return;

        // Extract ObjectId if a URL is given
        let objectId = input;
        try {
            const urlParts = new URL(input);
            const pathParts = urlParts.pathname.split("/");
            objectId = pathParts[pathParts.length - 1];
        } catch(err){
            // input may already be objectId, ignore
        }

        // Fetch gunaso
        try {
            const res = await fetch(`/api/gunaso/${objectId}`);
            if (!res.ok) throw new Error("Gunaso not found");

            const data = await res.json();
            datasDiv.innerHTML = ""; // clear previous

            const card = createGunasoCard(data);
            datasDiv.appendChild(card);
            attachDeleteHandler(data._id, card);
            attachLikeHandler(data._id);
            attachShareHandler(data._id);
            loadComments(data._id);

        } catch(err) {
            datasDiv.innerHTML = `<p style="color:red;">Error: ${err.message}</p>`;
        }
    });

    // ===================== CARD CREATION =====================
    function createGunasoCard(item){
        const wrapper = document.createElement("div");
        wrapper.className = "gunaso-card";

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

<button 
  class="buttons-crud delete-btn" 
  data-id="${item._id}" 
  title="Delete Gunaso"
>
  🗑️ Delete
</button>


                            </div>
                        </div>
                    </div>
                    `
        return wrapper;
    }

    function renderImages(files = []) {
        if (!files || !Array.isArray(files)) return "";
        return files.map(f => `<img src="/${f.path}" style="max-width:100px;margin:5px;">`).join("");
    }

    // ===================== LIKE HANDLER =====================
    function attachLikeHandler(gunasoId){
        const btn = document.querySelector(`.like-btn[data-id="${gunasoId}"]`);
        const countSpan = document.getElementById(`like-count-${gunasoId}`);
        if(!btn) return;

        btn.addEventListener("click", async () => {
            try {
                const res = await fetch(`/api/gunaso/${gunasoId}/like`, { method:"POST" });
                if(!res.ok) throw new Error("Like failed");
                const data = await res.json();
                if(data.totalLikes !== undefined) countSpan.textContent = data.totalLikes;
            } catch(err){
                console.error(err);
            }
        });
    }

    // ===================== SHARE HANDLER =====================
    function attachShareHandler(gunasoId){
        const btn = document.querySelector(`.share-btn[data-id="${gunasoId}"]`);
        if(!btn) return;
        btn.addEventListener("click", async () => {
            try {
                await navigator.clipboard.writeText(`${window.location.origin}/gunaso/${gunasoId}`);
                alert("Link copied!");
            } catch(err){
                console.error(err);
                alert("Failed to copy link");
            }
        });
    }

    // ===================== LOAD COMMENTS =====================
    async function loadComments(gunasoId){
        try {
            const res = await fetch(`/api/gunaso/${gunasoId}/comments`);
            if(!res.ok) return;
            const comments = await res.json();

            const container = document.getElementById("comment-container");
            container.innerHTML = "";

            comments.forEach(c => {
                const div = document.createElement("div");
                div.innerHTML = `<strong>${c.userId?.display_name || "Anonymous"}</strong>: ${c.commentText}`;
                container.appendChild(div);
            });

        } catch(err) {
            console.error(err);
        }
    }
});

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


function attachDeleteHandler(gunasoId, cardElement){
    const btn = cardElement.querySelector(`.delete-btn`);
    if(!btn) return;
    btn.addEventListener("click", async () => {
        const ok = confirm("Are you sure you want to delete this Gunaso?");
        if(!ok) return;
        try {
            const res = await fetch(`/api/gunaso/${gunasoId}`, {method: "DELETE"});
            if(!res.ok) {
                throw new Error("Delete failed");
            }
            else{
                cardElement.remove();
            }
        } catch (error) {
            alert("Error deleting Gunaso: " + error.message);
            console.log(error);
        };
    });
};

