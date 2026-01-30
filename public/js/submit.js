const fileInput = document.querySelector(".upload-files-place");
const fileListContainer = document.querySelector(".file-list");

let selected_files = [];

fileInput.addEventListener("change", () => {
    selected_files = Array.from(fileInput.files);
    renderFiles();
});

function renderFiles() {
    fileListContainer.innerHTML = "";

    if (selected_files.length === 0) {
        fileListContainer.textContent = "No files selected!";
        return;
    }

    selected_files.forEach((file, index) => {
        const fileItem = document.createElement("div");

        // container styling (no class changed)
        fileItem.style.position = "relative";
        fileItem.style.display = "inline-block";
        fileItem.style.width = "120px";
        fileItem.style.margin = "8px";
        fileItem.style.border = "1px solid #ddd";
        fileItem.style.borderRadius = "10px";
        fileItem.style.padding = "6px";
        fileItem.style.textAlign = "center";
        fileItem.style.background = "#fafafa";

        // ❌ remove button
        const removeBtn = document.createElement("button");
        removeBtn.textContent = "×";
        removeBtn.style.position = "absolute";
        removeBtn.style.top = "-6px";
        removeBtn.style.right = "-6px";
        removeBtn.style.width = "22px";
        removeBtn.style.height = "22px";
        removeBtn.style.borderRadius = "50%";
        removeBtn.style.border = "none";
        removeBtn.style.background = "crimson";
        removeBtn.style.color = "white";
        removeBtn.style.cursor = "pointer";
        removeBtn.style.fontWeight = "bold";

        removeBtn.addEventListener("click", () => {
            selected_files.splice(index, 1);
            renderFiles();
        });

        // thumbnail
        if (file.type.startsWith("image/")) {
            const img = document.createElement("img");
            img.src = URL.createObjectURL(file);
            img.style.width = "100%";
            img.style.height = "80px";
            img.style.objectFit = "cover";
            img.style.borderRadius = "6px";
            fileItem.appendChild(img);
        } 
        else if (file.type.startsWith("video/")) {
            const video = document.createElement("video");
            video.src = URL.createObjectURL(file);
            video.style.width = "100%";
            video.style.height = "80px";
            video.style.objectFit = "cover";
            video.muted = true;
            fileItem.appendChild(video);
        }

        // filename span (keeps your idea)
        const fileName = document.createElement("span");
        fileName.textContent = file.name;
        fileName.style.display = "block";
        fileName.style.fontSize = "12px";
        fileName.style.marginTop = "6px";
        fileName.style.wordBreak = "break-all";

        fileItem.appendChild(removeBtn);
        fileItem.appendChild(fileName);
        fileListContainer.appendChild(fileItem);
    });
}
const buttons = document.querySelectorAll(".selecting-category-btn");
buttons.forEach(btn=> {
    btn.addEventListener("click", ()=> {
        buttons.forEach(b=> b.classList.remove("active"))
        btn.classList.add("active")
    })
});

const buttons_value = document.querySelectorAll(".selecting-category-btn");
const hiddenInput = document.getElementById("categoryInput");
buttons_value.forEach(btn=> {
    btn.addEventListener("click" ,()=> {
        hiddenInput.value = btn.value;

        
    })
})

