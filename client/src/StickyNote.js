import React, { useEffect, useState } from 'react'
import Draggable from 'react-draggable';
import styled from 'styled-components';
import axios from 'axios'

const StickyNote = ({note, updateNote}) => {
    var content = ''
    if(note.content !== undefined) {
        content = note.content
    }

    const updateContent = (event) => {
        note.content = (event.target.value)
        axios
            .post('http://localhost:3001/update', note, {headers: {
                'Content-Type': 'application/json'}})
        updateNote(true)

    }

    const updatePosition = (event) => {
        note.posX = (event.layerX - event.offsetX)
        note.posY = (event.layerY - event.offsetY)
        axios
            .post('http://localhost:3001/update', note, {headers: {
                'Content-Type': 'application/json'}})
        updateNote(true)
    }

    const handleDelete = (event) => {
        console.log(note.content)
        axios
            .post('http://localhost:3001/delete', note, {headers: {
                'Content-Type': 'application/json'}})
        updateNote(true)
    }
    
    return (
        <Draggable defaultPosition={{x: note.posX, y: note.posY}} onStop={updatePosition}>
            <Sticky>
                <Delete onClick={handleDelete}>x</Delete>

                <Content onChange={updateContent}>{content}</Content>
            </Sticky>
        </Draggable>
    );
}

export default StickyNote;

const Content = styled.textarea`
  width: 200px;
  height: 200px;
  background-color: #fff740;
  border: #fff740;
  resize: none;
`;

const Delete = styled.button`
  position: absolute;
  color: red;

  border: #fff740;
`;

const Sticky = styled.div`
  display: flex;
  position: absolute;
  justify-content: flex-end;
  align-items: flex-end;
`;
