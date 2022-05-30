import { gql, useMutation } from '@apollo/client';
import React,{useState , useEffect} from 'react';
import { useSelector } from 'react-redux';
import { Button, Col, Input, Row } from 'reactstrap';
import Swal from 'sweetalert2';


var add_category =  gql`
mutation Mutation($category: CategoryCreateInput!) {
    createCategory(category: $category) {
      message
      result {
        name
        parent {
          name
        }
        uid
      }
    }
  }
    `

 const CategoryShow = (props) => {

    const [categoryName , setCategoryName] = useState('')
    const [categoryID , setCategoryID] = useState('')
    const [allCategory, setAllCategory]= useState([])
    const selector =useSelector((state) => state)

    const [categoryAdd,{loading,data,error}] = useMutation(add_category)

    useEffect( () => {
        setAllCategory(selector.foo.foo)
    },[selector.foo])

    const handleChange = (e) => {
        let { name , value} = e.target
        setCategoryName(value)
    }

    
    const handleChangeID = (e) => {
        setCategoryID(e.target.value)
    }

    const categoryAddData = (e) => {
        
        categoryAdd({variables:{
            "category": {
                "name": categoryName,
                "parentCategoryUid": categoryID
              },
           
       }}).then( (value) => {
           if(value.data.createCategory.message == 'CATEGORY_NAME_EXIST'){
            Swal.fire(
                'Sorry',
                'CATEGORY_NAME_EXIST',
                'question'
              )   
           }else{
            setCategoryName('')
            Swal.fire(
                'Thanks!',
                'Categry Add Successfully',
                'success'
              ) 
           }
           
       })
       .catch( (e) => {
        Swal.fire(
            'Sorry',
            'Please Select a Category',
            'question'
          )  
       });
    }
    
    return (
        <Col md={12} className='m-5'>
            <Row>
               <Col md={6}>
                   <Input name="categoryName" placeholder='Enter Category Name' value={categoryName} onChange={(e)=>handleChange(e)}></Input>
               </Col>
               <Col md={6}>
               <select onChange={(e)=>handleChangeID(e)}>
                   {
                      allCategory && allCategory.length > 0 && allCategory.map((category)=>{
                           return <>
                             <option value={category.uid}>{category.name}</option>
                           </>
                       })
                   }
                </select>               
                </Col>
                <Col md={12}>
                  <Button color="primary" onClick={() =>categoryAddData()}> Save</Button>
                </Col>
            </Row>
        </Col>
    );
  };

  

export default CategoryShow;

