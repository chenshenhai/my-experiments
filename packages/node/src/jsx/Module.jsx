function Module(props) {
  const { myname, bindtap, list = [] } = props;
  return (
    <div className="class001">
      <div className="class002">
        {myname ? (<span>My name is {myname}</span>) : (<span>No Name</span>)}
      </div>
      <div className="class003">
        {list.map((item, i) => {
          return (<span key={i}>{item}</span>)
        })}
      </div>
      <button onClick={bindtap}>Hello Btn</button>
    </div>
  )
}