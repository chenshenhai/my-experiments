function Module(props) {
  const {
    myname,
    onClick,
    list = []
  } = props;
  return React.createElement(
    "div",
    {
      className: "class001"
    },
    React.createElement(
      "div", 
      {
        className: "class002"
      },
      myname ? React.createElement("span", null, "My name is ", myname) : React.createElement("span", null, "No Name")), React.createElement("div", {
        className: "class003"
      },
      list.map((item, i) => {
        return React.createElement("span", {
          key: i
        }, item);
      })),
      React.createElement("button", {
        onClick: onClick
      }, "Hello Btn")
  );
}

export default Module;