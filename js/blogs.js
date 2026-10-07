const allBlogContainer =
    document.getElementById("allBlogContainer");

const searchInput =
    document.getElementById("searchInput");

const categoryFilter =
    document.getElementById("categoryFilter");


let blogs = [];


// =============================
// LOAD BLOGS
// =============================

async function loadBlogs() {

    try {

        const response =
            await fetch("data/blogs.json");


        if (!response.ok) {

            throw new Error(
                "Unable to load blogs.json"
            );

        }


        const jsonBlogs =
            await response.json();


        // Get user-created blogs

        const savedBlogs =
            JSON.parse(
                localStorage.getItem("myBlogs")
            ) || [];


        // Combine both sources

        blogs = [
            ...jsonBlogs,
            ...savedBlogs
        ];


        console.log(
            "Blogs loaded:",
            blogs
        );


        displayBlogs(blogs);

    }
    catch (error) {

        console.error(
            "Error loading blogs:",
            error
        );


        allBlogContainer.innerHTML = `
            <p class="no-results">
                Unable to load blogs.
            </p>
        `;

    }

}


// =============================
// DISPLAY BLOGS
// =============================

function displayBlogs(blogList) {

    allBlogContainer.innerHTML = "";


    if (blogList.length === 0) {

        allBlogContainer.innerHTML = `
            <p class="no-results">
                No blogs found.
            </p>
        `;

        return;

    }


    blogList.forEach(function(blog) {

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


        allBlogContainer.appendChild(
            blogCard
        );

    });

}


// =============================
// SEARCH
// =============================

searchInput.addEventListener(
    "input",
    filterBlogs
);


// =============================
// CATEGORY FILTER
// =============================

categoryFilter.addEventListener(
    "change",
    filterBlogs
);


// =============================
// FILTER BLOGS
// =============================

function filterBlogs() {

    const searchText =
        searchInput.value
            .toLowerCase()
            .trim();


    const selectedCategory =
        categoryFilter.value;


    const filteredBlogs =
        blogs.filter(function(blog) {

            const matchesSearch =
                blog.title
                    .toLowerCase()
                    .includes(searchText);


            const matchesCategory =
                selectedCategory === "all" ||
                blog.category === selectedCategory;


            return (
                matchesSearch &&
                matchesCategory
            );

        });


    displayBlogs(filteredBlogs);

}


// =============================
// START
// =============================

loadBlogs();