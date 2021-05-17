import React, { useEffect, useState } from 'react'
import StickyNote from './StickyNote'
import styled from 'styled-components'
import axios from 'axios'

const Layout = () => {
  
  // Config information object to store in
  const [newNote, setNewNote] = useState({
    _id: String,
    content: String,
    date: String,
    posX: 500,
    posY: 500,
  })
  const [notes, setNotes] = useState([])
  const [refreshStatus, setStatus] = useState([false])
  const [notesList, setNoteList] = useState([])

  // Get data from server
  useEffect(() => {
    axios
      .get('http://localhost:3001/')
      .then(response => {
        setNotes(response.data)
        setStatus(false)
      })
  },[refreshStatus])
  
  useEffect(() => {
    var tempList = []
    for(var i = 0; i < notes.length; i++){
      tempList.push(notes[i])
    }
    setNoteList(tempList)
  },[notes.length])

  // Create note
  const handleChange = (event) => {
    const field = event.target.name
    setNewNote((newNote) => {
      let temp = newNote
      temp[field] = event.target.value
      return temp
    })
    setStatus(true)
  }

  // Send data to server on submit
  const handleSubmit = (event) => {
      event.preventDefault();

      setNewNote((newNote) => {
        newNote['date'] = new Date().toDateString();
        return newNote
      })

      axios
        .post('http://localhost:3001/create', newNote, {headers: {
          'Content-Type': 'application/json'}})
        .then(response => {
          setStatus(true)
        })
  }
  
  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <Content type="text" name="content" defaultValue={''} onChange={handleChange} />
        <br/>
        <input type="submit" value="Add Note" />
      </form>
      {notesList.map(function(item,index) { 
        return <StickyNote key={index} note={item} updateNote={setStatus} />
      })}
    </Container>
  );
}

export default Layout;

const Container = styled.div`
  display: flex;
`;

const Content = styled.textarea`
  width: 200px;
  height: 200px;
  resize: none;
`;
