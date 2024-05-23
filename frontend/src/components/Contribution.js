import React from 'react';
import { useEffect } from 'react';
import AxiosInstance from './Axios';
import { useState } from 'react';
import { useMemo } from 'react';
import { MaterialReactTable } from 'material-react-table';
import { Box,   useMediaQuery } from '@mui/material';
import { IconButton } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import {Link} from 'react-router-dom';


const Contribution = () => {
    const[myData, setMydata]=useState()
    const[loading,setLoading] = useState(true)


     const GetData = () => {
        AxiosInstance.get(`person_course/`).then((res) => {
          console.log(res)
          let d = res.data
          console.log('d',d)
          // for (let i=0 ; i<d.length ;i++){
          //   d[i]['courses'] = d[i]['courses'] && d[i]['courses'].map(e=> <>{e.course_id} {e.name}<br/></>)  
          //   // d[i]['courses'] = [1, 2, 3, 4]
          // }

          
           setMydata(res.data) 
           console.log(res.data)
           setLoading(false)
    })


     }
    useEffect(() => { 

        GetData();
   
    },[])





   
      const columns = useMemo(
        () => [
          {
            accessorKey: 'person_full', //normal accessorKey
            header: 'Name',
            size: 50,
          },

          {
            accessorKey: 'course_full', //normal accessorKey
            header: 'Course',
            size: 50,
          },

          {
            accessorKey: 'amount', //normal accessorKey
            header: 'Amount',
            size: 4,
          },

        ],
        [],
      );
    

    



    return(
        <div>
            { loading ? <p>Loading data ...</p> :
            <MaterialReactTable 
            // isMultiSortEvent={true} 
            // maxMultiSortColCount={3}
            initialState={{
              
              sorting:
                [{
                  id :'semester',
                  desc : false,
                }],
              
              columnVisibility: { description: false },
              pagination:{
                pageSize:300,
                pageIndex:0, },
              showColumnFilters: true,
              // enablePagination:false,
      
            }}
                enableRowActions
                columns={columns} 
                data={myData}
                enableColumnFilters
                
                renderRowActions={({row}) => (
                    <Box sx={{ display: 'flex', flexWrap: 'nowrap', gap: '8px' }}>

                    <IconButton color="secondary" component = {Link} to={`edit/${row.original.id}`}>
                        <EditIcon />
                    </IconButton>

                    {/* <IconButton color="error" component = {Link} to={`delete/${row.original.id}`}>
                        <DeleteIcon />
                    </IconButton> */}
                    </Box>
      )}

            />
        }
        </div>
        
    )
}



export default Contribution