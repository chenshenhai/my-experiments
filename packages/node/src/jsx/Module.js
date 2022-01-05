function Module(props) {
  const { name, bindtap, list = [] } = props;
  return React.createElement(
    "div", 
    null,
    React.createElement(
      "div",
      null,
      name ? React.createElement(
        "span",
        null,
        "My name is ",
        name) : 
      React.createElement(
        "span",
        null,
        "No Name"
      )
    ), 
    React.createElement("div",null, list.map((item, i) => {
      return React.createElement("span", {
        key: i
      }, item);
  })), React.createElement("button", {
    onClick: bindtap
  }, "Hello Btn"));
}