import React,{useEffect, useState} from 'react';
import { Container,Box,Typography,TextField,Stack,LinearProgress } from "@mui/material"
import { LoadingButton } from '@mui/lab';
import Appbar from "../Appbar";
import {API_PRODUCTS} from '../../Utilities';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function AddProduct({props}){

    const path=props.path;
    const productId=props.computedMatch.params.id;
    const history=useHistory();
    const authToken=localStorage.getItem('auth-token');
    const productDefaults={name:'',price:'',tax:'',hsn:'',stock:''}
    const [productDetails,setProductDetails]=useState(productDefaults);
    const [loading,setLoading]=useState(false);
    const [requestType,setRequestType]=useState('Add');

    const handleChange=({target:{name,value}})=>setProductDetails({...productDetails,[name]:value});
    

    const addProduct=async()=>{
        setLoading(true);
        await axios.post(API_PRODUCTS,{
            ...productDetails,
        },{
            headers:{auth:authToken}
        }).then(function(res){
            if(res.status===200) {
                //setAlert({...alert,show:true,message:`${eventDetails.type} added successfully`,type:'success'});
               toast.success(`Product added successfully`);
               clearInputFields();
               history.push('/products');
            }
        }).catch(function(err){
            console.log(err.response);
            if(err.response.status===401) {
                toast.error('Log in to continue, redirecting');
                history.push('/login');
            } else{
               toast.error(err.response.data.message);
                setLoading(false);
            }
            
        })
        setLoading(false);
    }

    const updateProduct=async()=>{
        setLoading(true);
        await axios.put(`${API_PRODUCTS}/${productId}`,{
            ...productDetails,
        },{
            headers:{auth:authToken}
        }).then(function(res){
            if(res.status===200){
                //setAlert({...alert,show:true,message:`${eventDetails.type} updated successfully`,type:'success'});
                toast.success(`Product updated successfully`);
                clearInputFields();
            }
        }).catch(function(err){
            console.log(err.response);
            if(err.response.status===401) {
                toast.error('Log in to continue, redirecting');
                history.push('/login');
            } else{
                toast.error(err.response.data.message);
            }
            
        })
        setLoading(false);
    }

    const clearInputFields=()=>setProductDetails(productDefaults);

    useEffect(()=>{

        function findType(){
            if(path==='/products/edit/:id') {
                setRequestType('Edit');
                getProductById(productId);
            }
        }

        async function getProductById(productId){
            await axios.get(`${API_PRODUCTS}/id/${productId}`,{
                headers:{auth:authToken}
            }).then(function(res){
                if(res.data) {
                    console.log(res.data);
                    delete res.data._id;
                    delete res.data.userId;
                    delete res.data.createdAt;
                    console.log(res.data);
                    setProductDetails({...res.data});
                }
            }).catch(function(err){
                console.log(err.response);
            })
        }

        findType();

    },[path,productId,authToken])

    return (
        <>
        <Appbar/>
        {loading?<LinearProgress color="secondary"/>:<></>}
        <Container sx={{mt:2}}>
            <Box>
                <Typography variant="h4">{requestType} product</Typography>
            </Box>
            <Stack direction="column" spacing={2} sx={{mt:2}}>
                <Stack direction="row" spacing={2}>
                    <TextField onChange={handleChange} value={productDetails.name} fullWidth type="text" required variant="filled" name="name" label="Name"></TextField>
                    <TextField onChange={handleChange} value={productDetails.price} fullWidth type="email" variant="filled" required name="price" label="Price (₹)"></TextField>
                </Stack>
                <Stack direction="row" spacing={2}>
                <TextField onChange={handleChange} value={productDetails.tax} required fullWidth variant="filled" name="tax" label="Tax %"></TextField>
                <TextField onChange={handleChange} value={productDetails.hsn} fullWidth variant="filled" name="hsn" label="HSN code"></TextField>
                <TextField onChange={handleChange} value={productDetails.stock} required fullWidth variant="filled" name="stock" label="Stock in hand"></TextField>
                </Stack>
                <Stack direction="row" spacing={1} justifyContent="flex-end">
                    {requestType==='Add'
                    ?<LoadingButton onClick={addProduct} loading={loading} variant="outlined" size="large" color="primary">Add product</LoadingButton>
                    :<LoadingButton onClick={updateProduct} loading={loading} variant="outlined" size="large">Update product</LoadingButton>}
                    <LoadingButton  onClick={()=>setProductDetails(productDefaults)} variant="outlined" size="large" color="warning">Clear</LoadingButton>
                    <LoadingButton onClick={()=>history.push(`/products`)} variant="outlined" size="large" color="error">Close</LoadingButton>
                </Stack>
            </Stack>
        </Container>
        </>
    )

}