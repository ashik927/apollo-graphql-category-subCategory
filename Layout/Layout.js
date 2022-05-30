import React , {useState , useEffect} from 'react'
import { useRouter } from 'next/router'
import { Loader } from '../components/Loader'
import { getIsMobile } from '../redux/actions/fooActions'
import { useDispatch } from 'react-redux'


export const Layout = (props) => {
  const [loading , setLoading] =useState (true)
  const [isMobile , setIsMobile] =useState (false)
  const router = useRouter()
  const dispatch = useDispatch()
  
  useEffect(() => {
    setIsMobile(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent))
    dispatch(getIsMobile(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)));
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1000);
  }, [router.pathname])
  return (
    <>
    {
    loading ? 
    <>
     <Loader isMobile={isMobile}/>
     </>
    :
    <div id="layout-wrapper">
        <div className="main-content">{props.children}</div>
      </div>
    }
     
    </>
  )
}
