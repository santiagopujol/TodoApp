import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {useDispatch, useSelector } from 'react-redux'
import { addTodo, updateTodo } from './../../../redux/slices/todo/todoSlice';
import {v4 as uuid} from 'uuid'
import Form from 'react-bootstrap/Form';
import { useAppContext } from '../../../context';

function TodoModalAbm({open, data}) {
  const dispatch = useDispatch()

  const {
    openTodoModalAbm,
    setOpenTodoModalAbm
  } = useAppContext();

  const handleClose = () => {
    setOpenTodoModalAbm(false);
  }
  console.log(open)

  useEffect(() => {

  }, [openTodoModalAbm]);

  const [stateForm, setStateForm] = useState({
    userId: data != null ? data.userId : 1,
    id: data != null ? data.id : null,
    title: data != null ? data.title : null,
    completed: data != null ? data.completed : false
  });
  
  function handleChange(e) {
    setStateForm({ ...stateForm, [e.target.name]: e.target.value });
  }

  const saveToDo = () => {
    try {
      // Add
      if (data == null) {
        dispatch(addTodo({
          ...stateForm, 
          id: uuid()
        }))
      // Update
      } else {
        dispatch(updateTodo(stateForm))
      }
      handleClose()
      // setOperationFinalized(true)
    } catch (error) {
      console.log("Error catch:", error);
    }
  }

  return (
    <>
      <Modal show={openTodoModalAbm} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{data != null ? 'Edit' : 'Add'} Todo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form>
          <fieldset>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="title">Title</Form.Label>
              <Form.Control 
                id="title" 
                name="title"
                placeholder="Enter title"
                onChange={handleChange}
                value={stateForm.title} 
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="completed">Todo completed</Form.Label>
              <Form.Select 
                id="completed"
                name="completed"
                onChange={handleChange}
                value={stateForm.completed} 
              >
                <option value={"false"}>No</option>
                <option value={"true"}>Yes</option>
              </Form.Select>
            </Form.Group>
          </fieldset>
        </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={saveToDo}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default TodoModalAbm;