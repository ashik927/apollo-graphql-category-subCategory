import axios from "axios";
import { FOO, ISMOBILE , CATEGORY_UPDATE } from "../actionTypes";
import { gql , useMutation } from "@apollo/client";
import client from "../../apollo-client";


export const getCategory = () => async (dispatch) =>{
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
  dispatch({ type: FOO, payload: data.getCategories.result.categories })
}



export const updateCategory = () => async (dispatch,value) =>{
  dispatch({ type: CATEGORY_UPDATE, payload: value })
}
  


  export const getIsMobile = (isMobile) => {
    return (dispatch) => {
      dispatch({ type: ISMOBILE, payload: isMobile });
    };
  };

  