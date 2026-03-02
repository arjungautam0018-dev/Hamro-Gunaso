function toggleMenu(){
    document.querySelector(".quickies").classList.toggle("show");
}

async function getUserId() {
    try {
        const res = await fetch("/api/session", { credentials: "same-origin" });
        const data = await res.json();

        if (!data.loggedIn) {
            console.log("User not logged in");
            return null;
        }

        const userId = data.user.id; // <-- this is your user ID
        console.log("User ID:", userId);

        return userId;

    } catch (err) {
        console.error("Error getting session:", err);
        return null;
    }
}

// Example usage
document.addEventListener("DOMContentLoaded", async () => {
    const userId = await getUserId();
    if (userId) {
        // do something with the ID, e.g., fetch user-specific data
        console.log("We can now use this ID in frontend:", userId);
    }
});