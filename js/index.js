const fetchAllBookTitles = () => {
    return fetch("http://localhost:3000/books")
    .then(resp => resp.json())
    .then(bookArr => {
        console.log(bookArr);
        const ulElement = document.getElementById('list');
        bookArr.forEach(book => {
            const li = document.createElement('li');
            li.textContent = book.title;
            li.addEventListener('click', () =>{
                const showPanel = document.getElementById('show-panel');
                const title = document.createElement('h4');
                const subtitle = document.createElement('h4');
                const author = document.createElement('h4');
                const img = document.createElement('img');
                const description = document.createElement('p');
                const likeBtn = document.createElement('button');
                const userList = document.createElement('ul');

					book.users.forEach((user) => {
						userList.innerHTML += `<li>${user.username}</li>`;
					});

                title.textContent = book.title;
                subtitle.textContent = book.subtitle;
                author.textContent = book.author;
                img.src = book.img_url;
                img.alt = book.title;
                description.textContent = book.description;
                const currentUser = {
                    id: 1,
                    username: "pouros"
                };
                const userIndex = book.users.findIndex(users => users.id === currentUser.id);
                likeBtn.textContent = userIndex === -1 ? "Like" : "Dislike";
                showPanel.textContent = '';
                showPanel.append(img, title, subtitle, author, description, userList, likeBtn);
                console.log(book.users);
                likeBtn.addEventListener("click", (event) => {
                    console.log("LIKED!");
                    // we are =>
                    if(userIndex === -1){
                        book.users.push(currentUser);
                        console.log(book.users);
                    }else{
                        book.users.splice(userIndex, 1);
                        console.log(book.users);
                    }

                    console.log("newusers", book.users);

                    const patchReqObj = {
                        method: "PATCH",
                        headers: {
                            "content-type": "application/json",
                        },
                        body: JSON.stringify({
                            users: book.users,
                        }),
                    }

                    fetch("http://localhost:3000/books/" + book.id, patchReqObj)
                        .then((response) => response.json())
                        .then((updatedBook) => {
                            console.log(updatedBook);

                        });
                });

            }
            );
            ulElement.append(li);
        }
        );
    }
    );
};
const init = () => {
    fetchAllBookTitles();
}
init();