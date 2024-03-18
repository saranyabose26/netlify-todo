import { useEffect, useState } from 'react'
import Todocard from './Todocard';

export default function MainDiv() {
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [todo, setTodo] = useState([]);
  const [filterstatusValue, setFilterstatusValue] = useState('all');
  const [filterTodo,setFilterTodo] = useState([]);


  function BindData() {
    debugger;
    const todos = {
      id: todo.length + 1,
      name: name,
      desc: desc,
      status: 'incomplete'
    }
    setTodo([...todo, todos]);
    console.log(todo);
    setName('');
    setDesc('');
    BindFilterData(filterstatusValue);
  };

  const FilterhandleChange = (event) => {
    debugger;
    const filterValue = event.target.value;
    setFilterstatusValue(filterValue);
-    BindFilterData(filterValue);
  
}

useEffect(()=>{
  if(filterstatusValue === 'all'){
    console.log('result'+todo);
      setFilterTodo(todo);
      console.log(filterTodo);
  }
  else{
      setFilterTodo(todo.filter(item => item.status === filterstatusValue));
      console.log(filterTodo);
  }
},[todo,filterstatusValue]);

const BindFilterData =(value) =>{
    if(value === 'all'){
      console.log('result'+todo);
        setFilterTodo(todo);
        console.log(filterTodo);
    }
    else{
        setFilterTodo(todo.filter(item => item.status === value));
        console.log(filterTodo);
    }
}


  return <>
    <div className='mainDiv'>
      <div className='headerName'>
        <h5>My Todo</h5>
      </div>
      <div className="container center-container">
        <div className="row">
          <div className="col-sm">
            <input type='text' id='name' className='textBox' onChange={e => setName(e.target.value)} />
          </div>
          <div className="col-sm">
            <input type='text' id='desc' className='textBox' onChange={e => setDesc(e.target.value)} />
          </div>
          <div className="col-sm">
            <button type="button" className="btnSubmit" onClick={BindData}>Add Todo</button>
          </div>
        </div>
      </div>
      <div className="container" style={{ marginTop: '20px' }}>
        <div style={{ display: 'flex' }}>
          <p><b>My Todos</b></p>
          <p style={{ marginLeft: 'auto' }}><b>Status Filter :</b>
            <span style={{ display: 'inline-block' }}>
              <select onChange={(event) => FilterhandleChange(event)} style={{ marginLeft: '10px', color: 'white', backgroundColor: filterstatusValue === 'completed' ? '#00cc99' : '#fb728a' }}>
                <option value="all">All</option>
                <option value="completed">Completed</option>
                <option value="incomplete">Not Completed</option>
              </select>
            </span>
          </p>
        </div>
        <Todocard todo={filterTodo} setTodo={setTodo} />

      </div>
    </div>
  </>;
}
