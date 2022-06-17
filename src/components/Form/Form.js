import React from 'react';
import './Form.css';

export function Form({ formFields, onSubmit, id }) {
  return (
    <form onSubmit={onSubmit}>
      {formFields.map((field, index) => {
        return (
          <React.Fragment key={index}>
            {field.id && <label htmlFor={field.id}>{field.label}</label>}
            <input
              required
              autoComplete="off"
              id={id}
              type={field.type}
              pattern={field.pattern}
              placeholder={field.placeholder}
              onChange={field.onChange}
              value={field.value}
              name={field.name}
            ></input>
          </React.Fragment>
        );
      })}
    </form>
  );
}
