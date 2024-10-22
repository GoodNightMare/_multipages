import React, { useEffect, useRef, useState } from "react";
import "./Todo.css";
import { Badge, Button, Form, Modal } from "react-bootstrap";
import { fetchTodos } from "../../data/todos";

function Todo() {
  const [todosRaw, setTodosRaw] = useState([]);
  const [todos, setTodos] = useState([]);
  const [onlyWaiting, setOnlyWaiting] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [numPage, setNumPage] = useState(1);
  const [showModal, setShowModal] = useState(false);

  const newIdRef = useRef();
  const newTitleRef = useRef();

  useEffect(() => {
    setTodosRaw(fetchTodos());
    console.log(fetchTodos().length);
  }, []);

  useEffect(() => {
    if (onlyWaiting)
      setTodos(todosRaw.filter((todo) => todo.completed === !onlyWaiting));
    else setTodos(todosRaw);
  }, [todosRaw, onlyWaiting]); // only waiting

  useEffect(() => {
    const startIndex = (numPage - 1) * itemsPerPage;
    const endIndex = startIndex + parseInt(itemsPerPage, 10); // ensure it's a number

    if (onlyWaiting) {
      setTodos(
        todosRaw
          .filter((todo) => todo.completed === !onlyWaiting && !todo.isDeleted)
          .slice(startIndex, endIndex)
      );
      console.log("Id ที่ =" ,startIndex+1,"ถึง Id ที่ =", endIndex)
    } else if (!onlyWaiting) {
      setTodos(
        todosRaw
          .filter((todo) => !todo.isDeleted)
          .slice(startIndex, endIndex)
      );
      console.log("ตัว ->" ,startIndex+1,"ถึง ตัว ->", endIndex)
    }
  }, [todosRaw, itemsPerPage, numPage, onlyWaiting]);

  useEffect(() => {
    if (todosRaw.length > 0) {
      const filteredTodos = todosRaw.filter((todo) => !todo.isDeleted);
      const lastPage = onlyWaiting
        ? Math.max(
            1,
            Math.ceil(
              filteredTodos.filter((todo) => todo.completed === !onlyWaiting)
                .length / itemsPerPage
            )
          )
        : Math.max(1, Math.ceil(filteredTodos.length / itemsPerPage));
      if (numPage > lastPage) {
        console.log(numPage, lastPage);
        setNumPage(lastPage);
      }
    }
  }, [numPage, todosRaw, itemsPerPage, onlyWaiting]);

  const checkOnlyWaiting = () =>
    !onlyWaiting
      ? Math.ceil(
          todosRaw.filter((todo) => !todo.isDeleted).length / itemsPerPage
        )
      : Math.ceil(
          todosRaw
            .filter((todo) => !todo.isDeleted)
            .filter((todo) => todo.completed === !onlyWaiting).length /
            itemsPerPage
        );

  const deleteTodo = (id) => {
    setTodosRaw(todosRaw.filter((todo) => todo.id !== id));
  };

  const completeTodo = (id) => {
    const todoRawSelected = todosRaw.find((todo) => todo.id === id);
    todoRawSelected.completed = true;
    setTodosRaw([...todosRaw]);
  };

  const addClick = (id, title) => {
    setTodosRaw([
      ...todosRaw,
      {
        id: Number(id),
        title,
        userId: 1,
        isDeleted: false,
        completed: false,
      },
    ]);
    setShowModal(false);
  };

  return (
    <div className="todo-container">
      <div className="todo-filter-container">
        {/* toggle */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <Form.Check // prettier-ignore
            type="switch"
            id="switch"
            label="Show Only"
            onChange={(e) => setOnlyWaiting(e.target.checked)}
          />
          <label htmlFor="switch" className="badge bg-warning fs-6 text-black">
            Waiting <span className="bi bi-clock"></span>
          </label>
        </div>

        {/* items Per Page */}
        <Form.Select
          aria-label="Default select example"
          style={{ width: "200px" }}
          onChange={(e) => setItemsPerPage(e.target.value)}
        >
          <option value={5}>5 item per page</option>
          <option value={10}>10 item per page</option>
          <option value={15}>15 item per page</option>
          <option value={20}>20 item per page</option>
        </Form.Select>
      </div>
      <div>
        <table className="table table-striped">
          <thead className="table-dark">
            <tr>
              <th align="left">ID</th>
              <th>Title</th>
              <th style={{ textAlign: "right" }}>
                Completed &nbsp;
                <span
                  className="bi bi-plus bg-primary p-1 rounded"
                  onClick={() => setShowModal(true)}
                ></span>
                <Modal
                  show={showModal}
                  onHide={() => setShowModal(false)}
                  size="lg"
                  aria-labelledby="contained-modal-title-vcenter"
                  centered
                >
                  <Modal.Header closeButton>
                    <Modal.Title>
                      <button className="btn btn-primary">
                        &nbsp;<span className="bi bi-plus"></span>
                      </button>
                      &nbsp; Add Todo
                    </Modal.Title>
                  </Modal.Header>

                  <Modal.Body>
                    <Form>
                      <Form.Group className="mb-3" controlId="formTitle">
                        <Form.Label className="badge bg-secondary m-2 p-2 fw-bold fs-4">
                          ID :{" "}
                        </Form.Label>
                        <Form.Control
                          className="fs-4"
                          type="text"
                          disabled
                          ref={newIdRef}
                          value={Number(
                            todosRaw.reduce((prev, todo) => {
                              return prev < todo.id ? todo.id : prev;
                            }, 0) + 1
                          )}
                        />
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="formTitle2">
                        <Form.Label className="fs-4">Title</Form.Label>
                        <Form.Control type="text" autoFocus ref={newTitleRef} />
                      </Form.Group>
                    </Form>
                  </Modal.Body>

                  <Modal.Footer>
                    <Button
                      variant="secondary"
                      onClick={() => setShowModal(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="primary"
                      onClick={() => {
                        const id = newIdRef.current.value;
                        const title = newTitleRef.current.value;
                        addClick(id, title);
                      }}
                    >
                      Add
                    </Button>
                  </Modal.Footer>
                </Modal>
              </th>
            </tr>
          </thead>
          <tbody>
            {todos.map((todo) => (
              <tr key={todo.id}>
                <td>
                  <Badge bg="secondary">{todo.id}</Badge>
                </td>
                <td align="left">{todo.title}</td>
                <td align="right" className="d-flex justify-content-end gap-2 ">
                  <span
                    className={
                      "badge d-flex align-items-center " +
                      (todo.completed
                        ? " bg-success text-white"
                        : " bg-warning text-black")
                    }
                    onClick={() => completeTodo(todo.id)}
                  >
                    {todo.completed ? "done" : "waiting"}
                    &nbsp;
                    <span
                      className={
                        "bi " + (todo.completed ? " bi-check" : " bi-clock")
                      }
                    ></span>
                  </span>
                  <span
                    className="bi bi-trash bg-danger p-1 rounded text-white"
                    onClick={() => deleteTodo(todo.id)}
                  ></span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <div className="pagination d-flex justify-content-center">
          {numPage > 2 && (
            <button
              className="btn btn-outline-primary"
              onClick={() => {
                setNumPage(1);
              }}
            >
              1
            </button>
          )}

          {numPage > 3 && (
            <span className="align-self-center text-center pb-2">...</span>
          )}

          {numPage > 1 && (
            <button
              onClick={() => {
                setNumPage(numPage - 1);
              }}
              className="btn btn-outline-primary"
            >
              {numPage - 1}
            </button>
          )}

          <button className="btn btn-primary">
            {checkOnlyWaiting() ? numPage : <span>0/0</span>}
          </button>

          {numPage < checkOnlyWaiting() && (
            <button
              onClick={() => {
                setNumPage(numPage + 1);
              }}
              className="btn btn-outline-primary"
            >
              {numPage + 1}
            </button>
          )}

          {numPage < checkOnlyWaiting() - 2 && (
            <span className="align-self-center text-center pb-2">...</span>
          )}

          {numPage < checkOnlyWaiting() - 1 && (
            <button
              className="btn btn-outline-primary"
              onClick={() => {
                setNumPage(checkOnlyWaiting());
              }}
            >
              {checkOnlyWaiting()}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Todo;