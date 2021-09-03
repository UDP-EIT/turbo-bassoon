import { useEffect, useState } from "react";
import styles from "./App.module.css";
import { Table, Button, Modal, ModalHeader, ModalFooter, ModalBody, Form, FormGroup, Label, Input } from "reactstrap";

const getStudents = async () => {
    const response = await fetch("http://127.0.0.1:8080/students", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    const myJson = await response.json();
    return myJson;
};

const newStudent = async (body) => {
    const response = await fetch(`http://127.0.0.1:8080/students`, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json",
        },
    });
    const myJson = await response.json();
    return myJson;
};

const getStudentsByName = async (name) => {
    const response = await fetch(`http://127.0.0.1:8080/studentsbyname?name=${name}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    const myJson = await response.json();
    return myJson;
};

function App() {
    const [name, setName] = useState("");
    const [lastname, setLastname] = useState("");
    const [section, setSection] = useState("");
    const [busqueda, setBusqueda] = useState("");
    const [students, setStudents] = useState([]);
    const [modal, setModal] = useState(false);

    useEffect(() => {
        getStudents().then((data) => {
            setStudents(data);
        });
    }, []);

    function handleNewStudent() {
        const body = {
            name: name,
            last_name: lastname,
            section: section,
        };
        newStudent(body).then((data) => {
            getStudents().then((data) => {
                setStudents(data);
            });
            setModal(false);
        });
    }

    function handleGetStudentByName() {
        getStudentsByName(busqueda).then((data) => {
            // const newStudents = [];
            // newStudents.push(data);
            // setStudents(newStudents);
            setStudents(data);
        });
    }

    return (
        <div className={styles.App}>
            <h1 className={styles.Title}>Alumnos</h1>
            <Form>
                <FormGroup>
                    <Label for="busqueda">Busqueda</Label>
                    <Input
                        type="text"
                        name="busqueda"
                        id="busqueda"
                        placeholder="Brian"
                        value={busqueda}
                        onChange={(e) => setBusqueda(e.target.value)}
                    />
                </FormGroup>
            </Form>
            <Button color="primary" onClick={() => handleGetStudentByName()}>
                BUSCAR
            </Button>
            <Table striped bordered>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Sección</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map((student, index) => (
                        <tr key={index}>
                            <th scope="row">{student.ID}</th>
                            <td>{student.name}</td>
                            <td>{student.last_name}</td>
                            <td>{student.section}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <Button color="primary" onClick={() => setModal(!modal)}>
                AGREGAR ALUMNO
            </Button>
            <Modal centered isOpen={modal}>
                <ModalHeader>Agregar alumno</ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup style={{ marginBottom: "20px" }}>
                            <Label for="name">Nombre</Label>
                            <Input type="text" name="name" id="name" placeholder="Brian" value={name} onChange={(e) => setName(e.target.value)} />
                        </FormGroup>
                        <FormGroup style={{ marginBottom: "20px" }}>
                            <Label for="last_name">Apellido</Label>
                            <Input
                                type="text"
                                name="last_name"
                                id="last_name"
                                placeholder="Bastias"
                                value={lastname}
                                onChange={(e) => setLastname(e.target.value)}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="section">Seccion</Label>
                            <Input
                                type="text"
                                name="section"
                                id="section"
                                placeholder="CIT-1000"
                                value={section}
                                onChange={(e) => setSection(e.target.value)}
                            />
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={() => handleNewStudent()}>
                        Agregar
                    </Button>{" "}
                    <Button color="secondary" onClick={() => setModal(!modal)}>
                        Cancelar
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}

export default App;
