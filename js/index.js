document.addEventListener("DOMContentLoaded", function() {
    const booksUrl = "http://localhost:3000/books"
    
    const init = () => {
        fetch(booksUrl)
        .then(resp => resp.json())
        .then(renderBooksList)
        
    }

    const renderBooksList = books => {
        let bookString = ""
        const list = document.querySelector("#list")
        books.forEach( book => {
            const bookLi = document.createElement("li")
            bookLi.innerText = book.title
            list.append(bookLi)

             
          
            bookLi.addEventListener("click", (e) => {
               
                const showPan = document.querySelector("#show-panel")
                showPan.innerHTML = "" //clears
                
                const bookTitle = document.createElement("p")
                bookTitle.innerText = book.title
                
                const bookImg = document.createElement("img")
                bookImg.src = book.img_url

                const usersUl = document.createElement("ul")

                const bookDesc = document.createElement("p")
                bookDesc.innerText = book.description

                book.users.forEach((user) => {
                    const userName = document.createElement("p")
                    userName.innerText = user.username
                    userName.style.fontWeight = "900"
                    usersUl.append(userName)
                })
             
                const button = document.createElement("button")
                button.innerText = "Read Book"
                
                showPan.append(bookTitle, bookImg, bookDesc, usersUl, button) 
            
                 //arr of users for that book //unshift , add to the front
                
                //clicks 
                    button.addEventListener("click", (event) => {
                        const allUser = book.users
                         
                        const finder = allUser.find(singleUser => singleUser.id == 1)
                            if (finder == undefined) {
                            allUser.unshift({ id: 1, username: "pouros" });
                            } else {
                            allUser.shift();
                            }                          
                            fetch(`http://localhost:3000/books/${book.id}`, {
                            method: "PATCH",
                            headers: {
                                'Content-Type': 'application/json',
                                'accept': 'application/json'
                            },
                            body: JSON.stringify({ users: allUser})
                            })
                        .then(resp => resp.json())
                        .then(book => {usersUl.innerHTML= "" 
                            book.users.forEach((user) => {
                                const userName = document.createElement("p")
                                userName.innerText = user.username
                                userName.style.fontWeight = "900"
                                usersUl.append(userName)
                            })
                     
                        })
                         
                    })

            })
        })
        

    }

 
   

 
init()

});
