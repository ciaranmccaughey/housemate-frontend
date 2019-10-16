import React from 'react';

const Modal = ({ children, closeModal, modalState, title, proceed }) => {
	if(!modalState) {
	  return null;
	}
	
	return(
	  <div className="modal is-active">
		<div className="modal-background" onClick={closeModal} />
		<div className="modal-card" style={{maxWidth: "300px"}}>
		  <header className="modal-card-head">
			<p className="modal-card-title">{title}</p>
			<button className="delete" onClick={closeModal} />
		  </header>
		  <section className="modal-card-body">
			<div className="content">
			  {children}
			</div>
		  </section>
		  <footer className="modal-card-foot">
			<a className="button" onClick={closeModal}>Cancel</a>
			<a className="button is-link" onClick={() => {
                proceed();
                closeModal();
                }}>Yes</a>
		  </footer>
		</div>
	  </div>
	);
  }

export default Modal;