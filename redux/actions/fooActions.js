import axios from "axios";
import { FOO, ISMOBILE } from "../actionTypes";
import { gql , useMutation } from "@apollo/client";
import client from "../../apollo-client";


export const getPosts = () => async (dispatch) =>{
    const { data } = await client.query({
      query: gql`
      { 
        getCategories( 
        pagination: { 
        limit: 100 
        skip: 0 
        } 
        ) 
            { 
              message 
              statusCode 
                 result { 
                   count 
                  categories { 
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
              } 
             
      `,
    });
  console.log(data)
  dispatch({ type: FOO, payload: data.getCategories.result.categories })
}



export const updateCategory = () => async (id , value) =>{
  const query =  gql`
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
  
  const [toggleTodoMutation] = useMutation(query);
  debugger
console.log(toggleTodoMutation)
dispatch({ type: FOO, payload: data.getCategories.result.categories })
}
  


  export const getIsMobile = (isMobile) => {
    return (dispatch) => {
      dispatch({ type: ISMOBILE, payload: isMobile });
    };
  };

  