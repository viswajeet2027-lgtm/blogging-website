// =============================
// DARK MODE
// =============================

const themeBtn = document.getElementById("themeBtn");

if (themeBtn) {

    const savedTheme =
        localStorage.getItem("theme");

    if (savedTheme === "dark") {
        document.body.classList.add("dark");
        themeBtn.textContent = "☀️";
    }

    themeBtn.addEventListener(
        "click",
        function () {

            document.body.classList.toggle("dark");

            if (
                document.body.classList.contains("dark")
            ) {

                localStorage.setItem(
                    "theme",
                    "dark"
                );

                themeBtn.textContent = "☀️";

            } else {

                localStorage.setItem(
                    "theme",
                    "light"
                );

                themeBtn.textContent = "🌙";

            }

        }
    );
}


// =============================
// HOMEPAGE BLOGS
// =============================

// Only run this code if we are on
// the homepage.

const blogContainer =
    document.getElementById("blogContainer");


if (blogContainer) {

    async function loadHomeBlogs() {

        try {

            const response =
                await fetch("data/blogs.json");


            const jsonBlogs =
                await response.json();


            const savedBlogs =
                JSON.parse(
                    localStorage.getItem("myBlogs")
                ) || [];


            const allBlogs = [
                ...jsonBlogs,
                ...savedBlogs
            ];


            displayHomeBlogs(
                allBlogs.slice(-6).reverse()
            );

        }
        catch (error) {

            console.error(
                "Homepage blog error:",
                error
            );

            blogContainer.innerHTML =
                "<p>Unable to load blogs.</p>";

        }

    }


    function displayHomeBlogs(blogs) {

        blogContainer.innerHTML = "";


        blogs.forEach(function(blog) {

            const blogCard =
                document.createElement("div");


            blogCard.className =
                "blog-card";


            blogCard.innerHTML = `

                <img
                    src="${blog.image}"
                    alt="${blog.title}"
                >

                <div class="blog-content">

                    <h3>
                        ${blog.title}
                    </h3>

                    <p>
                        ${blog.description}
                    </p>

                    <div class="blog-info">

                        By ${blog.author}
                        |
                        ${blog.category}
                        |
                        ❤️ ${blog.likes}

                    </div>

                    <br>

                    <a
                        href="blog.html?id=${blog.id}"
                        class="read-btn"
                    >
                        Read More →
                    </a>

                </div>

            `;


            blogContainer.appendChild(
                blogCard
            );

        });

    }


    loadHomeBlogs();

}