//your JS code here. If required.
document.addEventListener('DOMContentLoaded', function () {
  const addButton = document.getElementById('add-button');
  const clearButton = document.getElementById('clear-button');
  const toastsContainer = document.getElementById('toasts');
  const messageContentInput = document.getElementById('message-content');
  const durationInput = document.getElementById('duration');
  const cancelableCheckbox = document.getElementById('cancelable');
  const successRadio = document.getElementById('success');
  const errorRadio = document.getElementById('error');

  addButton.addEventListener('click', function () {
    const messageType = successRadio.checked ? 'success' : 'error';
    const messageContent = messageContentInput.value || (messageType === 'success' ? 'Success!' : 'Error.');
    const duration = parseInt(durationInput.value) || 500;
    const isCancelable = cancelableCheckbox.checked;

    const toast = createToast(messageType, messageContent, isCancelable);
    toastsContainer.prepend(toast);

    if (isCancelable) {
      const cancelButton = toast.querySelector('.cancel-button');
      cancelButton.addEventListener('click', function () {
        toastsContainer.removeChild(toast);
      });
    }

    setTimeout(function () {
      toastsContainer.removeChild(toast);
    }, duration);
  });

  clearButton.addEventListener('click', function () {
    toastsContainer.innerHTML = '';
  });

  function createToast(type, content, cancelable) {
    const toast = document.createElement('div');
    toast.classList.add('toast', type + '-toast');

    const messageParagraph = document.createElement('p');
    messageParagraph.classList.add('message');
    messageParagraph.textContent = content;

    toast.appendChild(messageParagraph);

    if (cancelable) {
      const cancelButton = document.createElement('button');
      cancelButton.classList.add('cancel-button');
      cancelButton.textContent = 'X';
      toast.appendChild(cancelButton);
    }

    return toast;
  }
});
