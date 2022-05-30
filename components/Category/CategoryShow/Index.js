import React,{useState , useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { UncontrolledAccordion, AccordionItem, Button , AccordionHeader, AccordionBody, Row, Col, Input } from 'reactstrap';
import { updateCategory } from '../../../redux/actions/fooActions';
import { gql, useMutation } from "@apollo/client";
// import { useMutation } from "@apollo/react-hooks";

var query_value =  gql`
mutation Mutation($category: updateCategoryCreateInput!, $categoryUid: String!) {
    updateCategory(category: $category, categoryUid: $categoryUid) {
      message
      result {
        name
        parent {
          name
          uid
        }
        parents {
          name
          uid
        }
        uid
        updatedAt
        isActive
      }
    }
  } 
    `
 const CategoryShow = (props) => {
     const dispatch = useDispatch()
     const [allCategory, setAllCategory]= useState([])
     const [isOpen, setIsOpen] = useState(false);
     const [isIndex, setIsIndex] = useState(false);
     const [edit, setEdit] = useState([false]);
     const [formData , setFormData] = useState({});
     const [addArticle,{loading,data,error}] = useMutation(query_value)

     const selector =useSelector((state) => state)

    useEffect( () => {
        setAllCategory(selector.foo.foo)
        let editValue=[]
        selector.foo.foo.map(()=>{
            editValue.push(false)
        })
        setEdit(editValue)
    },[selector.foo])


    const toggle = (index) =>{
        setIsOpen(!isOpen)
        setIsIndex(index)
    } ;

    const handleChangeEdit = (e,index) => {
        let editValue = [...edit]
        editValue.splice(index,1,true)
         setEdit(editValue)
    }
  
    const handleChange = (e) => {
        let { name , value} = e.target
        setFormData({
            name :value
        })
    }
    const handleUpdate = async (id , index) => {
         const name = formData.name
        addArticle({variables:{
             "category": {
                "name": name
              },
              "categoryUid": id
            
        }}).then( (value) => {
            console.log(value);
            let categoryValue = value?.data?.updateCategory?.result
            let allCategoryValue = [...allCategory];
            allCategoryValue.splice(index,1,categoryValue)
            setAllCategory(allCategoryValue)
            let editValue = [...edit]
            editValue.splice(index,1,false)
            setEdit(editValue)
        })
        .catch( (e) => {
            console.log(e);
            // setFormError("An error occurred");
        });
        
    }

    // const [addTodo, { data, loading, error }] = useMutation(queryvalue);

    return (
        <Col md={12}>
            <Row>
          {
            allCategory && allCategory.length > 0 && allCategory.map((data , index)=>{
                return <>
                        
                            <Col  md={{
                                offset: 1,
                                size: 5
                            }}>
                            {
                              data?.parents?.length > 0 ?
                            <UncontrolledAccordion defaultOpen='10'>
                                <AccordionItem>
                                    
                                <AccordionHeader targetId={index}>
                                    {
                                         edit[index] ?
                                        <>
                                        <Input className="form-control mb-3 mt-3" name='categoryName' onChange={(e)=>handleChange(e)}   defaultValue={data.name}></Input>
                                        <Button color="primary" className='m-2 p-2' onClick={(e)=>handleUpdate(data.uid, index)}> Update</Button>
                                        </>
                                     :
                                      <>
                                      {data.name}
                                      </>
                                    }
                                </AccordionHeader>
                                <Button color="primary" className='m-3' onClick={(e)=>handleChangeEdit(e , index)}> Edit</Button>

                                <AccordionBody accordionId={index}>
                                    {
                                    data?.parent?.length > 0 ? 
                                    data?.parent?.length > 0 &&  data?.parent.map((parentValue , key)=>{
                                        return <>
                                        <Input className="form-control" readOnly="true" defaultValue={parentValue.name}></Input>
                                      
                                        </>
                                     })
                                    :
                                     data?.parents?.length > 0 &&  data?.parents.map((parentValue , key)=>{
                                        return <>
                                        <Input className="form-control" readOnly="true" defaultValue={parentValue.name}></Input>
                                       {/* <AccordionHeader targetId={key}>
                                           {parentValue.name}
                                        </AccordionHeader> */}
                                        </>
                                     })
                                    }
                               
                                   
                                
                                </AccordionBody>
                                </AccordionItem>
                            </UncontrolledAccordion>
                            :
                            <>
                            {
                             edit[index] ?
                             <>
                            <Input className="form-control mb-3 mt-3" name='categoryName' onChange={(e)=>handleChange(e)}   defaultValue={data.name}></Input>
                            <Button color="primary" className='m-2 p-2' onClick={(e)=>handleUpdate(data.uid, index)}> Update</Button>
                            </>
                             :
                            <Input className="form-control mb-3 mt-3"  readOnly="true"  defaultValue={data.name}></Input>
                            }
                            <Button color="primary" onClick={(e)=>handleChangeEdit(e , index)}> Edit</Button>
                            </>
                            }
                            </Col>
                </>
            })
        }
          </Row>
        </Col>
    );
  };

  

export default CategoryShow;

