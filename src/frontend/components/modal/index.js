import { useState, useRef, useEffect } from 'react';
import './modal.css';
import { acceptedFileTypes, InputImages } from '../../utility/constants';
import Emojis from './Emojis';
import { useOutsideClick } from '../../helper';

export function NewPostModal({ setNewPostModal }) {
  const emojiRef = useRef(null);
  const EmojiClickedOutside = useOutsideClick(emojiRef);
  const [showEmoji, setShowEmoji] = useState(false);
  const [form, setForm] = useState({
    title: '',
    description: '',
    selectedFile: null
  });

  useEffect(() => {
    if (EmojiClickedOutside) {
      setShowEmoji(false);
    }
  }, [EmojiClickedOutside]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
  };

  const onFileChange = (e) => {
    const file = e.target.files[0];
    if (acceptedFileTypes.includes(file.type)) {
      setForm({ ...form, selectedFile: URL.createObjectURL(file) });
      // used in axios, for sending data to server
      // const formData = new FormData();
      // formData.append('myFile', file, file.name);
    }
  };

  const handleImageRemove = () => {
    setForm({ ...form, selectedFile: null });
  };

  return (
    <div className='modal modal__open flex-ct-ct'>
      <div
        className='modal__background'
        onClick={() => setNewPostModal(false)}
      ></div>
      <div className='modal__content sm-s'>
        <h1 className='lg cen xs-s mg--half'>NEW POST</h1>
        <hr />
        <div className='flex-ct-ct mg--half'>
          <div className='modal__pic__ctr'>
            <img
              src='https://www.w3schools.com/howto/img_avatar.png'
              className='modal__pic'
              alt='profilePic'
            />
          </div>
          <div className='modal__input'>
            {form?.selectedFile && (
              <div className='uploaded__image__ctr'>
                <i
                  className='fa-solid fa-circle-xmark cancelImage'
                  onClick={handleImageRemove}
                ></i>
                <img
                  src={form?.selectedFile}
                  className='uploaded__banner'
                  alt='uploaded__banner'
                />
              </div>
            )}
            <form onSubmit={handleFormSubmit}>
              <input
                type='text'
                className='input post__input'
                placeholder='Title'
                value={form?.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />
              <textarea
                className='input post__textarea'
                placeholder='Description'
                value={form?.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
              ></textarea>
              <hr />
              <div className='modal__submit__ctr mg--full'>
                <section className='emojiCtr flex-ct-st'>
                  <label htmlFor='ImageInput'>
                    <img alt='imageInput' src={InputImages.image} />
                    <input
                      type='file'
                      id='ImageInput'
                      onChange={onFileChange}
                      multiple
                      accept='image/*'
                      hidden
                    />
                  </label>
                  <img
                    alt='emojiInput'
                    src={InputImages.emoji}
                    onClick={() => setShowEmoji(true)}
                  />
                  {showEmoji && (
                    <div ref={emojiRef}>
                      <Emojis setForm={setForm} />
                    </div>
                  )}
                </section>
                <button type='submit' className='btn btn--auth--solid sb'>
                  Create Post
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <span className='modal__close' onClick={() => setNewPostModal(false)}>
        <i className='fas fa-times-circle'></i>
      </span>
    </div>
  );
}
