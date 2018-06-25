import React, { Component } from 'react';



const Table = ({data, onCellChange}) => {

    return (
       <table className="table table-bordered">
           <thead>
               <tr>
                   <th>Qty</th>
                   <th>Description</th>
                   <th>Price (£)</th>
               </tr>
           </thead>
           <tbody>
               {data.map((row, index) => {
                   return (
                       <tr key={index}>
                           <td><input type='number' className='form-control' step='1' min="1" value={row[0]} onChange={() => onCellChange(index, 0)}/></td>
                           <td><input type='text' className='form-control' value={row[1]} onChange={() => onCellChange(index, 1)}/></td>
                           <td><input type='text' className='form-control' placeholder='6.00' value={row[2]}  onChange={() => onCellChange(index, 2)}/></td>
                       </tr>
                   );
               })}
           </tbody>
       </table>
     );
   };
   
   Table.propTypes = {
       data: React.PropTypes.array.isRequired
   };