import React from 'react';
import { Toast, ToastBody, ToastHeader } from 'reactstrap';

const ToastPop = (props) => {
  return (
    <div>
      <div className="p-3 my-2 rounded bg-docs-transparent-grid">
        <Toast>
          <ToastHeader>Product</ToastHeader>
          <ToastBody>Add item to cart</ToastBody>
        </Toast>
      </div>
    </div>
  );
};

export default ToastPop;
