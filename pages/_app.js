import '../styles/globals.css'
import { wrapper } from "../redux";
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from '../redux/actions/fooActions';
import { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ApolloProvider } from "@apollo/client";
import client from "../apollo-client";

function MyApp({ Component, pageProps }) {

  const selector =useSelector((state) => state)
  const dispatch = useDispatch()
  useEffect( () => {
    // const data = await getData(process.env.BASE_URL)
    // console.log(data)
  dispatch(getPosts());

 },[])

  return <ApolloProvider client={client}>
    <Component {...pageProps} />
  </ApolloProvider>
}

export default wrapper.withRedux(MyApp)
