import React from "react";

const Msg = () => {
  return (
    <div
      onClick={() => {
        alert(111);
      }}
    >
      消息页面
    </div>
  );
};

export default Msg;
