import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState, useContext } from 'react';
import { styled } from '@mui/material/styles';
import {getRandomDate, getRowClass} from './utils';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import {ColorModeContext} from './App';
import ClickAwayListener from '@mui/base/ClickAwayListener';

const StyledBox = styled(Box)(() => ({
    position: 'fixed',
    top: '0px', 
    left: "0px", 
    zIndex: '10', 
    width: '100%', 
    height: '100vh', 
    backgroundColor: 'rgba(192, 192, 192, 0.55)',
    display: 'flex',
    alignItems: 'center',
    justifyContent:'center'

}))

const StyledDataGrid = styled(DataGrid)(() => ({
    marginTop: '20px',
    color: '#389100',
    fontSize: '14px',
    fontFamily: 'Calibri, sans-serif',
    textAlign: 'left',

    '& .MuiDataGrid-row': {
        minHeight: '100px',
        maxHeight: '300px',
        height: 'max-content',
    },

    '& .super-app-theme--cell-id':{
        color: '#666666',
    },
    '& .super-app-theme--cell-title':{
        color: '#002C91',
    },
    '& .super-app-theme--cell-date':{
        color: '#800012',
    },
    '& .super-app-theme--cell-imageUrl':{
        color: '#650091',
    },
    '& .super-app-theme--Even': {
        backgroundColor: '#EEF3FF',
        '&:hover': {
            backgroundColor: '#D8E4FF',
        },
    },
    '& .super-app-theme--Odd': {
        backgroundColor: '#FFEEF3',
        '&:hover': {
            backgroundColor: '#FFD8E4',
        },
    }
}));

const Table = () => {
    const theme = useTheme();
    const colorMode = useContext(ColorModeContext);
    const [rows, setRows] = useState([]);
    const [openedImageUrl, setOpenedImageUrl] = useState();

    const columns = [
        { field: "id", width: 100, cellClassName: 'super-app-theme--cell-id',},
        { field: "date", headerName: "date", width: 100, cellClassName: 'super-app-theme--cell-date', },
        { field: "image", 
            headerName: "image", 
            width: 150, 
            renderCell: (params) => <img src={params.value} onClick={()=> setOpenedImageUrl(params.value)} alt='colored square 150x150'/> },
        { field: "title", 
            headerName: "title", 
            width: 300, 
            renderCell: (params) => <p>{params.value}</p>, 
            cellClassName: 'super-app-theme--cell-title',
        },
        { field: "imageUrl", 
            headerName: "image url", 
            width: 300,
            cellClassName: 'super-app-theme--cell-imageUrl',
        },
    ];

    const getData = async () => {
        let result = await fetch('https://jsonplaceholder.typicode.com/photos?albumId=1')
        .then((response) => response.json());
        setRows(result.map((i) => {return {
            id: i.id,
            date: getRandomDate().toLocaleDateString(), 
            image: i.thumbnailUrl,
            title: i.title,
            imageUrl: i.url,
        }}));
    };

    useEffect(() => {
        getData();
    },[]);

    return (
        <Box sx={{bgcolor: `${theme.palette.mode === 'light' ? '#fff':'#696969'}`, padding:'30px 50px', position: 'relative'}}>
            {openedImageUrl && 
                <StyledBox>
                    <ClickAwayListener onClickAway={()=> setOpenedImageUrl(undefined)}>
                        <img src={openedImageUrl.replace('150', '600')} alt='colored square 600x600'/>
                    </ClickAwayListener>
                </StyledBox> 
            }
            <Button 
                variant='contained'
                onClick={colorMode.toggleColorMode} 
                color="inherit"
            >
                {theme.palette.mode} mode 
            </Button>
            <StyledDataGrid
                rows={rows} 
                columns={columns}
                getRowClassName={(params) => `super-app-theme--${getRowClass(params.row.id)}`}
                getRowHeight={() => 'auto'}
            />
        </Box>
    );
  }

export default Table