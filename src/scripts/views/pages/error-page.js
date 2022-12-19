const ErrorPage = {
  render() {
    return /* html */ `
        <div class="error">
            <h1 id="title"></h1>
            <p id="message"></p>
            <button id="btn-back" href="/">Back to previous</button>
        </div>
        `;
  },
  afterRender(error) {
    const title = document.querySelector('#title');
    const message = document.querySelector('#message');
    const btnBack = document.querySelector('#btn-back');
    title.innerText = error.title ?? 'Error !';
    message.innerText =
      error.message ?? 'Oops, something went wrong. Please try again later.';
    btnBack.addEventListener('click', () => {
      history.back();
    });
  },
};
export default ErrorPage;
