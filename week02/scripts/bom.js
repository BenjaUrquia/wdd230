document.addEventListener("DOMContentLoaded", () => {
    const input = document.querySelector('#favchap');
    const button = document.querySelector('button');
    const list = document.querySelector('#list');


    button.addEventListener('click', () => {
        const chapter = input.value.trim();

        if (chapter === '') {
            input.focus();
            return;
        }

        const li = document.createElement('li');
        const deleteButton = document.createElement('button');

        li.textContent = chapter;
        deleteButton.textContent = '❌';
        deleteButton.classList.add('delete');

        deleteButton.addEventListener('click', () => {
            list.removeChild(li);
            input.focus();
        });

        li.append(deleteButton);
        list.append(li);

        input.value = '';
        input.focus();
    });
});