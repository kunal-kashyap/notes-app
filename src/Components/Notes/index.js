import React, { Component, Fragment } from 'react';
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
        notes: []
    }

    componentDidMount(){
        this.loadHandler();
    }

    loadHandler = () => {
        axios.get('/notes')
             .then((resp) => {resp.status === 200 && this.props.fetchNotes(resp.data)})
             .catch((err) => console.log('Error Occured: ', err))
    }


    render() {
        const {notesList} = this.props;

        const allNotes = notesList && notesList.map((note) => {
            return (
                <li className="note">
                    <p>{note.details}</p>
                    <div className="btn-group">
                        <Button type="button" btnClass="btn btn-danger" value="Delete Note"/>
                        <Button type="button" btnClass="btn btn-success" value="Add Sub Note"/>
                    </div>
                </li>
            )
        })

        return (
            <div className="notes-app">
                <h2> Notes App </h2>

                <AddNote id={6} />

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