import Head from 'next/head'
import Image from 'next/image'
import CategoryShow from '../components/Category/CategoryShow/Index'
import { Layout } from '../Layout/Layout'

export default function Home() {
  return (
    <Layout>
         <CategoryShow/>
    </Layout>
  )
}
