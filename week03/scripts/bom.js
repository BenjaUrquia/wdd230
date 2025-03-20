document.addEventListener("DOMContentLoaded", () => {
  const input = document.querySelector('#favchap');
  const button = document.querySelector('button');
  const list = document.querySelector('#list');

  let chaptersArray = getChapterList() || [];

  chaptersArray.forEach(chapter => displayList(chapter));

  button.addEventListener('click', () => {
    if (input.value.trim() !== '') {
      displayList(input.value);
      chaptersArray.push(input.value);
      setChapterList();
      input.value = '';
      input.focus();
    }
  });

  function displayList(item) {
    const li = document.createElement('li');
    const deleteButton = document.createElement('button');

    li.textContent = item;
    deleteButton.textContent = '❌';
    deleteButton.classList.add('delete');

    li.appendChild(deleteButton);
    list.appendChild(li);

    deleteButton.addEventListener('click', () => deleteChapter(item));
  }

  function setChapterList() {
    localStorage.setItem('chapters', JSON.stringify(chaptersArray));
  }

  function getChapterList() {
    return JSON.parse(localStorage.getItem('chapters'));
  }

  function deleteChapter(chapter) {
    chaptersArray = chaptersArray.filter(item => item !== chapter);
    setChapterList();
    list.innerHTML = '';
    chaptersArray.forEach(chapter => displayList(chapter));
  }
});