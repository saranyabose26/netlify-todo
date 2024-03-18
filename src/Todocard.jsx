import { Dropdown } from 'bootstrap';
import { useEffect, useState } from 'react'

export default function Todocard({ todo, setTodo }) {
    const [selectedValue, setSelectedValue] = useState();
    const [filterstatusValue, setFilterstatusValue] = useState('all');
    const [filterToDo, setFilterToDo] = useState([]);

    // State to track if an item is being edited
    const [editingId, setEditingId] = useState(null);

    const handleChange = (event, id) => {
        const newStatus = event.target.value;
        const updatedTodo = todo.map(item => {
            if (item.id === id) {
                return { ...item, status: newStatus };
            }
            return item;
        });

        setSelectedValue(event.target.value);
        setTodo(updatedTodo);
        BindFilterData(filterstatusValue);
    };

    const FilterhandleChange = (event) => {
        const filterValue = event.target.value;
        setFilterstatusValue(filterValue);
        BindFilterData(filterValue);
    }

    const BindFilterData = (value) => {
        if (value === 'all') {
            setFilterToDo(todo);
        } else {
            setFilterToDo(todo.filter(item => item.status === value));
        }
    }

    const btnDeleteClick = (event, id) => {
        const updatedTodos = todo.filter(item => item.id !== id);
        setTodo(updatedTodos);
        BindFilterData(filterstatusValue);
    };

    // Function to handle edit button click
    const editButtonClick = (id) => {
        setEditingId(id);
    };

    // Function to handle submitting edits
    const submitEdit = (id, newName, newDesc) => {
        const updatedTodo = todo.map(item => {
            if (item.id === id) {
                return { ...item, name: newName, desc: newDesc };
            }
            return item;
        });
        setTodo(updatedTodo);
        setEditingId(null); // Exit edit mode
    };

    return (
        <div className="row">
            {todo.map((e, index) => (
                <div key={index} className="col-lg-4 mb-4">
                    <div className="card" style={{ width: '100%', background: '#ccffcc' }}>
                        <div className="card-body">
                            {editingId === e.id ? (
                                <>
                                    <input
                                        type="text"
                                        value={e.name}
                                        onChange={event => {
                                            const newName = event.target.value;
                                            submitEdit(e.id, newName, e.desc);
                                        }}
                                    />
                                    <input
                                        type="text"
                                        value={e.desc}
                                        onChange={event => {
                                            const newDesc = event.target.value;
                                            submitEdit(e.id, e.name, newDesc);
                                        }}
                                    />
                                </>
                            ) : (
                                <>
                                    <p>Name : {e.name}</p>
                                    <p>Description : {e.desc}</p>
                                </>
                            )}
                            <p>Status:
                                <span style={{ display: 'inline-block' }}>
                                    <select id={e.id} value={e.status} onChange={(event) => handleChange(event, e.id)} style={{ marginLeft: '10px', color: 'white', backgroundColor: e.status === 'completed' ? '#00cc99' : '#fb728a' }}>
                                        <option value="completed" style={{ color: 'white' }}>Completed</option>
                                        <option value="incomplete" style={{ color: 'white' }}>Not Completed</option>
                                    </select>
                                </span>
                            </p>
                            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                {/* Render edit button */}
                                <button className='btnedit' onClick={() => editButtonClick(e.id)} style={{ marginLeft: '5px' }}>Edit</button>
                                <button className='btndelete' onClick={(event) => btnDeleteClick(event, e.id)} style={{ marginLeft: '5px' }}>Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
