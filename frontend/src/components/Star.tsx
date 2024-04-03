/*
Installing  @mui/material and @mui/icons-material

The MIT License (MIT)

Copyright (c) 2014 Call-Em-All

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.


Installing @emotion/react and @emotion/styled

MIT License

Copyright (c) Emotion team and other contributors

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
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
  category: String;
}

export default function Star({ formType, category }: StarProps) {
  let globalrating;
  const [inputObject, setInputObject] = useState({
    formType,
    category,
  });

  let rating2;
  useEffect(() => {
    // Make a GET request to API endpoint to get the status of this review
    const getRating = async () => {
      try {
        const response = await axios.post(
          `${config.apiUrl}/SubmissionForm/GetRating`,
          inputObject,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        // Handle the response data
        rating2 = response.data.Content;
        globalrating = rating2;
      } catch (error: any) {
        console.error("Error fetching data:", error.message);
      }
    };
    getRating();
  }, []); // Run the effect only when component mounts for the first time

  const [rating, setRating] = useState(0); // Initial value
  return (
    <>
      <nav className="text">
        {globalrating.Value}
        {String(category).padEnd(30, "_")}
        <nav className="rating">
          <Rating
            style={{ maxWidth: 250 }}
            value={rating}
            onChange={setRating}
          />
        </nav>
      </nav>
    </>
  );
}
