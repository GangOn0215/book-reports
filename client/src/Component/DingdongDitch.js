// study React.memo

import React, { useState, useEffect } from "react";

const Bell202 = React.memo(({ call }) => {
  useEffect(() => {
    console.log('Rerender Bell202');
  });

  return <div>{`Bell 202!! ${call}`}</div>
});

const Bell303 = React.memo(({ call }) => {
  useEffect(() => {
    console.log('Rerender Bell303');
  });

  return <div>{`Bell 303!! ${call}`}</div>
});

/* 
 * 한국에서 어릴때 유행했던 벨튀 (DingDong Ditch) 를 바탕으로 만들어본 예제 입니다. 
 * 아파트가 하나 있고 202호 벨을 누르고 튀었습니다.
 * 
 * 그런데 303호 벨도 같이 울립니다.
 * 
 * call202 state 값이 변했기 때문에 rerender 현상이 발생한것인데 상위 컴포넌트인 DingdongDitch state 값이 변하여 리랜더링이 되면서
 * 하위 컴포넌트인 Bell303 컴포넌트도 리랜더링이 되어버립니다.
 * 
 * 컴포넌트가 리랜더링이 되는 기준은
 * 1. 새로운 props가 들어오거나 (업데이트)
 * 2. 부모 컴포넌트가 리랜더링이 되었을때
 * 
 * 이제 React.memo를 적용해보겠습니다. 
 * 
*/

const DingdongDitch = () => {
  const [call202, setCall202] = useState(0);
  const [call303, setCall303] = useState(0);

  return (
    <div>
      <Bell202 call={call202}/>
      <button onClick={() => setCall202(call202 + 1)}>Bell 202</button>

      <Bell303 call={call303}/>
      <button onClick={() => setCall303(call303 + 1)}>Bell 303</button>
    </div>
  )
}

export default React.memo(DingdongDitch);