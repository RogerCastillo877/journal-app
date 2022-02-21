import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NotesAppBar } from './NotesAppBar';
import { useForm } from '../../hooks/UseForm';
import { useEffect } from 'react';
import { activeNote, startDeleting } from '../../actions/notes';

export const NoteScreen = () => {

  const { active:note } = useSelector( state => state.notes );
  const dispatch = useDispatch();
  const [ formValues, hadleInputChange, reset ] = useForm( note );

  const { body, title, id } = formValues;

  const activeId = useRef( note.id );

  useEffect(() => {

    if( note.id !== activeId.current ) {
      reset( note );
      activeId.current = note.id
    }
  }, [note, reset])

  useEffect(() => {
    dispatch( activeNote( formValues.id, {...formValues}) );
  }, [dispatch, formValues])

  const handleDelete = () => {
    dispatch( startDeleting( id ) );
  }

  return (
      <div className='notes__main-content'>
          <NotesAppBar />
          <div className='notes__content'>
            <input
              type="text"
              placeholder='Some awesome title'
              className='notes__title-input'
              autoComplete='off'
              name="title"
              value={title}
              onChange={ hadleInputChange }
            />
            <textarea
              placeholder='What happend today'
              className='notes__textarea'
              name="body"
              value={body}
              onChange={ hadleInputChange }>
            </textarea>
            {
              (note.url) &&
              (<div className='notes__image'>
                <img
                  src={ note.url }
                  alt="ImageSelected" />
              </div>)
            }
          </div>
          <button
            className="btn btn-danger"
            onClick={ handleDelete }
          >Borrar</button>
      </div>
  )
};
