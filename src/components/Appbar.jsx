import {AppBar,Button,Typography,Toolbar,IconButton,Drawer,List,ListItem,ListItemText,ListItemIcon,ListItemButton} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import {Description,Person,Inventory2} from '@mui/icons-material';
import '../App.css';
import {useHistory} from 'react-router-dom';
import {useState} from 'react';

export default function Appbar(){

    const history=useHistory();
    const [drawerOpen,setDrawerOpen]=useState(false);
    const eventItems=[
        {
            item:'Invoices',icon:<Description/>,link:'/invoices',
        },{
            item:'Customers',icon:<Person/>,link:'/customers',
        },{
            item:'Products',icon:<Inventory2/>,link:'/products',
        },
    ];

    const handleMenuItemClick=(item)=>{
        history.push(item);
        menuClose();
    }

    const menuOpen=()=>setDrawerOpen(true);
    const menuClose=()=>setDrawerOpen(false);

    const logoutUser=()=>{
        localStorage.removeItem('auth-token');
        history.push('/login');
    }

    const menuItems=()=>{
       return(
        <>
        {eventItems.map(({item,icon,link},index)=>{
            return(
                <List key={index}>
                <ListItem disablePadding>
                    <ListItemButton onClick={()=>handleMenuItemClick(link)}>
                    <ListItemIcon>{icon}</ListItemIcon>
                    <ListItemText primary={item}/>
                    </ListItemButton>
                </ListItem>
            </List>
            )
        })
        }
        </>
       )
    }


    return(
        <>
        <AppBar position="static">
            <Toolbar>
                <IconButton 
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{mr:2}}
                    onClick={menuOpen}
                    >
                <MenuIcon/>
                </IconButton>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                   Invoice app
                </Typography>
                <Button color="inherit" onClick={()=>logoutUser()}>Logout</Button>
                </Toolbar>
            </AppBar>
            <Drawer
            sx={{
                width: '240px',
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: { width: '240px', boxSizing: 'border-box' },
              }}
            anchor="left"
            open={drawerOpen}
            onClose={menuClose}
            >
            {menuItems()}
          </Drawer>
        </>
    )

}