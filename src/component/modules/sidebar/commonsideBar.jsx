import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ListItemText from '@mui/material/ListItemText';
import { MdDeviceUnknown } from "react-icons/md";
import InboxIcon from '@mui/icons-material/MoveToInbox'; 
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useToggleContext } from '../../../context/ToogleContext';
import { GrUserManager } from 'react-icons/gr';
import { LiaIndustrySolid } from 'react-icons/lia';
import { IoBookmark } from 'react-icons/io5';
import { FaSignOutAlt } from "react-icons/fa";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
  backgroundColor: 'black', // Background color
  color: 'white', // Text color
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
  backgroundColor: 'black', // Background color
  color: 'white', // Text color
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export default function CommonSideBar() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const { show, setShow } = useToggleContext();
  const navigate = useNavigate();

  const handleSignOut = () => {
    console.log("__________________",)
      // Proceed with logout
      // localStorage.removeItem(role);
      // localStorage.removeItem(userDetails);
      localStorage.removeItem("token");
      // navigating the user to the login page after logout
      navigate("/");
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <div className={`fixed top-0 left-0 right-0 z-50 bg-white shadow-md p-4 transition-all duration-300 ease-in-out ${show ? 'pl-[280px]' : 'pl-[100px]'}`}>
                <div className="max-w-full flex justify-between items-center">
                    <div className="flex items-center">
                        <h1 className="text-2xl sm:text-3xl lg:text-4xl px-2">
                            Device <span className="font-bold">Booking</span>
                        </h1>
                    </div>
                    {/* <div className="hidden sm:flex items-center space-x-4">
                        <AiOutlineSearch size={24} />
                        <AiOutlineClose size={24} />
                    </div> */}
                </div>
      </div>
      <Drawer variant="permanent" open={show}>
        <DrawerHeader>      
          <IconButton onClick={() => setShow(!show)}
          style={{ color: show ? 'white' : 'white' }}
          >
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon/>}
          </IconButton>
          
        </DrawerHeader>
        <div className='flex items-center justify-center !bg-[rgba(107,114,128,.5)] mt-1.5 w-full max-w-[0%] h-[1px] ml-auto mr-auto'>
        </div>
        <List>
        <ListItem disablePadding sx={{ display: 'block' }} onClick={() => navigate("/dashboard")}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: show ? 'initial' : 'center',
                px: 2.5,
              }}
              // disabled={!show}
            >
              <DashboardIcon size={25} className={`${show ? 'mr-4' : 'mr-0'}`} />
              {show && (
                <ListItemText className={`${show ? 'block' : 'hidden'}`} primary="Dashboard" sx={{ opacity: show ? 1 : 0 }} />
              )}
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding sx={{ display: 'block' }} onClick={() => navigate("/booking")}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: show ? 'initial' : 'center',
                px: 2.5,
              }}
              // disabled={!show}
            >
              <IoBookmark size={25} className={`${show ? 'mr-4' : 'mr-0'}`} />
              {show && (
                <ListItemText primary="Booking" sx={{ opacity: show ? 1 : 0 }} />
              )}
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding sx={{ display: 'block' }} onClick={() => navigate("/device")}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
              }}
              // disabled={!show}
            >
              <MdDeviceUnknown size={25} className={`${show ? 'mr-4' : 'mr-0'}`} />
              {show && (
                <ListItemText primary="Device" sx={{ opacity: show ? 1 : 0 }} />
              )}
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding sx={{ display: 'block' }} onClick={() => navigate("/company")}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: show ? 'initial' : 'center',
                px: 2.5,
              }}
              // disabled={!show}
            >
              <LiaIndustrySolid size={25} className={`${show ? 'mr-4' : 'mr-0'}`} />
              {show && (
                <ListItemText primary="Company" sx={{ opacity: show ? 1 : 0 }} />
              )}
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding sx={{ display: 'block' }} onClick={() => navigate("/manager")}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: show ? 'initial' : 'center',
                px: 2.5,
              }}
              // disabled={!show}
            >
              <GrUserManager size={25} className={`${show ? 'mr-4' : 'mr-0'}`} />
              {show && (
                <ListItemText className={`${show ? 'block' : 'hidden'}`} primary="Manager" sx={{ opacity: show ? 1 : 0 }} />
              )}
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding sx={{ display: 'block' }} onClick={() => navigate("/user")}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: show ? 'initial' : 'center',
                px: 2.5,
              }}
              // disabled={!show}
            >
              <GrUserManager size={25} className={`${show ? 'mr-4' : 'mr-0'}`} />
              {show && (
                <ListItemText primary="user" sx={{ opacity: show ? 1 : 0 }} />
              )}
            </ListItemButton>
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem disablePadding sx={{ display: 'block' }} onClick={handleSignOut} className='mt-[490px]'>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: show ? 'initial' : 'center',
                px: 2.5,
              }}
              // disabled={!show}
            >
              <FaSignOutAlt size={25} className={`${show ? 'mr-4' : 'mr-0'}`} />
              {show && (
                <ListItemText  primary="Sign out"  sx={{ opacity: show ? 1 : 0 }} />
              )}
            </ListItemButton>
          </ListItem>
        </List>
        <Divider />
      </Drawer>
    </Box>
  );
}
