import React from 'react'
import { Outlet } from 'react-router-dom'
import MyHeader from '../Component/MyHeader'
import Footer from '../Component/Footer'
import ScrollToTop from '../Component/ScrolToTop'

const BasicLayout = () => {
    return (
    <>
     <ScrollToTop />
    <MyHeader/>
    <Outlet />
    <Footer/>
    </>) }
    
export default BasicLayout