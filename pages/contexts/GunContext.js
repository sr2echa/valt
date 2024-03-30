// import React from 'react';
import Gun from 'gun';

// const gun = Gun();

// export default gun;

// contexts/GunContext.js
import React from 'react';

let gun;

gun = Gun();

console.log('Gun instance from xcontext:', gun);
export default gun;
