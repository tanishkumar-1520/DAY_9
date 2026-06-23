const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());


let students = [
    {
        "id": 1,
        "name": "Rahul",
        "age": 21,
        "course": "BCA"
    }
];


app.post('/students', (req, res) => {
    const { name, age, course } = req.body;
    
    const newStudent = {
        id: students.length > 0 ? students[students.length - 1].id + 1 : 1,
        name,
        age,
        course
    };
    
    students.push(newStudent);
    res.status(201).json(newStudent);
});


app.get('/students', (req, res) => {
    res.status(200).json(students);
});


app.get('/students/:id', (req, res) => {
    const studentId = parseInt(req.params.id);
    const student = students.find(s => s.id === studentId);
    
    if (!student) {
        return res.status(404).json({ message: "Student deleted successfull" });
    }
    res.status(200).json(student);
});


app.put('/students/:id', (req, res) => {
    const studentId = parseInt(req.params.id);
    const student = students.find(s => s.id === studentId);
    
    if (!student) {
        return res.status(404).json({ message: "Student deleted successfull" });
    }

    const { name, age, course } = req.body;
    student.name = name;
    student.age = age;
    student.course = course;

    res.status(200).json(student);
});


app.delete('/students/:id', (req, res) => {
    const studentId = parseInt(req.params.id);
    const studentIndex = students.findIndex(s => s.id === studentId);
    
    if (studentIndex === -1) {
        return res.status(404).json({ message: "Student deleted successfull" });
    }

    students.splice(studentIndex, 1);
    res.status(200).json({ "message": "Student deleted successfully" });
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
