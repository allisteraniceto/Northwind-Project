/*


Installing @smastrom/react-rating

The MIT License (MIT)

Copyright (c) 2024 smastrom

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
/*<div dangerouslySetInnerHTML={{ __html: "<!-- comment text -->" }} />;*/

import { Rating } from "@smastrom/react-rating";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import config from "../../config.json";

import "@smastrom/react-rating/style.css";

import "../styles/StarRanking.css";

/*
interface Props {
  category: string;
}
*/

interface StarProps {
  formType: String;
  questionNum: number;
  category: String;
  readOnlyStar: Boolean;
  childToParent: (childData:number)=> void;
}

export default function Star(props: StarProps) {

  const [getRatingInputObject, setInputObject] = useState({
    formType: props.formType,
    inputValue: 0,
    questionNum: props.questionNum,
  });

  const [setRatingInputObject, setOutputRating] = useState({
    formType: props.formType,
    inputValue: 0,
    questionNum: props.questionNum,
  });

  //initialize changing the rating with the received rating
  const [selectedRating, setSelectedRating] = useState<number>(getRatingInputObject.inputValue);

  // get the current ratings
  let responseContent;
  useEffect(() => {
    // Make a GET request to API endpoint to get rating
    const getRating = async () => {
      try {
        const response = await axios.post(
          `${config.apiUrl}/SubmissionForm/GetRating`,
          getRatingInputObject,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        // Handle the response data
        responseContent = response.data.Content;
        setSelectedRating(responseContent.Rating);
        //getRatingInputObject.firstRating = responseContent.Rating;
      } catch (error: any) {
        console.error("Error fetching data:", error.message);
      }
    };
    getRating();
  }, []); // Run the effect only when component mounts for the first time


  // save the inputed rating
  useEffect(() => {
  const saveRating = async () => {
    try {
      setRatingInputObject.inputValue = selectedRating;
      //axios.post(api endpoint, data, headers)
      const response = await axios.post(
        `${config.apiUrl}/SubmissionForm/SaveRating`,
        setRatingInputObject,
        {
          headers: {
            //metadata for server
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Response data: ", response.data);
    } catch (error: any) {
      //post request error handling
      console.error("Error making Post request:", error.message);
    
    }
  };
  props.childToParent(selectedRating)
  }, [selectedRating]); //run each time the rating is changed



  
  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: "<!-- Installing @smastrom/react-rating \n The MIT License (MIT) \n Copyright (c) 2024 smastrom \n Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions: \n The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software. \n THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE. -->" }} />
      <nav className="text">
        {String(props.category).padEnd(0, "_")}
        <nav className="rating">
          {!props.readOnlyStar &&
          (<Rating
            style={{ maxWidth: 250 }}
            value={selectedRating}
            onChange= {setSelectedRating}
          />)}
          {props.readOnlyStar &&
          (<Rating
            style={{ maxWidth: 250 }}
            value={selectedRating}
          />)}
        </nav>
      </nav>
    </>
  );
}
