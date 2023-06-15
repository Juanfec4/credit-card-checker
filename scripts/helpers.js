
//Append Element Helper
function appendElement(parent, elementType, className, content) {
    let element = document.createElement(elementType);
    element.classList.add(className);
    if (content) {
      element.innerText = content;
    }
    parent.appendChild(element);
    return element;
  }

  
//Clear comments
function clearChildren(element) {
    while (element.firstChild) {
      element.firstChild.remove();
    }
  }

  export { appendElement, clearChildren };