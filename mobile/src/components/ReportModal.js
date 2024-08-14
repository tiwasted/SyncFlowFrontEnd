import React from 'react';
import Modal from 'react-modal';
import '../styles/ReportModal.css';

Modal.setAppElement('#root');

const ReportModal = ({
    isOpen,
    task,
    content,
    photos,
    setContent,
    handleFileChange,
    handleSubmitReport,
    handleClose,
    handleDeleteImage,
}) => (
    <Modal
        isOpen={isOpen}
        onRequestClose={handleClose}
        className="custom-modal"
        overlayClassName="custom-overlay"
    >
        <div className="modal-content">
            <div className="modal-header">
                <h3>Отчет для {task?.order_name}</h3>
                <span className="close" onClick={handleClose}>&times;</span>
            </div>
            <form onSubmit={handleSubmitReport}>
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                />
                <div className="photo-upload">
                    <label htmlFor="photo-input" className="photo-upload-label">
                        Загрузить фото
                    </label>
                    <input
                        id="photo-input"
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={(e) => handleFileChange(Array.from(e.target.files))}
                        className="photo-upload-input"
                    />
                    <div className="photo-preview">
                        {photos.map((photo, index) => (
                            <div key={index} className="photo-preview-item">
                                <img
                                    src={URL.createObjectURL(photo)}
                                    alt={`Изображение ${index + 1}`}
                                    className="photo-thumbnail"
                                />
                                <button type="button" onClick={() => handleDeleteImage(index)}>Удалить</button>
                            </div>
                        ))}
                    </div>
                </div>
                <button className='report-button' type="submit">Отправить отчёт</button>
            </form>
            <button className="cancel-btn" onClick={handleClose}>Отмена</button>
        </div>
    </Modal>
);

export default ReportModal;
