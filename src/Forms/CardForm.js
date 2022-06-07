import React from "react";

export const CardForm = ({
  onSubmit,
  onCancel,
  cardInfo,
  setCardInfo,
  submitLabel,
  cancelLabel,
}) => {
  const inputChangeHandler = (event) => {
    setCardInfo({ ...cardInfo, [event.target.info]: event.target.value });
  };
  return (
    <form onSubmit={onSubmit}>
      <div className="form-group">
        <label htmlFor="card-front">Front</label>
        <textarea
          id="card-front"
          name="front"
          value={cardInfo.front}
          onChange={inputChangeHandler}
          placeholder="Front side of card"
          required
          className="form-control"
          rows="3"
        />
      </div>
      <div className="form-group">
        <label htmlFor="card-back">Back</label>
        <textarea
          id="card-back"
          name="back"
          value={cardInfo.back}
          onChange={inputChangeHandler}
          placeholder="Back side of card"
          required
          className="form-control"
          rows="3"
        />
      </div>
      <div
        className="btn-toolbar"
        role="toolbar"
        aria-label="Toolbar with button groups"
      >
        <div className="btn-group mr-2" role="group" aria-label="First group">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={onCancel}
          >
            {cancelLabel}
          </button>
        </div>
        <div className="btn-group" role="group" aria-label="First group">
          <button type="submit" className="btn btn-primary">
            {submitLabel}
          </button>
        </div>
      </div>
    </form>
  );
};


