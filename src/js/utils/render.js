export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};

export const RenderPosition = {
  APPEND: 'append',
  PREPEND: 'prepend',
  BEFORE: 'before',
  AFTER: 'after',
};

export const render = (container, component, place = RenderPosition.APPEND) => {
  switch (place) {
    case RenderPosition.APPEND:
      container.append(component.getElement());
      break;

    case RenderPosition.PREPEND:
      container.prepend(component.getElement());
      break;

    case RenderPosition.BEFORE:
      container.before(component.getElement());
      break;

    case RenderPosition.AFTER:
      container.after(component.getElement());
      break;
  }
};

export const replace = (newComponent, oldComponent) => {
  const parentElement = oldComponent.getElement().parentElement;
  const newChildElement = newComponent.getElement();
  const oldChildElement = oldComponent.getElement();

  const isEsistElements = !!(
    parentElement &&
    newChildElement &&
    oldChildElement
  );
  if (isEsistElements && parentElement.contains(oldChildElement)) {
    parentElement.replaceChild(newChildElement, oldChildElement);
  }
};

export const remove = (component) => {
  component.getElement().remove();
  component.removeElement();
};
