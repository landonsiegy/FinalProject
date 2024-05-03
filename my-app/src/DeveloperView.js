import React, { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

function DeveloperView({ onClose }) {
  const [id, setId] = useState('');
  const [text, setText] = useState('');
  const [text2, setText2] = useState('');
  const [answer, setAnswer] = useState('');
  const [imageURL1, setImageURL1] = useState('');
  const [imageURL2, setImageURL2] = useState('');

  const [modid, modsetId] = useState('');
  const [modimageURL1, modsetImageURL1] = useState('');
  const [modimageURL2, modsetImageURL2] = useState('');

  const [delid, delsetId] = useState('');

  const handleCreate = () => {
    const data = {
      id,
      text,
      text2,
      answer,
      imageUrls: [imageURL1, imageURL2]
    };

    axios.post('http://localhost:8081/addQuestion', data)
      .then(response => {
        console.log('Question added successfully:', response.data);
        setId('');
        setText('');
        setText2('');
        setAnswer('');
        setImageURL1('');
        setImageURL2('');

        alert('Question added successfully!');
      })
      .catch(error => {
        alert('Error, ensure that no uppercase characters are in field "answer"!');
      });
  };

  const handleRead = () => {
    axios.get('http://localhost:8081/getQuestions')
      .then(response => {
        const questions = response.data;
        console.log('Questions:', questions);
        alert('Successful, Check websites console!');
      })
      .catch(error => {
        alert("Error!");
      });
  };

  const handleModify = () => {
    const data = {
      modid,
      modimageURL1,
      modimageURL2
    };

    axios.put(`http://localhost:8081/updateQuestion/${modid}`, data)
      .then(response => {
        console.log('Question updated successfully:', response.data);
        alert('Update successful!');
        modsetId('');
        modsetImageURL1('');
        modsetImageURL2('');
      })
      .catch(error => {
        alert('Error!');
      });
  };

  const handleDelete = () => {
    axios.delete(`http://localhost:8081/deleteQuestion/${delid}`)
      .then(response => {
        console.log('Question deleted successfully:', response.data);
        alert(`Question ${delid} has been deleted!`);
        delsetId('');
      })
      .catch(error => {
        alert("Error, question doesn't exist!");
      });
  };

  return (
    <div className="developer-view">
      <div className="developer-view-inputs" style={{ marginBottom: '10px' }}>
        <input
          type="text"
          className="form-control"
          placeholder="ID (ID must be greater than 30)"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
        <input
          type="text"
          className="form-control"
          placeholder="Text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <input
          type="text"
          className="form-control"
          placeholder="Text2"
          value={text2}
          onChange={(e) => setText2(e.target.value)}
        />
        <input
          type="text"
          className="form-control"
          placeholder="Answer (True or False | True = High, False = Low)"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
        />
        <input
          type="text"
          className="form-control"
          placeholder="Image URL 1"
          value={imageURL1}
          onChange={(e) => setImageURL1(e.target.value)}
        />
        <input
          type="text"
          className="form-control"
          placeholder="Image URL 2"
          value={imageURL2}
          onChange={(e) => setImageURL2(e.target.value)}
        />
      </div>
      <div className="developer-view-buttons">
        <button className="btn btn-primary" style={{ marginRight: '10px', marginBottom: '10px', fontSize: '40px' }} onClick={handleCreate}>Create</button>
        <button className="btn btn-primary" style={{ marginRight: '10px', marginBottom: '10px', fontSize: '40px' }} onClick={handleRead}>Read</button>
      </div>
      <div className="developer-view-inputs" style={{ marginBottom: '10px' }}>
        <input
          type="text"
          className="form-control"
          placeholder="ID"
          value={modid}
          onChange={(e) => modsetId(e.target.value)}
        />
        <input
          type="text"
          className="form-control"
          placeholder="Image URL 1"
          value={modimageURL1}
          onChange={(e) => modsetImageURL1(e.target.value)}
        />
        <input
          type="text"
          className="form-control"
          placeholder="Image URL 2"
          value={modimageURL2}
          onChange={(e) => modsetImageURL2(e.target.value)}
        />
      </div>
      <div className="developer-view-buttons">
        <button className="btn btn-primary" style={{ marginRight: '10px', marginBottom: '10px', fontSize: '40px' }} onClick={handleModify}>Update</button>
      </div>
      <div className="developer-view-inputs" style={{ marginBottom: '10px' }}>
        <input
          type="text"
          className="form-control"
          placeholder="ID"
          value={delid}
          onChange={(e) => delsetId(e.target.value)}
        />
      </div>
      <div className="developer-view-buttons">
        <button className="btn btn-primary" style={{ marginRight: '10px', marginBottom: '10px', fontSize: '40px' }} onClick={handleDelete}>Delete</button>
      </div>
      <div className= "text-center mb-3">
        <h1>SE/ComS319 Construction of User Interfaces, Spring 2024</h1>
        <h1>05/02/2024</h1>
        <h1>Landon Siegfried las05@iastate.edu | Zach Kehoe zachtk@iastate.edu</h1>
        <h1>Dr. Abraham N. Aldaco Gastelum aaldaco@iastate.edu | Dr. Ali Jannesari jannesar@iastate.edu</h1>
       </div>
    </div>
  );
}

export default DeveloperView;
