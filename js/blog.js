const blogDetails =
    document.getElementById("blogDetails");


// Get blog ID from URL

const urlParams =
    new URLSearchParams(window.location.search);

const blogId =
    urlParams.get("id");


// Load blog

async function loadBlog() {

    try {

        const response =
            await fetch("data/blogs.json");

        const jsonBlogs =
            await response.json();


        const savedBlogs =
            JSON.parse(
                localStorage.getItem("myBlogs")
            ) || [];


        // Combine JSON blogs and Local Storage blogs

        const allBlogs = [
            ...jsonBlogs,
            ...savedBlogs
        ];


        // Find selected blog

        const blog =
            allBlogs.find(function(item) {

                return item.id == blogId;

            });


        if (!blog) {

            blogDetails.innerHTML = `
                <h2>Blog not found</h2>
            `;

            return;

        }


        displayBlog(blog);

    }
    catch (error) {

        console.log(
            "Error loading blog:",
            error
        );

        blogDetails.innerHTML = `
            <p>Unable to load blog.</p>
        `;

    }

}


// Display blog

function displayBlog(blog) {

    // Check whether this is a user-created blog

    const savedBlogs =
        JSON.parse(
            localStorage.getItem("myBlogs")
        ) || [];


    const isMyBlog =
        savedBlogs.some(function(item) {

            return item.id == blog.id;

        });


    blogDetails.innerHTML = `

        <div class="single-blog-content">

            <h1>
                ${blog.title}
            </h1>


            <div class="single-blog-info">

                By ${blog.author}
                |
                ${blog.category}
                |
                ❤️ ${blog.likes}

            </div>


            <img
                src="${blog.image}"
                alt="${blog.title}"
                class="single-blog-image"
            >


            <p class="blog-text">

                ${blog.description}

            </p>


            <p class="blog-text">

                This is the full article about
                <strong>${blog.title}</strong>.

                Here you can write the complete
                content of your blog.

                You can share your experiences,
                ideas, knowledge and stories
                with other readers.

            </p>


            <div class="blog-actions">

                <button id="likeBtn">
                    ❤️ Like
                </button>

                ${
                    isMyBlog
                    ?
                    `
                        <a
                            href="create.html?edit=${blog.id}"
                            class="edit-btn"
                        >
                            ✏️ Edit
                        </a>

                        <button
                            id="deleteBtn"
                            class="delete-btn"
                        >
                            🗑️ Delete
                        </button>
                    `
                    :
                    ""
                }

            </div>


            <!-- Comments -->

            <div class="comments-section">

                <h2>
                    Comments
                </h2>


                <div id="commentsList"></div>


                <form id="commentForm">

                    <input
                        type="text"
                        id="commentName"
                        placeholder="Your name"
                        required
                    >


                    <textarea
                        id="commentText"
                        placeholder="Write a comment..."
                        rows="4"
                        required
                    ></textarea>


                    <button type="submit">
                        Post Comment
                    </button>

                </form>

            </div>

        </div>

    `;


    // Like button

    const likeBtn =
    document.getElementById("likeBtn");


likeBtn.addEventListener(
    "click",
    function() {

        // Increase likes

        blog.likes++;


        // If this is user's blog,
        // save the new likes

        let savedBlogs =
            JSON.parse(
                localStorage.getItem("myBlogs")
            ) || [];


        const blogIndex =
            savedBlogs.findIndex(
                function(item) {

                    return item.id == blog.id;

                }
            );


        if (blogIndex !== -1) {

            savedBlogs[blogIndex].likes =
                blog.likes;


            localStorage.setItem(
                "myBlogs",
                JSON.stringify(savedBlogs)
            );

        }


        // Update button

        likeBtn.textContent =
            `❤️ Liked (${blog.likes})`;

    }
);


    // Delete button

    const deleteBtn =
        document.getElementById("deleteBtn");


    if (deleteBtn) {

        deleteBtn.addEventListener(
            "click",
            function() {

                const confirmDelete =
                    confirm(
                        "Are you sure you want to delete this blog?"
                    );


                if (!confirmDelete) {

                    return;

                }


                let blogs =
                    JSON.parse(
                        localStorage.getItem("myBlogs")
                    ) || [];


                blogs =
                    blogs.filter(
                        function(item) {

                            return item.id != blog.id;

                        }
                    );


                localStorage.setItem(
                    "myBlogs",
                    JSON.stringify(blogs)
                );


                alert(
                    "Blog deleted successfully!"
                );


                window.location.href =
                    "blogs.html";

            }
        );

    }


    // Display comments

    displayComments();


    // Comment form

    document
        .getElementById("commentForm")
        .addEventListener(
            "submit",
            addComment
        );

}


// Display comments

function displayComments() {

    const commentsList =
        document.getElementById("commentsList");


    const allComments =
        JSON.parse(
            localStorage.getItem("comments")
        ) || [];


    const blogComments =
        allComments.filter(
            function(comment) {

                return comment.blogId == blogId;

            }
        );


    commentsList.innerHTML = "";


    if (blogComments.length === 0) {

        commentsList.innerHTML = `
            <p class="no-comments">
                No comments yet. Be the first!
            </p>
        `;

        return;

    }


    blogComments.forEach(
        function(comment) {

            const commentBox =
                document.createElement("div");


            commentBox.className =
                "comment";


            commentBox.innerHTML = `

                <strong>
                    ${comment.name}
                </strong>

                <p>
                    ${comment.text}
                </p>

            `;


            commentsList.appendChild(
                commentBox
            );

        }
    );

}


// Add comment

function addComment(event) {

    event.preventDefault();


    const name =
        document
            .getElementById("commentName")
            .value;


    const text =
        document
            .getElementById("commentText")
            .value;


    const newComment = {

        blogId: blogId,

        name: name,

        text: text

    };


    const comments =
        JSON.parse(
            localStorage.getItem("comments")
        ) || [];


    comments.push(newComment);


    localStorage.setItem(
        "comments",
        JSON.stringify(comments)
    );


    document
        .getElementById("commentForm")
        .reset();


    displayComments();

}


// Start

loadBlog();