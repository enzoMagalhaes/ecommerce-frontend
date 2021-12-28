import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';

import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';



export default function BasicMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };


  const [categoriesCollapse, setcategoriesCollapse] = React.useState(true);

  const categories_click = () => {
    setcategoriesCollapse(!categoriesCollapse);
  };


  return (
    <div>
      <Button
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        diableRipple
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



            <ListItemButton>
              <ListItemText primary="Celulares"/>
            </ListItemButton>

            <ListItemButton>
              <ListItemText primary="Eletrônicos" />
            </ListItemButton>

            <ListItemButton>
              <ListItemText primary="Relógios" />
            </ListItemButton>

            <ListItemButton>
              <ListItemText primary="Calçados" />
            </ListItemButton>

            <ListItemButton>
              <ListItemText primary="Bolsas" />
            </ListItemButton>

            <ListItemButton>
              <ListItemText primary="Roupas Masculinas" />
            </ListItemButton>



            <ListItemButton onClick={categories_click} diableRipple>
              <ListItemText primary="Inbox" />
              {categoriesCollapse ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>


            <Collapse in={categoriesCollapse} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton sx={{ pl: 4 }} diableRipple>


                  <ListItemText primary="Starred" />
                </ListItemButton>
              </List>
            </Collapse>



          </List>          
      </Menu>
    </div>
  );
}