import React, { Component } from 'react';
import { connect } from 'react-redux';
import get from 'lodash/get';
import { bindActionCreators } from 'redux';
import axios from '../../axios'

import AddNote from '../AddNote'
import {fetchNotes} from './APIs/action'
import Button from '../common/Button'
import './style.css'

class Notes extends Component{

    state = {
        notes: [],
        showAddSubNote: 0,
    }

    componentDidMount(){
        this.loadHandler();
    }

    loadHandler = () => {
        axios.get('/notes')
             .then((resp) => {resp.status === 200 && this.props.fetchNotes(resp.data)})
             .catch((err) => console.log('Error Occured: ', err))
    }

    addSubnote = (id) => {
        this.setState({showAddSubNote: id})
    }

    deleteNote = (id) => {
        axios.delete(`/notes/${id}`)
             .then((resp) => {
                 if(resp.status === 200) {
                     this.loadHandler()
                 }
             })
             .catch((err) => console.log('Error Occured: ', err))
    }


    render() {
        const {notesList} = this.props;

        const allNotes = notesList && notesList.map((note) => {
            debugger
            return (
                <li className="note">
                    <p><span>{note.id} : </span>{note.details}</p>
                    <div className="btn-group">
                        <Button type="button" btnClass="btn btn-danger" clickHandler={() => this.deleteNote(note.id)} value="Delete Note"/>
                        <Button type="button" btnClass="btn btn-success" value="Add Sub Note" clickHandler={() => this.addSubnote(note.id)} />
                    </div>
                    {note.moreNotes &&
                        <div className="sub-notes">
                            {note.moreNotes.map( (subNote) => {
                                return (<li className="note">
                                <p><span>{subNote.id} : </span>{subNote.details}</p>
                                {this.state.showAddSubNote === subNote.id  && <AddNote id={subNote.id} />}
                                </li>)
                            })}
                        </div> 
                    }
                    {this.state.showAddSubNote === note.id  && <AddNote id={note.id} />}
                </li>
            )
        })

        return (
            <div className="notes-app">
                <h2> Notes App </h2>

                <AddNote reloadNotes={this.loadHandler} id={0} />

                <div className="all-notes">
                    <ul>
                        {allNotes}
                    </ul>
                </div>

            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return { notesList : get(state, 'NotesReducer.notesList', [])}
}

const mapDispatchToProps = (dispatch) => {
    return {
        ...bindActionCreators({
            fetchNotes
        }, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Notes)