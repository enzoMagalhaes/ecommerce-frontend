import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';

import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import {useNavigate} from 'react-router-dom'



export default function BasicMenu() {
  const navigate = useNavigate()

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };


  const [celulares, setcelulares] = React.useState(false);
  const [eletronicos, seteletronicos] = React.useState(false);
  const [relogios, setrelogios] = React.useState(false);
  const [calcados, setcalcados] = React.useState(false);
  const [bolsas, setbolsas] = React.useState(false);
  const [roupas, setroupas] = React.useState(false);

  const collapseClick = (value,setfunction) => {
    setfunction(!value);
  };

  const goToSearch = (e) => {
    const term  = e.currentTarget.id
    navigate('/navigate/'+term)
    window.location.reload(false);
  }


  return (
    <div>
      <Button
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        disableRipple
        sx={{color:'white'}}
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        Categorias
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >

          <List
            sx={{ width: '100%', maxWidth: 360 }}
            component="nav"
            aria-labelledby="nested-list-subheader"
          >



            <ListItemButton onClick={(e)=> {collapseClick(celulares,setcelulares)}} disableRipple>
              <ListItemText primary="Celulares" />
              {celulares ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>


            <Collapse in={celulares} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton sx={{ pl: 4 }} disableRipple>
                  <ListItemText primary="Iphone" id="iphone" onClick={(e) => {goToSearch(e)}}/>
                </ListItemButton>
                <ListItemButton sx={{ pl: 4 }} disableRipple>
                  <ListItemText primary="Motorola" id="smartphone motorola" onClick={(e) => {goToSearch(e)}}/>
                </ListItemButton>
                <ListItemButton sx={{ pl: 4 }} disableRipple>
                  <ListItemText primary="Samsung" id="Samsung" onClick={(e) => {goToSearch(e)}}/>
                </ListItemButton>
              </List>
            </Collapse>



            <ListItemButton onClick={(e)=> {collapseClick(eletronicos,seteletronicos)}} disableRipple>
              <ListItemText primary="Eletrônicos" />
              {eletronicos ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>

            <Collapse in={eletronicos} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton sx={{ pl: 4 }} disableRipple>
                  <ListItemText primary="TVs" id="TV" onClick={(e) => {goToSearch(e)}}/>
                </ListItemButton>
                <ListItemButton sx={{ pl: 4 }} disableRipple>
                  <ListItemText primary="Smart TVs" id="Smart TV" onClick={(e) => {goToSearch(e)}}/>
                </ListItemButton>
                <ListItemButton sx={{ pl: 4 }} disableRipple>
                  <ListItemText primary="Playstation 5" id="Playstation" onClick={(e) => {goToSearch(e)}}/>
                </ListItemButton>
                <ListItemButton sx={{ pl: 4 }} disableRipple>
                  <ListItemText primary="Kindles" id="kindle" onClick={(e) => {goToSearch(e)}}/>
                </ListItemButton>
              </List>
            </Collapse>




            <ListItemButton onClick={(e)=> {collapseClick(relogios,setrelogios)}} disableRipple>
              <ListItemText primary="Relógios" />
              {relogios ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>


            <Collapse in={relogios} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton sx={{ pl: 4 }} disableRipple>
                  <ListItemText primary="Smartwatches" id="smartwatch" onClick={(e) => {goToSearch(e)}}/>
                </ListItemButton>
                <ListItemButton sx={{ pl: 4 }} disableRipple>
                  <ListItemText primary="Rolex" id="rolex" onClick={(e) => {goToSearch(e)}}/>
                </ListItemButton>
              </List>
            </Collapse>




            <ListItemButton onClick={(e)=> {collapseClick(calcados,setcalcados)}} disableRipple>
              <ListItemText primary="Calçados" />
              {calcados ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>

            <Collapse in={calcados} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton sx={{ pl: 4 }} disableRipple>
                  <ListItemText primary="Adidas" id="adidas" onClick={(e) => {goToSearch(e)}}/>
                </ListItemButton>
                <ListItemButton sx={{ pl: 4 }} disableRipple>
                  <ListItemText primary="Nike" id="nike" onClick={(e) => {goToSearch(e)}}/>
                </ListItemButton>
              </List>
            </Collapse>




            <ListItemButton onClick={(e)=> {collapseClick(bolsas,setbolsas)}} disableRipple>
              <ListItemText primary="Bolsas" />
              {bolsas ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>

            <Collapse in={bolsas} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton sx={{ pl: 4 }} disableRipple>
                  <ListItemText primary="Lui Vitton" id="lui vitton" onClick={(e) => {goToSearch(e)}}/>
                </ListItemButton>
                <ListItemButton sx={{ pl: 4 }} disableRipple>
                  <ListItemText primary="Madisson Shoulder" id="madisson shoulder" onClick={(e) => {goToSearch(e)}}/>
                </ListItemButton>
              </List>
            </Collapse>


            <ListItemButton onClick={(e)=> {collapseClick(roupas,setroupas)}} disableRipple>
              <ListItemText primary="Roupas" />
              {roupas ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>


            <Collapse in={roupas} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton sx={{ pl: 4 }} disableRipple>
                  <ListItemText primary="Camisetas" id="camiseta" onClick={(e) => {goToSearch(e)}}/>
                </ListItemButton>
                <ListItemButton sx={{ pl: 4 }} disableRipple>
                  <ListItemText primary="Bermudas" id="bermuda" onClick={(e) => {goToSearch(e)}}/>
                </ListItemButton>
              </List>
            </Collapse>


          </List>          
      </Menu>
    </div>
  );
}