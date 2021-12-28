

import React , {useState,useEffect,useRef} from 'react'
import Filters from './components/filters.js'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Pagination from '@mui/material/Pagination';
import CircularProgress from '@mui/material/CircularProgress';

import TopBar from './components/topbar.js'
import Product from './components/product.js'
import SendRequest from '../api_utils.js'

import {useNavigate} from 'react-router-dom'
import {useParams} from 'react-router-dom'

export default function NavigationPage(){
  const firstUpdate = useRef(true);
  const {search_term} = useParams()

  const cancelSubmit = (e) => {
    e.preventDefault()
  }


  const navigate = useNavigate()

  const goToProductPage = (e) => {

    const id = e.currentTarget.id
    navigate('/product/' + id)

  }

  const [Products,setProducts] = useState({loading: true,products: null})

  ////////////////////////////////////////////

  // SEARCH ENGINE

  const [Search,setSearch] = useState(search_term || "")
  
  const onSearchChange = (e) => {
    setSearch(e.target.value)
  }


  useEffect(() => {
    const getProductsSearch = () => {
      setProducts({loading:true})
      const apiUrl = '/search?search=' + Search
      SendRequest(apiUrl,"GET",null,false)
        .then(response => response.json())
        .then(products => {
          setProducts({loading:false,products:products})
        })
    }

    getProductsSearch()

  }, [Search])


  /////////////////////////////////////////////


  // FILTERS ENGINE


  const [celulares,setcelulares] = useState(false)
  const [eletronicos,seteletronicos] = useState(false)
  const [relogios,setrelogios] = useState(false)
  const [calcados,setcalcados] = useState(false)
  const [bolsas,setbolsas] = useState(false)
  const [roupas,setroupas] = useState(false)
  const [nacional,setnacional] = useState(false)
  const [importado,setimportado] = useState(false)
  const [novo,setnovo] = useState(false)
  const [usado,setusado] = useState(false)
  const [promocao,setpromocao] = useState(null)
  const [frete_gratis,setfrete_gratis] = useState(null)
  const [min_price,setmin_price] = useState(null)
  const [max_price,setmax_price] = useState(null)
  const [rating,setrating] = useState(null)



  useEffect(() => {

    const getProductsFilter = () => {
      setProducts({loading:true})

      const apiUrl = '/filter?celulares=' + celulares + 
            '&eletronicos=' + eletronicos +
            '&relogios=' + relogios +
            '&calcados=' + calcados +
            '&bolsas=' + bolsas +
            '&roupas=' + roupas +
            '&nacional=' + nacional +
            '&importado=' + importado +
            '&novo=' + novo +
            '&usado=' + usado +
            '&promocao=' + promocao +
            '&frete_gratis=' + frete_gratis +
            '&min_price=' + min_price +
            '&max_price=' + max_price +
            '&rating=' + rating;

      SendRequest(apiUrl,"GET",null,false)
        .then(response => response.json())
        .then(products => {
          setProducts({loading:false,products:products})
        })
    }
    
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }else{
      getProductsFilter()
    }
  }, [celulares,eletronicos,relogios,calcados,bolsas,roupas,nacional,importado,novo,usado,promocao,frete_gratis,min_price,max_price,rating])
  /////////////////////////////////////////////////////////


  const render_products = () => {
    if(Products.loading){
      return <CircularProgress sx={{ color: '#fc2112', marginLeft: 10,marginTop:10}}/>
    }
    else{
      // need to return the map directly
      if (Products.products.length !== 0){
        return Products.products.map(product =>
                    <Product key={product.id} goToProductPage={goToProductPage} id={product.id} description={product.description} price={product.price} amount_sold={product.amount_sold} 
                    img={product.img} is_promotion={product.is_promotion} discount_rate={product.discount_rate} rating={product.rating}/>
                )
      }else {
        return <p style={{marginLeft: 10}}> Nenhum resultado Encontrado...</p>

      }


    }
  }


  return (
    <React.Fragment>
      <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>

        <TopBar submitfunc={cancelSubmit} search_term={Search} searchfunc={onSearchChange}/>

        <Grid item xs={3}>
         <Filters 
            setcelulares={setcelulares} 
            seteletronicos={seteletronicos}
            setrelogios={setrelogios}
            setcalcados={setcalcados}
            setbolsas={setbolsas}
            setroupas={setroupas}
            setnacional={setnacional}
            setimportado={setimportado}
            setnovo={setnovo}
            setusado={setusado}
            setpromocao={setpromocao}
            setfrete_gratis={setfrete_gratis}
            setmin_price={setmin_price}
            setmax_price={setmax_price}
            setrating={setrating}
            />
        </Grid>

        <Grid item xs={9}>
          
          <Grid container spacing={2}>

            {render_products()}

          </Grid>

        </Grid>

        <Grid item xs={3}>
        </Grid>

        <Grid item xs={9}>
          <Pagination count={10} size="large"  sx={{position:'absolute'}}/>
        </Grid>

      </Grid>
    </Box>

    </React.Fragment>
  )

}