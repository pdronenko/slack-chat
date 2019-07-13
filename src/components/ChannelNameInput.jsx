import React from 'react';
import cn from 'classnames';

const ChannelNameInput = ({ input, disabled, label, children, meta: { touched, error, warning } }) => {
  const classes = cn({
    'form-control': true,
    'is-invalid': error,
  });
  return (
    <>
      <input {...input} type="text" className={classes} placeholder={label} disabled={disabled} />
      {children}
      <div className="invalid-feedback">
        {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
      </div>
    </>
  );
};

export default ChannelNameInput;
