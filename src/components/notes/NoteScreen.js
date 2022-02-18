import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NotesAppBar } from './NotesAppBar';
import { useForm } from '../../hooks/UseForm';
import { useEffect } from 'react';

export const NoteScreen = () => {

  const { active:note } = useSelector( state => state.notes );
  const dispatch = useDispatch();
  const [ formValues, hadleInputChange, reset ] = useForm( note );

  const { body, title } = formValues;

  const activeId = useRef( note.id ); 

  useEffect(() => {

    if( note.id !== activeId.current ) {
      reset( note );
      activeId.current = note.id
    }
  }, [note, reset])

  return (
      <div className='notes__main-content'>
          <NotesAppBar />
          <div className='notes__content'>
            <input
              type="text"
              placeholder='Some awesome title'
              className='notes__title-input'
              autoComplete='off'
              value={title}
              onChange={ hadleInputChange }
            />
            <textarea
              placeholder='What happend today'
              className='notes__textarea'
              value={body}
              onChange={ hadleInputChange }>
            </textarea>
            {
              (note.url) &&
              (<div className='notes__image'>
                <img
                  src=""
                  alt="ImageSelected" />
              </div>)
            }
          </div>
      </div>
  )
};
