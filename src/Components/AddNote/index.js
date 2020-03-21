import React, { Component } from 'react'
import axios from '../../axios'

import Input from '../common/Input';
import Button from '../common/Button'
import { connect } from 'react-redux';
import get from 'lodash/get';

import './style.css'

class AddNote extends Component {

    state = {
        newNote: ''
    }

    changeHandler = (name, value) => {
        this.setState({[name]: value})
    }

    saveForm = (id) => {
        const {newNote} = this.state;

        const data = {
            details: newNote
        }
        if(!id){
            axios.post('/notes',data)
                 .then((resp) => resp.status===201 && console.log("Sucessful"))
                 .catch(err => console.log("Error occurred while posting a new note:", err))
            }
            else {
                const {notesList} = this.props;

                let modifiedNote = notesList.find(item => item.id === id);
                    if(modifiedNote.moreNotes){
                        modifiedNote.moreNotes.push (
                            {
                                id: +`${id}.${modifiedNote.moreNotes.length + 1}`,
                                details: newNote,
                            }
                        )
                    }
                    else {
                        modifiedNote.moreNotes = [{
                            id: +`${id}.${1}`,
                            details: newNote,
                        }]
                    }
                axios.patch(`/notes/${id}`, modifiedNote)
                .then((resp) => resp.status===200 && console.log("Sub note added sucessfully !!"))
                .catch(err => console.log("Error occurred while posting a new sub note:", err))
            }
    }

    render() {
        const {newNote} = this.state,
                {id=0} = this.props;
        
        return (
            <div className="add-note">
                <Input type="text" name="newNote" value={newNote} label="Add a new Note" changeHandler={this.changeHandler} />
                <Button type="button" btnClass="btn btn-new" clickHandler={() => this.saveForm(id)} value="Add Note"/>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return { notesList : get(state, 'NotesReducer.notesList', [])}
}

export default connect(mapStateToProps)(AddNote)