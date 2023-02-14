import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {useDispatch } from 'react-redux'
import { addTodo, updateTodo } from './../../../redux/slices/todo/todoSlice';
import {v4 as uuid} from 'uuid'
import Form from 'react-bootstrap/Form';

function TodoModalAbm({open, data}) {
  const [show, setShow] = useState(open);
  const handleClose = () => setShow(false);
  const dispatch = useDispatch()
  console.log(open, data)

  useEffect(() => {  
    setShow(open)
  }, [open]);

  const [stateForm, setStateForm] = useState({
    userId: data != null ? data.userId : 1,
    id: data != null ? data.id : null,
    title: data != null ? data.title : null,
    completed: data != null ? data.completed : false
  });

  function handleChange(e) {
    console.log(e.target.value)
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
    } catch (error) {
      console.log("Error catch:", error);
    }
  }

  return (
    <>
      <Modal show={show} onHide={handleClose}>
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