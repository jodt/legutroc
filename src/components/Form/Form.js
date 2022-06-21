import React from 'react';
import './Form.css';

export function Form({ formFields, onSubmit, id, checkpassword}) {
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
              style={{border: !checkpassword  && field.id==='passwordConfirm'? 'solid red 2px': ''}}
            ></input>
          </React.Fragment>
        );
      })}
    </form>
  );
}
