document.addEventListener('DOMContentLoaded', () => {

  const getMessage = buttonNode => {
    const appContainer = buttonNode.parentElement.parentElement;
    const contentContainer = appContainer.children[0].children[0];
    console.log(contentContainer.children[1].textContent);
    return contentContainer.children[1].textContent;
  }

  const getTitle = buttonNode => {
    const appContainer = buttonNode.parentElement.parentElement;
    const contentContainer = appContainer.children[0].children[0];
    console.log(contentContainer.children[0].textContent);
    return contentContainer.children[0].textContent;
  }

  const getDate = buttonNode => {
    const appContainer = buttonNode.parentElement.parentElement;
    const contentContainer = appContainer.children[0].children[0];
    const dateContainer = contentContainer.children[2].children[0];
    console.log(dateContainer.children[1].textContent);
    return dateContainer.children[1].textContent;
  }

  const getUser = buttonNode => {
    const appContainer = buttonNode.parentElement.parentElement;
    const contentContainer = appContainer.children[0].children[0];
    const nameContainer = contentContainer.children[2].children[1];
    console.log(nameContainer.children[1].textContent);
    return nameContainer.children[1].textContent;
  }

  const buttonSelector = 'div.button-container > button';
  const buttons = Array.from(document.querySelectorAll(buttonSelector));

  buttons.forEach(button => {
    const message = getMessage(button).replace(/\n/g,'\r\n');
    const title = getTitle(button);
    const date = getDate(button);
    const user = getUser(button);
    button.addEventListener('click', async () => {
      const response = await fetch('/delete-message', { 
	method: 'POST', headers: { 'Content-Type': 'application/json' },
	body:JSON.stringify({ user, title, date, message })
      });
      const { error } = await response.json();
      error ? console.log(error) : open('/', '_self');
    });
  });
});