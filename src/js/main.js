const titleField = document.querySelector('.title--js');
const contentField = document.querySelector('.content--js');
const addButton = document.querySelector('.add--js');
const blogArea = document.querySelector('.blog__container--js');

const database = firebase.database();
const rootRef = database.ref('blogArticles');



addButton.addEventListener('click', (e) => {
    e.preventDefault();
    const randomID = rootRef.push().key;
    rootRef.child(randomID).set({
        id: randomID,
        title: titleField.value,
        content: contentField.value
    })
    window.location.reload(true);
})

rootRef.orderByKey().once('value', snapshot => {
    const articles = snapshot.val();
    const articleTable = [];
    for (const i in articles) {
        articleTable.push(articles[i]);

    };
    for (const article of articleTable) {

        const newArticle = document.createElement('article');
        newArticle.classList.add('article');
        newArticle.setAttribute('id', article.id);

        const articleTitle = document.createElement('h2');
        articleTitle.classList.add('article__header');
        const articleTitleText = document.createTextNode(article.title);
        articleTitle.appendChild(articleTitleText);
        newArticle.appendChild(articleTitle);

        const articleArea = document.createElement('div');
        articleArea.classList.add('article__area');

        const articleContent = document.createElement('p');
        articleContent.classList.add('article__content');
        const articleContentText = document.createTextNode(article.content);
        articleContent.appendChild(articleContentText);
        articleArea.appendChild(articleContent);

        const removeButton = document.createElement('button')
        removeButton.classList.add('article__button--remove', 'article__button--remove-js');
        removeButton.setAttribute('id', article.id);
        const removeButtonIcon = document.createTextNode('X');
        removeButton.appendChild(removeButtonIcon);
        articleArea.appendChild(removeButton);

        newArticle.appendChild(articleArea);

        blogArea.appendChild(newArticle);
        //     blogArea.innerHTML += `<article class="article" id="${article.id}">
        //     <h2 class="article__header">${article.title}</h2>
        //     <p class="article__content">${article.content}</p>
        //   </article>`
    }
    const removeButtonClick = document.querySelectorAll('.article__button--remove-js');
    for (let i = 0; i < removeButtonClick.length; i++){
        removeButtonClick[i].addEventListener('click', (e) => {
            rootRef.child(e.target.id).remove();
            window.location.reload(true);
        })
    }
})