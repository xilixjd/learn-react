class ReactElement {
  constructor (type, props) {
    this.type = type
    this.props = props
  }
}

export function createElement(type, config, children) {
  const props = {}
  if (config !== null) {
    Object.keys(config).forEach(propName => 
      props[propName] = config[propName])
  }
  // if (children.length >= 1) {
  //   props.children = children.length === 1 ? children[0] : children
  // }
  const childrenLength = arguments.length - 2
  if (childrenLength === 1) {
    props.children = children
  } else if (childrenLength > 1) {
    const childArray = Array(childrenLength);
    for (let i = 0; i < childrenLength; i++) {
      childArray[i] = arguments[i + 2];
    }
    props.children = childArray
  }
  return new ReactElement(type, props)
}