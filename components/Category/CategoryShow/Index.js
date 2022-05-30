import React,{useState , useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { UncontrolledAccordion, AccordionItem, Button , AccordionHeader, AccordionBody, Row, Col, Input } from 'reactstrap';
import { updateCategory } from '../../../redux/actions/fooActions';
import { gql, useMutation } from "@apollo/client";
// import { useMutation } from "@apollo/react-hooks";

var query_value =  gql`
            mutation { 
                updateCategory ( 
                categoryUid: "C-JA72EM" 
                category: { 
                name: "TEST-101" 
                } 
                ) 
                { 
                message 
                statusCode 
                result { 
                uid 
                name 
                parent { 
                uid 
                name 
                } 
                parents { 
                uid 
                name 
                } 
                isActive 
                inActiveNote 
                createdAt 
                updatedAt 
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
     debugger
     const [mutate] = useMutation(query_value)

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
        // debugger
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
        try {
            const { data } = await mutate()
        }
          catch (e) {
            setError(e)
          }
        
    }

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
                                    {data.name}
                                </AccordionHeader>
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
                            {/* <Button color="primary" onClick={(e)=>handleChangeEdit(e , index)}> Edit</Button> */}
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
