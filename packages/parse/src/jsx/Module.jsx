function Module(props) {
  const { myname, onClick, list = [] } = props;
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
      <button onClick={onClick}>Hello Btn</button>
    </div>
  )
}
