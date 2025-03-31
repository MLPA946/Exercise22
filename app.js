
const searchInput = document.getElementById('searchWord');
const searchButton = document.getElementById('submitSearch');
const imageContainer = document.getElementById('imageContainer');
const feedbackParagraph = document.createElement('p');
document.querySelector('main').appendChild(feedbackParagraph);

const apiKey = '0vh6aT0C6Bg6X5ExHqgLtEbrnp1DVrTb';

searchButton.addEventListener('click', () => {
  const searchTerm = searchInput.value.trim();
  feedbackParagraph.textContent = '';
  imageContainer.innerHTML = '';

  if (!searchTerm) {
    feedbackParagraph.textContent = 'Please enter a search term.';
    return;
  }

  const url = `https://api.giphy.com/v1/gifs/translate?api_key=${apiKey}&s=${searchTerm}`;

  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);

      if (data && data.data && data.data.images && data.data.images.original) {
        const gifUrl = data.data.images.original.url;
        imageContainer.innerHTML = `<img src="${gifUrl}" alt="Giphy Selection" style="width: 100%; height: auto">`;
      } else {
        feedbackParagraph.textContent = 'No results found for your search.';
      }

      searchInput.value = '';
    })
    .catch((error) => {
      feedbackParagraph.textContent = error.message || 'An unexpected error occurred.';
      console.error(error);
    });
});