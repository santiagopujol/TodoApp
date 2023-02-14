import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getTodos, deleteTodo } from '../../../redux/slices/todo/todoSlice';
import { setUserLogout } from '../../../redux/slices/user/userSlice';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import TodoModalAbm from './TodoModalAbm';

export function Todo() {
  const todoState = useSelector((state) => state.todo)
  const userState = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const [openModalAbm, setOpenModalAbm] = useState(false);
  const [toDoElementEdit, setToDoElementEdit] = useState(null);

  const editTodoButton = (cell, row, rowIndex, formatExtraData) => {
    return (
      <button className="btn btn-primary"
        onClick={() => {
          setOpenModalAbm(true); 
          setToDoElementEdit(row);
        }}
      >
        Edit
      </button>
    );
  };

  const deleteTodoButton = (cell, row, rowIndex, formatExtraData) => {
    return (
      <button className="btn btn-danger"
        onClick={() => {
          dispatch(deleteTodo(row.id));
        }}
      >
        Delete
      </button>
    );
  };

  const columns = [
    {
      dataField: "userId",
      text: "UserId",
      sort: true
    },
    {
      dataField: "id",
      text: "Id",
      sort: true
    },
    {
      dataField: "title",
      text: "Title",
      sort: true
    },
    {
      dataField: "completed",
      text: "Completed",
      sort: true
    },
    {
      dataField: "edit",
      text: "Edit",
      formatter: editTodoButton,
    },
    {
      dataField: "delete",
      text: "Delete",
      formatter: deleteTodoButton,
    }
  ];

  useEffect(() => {  
    dispatch(getTodos())
    
    if (userState.userLogged === null) {
      navigate("/login")
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, userState]);

  const logout = () => {
    dispatch(setUserLogout())
    navigate("/login")
  }

  const ModalAbmComponent = () => {
    return (
      <TodoModalAbm open={openModalAbm} data={toDoElementEdit}/>
    )
  }

  return (
    <>
      {/* Aqui iria Header component para navbar de login y menu */}
      <div className="m-2">
        <h4 className="float-start text-primary"><b>Todo App</b> - Todo List</h4>
        <button 
          type="button" 
          className="btn btn-secondary mb-2 float-end"
          onClick={() => logout()}
        >
          Logout <b>{userState.userLogged != null && userState.userLogged.username}</b>
        </button>

        <BootstrapTable
          bootstrap4
          keyField="id"
          data={todoState.list}
          columns={columns}
          pagination={paginationFactory({ sizePerPage: 5 })}
        />
        <button 
          type="button" 
          className="btn btn-success float-end"
          onClick={() => { setOpenModalAbm(true); setToDoElementEdit(null) }}
        >
          Add New Task
        </button>
        <ModalAbmComponent/>
      </div>
    </>
  )
}

