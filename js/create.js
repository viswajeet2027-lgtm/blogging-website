const blogForm =
    document.getElementById("blogForm");

const message =
    document.getElementById("message");


// Check if we are editing a blog

const urlParams =
    new URLSearchParams(window.location.search);

const editId =
    urlParams.get("edit");


// Form elements

const titleInput =
    document.getElementById("title");

const authorInput =
    document.getElementById("author");

const categoryInput =
    document.getElementById("category");

const imageInput =
    document.getElementById("image");

const descriptionInput =
    document.getElementById("description");


// If editing, load the blog

if (editId) {

    const savedBlogs =
        JSON.parse(
            localStorage.getItem("myBlogs")
        ) || [];


    const blog =
        savedBlogs.find(
            function(item) {

                return item.id == editId;

            }
        );


    if (blog) {

        titleInput.value =
            blog.title;

        authorInput.value =
            blog.author;

        categoryInput.value =
            blog.category;

        imageInput.value =
            blog.image;

        descriptionInput.value =
            blog.description;


        document.querySelector(
            ".create-container h1"
        ).textContent =
            "Edit Your Blog";


        document.querySelector(
            ".publish-btn"
        ).textContent =
            "Update Blog";

    }

}


// Form submit

blogForm.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();


        const title =
            titleInput.value;

        const author =
            authorInput.value;

        const category =
            categoryInput.value;

        const image =
            imageInput.value;

        const description =
            descriptionInput.value;


        let savedBlogs =
            JSON.parse(
                localStorage.getItem("myBlogs")
            ) || [];


        // EDIT BLOG

        if (editId) {

            savedBlogs =
                savedBlogs.map(
                    function(blog) {

                        if (
                            blog.id == editId
                        ) {

                            return {

                                id: blog.id,

                                title: title,

                                author: author,

                                category: category,

                                image: image,

                                description: description,

                                likes: blog.likes

                            };

                        }


                        return blog;

                    }
                );


            localStorage.setItem(
                "myBlogs",
                JSON.stringify(savedBlogs)
            );


            message.textContent =
                "Blog updated successfully! 🎉";

            message.className =
                "success-message";


            setTimeout(
                function() {

                    window.location.href =
                        `blog.html?id=${editId}`;

                },
                1000
            );


            return;

        }


        // CREATE NEW BLOG

        const newBlog = {

            id: Date.now(),

            title: title,

            author: author,

            category: category,

            image: image,

            description: description,

            likes: 0

        };


        savedBlogs.push(newBlog);


        localStorage.setItem(
            "myBlogs",
            JSON.stringify(savedBlogs)
        );


        message.textContent =
            "Blog published successfully! 🎉";

        message.className =
            "success-message";


        blogForm.reset();

    }
);