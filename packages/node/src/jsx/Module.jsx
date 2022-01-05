function Module(props) {
  const { name, bindtap } = props;
  return (
    <div>
      <span>My name is {name}</span>
      <button onClick={bindtap}>Hello Btn</button>
    </div>
  )
}