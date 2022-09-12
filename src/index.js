import './assets/styles/styles.scss';
import './index.scss';

const articleContainerElement = document.querySelector('.articles-container');

// To create an article on the dom
const createArticles = (articles) => {
  const articlesDOM = articles.map((article) => {
    const articleDOM = document.createElement('div');
    articleDOM.classList.add('article');
    articleDOM.innerHTML = `
    <img
      src="${article.img}"
      alt="profile"
    />
    <h2>${article.title}</h2>
    <p class="article-author">${article.author} - ${
      article.category
    } - ${new Date(article.createdAt).toLocaleDateString('fr-FR', {
      weekday: 'long',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    })}</p>
    <p class="article-content">${article.content}</p>
    <div class="article-actions">
      <button class="btn btn-danger" data-id=${article._id}>Supprimer</button>
      <button class="btn btn-primary" data-id=${article._id}>Modifier</button>
    </div>
  `;
    return articleDOM;
  });
  articleContainerElement.innerHTML = '';
  articleContainerElement.append(...articlesDOM);
  const deleteButtons = articleContainerElement.querySelectorAll('.btn-danger');
  const editButtons = articleContainerElement.querySelectorAll('.btn-primary');

  // edit articles with button 'modifier' to redirect on form page
  editButtons.forEach((button) => {
    button.addEventListener('click', (event) => {
      const target = event.target;
      const articleId = target.dataset.id;
      window.location.assign(`/form.html?id=${articleId}`);
    });
  });

  deleteButtons.forEach((button) => {
    button.addEventListener('click', async (event) => {
      try {
        const target = event.target;
        const articleId = target.dataset.id;
        const response = await fetch(
          `https://restapi.fr/api/article/${articleId}`,
          {
            method: 'DELETE',
          }
        );
        const body = await response.json();
        console.log(body);
        fetchArticle();
      } catch (e) {
        console.log('e :', e);
      }
    });
  });
};

// To collect articles on the server with fetch :  resquet HTTP with GET method

const fetchArticle = async () => {
  try {
    const response = await fetch('https://restapi.fr/api/article');
    const articles = await response.json();
    createArticles(articles);
  } catch (e) {
    console.log('e :', e);
  }
};

fetchArticle();
