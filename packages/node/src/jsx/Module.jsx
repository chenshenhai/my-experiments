function Module(props) {
  const { name, bindtap, list = [] } = props;
  return (
    <div>
      <div>
        {name ? (<span>My name is {name}</span>) : (<span>No Name</span>)}
      </div>
      <div>
        {list.map((item, i) => {
          return (<span key={i}>{item}</span>)
        })}
      </div>
      <button onClick={bindtap}>Hello Btn</button>
    </div>
  )
}