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

import "@smastrom/react-rating/style.css";

import Star from "../components/Star";
import "../styles/StarRanking.css";

interface Props {
  formType: String;
}

/*
<Star category="Growth Mindset"></Star>
        <Star category="Technical Acumen"></Star>
        <Star category="Work Quality"></Star>
        <Star category="Collaboration/Teamwork"></Star>
        <Star category="Creativity"></Star>
        <Star category="Initiative"></Star>
        <Star category="Customer Orientation"></Star>
        <Star category="Adaptability"></Star>
*/

export default function StarRanking({ formType }: Props) {
  return (
    <>
      <nav className="starRanking">
        <Star formType={String(formType)} questionNum = {1} category="Growth Mindset" key="id1"></Star>
        <Star formType={String(formType)} questionNum = {2} category="Technical Acumen" key="id2"></Star>
        <Star formType={String(formType)} questionNum = {3} category="Work Quality" key="id3"></Star>
        <Star
          formType={String(formType)}
          questionNum = {4}
          category="Collaboration/Teamwork"
          key="id4"
        ></Star>
        <Star formType={String(formType)} questionNum = {5} category="Creativity" key="id5"></Star>
        <Star formType={String(formType)} questionNum = {6} category="Initiative" key="id6"></Star>
        <Star
          formType={String(formType)}
          questionNum = {7}
          category="Customer Orientation"
          key="id7"
        ></Star>
        <Star formType={String(formType)} questionNum = {8} category="Adaptability" key="id8"></Star>
      </nav>
    </>
  );
}
